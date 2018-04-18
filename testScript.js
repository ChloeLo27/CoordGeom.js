// # ALGEBRA COMPONENT

// MARK: - testing for class Point

console.log("===== CLASS POINT =====");

// test init
var point1 = new Point(3,4);
var origin = new Point(0,0);

// test calculated properties
console.log(point1.angle);
	// EXPECT: 0.9272952180016122
console.log(point1.slope);
	// EXPECT: 1.3333333333333333
console.log(point1.distance);
	// EXPECT: 5
console.log(origin.angle);
	// EXPECT: NaN
console.log(origin.slope);
	// EXPECT: NaN
console.log(origin.distance);
	// EXPECT: 0

// test methods
console.log(point1.translate(2,3));
	// EXPECT: {x: 5, y:7}
console.log(point1.rotate(Math.PI/3));
	// EXPECT: {x: -3.56217782649107, y: 7.830127018922194}
console.log(point1.flipX());
	// EXPECT: {x: 3.56217782649107, y: 7.830127018922194}
console.log(point1.flipY());
	// EXPECT: {x: 3.56217782649107, y: -7.830127018922194}
console.log(point1.update(-5,-7));
	// EXPECT: {x: -5, y: -7}
console.log(point1.clone());
	// EXPECT: {x: -5, y: -7}


// MARK: - testing for class Line

console.log("===== CLASS LINE =====");

// test init
var line1 = new Line(new Point(0,2),new Point(1,3));
var line2 = new Line(new Point(1,7),new Point(1,3));
var line3 = new Line(new Point(9,3),new Point(1,3));

// test calculated properties
console.log(line1.m);
	// EXPECT: 1
console.log(line1.c);
	// EXPECT: 2
console.log(line1.xIntercept);
	// EXPECT: {x: -2, y: 0}
console.log(line1.yIntercept);
	// EXPECT: {x: 0, y: 2}
console.log(line1.isVertical);
	// EXPECT: false
console.log(line1.isHorizontal);
	// EXPECT: false
console.log(line1.calX(10));
	// EXPECT: 8
console.log(line1.calY(-9));
	// EXPECT: -7

// test edge cases
console.log(line2.m);
	// EXPECT: NaN
console.log(line2.c);
	// EXPECT: NaN
console.log(line2.xIntercept);
	// EXPECT: {x: 1, y: 0}
console.log(line2.yIntercept);
	// EXPECT: NaN
console.log(line2.isVertical);
	// EXPECT: true
console.log(line2.isHorizontal);
	// EXPECT: false
console.log(line2.calX(10));
	// EXPECT: 1
console.log(line2.calY(-9));
	// EXPECT: NaN

console.log(line3.m);
	// EXPECT: 0
console.log(line3.c);
	// EXPECT: 3
console.log(line3.xIntercept);
	// EXPECT: NaN
console.log(line3.yIntercept);
	// EXPECT: {x: 0, y: 3}
console.log(line3.isVertical);
	// EXPECT: false
console.log(line3.isHorizontal);
	// EXPECT: true
console.log(line3.calX(10));
	// EXPECT: NaN
console.log(line3.calY(-9));
	// EXPECT: 3


// MARK: - testing for class Vector

console.log("===== CLASS VECTOR =====");

// test init
var vector1 = new Vector(3,4);

// test calculated properties
console.log(vector1.isZeroVector);
	// EXPECT: false
console.log(vector1.angle);
	// EXPECT: 0.9272952180016122
console.log(vector1.slope);
	// EXPECT: 1.3333333333333333
console.log(vector1.magnitude);
	// EXPECT: 5
console.log(vector1.unitVector);
	// EXPECT: {x: 0.6, y: 0.8}

// test methods
console.log(vector1.rotate(Math.PI/3));
	// EXPECT: {x: -1.964101615137754, y: 4.598076211353316}
console.log(vector1.flipX());
	// EXPECT: {x: 1.964101615137754, y: 4.598076211353316}
console.log(vector1.flipY());
	// EXPECT: {x: 1.964101615137754, y: -4.598076211353316}
console.log(vector1.negative());
	// EXPECT: {x: -1.964101615137754, y: 4.598076211353316}
console.log(vector1.rotate(-Math.PI/3).scale(2));
	// EXPECT: {x: 6, y: 8}
console.log(vector1.scaleX(3));
	// EXPECT: {x: 18, y: 8}
console.log(vector1.scaleY(4));
	// EXPECT: {x: 18, y: 32}

// test singularities
var vector2 = new Vector(0,0);
console.log(vector2.isZeroVector);
	// EXPECT: true
console.log(vector2.angle);
	// EXPECT: NaN
console.log(vector2.slope);
	// EXPECT: NaN
console.log(vector2.magnitude);
	// EXPECT: 0
console.log(vector2.unitVector);
	// EXPECT: NaN


// MARK: - testing for class lineSegment

console.log("===== CLASS LINE-SEGMENT =====");

var point2 = new Point(4,5);

// test init
var lineSegment1 = new LineSegment(point1, point2);

// test calculated properties
console.log(lineSegment1.midpoint);
	// EXPECT: {x: -0.5, y: -1}
console.log(lineSegment1.dx);
	// EXPECT: 9
console.log(lineSegment1.dy);
	// EXPECT: 12
console.log(lineSegment1.angle);
	// EXPECT: 0.927295218
console.log(lineSegment1.length);
	// EXPECT: 15
console.log(lineSegment1.slope);
	// EXPECT: 1.33333333333333333


// MARK: - testing for class Polygon

console.log("===== CLASS POLYGON =====");

point1.update(-5,-7);
var point3 = new Point(1,2);

// test init
var polygon1 = new Polygon([point1, point2, point3]);

// test calculated properties
console.log(polygon1.n);
	// EXPECT: 3
console.log(polygon1.area);
	// EXPECT: 4.5

// test methods
console.log(polygon1.translate(3,4));
	/* EXPECT:
	{
		edges: { --snipped for brevity-- },
		vertices: [
			{x: -2, y: -3},
			{x: 7, y: 9},
			{x: 4, y: 6}
		]
	}
	*/


// MARK: - testing for class Circle

console.log("===== CLASS CIRCLE =====");

var circle1 = new Circle(point1, 5);

// test calculated properties
console.log(circle1.diameter);
	// EXPECT: 10
console.log(circle1.area);
	// EXPECT: 78.5398163397
console.log(circle1.circumference);
	// EXPECT: 31.4159265359

// test methods
console.log(circle1.translate(6,2));
	/* EXPECT:
	{center: {x: 1, y: -5},
	radius: 5} */
console.log(circle1.setRadius(3));
	/* EXPECT:
	{center: {x: 1, y: -5},
	radius: 3} */



// MARK: - test for albegraic functions

// testing line intersections
console.log("===== LINE INTERSECTIONS =====");
var line4 = new Line(new Point(5,6), new Point(7,8));
var line5 = new Line(new Point(5,6), new Point(7,4));
console.log(interceptOfLines(line1, line4));
	// EXPECT: NaN
console.log(interceptOfLines(line1, line5));
	// EXPECT: {x: 4.5, y: 6.5}
console.log(interceptOfLines(line1, line2)); // vertical line at x=1
	// EXPECT: {x: 1, y: 3}
console.log(interceptOfLines(line1, line3)); // horizontal line at y=3
	// EXPECT: {x: 1, y: 3}

// testing new line operations
console.log("===== NEW LINE OPERATIONS =====");
var line6 = newLineFromPointSlope(point2, 2);
var line8 = newLineFromPointSlope(point2, NaN);
var line7 = newLineFromLineSegment(lineSegment1);
var line9 = perpendicularBisector(lineSegment1);
console.log(line6.c);
	// EXPECT: -3
console.log(line6.m);
	// EXPECT: 2
console.log(line8.c);
	// EXPECT: NaN
console.log(line8.m);
	// EXPECT: NaN
console.log(line8.xIntercept.x);
	// EXPECT: 4
console.log(line7.c);
	// EXPECT: -0.3333333333333
	// Float point error will return -0.3333333333333339 instead
console.log(line7.m);
	// EXPECT: 1.33333333333333
console.log(line9.c);
	// EXPECT: -1.375
console.log(line9.m);
	// EXPECT: -0.75

// testing point operations
console.log("===== POINT OPERATIONS =====");
console.log(newPointTranslatedByVector(point1, vector1));
	// EXPECT: {x: 13, y: 25}
console.log(projectedPointOnLine(point1, line4));
	// EXPECT: {x: -6.5, y: -5.5}
console.log(projectedPointOnLine(point1, line7));
	// EXPECT: {x: -5, y: -7}
console.log(projectedPointOnLine(point1, line2));
	// EXPECT: {x: 1, y: -7}
console.log(projectedPointOnLine(point1, line3));
	// EXPECT: {x: -5, y: 3}
console.log(newPointReflectedInLine(point1, line4));
	// EXPECT: {x: -8, y: -4}
console.log(newPointReflectedInLine(point1, line7));
	// EXPECT: {x: -5, y: -7}
console.log(newPointReflectedInLine(point1, line2));
	// EXPECT: {x: 7, y: -7}
console.log(newPointReflectedInLine(point1, line3));
	// EXPECT: {x: -5, y: 13}
console.log(distanceOfPointFromLine(point1, line4));
	// EXPECT: 2.1213203436
console.log(distanceOfPointFromLine(point1, line7));
	// EXPECT: 0
console.log(distanceOfPointFromLine(point1, line2));
	// EXPECT: 6
console.log(distanceOfPointFromLine(point1, line3));
	// EXPECT: 10

// testing vector algebra
console.log("===== VECTOR ALGEBRA =====");
vector1 = new Vector(3,4);
var vector3 = new Vector(4,3);
var vector4 = new Vector(4,-3);
var vector5 = new Vector(6,8);
console.log(vectorFromPoints(point1, point2));
	// EXPECT: {x: 9, y: 12}
console.log("    - dot product");
console.log(dotProduct(vector1, vector2)); // vector 2 is zero vector
	// EXPECT: 0
console.log(dotProduct(vector1, vector3));
	// EXPECT: 24
console.log(dotProduct(vector1, vector4));
	// EXPECT: 0
console.log(dotProduct(vector1, vector5));
	// EXPECT: 50
console.log("    - angle between vectors");
console.log(angleBetweenVectors(vector1, vector2)); // vector 2 is zero vector
	// EXPECT: NaN
console.log(angleBetweenVectors(vector1, vector3));
	// EXPECT: 0.2837941092
console.log(angleBetweenVectors(vector1, vector4));
	// EXPECT: 1.5707963268
console.log(angleBetweenVectors(vector1, vector5));
	// EXPECT: 0
console.log("    - vector addition and subtraction");
console.log(addVectors(vector1, vector3));
	// EXPECT: {x: 7, y: 7}
console.log(subtractVectors(vector1, vector5));
	// EXPECT: {x: -3, y: -4}

// testing circle intersections
console.log("===== CIRCLE INTERSECTONS =====");
var circle2 = new Circle(new Point(4, -9), 3);
var circle3 = new Circle(new Point(1, 0), 2);
console.log("    - circle and line");
console.log(intersectionOfCircleAndLine(circle1, line4));
	// EXPECT: []
console.log(intersectionOfCircleAndLine(circle1, new Line(new Point(1,-2), new Point(6,-2))));
	// EXPECT: [{x: 1, y: -2}]
console.log(intersectionOfCircleAndLine(circle1, line2));
	// EXPECT: [{x: 1, y: -2}, {x: 1, y: -8}]
console.log("    - two circles");
console.log(intersectionOfCircles(circle1, circle2));
	/* EXPECT: [
		{x: 1.17335008385784, y: -7.99498743710662},
		{x: 3.82664991614216, y: -6.00501256289338}
	] */
console.log(intersectionOfCircles(circle1, circle3));
	// EXPECT: [{x: 1, y: -2}]
	// float point error returns x: 1.0000000000000002 instead
console.log(intersectionOfCircles(circle2, circle3));
	// EXPECT: []

// testing on line or line segments
console.log("===== ON LINE OR LINE SEGMENTS =====");
var point4 = new Point(-9, line7.calY(-9));
var lineSegment2 = new LineSegment(new Point(5,6), new Point(7,8));
console.log(pointIsOnLine(point2, line6));
	// EXPECT: true
console.log(pointIsOnLine(point1, line6));
	// EXPECT: false
console.log(pointIsOnLineSegment(lineSegment1.midpoint, lineSegment1))
	// EXPECT: true
	// float point error return false due to imprecise slope
console.log(pointIsOnLineSegment(lineSegment2.midpoint, lineSegment2));
	// EXPECT: true
console.log(pointIsOnLineSegment(point4, lineSegment1));
	// EXPECT: false
console.log(pointIsOnLineSegment(point3, lineSegment1));
	// EXPECT: false

// testing in out circles
console.log("===== IN OUT CIRCLE =====");
var point5 = new Point(-2, -5);
var point6 = new Point(2, -4);
var circle4 = new Circle(circle1.center, 1);
console.log("   - point is strictly in circle");
console.log(pointIsStrictlyInCircle(origin, circle1));
	// EXPECT: false
console.log(pointIsStrictlyInCircle(point5, circle1));
	// EXPECT: false
console.log(pointIsStrictlyInCircle(point6, circle1));
	// EXPECT: true
console.log("   - point is on circle circumference");
console.log(pointIsOnCircleCircumference(origin, circle1));
	// EXPECT: false
console.log(pointIsOnCircleCircumference(point5, circle1));
	// EXPECT: true
console.log(pointIsOnCircleCircumference(point6, circle1));
	// EXPECT: false
console.log("   - point is strictly out of circle");
console.log(pointIsStrictlyOutOfCircle(origin, circle1));
	// EXPECT: true
console.log(pointIsStrictlyOutOfCircle(point5, circle1));
	// EXPECT: false
console.log(pointIsStrictlyOutOfCircle(point6, circle1));
	// EXPECT: false
console.log("	- is circle in circle");
console.log(isCircleInCircle(circle1, circle4));
	// EXPECT: true
console.log(isCircleInCircle(circle2, circle3));
	// EXPECT: false
console.log(isCircleInCircle(circle1, circle2));
	// EXPECT: false

// testing in out polygon
console.log("===== IN OUT POLYGON =====");
var point7 = new Point(3,4); // on edge
var point8 = new Point(1,-1); // outside
console.log(pointIsOnPolygonEdge(origin, polygon1));
	// EXPECT: false
console.log(pointIsOnPolygonEdge(point7, polygon1));
	// EXPECT: true
console.log(pointIsOnPolygonEdge(point8, polygon1));
	// EXPECT: false
console.log(pointIsStrictlyInPolygon(origin, polygon1));
	// EXPECT: true
console.log(pointIsStrictlyInPolygon(point7, polygon1));
	// EXPECT: false
console.log(pointIsStrictlyInPolygon(point8, polygon1));
	// EXPECT: false
console.log(pointIsStrictlyOutOfPolygon(origin, polygon1));
	// EXPECT: false
console.log(pointIsStrictlyOutOfPolygon(point7, polygon1));
	// EXPECT: false
console.log(pointIsStrictlyOutOfPolygon(point8, polygon1));
	// EXPECT: true


	