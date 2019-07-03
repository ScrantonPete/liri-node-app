<img src="assets\movie-music.jpg" title="LIRI-NODE-APP" alt="LIRI-NODE-APP"></a>

# LIRI-NODE-APP

> Search Spotify, BandsInTown, or OMDB Move Database all through the TERMINAL!!!

https://scrantonpete.github.io/liri-node-app/

**Commands accepted with expected outputs**

**_'concert-this'_**

- This will show you the upcoming concert venue, location, and date based on BandsInTown API

**_'spotify-this-song'_**

- This will show you information about the song, such as Band/Artist, Release Year, Album Name, and possibly a song preview from Spotify API

**_'movie-this'_**

- This will show you information about the movie, such as Release Year, Rating, Plot and starring Actors from OMDB Movie Database

**_'do-what-it-says'_**

- This will show you a Random search from one of the above

**Before you get started, make sure you have these node packages installed:**

1. **Dotenv:** Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

   _Command Line: 'npm install dotenv'_

2) **Request:** - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

   _Command Line: 'npm install request'_

3) **Moment:** - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

   _Command Line: 'npm install moment'_

4) **Fs:** - a built in node package

   _(npm i request)_

Read more about these methods [here](https://www.npmjs.com/)

### Functionality

---

1. concert-this

   _<command, artist name>_

   Function takes the userInput (command) and the userQuery(band/artist), and returns the upcoming concert times and dates for that artist, as well as location.

   ![image of concert-this-code](/assets/concert-this-code.png)
   ![image of concert-this-output](/assets/concert-this-output.png)

2. spotify-this

   _<command, song name>_

   Function takes the userInput (command) and the userQuery(song), and returns the artist, full track name, a preview link and the album.

   ![image of spotify-this-code](/assets/spotify-this-song-code.png)
   ![image of spotify-this-output](/assets/spotify-this-song-output.png)

3) movie-this
   _<command, movie name>_

   Function takes the userInput (command) and the userQuery(song), and returns title, cast, release date, ratings, country of origin, original language and synopsis.
   ![image of movie-this-code](/assets/movie-this-code.png)
   ![image of movie-this-output](/assets/movie-this-output.png)

4. do-this

   _<command>_

   This function is a wildcard that will randomly select one of the functions and produce a search. The only way to find out what it does is to try!


    ![image of doThis](/assets/do-what-it-says-code.png)
    ![image of doThis](/assets/do-what-it-says-output.png)
    ![image of doThis](/assets/do-what-it-says-random.png)

### Developer

Pete Rezanka painstakingly wrote the code, took screen shots, and was the sole contributor of this APP. I relied heavily on past Class Activities along with GoogleFU, lol!
