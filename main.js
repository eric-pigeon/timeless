clocks = new ClocksController();

clocks.clock_for_row_column_time = function(row, column, time, clock) {
  if ( time.animation_elapsed > ((12 - row) / 5) ) {
    if ((column < 12 && row < 6) || (column >= 12 && row >= 6)) {
      direction = "counter-clockwise";
    }
    else {
      direction = "clockwise";
    }
    //delta_t = time.elasped / 10;
    //clock.rotateHand( "hour",   delta_t / 2, direction );
    //clock.rotateHand( "minute", delta_t / 2, direction );
    clock.rotateHand( "hour",   time.elasped / 1000 * 72, direction );
    clock.rotateHand( "minute", time.elasped / 1000 * 72, direction );
  }
};

/*
clocks.clock_for_row_column_time = function(row, column, elapsed_time, total_time, animation_elasped_time, clock) {
  delta_t = elapsed_time / 10;
  if ( animation_elasped_time >= (column / 8) ) {
    clock.rotateHand( "hour",   delta_t / 2, "clockwise" );
    clock.rotateHand( "minute", delta_t / 2, "clockwise" );
  }
};
*/

var lastDrawTime = 0;
var state = "play";

$(document).keypress(function(e) {
  if( state == "play" ) {
    state = "pause";
  }
  else {
    state = "play";
    lastDrawTime = 0;
    animate(0);
  }
});

var animationTime = {
  total:   0,
  elasped: 0
};

function animate(time) {
  if ( state === "play" ) {
    requestAnimationFrame( animate );
  }
  if( time ) {
    animationTime.elasped = time - animationTime.total;
    animationTime.total   = time;
    clocks.drawFrame( animationTime );
    //clocks.drawFrame(time - lastDrawTime, time);
    //lastDrawTime = time;
  }
}

animate();
