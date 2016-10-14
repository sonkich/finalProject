<?php

 require_once 'dbconfig.php';


$response = [];

if(!empty($_POST)){
   $receiver = $_POST['receiver'];
   $sender = $_POST['sender'];

   $stmt = $pdo->prepare("DELETE FROM friend_requests WHERE receiver=:receiver AND sender=:sender");
   $stmt->execute(array(":receiver"=>$receiver,":sender"=>$sender));
   $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

   $response = $row;

}




echo json_encode($response);
