// Función para redireccionar al salir
function redireccionar() {
    window.location.href = 'login.html'; // Redireccionar al login.html
}

// Agregar evento de clic al botón "Salir"
document.getElementById('salir').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    // Mostrar ventana de confirmación
    if (confirm('¿Estás seguro de que deseas salir de la página?')) {
        redireccionar(); // Si el usuario confirma, redireccionar
    }
});

let productos = [];
let carrito = {};

function handleSearch(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('productInput');
        const nombreProducto = input.value.trim();
        console.log('Buscando producto:', nombreProducto); // Verifica el nombre del producto aquí
        if (nombreProducto) {
            const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
            if (producto) {
                console.log('Producto encontrado:', producto); // Verifica el producto encontrado
                agregarProductoAlCarrito(producto);
                input.value = '';
            } else {
                alert('Producto no encontrado');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('get_inventory2.php')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de inventario recibidos:', data); // Verifica los datos aquí
            productos = data;
        })
        .catch(error => console.error('Error al cargar inventario:', error));
});

function actualizarTabla() {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';

    let total = 0;

    for (let id in carrito) {
        const producto = carrito[id];
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = producto.id;
        tr.appendChild(tdId);

        const tdNombre = document.createElement('td');
        tdNombre.textContent = producto.nombre;
        tr.appendChild(tdNombre);

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${parseFloat(producto.precioVenta).toFixed(2)}`;
        tr.appendChild(tdPrecio);

        const tdCantidad = document.createElement('td');
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 1;
        inputCantidad.value = producto.cantidad;
        inputCantidad.addEventListener('change', (e) => {
            producto.cantidad = parseInt(e.target.value);
            actualizarTabla();
        });
        tdCantidad.appendChild(inputCantidad);
        tr.appendChild(tdCantidad);

        const tdCantidadTotal = document.createElement('td');
        const cantidadTotal = producto.precioVenta * producto.cantidad;
        tdCantidadTotal.textContent = `$${cantidadTotal.toFixed(2)}`;
        tr.appendChild(tdCantidadTotal);

        const tdOpciones = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            eliminarProducto(producto.id);
            actualizarTabla();
        });
        tdOpciones.appendChild(btnEliminar);
        tr.appendChild(tdOpciones);

        tbody.appendChild(tr);

        total += cantidadTotal;
    }

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function agregarProductoAlCarrito(producto) {
    if (carrito[producto.id]) {
        carrito[producto.id].cantidad += 1;
    } else {
        carrito[producto.id] = { ...producto, cantidad: 1 };
    }
    actualizarTabla();
}

function eliminarProducto(idProducto) {
    delete carrito[idProducto];
}

function realizarVenta() {
    if (Object.keys(carrito).length === 0) {
        alert('No hay productos en el carrito');
        return;
    }

    // Realizar la venta
    for (let id in carrito) {
        const producto = carrito[id];
        fetch('insert_sale.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_producto: producto.id,
                nombre_producto: producto.nombre,
                precio_venta: producto.precioVenta,
                cantidad: producto.cantidad
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Venta realizada correctamente');
            } else {
                console.error('Error al realizar la venta:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud de venta:', error));
    }

    // Limpiar el carrito
    carrito = {};
    actualizarTabla();
    alert('Venta(s) realizada(s) exitosamente');
}

// Función para cancelar la venta y recargar la página
function cancelarVenta() {
    window.location.reload();
}
