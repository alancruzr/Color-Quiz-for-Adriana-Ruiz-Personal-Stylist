
VariantSwatchesProductVariations_variantGroup_83_4 = {
SwatchArray: { 150: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/gingerswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 151: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/tawnyswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 153: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/amberswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 154: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/tanswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 152: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/sandswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 155: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/sableswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 156: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/chestnutswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 157: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/russetswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 304: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/hazelnutswatchs.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 158: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/carobswatch.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 159: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/sepiaswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 160: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/minkswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 161: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/bittersweetswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    }, 162: {
                        SwatchURL: '/Shared/images/Product/FR Cream To Powder Swatches/mochaswatch1.jpg',
                        ControlPath: 'ProductVariations_variantGroup_83_4'
                    } },
  ImagingMode: "Resizer",
  ProductPhotoOverride: "",
  ProductThumbOverride: "",
  ZoomPhotoOverride: "",

  SetResizedImageLinks: function(img, zoom, swatchUrl) {
    var zoomWidth = 800;
    var zoomHeight = 800;
    var newMainImageUrl = img.attr("src");
    var newScaledUpImageUrl = "";

    if (this.ImagingMode == "ExternalImaging") {
      var oldMainImageOptions = window.resizehelper.getExternalImageOptionsFromUrl(this.ProductPhotoOverride, img.attr("src"));
      newMainImageUrl = window.resizehelper.getExternalImageUrl(this.ProductPhotoOverride, swatchUrl, oldMainImageOptions.width, oldMainImageOptions.height);
      newScaledUpImageUrl = window.resizehelper.getExternalImageUrl(this.ZoomPhotoOverride, swatchUrl, zoomWidth, zoomHeight);
    } else {
      var baseResizerPath = window.resizehelper.getBaseResizerPath(swatchUrl);
      var oldParams = "";
      if (baseResizerPath.indexOf('?') > -1) {
        oldParams = baseResizerPath.substring(baseResizerPath.indexOf('?') + 1);
        var poStartIndex = oldParams.indexOf("po=");
        if (poStartIndex < 0)
          poStartIndex = oldParams.indexOf("path=");
        if (poStartIndex > -1) {
          var ampAfterIndex = oldParams.substring(poStartIndex).indexOf("&");
          if (ampAfterIndex > -1)
            oldParams = oldParams.substring(poStartIndex + ampAfterIndex + 1);
        }
      }
      newMainImageUrl = img.attr("src").replace(/\/resize\/.+(\?.*)/, baseResizerPath + oldParams);
      newScaledUpImageUrl = baseResizerPath + "bw=" + zoomWidth + "&w=" + zoomWidth + "&bh=" + zoomHeight + "&h=" + zoomHeight
    }

    img.attr("src", newMainImageUrl);
    img.siblings("img").attr("src", newScaledUpImageUrl);
    zoom.attr("href", newScaledUpImageUrl);
  },

  SelectVariant: function(groupID, variantID, setDropDown) {

    var mainPhotoPresent = false;
    //if (typeof msPhotoImgCtl != 'undefined')
    //    mainPhotoPresent = true;

    var $img = $("#PhotoThumbnails_imgPhoto");
    if ($img.length > 0)
      mainPhotoPresent = true;

    $(".varpicmax_img[id^='varswatch_" + groupID + "_" + "']").removeClass("ProductDetailsSelectedVariant");
    var o = VariantSwatchesProductVariations_variantGroup_83_4.SwatchArray[variantID];
    if (o) {
      if (setDropDown)
        $("[id$='" + o.ControlPath + "']").val(variantID).change();

      if (mainPhotoPresent)
        $zoomlink = $img.parent();

      if (o.SwatchURL != "" && mainPhotoPresent) {
        if (this.ImagingMode == "ExternalImaging") {
          this.SetResizedImageLinks($img, $zoomlink, o.SwatchURL);
        } else {
          if ($img.attr("src").indexOf("path=") != -1) {
            if ($img.attr("src").indexOf("&") != -1) {
              $img.attr("src", $img.attr("src").replace(new RegExp("path=.+?&"), "path=" + o.SwatchURL + "&")).attr("alt", "").attr("title", "");
              $img.siblings("img").attr("src", o.SwatchURL);
              $zoomlink
                .attr("href", $zoomlink.attr("href").replace(new RegExp("path=.+?&"), "path=" + o.SwatchURL + "&"));
            } else {
              $img.attr("src", $img.attr("src").replace(new RegExp("path=.+"), "path=" + o.SwatchURL)).attr("alt", "").attr("title", "");
              $zoomlink
                .attr("href", $zoomlink.attr("href").replace(new RegExp("path=.+"), "path=" + o.SwatchURL));
            }
          } else if ($img.attr("src").indexOf("/resize/") != -1) {
            this.SetResizedImageLinks($img, $zoomlink, o.SwatchURL);
          } else {
            $img.attr("src", o.SwatchURL).attr("alt", "").attr("title", "");
            $img.siblings("img").attr("src", o.SwatchURL);
            $zoomlink.attr("href", o.SwatchURL);
          }
        }
      } else if (setDropDown) {
        var groupVars = [];
        var hasSwatch = false;
        $("[id$='" + o.ControlPath + "']").val(variantID).change();
      }

      if (mainPhotoPresent) {
        if (o.SwatchURL != "") {
          if (this.ImagingMode == "ExternalImaging") {
            this.SetResizedImageLinks($img, $zoomlink, o.SwatchURL);
          } else {
            if ($img.attr("src").indexOf("path=") != -1) {
              $zoomlink = $img.parent();
              if ($img.attr("src").indexOf("&") != -1) {
                $img.attr("src", $img.attr("src").replace(new RegExp("path=.+?&"), "path=" + o.SwatchURL + "&")).attr("alt", "").attr("title", "");
                $img.siblings("img").attr("src", o.SwatchURL);
                $zoomlink
                  .attr("href", $zoomlink.attr("href").replace(new RegExp("path=.+?&"), "path=" + o.SwatchURL + "&"));
              } else {
                $img.attr("src", $img.attr("src").replace(new RegExp("path=.+"), "path=" + o.SwatchURL)).attr("alt", "").attr("title", "");
                $img.siblings("img").attr("src", o.SwatchURL);
                $zoomlink
                  .attr("href", $zoomlink.attr("href").replace(new RegExp("path=.+"), "path=" + o.SwatchURL));
              }
            } else if ($img.attr("src").indexOf("/resize/") != -1) {
              this.SetResizedImageLinks($img, $zoomlink, o.SwatchURL);
            } else {
              $img.attr("src", o.SwatchURL).attr("alt", "").attr("title", "");
              $img.siblings("img").attr("src", o.SwatchURL);
              $zoomlink.attr("href", o.SwatchURL);
            }
          }
        } else {
          var groupVars = [];
          var hasSwatch = false;

          $("#" + o.ControlPath).children().each(function() {
            var v = VariantSwatches.SwatchArray[$(this).val()];
            if (v && v.SwatchURL !== "") {
              hasSwatch = true;
            }
          });

          if (typeof ResetImage == 'function' && hasSwatch) 
            ResetImage();
        }
      } else if (typeof ResetImage == 'function') 
        ResetImage();
    }

    $(".varpicmax_img[id^='varswatch_" + groupID + "_" + variantID + "_" + "']").addClass("ProductDetailsSelectedVariant");
  }
}

$(function(){
    // Bind drop down selection event
	$("select[id$='ProductVariations_variantGroup_83_4']").change(function() { VariantSwatchesProductVariations_variantGroup_83_4.SelectVariant( $(this).parent().find("input[type=hidden]").val() , $(this).val(), false) });

    // Bind radio button selection event
    $("input[type=radio][name$='ProductVariations_variantGroup_83_4']").change(function() {
        VariantSwatchesProductVariations_variantGroup_83_4.SelectVariant( $(this).closest('.ProductDetailsVariations').find('.ProductDetailsVariations').find("input[type=hidden]").val() , $(this).val(), false);
    });
})
