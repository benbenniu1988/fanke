<?php
$con = mysqli_connect("127.0.0.1","root","","fanke");

$json = file_get_contents("listpage.json");

$data = json_decode($json,true);
var_dump($data);

for($i = 0; $i < count($data); $i++){
    $id = $data[$i]["id"];
    $title = $data[$i]["title"];
    $detail = $data[$i]["detail"];
    $talk = $data[$i]["talk"];
    $prcie1 = $data[$i]["price1"];
    $prcie2 = $data[$i]["price2"];
    $color = $data[$i]["color"];
    $srcB = $data[$i]["srcB"];
    $srcS1 = $data[$i]["srcS1"];
    $srcS2 = $data[$i]["srcS2"];
    $srcS3 = $data[$i]["srcS3"];
    $srcS4 = $data[$i]["srcS4"];
    $srcS5 = $data[$i]["srcS5"];

    $sql = "INSERT INTO `fanke`.`goodslist` (`id`, `title`, `detail`, `talk`, `price1`, `price2`, `color`, `srcB`, `srcS1`, `srcS2`, `srcS3`, `srcS4`, `srcS5`) VALUES ('$id', '$title', '$detail','$talk', '$prcie1', '$prcie2', '$color', '$srcB', '$srcS1', '$srcS2', '$srcS3', '$srcS4', '$srcS5')";

    mysqli_query($con,$sql);
}

?>