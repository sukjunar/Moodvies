$(document).ready(function () {

    //   var emotionMappingObject = {
    //     sad: "0ejyqdntIi7ZukKgCABVFq",
    //     angry: "1yrVnLy8kZYvp8r6XuLono",
    //     happy: "6AtEuKdXIbx2w5Lhqf0GRP",
    //     disgust: "7LzO31VmX8H8oHPCZk7AKw",
    //     neutral: "4KjjGytXjIH2KZ41HKjz4R",
    //     fear: "1Alb1XSrOASaO2Wdrr7lL8",
    //     suprise: "3gbUs7iNyYP6E3cr9xQZsD"
    //   };

    var start = window.location.href.indexOf("=");
    var end = window.location.href.indexOf("&");
    var str = window.location.href;
    var token = str.substring(start + 1, end);
    //FOR TESTING ON LOCAL MACHINE 

    var playlistId = "";

    // console.log("token: ",token);
    // var emotion = "disgust";
    // displayPlaylist(emotion);

    function displayPlaylist(emotion) {
        //run the ajax call
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=" + emotion + "&type=playlist&limit=1",
            headers: {
                'Authorization': "Bearer " + token
            },
            success: function (response) {
                console.log("response: ", response)
                console.log(response.playlists.items[0].uri);
                playlistId = response.playlists.items[0].uri;
                playlistId = encodeURIComponent(playlistId);
                var playlistUrl = "https://open.spotify.com/embed?uri=" + playlistId + "&theme=white";
                console.log("play list URL: " + playlistUrl);
                $("#playlist").attr('src', playlistUrl);
            }
            //pass the emotion to the API
            //add the playlist to the iframe
        });
    }

    // ======================================================================

    // ** Ajax POST request for Face++ (works for URL only)** 

    // ======================================================================
    // This .on("click") function will trigger the AJAX Call 
    function getEmotion ( imageUrl ) {
        
        var settings = {
            url: "https://cors-anywhere.herokuapp.com/https://api-us.faceplusplus.com/facepp/v3/detect?api_key=IxaSYmkV56pcddBXwcShQhnJenSDqE0B&api_secret=CKz2ziVEr8tiDMX8dIWpD5hjeyme102o&image_url=" + imageUrl + "&return_attributes=emotion",
            method: "POST"
        }



        $.ajax(settings).done(function (response) {

            var emotionArray = response.faces[0].attributes.emotion;
            console.log(emotionArray);

            keysSorted = Object.keys(emotionArray).sort(function (a, b) {
                return emotionArray[a] - emotionArray[b]
            })
            console.log(keysSorted);

            var emotion = keysSorted[keysSorted.length - 1];

            displayPlaylist(emotion);
        });
    }
    // ======================================================================
    // ** Take input from "upload button" and convert it into a data-form that can be used in the "query string URL"


    $(document).on("click", "#upload_widget_opener", function () {
        cloudinary.openUploadWidget({
            cloud_name: 'moodyappcloudname',
            upload_preset: 'qibijsfk'
        },
        function (error, result) {
            console.log(error, result)
            $("#placeholderImage").attr( "src", result[0].url );

            getEmotion( result[0].url );
        });
    });

    var value = 0
    $("#placeholderImage").rotate({
        bind: {
            click: function () {
                value += 90;
                $(this).rotate({
                    animateTo: value
                })
            }
        }
    });
    
    
});

// ======================================================================