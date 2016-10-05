<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=final_project', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('UPDATE baby_info SET name = :name, gender = :gender, food = :food, drink = :drink,
		happiness = :happiness, is_live = :is_live WHERE parent = :parent');

$request = file_get_contents('php://input');
$request = json_decode($request, true);

$parent = empty($request['parent']) ? '' : $request['parent'];
$name = empty($request['name']) ? '' : $request['name'];
$gender = empty($request['gender']) ? '' : $request['gender'];
$food = empty($request['food']) ? '' : $request['food'];
$drink = empty($request['drink']) ? '' : $request['drink'];
$happiness = empty($request['happiness']) ? '' : $request['happiness'];
$isLive = empty($request['is_live']) ? '' : $request['is_live'];

$sth->execute([':name' => $name, ':gender' => $gender, ':food' => $food, ':drink' => $drink,
		':happiness' => $happiness, ':is_live' => $isLive, ':parent' => $parent]);

echo json_encode('Done');