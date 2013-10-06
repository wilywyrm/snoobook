var postList = new Firebase('https://dislike.firebaseIO.com/posts');
var userList = new Firebase('https://dislike.firebaseIO.com/users');

function scrape(){
	
}


function init() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me/home', {access_token: accessToken}, function(response) {
   	  console.log(response);
      $('#siteTable').text(response);
    });
    FB.api('/me', function(response){
    	userID = response.id;
    	console.log('Good to see you, ' + response.name + '.'); // ha you're a number
    });
}