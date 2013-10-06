function init() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me/home', {access_token: accessToken}, function(response) {
    	scrape(response);
   	  	console.log(response);
      	//$('#siteTable').text(response);
    });
    FB.api('/me', function(response){
    	userID = response.id;
    	console.log('Good to see you, ' + response.name + '.'); // ha you're a number
    	if(checkIfItemExists(userID, userList))
    		console.log("Looks like you've been here before. Welcome back.");
    	user = new Firebase('https://snoobook.firebaseio.com/users/' + userID);
    });
}

function scrape(response){
	var content = [];
	for(var i = 0; i < response.data.length; i++)
	{
		var thisPost = response.data[i];
		var author = thisPost.from.name;
		var postID = thisPost.id;
		var postType = thisPost.type;
		
		var postURL = "http://facebook.com/" + postID;
		
		if(typeof thisPost.link != "undefined") 
			postURL = thisPost.link;
		//console.log(thisPost.likes.length);
		var postLikes = 0;// = thisPost.likes.length;
		if(typeof thisPost.likes != "undefined")
			postLikes = thisPost.likes.data.length;
			
		var dislikers = new Firebase('https://snoobook.firebaseio.com/' + postID + '/dislikers');	
		console.log(postID);
		dislikers.once('value', function(dataSnapshot) {
  			if(dataSnapshot.hasChildren())
  				postLikes -= dataSnapshot.numChildren();
		});
			
		var snippet = "";
		
		if(postType == "status")
			snippet += "Self-Post: ";
		else if (postType == "video")
			snippet += "Video: ";
		
		if(typeof thisPost.story != "undefined")
			snippet += thisPost.story;
		else if(typeof thisPost.message != "undefined"){
			if(thisPost.message.length > 60)
				snippet += thisPost.message.substr(0,60) + "...";
			else 
				snippet += thisPost.message;
		}
		content.push("<div class=\"thing link\"> <p class=\"parent\"></p> <span class=\"rank\"> " + (i+1) + 
			"</span> <div class=\"midcol unvoted\" id=\"" + postID +  "\"> <div class=\"arrow up login-required\" role=\"button\" onclick=\"like(this)\"></div>" +
			"<div class=\"score likes\">" + (postLikes + 1) + "</div><div class=\"score unvoted\">" + postLikes + "</div><div class=\"score dislikes\">" + 
			(postLikes - 1) + "</div><div class=\"arrow down login-required\" onclick=\"dislike(this)\" role=\"button\"></div></div>" + 
			"<p class=\"title\"><a href=\"" + postURL + "\">" + snippet + "</a></p> <div> by " + author + " </div><div class=\"clearleft\"></div>" + "</div>");
		postLikes = 0;
		console.log(postLikes);
	}
	//console.log(typeof content);
	$('#siteTable').html(content.join(' '));
}

// Tests to see if /users/<userId> has any data. 
function checkIfItemExists(itemID, ref) {
  ref.child(itemID).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    return exists;
  });
}