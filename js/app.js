/* =================================================
APP LOGIC
Handles:

- rendering deviations
- creating deviations
- modal control

================================================= */


/* ================================================
RENDER DEVIATIONS
================================================ */

function renderDeviations(){

const container =
document.getElementById("deviationList")

container.innerHTML = ""


deviations.forEach(dev =>{

const card = document.createElement("div")
card.className = "deviation-card"


card.innerHTML = `

<h3>${dev.type}</h3>

<p><strong>Restaurang:</strong> ${dev.restaurant}</p>

<p><strong>Datum:</strong> ${dev.date}</p>

<p><strong>Skapad av:</strong> ${dev.createdBy}</p>

<p>${dev.description}</p>

<span class="badge badge-new">${dev.status}</span>

`

container.appendChild(card)

})

}



/* ================================================
OPEN MODAL
================================================ */

document
.getElementById("createDeviationBtn")
.onclick = function(){

document
.getElementById("createModal")
.classList.remove("hidden")

}



/* ================================================
CLOSE MODAL
================================================ */

document
.getElementById("closeModal")
.onclick = function(){

document
.getElementById("createModal")
.classList.add("hidden")

}



/* ================================================
SAVE NEW DEVIATION
================================================ */

document
.getElementById("saveDeviation")
.onclick = function(){

const newDeviation = {

id: Date.now(),

type:
document.getElementById("typeInput").value,

date:
document.getElementById("dateInput").value,

restaurant:
document.getElementById("restaurantInput").value,

description:
document.getElementById("descriptionInput").value,

createdBy:
document.getElementById("createdByInput").value,

status:"Ny",

comments:[]

}


deviations.push(newDeviation)

renderDeviations()

document
.getElementById("createModal")
.classList.add("hidden")

}



/* ================================================
INITIAL RENDER
================================================ */

renderDeviations()
