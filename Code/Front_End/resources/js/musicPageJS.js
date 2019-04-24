$(document).ready(function() {
  console.log("Hello")
  var access_token = getHashParams().access_token;

  /*spotifyPost("/v1/me/playlists", JSON.stringify({
    name: "Lemonade!", description: "This app was created by Monosic", public: true
  }));*/

  //This is putting your playlists in the javascript.
  spotify("/v1/me/playlists").then((data) => {
    console.log(data);
    $('#spotifyPlaylists').html('');
    if (data.items.length == 0){
      console.log("NO PLAYLISTS");
    }
    else {
      for (i = 0; i < data.items.length; i++) {
        $('#spotifyPlaylists').html($('#spotifyPlaylists').html()+'<button id = "spotifyButton'+i+'" onClick = "transferToYoutubeFromSpotify(\'spotifyButton'+i+'\',\''+data.items[i].name+'\',\''+data.items[i].href+'\')" class = "button1" id = "button1" style = "vertical-align: middle; width:100%; position:relative; left:40px"> <span>'+data.items[i].name+'</span></button>'
      );//spotifyButton'+i+'\','
      // $('#spotifyPlaylists').html($('#spotifyPlaylists').html()+'<button id = "spotifyButton'+i+'" onClick = "transferToYoutubeFromSpotify(\''+data.items[i].name+'\',\''+data.items[i].href+'\')" class = "button1" id = "button1" style = "vertical-align: middle; width:100%; position:relative; left:40px"> <span>'+data.items[i].name+'</span></button>'

    }

  }

  });


  // spotifyPut("/v1/me/player/pause");

  // The Youtube changing is done in the youtube script, as that is where the signin occurs, which is done differently
  console.log(myYoutubePlaylists);




  });
