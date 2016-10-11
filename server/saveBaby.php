<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertBabySql = 'INSERT INTO baby_info 
		(parent, name, gender, food, drink, happiness, is_alive) 
		VALUES (?, ?, ?, ?, ?, ?, ?)';

if (!empty($_POST)) {
	$parent = empty($_POST['parent']) ? '' : $_POST['parent'];
	$name = empty($_POST['name']) ? '' : $_POST['name'];
	$gender = empty($_POST['gender']) ? '' : $_POST['gender'];
	$food = empty($_POST['food']) ? '' : $_POST['food'];
	$drink = empty($_POST['drink']) ? '' : $_POST['drink'];
	$happiness = empty($_POST['happiness']) ? '' : $_POST['happiness'];
	$isAlive = empty($_POST['is_alive']) ? '' : $_POST['is_alive'];

	$baby = [$parent, $name, $gender, $food, $drink, $happiness, $isAlive];

	$statement = $pdo->prepare($insertBabySql);

	$statement->execute($baby);

	echo json_encode('Done');
}