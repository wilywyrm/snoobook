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
		var authorID = thisPost.from.id;
		var postID = thisPost.id;
		var postType = thisPost.type;
		if(thisPost.picture == null){
			var profilepic = "http://graph.facebook.com/" + authorID + "/picture?type=square"
			console.log(profilepic);}
		else
			var profilepic = thisPost.picture; 
		var postURL = "http://facebook.com/" + postID;
		
		if(typeof thisPost.link != "undefined") 
			postURL = thisPost.link;
		//console.log(thisPost.likes.data.length);
		var likes = 0;// = thisPost.likes.data.length;
		if(typeof thisPost.likes != "undefined")
			likes = thisPost.likes.data.length;
			
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
			"<div class=\"score likes\">" + (likes + 1) + "</div><div class=\"score unvoted\">" + likes + "</div><div class=\"score dislikes\">" + 
			(likes - 1) + "</div><div class=\"arrow down login-required\" onclick=\"dislike(this)\" role=\"button\"></div></div>" + 
			"<a class=\"thumbnail loggedin\" href=https://facebook.com/" + authorID +">" + "<img src=" + profilepic + " width=\"57\" height=\"57\" alt>" + "</a>" +		
			"<p class=\"title\"><a href=\"" + postURL + "\">" + snippet + "</a></p> <div> by " + author + " </div><div class=\"clearleft\"></div>" + "</div>");
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