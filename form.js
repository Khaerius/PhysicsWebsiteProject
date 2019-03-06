var canvas2 = document.getElementById("waveform");
var ctx = canvas2.getContext("2d");

var w = canvas2.width;
var h = canvas2.height;
var range = 100;
var bl = 1;
var rangex = w/range;
var rangey = h/range;
var color = "green";


function grid()
{
	ctx.strokeStyle = "black";
	for(i=1;i<=Math.floor(rangex*2);i++)
	{
		ctx.lineWidth = 1/6;
		ctx.beginPath();
		ctx.moveTo((range/2)*i,0);
		ctx.lineTo((range/2)*i,h);
		ctx.closePath();
		ctx.stroke();
	}
	for(i=1;i<=Math.floor(rangey*2);i++)
	{
		ctx.lineWidth = 1/6;
		ctx.beginPath();
		ctx.moveTo(0,(range/2)*i);
		ctx.lineTo(w,(range/2)*i);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(0,h/2);
	ctx.lineTo(w,h/2);
	ctx.closePath();
	ctx.stroke();
 
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,h);
	ctx.closePath();
	ctx.stroke();
	for(i=-(rangex/2);i<=(rangex/2);i++)
	{
		ctx.fillText(i+4,(i+(rangex/2))*range,h/2);
	}
	ctx.save();
}
grid();
///////////////////////////////Rysowanie uk³adu wspó³rzêdnych///////////////////////////////


function start_settings()
{
	ctx.translate(0, h/2);
	ctx.scale(range,range);
}
start_settings();

function plot()
{
	ctx.strokeStyle = "red";
	ctx.lineWidth = 1/50;
	var a = document.getElementById("A").value;
	var f = document.getElementById("C").value;
	var b = document.getElementById("B").value;
	ctx.beginPath();
	for(x=-rangex;x<=rangex;x+=0.01)
	{
		X = x;
		y = a*Math.exp(-b*x)*Math.cos(2*Math.PI*f*x);
		if(y!='')
		{
			if (isNaN(y) || (y == Number.NEGATIVE_INFINITY) ||
			(y == Number.POSITIVE_INFINITY) || (Math.abs(y) > 2e5)) {
			bl = 2;
			y = 0.0;
			}
			if (bl > 0)
			{
				if (bl == 1)
				{
					ctx.moveTo(x, -y);
				}
				--bl;
			}
			else {
				ctx.lineTo(x, -y);
			}
		}
 
	}
	ctx.stroke();
}
///////////////////////////////Rysowanie funkcji o zadanych parametrach/////////////////////////////////


function clean()
{
	location.reload(true);
	
}

document.getElementById("button").onclick = plot;
document.getElementById("clean").onclick = clean;

window.requestAnimFrame = (function (callback){return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
})();

function drawParticle2(Particle,context)
{
	context.beginPath();
	context.arc(Particle.centerX,Particle.centerY,Particle.radius,0,2*Math.PI,false);
	context.fillStyle = 'blue';
	context.fill();
	context.lineWidth = 0;
}

var gTime;

function animate2(Particle,canvas,context,startTime)
{
	var a = document.getElementById("A").value;
	var f = document.getElementById("C").value;
	var b = document.getElementById("B").value;
	var time = (new Date()).getTime() - startTime;
	gTime = time;
	
	var amplitude = a*100;
	var period = ((2000*(1/f))+1);
	var cX = canvas.width - Particle.centerX/2;
	var nX = amplitude*Math.exp(-(b*100)*time)*Math.cos(time*2*Math.PI/period) + cX;
	Particle.centerX = nX;

	context.clearRect(0,0,canvas.width,canvas.height);

	drawParticle2(Particle,context);

	requestAnimFrame(function() {animate2(Particle,canvas,context,startTime);});
}
////////////////////////////Obiekt oscyluj¹cy zgodnie z wykresem///////////////////////////////////

var canvas3 = document.getElementById('symulacja');
var context3 = canvas3.getContext('2d');


var Particle2 = {
	centerX: canvas3.width / 2,
	centerY: canvas3.height / 2,
	radius: 20
};

drawParticle2(Particle2,context3);

animate2(Particle2,canvas3,context3,(new Date()).getTime());
////////////////////////Inicjalizacja symulacji/////////////////////////////////////////

var w;
var flag=0;
var i=0;
function startWorker()
{
	if (typeof(Worker) !== "undefined") {
    		if (flag == 0) {
     			w = new Worker("stat_worker.js");
			flag = 1;
			var dane = [document.getElementById("A").value,document.getElementById("C").value,gTime];
			w.postMessage(dane);
    		}
    		w.onmessage = function(event) {
			if(i%((document.getElementById("C").value)*1500)==0){
      				document.getElementById("energia").innerHTML = event.data;
			}
			var dane = [document.getElementById("A").value,document.getElementById("C").value,gTime];
			w.postMessage(dane);
			i++;
			if(i==1000000)
			{
				i=0;
			}	
    			};
  	} else {
    		document.getElementById("energia").innerHTML = "Sorry! No Web Worker support.";
  	}
}
						
function stopWorker() { 
	w.terminate();
	w = undefined;
	flag=0;
	i=0;
}

///////////////////////////////////Energia z wykorzystanie Web Workera/////////////////////////////////
