<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=final_project', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('UPDATE baby_info SET points = :points, food_q = :food_q, drink_q = :drink_q, 
		toys_q = :toys_q WHERE parent = :parent');

$request = file_get_contents('php://input');
$request = json_decode($request, true);

$parent = empty($request['parent']) ? '' : $request['parent'];
$points = empty($request['points']) ? '' : $request['points'];
$foodQ = empty($request['food_q']) ? '' : $request['food_q'];
$drinkQ = empty($request['drink_q']) ? '' : $request['drink_q'];
$toysQ = empty($request['toys_q']) ? '' : $request['toys_q'];

$sth->execute([':points' => $points, ':food_q' => $foodQ, ':drink_q' => $drinkQ, ':toys_q' => $toysQ, 
		':parent' => $parent]);

echo json_encode('Done');