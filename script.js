var gIndex = 1;

function showTheme(index)
{
	var currIndex = gIndex;
	for(i=1;i<=5;i++)
	{
		if(i==index)
		{
			document.getElementById("labelFala"+i).style.fontweight = "bold";
			document.getElementById("fala"+i).style.display = "block";
			gIndex = index;
		}
		else
		{
			document.getElementById("labelFala"+i).style.fontWeight = "normal";
      		document.getElementById("fala"+i).style.display = "none";
		}
		

		if (gIndex == currIndex)
   	 		gIndex = 0;
	}
}

function navigate(nav)
{
	window.location.href = "#"+nav;
}