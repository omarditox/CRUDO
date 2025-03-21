document.addEventListener("DOMContentLoaded", function () {
    let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

    function guardarLista() {
        localStorage.setItem("productos", JSON.stringify(listaProductos));
    }

    function capitalizar(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    function calcularTotal() {
        let total = listaProductos.reduce((sum, producto) => sum + (producto.cantidad * producto.precio), 0);
        document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
    }

    function mostrarProductos() {
        const tabla = document.getElementById("tablaProductos");
        tabla.innerHTML = "";

        listaProductos.forEach((producto, i) => {
            let precioTotal = producto.cantidad * producto.precio;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>$${precioTotal.toFixed(2)}</td>
                <td>
                    <button class="btn-editar" onclick="modificarProducto(${i})">✏️ Editar</button>
                    <button class="btn-eliminar" onclick="eliminarProducto(${i})">🗑️ Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });

        calcularTotal();
    }

    document.getElementById("formularioProducto").addEventListener("submit", function (e) {
        e.preventDefault();

        let nombre = document.getElementById("nombreProducto").value.trim();
        let cantidad = parseInt(document.getElementById("cantidadProducto").value);
        let precio = parseFloat(document.getElementById("precioProducto").value);

        if (!nombre || cantidad <= 0 || precio <= 0) {
            alert("❌ Ingresa datos válidos.");
            return;
        }

        listaProductos.push({ nombre: capitalizar(nombre), cantidad, precio });
        guardarLista();
        mostrarProductos();
        e.target.reset();
    });

    window.eliminarProducto = function (indice) {
        if (confirm("¿Seguro que quieres eliminar este producto?")) {
            listaProductos.splice(indice, 1);
            guardarLista();
            mostrarProductos();
        }
    };

    window.modificarProducto = function (indice) {
        const producto = listaProductos[indice];

        document.getElementById("nombreProducto").value = producto.nombre;
        document.getElementById("cantidadProducto").value = producto.cantidad;
        document.getElementById("precioProducto").value = producto.precio;

        listaProductos.splice(indice, 1);
        guardarLista();
        mostrarProductos();
    };

    mostrarProductos();
});
