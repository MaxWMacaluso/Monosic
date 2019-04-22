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
    // if (access_token) {
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
            console.log(`response type: ${typeof response}`);
            console.log(response);
            console.log(response.items[0].name);
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

/*document.getElementById('spotifyPlaylists').ready(function() {
  console.log('HELLO');
  spotify("/v1/me/playlists");
});*/

$(document).ready(function() {
  if (getHashParams().access_token.length > 1)
    $('#spotifyLogoLink').attr('src','../resources/img/spotifyLogoGray.png');
});
