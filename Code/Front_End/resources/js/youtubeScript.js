const CLIENT_ID = 'YOUTUBE_CLIENT_ID';
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  ];
  const SCOPES = 'https://www.googleapis.com/auth/youtube';

  // const authorizeButton = document.getElementById('authorize-button');
  // const signoutButton = document.getElementById('signout-button');
  // const content = document.getElementById('content');
  // const channelForm = document.getElementById('channel-form');
  // const channelInput = document.getElementById('channel-input');
  // const videoContainer = document.getElementById('video-container');


var isSignedIn = false;
var myYoutubePlaylists;

  // Form submit and change channel

  // Load auth2 library
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  // Init API client library and set up sign in listeners
  function initClient() {
    gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
      .then(() => {
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle initial sign in state
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
      });
  }


  // Update UI sign in state changes
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // getMyYoutubePlaylists();
      $('#youtubeLogoLink').attr('src','../resources/img/youtubeLogoGray.png');
      getMyYoutubePlaylists().then((data) => {
        console.log(data);
        myYoutubePlaylists = data;
      });
      // Mine: createPlaylist("Dis is new playlsit");
      // Mine:  searchForVideo("Lil Dicky - White Dude");

      // authorizeButton.style.display = 'none';
      // signoutButton.style.display = 'block';
      // content.style.display = 'block';
      // videoContainer.style.display = 'block';
      // getChannel(defaultChannel);
    } else {
      if($('#youtubePlaylists').length){
        $('#youtubePlaylists').html('<p style = "color: white; text-align: center; padding-top: 30px;">This service is not linked yet</p>');
      }
      $('#youtubeLogoLink').attr('src','../resources/img/youtubeLogo.png');

      // authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
      // content.style.display = 'none';
      // videoContainer.style.display = 'none';
    }
  }

  // Handle login
  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
    isSignedIn = true;
  }

  // Handle logout
  function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
    isSignedIn = false;
    // isSignedIn = false;
  }

  // Display channel data
  /*function showChannelData(data) {
    const channelData = document.getElementById('channel-data');
    channelData.innerHTML = data;
  }*/

  // Get channel from API
  function createPlaylist(playlistTitle) {
    return new Promise ((resolve, reject) => {
    var request = gapi.client.request({
      'method': 'POST',
      'path': '/youtube/v3/playlists',
      'params': {'part': 'snippet,status', 'mine': 'true'},
      'body': {
      "snippet": {
        "title": playlistTitle,
        "description": "Monosic Created Playlist.",
        "tags": [
          "sample playlist",
          "API call"
        ],
        "defaultLanguage": "en"
      },
      "status": {
        "privacyStatus": "private"
      }
    },
    }).then((data) => {
    console.log("New playlist below:");
    console.log(data);
    resolve(data);
    // console.log(response);
  });
});
}

function addVideoToPlaylist(videoId, playlistId) {
  console.log("Adding video to playlist!")
  return new Promise ((resolve, reject) => {
  var request = gapi.client.request({
    'method': 'POST',
    'path': '/youtube/v3/playlistItems',
    'params': {'part': 'snippet'},
    'body': {
      "snippet": {
        "playlistId": playlistId,
        "position": 0,
        "resourceId": {
          "kind": "youtube#video",
          "videoId": videoId
        }
      }
    }
  }).then((data) => {
  console.log("New playlist item, now with video added.:");
  console.log(data);
  resolve(data);
  // console.log(response);
});
});
}

function searchForVideo(query) {
  return new Promise ((resolve, reject) => {
  var request = gapi.client.request({
'method': 'GET',
'path': '/youtube/v3/search',
'params': {'part': 'snippet', 'q': query},
"status": {
  "privacyStatus": "private"
}
}).then((data) => {
  console.log(data);
  console.log("Video id: " + data.result.items[0].id.videoId);
  resolve(data);
  // console.log(response);
});
});
}

function getVideosFromPlaylist(playlistId) {
  return new Promise ((resolve, reject) => {
  var request = gapi.client.request({
'method': 'GET',
'path': '/youtube/v3/playlistItems',
'params': {'part': 'snippet', 'maxResults': '50', 'playlistId': playlistId},
"status": {
  "privacyStatus": "private"
}
}).then((data) => {
  console.log("Playlist");
  console.log(data);
  resolve(data);
  // console.log(response);
});
});
}

function getMyYoutubePlaylists() {
  return new Promise ((resolve, reject) => {
  var request = gapi.client.request({
'method': 'GET',
'path': '/youtube/v3/playlists',
'params': {'part': 'snippet,status', 'maxResults': '50', 'mine': 'true'},
"status": {
  "privacyStatus": "private"
}
}).then((data) => {
  if($('#youtubePlaylists').length){
    $('#youtubePlaylists').html('');
    if (data.result.items.length == 0){
      console.log("NO YOUTUBE PLAYLISTS");
    }
    else {
      for (i = 0; i < data.result.items.length; i++) {
        $('#youtubePlaylists').html($('#youtubePlaylists').html()+'<button id = "youtubeButton'+i+'" onClick = "transferToSpotifyFromYoutube(\'youtubeButton'+i+'\',\''+data.result.items[i].snippet.title+'\', \''+data.result.items[i].id+'\')" class = "button1" id = "button1" style = "vertical-align: middle; width:100%; position:relative; left:40px"> <span>'+data.result.items[i].snippet.title+'</span></button>'
      );}
    }
  }
  resolve(data);
  // console.log(response);
});
});
  }

  // Add commas to number
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /*function requestVideoPlaylist(playlistId) {
    const requestOptions = {
      playlistId: playlistId,
      part: 'snippet',
      maxResults: 10
    };

    const request = gapi.client.youtube.playlistItems.list(requestOptions);

    request.execute(response => {
      console.log(response);
      const playListItems = response.result.items;
      if (playListItems) {
        let output = '<br><h4 class="center-align">Latest Videos</h4>';

        // Loop through videos and append output
        playListItems.forEach(item => {
          const videoId = item.snippet.resourceId.videoId;

          output += `
            <div class="col s3">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          `;
        });

        // Output videos
        videoContainer.innerHTML = output;
      } else {
        videoContainer.innerHTML = 'No Uploaded Videos';
      }
    });
  }*/

  function alterSignin() {
    if (isSignedIn) {
      handleSignoutClick();
    } else {
      handleAuthClick();
    }


  }

  $(document).ready(function() {
    updateSigninStatus
  });
