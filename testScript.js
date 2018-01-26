// MARK: - testing for class Point

// test init
var point1 = new Point(3,4);

// test calculated properties
console.log(point1.angle);
	// EXPECT: 0.9272952180016122
console.log(point1.slope);
	// EXPECT: 1.3333333333333333
console.log(point1.distance);
	// EXPECT: 5

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
console.log(point1.scale(2));
	// EXPECT: {x: -10, y: -14}
console.log(point1.scaleX(3));
	// EXPECT: {x: -30, y: -14}
console.log(point1.scaleY(4));
	// EXPECT: {x: -30, y: -56}
console.log(point1.clone());
	// EXPECT: {x: -30, y: -56}


// MARK: - testing for class Line

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


// MARK: - testing for class Vector

// test init
var vector1 = new Vector(3,4);

// test calculated properties
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


// MARK: - testing for class lineSegment
var point2 = new Point(4,5);

// test init
var lineSegment1 = new LineSegment(point1, point2);

// test calculated properties
console.log(lineSegment1.midpoint);
	// EXPECT: {x: -13, y: -25.5}
console.log(lineSegment1.dx);
	// EXPECT: 34
console.log(lineSegment1.dy);
	// EXPECT: 61
console.log(lineSegment1.length);
	// EXPECT: 69.8355210477
console.log(lineSegment1.slope);
	// EXPECT: 1.7941176471


// MARK: - testing for class Polygon
point1.update(-5,-7);
var point3 = new Point(1,2);

// test init
var polygon1 = new Polygon([point1, point2, point3]);

// test calculated properties
console.log(polygon1.numberOfVertices);
	// EXPECT: 3
console.log(polygon1.area);
	// EXPECT: 4.5

// test methods
console.log(polygon1.translate(3,4));
	/* EXPECT:
	{vertices: [
		{x: -2, y: -3},
		{x: 7, y: 9},
		{x: 4, y: 6} ]
	}
	*/


// MARK: - testing for class Circle
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

// set new variables for testing
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

var line6 = lineFromPointSlope(point2, 2);
console.log(line6.c);
	// EXPECT: -3
console.log(line6.m);
	// EXPECT: 2

console.log(newPointByVector(point1, vector1));
	// EXPECT: {x: 13, y: 25}

console.log(vectorFromPoints(point1, point2));
	// EXPECT: {x: 9, y: 12}

console.log(newPointReflectInLine(point1, line4));
	// EXPECT: {x: 10, y: 8}
