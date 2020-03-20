$(function () {
    $(document).keypress(function (e) {
        if (e.which == 13 && !$(e.target).is("textarea")) {
            e.preventDefault();
        }
        else {
            return true;
        }
    });
});

//var DefaultButtonID;

//if(document.addEventListener)
//{ 
//	document.addEventListener("keypress", HandleEnterKey, true); 
//} else { 
//	document.attachEvent("onkeypress", HandleEnterKey); 
//} 


// Handle the enter key for a section of a form, binding it to the provided submit buton 
function handleenterkey(event) { 
	var nav = window.event ? true : false; 
	if (nav) { 
		return netscapeeventhandler_keydown(event); 
	} else { 
		return microsofteventhandler_keydown(); 
	} 
} 

function netscapeeventhandler_keydown(e) 
{ 
	if (e.which == 13 && e.target.type != 'textarea' && e.target.type != 'submit') { 
		// find the default button for the current page state
		var btnsubmit = document.getelementbyid(defaultbuttonid);
		if (btnsubmit != null)
		{
			btnsubmit.focus();
			btnsubmit.click();
			return true;
		}
		else
		{
			e.returnvalue = false; 
			e.cancel = true; 
			e.preventdefault(); 
			var att = e.target.attributes['submitcontrol']; 
			if(att!=null) 
				callsubmit(att.value) 
			return false; 
		}
	} 
	return true; 
} 

function microsofteventhandler_keydown() 
{ 
	if (event.keycode == 13 && event.srcelement.type != 'textarea' && event.srcelement.type != 'submit') { 
		// find the default button for the current page state
		var btnsubmit = document.getelementbyid(defaultbuttonid);
		if (btnsubmit != null)
		{
			btnsubmit.focus();
			return true;
		}
		else
		{
			event.returnvalue = false; 
			event.cancel = true; 
			var att = event.srcelement.attributes['submitcontrol']; 
			if(att!=null) 
				callsubmit(att.value) 
			return false; 
		}	
	} 
	return true; 
}

function triggerbuttononenter(e, buttonid) {
	var keycode;
	
	if(window.event) // ie
		keycode = e.keycode;
	else if(e.which) // ff, netscape, opera, etc.
		keycode = e.which;

	if(keycode && keycode == 13) {
		var elem = document.getelementbyid(buttonid);
		if(elem) {
			elem.focus();
			elem.click();
			return true;
		}
	}
	
	return false;
}