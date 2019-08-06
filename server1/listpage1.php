<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");

$page = $_REQUEST["page"] * 10;
$orderType = $_REQUEST["orderType"];
//   $sql = "SELECT * FROM `goodslist` order by `id` limit $page , 10";

// echo $page;
// echo $orderType;
if($orderType == 0)
{
  # 获取所有的商品信息
  $sql = "SELECT * FROM `goodslist` order by `id` limit $page , 10";
}else if($orderType == 2)
{
  $sql = "SELECT * FROM `goodslist` ORDER BY `goodslist`.`talk` DESC limit $page , 10";
}else if($orderType == 4)
{
  $sql = "SELECT * FROM `goodslist` ORDER BY `goodslist`.`price1` ASC limit $page , 10";
}



$result = mysqli_query($con,$sql);

$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);

?>