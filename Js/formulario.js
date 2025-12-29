//VALIDACION DE FORMULARIOS
// Seleccionar los elementos del formulario
const nombreInput = document.getElementById("nombre");
const telefonoInput = document.getElementById("telefono");
const emailInput = document.getElementById("email");
const apellidosInput = document.getElementById("apellidos");
const formulario = document.getElementById("form");

// Validar nombre con expresión regular
function validarNombre() {
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/;
    if(nombre.length >= 3 && nombrePattern.test(nombre) && nombre.length <= 15) {
        nombreInput.classList.add("valido");
        nombreInput.classList.remove("invalido");
        document.getElementById("nombreError").textContent = "";
    }else{
        nombreInput.classList.remove("valido");
        nombreInput.classList.add("invalido");
        document.getElementById("nombreError").textContent = "El nombre debe contener solo letras y al menos 3 caracteres.";
    }
}

// Validar apellidos con expresión regular
function validarApellidos() {
    const apellidos = apellidosInput.value;
    const apellidosPattern = /^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/;
    if(apellidos.length >= 3 && apellidosPattern.test(apellidos) && apellidos.length <= 40) {
        apellidosInput.classList.add("valido");
        apellidosInput.classList.remove("invalido");
        document.getElementById("apellidosError").textContent = "";
    }else{
        apellidosInput.classList.remove("valido");
        apellidosInput.classList.add("invalido");
        document.getElementById("apellidosError").textContent = "Los apellidos deben contener solo letras y al menos 3 caracteres.";
    }
}

// Validar teléfono con expresión regular
function validarTelefono() {
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/;  
    if(telefonoPattern.test(telefono)) {
        telefonoInput.classList.add("valido");
        telefonoInput.classList.remove("invalido");
        document.getElementById("telefonoError").textContent = "";
    }else{
        telefonoInput.classList.remove("valido");
        telefonoInput.classList.add("invalido");
        document.getElementById("telefonoError").textContent = "El teléfono debe tener 9 dígitos.";
    }
}  

// Validar email con expresión regular
function validarEmail() {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(emailPattern.test(email)) {
        emailInput.classList.add("valido");
        emailInput.classList.remove("invalido");
        document.getElementById("emailError").textContent = "";
    }else{
        emailInput.classList.remove("valido");
        emailInput.classList.add("invalido");
        document.getElementById("emailError").textContent = "El email no es válido.";
    }
}

// Función para resetear el formulario y clases de validación
function resetFormulario() {
    formulario.reset();
    nombreInput.classList.remove("valido"); 
    telefonoInput.classList.remove("valido");
    emailInput.classList.remove("valido");
    apellidosInput.classList.remove("valido");
}   

// Eventos de validación en tiempo real
nombreInput.addEventListener("input", validarNombre);
telefonoInput.addEventListener("input", validarTelefono);
emailInput.addEventListener("input", validarEmail);   
apellidosInput.addEventListener("input", validarApellidos);

// Manejar el envío del formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    validarNombre();
    validarTelefono();
    validarEmail();
    validarApellidos();
    if(nombreInput.classList.contains("valido") &&
        telefonoInput.classList.contains("valido") &&
        emailInput.classList.contains("valido") &&
        apellidosInput.classList.contains("valido")) {
        alert("Formulario enviado correctamente.");
        formulario.reset();
        nombreInput.classList.remove("valido");
        telefonoInput.classList.remove("valido");
        emailInput.classList.remove("valido");
        apellidosInput.classList.remove("valido");
    } else {
        alert("Por favor, corrige los errores en el formulario antes de enviarlo.");
    }
});


