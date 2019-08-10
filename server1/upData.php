<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");
$id = $_REQUEST["id"];
$num = $_REQUEST["num"];

$sql = "SELECT * FROM  add2car WHERE id = '$id'";

$result = mysqli_query($con,$sql);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
$num = $data[0]["num"] - 1;
$total = $data[0]["price"] * $num;





$updateSql = "UPDATE add2car SET num='$num',total='$total' WHERE id= '$id'";

mysqli_query($con, $updateSql);



?>