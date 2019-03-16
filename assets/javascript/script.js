let bookRating = null;
let movieRating = null;
// add enter to click and runs get functions
function initialize() {
	$('#title').on('keypress', function(event) {
		if (event.keyCode === 10 || event.keyCode === 13) {
			event.preventDefault();
			$('#find-title').click();
		}
	});
	$('#find-title').on('click', function() {
		console.log('initialized');
		setSearchTerm();
		parseSearchTermURL();
		showBookCover();
		getBookReview();
		getBookRating();
		purchaseBook();
		getMovieReview();
		getMovieRating();
		displayPoster();
		displayCover();
		amazonVideo();
		judge();
	});
}
// sets search term and clears previous results
function setSearchTerm() {
	console.log('search Clicked');
	searchTerm = $('#title').val();
	console.log(searchTerm);
	$('#title').val('');
	$('#bookCover').html('');
	$('#moviePoster').html('');
	$('#movieReview').html('');
	$('#bookReview').html('');
	$('#movieRating').html('');
	$('#bookRating').html('');
	$('#judgement').html('');
	$('#moviePurchase').html('');
	$('#bookPurchase').html('');
}
// sets search term URL
function parseSearchTermURL() {
	searchTermURL = encodeURIComponent(searchTerm);
	searchTermURL = searchTermURL.replace(/'/g, '%27');
	console.log(searchTermURL);
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
		var reviewUrl = response.results[0].url;
		var p = $('<p>').html('<a href="' + reviewUrl + '">Book Critic Review</a>');
		$('#bookReview').append(p);
	});
}
// adds google books book ratiing
function getBookRating() {
	var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		bookRating = response.items[0].volumeInfo.averageRating;
		var p = $('<p>').html('Book Rating: ' + bookRating);
		$('#bookRating').append(p);
	});
}
// adds new york times movie critic review
function getMovieReview() {
	var searchTitle = document.getElementById('title');
	var searchTerm = searchTitle.value;
	var queryURL =
		'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' +
		searchTerm +
		'&api-key=AGFM7Bkp4YHthCReyXQ2KGqDWUyAaMLW';
	console.log(searchTerm);
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		var reviewUrl = response.results[0].link.url;
		var p = $('<p>').html('<a href="' + reviewUrl + '">Movie Critic Review</a>');
		$('#movieReview').append(p);
	});
}
//Both the showCover function and the bookCover function are needed to show the book covers
// gets book cover from google books (small thumbnail)
function showBookCover() {
	let queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		let coverURL = response.items[0].volumeInfo.imageLinks.thumbnail;
		var bookImage = $('<img>');
		bookImage.attr('id', 'bookCoverThumbnail');
		bookImage.attr('src', coverURL);
		$('#bookCover').append(bookImage);
	});
}
// gets book cover from open library (large thumbnail)
function displayCover() {
	let queryURL = 'https://openlibrary.org/api/books?bibkeys=TITLE:' + searchTerm + '&jscmd=details&format=json';
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		console.log(response);
		console.log(response['TITLE:' + searchTerm].details.isbn_13[0]);
		console.log(response['TITLE:' + searchTerm].thumbnail_url);
		let coverURL = response['TITLE:' + searchTerm].thumbnail_url;
		console.log(coverURL);
		let lrgCoverURL = coverURL.replace('S.jpg', 'L.jpg');
		console.log(lrgCoverURL);
		$('#bookCover').append("<img src='" + lrgCoverURL + "'></img>");
	});
}
// gets movie rating from OMDB
function getMovieRating() {
	var queryURL = 'https://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&apikey=trilogy';
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		var movieRatingLong = response.Ratings[0].Value;
		var movieRatingDouble = movieRatingLong.substr(0, 3);
		movieRating = movieRatingDouble / 2;
		var p = $('<p>').html('Movie Rating: ' + movieRating);
		$('#movieRating').append(p);
	});
}
// gets movie poster from OMDB
function displayPoster() {
	let queryURL = 'https://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&apikey=trilogy';
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		let posterURL = response.Poster;
		var moviePoster = $('<img>');
		moviePoster.attr('id', 'movieposterThumbnail');
		moviePoster.attr('src', posterURL);
		$('#moviePoster').append(moviePoster);
	});
}
// adds link to puchase book from amazon
function purchaseBook() {
	console.log(searchTermURL);
	let queryURL = 'https:/www.amazon.com/s?k=' + searchTermURL + '&i=stripbooks';
	bookPurchase = $('<button>');
	bookPurchase.attr('onclick', "window.open('" + queryURL + "','_blank')");
	bookPurchase.text('Purchase ' + searchTerm + ' on Amazon');
	$('#bookPurchase').append(bookPurchase);
}
// adds link to purchase movie from amazon
function amazonVideo() {
	let queryURL = 'https:/www.amazon.com/s?k=' + searchTermURL + '&i=instant-video';
	moviePurchase = $('<button>');
	moviePurchase.attr('onclick', "window.open('" + queryURL + "','_blank')");
	moviePurchase.text('Purchase ' + searchTerm + ' or Watch on Amazon Prime');
	$('#moviePurchase').append(moviePurchase);
}
// adds book/movie judgement based on reviews
function judge() {
	if (bookRating > movieRating) {
		var bookP = $('<p>').html('The Book is Better');
		bookP.attr('id', 'judgement');
		$('#banner').append(bookP);
		var rule = $('<div>');
		rule.attr('id', 'rule');
		$('#banner').append(rule);
	} else {
		var movieP = $('<p>').html('The Movie is Better');
		movieP.attr('id', 'judgement');
		$('#banner').append(movieP);
		var rule = $('<div>');
		rule.attr('id', 'rule');
		$('#banner').append(rule);
	}
}
