let searchTerm = "";

let bookCover = "";
let bookRating = "";
let bookReview = "";
let movieCover = "";
let movieRating = "";
let movieReview = "";

// initializes all funtions on click
function initialize () {
    $("#find-title").on('click', function() {
        console.log ("initialized")
        SetSearchTerm();
        googleBooks ();
        OMDB ();
        displayPoster ();
        displayCover (); 
        showCover (); 
        amazonBook ();
        amazonVideo ();
    });
}

function SetSearchTerm () {
    console.log ("search Clicked")
    searchTerm = $("#title").val();
    console.log (searchTerm);
    $("#title").val("");
}
//Both the showCover function and the bookCover function are needed to show the book covers 
function showCover () {


var queryURL4 = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
    $.ajax({
        url    : queryURL4,
        method : 'GET'
    }).then(function(response) {
        console.log(response.items[0].volumeInfo.imageLinks.thumbnail);
        //console.log(response.items[0].volumeInfo.imageLinks.thumbnail);
        // var bookRating = response.items[0].volumeInfo.averageRating;
        // var p = $('<p>').html('Book Rating: ' + bookRating);
        // $('#movieReview').append(p);
        let coverURL = response.items[0].volumeInfo.imageLinks.thumbnail;
        var bookImage = $('<img>')
        bookImage.attr('id', 'bookCoverThumbnail');
        bookImage.attr('src', coverURL);
        $('#bookCover').append(bookImage);
        // $("#bookCover").append("<img src='" + coverURL + "'></img>");

    });

}


//Both the showCover function and the bookCover function are needed to show the book covers 
function displayCover () {


var queryURL = 'https://openlibrary.org/api/books?bibkeys=TITLE:' + searchTerm + '&jscmd=details&format=json';
    $.ajax({
        url    : queryURL,
        method : 'GET'
    }).then(function(response) {
        console.log(response);
        console.log(response['TITLE:' + searchTerm].details.isbn_13[0]);
        console.log(response['TITLE:' + searchTerm].thumbnail_url);
        // var p = $('<p>').html('Movie Rating: ' + movieRating);
        // $('#movieReview').append(p);

        let coverURL= response['TITLE:' + searchTerm].thumbnail_url;
        console.log(coverURL);
        
        let lrgCoverURL = coverURL.replace("S.jpg", "L.jpg");
        console.log(lrgCoverURL);

        $("#bookCover").append("<img src='" + lrgCoverURL + "'></img>");
        
        
    });

}

function googleBooks () {
    let queryURL = "https://www.googleapis.com/books/v1/volumes?q={" + searchTerm + "}";


    // Created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log ("Book:",response);
            bookRating = response.items[0].volumeInfo.averageRating
            console.log ("Book Rating: ",bookRating);
            


            $("#bookRating").append("<div>Book Rating: "+ bookRating +"</div>")

        });
}

function displayPoster (){
    let queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    // Created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log ("Moive:",response);
            console.log (response.Ratings.length);
            console.log (response.Poster);

            //transfers url to movie poster div
    $("#moviePoster").append("<img src='" + response.Poster + "'></img>");
});
}

function OMDB () {
    let queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    // Created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log ("Moive:",response);
            console.log (response.Ratings.length);
            console.log (response.Poster);

            
            for (let i = 0; i < response.Ratings.length; i++) {
                movieRatingSource = response.Ratings[i].Source;
                movieRating = response.Ratings[i].Value;

                
                

                let movieRatingId = "movieRating" + i
                $("#movieRating").append("<div id='" + movieRatingId + "'></div>");

                let appendMoiveRatingId = "#" + movieRatingId
                $(appendMoiveRatingId).append("<div>Source: "+ movieRatingSource +"</div>")
                $(appendMoiveRatingId).append("<div>Movie Rating: "+ movieRating +"</div>")
            } 
            
        });
}

function amazonBook () {

    let queryURL = "https:/www.amazon.com/s?k=" + searchTerm + "&i=stripbooks"
    
    bookPurchase = $("<button>");
    bookPurchase.attr('onclick', "window.open('" + queryURL + "','_black')");
    bookPurchase.text("Purchase " + searchTerm + " on Amazon")
    
    $("#bookPurchase").append(bookPurchase);
} 

function amazonVideo () {
    let queryURL = "https:/www.amazon.com/s?k=" + searchTerm + "&i=instant-video"
    
    moviePurchase = $("<button>");
    moviePurchase.attr('onclick', "window.open('" + queryURL + "','_black')");
    moviePurchase.text("Purchase " + searchTerm + " DVDs or Watch on Amazon Prime")
    
    $("#moviePurchase").append(moviePurchase);
}