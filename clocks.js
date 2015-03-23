(function() {

window.Clock = function Clock(svgObject, x, y, minute_angle, hour_angle) {
  this.center = {
    'x': x+24,
    'y': y+24
  };
  this.minute_hand_length = 24;
  this.hour_hand_length   = 20;

  this.minute_hand_angle  = minute_angle;
  this.hour_hand_angle    = hour_angle;
  this.minute_velocity    = 1;
  this.hour_velocity      = 1;
  this.minute_direction   = "counter-clockwise";
  this.hour_direction     = "clockwise";

  this.minute_hand = svgObject.line(
      this.center.x,
      this.center.y,
      this.center.x + ( this.minute_hand_length * Math.cos( Math.toRadians(this.minute_hand_angle) )),
      this.center.y + ( this.minute_hand_length * Math.sin( Math.toRadians(this.minute_hand_angle) ))
    ).stroke({ width: 2});
  this.hour_hand   = svgObject.line(
      this.center.x,
      this.center.y,
      this.center.x + ( this.hour_hand_length * Math.cos( Math.toRadians(this.hour_hand_angle) )),
      this.center.y + ( this.hour_hand_length * Math.sin( Math.toRadians(this.hour_hand_angle) ))
    ).stroke({ width: 2});

  //this.svg = svgObject.circle(48).move(x, y).fill('none').attr({ stroke: '#000', width: 1 });
}

Clock.prototype.rotateHand = function( hand, degrees, direction ) {
  var target_hand, angle_name, hand_length;

  if( hand == "hour" ) {
    target_hand = this.hour_hand;
    angle_name  = "hour_hand_angle";
    hand_length = this.hour_hand_length;
  }
  else {
    target_hand = this.minute_hand;
    angle_name  = "minute_hand_angle";
    hand_length = this.minute_hand_length;
  }

  if ( direction === "clockwise") {
    this[angle_name] += degrees;
  }
  else {
    this[angle_name] -= degrees;
  }

  if ( this[angle_name] >= 360 ) {
    this[angle_name] = this[angle_name] % 360;
  }
  if ( this[angle_name] < 0 ) {
    this[angle_name] = this[angle_name] % 360;
    this[angle_name] += 360;
  }

  newX = this.center.x + ( hand_length * Math.cos( Math.toRadians(this[angle_name]) ));
  newY = this.center.y + ( hand_length * Math.sin( Math.toRadians(this[angle_name]) ));
  target_hand.attr({'x2': newX, 'y2': newY});

};
}());
