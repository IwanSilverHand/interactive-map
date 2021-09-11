// Ligar al API
const API_URL = "https://jsonplaceholder.typicode.com/users/1";
const request = new XMLHttpRequest();
let num;

// Ctlr + K + C para comentar lineas de codigo
// Ligar objetos del DOM a variables"
// let picture = document.querySelector("#location_image");
// let title = document.querySelector("#location_title");
// let category = document.querySelector("#location_category");
// let description = document.querySelector("#location_description");

//Aquí ligo el boton de "Prueba"
let toogle = document.querySelector("#toogle");
toogle.addEventListener("click",openModal,false);

//Aquí ligo el "Modal"
let modal = document.querySelector("#modal");
let modalValue = false;

// Función que abre el Modal
function openModal()
{
    getAirData()
    /*
    request.addEventListener("load",requestData);
    request.open('GET', `${API_URL}/users`);
    request.send();
    */
    
    // Codigo que muestra el Modal
    switch(modalValue)
    {
        case false:
            modal.style.display = "flex";
            modalValue = true;
            break;
        case true:
            modal.style.display = "none";
            modalValue = false;
            break;
    }
}

// Funcion que hace el Request
/*
function requestData(){
    if (this.readyState === 4 && this.status === 200){
        const apiData = JSON.parse(this.response);
        num = Math.floor(Math.random() * 10);
        location_title.innerHTML = apiData[num].name;
        location_category.innerHTML = apiData[num].address.zipcode;
        location_description.innerHTML = apiData[num].company.catchPhrase;
        };
}
*/