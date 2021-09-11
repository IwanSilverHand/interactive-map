console.log('Conexion al JS de Airtable');
const API_KEY = 'key0xswwEgtvrbQ2J';
const Airtable_URL = `https://api.airtable.com/v0/appwBNFT7XIhOATPt/Locations?api_key=${API_KEY}`;

async function getAirData(){
    let num = Math.floor(Math.random()*4);
    const response = await fetch(Airtable_URL);
    const data =  await response.json();
    let img = data.records[num].fields.Thumbnail[0].url;
    document.getElementById("location_title").textContent = data.records[num].fields.Name;
    document.getElementById('location_category').textContent = data.records[num].fields.Categoria;
    document.getElementById('location_description').textContent = data.records[num].fields.City;
    document.getElementById('location_image').style.backgroundImage = "url(" + img + ")";
}

getAirData();