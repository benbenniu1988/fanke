<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");

$sql = "SELECT * FROM qianggou";
$result = mysqli_query($con, $sql);
// $ListCount = mysqli_num_rows($result);

$data = array("status"=>"success","msg"=>"获取成功","data"=>mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);

?>