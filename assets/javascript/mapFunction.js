//optional Map function
let userLocation = [];
let bookstoreArray = null;


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
    console.log ("display map")
    console.log (userLocation)
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
            //'at': coordinates
            'at': '33.9533,-117.3962'
          };
      
          // Define a callback function to handle data on success:
          
          function onResult(data) {
            console.log (data.results.items)
            bookstoreArray = data.results.items
            addPlacesToMap(data.results);
            AppendBootStoreList ();
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

function AppendBootStoreList () {
    console.log (bookstoreArray)
    console.log (bookstoreArray.length)
    
    for (let i = 0; i < bookstoreArray.length; i++) {
        console.log ("for Loop")
        bookstore = $("<li>");
        BookstoreIdString =  "BS" + i;
        bookstore.attr ('id', BookstoreIdString);
        bookstore.html ("Bookstore Name: " + bookstoreArray[i].title + " <br>Address: " + bookstoreArray[i].vicinity)
        console.log (bookstore)
         $("#bookstore").append(bookstore);
    }
}

      

