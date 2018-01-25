// - MARK: defining properties of class Point
class Point {
  // init function
  constructor(x,y) {
    this.x = x; // TYPE: float
    this.y = y; // TYPE: float
  }
  
  // all below calculated properties are relative to origin
  get angle() {
    return Math.atan2(this.y, this.x); // TYPE: float
  }
  get slope() {
    return this.y/this.x; // TYPE: float
  }
  get distance() {
    return Math.hypot(this.x, this.y); // TYPE: float
  }
  
  // methods
  translate(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    return this; // TYPE: Point
  }
  // all below methods are relative to origin or the axes
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this; // TYPE: Point
  }
  flipX() {
    this.x = -this.x;
    return this; // TYPE: Point
  }
  flipY() {
    this.y = -this.y;
    return this; // TYPE: Point
  }
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this; // TYPE: Point
  }
  scaleX(factor) {
    this.x = this.x*factor;
    return this; // TYPE: Point
  }
  scaleY(factor) {
    this.y = this.y*factor;
    return this; // TYPE: Point
  }
  update(x,y) {
    this.x = x;
    this.y = y;
    return this; // TYPE: Point
  }
  clone() {
    return new Point(this.x, this.y);
  }
  
}

// - MARK: define class Line
class Line {
  // init properties
  constructor(m,c) {
    this.m = m; // TYPE: float
    this.c = c; // TYPE: float
  }
  
  // calculated properties
  get xIntercept() {
    return new Point(-this.c/this.m,0); // TYPE: Point
  }
  get yIntercept() {
    return new Point(0,this.c); // TYPE: Point
  }
}

// - MARK: define class lineSegment
class lineSegment {
  // init
  constructor(point1, point2) {
    this.point1 = point1.clone(); // TYPE: Point
    this.point2 = point2.clone(); // TYPE: Point
  }
  
  // calculated properties
  get midpoint() {
    var x = (this.point1.x + this.point2.x)/2;
    var y = (this.point1.y + this.point2.y)/2
    return new Point(x,y); // TYPE: Point
  }
  get dx() {
    return this.point2.x - this.point1.x; // TYPE: float
  }
  get dy() {
    return this.point2.y - this.point1.y; // TYPE: float
  }
  get length() {
    return Math.hypot(this.dx, this.dy); // TYPE: float
  }
  get slope() {
    return this.dy/this.dx; // TYPE: float
  }
}

// - MARK: define class Vector
class Vector {
  
  // init properties
  constructor(x, y) {
    this.x = x; // TYPE: float
    this.y = y; // TYPE: float
  }
  
  // calculated properties
  get angle() {
    return Math.atan2(this.y, this.x); // TYPE: float
  }
  get slope() {
    return this.y/this.x; // TYPE: float
  }
  get magnitude() {
    return Math.hypot(this.x, this.y); // TYPE: float
  }
  get unitVector() {
    return new Vector(this.x/this.magnitude, this.y/this.magnitude); // TYPE: Vector
    // cannot use scale due to float point error
  }
  
  // methods
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this; // TYPE: Vector
  }
  flipX() {
    this.x = -this.x;
    return this; // TYPE: Vector
  }
  flipY() {
    this.y = -this.y;
    return this; // TYPE: Vector
  }
  negative() {
    this.flipX().flipY();
    return this; // TYPE: Vector
  }
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this; // TYPE: Vector
  }
  scaleX(factor) {
    this.x = this.x*factor;
    return this; // TYPE: Vector
  }
  scaleY(factor) {
    this.y = this.y*factor;
    return this; // TYPE: Vector
  }
}

// MARK: - define class Polygon
class Polygon {
  
  // init
  constructor(points) {
    var pointsClone = [];
    for (var i=0; i<points.length; i++) {
      pointsClone.push(points[i].clone());
    }
    this.vertices = pointsClone; // TYPE: [point]
  }
  
  // calculated properties
  get numberOfVertices() {
    return this.vertices.length; // TYPE: int
  }
  get area() {
    var total1 = 0;
    var total2 = 0;
    var n = this.numberOfVertices;
    for (var i = 0; i < n; i++) {
      if (i == 0) {
        // handle first case
        total1 += this.vertices[0].x*this.vertices[1].y;
        total2 += this.vertices[0].x*this.vertices[n-1].y;
      } else if (i < n-1) {
        // handle anything in between
        total1 += this.vertices[i].x*this.vertices[i+1].y;
        total2 += this.vertices[i].x*this.vertices[i-1].y;
      } else {
        // handle last case
        total1 += this.vertices[n-1].x*this.vertices[0].y;
        total2 += this.vertices[n-1].x*this.vertices[n-2].y;
      }
    }
    return Math.abs(total1 - total2)/2; // TYPE: float
  }
  
  // methods
  translate(x,y) {
    for (var i=0; i<this.numberOfVertices; i++) {
      this.vertices[i].translate(x,y);
    }
    return this; // TYPE: Polygon
  }
  
}

// MARK: - define class Circle
class Circle {
  
  // init
  constructor(center, radius) {
    this.center = center.clone(); // TYPE: Point
    this.radius = radius; // TYPE: float
  }
  
  // calculated properties
  get diameter() {
    return this.radius*2;
  }
  get area() {
    return Math.PI*this.radius*this.radius; // TYPE: float
  }
  get circumference() {
    return Math.PI*2*this.radius; // TYPE: float
  }
  
  // methods
  translate(x,y) {
    this.center.translate(x,y);
    return this; // TYPE: Circle
  }
  setRadius(r) {
    this.radius = r;
    return this; // TYPE: Circle
  }
}


// MARK: - geometrical functions

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
