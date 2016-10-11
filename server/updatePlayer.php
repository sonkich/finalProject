<?php
require_once 'dbconfig.php';

$sth = $pdo->prepare('UPDATE user_stats SET diamonds = :diamonds, food_q = :food_q, drink_q = :drink_q, 
		toys_q = :toys_q, cloth_lvl = :cloth_lvl, food_lvl = :food_lvl, points = :points 
		WHERE username = :username');

$username = empty($_POST['username']) ? '' : $_POST['username'];
$diamonds = empty($_POST['diamonds']) ? '' : $_POST['diamonds'];
$foodQ = empty($_POST['food_q']) ? '' : $_POST['food_q'];
$drinkQ = empty($_POST['drink_q']) ? '' : $_POST['drink_q'];
$toysQ = empty($_POST['toys_q']) ? '' : $_POST['toys_q'];
$clothLvl = empty($_POST['cloth_lvl']) ? '' : $_POST['cloth_lvl'];
$foodLvl = empty($_POST['food_lvl']) ? '' : $_POST['food_lvl'];
$points = empty($_POST['points']) ? '' : $_POST['points'];

$sth->execute([':diamonds' => $diamonds, ':food_q' => $foodQ, ':drink_q' => $drinkQ, ':toys_q' => $toysQ, 
 ':cloth_lvl' => $clothLvl, ':food_lvl' => $foodLvl, ':points' => $points,  ':username' => $username]);

echo json_encode('Done');