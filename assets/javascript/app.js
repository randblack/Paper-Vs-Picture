let searchTerm = "";

let bookCover = "";
let bookRating = "";
let bookReview = "";
let movieCover = "";
let movieRating = "";
let movieReview = "";

function initialize () {
    $("#find-title").on('click', function() {
        console.log ("initialized")
        SetSearchTerm();
        googleBooks ();
        OMDB ();
    });
}

function SetSearchTerm () {
    console.log ("search Clicked")
    searchTerm = $("#title").val();
    console.log (searchTerm);
    $("#title").val("");
}

function googleBooks () {
    let queryURL = "https://www.googleapis.com/books/v1/volumes?q={" + searchTerm + "}";

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

function OMDB () {
    let queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log ("Moive:",response);
            console.log (response.Ratings.length);
            for (let i = 0; i < response.Ratings.length; i++) {
                movieRatingSource = response.Ratings[i].Source;
                movieRating = response.Ratings[i].Value;

                let movieRatingId = "movieRating" + i
                $("#movieRating").append("<div id='" + movieRatingId + "'></div>");

                let appendMoiveRatingId = "#" + movieRatingId
                $(appendMoiveRatingId).append("<div>Source: "+ movieRatingSource +"</div>")
                $(appendMoiveRatingId).append("<div>Moive Rating: "+ movieRating +"</div>")
            } 
        });
}