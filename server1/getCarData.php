<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");

$sql = "SELECT add2car.*,goodsdata.detail,goodsdata.srcB FROM add2car , goodsdata WHERE add2car.id = goodsdata.id";

$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>