const showAbout = function (){
    $('#homepage').addClass('hide');
    $('#about').removeClass('hide');
  }
  
  $('#about-us').on('click', showAbout);