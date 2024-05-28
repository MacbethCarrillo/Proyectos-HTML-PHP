<?php
include_once "conexion.php";

// Recibir los datos del cliente
$data = json_decode(file_get_contents("php://input"));

$id_producto = $data->id_producto;
$nombre_producto = $data->nombre_producto;
$precio_venta = $data->precio_venta;
$cantidad = $data->cantidad;

// Calcular la cantidad total del precio de venta
$cantidad_total = $precio_venta * $cantidad;

// Insertar la venta en la base de datos
$sql = "INSERT INTO ventas (id_producto, nombre_producto, precio_venta, cantidad, cantidadTotal) VALUES (?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("isdsd", $id_producto, $nombre_producto, $precio_venta, $cantidad, $cantidad_total);
$result = $stmt->execute();

if ($result) {
    $response = array("success" => true, "message" => "Venta realizada correctamente");
} else {
    $response = array("success" => false, "message" => "Error al realizar la venta: " . $stmt->error);
}

// Enviar la respuesta al cliente
header("Content-Type: application/json");
echo json_encode($response);

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
