<?php
// Incluir el archivo de conexión
include_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $id = $_POST['product-id'];
    $nombre = $_POST['product-name'];
    $precioCompra = $_POST['product-price'];
    $precioVenta = $_POST['product-sale'];
    $inventarioInicial = $_POST['product-inventory'];
    $stock = $_POST['product-stock'];

    // Consulta SQL para verificar si el ID o el nombre ya están registrados
    $sql_check = "SELECT id, nombre FROM inventario WHERE id = '$id' OR nombre = '$nombre'";
    $result_check = $conexion->query($sql_check);

    if ($result_check->num_rows > 0) {
        $row = $result_check->fetch_assoc();
        // Verificar si el ID o el nombre del producto ya existen
        if ($row['id'] == $id) {
            // El ID del producto ya está registrado, envía un mensaje de error
            http_response_code(400); // Bad request
            echo "Error: El ID del producto ya está registrado";
            exit(); // Termina la ejecución del script
        } elseif ($row['nombre'] == $nombre) {
            // El nombre del producto ya está registrado, envía un mensaje de error
            http_response_code(400); // Bad request
            echo "Error: El nombre del producto ya está registrado";
            exit(); // Termina la ejecución del script
        }
    } else {
        // Ningún conflicto encontrado, procede con la inserción en la base de datos
        $sql_insert = "INSERT INTO inventario (id, nombre, precioCompra, precioVenta, inventarioInicial, stock) 
                        VALUES ('$id', '$nombre', '$precioCompra', '$precioVenta', '$inventarioInicial', '$stock')";

        if ($conexion->query($sql_insert) === TRUE) {
            // Éxito, no se necesita hacer nada más
            exit();
        } else {
            echo "Error al registrar el producto: " . $conexion->error;
        }
    }
}
?>
