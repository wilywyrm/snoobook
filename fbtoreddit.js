function scrape(response){
	for(var a=0; a < response.data.length; a++)
	{
		var content = [];
		//console.log(a);
		//if(response.data[a].hasOwnProperty('source') == true){
			content.push("<div>" + a +":"+ response.data[a].from.name + "</div>");
			content.push("<div>"+ response.data[a].id + "</div> ");
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
	console.log()
	$('#siteTable').html(content.join(''));
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