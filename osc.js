window.requestAnimFrame = (function (callback){return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
})();

function drawParticle(Particle,context)
{
	context.beginPath();
	context.arc(Particle.centerX,Particle.centerY,Particle.radius,0,2*Math.PI,false);
	context.fillStyle = 'green';
	context.fill();
	context.lineWidth = 0;
}

function animate(Particle,canvas,context,startTime)
{
	var time = (new Date()).getTime() - startTime;
	var amplitude = 100;

	var period = 2000;
	var cX = canvas.width - Particle.centerX/2;
	var nX = amplitude*Math.cos(time*2*Math.PI/period) + cX;
	Particle.centerX = nX;

	context.clearRect(0,0,canvas.width,canvas.height);

	drawParticle(Particle,context);

	requestAnimFrame(function() {animate(Particle,canvas,context,startTime);});
}

var canvas = document.getElementById('oscylacja');
var context = canvas.getContext('2d');

var Particle = {
	centerX: canvas.width / 2,
	centerY: canvas.height / 2,
	radius: 40
};

drawParticle(Particle,context);

setTimeout(function() {var startTime = (new Date()).getTime();
animate(Particle,canvas,context,startTime);},1000);