      var map = L.map('map').setView([38.8833,-97.0167], 3);
       var hdat=null;
        
     
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
            maxZoom: 18,
            
            id: 'mapbox.streets',
           continuousWorld: 'true',
           noWrap: 'true'
        }).addTo(map);
       
      var speed=1000;
     
      var latvalues=[];
      var lngvalues=[];
      var hwind=[];
      var pointsAdded = 0;
	  var var_ret=[];
	  var limit=0;
	  var identity= ["AL052005","AL012005","AL032005"];
	  var j=0;
	  var flag=true;
	  var playstate=[];
	  var polyline = L.polyline([]).addTo(map);

	 

 function plot_all_hurricanes()
{
	flag=false;
	map.removeLayer(polyline);
	
	while(j<identity.length)		
			
		{
			
			console.log(j);
			get_Data(identity[j]);
			j++;
		}
	j=0;
	
} 
function increase_speed()
{
	speed=speed-100;
}
function decrease_speed()
{
	speed=speed+100;
}


function get_Data(hurr_id) 
	{
		var marker = L.marker([0, 0]);

		flag=true;
		console.log(hurr_id);
		var xmlhttp=false;
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
		{
		  xmlhttp = new XMLHttpRequest();
		}
		
		var query = "php/getData.php?query="+hurr_id;
		xmlhttp.open("GET", query, false);
		xmlhttp.onreadystatechange=function() 
		{
			if (xmlhttp.readyState==4) 
			{			
				
					var_ret = JSON.parse(xmlhttp.responseText);
			}
					//console.log(var_ret[0][6]);
					//console.log(var_ret);
					

				var polyline = L.polyline([]).addTo(map);
				var pointsAdded = 0;
				var limit=0;
				var latvalues = [];
				var lngvalues = [];
				limit=var_ret.length-1;
				
				for(i=0;i<var_ret.length;i++)
				{
					latvalues.push(+var_ret[i][6]);
				
					lngvalues.push(0-var_ret[i][7]); 

					hwind.push(+var_ret[i][8]);         
				}
						
				draw_hurricanes();  // Draw each hurricane
				
	
		
			function draw_hurricanes() 
			{
				  
				// Below code draws polyline along the path of the hurricane
			   polyline.addLatLng(
			   L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));
			   L.circle([latvalues[pointsAdded],lngvalues[pointsAdded]],(hwind[pointsAdded]-100)*5000,{
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.2,
			    stroke: false
			}).addTo(map);
			  
			  //Below code translates the hurricane marker along it's path
			  //	 map.setView([latvalues[pointsAdded],lngvalues[pointsAdded]]);
			  window.setInterval(function() {
       			marker.setLatLng(L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));}, speed);
       			marker.addTo(map);
			   if (++pointsAdded < limit & flag==true) window.setTimeout(function(){draw_hurricanes();},speed);
			   
			}
		}

		function movemarker()
		{


		}
		
		xmlhttp.send(null)
		console.log("here "+j);

		return false;	
		
	}