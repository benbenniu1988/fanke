<?php

$con = mysqli_connect("127.0.0.1","root","","fanke");

$json = file_get_contents("qianggou.json");

$data = json_decode($json,true);
// var_dump($data);
// print_r($data);
for($i = 0; $i < count($data); $i++){
    $src = $data[$i]["src"];
    $title = $data[$i]["title"];
    $prcie1 = $data[$i]["price1"];
    $prcie2 = $data[$i]["price2"];
    $prcie3 = $data[$i]["price3"];
    $sql = "INSERT INTO `fanke`.`qianggou` (`id`, `src`, `title`, `price1`, `price2`, `price3`) VALUES ('$i', '$src', '$title', '$prcie1', '$prcie2', '$prcie3')";
    mysqli_query($con,$sql);
}
?>