<?php
include_once "conexion.php";

// Consulta SQL para obtener los datos de venta
$sql = "SELECT id_producto, nombre_producto, precio_venta, cantidad, cantidadTotal FROM ventas";
$result = $conexion->query($sql);

$ventas = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ventas[] = $row;
    }
} 

// Enviar los datos de venta como respuesta
header("Content-Type: application/json");
echo json_encode($ventas);

// Cerrar la conexión
$conexion->close();
?>
