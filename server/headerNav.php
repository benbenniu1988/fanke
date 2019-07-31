<?php
$data = file_get_contents("headerNav.json");
// INSERT INTO `fankeheadernav`.`headernav` (`nav1`, `nav2`) VALUES ('qqqq', 'bbbb');
for($i=0;$i<count($data);$i++){
echo $data[$i];
};

?>