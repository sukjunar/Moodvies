const faceAPI = function (uploadedImage) {
    const imageURL = uploadedImage

    const queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=Ev9zIZLIwjiT5zSHtXHBYRJTZaaEcHpL&api_secret=lfu6EgDOwcUhGoeM0uVmMi0Io_qM2re_&image_url=" + imageURL + "&return_attributes=emotion";
    $.ajax({
        url: queryURL,
        method: 'POST'
    }).then(function (response) {
        const anger = (response.faces[0].attributes.emotion.anger);
        const disgust = (response.faces[0].attributes.emotion.disgust);
        const fear = (response.faces[0].attributes.emotion.fear);
        const happiness = (response.faces[0].attributes.emotion.happiness);
        const neutral = (response.faces[0].attributes.emotion.neutral);
        const sadness = (response.faces[0].attributes.emotion.sadness);
        const surprise = (response.faces[0].attributes.emotion.surprise);

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "dark2",
            animationEnabled: true,
            title: {
                text: "Emotion Results"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: [
                    { y: anger, label: "Angry" },
                    { y: disgust, label: "Disgusted" },
                    { y: fear, label: "Scared" },
                    { y: happiness, label: "Happy" },
                    { y: neutral, label: "Neutral" },
                    { y: sadness, label: "Sad" },
                    { y: surprise, label: "Surprised" },
                ]
            }]
        });
        chart.render();

        const emotionArray = [anger, disgust, fear, happiness, neutral, sadness, surprise];
        let max = (Math.max(...emotionArray));
        const emotionId = emotionArray.indexOf(max);
        let movieId = "";
        if (emotionId === 0) {
            $('#info').append(`<p>Angry: ${anger}</p>`);
            let movieId = 28;
            displayInfo(movieId);
        } else if (emotionId === 1) {
            $('#info').append(`<p>Disgusted: ${disgust}<p>`);
            let movieId = 10749;
            displayInfo(movieId);
        } else if (emotionId === 2) {
            $('#info').append(`<p>Scared: ${fear}</p>`);
            let movieId = 99;
            displayInfo(movieId);
        } else if (emotionId === 3) {
            $('#info').append(`<p>Happy: ${happiness}</p>`);
            let movieId = 53;
            displayInfo(movieId);
        } else if (emotionId === 4) {
            $('#info').append(`<p>Neutral: ${neutral}</p>`);
            let movieId = 14;
            displayInfo(movieId);
        } else if (emotionId === 5) {
            $('#info').append(`<p>Sad: ${sadness}</p>`);
            let movieId = 35;
            displayInfo(movieId);
        } else {
            $('#info').append(`<p>Surprised: ${surprise}</p>`);
            let movieId = 36;
            displayInfo(movieId);
        }
    })
};

//Call Cloud Api
document.getElementById("upload_widget_opener").addEventListener("click", function () {
    const myUploadWidget = cloudinary.openUploadWidget({
        cloudName: 'dxxy1fbq1',
        uploadPreset: 'default-preset',
        defaultSource: 'camera'
    }, (error, result) => {
        const uploadedImage = result.info.secure_url;
        if (result.event === "success") {
            $('#userPic').html(`<img src="${uploadedImage}" alt="Uploaded Image" style="width:100%;">`).addClass("uploadedImage")

            // Get emotions from Face++
            faceAPI(uploadedImage);

            // close widget
            myUploadWidget.close({quiet: true});
        }
    }, false);
});

//Call Movie API 
const displayInfo = function (movieId) {
    const genreID = movieId
    const queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=891a6c3da20369ff339fbce34d72464b&with_genres=${genreID}`
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        $('#resultBottom').append(`<br />`)
        $('#pieChart').html(`<div id="chartContainer" style="height: 300px; width: 100%; background-color: black; color: black;"></div>`)
        $('#bg').empty("");
        $('#mainMovie').html("");
        $('#mainMovie').html(`<img src="http://image.tmdb.org/t/p/w500${response.results[0].poster_path}" style="height: 100%;" alt="${response.results[0].title}">`);
        $('#mainMovieInfo').html("");
        $('#mainMovieInfo').html(`<h1>${response.results[0].title}</h1><p>Rating: ${response.results[0].vote_average}</p><h2>Release Date: ${response.results[0].release_date}</h2><p>Summary: ${response.results[0].overview}</p>`);
        $('#movieList').html("");
        for (let i = 1; i < 10; i++) {
            $('#movieList').append(`<div class="row"><div class="col-6 d-flex flex-row-reverse"><img src="http://image.tmdb.org/t/p/w342${response.results[i].poster_path}" style="width: 50%; height: 100%;"></div><div class="col-3"><h3>${response.results[i].title}</h3><p>${response.results[i].overview}</p></div></div><br />`);
        }
    })
}
