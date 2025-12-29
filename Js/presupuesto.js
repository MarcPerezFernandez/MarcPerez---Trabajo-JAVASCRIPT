// Script para el cálculo dinámico del presupuesto:
// - Selección de estancia
// - Extras opcionales
// - Cálculo en tiempo real
// - Posibilidad de eliminar elementos del presupuesto

//Array para almacenar los productos añadidos al presupuesto
let productosPresupuesto = [];

//Elementos del DOM
const seleccionHabitacion = document.getElementById("seleccion-habitacion");
const diasSeleccionados = document.getElementById("dias");
const BtnAnadirCarrito = document.getElementById("anadir-al-carrito");
const listaPresupuesto = document.getElementById("lista-presupuesto");
const presupuestoTotal = document.getElementById("presupuesto-total");

//Evento para añadir producto al presupuesto
BtnAnadirCarrito.addEventListener("click", () => {
    const seleccion = seleccionHabitacion.value;
    if(!seleccion) {
        alert("Por favor, selecciona un producto antes de añadirlo al presupuesto.");
    }else{
        const [nombreProducto, precioProducto] = seleccion.split(":");
        const precio = parseFloat(precioProducto);
        //Añadir el producto al array de presupuesto
        productosPresupuesto.push({ tipo: nombreProducto, precio: precio });
        actualizarPresupuesto();
    }
});

//Función para actualizar el presupuesto total y la lista de productos
function actualizarPresupuesto() {
    listaPresupuesto.innerHTML = "";
    let subtotal = 0;
    // Productos
    productosPresupuesto.forEach((producto, index) => {
        subtotal += producto.precio;

        const articulo = document.createElement("div");
        articulo.classList.add("articulo-presupuesto");
        articulo.innerHTML = `
            <span>${producto.tipo}</span>
            <span>${producto.precio.toFixed(2)} €</span>
            <button type="button" class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        listaPresupuesto.appendChild(articulo);
    });
    // Extras
    const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked");
    extrasSeleccionados.forEach(extra => {
        const [nombre, precio] = extra.value.split(":");
        subtotal += parseFloat(precio);

        const extraItem = document.createElement("div");
        extraItem.classList.add("articulo-presupuesto", "extra");
        extraItem.innerHTML = `
            <span>${nombre}</span>
            <span>${parseFloat(precio).toFixed(2)} €</span>
        `;
        listaPresupuesto.appendChild(extraItem);
    });
    // Días
    const dias = parseInt(diasSeleccionados.value) || 0;
    let total = subtotal * dias;
    if (dias > 0) {
        const diasItem = document.createElement("div");
        diasItem.classList.add("articulo-presupuesto", "dias");
        diasItem.innerHTML = `
            <span>Días de estancia</span>
            <span>x ${dias}</span>
        `;
        listaPresupuesto.appendChild(diasItem);
    }
    // Descuento
    if (dias >= 3) {
        const descuento = total * 0.1;
        total -= descuento;

        const descuentoItem = document.createElement("div");
        descuentoItem.classList.add("articulo-presupuesto", "descuento");
        descuentoItem.innerHTML = `
            <span>Descuento 10%</span>
            <span>- ${descuento.toFixed(2)} €</span>
        `;
        listaPresupuesto.appendChild(descuentoItem);
    }
    // Total final
    presupuestoTotal.textContent = `Total: ${total.toFixed(2)} €`;
    // Botones eliminar
    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", e => {
            const index = e.target.dataset.index;
            productosPresupuesto.splice(index, 1);
            actualizarPresupuesto();
        });
    });
}

// Calcular y mostrar el resultado final
function calcularPresupuestoFinal() {
    let total = productosPresupuesto.reduce((suma, item) => suma + item.precio, 0);
    // Sumar los extras seleccionados al total
    const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked");
    extrasSeleccionados.forEach((checkbox) => {
        const [, precioExtra] = checkbox.value.split(":");
        total += parseFloat(precioExtra);
    });
    // Obtener los días seleccionados
    const dias = parseInt(diasSeleccionados.value) || 0;
    // Multiplicar por número de días
    total *= dias;
    // Aplicar descuento del 10% si son 3 o más días
    if (dias >= 3) {
        total *= 0.9;
    }
    presupuestoTotal.textContent = `Total: ${total.toFixed(2)} €`;
}

//evento para recalcular el presupuesto al cambiar los días o extras
diasSeleccionados.addEventListener("input", calcularPresupuestoFinal);
const checkboxesExtras = document.querySelectorAll(".checkbox-extra");
checkboxesExtras.forEach((checkbox) => {
    checkbox.addEventListener("change", calcularPresupuestoFinal);
});

//Inicializar el presupuesto al cargar la página
actualizarPresupuesto();