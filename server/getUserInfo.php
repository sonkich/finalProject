<?php

require_once 'dbconfig.php';


$response = [];


if(!empty($_POST)){


   $name = $_POST['username'];

      $st = $pdo->prepare("SELECT is_alive FROM baby_info WHERE parent=:parent");
      $st->execute(array(":parent"=>$name));
      $data = $st->fetch(PDO::FETCH_ASSOC);
      $response["isAlive"] = (($data['is_alive'] == 1) || ($data['is_alive']==0))? $data['is_alive'] : -1;

}



echo json_encode($response);
