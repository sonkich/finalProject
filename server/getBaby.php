<?php
require_once 'dbconfig.php';

$userName = empty($_POST['username']) ? '' : $_POST['username'];

$sth = $pdo->prepare("SELECT * FROM baby_info WHERE parent=:parent");
$sth->execute([':parent' => $userName]);

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);