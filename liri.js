// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// code required to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");

// required to axios pull search data
var axios = require("axios");

// required to access the random.txt file
var fs = require("fs");

// required to access moment
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
  // queryURL that will run with id already added
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    searchString +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function(response) {
      // testing axios pull
      // console.log(response);
      var jsonData = response.data;
      for (var i = 0; i < response.data.length; i++) {
        var dateForm = moment(jsonData[i].datetime).format("MM/DD/YYYY");
        console.log("\n==============================\n");

        var eventResults = [
          "* Name of Venue: " + jsonData[i].venue.name,
          "* Venue Location: " +
            jsonData[i].venue.city +
            " " +
            jsonData[i].venue.region +
            " " +
            jsonData[i].venue.country,
          "* Date of Event: " + dateForm
        ].join("\n\n");
        console.log(eventResults);
        console.log("\n==============================\n");
      }
    })
    .catch(function(error) {
      console.log(error);
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

  axios.get(queryUrl).then(function(response) {
    var jsonData = response.data;
    // testing axios pull
    // console.log(response);
    console.log("\n==============================\n");

    var movieData = [
      "* Title of Movie: " + jsonData.Title,
      "* Year Movie was Released: " + jsonData.Year,
      "* IMDB Rating: " + jsonData.imdbRating,
      "* Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
      "* Production Country: " + jsonData.Country,
      "* Language: " + jsonData.Language,
      "* Plot: " + jsonData.Plot,
      "* Actors: " + jsonData.Actors
    ].join("\n\n");
    console.log(movieData);
    console.log("\n==============================\n");
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
