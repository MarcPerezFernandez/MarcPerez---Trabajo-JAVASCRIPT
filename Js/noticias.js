const noticiasContainer = document.getElementById("noticias-container");
// Cargar noticias desde el archivo JSON y mostrarlas en la página
fetch('Assets/Data/datos.json')
    .then(response => response.json())
    .then(data => {
        data.noticias.map((item) => {
            noticiasContainer.innerHTML += `
            <div class="noticias-container" id="noticias-container">
                <h3>${item.nombre} - <small>${item.fecha}</small></h3>
                <p>${item.descripcion}</p>
                <img src="${item.imagen}" alt="${item.altTexto}" class="noticia-imagen">
            </div>
            `;
        });
    });