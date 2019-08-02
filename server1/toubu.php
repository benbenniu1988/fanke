<?php

$data = file_get_contents("toubu.json");
echo $data;
mysql_connect("127.0.0.1","root","","fankeheadernav");

$data = json_decode($data,true);
for($i=0; $i < count($data); $i++){
    // var_dump($data[$i]["nav1"]);
    "INSERT INTO headernav (nav1, nav2, nav3) VALUES ($data[$i]['nav1'], $data[$i]['nav2'], $data[$i]['nav3'])";

}

?>