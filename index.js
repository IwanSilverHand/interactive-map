// Aquí mando a llamar 'dotenv'
require('dotenv').config()

// Llave de Airtable desde .env
const API_KEY = process.env.API_KEY;

// Aqui mando a llamar "Express"
const express = require ('express');
const app = express()
const port = 3000

// Script para cargar pagina en el puerto 3000.
app.use(express.static ('public'));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Aquí mando a llamar Airtable
/*
const Airtable_API_KEY = 'key0xswwEgtvrbQ2J';
const Airtable_API = `https://api.airtable.com/v0/appwBNFT7XIhOATPt/Locations?api_key=${Airtable_API_KEY}`;


async function GetData (){
  import fetch from 'node-fetch';
  const response = await fetch (Airtable_API);
  const json = await response.json();
  console.log(json);
}

GetData()
*/