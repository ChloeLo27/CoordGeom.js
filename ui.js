/*
CoordGeom.js - ui.js
A JAVASCRIPT FRAMEWORK FOR COORDINATE GEOMETRY + VECTOR - UI COMPONENT

Creator:    Chloe Lo
Created at: 30 JAN 2018
*/


// MARK: - class Canvas

class Canvas {
  // init
  constructor() {
    var divCanvas = document.querySelector("div#canvas");
    var bgLayer = document.createElement("div");
    bgLayer.setAttribute("id", "bg-layer");
    var drawingLayer = document.createElement("div");
    drawingLayer.setAttribute("id", "drawing-layer");
    divCanvas.appendChild(bgLayer);
    divCanvas.appendChild(drawingLayer);
    if (divCanvas !== null) {
    	this.DOMelement = divCanvas; // DOM element
      this.drawingLayer = drawingLayer;
      this.bgLayer = bgLayer;
      this.height = divCanvas.offsetHeight; // TYPE: float
      this.width = divCanvas.offsetWidth; // TYPE: float
      this.offset = new Point(divCanvas.offsetLeft, divCanvas.offsetTop); // TYPE: Point
      this.origin = new Point(0, 0); // TYPE: Point
      this.upwardsY = false; // TYPE: bool
      this.pointSize = 5;
      // all geometrical objects visualisation representation within canvas
      this.pointsOnCanvas = [];
      this.linesOnCanvas = [];
      this.lineSegmentsOnCanvas = [];
      this.polygonsOnCanvas = [];
      this.circlesOnCanvas = [];
      this.vectorsOnCanvas = [];
    } else {
      console.log("There is no canvas in the body.  Please create a div with id 'canvas'.");
    }
  }

  // calculated properties
  get numberOfPointsOnCanvas() {
  	return this.pointsOnCanvas.length; // TYPE: int
  }
  get lastPointOnCanvas() {
  var n = parseInt(this.numberOfPointsOnCanvas);
    if (n > 0) {
    	return this.pointsOnCanvas[n-1];
    } else {
    	return false;
    }
  }
  get numberOfLineSegmentsOnCanvas() {
  	return this.lineSegmentsOnCanvas.length; // TYPE: int
  }
  get lastLineSegmentOnCanvas() {
  var n = parseInt(this.numberOfLineSegmentsOnCanvas);
    if (n > 0) {
    	return this.lineSegmentsOnCanvas[n-1];
    } else {
    	return false;
    }
  }
  
  // general methods
  getEventOffset(event) {
  	return new Point(event.pageX - canvas.offset.x, event.pageY - canvas.offset.y);
  }
  getAdjustedAngle(angle) {
  	return angle;
  }
  addClassToObject(className, objectOnCanvas) {
  	var classString = className + " " + objectOnCanvas.DOMelement.getAttribute("class");
  	objectOnCanvas.DOMelement.setAttribute("class", classString);
  }
  removeClassFromObject(className, objectOnCanvas) {
  	var classString = objectOnCanvas.DOMelement.getAttribute("class");
  	var newClassString = classString.replace(className, "");
  	objectOnCanvas.DOMelement.setAttribute("class", newClassString);
  }
  
  // method - point manipulation
  getPointWithId(id) {
  	return this.pointsOnCanvas.find(function (pointOnCanvas) {
    	return pointOnCanvas.id == id;
    });
  }
  addPointOnCanvas(point) { // TYPE: Point
  	// create the DOM element
  	var pointOnCanvas = new PointOnCanvas(point);
    var lastPointOnCanvas = this.lastPointOnCanvas;
    if (lastPointOnCanvas) {
    	pointOnCanvas.id = lastPointOnCanvas.id + 1;
    } else {
    	pointOnCanvas.id = 0;
    }
    // add the point into canvas
    this.drawingLayer.appendChild(pointOnCanvas.DOMelement);
    this.pointsOnCanvas.push(pointOnCanvas);
    return pointOnCanvas; // TYPE: PointOnCanvas
  }
  addPointOnCanvasWithAttributes(point, attributes) { // TYPE: Point, JSON
  	var addedPoint = this.addPointOnCanvas(point);
    // set custom attributes
    if (attributes.hasOwnProperty("class")) {
    	attributes["class"] += " point";
    }
    for (var key in attributes) {
    	addedPoint.DOMelement.setAttribute(key, attributes[key]);
    }
    return addedPoint; // TYPE: PointOnCanvas
  }
  removePointOnCanvas(pointOnCanvas) {
  	var pointIndexInArray = this.pointsOnCanvas.indexOf(pointOnCanvas);
    if (pointIndexInArray >= 0) {
    	console.log(pointOnCanvas.DOMelement);
    	this.drawingLayer.removeChild(pointOnCanvas.DOMelement);
	    this.pointsOnCanvas.splice(pointIndexInArray, 1);
      // change to filter if later consider using ctrl+z
    }
  }
  removePointOnCanvasWithId(id) {
  	var pointOnCanvasToRemove = this.getPointWithId(id);
    this.removePointOnCanvas(pointOnCanvasToRemove);
  }
  
  // method - line segment manipulation
  addLineSegmentOnCanvas(lineSegment) { // TYPE: LineSegment
  	// create the DOM element
  	var lineSegmentOnCanvas = new LineSegmentOnCanvas(lineSegment);
    var lastLineSegmentOnCanvas = this.lastLineSegmentOnCanvas;
    if (lastLineSegmentOnCanvas) {
    	lineSegmentOnCanvas.id = lastLineSegmentOnCanvas.id + 1;
    } else {
    	lineSegmentOnCanvas.id = 0;
    }
    // add the point into canvas
    this.drawingLayer.appendChild(lineSegmentOnCanvas.DOMelement);
    this.lineSegmentsOnCanvas.push(lineSegmentOnCanvas);
    return lineSegmentOnCanvas; // TYPE: LineSegmentOnCanvas
  }
  addLineSegmentOnCanvasWithAttributes(lineSegment, attributes) { // TYPE: Point, JSON
  	var addedLineSegment = this.addLineSegmentOnCanvas(lineSegment);
    // set custom attributes
    if (attributes.hasOwnProperty("class")) {
    	attributes["class"] += " line-segment";
    }
    for (var key in attributes) {
    	addedLineSegment.DOMelement.setAttribute(key, attributes[key]);
    }
    return addedLineSegment; // TYPE: PointOnCanvas
  }
  showLineSegmentOnCanvasEndPoints(lineSegmentOnCanvas) {
  	var endPoint1OnCanvas = this.addPointOnCanvas(lineSegmentOnCanvas.lineSegment.point1);
    var endPoint2OnCanvas = this.addPointOnCanvas(lineSegmentOnCanvas.lineSegment.point2);
    lineSegmentOnCanvas.addEndPointsOnCanvas(endPoint1OnCanvas, endPoint2OnCanvas);
  }
  hideLineSegmentOnCanvasEndPoints(lineSegmentOnCanvas) {
  	var endPointsOnCanvas = lineSegmentOnCanvas.endPointsOnCanvas;
    endPointsOnCanvas.forEach(function(endPointOnCanvas) {
    	this.removePointOnCanvas(endPointOnCanvas);
    });
    lineSegmentOnCanvas.removeEndPointsOnCanvas();
  }
}

// MARK: - class PoinOnCanvas

class PointOnCanvas {
	constructor(point) { // TYPE: Point
  	this.point = point;
    var DOMelement = document.createElement('span');
    // set the position of th element
    DOMelement.style.top = point.y + "px";
    DOMelement.style.left = point.x + "px";
    DOMelement.setAttribute("class", "point");
    // set attributes for better tracking of the objects
    DOMelement.setAttribute("data-class", "Point");
    this.DOMelement = DOMelement;
  }
  
  // getters and setters
  set id(id) {
  	this._id = id;
    this.DOMelement.setAttribute("data-id", id);
  }
  get id() {
  	return this._id;
  }
  
  // methods
  moveTo(point) {
  	this.point = point;
    this.DOMelement.style.top = point.y + "px";
    this.DOMelement.style.left = point.x + "px";
    return this;
  }
}

// MARK: - class LineSegmentOnCanvas

class LineSegmentOnCanvas {
	constructor(lineSegment) {
  	this.lineSegment = lineSegment;
    var lineSegmentDOMelement = document.createElement('span');
    lineSegmentDOMelement.style.left = lineSegment.point1.x + 'px';
    lineSegmentDOMelement.style.top = lineSegment.point1.y + 'px';
    var length = lineSegment.length;
    var angle = lineSegment.angle;
		var rotateString = 'rotate(' + angle + 'rad)';
    lineSegmentDOMelement.style.width = length+'px';
    lineSegmentDOMelement.style.transform = rotateString;
    lineSegmentDOMelement.style.msTransform = rotateString;
    lineSegmentDOMelement.style.MozTransform = rotateString;
    lineSegmentDOMelement.style.OTransform = rotateString;
    lineSegmentDOMelement.style.webkitTransform = rotateString;
    lineSegmentDOMelement.setAttribute("class", "line-segment");
    // set attributes for better tracking of the objects
    lineSegmentDOMelement.setAttribute("data-class", "LineSegment");
    this.DOMelement = lineSegmentDOMelement;
    this.endPointsOnCanvas = [];
  }
  addEndPointsOnCanvas(point1OnCanvas, point2OnCanvas) {
  	this.endPointsOnCanvas.push(point1OnCanvas);
    this.endPointsOnCanvas.push(point2OnCanvas);
  }
  removeEndPointsOnCanvas() {
  	this.endPointsOnCanvas.empty();
  }
}
