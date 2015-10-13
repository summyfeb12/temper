 
   

//var var_ret;
// 1. On clicking Submit, this function is fired.
$(".submit").click(function(){
	// 2. You can also call this function anytime you want to update the data.
	ajax_call();
});
function ajax_call() {
	var xmlhttp=false;
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	  xmlhttp = new XMLHttpRequest();
	}
	// 3. You can send the query parameters here. We shall use the controls to do the same.
	var text = $("#text").val();
	// 4. We're passing the required parameters to the PHP file here via GET method. In this case, the PHP file is getData.php
	var query = "getData.php?query="+text;
	//alert(query); // 5. Alerting the samply query. Queries don't work yet. Follow getData.php for the next step.
	xmlhttp.open("GET", query, true);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) {

			// 13. Here's the JSON response that you get.
			alert(xmlhttp.responseText);
			 var var_ret = JSON.parse(xmlhttp.responseText);
			console.log(var_ret);
		

		var polyline = L.polyline([]).addTo(map);
		var pointsadded = 0;
		var latvalues = [];
		var lngvalues = [];
		for(i=0;i<var_ret[0].length;i++)
		{
		latvalues.push(+var_ret[0][i]);
        
        lngvalues.push(0-var_ret[1][i]);          
		}
		console.log(latvalues);
		console.log(lngvalues);
		//add();
	}
}
	xmlhttp.send(null)
	return false;
}
    


   
