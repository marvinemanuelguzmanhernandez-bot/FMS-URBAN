/* Archivo JavaScript en assets/js/script.js */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    // 1. Control del menu hamburguesa movil
    if (mobileMenuIcon && navMenu) {
        mobileMenuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('nav-menu-active');
        });

        // Cerrar el menu al hacer clic en cualquier opcion
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-menu-active');
            });
        });

        // Cerrar el menu al hacer clic fuera del panel
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !mobileMenuIcon.contains(event.target)) {
                navMenu.classList.remove('nav-menu-active');
            }
        });
    }

    // 2. Desplazamiento suave (smooth scroll) compensando el header fijo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// --- LOGICA DEL CARRITO DE COMPRAS Y PAGOS SIMULADOS ---

// Cargar el carrito guardado en el navegador o iniciar uno vacio
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Actualizar la vista del carrito al cargar la pagina
actualizarCarrito();

// Funcion para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio) {
    let productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    
    guardarYActualizar();
    alert("¡Producto agregado al carrito con exito!");
}

// Guardar en localStorage y refrescar la interfaz
function guardarYActualizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Actualizar los elementos visuales del carrito y el contador superior
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    if (!listaCarrito) return;

    listaCarrito.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        totalItems += item.cantidad;

        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre} (x${item.cantidad})</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button onclick="eliminarItem(${index})">X</button>
            </div>
        `;
    });

    contadorCarrito.innerText = totalItems;
    totalCarrito.innerText = total.toFixed(2);
}

// Eliminar un producto especifico del carrito
function eliminarItem(index) {
    carrito.splice(index, 1);
    guardarYActualizar();
}

// Mostrar el modal del carrito al hacer click en el icono de la barra
const btnVerCarrito = document.getElementById('btn-ver-carrito');
if (btnVerCarrito) {
    btnVerCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-carrito').classList.remove('oculto');
    });
}

// Cerrar el modal del carrito
function cerrarCarrito() {
    document.getElementById('modal-carrito').classList.add('oculto');
}

// Simular el proceso de pago y mostrar la alerta de pruebas
function procesarPago(event) {
    event.preventDefault(); // Evita que la pagina se recargue de verdad
    
    // Ocultar el carrito
    cerrarCarrito();
    
    // Mostrar la alerta de pagina de pruebas
    document.getElementById('modal-alerta').classList.remove('oculto');
    
    // Vaciar el carrito despues de simular la compra
    carrito = [];
    guardarYActualizar();
}

// Cerrar la alerta del sistema de pruebas
function cerrarAlerta() {
    document.getElementById('modal-alerta').classList.add('oculto');
}