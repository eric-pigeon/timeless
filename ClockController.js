ClocksController = function() {
  this.svg = SVG("drawing").size(1200,600);
  this.clocks_wide = 24;
  this.clocks_tall = 12;
  this.current_animation = null;

  this.clocks = [];

  var minute_angle, hour_angle;
  for( var i = 0; i < this.clocks_tall; i++ ) {
    for( var j = 0; j < this.clocks_wide; j++ ) {
      if( j >= (this.clocks_wide/2) ) {
        minute_angle = 0;
        hour_angle   = 180;
      }
      else{
        minute_angle = 180;
        hour_angle   = 0;
      }
      var clock = new Clock(this.svg, j*50, i*50, minute_angle, hour_angle);
      this.clocks.push(clock);
    }
  }
};

ClocksController.prototype.drawFrame = function(animation_time) {
  if ( this.current_animation === null ) {
    this.current_animation = "wave-l-r";
    this.animation_start_time = animation_time.total;
  }

  animation_time.animation_elapsed = (animation_time.total - this.animation_start_time) / 1000;

  var row, column;
  for( var i = 0; i < this.clocks.length; i++ ) {
    row    = Math.floor(i / this.clocks_wide);
    column = i % this.clocks_wide;

    //this.clock_for_row_column_time(row, column, delta, total_time, animation_delta, this.clocks[i]);
    this.clock_for_row_column_time(row, column, animation_time, this.clocks[i]);
  }
};

