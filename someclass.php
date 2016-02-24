<?php 
	include "header.php";
 ?>

 <?php 
 	$class_id = $_GET['id'];
  ?>
<section class='container displaced'>
	<div class='row'>
		<div class='col-md-8'>
			<h2>Class: <span id="class_id"><?php echo $class_id ?></span></h2>

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
				$sql = "SELECT class.area, room_number, p_name FROM class LEFT JOIN (professor) ON (class.id_professor=professor.id) where class.id = ".$class_id;
				if($result = mysqli_query($link, $sql)){
				    if(mysqli_num_rows($result) > 0){
				        while($row = mysqli_fetch_array($result)){
				        	echo "<h3>Area: ". $row['area'] ."</h3>";
				        	echo "<h3>Professor: ". $row['p_name'] ."</h3>";
				        	echo "<h4>Room #: ". $row['room_number'] ."</h4>";
				        }
				        echo "</table>";
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
			<hr>
			<h4>Students in this class:</h4>
			<ul class="list-group" id="students_list">
				<?php 
				$sql = "SELECT c_id, s_id, s_name FROM student_class LEFT JOIN (student) ON (student_class.s_id=student.id) where student_class.c_id = ".$class_id;
				if($result = mysqli_query($link, $sql)){
				    if(mysqli_num_rows($result) > 0){
				        while($row = mysqli_fetch_array($result)){
				        	echo "<li class='list-group-item'>". $row['s_name'] ."</li>";
				        }
				        // Close result set
				        mysqli_free_result($result);
				    } else{
				        echo "<span id='no_students'>No students registered for this class yet.</span>";
				    }
				} else{
				    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
				}
				 ?>
			</ul>
		</div>
		<div class='col-md-4'>
			<h3>Register students for this class</h3>
			<ul class="list-group scrollable" id="students_list">
				<?php 
				$sql = "SELECT id, s_name FROM student";
				if($result = mysqli_query($link, $sql)){
				    if(mysqli_num_rows($result) > 0){
				        while($row = mysqli_fetch_array($result)){
				        	echo "<li class='list-group-item r_student' id='". $row['id'] ."'>". $row['s_name'] ."</li>";
				        }
				        // Close result set
				        mysqli_free_result($result);
				    } else{
				        echo "No students registered yet.";
				    }
				} else{
				    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
				}
				 
				// Close connection
				mysqli_close($link);
				 ?>
			</ul>
		</div>
	</div>

	<script type="text/javascript">
		$(document).ready(function(){
			$("#database-link").css({"color":"#fff", "text-shadow":"0 0 7px rgba(255,255,255,0.8)"});
			$(".r_student").click(function(event){
				var id = event.currentTarget.attributes.id.value;
				var name = event.currentTarget.textContent;
				var class_id = document.getElementById("class_id").innerText;

				$.ajax({
					method: "POST",
					url: "insert_student.php",
					data: { s: id, c: class_id }
				}).done(function( info ) {
					if(info=="OK"){
						document.getElementById("students_list").innerHTML = document.getElementById("students_list").innerHTML + "<li class='list-group-item'>"+ name +"</li>";
						if($("#no_students")){
							$("#no_students").remove();
						}
					}
				});
			});
		});
	</script>

</section>

 <?php 
 	include "footer.php";
  ?>