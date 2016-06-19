$('#push').click(function() {
	console.log('clicked')
	var postParameters = {imgurl: $('#urltext').val()};
	console.log(postParameters);

	$.post("/imageContents", postParameters, function(reponseJSON) {
		responseObject = JSON.parse(responseJSON);
	})
})