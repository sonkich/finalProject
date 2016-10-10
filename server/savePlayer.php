<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertPlayerSql = 'INSERT INTO user_stats
		(username, diamonds, food_q, drink_q, toys_q, food_lvl, cloth_lvl, points)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

$request = file_get_contents('php://input');
$request = json_decode($request, true);

if (!empty($request)) {
	$username = empty($request['username']) ? '' : $request['username'];
	$diamonds = empty($request['diamonds']) ? '' : $request['diamonds'];
	$foodQ = empty($request['food_q']) ? '' : $request['food_q'];
	$drinkQ = empty($request['drink_q']) ? '' : $request['drink_q'];
	$toysQ = empty($request['toys_q']) ? '' : $request['toys_q'];
	$foodLvl = empty($request['food_lvl']) ? '' : $request['food_lvl'];
	$clothLvl = empty($request['cloth_lvl']) ? '' : $request['cloth_lvl'];
	$points = empty($request['points']) ? '' : $request['points'];

	$player = [$username, $diamonds, $foodQ, $drinkQ, $toysQ, $foodLvl, $clothLvl, $points];

	$statement = $pdo->prepare($insertPlayerSql);

	$statement->execute($player);

	echo json_encode('Done');
}