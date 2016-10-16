<?php
require_once 'dbconfig.php';



$sth = $pdo->prepare("SELECT * FROM user_stats");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $key => $value) {
   $value['Resource'] = $value['food_q'] + $value['toys_q'] + $value['drink_q'];
}

echo json_encode($result);
