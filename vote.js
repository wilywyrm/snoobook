//THIS IS OUR MAIN FEATURE
function dislike(selector) {
    console.log($(this));
    console.log("dislike");
    $(this).toggleClass(dislikes, false);
    $(this).toggleClass(unvoted, false);
    $(this).toggleClass(likes, true);
    
	// firebase add dislike by user to post by ID if not already in list
	// firebase increment dislike counter
	// possibly decrement all posts by user with that image/keyword in it for user preferability
}

function like(selector){
	console.log("like");
    console.log($(this));
    $(this).toggleClass("dislikes", false);
    $(this).toggleClass("unvoted", false);
    $(this).toggleClass("likes", true);
	// firebase add likes from all users of that post
	// firebase add like by user to post by ID if not already in list
	// firebase increment like counter
	// possibly increment all posts by user with that image/keyword in it for user preferability
}
