/*
CoordGeom.js - ui.js
A JAVASCRIPT FRAMEWORK FOR COORDINATE GEOMETRY + VECTOR - UI COMPONENT

Creator:    Chloe Lo
Created at: 30 JAN 2018
*/

// # UI COMPONENT

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
    DOMelement.setAttribute("cg-x", point.x);
    DOMelement.setAttribute("cg-y", point.y);
    DOMelement.setAttribute("cg-class", "Point");
    this.DOMelement = DOMelement;
  }
  
  // getters and setters
  set id(id) {
  	this._id = id;
    this.DOMelement.setAttribute("cg-point-id", id);
  }
}

// MARK: - class Canvas

class Canvas {
  // init
  constructor() {
    var divCanvas = document.querySelector("div#canvas");
    if (divCanvas !== null) {
    	this.DOMelement = divCanvas; // DOM element
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

  // methods
  getClickOffset(event) {
  	return new Point(event.pageX - canvas.offset.x, event.pageY - canvas.offset.y);
  }
  addPoint(point) {
  	// create the DOM element
  	var pointOnCanvas = new PointOnCanvas(point);
    pointOnCanvas.id = this.pointsOnCanvas.length;
    // add the point into canvas
    this.DOMelement.appendChild(pointOnCanvas.DOMelement);
    this.pointsOnCanvas.push(pointOnCanvas);
  }
  addPointWithAttributes(point, attributes) {
  	// create the DOM element
  	var pointOnCanvas = new PointOnCanvas(point);
    pointOnCanvas.id = this.pointsOnCanvas.length;
    // check whether class exists
    if (attributes.hasOwnProperty("class")) {
    	attributes["class"] += " point";
    }
    // set custom attributes
    for (var key in attributes) {
    	pointOnCanvas.DOMelement.setAttribute(key, attributes[key]);
    }
    // add the point into canvas
    this.DOMelement.appendChild(pointOnCanvas.DOMelement);
    this.pointsOnCanvas.push(pointOnCanvas);
  }

}