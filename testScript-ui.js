// # UI COMPONENT

// MARK: - test for class Canvas

var canvas = new Canvas();

canvas.DOMelement.addEventListener('click', function(event) {
  var offset = canvas.getClickOffset(event);
  canvas.addPointWithAttributes(offset, {"class": "red", "custom-id": 56});
  console.log("angle of point to origin (clockwise)", canvas.pointsOnCanvas[canvas.pointsOnCanvas.length-1].point.angle);
})