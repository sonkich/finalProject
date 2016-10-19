<?php

 require_once 'dbconfig.php';


$response = [];

if(!empty($_POST)){
   $receiver = $_POST['receiver'];
   $sender = $_POST['sender'];

   $stmt = $pdo->prepare("DELETE FROM friend_requests WHERE receiver=:receiver AND sender=:sender");
   $stmt->execute(array(":receiver"=>$receiver,":sender"=>$sender));
   $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

   $stmt = $pdo->prepare("SELECT * FROM friends WHERE username1=:username1 AND username2=:username2");
   $stmt->execute(array(":username1"=>$sender,":username2"=>$receiver));
   $count = $stmt->rowCount();

   if($count == 0){
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






}




echo json_encode($response);
