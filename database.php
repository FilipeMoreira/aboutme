<?php 
	include "header.php";
 ?>
<section class='container displaced'>


<div class='container fluid'>
	<div class='row'>
		<div class='col-md-8'>
			<center><h2>Classes registered in Database</h2></center>
			<div class='form-group'>
				<input id='query' class='form-control' name='q' placeholder='Search for class by room'>
			</div>
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
	$sql = "SELECT * FROM class";
	if($result = mysqli_query($link, $sql)){
	    if(mysqli_num_rows($result) > 0){
	        echo "<table class='table table-striped table-hover'><thead>";
	            echo "<tr>";
	                echo "<th>id</th>";
	                echo "<th>Area of Knowledge</th>";
	                echo "<th>Room #</th>";
	            echo "</tr></thead><tbody id='class_table'>";
	        while($row = mysqli_fetch_array($result)){
	            echo "<tr>";
	                echo "<td><a href='someclass.php?id=". $row['id'] ."''>" . $row['id'] . "</a></td>";
	                echo "<td>" . $row['area'] . "</td>";
	                echo "<td>" . $row['room_number'] . "</td>";
	            echo "</tr>";
	        }
	        echo "</tbody></table>";
	        // Close result set
	        mysqli_free_result($result);
	    } else{
	        echo "No classes registered.";
	    }
	} else{
	    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
	}
	 
}
?>
		</div>
		<div class='col-md-4'>
			<center><h2>Insert new Class</h2></center>
			<form method="post" action='insert.php'>
				<div class='form-group'>
					<input type='text' class='form-control' placeholder='Area of Knowledge' name='area'>
				</div>
				<div class='form-group'>
					<input type='text' class='form-control' placeholder='Room Number' name='room'>
				</div>
				<select class='form-control' name='professor'>
					<?php 
						$sql = "SELECT id, p_name FROM professor";
						if($result = mysqli_query($link, $sql)){
						    if(mysqli_num_rows($result) > 0){
						        while($row = mysqli_fetch_array($result)){
						            echo "<option value='". $row['id']."'>".$row['p_name']."</option>";
						        }
						        // Close result set
						        mysqli_free_result($result);
						    } else{
						        echo "No classes registered.";
						    }
						} else{
						    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
						}

						// Close connection
						mysqli_close($link);
					 ?>
				</select><br>
				<center><input type='submit' class='btn btn-lg btn-success'></center>
			</form>
			<hr>
			<h4>RSS-Feed</h4>
			<select onchange="showRSS(this.value)" class='form-control'>
				<option value="">Select an RSS-feed:</option>
				<option value="Google">Google News</option>
				<option value="NBC">NBC News</option>
			</select><br>
			<div id="rssOutput" class='rss-pannel'></div>
		</div>
	</div>
</div>
</section>
<script type="text/javascript">
	$(document).ready(function(){
		$("#database-link").css({"color":"#fff", "text-shadow":"0 0 7px rgba(255,255,255,0.8)"});

		$("#query").keyup(function(){
			$.ajax({
				method: "GET",
				url: "custom_query.php",
				data: { q: $("#query").val() }
			}).done(function( info ) {
				console.log("OLAR "+info);
				document.getElementById("class_table").innerHTML = info;
				console.log($(document).height()-($("#footer").offset().top+256));
				if($(document).height()-($("#footer").offset().top+256)>0){
					$("#footer").css("height",($(document).height()-($("#footer").offset().top))+"px");
				}
			});
		});
	});

	//RSS-Feed function from W3Schools
	function showRSS(str) { //Declaring function
	  if (str.length==0) {  //Checking str length because default value on the select input has empty value
	    document.getElementById("rssOutput").innerHTML=""; // in case value is empty no feed should be loaded and so the area is cleared
	    return; // end the function with a return so none of the further instructions will be executed
	  }
	  if (window.XMLHttpRequest) { //tests for browser
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest(); //instantiates new ajax request for IE7+, Firefox, Chrome, Opera or Safari
	  } else {  // code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); //does the same in case it's IE6 or IE5
	  }
	  xmlhttp.onreadystatechange=function() { //defines callback for when the readystate changes
	    if (xmlhttp.readyState==4 && xmlhttp.status==200) { //if the request is finished and response is ready (code 4) and the status is successful (OK code 200) then proceeds to the code inside this if statement
	      document.getElementById("rssOutput").innerHTML=xmlhttp.responseText; //updates the rss-feed desired area with the contents of the response
	    }
	  }
	  xmlhttp.open("GET","getrss.php?q="+str,true); //opens an asynchronous GET requisition to getrss.php with a q parameter for the selected feed 
	  xmlhttp.send(); //performs the requisition
	}
</script>
<?php 
	include "footer.php";
 ?>