<?php
    $username = "root"; 
    $password = "";   
    $host = "localhost";
    $database="hurricanes";
    
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);

    $myquery = "select substr(hid,5) AS year,count(hid) AS noh,substr(hid,1,2) AS type from Summary where hid like 'AL%' group by substr(hid,5)
UNION
select substr(hid,5) AS year,count(hid) AS noh,substr(hid,2,1) AS type from Summary where hid like 'CP%' OR hid like 'EP%' group by substr(hid,5)";
    $query = mysql_query($myquery);
    
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $data = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($data);     
     
    mysql_close($server);
?>