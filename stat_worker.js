var Ek,Ep;

function energy()
{
	onmessage = function(e){
		var a = e.data[0]*100;
		var f = e.data[1]/2000;
		var x2 = e.data[2];
		var k = 100*Math.pow(2*Math.PI*f,2);
		Ep = (k*a*a*Math.pow(Math.cos(2*Math.PI*f*x2),2))/2;
		Ek = (k*a*a*Math.pow(Math.sin(2*Math.PI*f*x2),2))/2;
		postMessage("Energia kinetyczna: "+Ek.toFixed(3)+" J  Energia potencjalna: "+Ep.toFixed(3)+" J");
		//setTimeout("energy()",3000);
	};
}

//setTimeout("energy()",1000);
energy();