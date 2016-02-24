<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost", "root", "localroot", "db_school");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
// Escape user inputs for security
$area = mysqli_real_escape_string($link, $_POST['area']);
$room = mysqli_real_escape_string($link, $_POST['room']);
$professor = mysqli_real_escape_string($link, $_POST['professor']);
 
// attempt insert query execution
$sql = "INSERT INTO class (area, room_number, id_professor) VALUES ('$area', '$room', '$professor')";
if(mysqli_query($link, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 
// close connection
mysqli_close($link);
?>

<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		window.location.replace("database.php");
	});
</script>