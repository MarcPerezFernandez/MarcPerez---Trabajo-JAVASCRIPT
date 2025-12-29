const navbarLinks = document.getElementById("navbar");
// Cargar enlaces de navegación desde el archivo JSON y mostrarlos en la barra de navegación
fetch('Assets/Data/datos.json')
    .then(response => response.json())
    .then(data => {
        data.navItems.map((link) => {
            navbarLinks.innerHTML += `<a href="${link.url}">${link.title}</a>`;
        });
    });