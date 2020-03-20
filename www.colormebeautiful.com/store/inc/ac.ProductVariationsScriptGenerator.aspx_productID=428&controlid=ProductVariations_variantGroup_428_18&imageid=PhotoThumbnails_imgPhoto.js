
VariantSwatchesProductVariations_variantGroup_428_18 = {
SwatchArray: { 468: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/all-spice.jpg.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 467: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/cedar-rose_472163.jpg-1.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 473: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/mulberry.jpg.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 469: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/naturalveil.psd.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 472: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/soft-plum.jpg.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 470: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/soft-rose.jpg.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 471: {
                        SwatchURL: '/Shared/images/Product/CMB Color Pro Blush Swatches/sweetappleberry.jpg.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 479: {
                        SwatchURL: '/Shared/images/Product/Color Renew Lipstick Swatches/blazeweb.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 474: {
                        SwatchURL: '/Shared/images/Product/Color Renew Lipstick Swatches/cinnamon.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 475: {
                        SwatchURL: '/Shared/images/Product/Color Renew Lipstick Swatches/dusty-rose.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 478: {
                        SwatchURL: '/Shared/images/Product/Color Renew Lipstick Swatches/frosted-watermelon.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 477: {
                        SwatchURL: '/Shared/images/Product/Color Renew Lipstick Swatches/mago-punch-swatch.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 476: {
                        SwatchURL: '/Shared/images/Product/Color Renew Lipstick Swatches/soft-plum.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 463: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/cool-beige.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 461: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/ivory-moisture-foundation.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 462: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/naturale.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 466: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/Neutral-beige.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 460: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/sand.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 465: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/Sepia-beige.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 464: {
                        SwatchURL: '/Shared/images/Product/Moisture Complex Foundation Swatches/warm-beige.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 480: {
                        SwatchURL: '/Shared/images/Product/Underglow/underglow-new.psd.jpeg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 481: {
                        SwatchURL: '/Shared/images/Product/Velvet-Perfection-Primer/velvet-foundation-primer-parent-image.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
                    }, 482: {
                        SwatchURL: '/Shared/images/Product/Color-Me-Beautiful-Shopper-Tote/cmb-shopper-tote-web-parent.jpg',
                        ControlPath: 'ProductVariations_variantGroup_428_18'
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
    var o = VariantSwatchesProductVariations_variantGroup_428_18.SwatchArray[variantID];
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
	$("select[id$='ProductVariations_variantGroup_428_18']").change(function() { VariantSwatchesProductVariations_variantGroup_428_18.SelectVariant( $(this).parent().find("input[type=hidden]").val() , $(this).val(), false) });

    // Bind radio button selection event
    $("input[type=radio][name$='ProductVariations_variantGroup_428_18']").change(function() {
        VariantSwatchesProductVariations_variantGroup_428_18.SelectVariant( $(this).closest('.ProductDetailsVariations').find('.ProductDetailsVariations').find("input[type=hidden]").val() , $(this).val(), false);
    });
})
