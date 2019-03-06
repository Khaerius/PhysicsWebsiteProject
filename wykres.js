var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
 
for (var x = 0.5; x < 800; x += 10) {
  context.moveTo(x, 0);
  context.lineTo(x, 600);
}
for (var y = 0.5; y < 600; y += 10) {
  context.moveTo(0, y);
  context.lineTo(800, y);
}
context.strokeStyle = "#ddd";
context.stroke();