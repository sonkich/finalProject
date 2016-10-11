<?php
require_once 'dbconfig.php';

$insertPlayerSql = 'INSERT INTO user_stats
		(username, diamonds, food_q, drink_q, toys_q, food_lvl, cloth_lvl, points)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

if (!empty($_POST)) {
	$username = empty($_POST['username']) ? '' : $_POST['username'];
	$diamonds = empty($_POST['diamonds']) ? '' : $_POST['diamonds'];
	$foodQ = empty($_POST['food_q']) ? '' : $_POST['food_q'];
	$drinkQ = empty($_POST['drink_q']) ? '' : $_POST['drink_q'];
	$toysQ = empty($_POST['toys_q']) ? '' : $_POST['toys_q'];
	$foodLvl = empty($_POST['food_lvl']) ? '' : $_POST['food_lvl'];
	$clothLvl = empty($_POST['cloth_lvl']) ? '' : $_POST['cloth_lvl'];
	$points = empty($_POST['points']) ? '' : $_POST['points'];

	$player = [$username, $diamonds, $foodQ, $drinkQ, $toysQ, $foodLvl, $clothLvl, $points];

	$statement = $pdo->prepare($insertPlayerSql);

	$statement->execute($player);

	echo json_encode('Done');
}