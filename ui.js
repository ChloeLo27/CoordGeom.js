/*
CoordGeom.js - ui.js
A JAVASCRIPT FRAMEWORK FOR COORDINATE GEOMETRY + VECTOR - UI COMPONENT

Creator:    Chloe Lo
Created at: 30 JAN 2018
*/

// # UI COMPONENT

// MARK: - class canvas

class Canvas {
  // init
  constructor() {
    var divCanvas = document.querySelector("div#canvas");
    if (divCanvas !== null) {
    	this.HTMLelement = divCanvas; // DOM element
      this.height = divCanvas.offsetHeight; // TYPE: float
      this.width = divCanvas.offsetWidth; // TYPE: float
      this.offset = new Point(divCanvas.offsetLeft, divCanvas.offsetTop); // TYPE: Point
      this.origin = new Point(0, 0); // TYPE: Point
      this.upwardsY = false; // TYPE: bool
      this.pointSize = 5;
    } else {
      console.log("There is no canvas in the body.  Please create a div with id 'canvas'.");
    }
  }

  // methods
  drawCircleWithAttributes(circle, attributes) {
  	
  }
  getPointElement(point) {
  	var pointElement = document.createElement('span');
    // set the position of th element
    pointElement.style.top = point.y + "px";
    pointElement.style.left = point.x + "px";
    pointElement.setAttribute("class", "point");
    pointElement.setAttribute("CoordGeom-x", point.x);
    pointElement.setAttribute("CoordGeom-y", point.y);
    pointElement.setAttribute("CoordGeom-class", "Point");
    return pointElement;
  }
  drawPoint(point) {
  	// create the DOM element
  	var pointOnCanvas = this.getPointElement(point);
    // add the point into canvas
    this.HTMLelement.appendChild(pointOnCanvas);
  }
  drawPointWithAttributes(point, attributes) {
  	// create the DOM element
  	var pointOnCanvas = this.getPointElement(point);
    // check whether class exists
    if (attributes.hasOwnProperty("class")) {
    	attributes["class"] += " point";
    }
    // set custom attributes
    for (var key in attributes) {
    	pointOnCanvas.setAttribute(key, attributes[key]);
    }
    // add the point into canvas
    this.HTMLelement.appendChild(pointOnCanvas);
  }
  drawLineWithAttributes(line, attributes) {
  	
  }
  drawLineSegmentWithAttributes(lineSegment, attributes) {
  	
  }
  drawVectorWithAttributes(vector, attributes) {
  	
  }

}