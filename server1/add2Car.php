<?php
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");

$id = $_REQUEST["id"];
$price = $_REQUEST["price"];
$size = $_REQUEST["size"];
$num = $_REQUEST["num"];

$sql = "SELECT * FROM  add2car WHERE id = '$id'";
$result = mysqli_query($con,$sql);
$row = mysqli_num_rows($result);
// ($row);

if($row == 0)
{  

 $insetSql ="INSERT INTO `fanke`.`add2car` (`carid`, `id`, `price`, `size`, `num`, `total`, `ischeck`) VALUES (NULL, '$id', '$price', '$size', $num, '$price', 1)";
   mysqli_query($con,$insetSql);

}elseif($row == 1){

   /* 002-购物车中已经存在该商品  更新数据 */
   $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
   $num = $data[0]["num"] + 1;
   $total = $data[0]["price"] * $num;

   /* 更新 */
   $updateSql = "UPDATE add2car SET num='$num',total='$total' WHERE id= '$id'";
   mysqli_query($con, $updateSql);

   $updateTotal ="SELECT SUM(total) FROM add2car";
   $result1 = mysqli_query($con, $updateTotal);
   $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
   $totalP = $data1[0]["SUM(total)"];
// print_r($totalP);
}

$totalCount = "SELECT * FROM  add2car";
$result = mysqli_query($con, $totalCount);
$row = mysqli_num_rows($result);
$json = array("totalRow"=>$row,"totalPrice"=>$totalP);

// echo '{"totalRow":'.$data1.'}';
// $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
echo json_encode($json, true);

?>