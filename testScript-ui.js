// # UI COMPONENT

// MARK: - UI flow for testing

var canvas = new Canvas();

var greyPoint = canvas.addPointOnCanvas(new Point(10,10));
greyPoint.DOMelement.addEventListener('click', function() {
	canvas.removePointOnCanvas(greyPoint);
});
var redPoint = canvas.addPointOnCanvasWithAttributes(new Point(20,20), {"class":"red", "data-custom": 563});
redPoint.DOMelement.addEventListener('click', function() {
	redPoint.moveTo(redPoint.point.translate(10,10));
});

var point1 = new Point(100,30);
var point2 = new Point(200,70);
var lineSegment1 = new LineSegment(point1, point2);
var greyLine = canvas.addLineSegmentOnCanvas(lineSegment1);
console.log(greyLine);
canvas.showLineSegmentOnCanvasEndPoints(greyLine);