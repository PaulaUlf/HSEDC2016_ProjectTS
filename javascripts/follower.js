$('.container').mousemove(function(e){
$("#follower").show();
  var offset = $('.container').offset();

   mouseX = Math.min(e.pageX - offset.left, limitX);
   mouseY = Math.min(e.pageY - offset.top, limitY);
   if (mouseX < 0) mouseX = 0;
   if (mouseY < 0) mouseY = 0;
});

$('.container').mouseleave(function() {
        $("#follower").hide();
});    
