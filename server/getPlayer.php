<?php
require_once 'dbconfig.php';

$userName = empty($_POST['username']) ? '' : $_POST['username'];

$sth = $pdo->prepare("SELECT * FROM user_stats WHERE username=:username");
$sth->execute([':username' => $userName]);

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);