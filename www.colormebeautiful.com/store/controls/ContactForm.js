if (!window.contactFormController) {
  window.contactFormController = {
    registry: [],
    submitButtonLookup: {},
    submitButtonIds: [],
    registerContactForm: function (formId, submitButtonId, fromAddressSetting) {
      this.registry.push(new ContactForm(formId, submitButtonId, fromAddressSetting));
      this.bindSubmitButton(submitButtonId);
      this.submitButtonLookup[submitButtonId] = this.registry[this.registry.length - 1];
    },
    bindSubmitButton: function (submitButtonId) {
      if ($.inArray(submitButtonId, this.submitButtonIds) != -1)
        return;

      this.submitButtonIds.push(submitButtonId);
      $("#" + submitButtonId).on("click", function (e) {
        var contactForm = window.contactFormController.submitButtonLookup[submitButtonId];
        contactForm.submit();
        return false;
      });
    }
  }

  var ContactForm = function (formId, submitButtonId, fromAddressSetting) {
    var controlClass = $("#" + submitButtonId).closest('div[class*=Control_]').attr("class");

    //20170224 DBS - If we are on a contact page and not a contact widget, then we need to mark the LayoutContentInner div 
    //               with the 'Control_' class so that the validation and submission will work
    if (!controlClass)
    {
        var outerDiv = $('div.LayoutContentInner');
        outerDiv.addClass('Control ContactForm Control_00000');
        controlClass = $("#" + submitButtonId).closest('div[class*=Control_]').attr("class");
    }

    if (!controlClass)
        return;

    this._wrapperId = controlClass.match(/Control_(\d+)/)[1];
    this._buttonId = submitButtonId;
    this._formId = formId;
    this._fromAddressSetting = fromAddressSetting;
  }

  ContactForm.prototype = {
    validate: function () {
      var self = this,
          form = $(".Control_" + this._wrapperId),
          retVal = true;

      form.find("label.contact-form-question").each(function (i, el) {
        var label = $(el),
            text = label.text(),
            fieldId = label.attr("for"),
            inputType = label.data("input-type"),
            required = label.data("required"),
            validationMsgId = label.data("validation-id"),
            validationMsg = $("#" + validationMsgId),
            value;

        validationMsg.hide();

        switch (inputType) {
          case "TextBox":
          case "MultiLine":
          case "DropDownList":
          case "FileUpload":
            value = $("#" + fieldId).val();
            break;
          case "EmailAddress":
            value = self.validateEmail($("#" + fieldId).val());
            break;
          case "CheckBox":
            value = $("#" + fieldId).is(":checked");
            break;
          case "RadioButtonList":
            value = $("#" + fieldId).find("input:checked").val();
            break;
          case "CheckBoxList":
            value = $("#" + fieldId).find("input:checked").map(function () { return $("label[for=" + this.id + "]").text(); }).get().join("\r\n");
            break;
        }

        if (required && !value) {
          $("#" + fieldId).addClass("field-has-error");
          validationMsg.show();
          retVal = false;
        } else {
          $("#" + fieldId).removeClass("field-has-error");
          validationMsg.hide();
        }
      });

      return retVal;
    },

    validateEmail: function (email) {
      //super simple email validation 
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },

    submit: function () {
      var self = this,
          form = $(".Control_" + this._wrapperId),
          button = $("#" + this._buttonId);

      button.attr("disabled", "disabled");

      if (!self.validate()) {
        button.removeAttr("disabled");
        return;
      }
      var buttonCover = $("<div class='checkout-button-cover'><div class='spinner-three-quarters'>Loading...</div></div>");

      var coords = button.offset();

      buttonCover.appendTo("body");
      
      buttonCover.offset({ top: coords.top - 10, left: coords.left - 10 });
      buttonCover.hide().width(button.outerWidth() + 20).height(button.outerHeight() + 20).fadeTo(500, 0.9);

      var values = [];
      var from = "";
      
      var fileUploadsSuccessful = true;
      form.find("label.contact-form-question").each(function (i, el) {
        var label = $(el),
            text = label.text(),
            fieldId = label.attr("for"),
            inputType = label.data("input-type"),
            value;

        switch (inputType) {
          case "TextBox":
          case "MultiLine":
          case "DropDownList":
            value = $("#" + fieldId).val();
            break;
          case "EmailAddress":
            value = from = $("#" + fieldId).val();
            break;
          case "CheckBox":
            value = $("#" + fieldId).is(":checked") ? "Yes" : "No";
            break;
          case "RadioButtonList":
            value = $("#" + fieldId).find("input:checked").val();
            break;
          case "CheckBoxList":
            value = $("#" + fieldId).find("input:checked").map(function () { return $("label[for=" + this.id + "]").text(); }).get().join("\r\n");
            break;
          case "FileUpload":
            var filePath = "";
            var fileData = $('#' + fieldId).prop('files')[0];
            var formData = new window.FormData();

            // have to == null check for IE, since typeof (fileData) == object and not undefined for w/e reason
            if (typeof (fileData) === 'undefined' || fileData == null)
              break;

            formData.append('file', fileData);

            var temp = $.ajax({
                url: "/Store/UploadFile.ashx",
                type: "POST",
                data: formData,
                contentType: false,
                dataType: "txt",
                cache: false,
                processData: false,
                async: false
            }).responseText;

            if (temp) {
                var result = JSON.parse(temp);

                if (result) {
                    if (result.indexOf("Error") > -1) {
                        alert(result);
                        fileUploadsSuccessful = false;
                        return false;
                    }
                    else {
                        filePath = result;
                    }
                }
                else {
                    alert("Failed to connect to server to upload file. The file may be too large.");
                    fileUploadsSuccessful = false;
                    return false;
                }
            }
            else {
                alert("Failed to connect to server to upload file. The file may be too large.");
                fileUploadsSuccessful = false;
                return false;
            }

            value = filePath;
            if (value !== 'undefined' && value.length < 1)
                value = $('#' + fieldId).val();
            break;
        }

        if (!value)
          value = "N/A";

        values.push({
          Question: text,
          Response: value
        });

      });

      if (fileUploadsSuccessful !== true) {
          button.removeAttr('disabled');
          buttonCover.hide();
          return false;
      }

      $.ajax({
        url: "/store/ajax/ajaxhandler.aspx/SubmitContactForm",
        type: "POST",
        data: JSON.stringify({
          piFormID: self._formId,
          poFormValues: values,
          psFrom: self._fromAddressSetting,
          psReplyTo: from
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).always(function (res) {
            form.html(res.d);
            $(".checkout-button-cover").remove();
        }
      );
    }
  }
}