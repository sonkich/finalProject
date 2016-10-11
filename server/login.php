<?php

 require_once 'dbconfig.php';

$errors = [];
$response = [];

if(!empty($_POST)){


   $name = $_POST['username'];
   $pas = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username=:username");
    $stmt->execute(array(":username"=>$name));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = $stmt->rowCount();

    if($count == 0){
      $errors[] = "wrong name";
   }else{
      if($pas == $row['password']){
         $response["username"] = $name;

         $st = $pdo->prepare("SELECT is_alive FROM baby_info WHERE parent=:parent");
         $st->execute(array(":parent"=>$name));
         $data = $st->fetch(PDO::FETCH_ASSOC);
         var_dump($data);
         $response["isAlive"] = $data['is_alive'];

      }else{
         $errors[] = "password incorect";
      }
   }
}
if(count($errors) != 0){

   $response[] = $errors;
}
echo json_encode($response);
