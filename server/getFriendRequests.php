<?php

 require_once 'dbconfig.php';


$response = [];

if(!empty($_POST)){
   $username = $_POST['username'];

   $stmt = $pdo->prepare("SELECT sender FROM friend_requests WHERE receiver=:receiver");
   $stmt->execute(array(":receiver"=>$username));
   $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

   $response = $row;

}




echo json_encode($response);
