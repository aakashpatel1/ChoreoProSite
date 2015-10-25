<html>
	<head>
		<title>Hello World Site</title>
	</head>
	<body>
		<?php
			$servername = "choreopro.clbrgrz25yri.us-west-2.rds.amazonaws.com";
			$username = "master";
			$password = "mastersmu123";
			$dbname = "HelloWorld";

			// Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
				die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM test_data";
			$result = $conn->query($sql);

			if ($result->num_rows > 0) {
				// output data of each row
				while($row = $result->fetch_assoc()) {
					echo $row["data"]. "<br>";
				}
			} else {
				echo "Query is not working!";
			}
		?>
	</body>
</html>