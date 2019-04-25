/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var user = null;
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var spotifyAccessToken;
var spotifyRefreshToken;

var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'http://localhost:3000/callback/';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/'))
   .use(cors())
   .use(cookieParser());

app.set('view engine', 'ejs');


app.get('/loginSpotify', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        //Adding what is immediately below:
        spotifyAccessToken = access_token;
        spotifyRefreshToken = refresh_token;
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/music#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/music#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token

  var refresh_token = req.query.refresh_token;
  spotifyRefreshToken = refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
const dbConfig = {
	host: 'localhost',
	port: 5430,
	database: 'sanmple_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

//NON SPOTIFY CODE
app.get('/linkPage', function(req, res) {
	res.render('pages/linkPage',{
    my_title:"Link Page",
    user: user
	});
});

app.get('/login', function(req, res) {
  user = null;
	res.render('pages/login',{
    my_title:"Login",
    user: user
	});
});

app.post('/login', function(req, res) { 
  var account = req.body.useraccount;
  var passw = req.body.userpassword;
  var select = "SELECT username, password FROM users WHERE username = '" + account + "' AND password = '" +  passw + "';";

  db.any(select)
    .then(function (rows) {
      user = rows[0].username;
      console.log(user)
      res.render('pages/homePage',{
        my_title: "Home Page",
        user: user
})
  })
  .catch(error => {
      console.log(error);
      // display error message in case an error
      res.render('pages/login', {
          my_title: 'Login',
          user: user
      })
  });
});


app.get('/register', function(req, res) {
	res.render('pages/register',{
    my_title:"Register",
    user: user
	});
});

app.post('/register', function(req, res) {
  var Username = req.body.username;
  var Password = req.body.password;
  var Email = req.body.email;
  var Phone = req.body.phone;
  //var select = "SELECT username FROM users WHERE username = " + Username + ";";
  //var insert_statement = "INSERT INTO users(username, password, email, phone) WHERE NOT EXISTS(SELECT username, password, email, phone FROM users WHERE (username ='" + Username + "' OR password = '" + Password + "' OR email ='" + Email +"' OR phone = '" + Phone + "'))";    
  var insert_statement = "INSERT INTO users(username, password, email, phone) VALUES('" + Username + "','" + Password + "','" + Email +"', '" + Phone + "' )";        

  db.task('get-everything', task => {
    return task.batch([
        task.any(insert_statement),
        //task.any(select)
    ]);
  })
  .then(info => {
    res.render('pages/login',{
      my_title: "Register",
      data: info[1],
      user: null
    })
  })
  .catch(error => {
    // display error message in case an error
    console.log(error);
        request.flash('error', err);
        response.render('pages/register', {
            title: 'Register',
            data: ''
        })
  });
});

app.get('/music', function(req, res) {
  if (user == null){
    res.redirect('/login');
  } else {
    res.render('pages/musicPage',{
      my_title:"Music Page",
      user: user
    });
  }
});

app.get('/homePage', function(req, res) {
	res.render('pages/homePage',{
    my_title:"Home Page",
    user: user
	});
});

app.get('/logout', function(req, res) {
  user = null;
	res.render('pages/homePage',{
    my_title:"Home Page",
    user: user
	});
});

app.get('/', function(req, res) {
  res.redirect('/homePage');
});

console.log('Listening on 3000');
app.listen(3000);

/*
{
  "error": {
    "status": 401,
    "message": "The access token expired"
  }
}
*/
