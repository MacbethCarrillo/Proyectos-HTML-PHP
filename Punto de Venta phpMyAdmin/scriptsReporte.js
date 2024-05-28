// Función para redireccionar al salir
function redireccionar() {
    window.location.href = 'login.html'; // Redireccionar al login.html
}

// Agregar evento de clic al botón "Salir"
document.getElementById('salir').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    if (confirm('¿Estás seguro de que deseas salir de la página?')) {
        redireccionar();
    }
});

// Función para redireccionar al salir
function redireccionar() {
    window.location.href = 'login.html'; // Redireccionar al login.html
}

// Agregar evento de clic al botón "Salir"
document.getElementById('salir').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    if (confirm('¿Estás seguro de que deseas salir de la página?')) {
        redireccionar();
    }
});

function filtrarVentasPorFecha() {
    const dateInput = document.getElementById('dateInput').value;
    if (!dateInput) {
        alert('Por favor, selecciona una fecha');
        return;
    }

    fetch(`get_sales_by_date.php?fecha=${dateInput}`)
        .then(response => response.json())
        .then(data => {
            console.log('Ventas filtradas por fecha recibidas:', data); // Verifica los datos aquí
            actualizarTablaVentas(data);
        })
        .catch(error => console.error('Error al cargar las ventas:', error));
}

function actualizarTablaVentas(ventas) {
    const tbody = document.getElementById('ventasTableBody');
    tbody.innerHTML = '';

    ventas.forEach(venta => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = venta.id;
        tr.appendChild(tdId);

        const tdIdProducto = document.createElement('td');
        tdIdProducto.textContent = venta.id_producto;
        tr.appendChild(tdIdProducto);

        const tdNombreProducto = document.createElement('td');
        tdNombreProducto.textContent = venta.nombre_producto;
        tr.appendChild(tdNombreProducto);

        const tdPrecioVenta = document.createElement('td');
        tdPrecioVenta.textContent = `$${parseFloat(venta.precio_venta).toFixed(2)}`;
        tr.appendChild(tdPrecioVenta);

        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = venta.cantidad;
        tr.appendChild(tdCantidad);

        const tdFecha = document.createElement('td');
        tdFecha.textContent = venta.fecha;
        tr.appendChild(tdFecha);

        const tdCantidadTotal = document.createElement('td');
        tdCantidadTotal.textContent = `$${parseFloat(venta.cantidadTotal).toFixed(2)}`;
        tr.appendChild(tdCantidadTotal);

        tbody.appendChild(tr);
    });
}
