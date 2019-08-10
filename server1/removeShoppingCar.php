<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");
$id = $_REQUEST["id"];
$sql = "DELETE FROM add2car  WHERE id='$id'";
mysqli_query($con, $sql);
?>