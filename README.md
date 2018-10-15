# Funky-Bunch

MVP (Minimum Viable Product)
1. Takes in user input and makes a Face++ API call for the face mood recognition.
2. Takes the movie lists and uses OMDb API (or the TMDB or Rotten Tomatoes).
3. Displays the mood and movie option information onto HTML.

User Stories
1. "As a user I want to be able to upload my image to see the mood of my face."
2. "As a user I want to be able to decide which movie to watch based on my mood."
3. "As a user I want to be able to see the details of the movies based on my mood."

<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <!--Indicators-->
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
    </ol>
    <!--wrapper for slides-->
    <h3 id="ourRec"><b>Our Recommendations:</b></h3>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="./images/blackpanther.jpeg" height="300px" width="300px" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="./images/crazyasians.jpg" height="300px" width="100px" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="./images/guardians.jpg" height="300px" width="100px" alt="Third slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="./images/meg.jpg" height="300px" width="100px" alt="Fourth slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="./images/solo.jpg" height="300px" width="100px" alt="Fifth slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>