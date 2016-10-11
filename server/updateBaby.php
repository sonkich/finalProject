<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('UPDATE baby_info SET name = :name, gender = :gender, food = :food, drink = :drink,
		happiness = :happiness, is_alive = :is_alive WHERE parent = :parent');

$parent = empty($_POST['parent']) ? '' : $_POST['parent'];
$name = empty($_POST['name']) ? '' : $_POST['name'];
$gender = empty($_POST['gender']) ? '' : $_POST['gender'];
$food = empty($_POST['food']) ? '' : $_POST['food'];
$drink = empty($_POST['drink']) ? '' : $_POST['drink'];
$happiness = empty($_POST['happiness']) ? '' : $_POST['happiness'];
$isAlive = empty($_POST['is_alive']) ? '' : $_POST['is_alive'];


$sth->execute([':name' => $name, ':gender' => $gender, ':food' => $food, ':drink' => $drink,
		':happiness' => $happiness, ':is_alive' => $isAlive, ':parent' => $parent]);

echo json_encode('Done');