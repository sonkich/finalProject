<?php

require_once 'dbconfig.php';

$errors['error'] = [];



if(!empty($_POST)){


   $sender = $_POST['sender'];
   $receiver = $_POST['receiver'];


   $stmt = $pdo->prepare("SELECT * FROM friends WHERE username1=:username1 AND username2=:username2");
   $stmt->execute(array(":username1"=>$sender,":username2"=>$receiver));
   $count = $stmt->rowCount();


   if($count == 0){

      $stmt = $pdo->prepare("SELECT * FROM friend_requests WHERE sender=:sender AND receiver=:receiver");
      $stmt->execute(array(":sender"=>$sender,":receiver"=>$receiver));
      $count = $stmt->rowCount();
      if($count == 0){


            $stmt = $pdo->prepare("INSERT INTO friend_requests(receiver,sender)
                                         VALUES(:receiver, :sender)");
            $stmt->bindParam(":receiver",$receiver);
            $stmt->bindParam(":sender",$sender);
            $stmt->execute();



      }else{
           $errors['error'] = "You already have a pending request to this person";
      }
   }else{
      $errors['error'] = "You have $receiver in your friend list";
   }







}



echo json_encode($errors);
