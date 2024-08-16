<?php
session_start();

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "asistencia";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Verificar credenciales
    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $email;
        header("Location: dashboard.html");
    } else {
        echo "Credenciales inválidas";
    }
}

$conn->close();
?>