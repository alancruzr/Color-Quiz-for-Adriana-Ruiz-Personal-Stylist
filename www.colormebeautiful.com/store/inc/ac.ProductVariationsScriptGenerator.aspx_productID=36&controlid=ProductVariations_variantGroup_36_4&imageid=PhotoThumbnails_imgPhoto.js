
VariantSwatchesProductVariations_variantGroup_36_4 = {
SwatchArray: { 47: {
                        SwatchURL: '/images/26173033_10156107274534726_4251378448251133187_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 46: {
                        SwatchURL: '/Shared/images/Product/Luxury-Lipstick/hot-to-trot-lips-swatch.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 310: {
                        SwatchURL: '/images/22426186_10155854637279726_8555787499936261364_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 41: {
                        SwatchURL: '/images/jazz-orange-lips-swatch.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 52: {
                        SwatchURL: '/images/43650714_10156899943629726_5072126986667687936_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 49: {
                        SwatchURL: '/Shared/images/Product/LuxuryLipstickSwatches/royalrubylip.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 40: {
                        SwatchURL: '/images/26198318_10156107274519726_2449448892342266799_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 42: {
                        SwatchURL: '/Shared/images/Product/LuxuryLipstickSwatches/walnutelip.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 54: {
                        SwatchURL: '/images/26220636_10156107275239726_4168069259157552285_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 53: {
                        SwatchURL: '/images/26198116_10156107274709726_8969046274675071902_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 51: {
                        SwatchURL: '/images/26173267_10156107274524726_9193916138751249290_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 56: {
                        SwatchURL: '/images/26233561_10156107274704726_7901024804409556682_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
                    }, 43: {
                        SwatchURL: '/images/26232031_10156107275224726_1846827339674094598_o.jpg',
                        ControlPath: 'ProductVariations_variantGroup_36_4'
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
    var o = VariantSwatchesProductVariations_variantGroup_36_4.SwatchArray[variantID];
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
	$("select[id$='ProductVariations_variantGroup_36_4']").change(function() { VariantSwatchesProductVariations_variantGroup_36_4.SelectVariant( $(this).parent().find("input[type=hidden]").val() , $(this).val(), false) });

    // Bind radio button selection event
    $("input[type=radio][name$='ProductVariations_variantGroup_36_4']").change(function() {
        VariantSwatchesProductVariations_variantGroup_36_4.SelectVariant( $(this).closest('.ProductDetailsVariations').find('.ProductDetailsVariations').find("input[type=hidden]").val() , $(this).val(), false);
    });
})
