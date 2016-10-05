<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$request = file_get_contents('php://input');
$request = json_decode($request, true);

$userName = empty($request['username']) ? '' : $request['username'];

$sth = $pdo->prepare("SELECT username, diamonds, food_q, drink_q, toys_q, cloth_lvl, food_lvl
		FROM user_stats WHERE username='$userName'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);