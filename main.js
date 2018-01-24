// - MARK: defining properties of class Point
class Point {
  // init function
  constructor(x,y) {
    // id must be given by the user
    this.x = x;
    this.y = y;
  }
  
  // all below calculated properties are relative to origin
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  get slope() {
    return this.y/this.x;
  }
  get distance() {
    return Math.hypot(this.x, this.y);
  }
  
  // methods
  translate(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    return this;
  }
  // all below methods are relative to origin or the axes
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this;
  }
  flipX() {
    this.x = -this.x;
    return this;
  }
  flipY() {
    this.y = -this.y;
    return this;
  }
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this;
  }
  scaleX(factor) {
    this.x = this.x*factor;
    return this;
  }
  scaleY(factor) {
    this.y = this.y*factor;
    return this;
  }
  update(x,y) {
    this.x = x;
    this.y = y;
    return this;
  }
  
}


// - MARK: define class Line
class Line {
  // init properties
  constructor(m,c) {
    this.m = m;
    this.c = c;
  }
  
  // calculated properties
  get xIntercept() {
    return new Point(-this.c/this.m,0);
  }
  get yIntercept() {
    return new Point(0,this.c);
  }
}


// - MARK: define class lineSegment

class lineSegment {
  // init
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }
  
  // calculated properties
  get midpoint() {
    var x = (this.point1.x + this.point2.x)/2;
    var y = (this.point1.y + this.point2.y)/2
    return new Point(x,y);
  }
  get dx() {
    return this.point2.x - this.point1.x;
  }
  get dy() {
    return this.point2.y - this.point1.y;
  }
  get length() {
    return Math.hypot(this.dx, this.dy);
  }
  get slope() {
    return this.dy/this.dx;
  }
}


// - MARK: define class Vector
class Vector {
  
  // init properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  // calculated properties
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  get slope() {
    return this.y/this.x;
  }
  get magnitude() {
    return Math.hypot(this.x, this.y);
  }
  get unitVector() {
    return new Vector(this.x/this.magnitude, this.y/this.magnitude);
    // cannot use scale due to float point error
  }
  
  // methods
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this;
  }
  flipX() {
    this.x = -this.x;
    return this;
  }
  flipY() {
    this.y = -this.y;
    return this;
  }
  negative() {
    this.flipX().flipY();
    return this;
  }
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this;
  }
  scaleX(factor) {
    this.x = this.x*factor;
    return this;
  }
  scaleY(factor) {
    this.y = this.y*factor;
    return this;
  }
}


// - MARK: geometrical functions

function interceptOfLines(line1, line2) {
  var x = (line2.c-line1.c)/(line1.m-line2.m);
  return new Point(x,line1.m*x+line1.c);
}
function lineFromPointSlope(point, m) {
  var c = point.y - m*point.x;
  return new Line(m, c);
}
function lineFromPoints(point1, point2) {
  var x1 = point1.x;
  var y1 = point1.y;
  var x2 = point2.x;
  var y2 = point2.y;
  return new Line((y2-y1)/(x2-x1), y1-(y2*x1-y1*x1)/(x2-x1));
}
function translatePointByVector(point, vector) {
  return new Point(point.x+vector.x, point.y+vector.y);
}
function vectorFromPoints(point1, point2) {
  return new Vector(point2.x - point1.x, point2.y - point1.y);
}
function reflectPointInLine(point, line) {
  var m2 = -1/line.m;
  var line2 = lineFromPointSlope(point, m2);
  var intercept = interceptOfLines(line, line2);
  var change = vectorFromPoints(point, intercept);
  return translatePointByVector(intercept, change);
}
