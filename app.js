//Call Cloud Api
var myUploadWidget;
document.getElementById("upload_widget_opener").addEventListener("click", function () {
  myUploadWidget = cloudinary.openUploadWidget({
    cloudName: 'dxxy1fbq1', uploadPreset: 'default-preset'
  }, (error, result) => {
    const uploadedImage = (result.info.url);
//Call FaceApi
    const faceAPI = function (uploadedImage) {
      const imageURL = uploadedImage
      console.log(imageURL);
      const queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=Ev9zIZLIwjiT5zSHtXHBYRJTZaaEcHpL&api_secret=lfu6EgDOwcUhGoeM0uVmMi0Io_qM2re_&image_url=" + imageURL + "&return_attributes=emotion";
      console.log(queryURL);
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

        const emotionArray = [anger, disgust,fear,happiness,neutral,sadness,surprise];
        let max = (Math.max(...emotionArray));
        const emotionId = emotionArray.indexOf(max);
        let movieId = "";
        if (emotionId === 0){
            $('#info').append(`<p>Angry: ${anger}</p>`);
            let movieId = 28;
            displayInfo(movieId);
        }else if (emotionId === 1){
            $('#info').append(`<p>Disgusted: ${disgust}<p>`);
            let movieId = 10749;
            displayInfo(movieId);
        }else if (emotionId === 2){
            $('#info').append(`<p>Scared: ${fear}</p>`);
            let movieId = 99;
            displayInfo(movieId);
        }else if (emotionId === 3){
            $('#info').append(`<p>Happy: ${happiness}</p>`);
            let movieId = 53;
            displayInfo(movieId);
        }else if (emotionId === 4){
            $('#info').append(`<p>Neutral: ${neutral}</p>`);
            let movieId = 14;
            displayInfo(movieId);
        }else if (emotionId === 5){ 
            $('#info').append(`<p>Sad: ${sadness}</p>`);
            let movieId = 35;
            displayInfo(movieId);
        }else{
            $('#info').append(`<p>Surprised: ${surprise}</p>`);
            let movieId = 36;
            displayInfo(movieId);
        } 
      })
    };
    faceAPI(uploadedImage);
  }), false})
//Call Movie API 
const displayInfo = function (movieId) {
    const genreID = movieId
    const queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=891a6c3da20369ff339fbce34d72464b&with_genres=${genreID}`
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response.results)
        $('.container').append(`<img src="http://image.tmdb.org/t/p/w780${response.results[0].poster_path}" alt="${response.results[0].title}" width="50%">`);
        $('.container').append(`<h1>${response.results[0].title}</h1>`);
        $('.container').append(`<p>Rating: ${response.results[0].vote_average}</p>`);
        $('.container').append(`<h2>Release Date: ${response.results[0].release_date}</h2>`);
        $('.container').append(`<p>Summary: ${response.results[0].overview}</p>`);
    })
}

