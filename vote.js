//THIS IS OUR MAIN FEATURE
function dislike(selector) {
	$(selector).toggleClass("up", false);
    $(selector).toggleClass("upmod", false);
	$(selector).toggleClass("down");
    $(selector).toggleClass("downmod");
    var parent = selector.parentElement;
    
    var post = new Firebase('https://snoobook.firebaseio.com/' + parent.id);
    
    //post.once('value', function(dataSnapshot){
    	//if(!dataSnapshot.hasChildren()){
    		//post.push({dislikers: {}});
    	//}
    //});
    var found = false;
    var dislikers = new Firebase(post.root() + '/' + parent.id + "/dislikers");
    
    post.child('dislikers').once('value', function(dataSnapshot) {
  // store dataSnapshot for use in below examples.
  		dataSnapshot.forEach(function(child){
  			if (userID == child.val())
  				found = true;
  		});
  		
  		if(!found)
	    	dislikers.push(userID);
	});

	
  //  if(!checkIfItemExists(userID, dislikers))
    //	dislikers.push(userID);
    
    //console.log("dislike");
    $(parent).toggleClass("dislikes");
    $(parent).toggleClass("unvoted");
    $(parent).toggleClass("likes", false);
    
    
    
	// firebase add dislike by user to post by ID if not already in list
	// firebase increment dislike counter
	// possibly decrement all posts by user with that image/keyword in it for user preferability
}

function like(selector){
	$(selector).toggleClass("down", false);
    $(selector).toggleClass("downmod", false);
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
