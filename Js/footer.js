const socialIcons = document.getElementById("redes");
const copy = document.getElementById("copy");

// Cargar enlaces de redes sociales desde el archivo JSON y mostrarlos en el footer
fetch('Assets/Data/datos.json')
    .then(response => response.json())
    .then(data => {
        data.socialLinks.map((link) => {
            socialIcons.innerHTML += `<a href="${link.urlRed}" target="_blank"><img src="${link.icon}" alt="${link.altText}" class="icono-redes"></a>`;
        });
    });

fetch('Assets/Data/datos.json')
    .then(response => response.json())
    .then(data => {
        copy.innerHTML = `&copy; 2024 ${data.address}`;
    });