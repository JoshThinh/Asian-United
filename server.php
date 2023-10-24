<?php
header("Content-Type: application/json");

$targetPosition = rand(1, 100);
$targetLine = str_repeat("-", $targetPosition - 1) . "X" . str_repeat("-", 100 - $targetPosition);

$response = [
    "targetPosition" => $targetPosition,
    "targetLine" => $targetLine,
];

echo json_encode($response);
?>
