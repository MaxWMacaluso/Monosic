$(document).ready(function() {
  //This is putting your playlists in the javascript.
  spotify("/v1/me/playlists").then((data) => {
    console.log(data);
    $('#spotifyPlaylists').html('');
    if (data.items.length == 0){
      console.log("NO PLAYLISTS");
    }
    else {
      for (i = 0; i < data.items.length; i++) {
        $('#spotifyPlaylists').html($('#spotifyPlaylists').html()+'<button class = "button1" id = "button1" style = "vertical-align: middle; width:100%; position:relative; left:40px"> <span>'+data.items[i].name+'</span></button>'
      );
    }

  }
  });

  });
