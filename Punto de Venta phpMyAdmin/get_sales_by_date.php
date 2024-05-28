<?php
include_once "conexion.php";

$fecha = $_GET['fecha'];

// Consultar las ventas para la fecha seleccionada
$sql = "SELECT * FROM ventas WHERE DATE(fecha) = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $fecha);
$stmt->execute();
$result = $stmt->get_result();

$ventas = [];
while ($row = $result->fetch_assoc()) {
    $ventas[] = $row;
}

// Enviar la respuesta al cliente
header("Content-Type: application/json");
echo json_encode($ventas);

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
