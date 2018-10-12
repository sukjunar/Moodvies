
var myUploadWidget;
document.getElementById("upload_widget_opener").addEventListener("click", function () {
    myUploadWidget = cloudinary.openUploadWidget({
        cloudName: 'dxxy1fbq1', uploadPreset: 'default-preset'
    }, (error, result) => {
        const uploadedImage = (result.info.url);

        const faceAPI = function (uploadedImage) {
            const imageURL = uploadedImage
            console.log(imageURL);
            const queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=Ev9zIZLIwjiT5zSHtXHBYRJTZaaEcHpL&api_secret=lfu6EgDOwcUhGoeM0uVmMi0Io_qM2re_&image_url=" + imageURL + "&return_attributes=emotion";
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: 'POST'
            }).then(function (response) {
                console.log(response.faces[0].attributes.emotion)
            })
        };
        faceAPI(uploadedImage);
    });
}, false);


 
document.getElementById("upload-widget").addEventListener("click", function () {
})