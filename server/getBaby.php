<?php
const DB_USER = 'root';
const DB_PASS = '';

$pdo = new PDO('mysql:host=localhost;dbname=babyland', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$userName = empty($_POST['username']) ? '' : $_POST['username'];

$sth = $pdo->prepare("SELECT * FROM baby_info WHERE parent=:parent");
$sth->execute([':parent' => $userName]);

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);