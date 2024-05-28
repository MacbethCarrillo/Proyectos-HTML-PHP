<?php
//HACE QUE SE ELIMINE EL PRODCUTO DE INVENTARIO CON EL BOTON ELIMINAR 
include_once "conexion.php";

// Obtener el ID del producto a eliminar desde la solicitud POST
$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;

    // Consulta SQL para eliminar el producto
    $sql_delete = "DELETE FROM inventario WHERE id = '$id'";

    if ($conexion->query($sql_delete) === TRUE) {
        // Éxito, enviar respuesta con código 200 (OK)
        http_response_code(200);
        echo "Producto eliminado con éxito";
    } else {
        // Error al eliminar el producto, enviar respuesta con código 500 (Internal Server Error)
        http_response_code(500);
        echo "Error al eliminar el producto: " . $conexion->error;
    }
} else {
    // No se proporcionó el ID del producto, enviar respuesta con código 400 (Bad Request)
    http_response_code(400);
    echo "Error: ID del producto no proporcionado";
}
?>
