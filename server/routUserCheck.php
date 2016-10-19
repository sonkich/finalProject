<?php
require_once 'dbconfig.php';

$errors = [];
$response = [];
$flag = false;

if(!empty($_POST)){


	$name = $_POST['username'];

	$stmt = $pdo->prepare("SELECT * FROM users WHERE username=:username");
	$stmt->execute(array(":username"=>$name));
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	$count = $stmt->rowCount();

	if($count == 0){
		$flag = false;
	}else{
		$flag = true;
	}
}
echo json_encode($flag);
