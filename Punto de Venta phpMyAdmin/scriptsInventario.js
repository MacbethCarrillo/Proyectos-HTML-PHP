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

// Función para cargar el inventario en la tabla
function cargarInventarioYEventos() {
    fetch('get_inventory.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el inventario');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('inventory-table-body');
        tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla

        data.forEach(producto => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precioCompra}</td>
                <td>${producto.precioVenta}</td>
                <td>${producto.inventarioInicial}</td>
                <td>${producto.stock}</td>
                <td>
                    <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al cargar el inventario');
    });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        fetch('eliminar_producto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => {
            if (response.ok) {
                alert('Producto eliminado con éxito');
                window.location.reload();
            } else {
                throw new Error('Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        });
    }
}

// Función para filtrar la tabla y resaltar las coincidencias
function filtrarTabla() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const table = document.querySelector('table');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) { // Empezamos desde 1 para saltar el encabezado
        const td = tr[i].getElementsByTagName('td');
        let showRow = false;

        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                const txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        tr[i].style.display = showRow ? '' : 'none';
    }
}

// Agregar evento de input a la barra de búsqueda para filtrar en tiempo real
document.getElementById('search-input').addEventListener('input', filtrarTabla);

// Agregar evento de click al botón de búsqueda para filtrar
document.getElementById('search-button').addEventListener('click', filtrarTabla);

// Llamar a la función para cargar el inventario al cargar la página
window.addEventListener('load', cargarInventarioYEventos);
