/*
CoordGeom.js - main.js
A JAVASCRIPT FRAMEWORK FOR COORDINATE GEOMETRY + VECTOR

Creator:    Chloe Lo
Created at: 24 JAN 2018

RELEASES
v0.0-alpha: 30 JAN 2018
*/

// # ALBEGRA COMPONENT

// - MARK: defining properties of class Point
class Point {
  // init function
  constructor(x,y) { // TYPE: float, float
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
  translate(x, y) { // TYPE: float, float
    this.x = this.x + x;
    this.y = this.y + y;
    return this; // TYPE: Point
  }
  translateByVector(vector) { // TYPE: Vector
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    return this;
  }
  // all below methods are relative to origin or the axes
  rotate(angle) { // TYPE: float
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
  update(x,y) { // TYPE: float, float
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
  // init
  constructor(point1, point2) { // TYPE: Point, Point
    this.point1 = point1.clone();
    this.point2 = point2.clone();
  }
  
  // calculated properties
  get m() {
    if (this.point1.x != this.point2.x) {
      var dx = this.point1.x - this.point2.x;
      var dy = this.point1.y - this.point2.y;
      return dy/dx; // TYPE: float
    } else {
      return NaN;
    }
  }
  get yIntercept() {
    if (!isNaN(this.m)) {
      return new Point(0, this.point1.y - this.m*this.point1.x); // TYPE: Point
    } else {
      return NaN;
    }
  }
  get c() {
    if (!isNaN(this.m)) {
      return this.point1.y - this.m*this.point1.x // TYPE: float
    } else {
      return NaN;
    }
  }
  get xIntercept() {
    if (this.m != 0 && !isNaN(this.m)) {
      return new Point(this.point1.x - this.point1.y/this.m, 0); // TYPE: Point
    } else if (this.m == 0) {
      return NaN;
    } else {
      return new Point(this.point1.x, 0); // TYPE: Point
    }
  }
  get isVertical() {
    return isNaN(this.m); // TYPE: bool
  }
  get isHorizontal() {
    return (this.m == 0); // TYPE: bool
  }
  
  // methods
  calY(x) { // TYPE: float
    if (!isNaN(this.m)) {
      return this.m*x + this.c; // TYPE: float
    } else {
      return NaN;
    }
  }
  calX(y) { // TYPE: float
    if (!isNaN(this.m)) {
      if (this.m != 0) {
        return (y - this.c)/this.m; // TYPE: float
      } else {
        return NaN;
      }
    } else {
      return this.xIntercept.x;
    }
  }
}

// - MARK: define class lineSegment
class LineSegment {
  // init
  constructor(point1, point2) { // TYPE: Point, Point
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
    if (this.dx != 0) {
      return this.dy/this.dx; // TYPE: float
    } else {
      return NaN;
    }
  }
}

// - MARK: define class Vector
class Vector {
  
  // init properties
  constructor(x, y) { // TYPE: float, float
    this.x = x; // TYPE: float
    this.y = y; // TYPE: float
  }
  
  // calculated properties
  get isZeroVector() {
    return (this.x == 0 && this.y == 0); // TYPE: bool
  }
  get angle() {
    if (!this.isZeroVector) {
      return Math.atan2(this.y, this.x); // TYPE: float
    } else {
      return NaN;
    }
  }
  get slope() {
    if (!this.isZeroVector && (this.x != 0)) {
      return this.y/this.x; // TYPE: float
    } else {
      return NaN;
    }
  }
  get magnitude() {
    return Math.hypot(this.x, this.y); // TYPE: float
  }
  get unitVector() {
    if (!this.isZeroVector) {
      return new Vector(this.x/this.magnitude, this.y/this.magnitude); // TYPE: Vector
    // cannot use scale due to float point error
    } else {
      return NaN;
    }
  }
  
  // methods
  rotate(angle) { // TYPE: float
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
  scale(factor) { // TYPE: float
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this; // TYPE: Vector
  }
  scaleX(factor) { // TYPE: float
    this.x = this.x*factor;
    return this; // TYPE: Vector
  }
  scaleY(factor) { // TYPE: float
    this.y = this.y*factor;
    return this; // TYPE: Vector
  }
}

// MARK: - define class Polygon
class Polygon {
  
  // init
  constructor(points) { // TYPE: [Point]
    var pointsClone = [];
    var edges = [];
    for (var i=0; i<points.length; i++) {
      pointsClone.push(points[i].clone());
      if (i < points.length - 1) {
        var edge = new LineSegment(points[i], points[i+1]);
      } else {
        var edge = new LineSegment(points[i], points[0]);
      }
      edges.push(edge);
    }
    this.vertices = pointsClone; // TYPE: [point]
    this.edges = edges;
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
  translate(x,y) { // TYPE: float, float
    for (var i=0; i<this.numberOfVertices; i++) {
      this.vertices[i].translate(x,y);
    }
    return this; // TYPE: Polygon
  }
  
}

// MARK: - define class Circle
class Circle {
  
  // init
  constructor(center, radius) { // TYPE: Point, float
    this.center = center.clone(); // TYPE: Point
    this.radius = radius; // TYPE: float
  }
  
  // calculated properties
  get diameter() {
    return this.radius*2; // TYPE: float
  }
  get area() {
    return Math.PI*this.radius*this.radius; // TYPE: float
  }
  get circumference() {
    return Math.PI*2*this.radius; // TYPE: float
  }
  
  // methods
  translate(x,y) { // TYPE: float, float
    this.center.translate(x,y);
    return this; // TYPE: Circle
  }
  setRadius(r) { // TYPE: float
    this.radius = r;
    return this; // TYPE: Circle
  }
}


// MARK: - geometrical functions
function interceptOfLines(line1, line2) { // TYPE: Line, Line
  if ((line1.m != line2.m) && !isNaN(line1.m) && !isNaN(line2.m)) {
    var x = (line2.c-line1.c)/(line1.m-line2.m);
    return new Point(x,line1.m*x+line1.c); // TYPE: Point
  } else if ((isNaN(line1.m) && isNaN(line2.m)) || (line1.m == line2.m)) {
    return NaN
  } else {
    if (isNaN(line1.m)) {
      var x = line1.xIntercept.x;
      return new Point(x, line2.m*x + line2.c); // TYPE: Point
    } else {
      var x = line2.xIntercept.x;
      return new Point(x, line1.m*x + line1.c); // TYPE: Point
    }
  }
}
function lineFromPointSlope(point, m) { // TYPE: Point, float
  var point2 = newPointTranslatedByVector(point, new Vector(1,m));
  return new Line(point, point2); // TYPE: Line
}
function lineFromLineSegment(lineSegment) { // TYPE: LineSegment
  return new Line(lineSegment.point1, lineSegment.point2); // TYPE: Line
}
function newPointTranslatedByVector(point, vector) { // TYPE: Point, Vector
  return new Point(point.x+vector.x, point.y+vector.y); // TYPE: Point
}
function newPointReflectedInLine(point, line) { // TYPE: Point, Line
  if (!isNaN(line.m) && (line.m != 0)) {
    var m2 = -1/line.m;
    var line2 = lineFromPointSlope(point, m2);
    var intercept = interceptOfLines(line, line2);
    var change = vectorFromPoints(point, intercept);
    return newPointTranslatedByVector(intercept, change); // TYPE: Point
  } else if (line.m == 0) {
    return new Point(point.x, 2*line.c - point.y); // TYPE: Point
  } else {
    return new Point(2*line.xIntercept.x - point.x, point.y); // TYPE: Point
  }
}
function vectorFromPoints(point1, point2) { // TYPE: Point, Point
  return new Vector(point2.x - point1.x, point2.y - point1.y); // TYPE: Vector
}
function dotProduct(vector1, vector2) { // TYPE: Vector, Vector
  return vector1.x*vector2.x + vector1.y*vector2.y; // TYPE: float
}
function angleBetweenVectors(vector1, vector2) { // TYPE: Vector, Vector
  if (!vector1.isZeroVector && !vector2.isZeroVector) {
    return Math.acos(dotProduct(vector1, vector2)/(vector1.magnitude*vector2.magnitude)); // TYPE: float
  } else {
    return NaN;
  }
}
function addVectors(vector1, vector2) { // TYPE: Vector, Vector
  return new Vector(vector1.x+vector2.x, vector1.y+vector2.y); // TYPE: Vector
}
function subtractVectors(vector1, vector2) { // TYPE: Vector, Vector
  return new Vector(vector1.x-vector2.x, vector1.y-vector2.y); // TYPE: Vector
}
function intersectionOfCircleAndLine(circle, line) { // TYPE: Circle, Line
  var r = circle.radius;
  var a = circle.center.x;
  var b = circle.center.y;
  if (!isNaN(line.m)) {
    var m = line.m;
    var c = line.c;
    var qa = m*m + 1;
    var qb = 2*(m*(c-b)-a);
    var qc = a*a + (c-b)*(c-b) - r*r;
    var delta = qb*qb - 4*qa*qc;
    if (delta < 0) {
      return [];
    } else if (delta == 0) {
      var x = -qb/(2*qa);
      return [new Point(x, x*m + c)]; // TYPE: [Point]
    } else {
      var x1 = (-qb + Math.sqrt(delta))/(2*qa);
      var x2 = (-qb - Math.sqrt(delta))/(2*qa);
      return [new Point(x1, x1*m + c), new Point(x2, x2*m + c)]; // TYPE: [Point]
    }
  } else {
    // update when point in/out/on circle is implemented?
    var x = line.xIntercept.x;
    var d = Math.abs(x - a);
    if (d < r) {
      return [new Point(x,b+Math.sqrt(r*r-d*d)), new Point(x,b-Math.sqrt(r*r-d*d))]; // TYPE: [Point]
    } else if (d == r) {
      return [new Point(x, b)]; // TYPE: [Point]
    } else {
      return [];
    }
  }
}
function intersectionOfCircles(circle1, circle2) { // TYPE: Circle, Circle
  // check whether the two circles overlapped
  var center1ToCenter2 = vectorFromPoints(circle1.center, circle2.center);
  var d = center1ToCenter2.magnitude;
  var r1 = circle1.radius;
  var r2 = circle2.radius;
  var angle = center1ToCenter2.angle;
  if (d < r1 + r2 && d > 0) {
    // obtain the solution where origin at center of c1
    // and c2 rotated to have same y as c1
    var solX = (r1*r1 - r2*r2 + d*d)/(2*d);
    var solY1 = Math.sqrt((r1*r1) - (solX*solX));
    var solY2 = -solY1;
    // transform the solutions to the correct coordinates
    var sol1 = new Point(solX, solY1).rotate(angle).translateByVector(circle1.center);
    var sol2 = new Point(solX, solY2).rotate(angle).translateByVector(circle1.center);
    return [sol1, sol2]; // TYPE: [Point]
  } else if (d == r1 + r2) {
    var sol = new Point(r1, 0).rotate(angle).translateByVector(circle1.center);
    return [sol]; // TYPE: [Point]
  } else {
    return []; // TYPE: [Point]
  }
}
function isCircleInCircle(circle1, circle2) { // TYPE: Circle, Circle
  if (intersectionOfCircles(circle1, circle2).length > 0) {
    return false; // TYPE: Bool
  } else {
    return ((pointIsStrictlyInCircle(circle1.center, circle2)) || (pointIsStrictlyInCircle(circle2.center, circle1))); // TYPE: bool
  }
}
function pointIsOnLine(point, line) { // TYPE: Point, Line
  return (point.y == line.m*point.x + line.c); // TYPE: bool
}
function pointIsOnLineSegment(point, lineSegment) { // TYPE: Point, LineSegment
  var point1 = lineSegment.point1;
  var point2 = lineSegment.point2;
  var line = new Line(point1, point2);
  var lowerBound = Math.min(point1.x, point2.x);
  var upperBound = Math.max(point1.x, point2.x);
  return (pointIsOnLine(point, line) && (point.x >= lowerBound) && (point.x <= upperBound)); // TYPE: bool
}
function pointIsStrictlyInCircle(point, circle) { // TYPE: Point, Circle
  var pointFromCenter = vectorFromPoints(point, circle.center);
  return (pointFromCenter.magnitude < circle.radius); // TYPE: bool
}
function pointIsOnCircleCircumference(point, circle) { // TYPE: Point, Circle
  var pointFromCenter = vectorFromPoints(point, circle.center);
  return (pointFromCenter.magnitude == circle.radius); // TYPE: bool
}
function pointIsStrictlyOutOfCircle(point, circle) { // TYPE: Point, Circle
  var pointFromCenter = vectorFromPoints(point, circle.center);
  return (pointFromCenter.magnitude > circle.radius); // TYPE: bool
}
function pointIsOnPolygonEdge(point, polygon) { // TYPE: Point, Polygon
  var onEdge = false;
  polygon.edges.forEach(function(edge) {
    if (pointIsOnLineSegment(point, edge)) {
      onEdge = true;
    }
  });
  return onEdge; // TYPE: bool
}
function pointIsStrictlyInPolygon(point, polygon) { // TYPE: Point, Polygon
  var windingNumber = 0;
  polygon.edges.forEach(function(edge) {
    var thisVertex = edge.point1;
    var nextVertex = edge.point2;
    var lineFromEdge = lineFromLineSegment(edge);
    if (thisVertex.y <= point.y) {
      if (nextVertex.y > point.y) {
        if (lineIsLeftOfPoint(lineFromEdge, point)) {
          windingNumber++;
        }
      }
    } else {
      if (nextVertex.y <= point.y) {
        if (lineIsLeftOfPoint(lineFromEdge, point)) {
          windingNumber--;
        }
      }
    }
  });
  return (Math.abs(windingNumber) == 1); // TYPE: bool
}
function pointIsStrictlyOutOfPolygon(point, polygon) { // TYPE: Point, Polygon
  return (!pointIsOnPolygonEdge(point, polygon) && !pointIsStrictlyInPolygon(point, polygon)); // TYPE: bool
}
function pointsDrawPolygon(points) { // TYPE: [Point]
  if (points.length < 3) {
    return false;
  } else {
    var angleSum = 0;
    var toNextVertex;
    var toPreviousVertex;
    for (var i=0; i < points.length; i++) {
      if (i == 0) {
        toPreviousVertex = vectorFromPoints(points[0],points[points.length-1]);
        toNextVertex = vectorFromPoints(points[0],points[1]);
      } else if (i == (points.length-1)) {
        toPreviousVertex = vectorFromPoints(points[i],points[i-1]);
        toNextVertex = vectorFromPoints(points[i],points[0]);
      } else {
        toPreviousVertex = vectorFromPoints(points[i],points[i-1]);
        toNextVertex = vectorFromPoints(points[i],points[i+1]);
      }
      angleSum += angleBetweenVectors(toPreviousVertex, toNextVertex);
    }
    return (angleSum == Math.PI*(points.length - 2)); // TYPE: bool
  }
}


// MARK: - helper functions

function lineIsLeftOfPoint(line, point) { // TYPE: Line, Point
  if (!isNaN(line.m)) {
    if (line.m == 0) {
      return false; // TYPE: bool
    } else {
      if (pointIsOnLine(point, line)) {
        return false; // TYPE: bool
      } else {
        return (line.calX(point.y) < point.x); // TYPE: bool
      }
    }
  } else {
    return (line.xIntercept.x < point.x); // TYPE: bool
  }
}