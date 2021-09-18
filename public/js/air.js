// Script que consigue info de la API de Airtable
console.log('Conexion al JS de Airtable');
const API_KEY = 'key0xswwEgtvrbQ2J';
const Airtable_URL = `https://api.airtable.com/v0/appwBNFT7XIhOATPt/Locations?api_key=${API_KEY}`;

async function getAirData(){
    const response = await fetch(Airtable_URL);
    const data =  await response.json();
    let img = data.records[id].fields.Thumbnail[0].url;
    document.getElementById("location_title").textContent = data.records[id].fields.Name;
    document.getElementById('location_category').textContent = data.records[id].fields.Categoria;
    document.getElementById('location_description').textContent = data.records[id].fields.Address;
    document.getElementById('location_image').style.backgroundImage = `url("${img}")`;
    latitud = data.records[id].fields.Latitud;
    longitud = data.records[id].fields.Longitud;
    mymap.setView([latitud, longitud], 15);
    //console.log('Hola Mundo');
    /*for (const record of data.records) {
        console.log(record);
      }*/
}