function authorize() {
  var url ='https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'; //Place your DarkSky API Call Here
  $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
    console.log(data);
  });
  return;
}

$(document).ready(function() {
  var url ='https://api.darksky.net/forecast/f36149d0fa11e4b748f07d6e3878b855/37.8267,-122.4233'; //Place your DarkSky API Call Here
  $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
    console.log(data);//Review all of the data returned
    console.log("Current Temp: " + data.currently.apparentTemperature);//View Today's
    console.log("Tomorrow's High: " + data.daily.data[1].apparentTemperatureHigh);//View Tomorrow's
    var unix_time = data.currently.time;//Retrieve the current timestamp
    var javascript_time = new Date(unix_time * 1000);//Convert the unix time stamp to javascript
    console.log(javascript_time);
    console.log(javascript_time.getDay());
    console.log(data.currently.icon);
    /*
      Read the current weather information from the data point values [https://darksky.net/dev/docs#data-point] to
      update the webpage for today's weather:
      1. image_today : This should display an image for today's weather.
               This will use the icon data point and pair it with an appropriate .png file (located in the img directory.)
               */
      $('#image_today').attr('src', 'img/'+data.currently.icon+'.png');

               /*
      2. icon_today : This will be set to display the current icon value.
*/
      $('#icon_today').html(data.currently.icon);
/*
      3. temp_today : This will be updated to match the current temperature.
*/
      $('#temp_today').html(data.currently.apparentTemperature+"° F");
/*
      4. thermometer_inner : Modify the height of the thermometer to match the current temperature. This means if the
                   current temperature is 32 F, then the thermometer will have a height of 32%.  Please note,
                   this thermometer has a lower boundary of 0 and upper boundary of 100.
*/
      if (data.currently.apparentTemperature > 100){
        $('#thermometer_inner').height("100%");
      }
      else if (data.currently.apparentTemperature < 0){
        $('#thermometer_inner').height("0%");
      } else {
        $('#thermometer_inner').height(data.currently.apparentTemperature+"%")
      }

/*
      5. precip_today : This will be updated to match the current probability for precipitation.(make sure this is
                listed as a percentage %)/*/
      $('#precip_today').html(data.currently.precipProbability*100+"%");

                /*

      6. humidity_today : This will be updated to match the current humidity percentage (make sure this is listed as a
                percentage %)
*/
      $('#humidity_today').html(data.currently.humidity*100+"%");

/*
      7. wind_today : This will be updated to match the current wind speed.
*/
      $('#wind_today').html(data.currently.windSpeed+" mph");
/*

      8. summary_today: This will be updated to match the current summary for the day's weather.

    */
      $('#summary_today').html(data.currently.summary);
    /*


    /* Process the daily forecast for the next 6 days */
    /*
      For the next 6 days you'll need to add a new card listing:
        1. The image icon for the day's weather
        2. The temperature high
        3. The temperature low

      Each card should use the following format:
      <div class="col-2">
        <div class="card">
          <img class="card-img-top" src="<!-- List Icon for the Day's Weather -->" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title"><!-- List Day of the Week Here --></h5>
            <p class="card-text">High:<!--List Temperature High --> <br>
              Low: <!-- List Temperature Low --></p>
          </div>
        </div>
      </div>

      <Hint/Note> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
      be set to the innerHTML for the 6_day_forecast.

    */
    var d = new Date();
    var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //This is a helper array to help convert the day of the week [0-7] to a named value [Sunday - Saturday]
    for (i = 1; i < week_names.length; i++) {
      $('#6_day_forecast').html($('#6_day_forecast').html()+'<div class="col-2"><div class="card"><img class="card-img-top" src="img/'+data.daily.data[i].icon+'.png" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+week_names[((d.getDay()+i)%7)]+'</h5><p class="card-text">High: '+data.daily.data[i].apparentTemperatureHigh+' ° F<br>Low: '+data.daily.data[i].apparentTemperatureLow+' ° F</p></div></div></div>'
    );
    }
  })
})


//INSERT SPOTIFY SCRIPTS
function spotifyParameters(){
  params = getHashParams();
  if (params) {
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
    if (error) {
      alert('There was an error during the authentication');
    }
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
    var queryParams = "#access_token="+access_token+"&refresh_token="+refresh_token;
    return queryParams;
}
return;
}

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

function goToPage(myUrl){
  var hash = window.location.hash.substr(1);

  //params = getHashParams();
  console.log(hash);
  /*if (params) {
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
    if (error) {
      alert('There was an error during the authentication');
    }
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
    var queryParams = "?access_token="+access_token+"&refresh_token="+refresh_token+"+&error="+error;
    myUrl = myUrl + queryParams;
  }*/
  if (hash != "") {
    myUrl = myUrl + "#" + hash;
  }
  window.open(myUrl, '_self');

}

//Example of Getting Parameters
/*var params = getHashParams();
var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;
if (error) {
  alert('There was an error during the authentication');
} */


/*oauthPlaceholder.innerHTML = oauthTemplate({
  access_token: access_token,
  refresh_token: refresh_token
});
$.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    success: function(response) {
      userProfilePlaceholder.innerHTML = userProfileTemplate(response);
      $('#login').hide();
      $('#loggedin').show();
    }
});
} else {
  // render initial screen
  $('#login').show();
  $('#loggedin').hide();
}*/



function refreshSpotifyToken(){
  var params = getHashParams();
  var access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;
  $.ajax({
    url: '/refresh_token',
    data: {
      'refresh_token': refresh_token
    }
  }).done(function(data) {
    console.log(data);
    access_token = data.access_token;
    console.log("Access Token: "+access_token);
    console.log("Refresh Token "+refresh_token);
    var myUrl =window.location.pathname+"#access_token="+access_token+"&refresh_token="+refresh_token;
    window.location.href = myUrl;
    window.open(myUrl, '_self');


    return;
    /*oauthPlaceholder.innerHTML = oauthTemplate({
      access_token: access_token,
      refresh_token: refresh_token
    });*/
  });
}



function spotify(apiPath) {
  return new Promise ((resolve, reject) => {
  var obj;
  /*apiPath = "https://api.spotify.com"+apiPath+spotifyParameters().replace("#","?");
  $.ajax({url:apiPath, dataType:"jsonp"}).then(function(data) {
    console.log(data);
    return data;
  }).fail(refreshSpotifyToken());*/
  //The above is blocked by cross origin whatever.
  var params = getHashParams();
  var access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;
  console.log('https://api.spotify.com'+apiPath+'?access_token='+access_token)
  if (error) {
    alert('There was an error during the authentication');
    return;
  } else {
    if (access_token.length < 2) {
      reject("Spotify not logged in");
      return;
    }
      console.log("Access token: "+access_token);
      // render oauth info LEARN MORE ABOUT HEADERS SECTION
      $.ajax({
          url: 'https://api.spotify.com'+apiPath,
          headers: {
            // 'Authorization': 'Basic ' + btoa('myuser:mypswd'),
            // 'Order-Num': 123
            'Authorization': 'Bearer '+ access_token
          },
          // dataType:"jsonp",

          success: function(response) {
            // var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');

            // var obj = JSON.parse(response);
            resolve(response);
          },
          error: function(error){
            console.log(error);
            alert("Token needs to be refreshed!")
            refreshSpotifyToken();
            reject(new Error ("Token needs to be refreshed"));
          }

      });

    // } else {
      // console.log("No access token");    }
      // console.log(obj);
}
});
}

function spotifyPut(apiPath) {
  return new Promise ((resolve, reject) => {
  var obj;
  /*apiPath = "https://api.spotify.com"+apiPath+spotifyParameters().replace("#","?");
  $.ajax({url:apiPath, dataType:"jsonp"}).then(function(data) {
    console.log(data);
    return data;
  }).fail(refreshSpotifyToken());*/
  //The above is blocked by cross origin whatever.
  var params = getHashParams();
  var access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;
  console.log('https://api.spotify.com'+apiPath+'?access_token='+access_token)
  if (error) {
    alert('There was an error during the authentication');
    return;
  } else {
    // if (access_token) {
      console.log("Access token: "+access_token);
      // render oauth info LEARN MORE ABOUT HEADERS SECTION
      $.ajax({
          url: 'https://api.spotify.com'+apiPath,
          type: 'PUT',
          headers: {
            // 'Authorization': 'Basic ' + btoa('myuser:mypswd'),
            // 'Order-Num': 123
            'Authorization': 'Bearer '+ access_token
          },
          // dataType:"jsonp",

          success: function(response) {
            // var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');

            // var obj = JSON.parse(response);
            resolve(response);
          },
          error: function(error){
            console.log(error);
            alert("Token needs to be refreshed!")
            refreshSpotifyToken();
            reject(new Error ("Token needs to be refreshed"));
          }

      });

    // } else {
      // console.log("No access token");    }
      // console.log(obj);
}
});
}

function spotifyPost(apiPath, myData) {
  var access_token = getHashParams().access_token;
  return new Promise ((resolve, reject) => {
    $.ajax({
     url: 'https://api.spotify.com'+apiPath,
     method: "POST",
     data: myData,
     headers: {
       'Authorization': 'Bearer ' + access_token,
       'Content-Type': 'application/json'
     },
     success: function(response) {
       resolve(response);
       console.log(response);
     },
     error: function(xhr, status, error){
         var errorMessage = xhr.status + ': ' + xhr.statusText
         alert('Error - ' + JSON.stringify(xhr));
         reject(new Error(errorMessage));
     }
   });
});
}

function spotifyLogin(){
  if (getHashParams().access_token)
    window.open('/music', '_self');
  else {
    window.open('/loginSpotify', '_self');
  }

}

/*document.getElementById('spotifyPlaylists').ready(function() {
  console.log('HELLO');
  spotify("/v1/me/playlists");
});*/
function formatFromYoutube(videoName) {
  videoName = videoName.toLowerCase();
  // if (videoName.includes("official music video")){
  //   videoName = videoName.replace("official music video","");
  // }
  if (videoName.includes('feat')) {
    videoName = videoName.replace('feat', 'ft');
  }
  var artist;
  var trackName;
  artist = "";
  trackName = videoName;
  if (videoName.includes('-')) {
    artist = videoName.split('-')[0];
    trackName = videoName.split('-')[1];
  }
  if (trackName.includes(' ft. ')){
    trackName = trackName.split(' ft. ')[0];
  }
  if (trackName.includes(' ft ')){
    trackName = trackName.split(' ft ')[0];
  }
  if (artist.includes(' ft. ')){
    artist = artist.replace(' ft. ', '');
  }
  if (artist.includes(' ft ')){
    artist = artist.replace(' ft ', '');
  }
  return [trackName, artist];
}

function formatForYoutube(musicPair) {
  trackName = musicPair[0];
  artist = musicPair[1];
  return artist + " - " + trackName;
}

function formatForSpotify(musicPair) {
  trackName = musicPair[0];
  artist = musicPair[1];
  return trackName + " " + artist;
}

function musicPairsFromSpotify(href) {
  href = href.split('.com')[1];
  console.log(href);
  return new Promise ((resolve, reject) => {
    spotify(href+'?limit=1000').then((data) => {
      console.log(data);
      var musicPairs = [];
      for (i = 0; i < data.tracks.items.length; i++) {
        var trackName = data.tracks.items[i].track.name;
        var artist =    data.tracks.items[i].track.artists[0].name;
        musicPairs.push([trackName, artist]);
        console.log(musicPairs[i]);
        resolve(musicPairs);
      }
  }).catch(function(){
    reject();
  });
});
}

function transferToYoutubeFromSpotify(name, href) {
  var playlistName = name;
  musicPairsFromSpotify(href).then((musicPairs) => {
    createPlaylist(playlistName).then((playlistData) => {
      var playlistId = playlistData.result.id;
      for (i = 0; i < musicPairs.length; i++) {
        searchForVideo(formatForYoutube(musicPairs[i])).then((searchResult) => {
          var videoId = searchResult.result.items[0].id.videoId
          addVideoToPlaylist(videoId, playlistId).then((data) => {
            console.log("Video added to playlist!")
          })
        });
      }
    });
  });
}


function spotifySearch(query) {
  console.log(query);
  return new Promise ((resolve, reject) => {
    spotify('/v1/search?q='+query+'&type=track').then((data) => {
      console.log("Spotify Search:");
      console.log(data);
      resolve(data);
    });
  });
}

function spotifyCreateNewPlaylist(name) {
  myData = {
  "name": name,
  "description": "Playlist created by monosic",
  "public": true
}
  return new Promise ((resolve, reject) => {
    spotifyPost('/v1/me/playlists', JSON.stringify(myData)).then((data) => {
      console.log("Spotify new Playlist:");
      console.log(data);
      resolve(data);
    });
  });
}

function spotifyAddElementToPlaylist(songUris, playlistId) {
  myData = {
  "uris": songUris,
}
  return new Promise ((resolve, reject) => {
    spotifyPost('/v1/playlists/'+playlistId+'/tracks', JSON.stringify(myData)).then((data) => {
      console.log("Added songs to playlists:");
      console.log(data);
      resolve(data);
    });
  });

}

function musicPairsFromYoutube(playlistId) {
  return new Promise ((resolve, reject) => {
    getVideosFromPlaylist(playlistId).then((data) => {
      // console.log(data);
      var musicPairs = [];
      for (i = 0; i < data.result.items.length; i++) {
        var song = data.result.items[i].snippet.title;
        musicPairs.push(formatFromYoutube(song));
        console.log(musicPairs[i]);
        resolve(musicPairs);
      }
  }).catch(function(){
    reject();
  });
});
}

// function musicUrisFromMusicPairs(musicPairs){
//   return new Promise ((resolve, reject) => {
//     var musicUris = [];
//     for (i = 0; i < musicPairs.length; i++) {
//       spotifySearch(musicPairs[i][0] + " " + musicPairs[i][1]).then((musicInstance) => {
//         console.log(musicInstance.tracks.items[0].name);
//         console.log(musicInstance.tracks.items[0].uri);
//
//       })
//     }
//   }
//
// }

function transferToSpotifyFromYoutube(name, youtubePlaylistId) {
  var playlistName = name;
  musicPairsFromYoutube(youtubePlaylistId).then(musicPairs => {
    spotifyCreateNewPlaylist(playlistName).then((playlistData) => {
      console.log(playlistData.id);
      playlistId = playlistData.id;
      for (i = 0; i < musicPairs.length; i++) {
        try {
          spotifySearch(musicPairs[i][0]+" "+musicPairs[i][1]).then((searchResult) => {
            var musicUri = searchResult.tracks.items[0].uri;
            spotifyAddElementToPlaylist([musicUri], playlistId).then((data) => {
              console.log("Song added to playlist!")
            })
          });
        } catch{
          console.log(musicPairs[i][0] + " by "+musicPairs[i][1] + " not found");
        }
      }
    });
  });
  console.log(name);
  console.log(playlistId);

  // spotifySearch("Radioactive Imagine Dragons");
  // spotifyCreateNewPlaylist("Lemons could be good")
  //.tracks.items[i].href,id,name
}

function transferToYoutubeFromSpotify(name, href) {
  var playlistName = name;
  musicPairsFromSpotify(href).then((musicPairs) => {
    createPlaylist(playlistName).then((playlistData) => {
      var playlistId = playlistData.result.id;
      for (i = 0; i < musicPairs.length; i++) {
        searchForVideo(formatForYoutube(musicPairs[i])).then((searchResult) => {
          var videoId = searchResult.result.items[0].id.videoId
          addVideoToPlaylist(videoId, playlistId).then((data) => {
            console.log("Video added to playlist!")
          })
        });
      }
    });
  });
}



$(document).ready(function() {
  if (getHashParams().access_token.length > 1)
    $('#spotifyLogoLink').attr('src','../resources/img/spotifyLogoGray.png');
});
