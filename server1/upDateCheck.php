<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");

$id = $_REQUEST["id"];
$ischeck1 = $_REQUEST["ischeck"];
// echo "check1=".$ischeck1;

$sql = "SELECT * FROM  add2car WHERE id = '$id'";

$result = mysqli_query($con,$sql);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

$ischeck = $data[0]["ischeck"];

$updateSql ="UPDATE  `fanke`.`add2car` SET  `ischeck` =  '$ischeck1' WHERE  `add2car`.`id` =$id";

mysqli_query($con, $updateSql);

?>