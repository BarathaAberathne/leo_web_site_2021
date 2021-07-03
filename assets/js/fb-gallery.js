console.log("fb gallery loaded");
var token =
    "EAAKix4m9HeQBACRnatpCQ4LJ7lzJKnRnKzR7kOAwq6HlddHMtQQ9aZBsD7ss1Rx9ijhqnKGKmARZAR3ngzZA7esc8l8XhS3N7ObLNjKivSkIleYIMgLIilhs8xWCeuLlVYzuuB9p3o5BpwUouxmKaTooDZAUNZCJWFmzsDX6yYQZDZD";
window.fbAsyncInit = function () {
    FB.init({
        appId: "741927846485476",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v4.0",
    });
    FB.api(
        "/leoclubofmoratuwaratmalana/feed?fields=id,full_picture",
        "GET",
        {},
        function (response) {

            var count = Object.keys(response.data).length;
            console.log(count);
            var html = "";
            for (let i = 0; i <= count; i++) {
                if (typeof response.data[i].full_picture !== "undefined") {

                    console.log(response.data[i].id);

                    var photoLink = response.data[i].full_picture;
                    console.log("photoLink : "+photoLink);

                    html += '<div class="col-lg-3 col-md-4 col-xs-6 thumb">';
                    html += '     <a href="' + photoLink + '"';
                    html += '      class="fancybox" rel="ligthbox">';
                    html += '      <img';
                    html += '        src="' + photoLink + '"';
                    html += '        class="zoom img-fluid " alt="">';
                    html += '       </a>';
                    html += '    </div>';

                    $("#gallery_list").empty().append(html);
                }
            }
        },
        { access_token: token }
    );
};
