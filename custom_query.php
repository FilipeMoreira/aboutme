<?php 
	$servername = "localhost";
	$username = "root";
	$password = "localroot";
	$db = "db_school";

	$link = mysqli_connect($servername, $username, $password, $db);
	 
	// Check connection
	if($link === false){
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}else{
		$sql = "SELECT * FROM class WHERE room_number LIKE '%". $_GET['q'] ."%'";
		if($result = mysqli_query($link, $sql)){
		    if(mysqli_num_rows($result) > 0){
		        while($row = mysqli_fetch_array($result)){
		            echo "<tr>";
		                echo "<td><a href='someclass.php?id=". $row['id'] ."''>" . $row['id'] . "</a></td>";
		                echo "<td>" . $row['area'] . "</td>";
		                echo "<td>" . $row['room_number'] . "</td>";
		            echo "</tr>";
		        }
		        // Close result set
		        mysqli_free_result($result);
		    } else{
		        echo "No classes registered.";
		    }
		} else{
		    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
		}
	}

	// Close connection
	mysqli_close($link);
 ?>