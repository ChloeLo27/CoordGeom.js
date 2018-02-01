// # UI COMPONENT

// MARK: - test for class Canvas

var canvas = new Canvas();
var pointReadyToMove;
var pointMoved = false;

canvas.DOMelement.addEventListener('click', function(event) {
	var target = event.target;
	if (target.tagName == "DIV" && target.id =="drawing-layer") {
  	var offset = canvas.getEventOffset(event);
  	var addedPoint = canvas.addPointWithAttributes(offset, {"class": "red", "custom-id": 56});
  	console.log("angle of point to origin (clockwise)", addedPoint.point.angle);
    addedPoint.DOMelement.addEventListener('mousedown', function() {
    	pointReadyToMove = addedPoint;
      canvas.DOMelement.addEventListener('mousemove', movePointByDrag);
    });
    addedPoint.DOMelement.addEventListener('mouseup', function() {
    	pointReadyToMove = null;
      canvas.DOMelement.removeEventListener('mousemove', movePointByDrag);
    });
  } else {
  	if (!pointMoved) {
    	canvas.removePointOnCanvasOfId(target.dataset.id);
    }
    pointMoved = false;
  }
});

function movePointByDrag(event) {
	var offset = canvas.getEventOffset(event);
  pointReadyToMove.moveTo(offset);
  pointMoved = true;
}