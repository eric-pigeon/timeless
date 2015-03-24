(function() {

MINUTE_HAND_LENGTH = 24;
HOUR_HAND_LENGTH   = 20;

window.Clock = function(svgObject, x, y, minute_angle, hour_angle) {
  this.center = {
    'x': x+24,
    'y': y+24
  };
  this.minute = new ClockHand(svgObject, this, minute_angle, MINUTE_HAND_LENGTH);
  this.hour   = new ClockHand(svgObject, this, hour_angle, HOUR_HAND_LENGTH);

  this.minute_hand_length = 24;
  this.hour_hand_length   = 20;

  this.minute_hand_angle  = minute_angle;
  this.hour_hand_angle    = hour_angle;
  this.minute_velocity    = 1;
  this.hour_velocity      = 1;
  this.minute_direction   = "counter-clockwise";
  this.hour_direction     = "clockwise";
  this.minute_rotations   = 0;
  this.hour_rotations     = 0;

  //this.svg = svgObject.circle(48).move(x, y).fill('none').attr({ stroke: '#000', width: 1 });
}

Clock.prototype.rotateHand = function( hand, degrees, direction ) {
  var target_hand, angle_name, hand_length;

  if( direction == "counter-clockwise" ) {
    degrees = 0 - degrees;
  }

  if( hand == "hour" ) {
    this.hour.angle_adjustment += degrees;
    this.hour.update();
  }
  else {
    this.minute.angle_adjustment += degrees;
    this.minute.update();
  }
};

ClockHand = function(svgObject, clock, initial_angle, length) {
  this.clock            = clock;
  this.length           = length;
  this.rotations        = 0;
  this.initial_angle    = initial_angle;
  this.angle_adjustment = 0;
  Object.defineProperty(this, "angle", {
    get: function() { return this.initial_angle + this.angle_adjustment }
  });
  Object.defineProperty(this, "x2", {
    get: function() {
      return this.clock.center.x + (this.length * Math.cos( Math.toRadians(this.angle)));
    }
  });
  Object.defineProperty(this, "y2", {
    get: function() {
      return this.clock.center.y + (this.length * Math.sin( Math.toRadians(this.angle)));
    }
  });

  this.direction    = "clockwise";
  this.hand         = svgObject.line(
      this.clock.center.x,
      this.clock.center.y,
      this.x2,
      this.y2
    ).stroke({ width: 2});
};

ClockHand.prototype.update = function() {
  this.hand.attr({
    x2: this.x2,
    y2: this.y2
  })
};

}());
