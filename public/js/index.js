let dataIndex, deviceLat, deviceLong, locationLat, locationLong, locationPicture, data, id;
let displayModal = false;
let displayNavegation = false;
const globeURL = 'https://uploads-ssl.webflow.com/61280f93e64da87e5a771aaa/615e6c55c97872c78624ea07_globe.svg';
const markerURL = 'https://uploads-ssl.webflow.com/61280f93e64da87e5a771aaa/6157f467f9cd7146e3972705_Location%20Marker.svg';
const closeIconURL = 'https://uploads-ssl.webflow.com/61280f93e64da87e5a771aaa/615e6c55907e8886161eda13_close.svg';
const mapIconURL = 'https://uploads-ssl.webflow.com/61280f93e64da87e5a771aaa/615e6c5563074347da2d3b26_map.svg';
const navbar = document.getElementById("locationsContainer");
const navegationButtonImage = document.getElementById('locationsIcon');
const restorePosition = document.getElementById('gpsButton');
const locationsButton = document.getElementById('locationsButton');
const goToLocationButton = document.getElementById('lookLocation');
const locationsContainer = document.getElementById('locationsContainer');
const navigation = document.getElementById('navegation');
const closeModalButton = document.getElementById('close');
const modalContainer = document.getElementById("modalContainer");
const modalPicture = document.getElementById("modalPicture");
const modalCountry = document.getElementById("modalCountry");
const modalState = document.getElementById('modalState');
const modalTitle = document.getElementById("modalLocation");
const modalAddress = document.getElementById("modalAddress");
const modalCategory = document.getElementById('modalCategory');
const modalClose = document.getElementById("close");
// Esta función cierra el modal
modalClose.addEventListener('click', () => {
    modalContainer.style.display = "none";
    displayModal = false;
})
// Aquí muestro la navegación
locationsButton.addEventListener('click', () => {
    switch(displayNavegation)
    {
        case false:
            navigation.style.display = 'flex';
            displayNavegation = true;
            navegationButtonImage.src = closeIconURL;
            break;
        case true:
            navigation.style.display = 'none';
            displayNavegation = false;
            navegationButtonImage.src = mapIconURL;
            break;
    }
})
// Aquí inicializo el mapa
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
let mymap = L.map('map');
// Aquí Restauro la posición del usuario
restorePosition.addEventListener('click', () => {
    mymap.setView([deviceLat,deviceLong], 15);
});
// Inicializar ubicación del dipositivo.
navigator.geolocation.getCurrentPosition(function(position){
    deviceLat = position.coords.latitude;
    deviceLong = position.coords.longitude;
    mymap.setView([deviceLat,deviceLong], 15);
    tiles.addTo(mymap);
    L.marker([deviceLat, deviceLong]).addTo(mymap);
});
// Funcion que trae los datos de Airtable.
async function getAirData(){
    const API_KEY = 'key0xswwEgtvrbQ2J';
    const Airtable_URL = `https://api.airtable.com/v0/appwBNFT7XIhOATPt/Locations?api_key=${API_KEY}`;
    response = await fetch(Airtable_URL);
    data =  await response.json();
    //Funcion que genera los botones.
    imprimirDatos()
}
//Esta función revisa que boton hizo click 
locationsContainer.addEventListener("click", e => {
    const target = e.target.closest(".interation_button"); // see if the click landed inside a button
    if (!target) return; // bail if it wasn't inside a button
    // do stuff with target here (target is now the button that was clicked on)
    //id = target.dataset.index;
    //openModal()
    id = target.dataset.index;
    navigation.style.display = 'none';
    displayNavegation = false;
    openModal()
})
function imprimirDatos(){
    for (let i = 0; i < data.records.length; i++) {
        // Aquí genero el objeto.
        let ObjectContainer = document.createElement('div');
        ObjectContainer.setAttribute('class','location_item');
        // Aquí creo el contenedor de la info.
        let ObjectInfo = document.createElement('div');
        ObjectInfo.setAttribute('class','info_container');
        // Aquí creo el contenedor del boton.
        let ObjectButton = document.createElement('div');
        ObjectButton.setAttribute('class','interation_button location');
        ObjectButton.setAttribute('data-index', i);
        let ObjectButtonIcon = document.createElement('img');
        ObjectButtonIcon.src = 'https://uploads-ssl.webflow.com/61280f93e64da87e5a771aaa/615e6c55c1713638ee2bfd1e_globe%20search.svg';
        ObjectButton.appendChild(ObjectButtonIcon);
        // Agui genero el dive que tiene el país y estado.
        let ObjectLocation = document.createElement('div');
        ObjectLocation.setAttribute('class','location_info_container');
        let ObjectLocationInfo = document.createElement('p');
        ObjectLocationInfo.setAttribute('class','location_info');
        let information = {
            country: data.records[i].fields.Country,
            state: data.records[i].fields.State
        };
        ObjectLocationInfo.innerText = `${information.country} | ${information.state}`;
        // Aquí se crea la imagen.
        let ObjectGlobeIcon = document.createElement('img');
        ObjectGlobeIcon.setAttribute('class','location_globe_icon');
        ObjectGlobeIcon.setAttribute('loading','lazy');
        ObjectGlobeIcon.setAttribute('src', globeURL);
        // Aquí genero el titulo de la locación
        let ObjectTitle = document.createElement('p');
        ObjectTitle.setAttribute('class','location_title');
        ObjectTitle.innerText = data.records[i].fields.Location;
        // Categoría
        let ObjectCategory = document.createElement('div');
        ObjectCategory.setAttribute('class','location_category');
        ObjectCategory.innerText = data.records[i].fields.Category;
        // Aquí agrego todo al dom
        ObjectLocation.appendChild(ObjectGlobeIcon);
        ObjectLocation.appendChild(ObjectLocationInfo);
        // Primero la info de "Locación", luego lo demás
        ObjectInfo.appendChild(ObjectLocation);
        ObjectInfo.appendChild(ObjectTitle);
        ObjectInfo.appendChild(ObjectCategory);
        ObjectContainer.appendChild(ObjectInfo);
        ObjectContainer.appendChild(ObjectButton);
        navbar.appendChild(ObjectContainer);
        //Esto genera los marcadores
        let pinLat = data.records[i].fields.Latitude;
        let pinLon = data.records[i].fields.Longitude;
        L.marker([pinLat, pinLon]).addTo(mymap);
      }
}
function openModal(){
    switch(displayModal)
    {
        case false:
            modalContainer.style.display = "block";
            print()
            displayModal = true;
            navegationButtonImage.src = mapIconURL;
            break;
        case true:
            modalContainer.style.display = "none";
            displayModal = false;
            break;
    }
}
function print (){
    latitud = data.records[id].fields.Latitude;
    longitud = data.records[id].fields.Longitude;
    mymap.setView([latitud, longitud], 15);
    img = data.records[id].fields.Picture[0].thumbnails.small.url;
    modalTitle.textContent = data.records[id].fields.Location;
    modalCountry.textContent = data.records[id].fields.Country;
    modalState.textContent = data.records[id].fields.State;
    modalAddress.textContent = data.records[id].fields.Address;
    modalCategory.textContent = data.records[id].fields.Category;
    modalPicture.src = img;
}
window.onload = getAirData()
console.log(browser);