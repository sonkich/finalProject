<?php

 require_once 'dbconfig.php';


$response = [];




$stmt = $pdo->prepare("SELECT username,points FROM user_stats ORDER BY points DESC");
$stmt->execute();
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

$response = $row;



echo json_encode($response);
