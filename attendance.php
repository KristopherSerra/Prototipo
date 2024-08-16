<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['loggedin'])) {
    header("Location: index.html");
    exit;
}

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
    $name = $_POST['name'];
    $status = $_POST['status'];

    // Insertar registro de asistencia
    $sql = "INSERT INTO asistencia (nombre, estado, fecha) VALUES ('$name', '$status', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "Asistencia registrada con éxito";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
