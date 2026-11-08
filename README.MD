
# 🐾 Huellitas Vet

### Sitio web veterinario | Proyecto académico

Huellitas Vet es una página web diseñada para ofrecer una experiencia moderna, amigable y funcional a los propietarios de mascotas.

El proyecto permite conocer los servicios veterinarios, registrar mascotas y enviar solicitudes de citas mediante un formulario conectado con EmailJS.

---

## 🌟 Características principales

- 🏠 Página de inicio con diseño veterinario.
- 🐶 Registro de mascotas con nombre, especie, edad y propietario.
- 💾 Almacenamiento local de mascotas mediante `localStorage`.
- 🗑️ Eliminación de mascotas registradas.
- 🩺 Presentación de servicios veterinarios con fotografías.
- 📅 Formulario para solicitar citas.
- 📧 Envío de solicitudes por correo electrónico mediante EmailJS.
- ✅ Validación de formularios y fechas.
- 📱 Diseño responsive para computadoras, tabletas y celulares.
- ✨ Animaciones suaves y efectos interactivos.

## 🛠️ Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| HTML5 | Estructura del sitio web |
| CSS3 | Diseño, colores y animaciones |
| JavaScript | Interactividad y validaciones |
| Bootstrap 5 | Diseño responsive |
| Bootstrap Icons | Iconografía |
| EmailJS | Envío de solicitudes por correo |
| localStorage | Almacenamiento de mascotas |

## 📂 Estructura del proyecto

```text
huellitas-vet/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio o descarga el código fuente.
2. Abre la carpeta `huellitas-vet` en Visual Studio Code.
3. Instala la extensión **Live Server**, si todavía no la tienes.
4. Abre `index.html` con Live Server.
5. Explora las funcionalidades del sitio.

> El envío de correos requiere una configuración válida de EmailJS.

## 🐕 Registro de mascotas

Los usuarios pueden registrar mascotas proporcionando:

- Nombre de la mascota.
- Tipo de mascota.
- Edad aproximada.
- Nombre del propietario.

La información se guarda en el navegador utilizando `localStorage`.

**Nota:** Los registros son locales y no se sincronizan entre dispositivos.

## 📅 Solicitud de citas

El formulario permite introducir:

- Nombre del propietario.
- Correo electrónico.
- Teléfono.
- Nombre y tipo de mascota.
- Servicio veterinario solicitado.
- Fecha y hora deseadas.
- Observaciones adicionales.

Al enviar el formulario, JavaScript valida los datos y utiliza EmailJS para enviar la solicitud al correo configurado.

**Importante:** El envío de la solicitud no garantiza la disponibilidad ni confirma automáticamente una cita.

## 🩺 Servicios disponibles

1. Consulta general.
2. Vacunación.
3. Desparasitación.
4. Higiene y cuidado.

## 🎨 Diseño

El sitio utiliza una identidad visual inspirada en el bienestar animal:

- Tonalidades verdes y fondos suaves.
- Fotografías de mascotas.
- Tarjetas con bordes redondeados.
- Efectos de profundidad y animaciones.
- Navegación adaptable a diferentes pantallas.

## 🔐 Consideraciones técnicas

- El proyecto utiliza EmailJS desde el navegador.
- La clave pública de EmailJS se configura en `script.js`.
- No se deben publicar claves privadas ni contraseñas.
- Las mascotas registradas se almacenan únicamente en el navegador.
- El sistema no incluye una base de datos ni un calendario de disponibilidad.

## 🎓 Propósito del proyecto

Este proyecto fue desarrollado con fines académicos para aplicar conocimientos de desarrollo web, diseño responsive, manipulación del DOM, almacenamiento local e integración con servicios externos.

## 👨‍💻 Autor

**José Rafael Gutiérrez Ferreras**

Proyecto académico de desarrollo web.

---

**🐾 Huellitas Vet — Cuidamos a quienes llenan tu vida de amor.**
