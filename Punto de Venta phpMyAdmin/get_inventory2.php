<?php
include_once "conexion.php";

// Consulta SQL para obtener los datos del inventario
$sql = "SELECT id, nombre, precioVenta FROM inventario";
$result = $conexion->query($sql);

$inventario = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['precioVenta'] = (float) $row['precioVenta']; // Asegúrate de que el precioVenta se envíe como número
        $inventario[] = $row;
    }
} 

// Enviar los datos del inventario como respuesta
header("Content-Type: application/json");
echo json_encode($inventario);

// Cerrar la conexión
$conexion->close();
?>
