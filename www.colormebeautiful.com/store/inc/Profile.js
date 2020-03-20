$(document).ready(function () {
	$("[id$='ddNewContactType']").change(function () {
		$("[id$='txtNewContactTypeDisplayName']").val($("[id$='ddNewContactType']").val());
	});

	$("[id$='btnDelete']").click(function () {
		var txt = $(this).prev("[id$='txtContactTypeValue']");
		$("<div style='width:300px;margin:3px 0;padding:2px;display:inline;'>" + txt.val() + "</div>").insertBefore($(this));
		$(this).hide();
		txt.hide();
		txt.val("");
		$(this).parent().parent().attr("style", "text-decoration:line-through;");
	});

	$("[id$='btnAddContactType']").click(function () {

		var data = {
			piProfileID: $("[id$='hdProfileID']").val(),
			peType: $("[id$='ddNewContactType']").val(),
			psDisplayName: $("[id$='txtNewContactTypeDisplayName']").val(),
			psValue: $("[id$='txtNewContactTypeValue']").val()
		};

		var request = $.ajax({
			type: "POST",
			url: "/store/ProfileEdit.aspx/AddNewProfileContactType",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});

        request.done(function (result) {
            if (result.d.Success) {
                var NewRow = $(result.d.Message);
                NewRow.insertBefore("#trAddNew");
                $("[id$='txtNewContactTypeValue']").val("");
                $("[id$='txtNewContactTypeDisplayName']").val($("[id$='ddNewContactType']").val());
            }
        });
	});
});