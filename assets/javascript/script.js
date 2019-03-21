let bookRating = null;
let bookTitle = null;
let bookPoster = null;
let bookPlot = null;
let bookReview = null;
let getBook = null;
let movieRating = null;
let movieTitle = null;
let moviePoster = null;
let moviePlot = null;
let movieReview = null;
let getMovie = null;
// add enter to click and runs get functions
function initialize() {
	$('#title').on('keypress', function(event) {
		if (event.keyCode === 10 || event.keyCode === 13) {
			event.preventDefault();
			$('#find-title').click();
		}
	});
	$('#find-title').on('click', function() {
		setSearchTerm();
		parseSearchTermURL();
		getMovieContent();
		getMovieReview();
		getBookReview();
		getBookContent();
		movieGet();
		bookGet();
	});
}
// sets search term and clears previous results
function setSearchTerm() {
	searchTerm = $('#title').val();
}
// sets search term URL
function parseSearchTermURL() {
	searchTermURL = encodeURIComponent(searchTerm);
	searchTermURL = searchTermURL.replace(/'/g, '%27');
}
// gets movie rating, poster, plot, and title from omdb
function getMovieContent() {
	var queryURL = 'https://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&apikey=trilogy';
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		var movieRatingLong = response.Ratings[0].Value;
		var movieRatingDouble = movieRatingLong.substr(0, 3);
		var movieRatingUnround = movieRatingDouble / 2;
		movieRating = Math.round(movieRatingUnround * 10) / 10;
		var moviePosterUrl = response.Poster;
		moviePoster = $('<img>');
		moviePoster.attr('id', 'movieposterThumbnail');
		moviePoster.attr('src', moviePosterUrl);
		moviePlot = response.Plot;
		movieTitle = response.Title;
		setContent();
	});
}
// gets movie review from nyt
function getMovieReview() {
	var searchTitle = document.getElementById('title');
	var searchTerm = searchTitle.value;
	var queryURL =
		'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' +
		searchTerm +
		'&api-key=AGFM7Bkp4YHthCReyXQ2KGqDWUyAaMLW';
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		movieReview = response.results[0].link.url;
		setContent();
	});
}
// gets book rating, poster, title, and plot from google
function getBookContent() {
	var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		bookRating = response.items[0].volumeInfo.averageRating;
		var bookPosterURL = response.items[0].volumeInfo.imageLinks.thumbnail;
		bookPoster = $('<img>');
		bookPoster.attr('src', bookPosterURL);
		bookTitle = response.items[0].volumeInfo.title;
		bookPlot = response.items[0].volumeInfo.description;
		setContent();
	});
}
// adds new york times book critic review
function getBookReview() {
	var queryURL =
		'https://api.nytimes.com/svc/books/v3/reviews.json?title=' +
		searchTerm +
		'&api-key=AGFM7Bkp4YHthCReyXQ2KGqDWUyAaMLW';
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		bookReview = response.results[0].url;
		setContent();
	});
}
// adds link to puchase book from amazon
function bookGet() {
	getBook = 'https:/www.amazon.com/s?k=' + searchTermURL + '&i=stripbooks';
	setContent();
}
// adds link to purchase movie from amazon
function movieGet() {
	getMovie = 'https:/www.amazon.com/s?k=' + searchTermURL + '&i=instant-video';
	setContent();
}
// sets content in html
function setContent() {
	$('.ratingLogoDiv').html('<img class="ratingLogo" src="./assets/images/rating-icon.svg">');
	if (movieRating > bookRating) {
		$('#whatsBetter').html('The Movie is Better');
		$('#winnerTitle').html('<img class="ratingLogo" src="./assets/images/picture-icon.svg">' + movieTitle);
		$('#winnerRating').html(movieRating);
		$('#loserRating').html(bookRating);
		$('#winnerPoster').html(moviePoster);
		$('#loserPoster').html(bookPoster);
		$('#winnerPlot').html(moviePlot);
		$('#loserPlot').html(bookPlot);
		$('#winnerReview').html(
			'<img class="reviewLogo" src="./assets/images/critic-icon.svg">' +
				'<a href="' +
				movieReview +
				'">NYT Critic Review</a>'
		);
		$('#loserReview').html(
			'<img class="reviewLogo" src="./assets/images/critic-icon.svg">' +
				'<a href="' +
				bookReview +
				'">NYT Critic Review</a>'
		);
		$('#winnerPoster').html(moviePoster);
		$('#loserPoster').html(bookPoster);
		$('#winnerGet').html(
			'<img class="reviewLogo" src="./assets/images/get-icon.svg">' +
				'<a  href="' +
				getMovie +
				'">Get Book on Amazon</a>'
		);
		$('#loserGet').html(
			'<img class="reviewLogo" src="./assets/images/get-icon.svg">' +
				'<a href="' +
				getBook +
				'">Watch on Amazon Prime</a>'
		);
	} else {
		$('#whatsBetter').html('The Book is Better');
		$('#winnerTitle').html('<img class="ratingLogo" src="./assets/images/paper-icon.svg">' + bookTitle);
		$('#winnerRating').html(bookRating);
		$('#loserRating').html(movieRating);
		$('#winnerPoster').html(bookPoster);
		$('#loserPoster').html(moviePoster);
		$('#winnerPlot').html(bookPlot);
		$('#loserPlot').html(moviePlot);
		$('#winnerReview').html(
			'<img class="reviewLogo" src="./assets/images/critic-icon.svg">' +
				'<a href="' +
				bookReview +
				'">NYT Critic Review</a>'
		);
		$('#loserReview').html(
			'<img class="reviewLogo" src="./assets/images/critic-icon.svg">' +
				'<a href="' +
				movieReview +
				'">NYT Critic Review</a>'
		);
		$('#winnerPoster').html(bookPoster);
		$('#loserPoster').html(moviePoster);
		$('#winnerGet').html(
			'<img class="reviewLogo" src="./assets/images/get-icon.svg">' +
				'<a  href="' +
				getBook +
				'">Get Book on Amazon</a>'
		);
		$('#loserGet').html(
			'<img class="reviewLogo" src="./assets/images/get-icon.svg">' +
				'<a href="' +
				getMovie +
				'">Watch on Amazon Prime</a>'
		);
	}
}
