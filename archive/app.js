let searchTerm = "";
let searchTermURL = "";

let bookCover = "";
let bookRating = "";
let bookReview = "";
let movieCover = "";
let movieRating = "";
let movieReview = "";

let userLocation = null;

// initializes all funtions on click
function initialize () {
    getLocation();
    
    $("#search-form").on('submit', function(e) {
        $(".displayed").remove();
        e.preventDefault();
        //console.log ("initialized")
        SetSearchTerm();
        parseSearchTermURL();
        
        googleBooks ();
        OMDB ();
        displayPoster ();
        //displayCover (); 
        showCover (); 
        amazonBook ();
        amazonVideo ();

        
    });
}

function SetSearchTerm () {
    // console.log ("search Clicked")
    searchTerm = $("#title").val();
    // console.log (searchTerm);
    $("#title").val("");
}

//Both the showCover function and the bookCover function are needed to show the book covers 
function showCover () {

let queryURL4 = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm;
    $.ajax({
        url    : queryURL4,
        method : 'GET'
    }).then(function(response) {
        //console.log(response.items[0].volumeInfo.imageLinks.thumbnail);
        //console.log(response.items[0].volumeInfo.imageLinks.thumbnail);
        // var bookRating = response.items[0].volumeInfo.averageRating;
        // var p = $('<p>').html('Book Rating: ' + bookRating);
        // $('#movieReview').append(p);
        let coverURL = response.items[0].volumeInfo.imageLinks.thumbnail;
        var bookImage = $('<img>')
        bookImage.attr('class', "displayed")
        bookImage.attr('id', 'bookCoverThumbnail');
        bookImage.attr('src', coverURL);
        $('#bookCover').append(bookImage);
        //$("#bookCover").append("<img src='" + coverURL + "'></img>");

    });

}


function googleBooks () {
    let queryURL = "https://www.googleapis.com/books/v1/volumes?q={" + searchTerm + "}";

    // Created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            //console.log ("Book:",response);
            bookRating = response.items[0].volumeInfo.averageRating
            //console.log ("Book Rating: ",bookRating);
            
            $("#bookRating").append("<div class='displayed'>Book Rating: "+ bookRating +"</div>")

        });
}

function displayPoster (){
    let queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    // Created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            // console.log ("Moive:",response);
            // console.log (response.Ratings.length);
            // console.log (response.Poster);

            //transfers url to movie poster div
    $("#moviePoster").append("<img class='displayed' src='" + response.Poster + "'></img>");
});
}

function OMDB () {
    let queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    // Created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            // console.log ("Moive:",response);
            // console.log (response.Ratings.length);
            // console.log (response.Poster);

            
            for (let i = 0; i < response.Ratings.length; i++) {
                movieRatingSource = response.Ratings[i].Source;
                movieRating = response.Ratings[i].Value;

                
                

                let movieRatingId = "movieRating" + i
                $("#movieRating").append("<div id='" + movieRatingId + "'></div>");

                let appendMoiveRatingId = "#" + movieRatingId
                $(appendMoiveRatingId).append("<div class='displayed'>Source: "+ movieRatingSource +"</div>")
                $(appendMoiveRatingId).append("<div class='displayed'>Movie Rating: "+ movieRating +"</div>")
            } 
            
        });
}

//Purchase Options

function parseSearchTermURL () {
    searchTermURL = encodeURIComponent(searchTerm);
    searchTermURL = searchTermURL.replace(/'/g, '%27');
    //console.log (searchTermURL);
}

function amazonBook () {
    //console.log (searchTermURL)

    let queryURL = "https:/www.amazon.com/s?k=" + searchTermURL + "&i=stripbooks"
    
    bookPurchase = $("<button>");
    bookPurchase.attr('class', "displayed")
    bookPurchase.attr('onclick', "window.open('" + queryURL + "','_blank')");
    bookPurchase.text("Purchase " + searchTerm + " on Amazon")
    
    $("#bookPurchase").append(bookPurchase);
} 

function amazonVideo () {
    let queryURL = "https:/www.amazon.com/s?k=" + searchTermURL + "&i=instant-video"
    
    moviePurchase = $("<button>");
    moviePurchase.attr('class', "displayed")
    moviePurchase.attr('onclick', "window.open('" + queryURL + "','_blank')");
    moviePurchase.text("Purchase " + searchTerm + " DVDs or Watch on Amazon Prime")
    
    $("#moviePurchase").append(moviePurchase);
}

//optional Map function

function getLocation() {
    console.log ("get location")
    $.ajax({
        url: "http://geoip-db.com/json/",
        method: "GET"
        }).then(function(response) {
            let responseJSON = JSON.parse(response);
            console.log (responseJSON);
            userLocation = [responseJSON.latitude,responseJSON.longitude]
            console.log(userLocation, "response")
            displayMap(); 
        });
};


function displayMap () {
    // Initialize the platform object:

    var platform = new H.service.Platform({
        'app_id': 'qpkUfh0duFwAeMj2ess7',
        'app_code': 'HH34jWNwhzhkK_HUldstMw'
        });
    
        // Obtain the default map types from the platform object
        //var maptypes = platform.createDefaultLayers();
    
        // Instantiate (and display) a map object:
        // var map = new H.Map(
        // document.getElementById('mapContainer'),
        // maptypes.normal.map,
        // {
        //   zoom: 12,
        //   center: { lng: userLocation[0], lat: userLocation[1] }
        // });




          // Instantiate the Platform class with authentication and
          // authorization credentials:
          
      
          // Instantiate a map inside the DOM element with id map. The
          // map center is in San Francisco, the zoom level is 10:
          var map = new H.Map(document.getElementById('mapContainer'),
            platform.createDefaultLayers().normal.map, {
            center: {lat: userLocation[0], lng: userLocation[1]},
            zoom: 12
            });
      

            let coordinates = "'" + userLocation[0] + "," + userLocation[1] + "'"

          // Create a group object to hold map markers:
          var group = new H.map.Group();
      
          // Create the default UI components:
          var ui = H.ui.UI.createDefault(map, platform.createDefaultLayers());
      
          // Add the group object to the map:
          map.addObject(group);
      
          // Obtain a Search object through which to submit search
          // requests:
          var search = new H.places.Search(platform.getPlacesService()),
            searchResult, error;
      
          // Define search parameters:
          console.log (coordinates)
          var params = {
          // Plain text search for places with the word "hotel"
          // associated with them:
            'q': 'book store',
          //  Search in the Chinatown district in San Francisco:
            'at': coordinates
            // 'at': '33.9533,-117.3962'
          };
      
          // Define a callback function to handle data on success:
          
          function onResult(data) {
            console.log (data.results.items)
            addPlacesToMap(data.results);
          }
      
          // Define a callback function to handle errors:
          function onError(data) {
            error = data;
          }
      
          // This function adds markers to the map, indicating each of
          // the located places:
          function addPlacesToMap(result) {
            group.addObjects(result.items.map(function (place) {
            var marker = new H.map.Marker({lat: place.position[0],
              lng: place.position[1]})
            return marker;
            }));
          }
      
          // Run a search request with parameters, headers (empty), and
          // callback functions:
          search.request(params, {}, onResult, onError);
    }

      

