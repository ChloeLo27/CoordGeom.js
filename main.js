/*
CoordGeom.js - main.js
A JAVASCRIPT FRAMEWORK FOR COORDINATE GEOMETRY + VECTOR

Creator:    Chloe Lo
Created at: 24 JAN 2018

RELEASES
v0.0-alpha: 30 JAN 2018
v0.3-alpha:  6 FEB 2018
v0.5-alpha:  18 APR 2018
v1.0: 4 MAY 2018
*/

// # ALBEGRA COMPONENT

/**
 *  class Point
 *  @param {Number} x x-coordinate of the point in 2D Euclidean plane
 *  @param {Number} y y-coordinate of the point in 2D Euclidean plane
 */
class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  // all below calculated properties are relative to origin
  /**
   * angle of the point made with the positive x-axis from the origin
   * @return {Number} the angle in radian, return NaN if the point is at the origin
   */
  get angle() {
    if (!(this.y == 0 && this.x == 0)) {
      return Math.atan2(this.y, this.x);
    } else {
      return NaN;
    }
  }
  /**
   * slope of the point made with the positive x-axis from the origin
   * @return {Number} the slope, return NaN if the point is at the origin
   */
  get slope() {
    if (!(this.y == 0 && this.x == 0)) {
      return this.y/this.x;
    } else {
      return NaN;
    }
  }
  /**
   * distance of the point from the origin
   * @return {Number} the distance
   */
  get distance() {
    return Math.hypot(this.x, this.y);
  }
  
  // methods
  /**
   * translate the point by the given amount in x- and y-direction
   * @param  {Number} x amount to displace in the x-direction
   * @param  {Number} y amount to displace in the y-direction
   * @return {Point}   the translated point
   */
  translate(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    return this;
  }
  /**
   * translate the point by the given vector
   * @param  {Vector} vector the displacement of the point
   * @return {Point}        the translated point
   */
  translateByVector(vector) {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    return this;
  }
  // all below methods are relative to origin or the axes
  /**
   * rotate the point about the origin for the given angle in radian
   * @param  {Number} angle angle to rotate in radian
   * @return {Point}       the rotated point
   */
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this;
  }
  /**
   * flip the point horizontally
   * @return {Point} the reflected point
   */   
  flipX() {
    this.x = -this.x;
    return this;
  }
  /**
   * flip the point vertically
   * @return {Point} the reflected point
   */   
  flipY() {
    this.y = -this.y;
    return this;
  }
  /**
   * update the point to the given coordinates, i.e. change the point to somewhere else
   * @param  {Number} x new x-coordinate of the point
   * @param  {Number} y new y-coordinate of the point
   * @return {Point}   the updated point
   */
  update(x,y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * clone the current point and return a new point object, so that changes made to the original will not affect the clone
   * @return {Point} the cloned point
   */
  clone() {
    return new Point(this.x, this.y);
  }
}

// - MARK: define class Line
/**
 * class Line, a line that extends infinitely in the 2D Euclidean plane
 * @param {Point} point1 the first point that defines the line
 * @param {Point} point2 the second point that defines the line
 */
class Line {
  // init
  constructor(point1, point2) {
    this.point1 = point1.clone();
    this.point2 = point2.clone();
  }
  
  // calculated properties
  /**
   * the slope of the line
   * @return {Number} the slope of the line as in m in the expression y = mx + c, return NaN if the line is vertical
   */
  get m() {
    if (this.point1.x != this.point2.x) {
      var dx = this.point1.x - this.point2.x;
      var dy = this.point1.y - this.point2.y;
      return dy/dx;
    } else {
      return NaN;
    }
  }
  /**
   * the y-intercept of the line
   * @return {Point} the coordinates of the y-intercept, return NaN if the line is vertical
   */
  get yIntercept() {
    if (!isNaN(this.m)) {
      return new Point(0, this.point1.y - this.m*this.point1.x);
    } else {
      return NaN;
    }
  }
  /**
   * the y-coordinate of the y-intercept of the line
   * @return {Number} the number c as in the expression y = mx + c of the line, return NaN if the line is vertical
   */
  get c() {
    if (!isNaN(this.m)) {
      return this.point1.y - this.m*this.point1.x;
    } else {
      return NaN;
    }
  }
  /**
   * the x-intercept of the line
   * @return {Point} the coordinates of the x-intercept, return NaN if the line is horizontal
   */
  get xIntercept() {
    if (this.m != 0 && !isNaN(this.m)) {
      return new Point(this.point1.x - this.point1.y/this.m, 0);
    } else if (this.m == 0) {
      return NaN;
    } else {
      return new Point(this.point1.x, 0);
    }
  }
  /**
   * whether the line is vertical or not
   * @return {Boolean} whether the line is vertical or not
   */
  get isVertical() {
    return isNaN(this.m);
  }
  /**
   * whether the line is horizontal or not
   * @return {Boolean} whether the line is horizontal or not
   */
  get isHorizontal() {
    return (this.m == 0);
  }
  
  // methods
  /**
   * get the y-coordinate of a given x-coordinate on the line
   * @param  {Number} x the input x-coordinate
   * @return {Number}   the output y-coordinate, return NaN if the line is vertical
   */
  calY(x) {
    if (!isNaN(this.m)) {
      return this.m*x + this.c;
    } else {
      return NaN;
    }
  }
  /**
   * get the x-coordinate of the given y-coordinate on the line
   * @param  {Number} y the input y-coodinate
   * @return {Number}   the output x-coordinate, return NaN if the line is horizontal
   */
  calX(y) {
    if (!isNaN(this.m)) {
      if (this.m != 0) {
        return (y - this.c)/this.m;
      } else {
        return NaN;
      }
    } else {
      return this.xIntercept.x;
    }
  }
}

// - MARK: define class lineSegment
/**
 * class LineSegment, a line with two end points.
 * @param {Point} point1 the first end point of the line segment
 * @param {Point} point2 the second send point of the line segment
 */
class LineSegment {
  // init
  constructor(point1, point2) {
    this.point1 = point1.clone();
    this.point2 = point2.clone();
  }
  
  // calculated properties
  /**
   * the mid-point of the line segment
   * @return {Point} coordinates of the mid-point
   */
  get midpoint() {
    var x = (parseFloat(this.point1.x) + parseFloat(this.point2.x))/2;
    var y = (parseFloat(this.point1.y) + parseFloat(this.point2.y))/2
    return new Point(x,y);
  }
  /**
   * the horizontal run of the line segment
   * @return {Number} change in x
   */
  get dx() {
    return this.point2.x - this.point1.x;
  }
  /**
   * the vertical rise of the line segment
   * @return {Number} change in y
   */
  get dy() {
    return this.point2.y - this.point1.y;
  }
  /**
   * the angle made by the line segment with the horizontal
   * @return {Number} angle in radian, return NaN if the line segment is of length zero
   */
  get angle() {
    if (!(this.dx == 0 && this.dy == 0)) {
      return Math.atan2(this.dy, this.dx);
    } else {
      return NaN;
    }
  }
  /**
   * the length of the line segment
   * @return {Number} length
   */
  get length() {
    return Math.hypot(this.dx, this.dy);
  }
  /**
   * the slope of the line segment, as in rise over run, i.e. dy/dx
   * @return {Number} slope, return NaN if the line segment is vertical
   */
  get slope() {
    if (this.dx != 0) {
      return this.dy/this.dx;
    } else {
      return NaN;
    }
  }
}

// - MARK: define class Vector
/**
 * the class Vector
 * @param {Number} x the x component of the vector
 * @param {Number} y the y component of the vector
 */
class Vector {
  
  // init properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  // calculated properties
  /**
   * whether the vector is a zero vector or not
   * @return {Boolean} whether it is a zero vector
   */
  get isZeroVector() {
    return (this.x == 0 && this.y == 0);
  }
  /**
   * the angle of the vector
   * @return {Number} the angle in radian, return NaN if it is a zero vector
   */
  get angle() {
    if (!this.isZeroVector) {
      return Math.atan2(this.y, this.x);
    } else {
      return NaN;
    }
  }
  /**
   * the slope of the vector, calculated by y/x
   * @return {Number} the slope, return NaN if the vector is either zero or vertical
   */
  get slope() {
    if (!this.isZeroVector && (this.x != 0)) {
      return this.y/this.x;
    } else {
      return NaN;
    }
  }
  /**
   * the magnitude of the vector
   * @return {Number} the magnitude
   */
  get magnitude() {
    return Math.hypot(this.x, this.y);
  }
  /**
   * the unit vector of the given vector
   * @return {Vector} the unit vector, return NaN if the vector is zero
   */
  get unitVector() {
    if (!this.isZeroVector) {
      return new Vector(this.x/this.magnitude, this.y/this.magnitude);
    // cannot use scale due to float point error
    } else {
      return NaN;
    }
  }
  
  // methods
  /**
   * rotate the vector by the given degree, update is made to the original vector
   * @param  {Number} angle the angle to rotate in radian
   * @return {Vector}       the rotated vector
   */
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this;
  }
  /**
   * flip the vector horizontally, update is made to the original vector
   * @return {Vector} the flipped vector
   */
  flipX() {
    this.x = -this.x;
    return this;
  }
  /**
   * flip the vector horizontally, update is made to the original vector
   * @return {Vector} the flipped vector
   */
  flipY() {
    this.y = -this.y;
    return this;
  }
  /**
   * the negative of the vector
   * @return {Vector} the flipped vector
   */
  negative() {
    this.flipX().flipY();
    return this;
  }
  /**
   * scale the vector by the given scale factor
   * @param  {Number} factor the scale factor
   * @return {Vector}        the scaled vector
   */
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this;
  }
  /**
   * scale the vector in the x-direction only by the given scale factor
   * @param  {Number} factor the scale factor
   * @return {Vector}        the scaled vector
   */
  scaleX(factor) {
    this.x = this.x*factor;
    return this;
  }
  /**
   * scale the vector in the y-direction only by the given scale factor
   * @param  {Number} factor the scale factor
   * @return {Vector}        the scaled vector
   */
  scaleY(factor) {
    this.y = this.y*factor;
    return this;
  }
}

/**
 * The class Polygon
 * @param {[Point]} points the array of points which form the polygon
 */
class Polygon {
  
  // init
  constructor(points) {
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
    /**
     * containing the vertices of the polygon
     * @type {[Point]}
     */
    this.vertices = pointsClone;
    /**
     * containing the edges of the polygon
     * @type {[LineSegment]}
     */
    this.edges = edges;
  }
  
  // calculated properties
  /**
   * the degree or order of the polygon, i.e. the number of vertices or edges
   * @return {Number} the degree or order of the polygon; an integer
   */
  get n() {
    return this.vertices.length;
  }
  /**
   * the area of the polygon
   * @return {Number} the area
   */
  get area() {
    var total1 = 0;
    var total2 = 0;
    var n = this.n;
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
    return Math.abs(total1 - total2)/2;
  }
  
  // methods
  /**
   * translate the polygon by the given displacement in both x- and y-directions; this is not a clone and the original polygon is affected
   * @param  {Number} x the translation in the x-direction
   * @param  {Number} y the translation in the y-direction
   * @return {Polygon}   the translated polygon
   */
  translate(x,y) {
    for (var i=0; i<this.n; i++) {
      this.vertices[i].translate(x,y);
      this.edges[i].point1.translate(x,y);
      this.edges[i].point2.translate(x,y);
    }
    return this;
  }
  
}

/**
 * the class Circle
 * @param {Point} center the coordinates of the circle's center
 * @param {Number} radius the length of the radius of the circle
 */
class Circle {
  
  // init
  constructor(center, radius) {
    this.center = center.clone();
    this.radius = radius;
  }
  
  // calculated properties
  /**
   * the diameter of the circle
   * @return {Number} the diameter
   */
  get diameter() {
    return this.radius*2;
  }
  /**
   * the area of the circle
   * @return {Number} the area
   */
  get area() {
    return Math.PI*this.radius*this.radius;
  }
  /**
   * the length of the circumference of the circle
   * @return {Number} the circumference
   */
  get circumference() {
    return Math.PI*2*this.radius;
  }
  
  // methods
  /**
   * translate the circle by the given translation in x- and y-direction
   * @param  {Number} x the translation in the x-direction
   * @param  {Number} y the translation in the y-direction
   * @return {Circle}   the translated circle
   */
  translate(x,y) {
    this.center.translate(x,y);
    return this;
  }
  /**
   * set a new radius for the circle
   * @param {Number} r the new radius
   * @return {Circle} the circle with the new radius
   */
  setRadius(r) {
    this.radius = r;
    return this;
  }
}


// MARK: - geometrical functions

// - point and line interaction
/**
 * Find the intersection between two lines
 * @param  {Line} line1 the first line
 * @param  {Line} line2 the second line
 * @return {Point}       the intersection; return NaN if the two lines are parallel or identical
 */
function interceptOfLines(line1, line2) {
  if ((line1.m != line2.m) && !isNaN(line1.m) && !isNaN(line2.m)) {
    var x = (line2.c-line1.c)/(line1.m-line2.m);
    return new Point(x,line1.m*x+line1.c);
  } else if ((isNaN(line1.m) && isNaN(line2.m)) || (line1.m == line2.m)) {
    return NaN
  } else {
    if (isNaN(line1.m)) {
      var x = line1.xIntercept.x;
      return new Point(x, line2.m*x + line2.c);
    } else {
      var x = line2.xIntercept.x;
      return new Point(x, line1.m*x + line1.c);
    }
  }
}
/**
 * Create a new line from a given point and slope
 * @param  {Point} point the point which the line passes through
 * @param  {Number} m     the slope of the line
 * @return {Line}       the line
 */
function newLineFromPointSlope(point, m) {
  var point2;
  if (!isNaN(m)) {
    point2 = newPointTranslatedByVector(point, new Vector(1,m));
    
  } else {
    point2 = newPointTranslatedByVector(point, new Vector(0,1));
  }
  return new Line(point, point2);
}
/**
 * Create a new line that extends to infinity from a line segment
 * @param  {LineSegment} lineSegment the line segment
 * @return {Line}             the resultant line
 */
function newLineFromLineSegment(lineSegment) {
  return new Line(lineSegment.point1, lineSegment.point2);
}
/**
 * The perpandicular bisector of a line segment
 * @param  {LineSegment} lineSegment the given line segment
 * @return {Line}             the perpendicular bisector
 */
function perpendicularBisector(lineSegment) {
  var m;
  if (lineSegment.slope == 0) {
    m = NaN;
  } else if (isNaN(lineSegment.slope)) {
    m = 0
  } else {
    m = -1/lineSegment.slope;
  }
  return newLineFromPointSlope(lineSegment.midpoint, m);
}
/**
 * get a new point with the given displacement in vector from a given point
 * @param  {Point} point  the original point
 * @param  {Vector} vector the displacement from the original point
 * @return {Point}        the new point
 */
function newPointTranslatedByVector(point, vector) {
  return new Point(point.x+vector.x, point.y+vector.y);
}
/**
 * Project a point onto the line so that the projected point is the closest to the point on the line
 * @param  {Point} point the point to be projected
 * @param  {Line} line  the line on which the point will be projected
 * @return {Point}       the projected point
 */
function projectedPointOnLine(point, line) {
  if (pointIsOnLine(point, line)) {
    return point.clone();
  } else if (!isNaN(line.m) && (line.m != 0)) {
    var m2 = -1/line.m;
    var line2 = newLineFromPointSlope(point, m2);
    var intercept = interceptOfLines(line, line2);
    return intercept;
  } else if (line.m == 0) {
    return new Point(point.x, line.c);
  } else {
    return new Point(line.xIntercept.x, point.y);
  }
}
/**
 * Reflect a point about a given straight line
 * @param  {Point} point the point to be reflected
 * @param  {Line} line  the line about which the point will be reflected
 * @return {Point}       the reflected point
 */
function newPointReflectedInLine(point, line) {
  var intercept = projectedPointOnLine(point, line);
  var change = vectorFromPoints(point, intercept);
  return newPointTranslatedByVector(intercept, change); 
}
/**
 * Obtain the shortest distance of a point from a line
 * @param  {Point} point the point
 * @param  {Line} line  the line
 * @return {Number}       the shortest distance
 */
function distanceOfPointFromLine(point, line) {
  var projection = projectedPointOnLine(point, line);
  return new LineSegment(point, projection).length;
}
/**
 * Construct a vector that points from the first point to the second point
 * @param  {Point} point1 the first point
 * @param  {Point} point2 the second point
 * @return {Vector}        the resultant vector
 */
function vectorFromPoints(point1, point2) {
  return new Vector(point2.x - point1.x, point2.y - point1.y);
}
/**
 * the dot product of two vectors, i.e. x1*x2 + y1*y2
 * @param  {Vector} vector1 the first vector
 * @param  {Vector} vector2 the second vector
 * @return {Number}         the dot product
 */
function dotProduct(vector1, vector2) {
  return vector1.x*vector2.x + vector1.y*vector2.y;
}
/**
 * the angle made between two vectors joining at the tail
 * @param  {Vector} vector1 the first vector
 * @param  {Vector} vector2 the second vector
 * @return {Number}         the angle in radian; return NaN if either one of the vectors is a zero vector
 */
function angleBetweenVectors(vector1, vector2) {
  if (!vector1.isZeroVector && !vector2.isZeroVector) {
    return Math.acos(dotProduct(vector1, vector2)/(vector1.magnitude*vector2.magnitude));
  } else {
    return NaN;
  }
}
/**
 * sum the two vectors together
 * @param {Vector} vector1 the first vector
 * @param {Vector} vector2 the second vector
 * @return {Vector} the resultant vector
 */
function addVectors(vector1, vector2) {
  return new Vector(vector1.x+vector2.x, vector1.y+vector2.y);
}
/**
 * subtract the two vectors, i.e. return vector 1 - vector 2
 * @param  {Vector} vector1 the first vector
 * @param  {Vector} vector2 the second vector
 * @return {Vector}         the resultant vector
 */
function subtractVectors(vector1, vector2) {
  return new Vector(vector1.x-vector2.x, vector1.y-vector2.y);
}
/**
 * the intersection between a circle and a line
 * @param  {Circle} circle the circle
 * @param  {Line} line   the line
 * @return {[Point]}        an array containing the intersection points; the array will be empty if there is no intersection found
 */
function intersectionOfCircleAndLine(circle, line) {
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
      return [new Point(x, x*m + c)];
    } else {
      var x1 = (-qb + Math.sqrt(delta))/(2*qa);
      var x2 = (-qb - Math.sqrt(delta))/(2*qa);
      return [new Point(x1, x1*m + c), new Point(x2, x2*m + c)];
    }
  } else {
    // update when point in/out/on circle is implemented?
    var x = line.xIntercept.x;
    var d = Math.abs(x - a);
    if (d < r) {
      return [new Point(x,b+Math.sqrt(r*r-d*d)), new Point(x,b-Math.sqrt(r*r-d*d))];
    } else if (d == r) {
      return [new Point(x, b)];
    } else {
      return [];
    }
  }
}
/**
 * the intersection between two circles
 * @param  {Circle} circle1 the first circle
 * @param  {Circle} circle2 the second circle
 * @return {[Point]}         an array containing the intersection points; the array will be empty if there is no intersection found
 */
function intersectionOfCircles(circle1, circle2) {
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
    return [sol1, sol2];
  } else if (d == r1 + r2) {
    var sol = new Point(r1, 0).rotate(angle).translateByVector(circle1.center);
    return [sol];
  } else {
    return [];
  }
}
/**
 * check that whether the first circle is inside the second circle
 * @param  {Circle}  circle1 the first circle
 * @param  {Circle}  circle2 the second circle
 * @return {Boolean}         whether the first circle is inside the second circle
 */
function isCircleInCircle(circle1, circle2) {
  if (intersectionOfCircles(circle1, circle2).length > 0) {
    return false;
  } else {
    return ((pointIsStrictlyInCircle(circle1.center, circle2)) || (pointIsStrictlyInCircle(circle2.center, circle1)));
  }
}
// - on line or line segment
/**
 * check whether a point is on a line or not
 * @param  {Point} point the point
 * @param  {Line} line  the line
 * @return {Boolean}       whether the point is on the line or not
 */
function pointIsOnLine(point, line) {
  return (point.y == line.m*point.x + line.c);
}
/**
 * check whether a point is on a line segment or not
 * @param  {Point} point       the point
 * @param  {LineSegment} lineSegment the line segment
 * @return {Boolean}             whether the point is on the line segment or not
 */
function pointIsOnLineSegment(point, lineSegment) {
  var point1 = lineSegment.point1;
  var point2 = lineSegment.point2;
  var line = new Line(point1, point2);
  var lowerBound = Math.min(point1.x, point2.x);
  var upperBound = Math.max(point1.x, point2.x);
  return (pointIsOnLine(point, line) && (point.x >= lowerBound) && (point.x <= upperBound));
}
/**
 * check whether a point is strictly inside a circle or not
 * @param  {Point} point  the point
 * @param  {Circle} circle the circle
 * @return {Boolean}        whether the point is inside the circle or not
 */
function pointIsStrictlyInCircle(point, circle) {
  var pointFromCenter = vectorFromPoints(point, circle.center);
  return (pointFromCenter.magnitude < circle.radius);
}
/**
 * check whether a point is on the circumference of the circle or not
 * @param  {Point} point  the point
 * @param  {Circle} circle the circle
 * @return {Boolean}        whether the point is on the circumference or not
 */
function pointIsOnCircleCircumference(point, circle) {
  var pointFromCenter = vectorFromPoints(point, circle.center);
  return (pointFromCenter.magnitude == circle.radius);
}
/**
 * check whether a point is strictly outside of a circle or not
 * @param  {Point} point  the point
 * @param  {Circle} circle the circle
 * @return {Boolean}        whether the point is outside the circle or not
 */
function pointIsStrictlyOutOfCircle(point, circle) {
  var pointFromCenter = vectorFromPoints(point, circle.center);
  return (pointFromCenter.magnitude > circle.radius);
}
// - polygon
/**
 * check whether a point is on one of the edges of the polygon or not
 * @param  {Point} point   the point
 * @param  {Polygon} polygon the polygon
 * @return {Boolean}         whether the point is on one of the edges or not
 */
function pointIsOnPolygonEdge(point, polygon) {
  var onEdge = false;
  polygon.edges.forEach(function(edge) {
    if (pointIsOnLineSegment(point, edge)) {
      onEdge = true;
    }
  });
  return onEdge;
}
/**
 * check whether a point is strictly inside the polygon or not; the winding number algorithm is used
 * @param  {Point} point   the point
 * @param  {Polygon} polygon the polygon
 * @return {Boolean}         whether the point is enclosed by the polygon or not
 */
function pointIsStrictlyInPolygon(point, polygon) {
  var windingNumber = 0;
  polygon.edges.forEach(function(edge) {
    var thisVertex = edge.point1;
    var nextVertex = edge.point2;
    var lineFromEdge = newLineFromLineSegment(edge);
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
  return (Math.abs(windingNumber) == 1);
}
/**
 * check whether a point is strictly outside the polygon or not; the winding number algorithm is used
 * @param  {Point} point   the point
 * @param  {Polygon} polygon the polygon
 * @return {Boolean}         whether the point is outside the polygon or not
 */
function pointIsStrictlyOutOfPolygon(point, polygon) {
  return (!pointIsOnPolygonEdge(point, polygon) && !pointIsStrictlyInPolygon(point, polygon));
}


// MARK: - helper functions
/**
 * @private to check whether a line is on the left of a point or not
 * @param  {Line} line  the line
 * @param  {Point} point the point
 * @return {Boolean}       whether the line is at the left of the point or not
 */
function lineIsLeftOfPoint(line, point) {
  if (!isNaN(line.m)) {
    if (line.m == 0) {
      return false;
    } else {
      if (pointIsOnLine(point, line)) {
        return false;
      } else {
        return (line.calX(point.y) < point.x);
      }
    }
  } else {
    return (line.xIntercept.x < point.x);
  }
}