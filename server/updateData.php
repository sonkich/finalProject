<?php
require_once 'dbconfig.php';

//$userName = empty($_POST['username']) ? '' : $_POST['username'];

$sth = $pdo->prepare("SELECT food, drink, happiness, parent FROM baby_info");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < count($result); $i++) {
	if ($result[$i]['food'] > 0) {
		$food = --$result[$i]['food'];
	} else {
		$food = 0;
	}
	
	if ($result[$i]['drink'] > 0) {
		$drink = --$result[$i]['drink'];
	} else {
		$drink = 0;
	}
	
	if ($result[$i]['happiness'] > 0) {
		$happiness = --$result[$i]['happiness'];
	} else {
		$happiness = 0;
	}
	
	if ($food == 0 && $drink == 0 && $happiness == 0) {
		$isAlive = 0;
	} else {
		$isAlive = 1;
	}
	
	$parent = $result[$i]['parent'];
	
	$newRow = $pdo->prepare('UPDATE baby_info SET food = :food, drink = :drink, happiness = :happiness, 
			is_alive = :is_alive WHERE parent = :parent');
	$newRow->execute([':food' => $food, ':drink' => $drink, ':happiness' => $happiness, 
			':is_alive' => $isAlive, ':parent' => $parent]);
}
