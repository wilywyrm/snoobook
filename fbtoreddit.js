function scrape(response){
	for(var a=0; a < response.data.length; a++)
	{
		var HTML = [];
		//console.log(a);
		if(response.data[a].hasOwnProperty('source') == true){
			HTML.push("<div>" + a + response.data[a].from.name + "</div> ">)
			//console.log(a +":"+response.data[a].from.name);
			//console.log(response.data[a].id + '\n');
		}
		else{
			//console.log(a+":"+response.data[a].from.name);
			//console.log(response.data[a].message + '\n');
		}
		
	}
}

function init() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me/home', {access_token: accessToken}, function(response) {
    	scrape(response);
   	  	console.log(response);
      	$('#siteTable').text(response);
    });
    FB.api('/me', function(response){
    	userID = response.id;
    	console.log('Good to see you, ' + response.name + '.'); // ha you're a number
    });
}