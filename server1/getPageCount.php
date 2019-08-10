<?php
    # 先连接数据库
$con = mysqli_connect("127.0.0.1", "root", "", "fanke");


$sql = "SELECT * FROM goodsdata";
$result = mysqli_query($con, $sql);
$ListCount = mysqli_num_rows($result);

# 计算页码值(总共有多少页)
$count = 10;
$pageCount = ceil($ListCount / $count);

# JSON数据返回
$data = array("status"=>"success","msg"=>"获取成功","data"=>array("count"=> $pageCount));
echo json_encode($data, true);



?>