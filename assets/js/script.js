import { getPersonajes } from "./consultas/getPersonajes.js ";

const enviarDatos = async (id,name,image,species,status,nameLocation) => {
    const rutaArchivoHTMl = "../personajes.html";

    fetch(rutaArchivoHTMl)
        .then( response => response.text())
        .then((html) => {
            const parser = new DOMParser();

            const doc = parser.parseFromString(html, "text/html")

            const imagePage = doc.getElementById("imagePage")
            imagePage.src = image;
            imagePage.alt = `Foto con nombre de : ${name}`

            const namePage = doc.getElementById("namePage")
            namePage.textContent = `Nombre: ${name}`;

            const speciesPage = doc.getElementById("speciesPage")
            speciesPage.textContent = `Specie: ${species}`

            const statusPage = doc.getElementById("statusPage")
            statusPage.textContent = `Estado: ${status}`

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;
        })
        .catch(error =>{
            console.log(`El error es : ${error}`)
        })
}

const createCard = (results = []) => {

    let personajesRow = document.getElementById("personajesRow")

    results.map((result) =>{

        const {id,name,image,species,status,location =""} = result;
        const {name : nameLocation , url } = location;

        const divRow = document.createElement("div");
        divRow.classList.add("col-xl-3")
        divRow.classList.add("col-lg-3")
        divRow.classList.add("col-md-3")
        divRow.classList.add("col-sm-12")
        divRow.classList.add("col-xs-12")
        divRow.classList.add("mt-2")
        divRow.classList.add("mb-2")

        const card = document.createElement("div")
        card.classList.add("card" ,"mt-3")

        const img = document.createElement("img")
        img.src = image;
        img.alt = name;
        img.classList.add("card-img-top")

        const divBody = document.createElement("div")
        divBody.classList.add("card-body")

        const title = document.createElement("h5")
        title.classList.add("card-title")
        title.textContent=name;

        const subTitle = document.createElement("p")
        subTitle.classList.add("card-text")
        subTitle.textContent=species;

        const estado = document.createElement("p")
        estado.classList.add("card-text")
        estado.textContent=status;

        const botonVer = document.createElement("button")
        botonVer.classList.add("btn" , "btn-success")
        botonVer.textContent="Ver detalles"
        botonVer.addEventListener("click" , () => {
            enviarDatos(id,name,image,species,status,location)
        })

        divBody.appendChild(title);
        divBody.appendChild(subTitle)
        divBody.appendChild(estado)
        divBody.appendChild(botonVer)

        card.appendChild(img)
        card.appendChild(divBody)
        divRow.appendChild(card)

        personajesRow.appendChild(divRow)

    })

}

getPersonajes()
    .then (data => createCard(data))
    .catch (error => console.log(`El error es : ${error}`))


