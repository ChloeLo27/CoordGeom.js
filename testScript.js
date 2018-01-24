// - MARK: testing for class Point

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


// - MARK: testing for class Line

// test init
var line1 = new Line(1,2);

// test calculated properties
console.log(line1.xIntercept);
	// EXPECT: {x: -2, y: 0}
console.log(line1.yIntercept);
	// EXPECT: {x: 0, y: 2}


// - MARK: testing for class Vector

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


// - MARK: testing for class lineSegment
var point2 = new Point(4,5);
var lineSegment1 = new lineSegment(point1, point2);

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


// - MARK: test for albegraic functions

// set new variables for testing
point1.update(-5,-7);
var line2 = new Line(-1,3);

console.log(interceptOfLines(line1, line2));
	// EXPECT: {x: 0.5, y: 2.5}

console.log(lineFromPointSlope(point2, 2));
	// EXPECT: {c: -3, m: 2}

console.log(lineFromPoints(point1, point2));
	// EXPECT: {c: -0.3333333333333333, m: 1.3333333333333333}
	// float point error gives: {c: -0.33333333333333304, m: 1.3333333333333333}

console.log(translatePointByVector(point1, vector1));
	// EXPECT: {x: 13, y: 25}

console.log(vectorFromPoints(point1, point2));
	// EXPECT: {x: 9, y: 12}

console.log(reflectPointInLine(point1, line2));
	// EXPECT: {x: 10, y: 8}
