<?php

 require_once 'dbconfig.php';


$response = [];

if(!empty($_POST)){
   $username = $_POST['username'];

   $stmt = $pdo->prepare("SELECT username2 FROM friends WHERE username1=:username1");
   $stmt->execute(array(":username1"=>$username));
   $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

   $response = $row;
   
}




echo json_encode($response);
