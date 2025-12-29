const carousel = document.getElementById('carousel');
const cajas = document.querySelectorAll('.caja');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.querySelector('.dots-container')
//--- Imagenes del carrusel ---//
const images = [
    'Assets/Images/pista1.jpg',
    'Assets/Images/pista2.jpg',
    'Assets/Images/pista3.jpg',
    'Assets/Images/pista4.jpg',
    'Assets/Images/pista5.jpg',
    'Assets/Images/pista6.jpg'
]
let currentIndex = 0;
let startX = 0; 
let isDragging = false; 
//--- Configuracion del carrusel ---//
cajas.forEach((caja) => {
    const img = document.createElement('img');
    img.alt = "Carousel image";
    img.draggable = false;
    caja.appendChild(img);
})
//--- Puntos de navegacion ---//
images.forEach(() => {
    const dot = document.createElement('div');
    dot.classList.add('dot', 'inactive');
    dotsContainer.appendChild(dot);
})
//--- Funcion de actualizacion del carrusel ---//
function updateCarousel(){
    const prevIndex = (currentIndex -1 + images.length) % images.length;
    const nextIndex = (currentIndex +1) % images.length;
    //--- Actualizar las imagenes ---//
    cajas.forEach((caja, index) => {
        const img = caja.querySelector('img');
        if(index === 0){
            img.src = images[prevIndex];
        }else if(index === 1){
            img.src = images[currentIndex];
        }else if(index === 2){
            img.src = images[nextIndex]
        }
    });
    //--- Actualizar los puntos ---//
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) =>{
        if(index === currentIndex){
            dot.classList.add('active')
            dot.classList.remove('inactive')
        }else{
            dot.classList.remove('active')
            dot.classList.add('inactive')
        }
    })
}

updateCarousel();

prevBtn.addEventListener('click', () =>{
    currentIndex = (currentIndex -1 + images.length) % images.length;
    updateCarousel();
})

nextBtn.addEventListener('click', () =>{
    currentIndex = (currentIndex +1) % images.length;
    updateCarousel();
})

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX
});
//--- Movimiento del raton ---//
carousel.addEventListener('mousemove', (e) => {
    if(!isDragging) return

    const moveX = e.pageX - startX

    if(Math.abs(moveX) > 100) {
        if(moveX >0){
            currentIndex = (currentIndex -1 + images.length) % images.length;
        }else{
            currentIndex = (currentIndex +1) % images.length;
        }

        updateCarousel();
        isDragging = false;
    }
});
//--- Soltar el raton ---//
carousel.addEventListener('mouseup', () => {
    isDragging = false;
});