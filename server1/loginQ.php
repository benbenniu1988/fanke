<?php
$username = $_REQUEST["username"];

$db = mysqli_connect("127.0.0.1", "root", "", "fanke");

$sql = "SELECT * FROM userlist WHERE username = '$username'";
$result = mysqli_query($db,$sql);
$data = array("status" => "", "msg" => "", "data" => "");

if(mysqli_num_rows($result) == "0")
{
  $data["status"] = "error";
  $data["msg"] = "登录失败：该用户不存在";
}else{
  $data["status"] = "success";
  $data["msg"] = "恭喜你，登录成功！";
}

echo json_encode($data, true);

?>