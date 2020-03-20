$(function () {
	var sAnchor = document.location.hash;

	if (sAnchor.indexOf("addacomment") != -1 ||
		sAnchor.indexOf("blogcomments") != -1 ||
		sAnchor.indexOf("pendingmoderation") != -1 ||
		sAnchor.indexOf("comment-") != -1) {
		$(window).scrollTop(0);
		focusAnchor(sAnchor, (sAnchor.indexOf("addacomment") != -1) ? true : false);
	}

	$(".BlogPostAddCommentLink a, .BlogPostCommentCount a").click(function (e) {
		sAnchor = $(this).attr("href");
		if (sAnchor.indexOf("#") == 0) {
			if ($(sAnchor).length) {
				focusAnchor(sAnchor, (sAnchor.indexOf("addacomment") != -1) ? true : false);
				return false;
			}
		}
	});

	function focusAnchor(anchor, focus) {
		anchor = anchor.replace("#", "");
		if (anchor.indexOf("pendingmoderation") != -1) {
			//setTimeout(function () { $("#" + anchor).toggleClass("Flash"); }, 1000);
			//setTimeout(function () { $("#" + anchor).toggleClass("Flash"); }, 2000);
			//setTimeout(function () { $("#" + anchor).toggleClass("Flash"); }, 3000);
			//setTimeout(function () { $("#" + anchor).toggleClass("Flash"); }, 4000);
			$("#" + anchor).toggleClassNTimes({ classname: "Flash", times: 8, delay: 1000 });
		}
		$("html, body").animate({ scrollTop: $("#" + anchor).offset().top }, 500, function () {
			location.hash = anchor;
			if (focus)
				$("#" + anchor).parent().find(".BlogPostCommentsAddTextbox").focus();

			if (anchor.indexOf("comment-") != -1)
				$("#" + anchor).parent().addClass("BlogPostCommentHighlightCurrent");
		});
	}
});

// Creates and slides down the reply to comment box
function ReplyOnClick(controlId, id) {
    var dvComment = $('#' + controlId).closest('.BlogPostComment');
    var dvAddComment = $('.BlogPostCommentsAdd.Reply');

    if ($(dvComment).children('.BlogPostCommentsAdd.Reply').length < 1) {
        if ($(dvAddComment).length < 1) {
            dvAddComment = $('.BlogPostCommentsAdd').clone(true);
            $(dvAddComment).addClass('Reply');
            $(dvAddComment).css('display', 'none');
            $(dvAddComment).appendTo($(dvComment)).slideDown('slow');
        }
        else {
            $(dvAddComment).slideUp('fast', function () {
                $(dvAddComment).appendTo($(dvComment)).slideDown('slow');
            });
        }

        $(dvAddComment).find('.PostCommentThemeButton').click(function () {
            AddCommentOnClick(this, id)
        });
    }
}

function AddCommentOnClick(control, parentID) {
    var dvAddComment = $(control).closest('.BlogPostCommentsAdd');
    $('#hfParentCommentID').val(parentID);
    $('#hfPostAsDisplayNameText').val($(dvAddComment).find('#txtPostAsDisplayName').val());
    $('#hfTxtComment').val($(dvAddComment).find('#txtComment').val());
}

// Called after server's onclick
function AddCommentOnClickCallback(redirectUrl) {
    var dvComment;

    // Reply
    if ($('#hfParentCommentID').val() > 0)
        dvComment = $('.BlogPostCommentsAdd.Reply');
    else 
        dvComment = $('.BlogPostCommentsAdd');

    var strProfileName = $('#hfPostAsProfileName').val();
    if (strProfileName != "") {
        $(dvComment).find('#hlPostAsProfileName').text(strProfileName).attr('href', $('#hfPostAsProfileNameURL').val()).css('visibility', 'visible');
    }

    $('#hfPostAsProfileNameURL').val('');
    $('#hfPostAsProfileName').val('');
    $('#hfErrorText').val('');
    $('#hfCommentModerationMessage').val('');

    if (redirectUrl != "")
        window.location = redirectUrl;
    else {
        $(dvComment).find('#txtComment').text('');
    }
}

// Expands/hides reply list if there are more replies than the show setting
function ShowHideReplies(controlId, numHiddenReplies) {
    var hlViewReplies = $('#' + controlId);
    var dvHiddenReplies = $(hlViewReplies).next('.HiddenReplies');
    
    if ($(dvHiddenReplies).css('display') == 'none') {
        $(hlViewReplies).text('Hide replies ^');
        $(dvHiddenReplies).slideDown('fast');
    }
    else {
        $(hlViewReplies).text('Show ' + numHiddenReplies + ' more replies');
        $(dvHiddenReplies).slideUp('fast');
    }
}

// Adds reply to appropriate comment
function AddReply(replyId, commentID, numReplies, numRepliesToShow, maxReplyDepth) {
    var replyDiv = $('#' + replyId).closest('.BlogPostComment');
    var replyArea = $(document).find('#comment-' + commentID).siblings('.CommentReplies');
    var hiddenArea = $(replyArea).children('.HiddenReplies');
    var hiddenReplies = $(hiddenArea).children('.BlogPostComment').length;

    $(replyDiv).next('.Clear').remove();

    // Find the reply depth level
    var replyPastDepthThreshold = $(replyArea).parents('.CommentReplies').length > maxReplyDepth - 2;

    // See if an ancestor comment is in hidden area, don't want to nest hidden areas as it is
    // annoying to click show all replies 10 times in a row
    // var parentIsHidden = $(replyArea).parents('.HiddenReplies').length > 0;

    // Hidden area
    if ((numRepliesToShow < (numReplies - hiddenReplies) || replyPastDepthThreshold == true)) {
        $(replyDiv).appendTo($(hiddenArea));
    }
    else {
        $(replyDiv).appendTo($(replyArea));

        //if (parentIsHidden == true) {
        //    $(replyDiv).find('.ViewRepliesLink').css('visibility', 'hidden');
        //}
    }
}

//RO: Custom plugin to toggle a class a set number of times and after a delay (in milliseconds)
//default parameters are { classname:"CSSclass", times:4, delay:1000 }
(function ($){
	$.fn.extend({
		toggleClassNTimes : function(options){

			var defaults = {
				classname	: "CSSclass",
				times		: 4,
				delay		: 1000
			};

			var options = $.extend(defaults, options);

			return this.each(function(){

				var self = $(this);
				var repeat = options.times;

				var toggleClassName = function(){
					setTimeout(function(){
						self.toggleClass(options.classname);
						//console.log(options.classname);
						//console.log(repeat);
						if(repeat-- > 0)
							toggleClassName();
					}, options.delay);
				};

				toggleClassName();
			});
		}
	});
})(jQuery);