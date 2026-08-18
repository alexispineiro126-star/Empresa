const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav_list");

if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
        navList.classList.toggle("active");
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", String(!expanded));
    });
}

// ===============================
// CARRITO DE COMPRAS
// ===============================

const botonesComprar = document.querySelectorAll(".comprar");

const carrito = document.getElementById("carrito");
const botonCarrito = document.getElementById("boton-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const fondoCarrito = document.getElementById("fondo-carrito");

const carritoProductos = document.getElementById("carrito-productos");
const carritoTotal = document.getElementById("carrito-total");
const contadorCarrito = document.getElementById("contador-carrito");

const botonWhatsapp = document.getElementById("boton-whatsapp");


// Acá se guardan los productos
let productosCarrito = [];


// ===============================
// AGREGAR PRODUCTO
// ===============================

botonesComprar.forEach((boton) => {

    boton.addEventListener("click", () => {

        // Buscamos la tarjeta donde se hizo clic
        const tarjeta = boton.closest(".producto");

        // Sacamos los datos
        const nombre = tarjeta
            .querySelector(".nombre")
            .textContent
            .trim();

        const descripcion = tarjeta
            .querySelector(".descripcion")
            .textContent
            .trim();

        const imagen = tarjeta
            .querySelector(".producto-img")
            .getAttribute("src");

        // Sacamos solamente el precio actual
        const precioTexto = tarjeta
            .querySelector(".precio")
            .childNodes[0]
            .textContent
            .trim();

        const precio = parseFloat(
            precioTexto.replace("$", "")
        );


        // Buscamos si ya está en el carrito
        const productoExistente = productosCarrito.find(
            producto => producto.nombre === nombre
        );


        if (productoExistente) {

            // Si ya existe, aumentamos cantidad
            productoExistente.cantidad++;

        } else {

            // Si no existe, lo agregamos
            productosCarrito.push({

                nombre: nombre,

                descripcion: descripcion,

                precio: precio,

                imagen: imagen,

                cantidad: 1

            });

        }


        // Actualizamos el carrito
        actualizarCarrito();

    });

});


// ===============================
// ACTUALIZAR CARRITO
// ===============================

function actualizarCarrito() {

    carritoProductos.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;


    // Si está vacío
    if (productosCarrito.length === 0) {

        carritoProductos.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

    }


    // Recorremos los productos
    productosCarrito.forEach((producto, index) => {

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;


        // Creamos el producto
        const item = document.createElement("div");

        item.classList.add("carrito-item");


        item.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <div class="carrito-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p class="carrito-precio">
                    $${producto.precio.toFixed(2)}
                </p>

                <div class="carrito-controles">

                    <button
                        type="button"
                        class="menos"
                        data-index="${index}">
                        −
                    </button>

                    <span class="cantidad">
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        class="mas"
                        data-index="${index}">
                        +
                    </button>

                    <button
                        type="button"
                        class="eliminar-producto"
                        data-index="${index}">
                        🗑️
                    </button>

                </div>

            </div>
        `;


        carritoProductos.appendChild(item);

    });


    // Mostrar total
    carritoTotal.textContent =
        `$${total.toFixed(2)}`;


    // Mostrar cantidad de productos
    contadorCarrito.textContent =
        cantidadTotal;


    // ===============================
    // BOTONES +
    // ===============================

    document.querySelectorAll(".mas").forEach((boton) => {

        boton.addEventListener("click", () => {

            const index = boton.dataset.index;

            productosCarrito[index].cantidad++;

            actualizarCarrito();

        });

    });


    // ===============================
    // BOTONES -
    // ===============================

    document.querySelectorAll(".menos").forEach((boton) => {

        boton.addEventListener("click", () => {

            const index = boton.dataset.index;

            if (productosCarrito[index].cantidad > 1) {

                productosCarrito[index].cantidad--;

            } else {

                productosCarrito.splice(index, 1);

            }

            actualizarCarrito();

        });

    });


    // ===============================
    // ELIMINAR
    // ===============================

    document
        .querySelectorAll(".eliminar-producto")
        .forEach((boton) => {

            boton.addEventListener("click", () => {

                const index = boton.dataset.index;

                productosCarrito.splice(index, 1);

                actualizarCarrito();

            });

        });

}


// ===============================
// ABRIR CARRITO
// ===============================

botonCarrito.addEventListener("click", () => {

    carrito.classList.add("abierto");

    fondoCarrito.classList.add("activo");

});


// ===============================
// CERRAR CARRITO
// ===============================

cerrarCarrito.addEventListener("click", () => {

    carrito.classList.remove("abierto");

    fondoCarrito.classList.remove("activo");

});


fondoCarrito.addEventListener("click", () => {

    carrito.classList.remove("abierto");

    fondoCarrito.classList.remove("activo");

});


// ===============================
// WHATSAPP
// ===============================

botonWhatsapp.addEventListener("click", () => {

    // Comprobar carrito vacío

    if (productosCarrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }


    // IMPORTANTE:
    // Cambiá este número por el WhatsApp del negocio

    const numeroWhatsapp = "543755381918";


    let mensaje =
        "Hola! Quiero realizar el siguiente pedido:\n\n";


    let total = 0;


    // Crear mensaje

    productosCarrito.forEach((producto) => {

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;


        mensaje +=
            `🛒 ${producto.nombre}\n` +
            `Cantidad: ${producto.cantidad}\n` +
            `Precio: $${producto.precio.toFixed(2)}\n` +
            `Subtotal: $${subtotal.toFixed(2)}\n\n`;

    });


    mensaje +=
        `💰 TOTAL: $${total.toFixed(2)}`;


    // Convertir mensaje para URL

    const mensajeCodificado =
        encodeURIComponent(mensaje);


    // Abrir WhatsApp

    const url =
        `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;


    window.open(url, "_blank");

});