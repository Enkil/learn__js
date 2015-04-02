<?php
$draft = htmlentities( trim($_POST['message']) );

/*
This is where you could take the message store it in a database or file. 
*/

$thedate =  date('l jS \of F Y h:i:s A');

$str = array('time'=> $thedate, 'message'=> $draft);

echo json_encode($str); // json_encode() is a PHP5 feature, so will not work on PHP4 and below.

?>