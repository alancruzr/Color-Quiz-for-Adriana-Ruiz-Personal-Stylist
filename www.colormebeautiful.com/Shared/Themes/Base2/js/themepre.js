var inIframe=false;if(window!=window.parent&&window.name=="modalIframe"){inIframe=true;$("body,html").css("overflow","hidden");$("body").hide();}
var popState=false;var dontEscape=false;$(function(){if(inIframe){var styleSheets=$("link");styleSheets.each(function(){var qs="&";if(this.href.indexOf("?")==-1)
qs="?";this.href=this.href+qs+"iframe=1";});setTimeout(function(){$("body").fadeIn();},250);}
var $win=$(window);$win.resize(function(){if($win.width()>768)
$(".navbar-nav > .dropdown > a").attr("data-toggle","");else
$(".navbar-nav > .dropdown > a").attr("data-toggle","dropdown");}).resize();$(".dropdown-menu").find("input, button").each(function(){$(this).click(function(e){e.stopPropagation();});});});