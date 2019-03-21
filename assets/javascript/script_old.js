function readyDocument() {
	$('#movieReview').on('keypress', function(event) {
		if (event.keyCode === 10 || event.keyCode === 13) {
			event.preventDefault();
			$('#newAnimalBtn').click();
		}
	});
}
let bookRating = null;
let movieRating = null;
function addReviews() {
	$('#movieReview').html('');
	$('#bookReview').html('');
	$('#movieRating').html('');
	$('#bookRating').html('');
	$('#judgement').html('');
	var searchTitle = document.getElementById('searchTitle');
	var searchTerm = searchTitle.value;

	var queryURL1 =
		'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' +
		searchTerm +
		'&api-key=AGFM7Bkp4YHthCReyXQ2KGqDWUyAaMLW';
	console.log(searchTerm);
	$.ajax({
		url    : queryURL1,
		method : 'GET'
	}).then(function(response) {
		var reviewUrl = response.results[0].link.url;
		var p = $('<p>').html('<a href="' + reviewUrl + '">Movie Critic Review</a>');
		$('#movieReview').append(p);
	});

	var queryURL2 =
		'https://api.nytimes.com/svc/books/v3/reviews.json?title=' +
		searchTerm +
		'&api-key=AGFM7Bkp4YHthCReyXQ2KGqDWUyAaMLW';
	$.ajax({
		url    : queryURL2,
		method : 'GET'
	}).then(function(response) {
		var reviewUrl = response.results[0].url;
		var p = $('<p>').html('<a href="' + reviewUrl + '">Book Critic Review</a>');
		$('#bookReview').append(p);
	});

	var queryURL3 = 'https://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&apikey=trilogy';
	$.ajax({
		url    : queryURL3,
		method : 'GET'
	}).then(function(response) {
		var movieRatingLong = response.Ratings[0].Value;
		var movieRatingDouble = movieRatingLong.substr(0, 3);
		movieRating = movieRatingDouble / 2;
		var p = $('<p>').html('Movie Rating: ' + movieRating);
		$('#movieRating').append(p);
	});

	var queryURL4 = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
	$.ajax({
		url    : queryURL4,
		method : 'GET'
	}).then(function(response) {
		bookRating = response.items[0].volumeInfo.averageRating;
		var p = $('<p>').html('Book Rating: ' + bookRating);
		$('#bookRating').append(p);
		judge();
	});
}

function judge() {
	if (bookRating > movieRating) {
		var bookP = $('<p>').html('The Book is Better');
		$('#judgement').append(bookP);
	} else {
		var movieP = $('<p>').html('The Movie is Better');
		$('#judgement').append(movieP);
	}
}
