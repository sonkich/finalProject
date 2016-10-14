<?php

 require_once 'dbconfig.php';

$errors = [];
$response = [];
$flag = false;

if(!empty($_POST)){


   $name = $_POST['username'];
   $pas = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username=:username");
    $stmt->execute(array(":username"=>$name));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = $stmt->rowCount();

    if($count == 0){
      $flag = true;
   }else{
      if($pas == $row['password']){
         $response["username"] = $name;
      }else{
         $flag = true;
      }
   }
}

   if($flag){
      $response['error'] = "Wrong username or password";
   }

echo json_encode($response);
