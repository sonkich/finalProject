<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=final_project', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$request = file_get_contents('php://input');
$request = json_decode($request, true);

$userName = empty($request['username']) ? '' : $request['username'];

$sth = $pdo->prepare("SELECT parent, points, food_q, drink_q, toys_q
		FROM baby_info WHERE parent='$userName'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);