// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// code required to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");

// required to get data from API search
var request = require("request");

// required to access the random.txt file
var fs = require("fs");

// required to access momeny
var moment = require("moment");

// Initiate Spotify API and access keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Global variables that define user command and search string
var action = process.argv[2];
var searchString = process.argv.slice(3).join(" ");

// Main function to determine what command was entered.  Subfunction is then called.  If user enters a command not recognized, it will console log an error message
function runLiri() {
  switch (action) {
    case "concert-this":
      bandSearch(searchString);
      break;

    case "spotify-this-song":
      searchSong(searchString);
      break;

    case "movie-this":
      searchMovie(searchString);
      break;

    case "do-what-it-says":
      randomTXT();
      break;

    default:
      console.log("COMMAND NOT FOUND");
      break;
  }
}

// Search bandsintown API (Sub-function)

function bandSearch(searchString) {
  if (action === "concert-this") {
    var artist = "";
    for (var i = 3; i < process.argv.length; i++) {
      artist += process.argv[i];
    }
    console.log(artist);
  } else {
    artist = searchString;
  }
  // queryURL that will run with id already added
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var JS = JSON.parse(body);
      for (i = 0; i < JS.length; i++) {
        // setting up data in proper moment format
        var dateForm = moment(JS[i].datetime).format("MM/DD/YYYY");
        console.log("\n==============================\n");
        // Displaying venue and concert date information
        console.log("* Name of venue: " + JS[i].venue.name);
        console.log("* Venue City: " + JS[i].venue.city);

        if (JS[i].venue.region !== "") {
          console.log("* Venue State: " + JS[i].venue.region);
        }

        console.log("* Venue Country: " + JS[i].venue.country);
        console.log("* Date of the Event: " + dateForm);
        console.log("\n==============================\n");
      }
    }
  });
}

// Sub-function for Spotify Search
function searchSong(searchString) {
  var searchSong;
  //  Setting up auto search if user enters spotify command but does not enter a song
  if (!searchString) {
    searchSong = "The Sign ace of base";
  } else {
    searchSong = searchString;
  }

  // Spotify Search
  spotify.search(
    {
      type: "track",
      query: searchSong
    },
    function(error, data) {
      if (error) {
        console.log("Error occurred: " + error);
        return;
      } else {
        // Displaying artist/song/album information
        console.log("\n==============================\n");
        console.log("* Artist: " + data.tracks.items[0].artists[0].name);
        console.log("* Song Name: " + data.tracks.items[0].name);
        console.log(
          "* Preview Link from Spotify: " + data.tracks.items[3].preview_url
        );
        console.log("* Album: " + data.tracks.items[0].album.name);
        console.log("\n==============================\n");
      }
    }
  );
}

// Sub-function for OMDB Movie search

function searchMovie(searchString) {
  var searchMovie;
  //  Setting up auto search if user enters OMDB command but does not enter a movie

  if (!searchString) {
    searchMovie = "Mr. Nobody";
  } else {
    searchMovie = searchString;
  }

  // OMDB Search with key already added
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    searchMovie +
    "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(err, res, body) {
    var bodyOf = JSON.parse(body);
    if (!err && res.statusCode === 200) {
      // Displaying movie information

      console.log("\n==============================\n");
      console.log("* Title of Movie: " + bodyOf.Title);
      console.log("* Year Movie was Released: " + bodyOf.Year);
      console.log("* IMDB Rating: " + bodyOf.imdbRating);
      console.log("* Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value);
      console.log("* Production Country: " + bodyOf.Country);
      console.log("* Language: " + bodyOf.Language);
      console.log("* Plot: " + bodyOf.Plot);
      console.log("* Actors: " + bodyOf.Actors);
      console.log("\n==============================\n");
    }
  });
}

// Sub-function if user enters do-what-it-says command
function randomTXT() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    // splitting up information in random.tx file to define variables need to run any command function
    var dataArr = data.split(",");
    action = dataArr[0];
    searchString = dataArr[1];

    runLiri(action, searchString);
  });
}

runLiri();
