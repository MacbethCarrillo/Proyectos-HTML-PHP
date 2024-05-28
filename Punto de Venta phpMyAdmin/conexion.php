<?php
$server = "localhost";
$user = "root";
$pass = "";
$db = "pdv";  // Asegúrate de que el nombre de la base de datos es correcto

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die("Conexión Fallida: " . $conexion->connect_error);
}
?>
