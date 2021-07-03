console.log("fb gallery loaded");
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
