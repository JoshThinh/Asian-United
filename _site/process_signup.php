<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Perform necessary operations, such as storing data in a database

    // Redirect the user to a confirmation page
    header("Location: confirmation.php");
    exit();
}
?>
