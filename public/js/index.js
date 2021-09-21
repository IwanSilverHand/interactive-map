// Definir variables y ligar objetos del DOM a variables"
const modal = document.querySelector("#modal");
const navbar = document.querySelector(".navbar");
let modalValue = false;
let id;
let latitud;
let longitud;
let response;
let data;
let img;

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
let mymap = L.map('mapid');

//Aquí inicializo el mapa consigo la ubicación.
navigator.geolocation.getCurrentPosition(function(position){
  latitud = position.coords.latitude;
  longitud = position.coords.longitude;

  //Esto ajusta el mapa y a la ubicación del dispositivo.
  mymap.setView([latitud, longitud], 13);
  tiles.addTo(mymap);
  //L.marker([latitud,longitud]).addTo(map);
  L.marker([latitud, longitud]).addTo(mymap);
  //console.log(latitud,longitud);
});

//Esta función revisa que boton hizo click
navbar.addEventListener("click", e => {
  const target = e.target.closest(".w-button"); // see if the click landed inside a button
  if (!target) return; // bail if it wasn't inside a button
  // do stuff with target here (target is now the button that was clicked on)
  id = target.dataset.index;
  openModal()
})

// Funcion que trae los datos de Airtable.
async function getAirData(){
  const API_KEY = 'key0xswwEgtvrbQ2J';
  const Airtable_URL = `https://api.airtable.com/v0/appwBNFT7XIhOATPt/Locations?api_key=${API_KEY}`;
  response = await fetch(Airtable_URL);
  data =  await response.json();
  //Loop que genera los botones.
    for (let i = 0; i < data.records.length; i++) {
      let newButton = document.createElement('div');
      newButton.setAttribute('class','w-button');
      newButton.innerText = data.records[i].fields.Location;
      newButton.setAttribute('data-index', i);
      navbar.appendChild(newButton);
      // Esto genera los pines.
      let pinLat = data.records[i].fields.Latitude;
      let pinLon = data.records[i].fields.Longitude;
      L.marker([pinLat, pinLon]).addTo(mymap);
    }

}

// Función que abre el Modal
function openModal()
{
    switch(modalValue)
    {
        case false:
            print()
            modal.style.display = "flex";
            modalValue = true;
            break;

        case true:
            modal.style.display = "none";
            modalValue = false;
            break;
    }
}

// Esta funcion imprime los datos del modal
function print(){
  // Aqui se imprimen los datos de airtable.
  document.getElementById("location_title").textContent = data.records[id].fields.Location;
  document.getElementById('location_category').textContent = data.records[id].fields.Category;
  document.getElementById('location_description').textContent = data.records[id].fields.Address;
  img = data.records[id].fields.Picture[0].url;
  document.getElementById('location_image').style.backgroundImage = `url("${img}")`;
  latitud = data.records[id].fields.Latitude;
  longitud = data.records[id].fields.Longitude;
  mymap.setView([latitud, longitud], 15);
  //
  var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
  layer.openPopup();
  layer.closePopup();
}

window.onload = getAirData()
// Ctlr + K + C para comentar lineas de codigo

mymap.on('click', function(ev) {
  //alert(ev.latlng); // ev is an event object (MouseEvent in this case)
  //console.log(ev.latlng);
  //console.log(ev.latlng.lat
  var layer = L.Polygon([latitud,longitud]).bindPopup('Hi There!').addTo(map);
  layer.openPopup();
  layer.closePopup();
});