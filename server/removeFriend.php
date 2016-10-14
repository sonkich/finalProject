<?php

 require_once 'dbconfig.php';


$response = [];

if(!empty($_POST)){
   $username1 = $_POST['receiver'];
   $username2 = $_POST['sender'];

   $stmt = $pdo->prepare("DELETE FROM friends WHERE username1=:username1 AND username2=:username2");
   $stmt->execute(array(":username1"=>$username1,":username2"=>$username2));

   $stmt = $pdo->prepare("DELETE FROM friends WHERE username1=:username1 AND username2=:username2");
   $stmt->execute(array(":username1"=>$username2,":username2"=>$username1));

}




echo json_encode($response);
