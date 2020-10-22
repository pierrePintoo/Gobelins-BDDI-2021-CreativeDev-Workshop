$(function() {

    $(".container").hide();
    $(".data").hide();
  
    $(".welcome-button").click(function(){
      $(".welcome").fadeOut(900);
      setTimeout(function(){ $(".container").fadeIn(700); }, 1000);
      setTimeout(function(){ $(".data").fadeIn(700); }, 1000);
  
    });
    
});