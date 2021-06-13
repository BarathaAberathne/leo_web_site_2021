//Youtube section
$(document).ready(function () {
  var youtubeLink = "https://www.youtube.com/channel/UCjj_tHYJgEfiUk3FwWzN-VQ";
  var key = "AIzaSyDwT0VGzZgbIeolRMdR4_pqyWFJx-0mcOU";
  var channel = "UCjj_tHYJgEfiUk3FwWzN-VQ";
  var URL = "https://www.googleapis.com/youtube/v3/playlists";
  var param1 = {
    part: "snippet",
    key: key,
    maxResults: 3,
    channelId: channel,
  };

  loadPlayLists();
  function loadPlayLists() {
    $.getJSON(URL, param1, function (data) {
      var playlistCount = 1; //data.items.length
      for (let index = 0; index < playlistCount; index++) {
        console.log(data.items[index].id);
        var playlistId = data.items[index].id;
        //Load videos from playlists
        var param2 = {
          part: "snippet",
          key: key,
          maxResults: 3,
          playlistId: playlistId,
        };
        var URL2 = "https://www.googleapis.com/youtube/v3/playlistItems";
        loadVideos();
        function loadVideos() {
          $.getJSON(URL2, param2, function (data2) {
            var videoCount = data2.items.length;
            console.log(videoCount);
            html = "";
            for (let index = 0; index < videoCount; index++) {
              console.log("video title" + data2.items[index].snippet.title);
              var title = data2.items[index].snippet.title;
              console.log(
                "video date" + data2.items[index].snippet.publishedAt
              );
              var date = data2.items[index].snippet.publishedAt;
              console.log(
                "video thumbnail : " +
                  data2.items[index].snippet.thumbnails.high.url
              );
              var thumb = data2.items[index].snippet.thumbnails.high.url;
              html += '<div id="video_box" class="event-item">';
              html += '<div class="thumb">';

              html +=
                '  <img class="thumb-img" src="' +
                thumb +
                '" alt="Image-Givest">';
              html +=
                '  <a href="' +
                youtubeLink +
                '" target="_blank" class="btn-theme btn-gradient btn-size-sm">Watch now <img';
              html +=
                '      class="icon icon-img" src="assets/img/icons/arrow-line-right.png" alt="Icon"></a>';
              html += "</div>";
              html += '<div class="content">';
              html +=
                '  <div class="event-info"><span>' + date + "</span></div>";
              html +=
                '  <h4 class="event-name"><a href="' +
                youtubeLink +
                '" target="_blank">' +
                title +
                "</a></h4>";
              html += "</div>";
              html += "</div>   ";
              $("#video_list").empty().append(html);
            }
          });
        }
      }
    });
  }
});
