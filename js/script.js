      var map = L.map('map').setView([38.8833,-97.0167], 3);
       var hdat=null;
        
        var flag=true;
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets',
           continuousWorld: 'true',
           noWrap: 'true'
        }).addTo(map);
       
      var speed=200;
      var polyline = L.polyline([]).addTo(map)
      var latvalues=[];
      var lngvalues=[];
      var pointsAdded = 0;
	  var var_ret=[];
	  var limit=20;
	  

function ajax_call() 
	{

		var xmlhttp=false;
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
		{
		  xmlhttp = new XMLHttpRequest();
		}
		
		var query = "php/getData.php?query=";
		xmlhttp.open("GET", query, true);
		xmlhttp.onreadystatechange=function() 
		{
			if (xmlhttp.readyState==4) 
			{			
				
					var_ret = JSON.parse(xmlhttp.responseText);
			}
					console.log(var_ret[0][2]);
					console.log(var_ret[0]);
					

				var polyline = L.polyline([]).addTo(map);
				var pointsadded = 0;
				var latvalues = [];
				var lngvalues = [];
				
				for(i=0;i<var_ret.length;i++)
				{
					latvalues.push(+var_ret[i][0]);
				
					lngvalues.push(0-var_ret[i][1]);          
				}
								
				add();
	
		
			function add() 
			{
				  

			   polyline.addLatLng(
			   L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));

			   
			   map.setView([latvalues[pointsAdded],lngvalues[pointsAdded]],4 );

			   if (++pointsAdded < limit & flag==true) window.setTimeout(add, speed);
			}
		}
		
		xmlhttp.send(null)
		return false;
	}
	
 