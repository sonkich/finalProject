<?php

require_once 'dbconfig.php';

$errors = [];
$response = [];


if(!empty($_POST)){


   $username = $_POST['username'];
   $password = $_POST['password'];
   $password2 = $_POST['password2'];
   $email = $_POST['email'];





   $stmt = $pdo->prepare("SELECT * FROM users WHERE username=:username");
   $stmt->execute(array(":username"=>$username));
   $count = $stmt->rowCount();
   if($count == 0){
      $check = securityCheck($username , $password , $password2 , $email , $errors);
      if($check){
         $stmt = $pdo->prepare("INSERT INTO users(username,email,password)
                                      VALUES(:username, :email, :password)");
         $stmt->bindParam(":username",$username);
         $stmt->bindParam(":email",$email);
         $stmt->bindParam(":password",$password);

         $stmt->execute();

         $stmt = $pdo->prepare("INSERT INTO user_stats(username)
                                      VALUES(:username)");
         $stmt->bindParam(":username",$username);
         $stmt->execute();

      }
   }else{
        $errors['username'] = "User name already exists";
   }



}

$response['errors'] = $errors;

echo json_encode($response);

function securityCheck($username,$password,$password2,$email,&$errors){
   if(strlen($username) < 4){
      $errors['username'] = "Username must be at least 4 characters";
   }
   if(strlen($password) < 6 || strlen($password) > 20){
      $errors['password'] = "Password must be between 6 and 20 characters";
   }
   if($password != $password2){
      $errors['password2'] = "Password does not match the confirm password";
   }
   if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      $errors['email'] = "Enter valid email address";
   }

   if(count($errors) == 0){
      return true;
   }
   return false;
}
