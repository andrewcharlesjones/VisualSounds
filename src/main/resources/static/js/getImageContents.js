var audio = new Audio();

$('#otheroptions').hide()

$('#push').click(function() {
	console.log('clicked')
	var postParameters = {imgurl: $('#urltext').val()};
	console.log(postParameters);

	$.post("/imageContents", postParameters, function(responseJSON) {
		console.log(responseJSON)
		responseObject = JSON.parse(responseJSON);
		console.log(responseObject)
		$('#tophit').text("We recognized your image as " + responseObject[0].name + ". Now playing a relevant song...");

		$.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: responseObject[0].name,
	            type: 'track'
	        },
	        success: function (response) {
	        	console.log("SUCCESS")
	        	console.log(response);
	        	console.log(response.tracks.items[0].name)
	            var track = response.tracks.items[0].preview_url;
	            
				audio.src = track;
				audio.play();

				updateSongName(response.tracks.items[0].name, response.tracks.items[0].artists[0].name)

				$('#amiwrong').text("Don't think that's the centerpiece of the image? Here are some other things we think it might be:")
				$('#2').text(responseObject[1].name).click(function() {
					playSongByKeyword(responseObject[1].name);
				});
				$('#3').text(responseObject[2].name).click(function() {
					playSongByKeyword(responseObject[2].name);
				});
				$('#4').text(responseObject[3].name).click(function() {
					playSongByKeyword(responseObject[3].name);
				});
				$('#5').text(responseObject[4].name).click(function() {
					playSongByKeyword(responseObject[4].name);
				});

				$('#otheroptions').show()
	        }
	    });
	});
});

var playSongByKeyword = function(keyword) {
	$.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: keyword,
            type: 'track'
        },
        success: function (response) {
            var track = response.tracks.items[0].preview_url;
            updateSongName(response.tracks.items[0].name, response.tracks.items[0].artists[0].name);
			audio.src = track;
			audio.play();
		}
	});
};

var updateSongName = function(songName, artistName) {
	$('#songname').html("<p>The track we found for you is <b>" + songName + "</b> by <b>" + artistName + "</b></p>");
}




