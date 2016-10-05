<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('UPDATE user_stats SET diamonds = :diamonds, food_q = :food_q, drink_q = :drink_q, 
		toys_q = :toys_q, cloth_lvl = :cloth_lvl, food_lvl = :food_lvl WHERE username = :username');

$request = file_get_contents('php://input');
$request = json_decode($request, true);

$username = empty($request['username']) ? '' : $request['username'];
$diamonds = empty($request['diamonds']) ? '' : $request['diamonds'];
$foodQ = empty($request['food_q']) ? '' : $request['food_q'];
$drinkQ = empty($request['drink_q']) ? '' : $request['drink_q'];
$toysQ = empty($request['toys_q']) ? '' : $request['toys_q'];
$clothLvl = empty($request['cloth_lvl']) ? '' : $request['cloth_lvl'];
$foodLvl = empty($request['food_lvl']) ? '' : $request['food_lvl'];

$sth->execute([':diamonds' => $diamonds, ':food_q' => $foodQ, ':drink_q' => $drinkQ, ':toys_q' => $toysQ, 
		':cloth_lvl' => $clothLvl, ':food_lvl' => $foodLvl, ':username' => $username]);

echo json_encode('Done');