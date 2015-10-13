<?php
	// 6. Getting the parameters from the previous page, although we aren't doing anything with it as of now.
	$_GET['query'];

	// 7. Building sample array to return.
	$return_arrlat = array();
    $return_arrlon = array();
    $return_arrall=array();

	// 8. PHP connection strings to establish connection to the remote DB.
	$con = mysql_connect("sql5.freemysqlhosting.net","sql592844","mC1*fB9%");
	if(!$con) die('General Connection Error!');									      
    mysql_select_db("sql592844", $con);

    // 9. Querying the DB. We can mix and match queries by using the variables from $_GET above.
    $query = "select hlon,hlat from pacific ";
    $result = mysql_query($query);

    // 10. Fetch the rows separately from the query return.
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
    {
    	 
        //$return_arr = 
        //$row_array = $row['hid'];)

    	 // 11. Pushing all rows to one array so that we can convert it to JSON
         array_push($return_arrlon,$row['hlon']);
         array_push($return_arrlat,$row['hlat']);
    }    
        array_push($return_arrall,$return_arrlat);
        array_push($return_arrall,$return_arrlon);
        echo json_encode($return_arrall);
        
    
    // 12. Encoding the array to JSON and return the data.
    //echo json_encode($return_arr);
//mysql_close($con);
?>