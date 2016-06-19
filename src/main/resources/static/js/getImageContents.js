$('#push').click(function() {
	console.log('clicked')
	var postParameters = {imgurl: $('#urltext').val()};
	console.log(postParameters);

	$.post("/imageContents", postParameters, function(responseJSON) {
		console.log(responseJSON)
		responseObject = JSON.parse(responseJSON);
		$('#tophit').text("We recognized your image as " + responseObject + ". Now playing a relevant song...");

		$.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: responseObject,
	            type: 'track'
	        },
	        success: function (response) {
	        	console.log("SUCCESS")
	        	console.log(response);
	        	console.log(response.tracks.items[0].name)
	            var track = response.tracks.items[0].preview_url;
	            var audio = new Audio();
				audio.src = track;
				audio.play();

				$('#songname').text("The track we found for you is " + response.tracks.items[0].name);
	        }
	    });
	})

});