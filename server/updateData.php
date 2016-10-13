<?php
require_once 'dbconfig.php';

//$userName = empty($_POST['username']) ? '' : $_POST['username'];

$sth = $pdo->prepare("SELECT food, drink, happiness, parent FROM baby_info");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < count($result); $i++) {
	$food = --$result[$i]['food'];
	$drink = --$result[$i]['drink'];
	$happiness = --$result[$i]['happiness'];
	$parent = $result[$i]['parent'];
	
	$newRow = $pdo->prepare('UPDATE baby_info SET food = :food, drink = :drink, happiness = :happiness 
			WHERE parent = :parent');
	$newRow->execute([':food' => $food, ':drink' => $drink, ':happiness' => $happiness, ':parent' => $parent]);
}
