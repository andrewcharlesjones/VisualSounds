var audio = new Audio();

$('#otheroptions').hide()
$('#resetbutton').hide()

$('#push').click(function() {
	var postParameters = {imgurl: $('#urltext').val()};

	$.post("/imageContents", postParameters, function(responseJSON) {
		responseObject = JSON.parse(responseJSON);
		$('#tophit').text("We recognized your image as " + responseObject[0].name + ". Now playing a relevant song...");

		$.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: responseObject[0].name,
	            type: 'track'
	        },
	        success: function (response) {
	            var track = response.tracks.items[0].preview_url;

	            $('#inputimage').html('<p>Your image:</p><br><img src=' + $('#urltext').val() + ' height="150" width="150">')
	            
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

				$('#otheroptions').show();
				$('#resetbutton').show();
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

$('#reset').click(function() {
	window.location.reload();
});

// click enter to submit url form
$("#urltext").keyup(function(event){
    if(event.keyCode == 13){
        $("#push").click();
    }
});

var findSongAndPlay = function(imageurl) {

	var postParameters = {imgurl: imageurl};

	$.post("/imageContents", postParameters, function(responseJSON) {
		responseObject = JSON.parse(responseJSON);
		$('#tophit').text("We recognized your image as " + responseObject[0].name + ". Now playing a relevant song...");

		$.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: responseObject[0].name,
	            type: 'track'
	        },
	        success: function (response) {
	            var track = response.tracks.items[0].preview_url;

	            $('#inputimage').html('<p>Your image:</p><br><img src=' + imageurl + ' height="150" width="150">')
	            
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

				$('#chicken').hide();
				$('#gandalf').hide();

				$('#otheroptions').show();
				$('#resetbutton').show();
	        }
	    });
	});
};

$('#chicken').click(function() {
	findSongAndPlay("http://vignette1.wikia.nocookie.net/animalcrossing/images/4/41/Chicken.jpg/revision/latest?cb=20130606165306")
});

$('#gandalf').click(function() {
	findSongAndPlay("http://vignette2.wikia.nocookie.net/lotr/images/8/8d/Gandalf-2.jpg/revision/latest?cb=20130209172436")
});




