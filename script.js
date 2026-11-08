
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. CONFIGURACIÓN GENERAL
    // ==========================================

    const anioActual = document.getElementById("anioActual");

    if (anioActual) {
        anioActual.textContent = new Date().getFullYear();
    }

    // Configuración de EmailJS
    const EMAILJS_SERVICE_ID = "service_qm5fe0b";
    const EMAILJS_TEMPLATE_ID = "template_jk7zt2g";
   const EMAILJS_PUBLIC_KEY = "7DqlYw_6lNV0bGmZf";

    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    } else {
        console.error("No se pudo cargar EmailJS.");
    }


    // ==========================================
    // 2. REGISTRO DE MASCOTAS
    // ==========================================

    const formMascota = document.getElementById("formMascota");
    const listaMascotas = document.getElementById("listaMascotas");

    const CLAVE_MASCOTAS = "huellitasVetMascotas";

    let mascotas = [];

    try {
        const datosGuardados = JSON.parse(
            localStorage.getItem(CLAVE_MASCOTAS) || "[]"
        );

        mascotas = Array.isArray(datosGuardados)
            ? datosGuardados
            : [];

    } catch (error) {
        console.error("Error al cargar mascotas:", error);
    }

    function guardarMascotas() {
        localStorage.setItem(
            CLAVE_MASCOTAS,
            JSON.stringify(mascotas)
        );
    }

    function crearElementoTexto(etiqueta, clase, contenido) {
        const elemento = document.createElement(etiqueta);

        if (clase) {
            elemento.className = clase;
        }

        elemento.textContent = contenido;

        return elemento;
    }

    function mostrarMascotas() {

        if (!listaMascotas) return;

        listaMascotas.innerHTML = "";

        if (mascotas.length === 0) {
            listaMascotas.appendChild(
                crearElementoTexto(
                    "p",
                    "text-muted",
                    "Todavía no hay mascotas registradas."
                )
            );

            return;
        }

        mascotas.forEach((mascota) => {

            const tarjeta = document.createElement("div");
            tarjeta.className = "card mb-3 shadow-sm border-0";

            const contenido = document.createElement("div");
            contenido.className = "card-body";

            const titulo = crearElementoTexto(
                "h5",
                "card-title fw-bold",
                "🐾 " + mascota.nombre
            );

            const especie = crearElementoTexto(
                "p",
                "mb-1",
                "Tipo: " + mascota.tipo
            );

            const edad = crearElementoTexto(
                "p",
                "mb-1",
                "Edad: " + mascota.edad + " año(s)"
            );

            const propietario = crearElementoTexto(
                "p",
                "mb-3",
                "Propietario: " + mascota.propietario
            );

            const botonEliminar = document.createElement("button");

            botonEliminar.type = "button";
            botonEliminar.className = "btn btn-outline-danger btn-sm";
            botonEliminar.textContent = "Eliminar mascota";

            botonEliminar.addEventListener("click", () => {
                mascotas = mascotas.filter(
                    (registro) => registro.id !== mascota.id
                );

                guardarMascotas();
                mostrarMascotas();
            });

            contenido.append(
                titulo,
                especie,
                edad,
                propietario,
                botonEliminar
            );

            tarjeta.appendChild(contenido);
            listaMascotas.appendChild(tarjeta);
        });
    }

    if (formMascota) {

        formMascota.addEventListener("submit", (evento) => {

            evento.preventDefault();

            if (!formMascota.checkValidity()) {
                formMascota.reportValidity();
                return;
            }

            const nombre = document
                .getElementById("nombreMascota")
                .value.trim();

            const tipo = document
                .getElementById("tipoMascota")
                .value;

            const edad = document
                .getElementById("edadMascota")
                .value;

            const propietario = document
                .getElementById("propietarioMascota")
                .value.trim();

            const nuevaMascota = {
                id: window.crypto?.randomUUID?.() ||
                    Date.now().toString() + Math.random(),
                nombre,
                tipo,
                edad,
                propietario
            };

            mascotas.push(nuevaMascota);

            guardarMascotas();
            mostrarMascotas();

            formMascota.reset();

            alert("¡Mascota registrada correctamente!");
        });
    }

    mostrarMascotas();


    // ==========================================
    // 3. SOLICITUD DE CITAS
    // ==========================================

    const formCita = document.getElementById("formCita");
    const mensajeCita = document.getElementById("mensajeCita");

    function mostrarMensajeCita(mensaje, tipo = "info") {

        if (!mensajeCita) return;

        const tiposPermitidos = [
            "success",
            "danger",
            "warning",
            "info"
        ];

        const tipoSeguro = tiposPermitidos.includes(tipo)
            ? tipo
            : "info";

        mensajeCita.className =
            "alert alert-" + tipoSeguro + " mt-3";

        mensajeCita.textContent = mensaje;
    }

    function obtenerFechaLocal() {

        const ahora = new Date();

        const anio = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, "0");
        const dia = String(ahora.getDate()).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;
    }

    const campoFecha = document.getElementById("citaFecha");

    if (campoFecha) {
        campoFecha.min = obtenerFechaLocal();
    }

    if (formCita) {

        formCita.addEventListener("submit", async (evento) => {

            evento.preventDefault();

            if (!formCita.checkValidity()) {
                formCita.reportValidity();
                return;
            }

            const datosCita = {

                propietario: document
                    .getElementById("citaPropietario")
                    .value.trim(),

                correo: document
                    .getElementById("citaCorreo")
                    .value.trim(),

                telefono: document
                    .getElementById("citaTelefono")
                    .value.trim(),

                mascota: document
                    .getElementById("citaMascota")
                    .value.trim(),

                especie: document
                    .getElementById("citaEspecie")
                    .value,

                servicio: document
                    .getElementById("citaServicio")
                    .value,

                fecha: document
                    .getElementById("citaFecha")
                    .value,

                hora: document
                    .getElementById("citaHora")
                    .value,

                mensaje: document
                    .getElementById("citaMensaje")
                    .value.trim() || "Sin observaciones"

            };

            // ==================================
            // 4. VALIDACIÓN DE FECHA Y HORA
            // ==================================

            const fechaHoraSolicitada = new Date(
                `${datosCita.fecha}T${datosCita.hora}`
            );

            if (
                Number.isNaN(fechaHoraSolicitada.getTime()) ||
                fechaHoraSolicitada <= new Date()
            ) {

                mostrarMensajeCita(
                    "Selecciona una fecha y hora futuras.",
                    "warning"
                );

                return;
            }


            // ==================================
            // 5. ENVÍO DEL CORREO CON EMAILJS
            // ==================================

            if (typeof emailjs === "undefined") {

                mostrarMensajeCita(
                    "No se pudo cargar el servicio de correo. Revisa tu conexión a Internet.",
                    "danger"
                );

                return;
            }

            const botonEnviar = formCita.querySelector(
                'button[type="submit"]'
            );

            if (!botonEnviar || botonEnviar.disabled) {
                return;
            }

            const contenidoOriginal = botonEnviar.innerHTML;

            botonEnviar.disabled = true;
            botonEnviar.textContent = "Enviando solicitud...";

            mostrarMensajeCita(
                "Estamos enviando tu solicitud de cita...",
                "info"
            );

            try {

                const respuesta = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    datosCita,
                    {
                        publicKey: EMAILJS_PUBLIC_KEY
                    }
                );

                console.log(
                    "Respuesta de EmailJS:",
                    respuesta
                );

                mostrarMensajeCita(
                    "¡Solicitud enviada correctamente! Pronto confirmaremos la disponibilidad de tu cita.",
                    "success"
                );

                formCita.reset();

            } catch (error) {

                console.error(
                    "Error al enviar la cita con EmailJS:",
                    error
                );

                mostrarMensajeCita(
                    "No se pudo enviar la solicitud. Revisa la consola del navegador para conocer el error.",
                    "danger"
                );

            } finally {

                botonEnviar.disabled = false;
                botonEnviar.innerHTML = contenidoOriginal;

            }

        });
    }


    // ==========================================
    // 6. MENÚ RESPONSIVE
    // ==========================================

    const enlacesMenu = document.querySelectorAll(
        "#menuPrincipal .nav-link"
    );

    enlacesMenu.forEach((enlace) => {

        enlace.addEventListener("click", () => {

            const menu = document.getElementById("menuPrincipal");

            if (
                menu &&
                menu.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {

                const instancia = bootstrap.Collapse.getOrCreateInstance(
                    menu,
                    { toggle: false }
                );

                instancia.hide();
            }

        });

    });

});

// Animación al desplazarse por la página
const elementosAnimados = document.querySelectorAll(
    ".seccion, .tarjeta-servicio, .tarjeta-contacto"
);

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("animar-entrada");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementosAnimados.forEach((elemento) => {
        observador.observe(elemento);
    });
}
