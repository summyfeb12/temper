<?php
	// 6. Getting the parameters from the previous page, although we aren't doing anything with it as of now.
	
    $choice = $_GET['query'];
    $return_arrall = array();

	$con = mysql_connect("localhost","root","1234");
	if(!$con) die('General Connection Error!');									      
    mysql_select_db("hurricanes", $con);


    $query = "select * from pacific";
    $result = mysql_query($query);
	

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
    {
        array_push($return_arrall,array($row['hlat'],$row['hlon'],$row['hname']));
    }	 
        echo json_encode($return_arrall);
?>