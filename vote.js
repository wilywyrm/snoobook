//THIS IS OUR MAIN FEATURE
function dislike(selector) {
	$(selector).toggleClass("down");
    $(selector).toggleClass("downmod");
	console.log(selector);
    var parent = selector.parentElement;
    //console.log("dislike");
    $(parent).toggleClass("dislikes");
    $(parent).toggleClass("unvoted");
    $(parent).toggleClass("likes", false);
    
	// firebase add dislike by user to post by ID if not already in list
	// firebase increment dislike counter
	// possibly decrement all posts by user with that image/keyword in it for user preferability
}

function like(selector){
	$(selector).toggleClass("up");
    $(selector).toggleClass("upmod");
    //$(parent).toggleClass("likes", true);
	
	var parent = selector.parentElement;
    //console.log($(selector));
    $(parent).toggleClass("dislikes", false);
    $(parent).toggleClass("unvoted");
    $(parent).toggleClass("likes");
	// firebase add likes from all users of that post
	// firebase add like by user to post by ID if not already in list
	// firebase increment like counter
	// possibly increment all posts by user with that image/keyword in it for user preferability
}
