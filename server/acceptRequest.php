<?php

 require_once 'dbconfig.php';


$response = [];

if(!empty($_POST)){
   $receiver = $_POST['receiver'];
   $sender = $_POST['sender'];

   $stmt = $pdo->prepare("DELETE FROM friend_requests WHERE receiver=:receiver AND sender=:sender");
   $stmt->execute(array(":receiver"=>$receiver,":sender"=>$sender));
   $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

   $stmt = $pdo->prepare("INSERT INTO friends(username1,username2)
                                VALUES(:username1, :username2)");
   $stmt->bindParam(":username1",$receiver);
   $stmt->bindParam(":username2",$sender);
   $stmt->execute();

   $stmt = $pdo->prepare("INSERT INTO friends(username1,username2)
                                VALUES(:username1, :username2)");
   $stmt->bindParam(":username1",$sender);
   $stmt->bindParam(":username2",$receiver);
   $stmt->execute();




}




echo json_encode($response);
