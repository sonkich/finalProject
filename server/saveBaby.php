<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertBabySql = 'INSERT INTO baby_info 
		(parent, name, gender, food, drink, happiness, is_alive) 
		VALUES (?, ?, ?, ?, ?, ?, ?)';

$request = file_get_contents('php://input');
$request = json_decode($request, true);

if (!empty($request)) {
	$parent = empty($request['parent']) ? '' : $request['parent'];
	$name = empty($request['name']) ? '' : $request['name'];
	$gender = empty($request['gender']) ? '' : $request['gender'];
	$food = empty($request['food']) ? '' : $request['food'];
	$drink = empty($request['drink']) ? '' : $request['drink'];
	$happiness = empty($request['happiness']) ? '' : $request['happiness'];
	$isAlive = empty($request['is_alive']) ? '' : $request['is_alive'];

	$baby = [$parent, $name, $gender, $food, $drink, $happiness, $isAlive];

	$statement = $pdo->prepare($insertBabySql);

	$statement->execute($baby);

	echo json_encode('Done');
}