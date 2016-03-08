<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost", "root", "localroot", "db_school");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
// Escape user inputs for security
$student_id = mysqli_real_escape_string($link, $_POST['s']);
$class_id = mysqli_real_escape_string($link, $_POST['c']);
 
// attempt insert query execution
$sql = "DELETE FROM student_class WHERE s_id = $student_id AND c_id = $class_id";
if(mysqli_query($link, $sql)){
    echo "OK";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 
// close connection
mysqli_close($link);
?>