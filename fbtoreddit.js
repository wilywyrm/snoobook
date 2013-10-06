function scrape(response){
	var content = [];
	for(var i = 0; i < response.data.length; i++)
	{
		//console.log(a);
		//if(response.data[a].hasOwnProperty('source') == true){
		var thisPost = response.data[i];
		var author = thisPost.from.name;
		var postID = thisPost.id;
		//console.log(thisPost.likes.data.length);
		var likes = 0;// = thisPost.likes.data.length;
		if(typeof thisPost.likes != "undefined")
			likes = thisPost.likes.data.length;
			
		var snippet;
		if(typeof thisPost.story != "undefined")
			snippet = thisPost.story;
		else if(typeof thisPost.message != "undefined"){
			snippet = thisPost.message + "...";
		}
		content.push("<div class=\"thing link\"> <p class=\"parent\"></p> <span class=\"rank\"> " + (i+1) + 
			"</span> <div class=\"midcol unvoted\"> <div class=\"arrow up login-required\" role=\"button\" onclick=\"like(this)\"></div>" +
			"<div class=\"score likes\">" + (likes + 1) + "</div><div class=\"score unvoted\">" + likes + "</div><div class=\"score dislikes\">" + 
			(likes - 1) + "</div><div class=\"arrow down login-required\ onclick=\"dislike(this)\" role=\"button\"></div></div>" + 
			"<p class=\"title\">" + snippet + "</p> <div> by " + author + " </div><div class=\"clearleft\"></div>" + "</div>");
		//content.push("<div>"+ response.data[a].id + "</div> ");
			//console.log(a +":"+response.data[a].from.name);
			//console.log(response.data[a].id + '\n');
			/*
		}
		else{
			content.push("<div>" + a + response.data[a].from.name + "</div> ">);
			content.push("<div>" + a + response.data[a].id + "</div> ">);
			//console.log(a+":"+response.data[a].from.name);
			//console.log(response.data[a].message + '\n');
		}
		*/
	}
	//console.log(typeof content);
	$('#siteTable').html(content.join(' '));
	//console.log(typeof content.join(' '));
}

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
    });
}