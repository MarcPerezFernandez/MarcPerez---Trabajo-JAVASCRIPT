//--- Geolocation ---//
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, options);
}else{
    alert('Los servicios de geolocalizacion no estan disponibles');
}
//--- Opciones de geolocalizacion ---//
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0 
};
//--- Funciones de geolocalizacion ---//
function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    //--- Mapa ---//
    let map = L.map('map', {
        center: [latitude, longitude],
        zoom: 14
    });
    //--- Capa del mapa ---//
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    //--- Ruta ---//
    let incio = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize:     [38, 38], 
        iconAnchor:   [22, 38], 
        popupAnchor:  [-3, -76] 
    });
    
    let final = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize:     [38, 38],
        iconAnchor:   [22, 38],
        popupAnchor:  [-3, -76] 
    });

    let track = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize:     [38, 38],
        iconAnchor:   [22, 38], 
        popupAnchor:  [-3, -76] 
    });
    //--- Control de la ruta ---//
    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(37.4042335,-3.5609886)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps){
            switch(i){
                case 0:
                    return L.marker(wp.latLng, {icon: incio, draggable: true}).bindPopup('Inicio').openPopup();
                case nWps -1:
                    return L.marker(wp.latLng, {icon: final, draggable: true}).bindPopup('Destino').openPopup();
                default:
                    return L.marker(wp.latLng, {icon: track, draggable: true}).bindPopup('Punto intermedio').openPopup();    
                }
        }

    }).addTo(map);
}

//--- Funcion de error ---//
function error(){
    let map = L.map('map', {
        center: [37.4042335,-3.5609886],
        zoom: 14
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);    
}