<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");

$id = $_REQUEST["querryID"];

$sql = "SELECT * FROM  `goodsdata` WHERE  `id` = $id";

$result = mysqli_query($con,$sql);

$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);

?>