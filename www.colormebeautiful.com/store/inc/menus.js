SubMenuItemHoverFunction=function()
{var subMenuItemElements=document.getElementsByTagName("div");for(i=0;i<subMenuItemElements.length;i++)
{if(subMenuItemElements[i].className.indexOf("SubMenuItem")>-1)
{subMenuItemElements[i].onmouseover=function(){this.className+=" SubMenuItemHover";}
subMenuItemElements[i].onmouseout=function(){this.className=this.className.replace(new RegExp(" SubMenuItemHover\\b"),"");}}
else if(subMenuItemElements[i].className.indexOf("HorizontalNavItem")>-1)
{subMenuItemElements[i].onmouseover=function(){this.className+=" HorizontalNavItemHover";}
subMenuItemElements[i].onmouseout=function(){this.className=this.className.replace(new RegExp(" HorizontalNavItemHover\\b"),"");}}
else if(subMenuItemElements[i].className.indexOf("ControlLink")>-1)
{subMenuItemElements[i].onmouseover=function(){this.className+=" ControlLinkHover";}
subMenuItemElements[i].onmouseout=function(){this.className=this.className.replace(new RegExp(" ControlLinkHover\\b"),"");}}}}