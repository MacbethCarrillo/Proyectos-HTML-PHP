<?php

//ESTE ES PARA VER EL INVENTARIO EN LA TABLA EN EL SISTEMA DE INVENTARIO
include_once "conexion.php";

$conn = new mysqli($server, $user, $pass, $db); 

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id, nombre, precioCompra, precioVenta, inventarioInicial, stock FROM inventario";
$result = $conn->query($sql);

$productos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
} 

echo json_encode($productos);

$conn->close();
?>
