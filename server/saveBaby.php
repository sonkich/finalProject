<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=final_project', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertBabySql = 'INSERT INTO baby_info 
		(parent, name, gender, food, drink, happiness, is_live) 
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
	$isLive = empty($request['is_live']) ? '' : $request['is_live'];

	$baby = [$parent, $name, $gender, $food, $drink, $happiness, $isLive];

	$statement = $pdo->prepare($insertBabySql);

	$statement->execute($baby);

	echo json_encode('Done');
}