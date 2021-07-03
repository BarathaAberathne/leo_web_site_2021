console.log('FB script started');

var token =
  "EAAKix4m9HeQBAAg9iI7gE8A5nYZBkTe1CcZBj4qlJmvMyRkViMY8IbfklAmQzJAJUuACpJDUT4kI4rMs8O7q1OQThyCZCi6dsYj952i6KaHLbwPBiHpqjBxJ9Ao20644cz9G0BBy4uorUyzmJdysWl1cRqy1eFrenQEobzNLwZDZD";
window.fbAsyncInit = function () {
  FB.init({
    appId: "741927846485476",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v4.0",
  });
  FB.api(
    "/leoclubofmoratuwaratmalana/albums?fields=description,picture.height(2048),created_time,name,comments,count,cover_photo,likes",
    "GET",
    {},
    function (response) {
      console.log('API initiateddd');
      var count = Object.keys(response.data).length;
      console.log('count is '+count);
      var html = "";
      for (let i = 0; i < count; i++) {
        var AlbumDescription = response.data[i].description;
        if (typeof AlbumDescription !== "undefined") {
          if (AlbumDescription.includes("Summary")) {
            //Get summary
            var projectSummaryTemp = AlbumDescription.split("|")[0];
            var projectSummary = projectSummaryTemp.split(":")[1];
            console.log("summaryTemp" + projectSummary);
            //Get Project Date
            var projectDateTemp = AlbumDescription.split("|")[2];
            var projectDate = projectDateTemp.split(":")[1];
            var projectYear = projectDate.split("/")[2];
            var projectMonth = projectDate.split("/")[1];
            console.log("Date is" + projectMonth);
            //

            if (
              response.data[i].name === "Cover Photos" ||
              response.data[i].name === "Mobile Uploads" ||
              response.data[i].name === "Timeline Photos" ||
              response.data[i].name === "Profile Pictures"
            ) {
              console.log("here we are");
            } else {
              if (projectDateTemp === "") {
                var datee = response.data[i].created_time;
                var albumYear = datee.split("-")[0];
                var albumMonth = datee.split("-")[1];
                var albumDayTime = datee.split("-")[2];
                var albumDay = albumDayTime.split("T")[0];
                var albumDate = albumYear + "/" + albumMonth + "/" + albumDay;
                console.log("ccc" + albumDate);
              }

              html += '<div class="col-md-6 col-lg-4">';
              html += '<div class="causes-item mb-md-30">';
              html += '<div class="thumb">';
              html +=
                '<img src="https://graph.facebook.com/' +
                response.data[i].cover_photo.id +
                "/picture?type=normal&access_token=" +
                token +
                '" alt="demo">';
              html += "</div>";
              html += '  <div class="content">';
              html += '    <ul class="donate-info">';
              html += '     <li class="info-item">';
              html += '       <span class="info-title">Year:</span>';
              html += '       <span class="amount">' + projectYear + "</span>";
              html += "     </li>";
              html += '     <li class="info-item">';
              html += '    <span class="info-title">Month:</span>';
              html += '    <span class="amount">' + projectMonth + "</span>";
              html += "  </li>";
              html += '  <li class="info-item">';
              html += '    <span class="info-title">Participants:</span>';
              html +=
                '    <span class="amount">' +
                response.data[i].count +
                "</span>";
              html += "  </li>";
              html += "</ul>";
              html +=
                '<h4 class="title"><a href="blog-details.html?id=' +
                response.data[i].id +
                '">' +
                response.data[i].name +
                "</a>";
              html += "</h4>";
              html += " <p>" + projectSummary.substr(0, 200) + "...</p >";
              html += "</div>";
              html += '<div class="causes-footer">';
              html += ' <div class="admin">';
              html += "</div>";
              html +=
                '     <a class="btn-theme btn-border-gradient gray-border btn-size-md" href="blog-details.html?id=' +
                response.data[i].id +
                '""><span>Read Now <img';
              html +=
                '       class="icon icon-img" src="assets/img/icons/arrow-line-right-gradient.png"';
              html += '       alt="Icon"></span></a>';
              html += " </div>";
              html += "    </div>";
              html += "  </div>";
              $("#blog_post_list").empty().append(html);
            }
          }
        }
        console.log('end is here');
      }
    },
    { access_token: token }
  );
};
