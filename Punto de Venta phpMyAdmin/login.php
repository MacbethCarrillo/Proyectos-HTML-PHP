<?php
include('conexion.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Consulta para verificar las credenciales
    $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Inicio de sesión exitoso
        header("Location: index.html");
        exit;
    } else {
        // Error en el inicio de sesión
        echo "Usuario o contraseña incorrectos";
    }

    $stmt->close();
}
$conexion->close();
?>
