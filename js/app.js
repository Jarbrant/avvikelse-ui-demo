/* ==========================================================
FILE: app.js
PURPOSE:
Main application logic for the deviation UI demo.

Handles:
- rendering deviations
- creating deviations
- modal controls
- submitting comments

Depends on:
data/demo-data.js
js/comments.js
js/dashboard.js
========================================================== */



/* ==========================================================
FUNCTION
renderDeviations()

Creates the UI cards for all deviations.
========================================================== */

function renderDeviations(){

    const container =
    document.getElementById("deviationList")

    container.innerHTML = ""


    deviations.forEach(function(dev){

        /* --------------------------------------------------
        Create card element
        -------------------------------------------------- */

        const card =
        document.createElement("div")

        card.className =
        "deviation-card"



        /* --------------------------------------------------
        Render comments
        -------------------------------------------------- */

        let commentsHTML = ""

        dev.comments.forEach(function(comment){

            commentsHTML += `

            <div class="comment">

                <strong>${comment.author}</strong>

                <p>${comment.text}</p>

            </div>

            `

        })



        /* --------------------------------------------------
        Build card HTML
        -------------------------------------------------- */

        card.innerHTML = `

        <div class="card-header">

            <h3>${dev.type}</h3>

            <span class="priority">${dev.priority}</span>

        </div>

        <p>
        <strong>Restaurang:</strong>
        ${dev.restaurant}
        </p>

        <p>
        <strong>Datum:</strong>
        ${dev.date}
        </p>

        <p>
        <strong>Skapad av:</strong>
        ${dev.createdBy}
        </p>

        <p>${dev.description}</p>


        ${commentsHTML}


        <div class="comment-input">

            <input
            id="comment-${dev.id}"
            placeholder="Skriv svar..."
            >

            <button
            onclick="submitComment(${dev.id})"
            >
            Svara
            </button>

        </div>

        `


        /* --------------------------------------------------
        Add card to container
        -------------------------------------------------- */

        container.appendChild(card)

    })


    /* ------------------------------------------------------
    Update dashboard statistics
    ------------------------------------------------------ */

    updateDashboard()

}




/* ==========================================================
FUNCTION
submitComment()

Triggered when user clicks "Svara".
========================================================== */

function submitComment(id){

    const input =
    document.getElementById(`comment-${id}`)

    const text =
    input.value

    addComment(id, text)

}



/* ==========================================================
CREATE NEW DEVIATION
========================================================== */

document
.getElementById("saveDeviation")
.onclick = function(){

    /* ------------------------------------------------------
    Build new deviation object
    ------------------------------------------------------ */

    const newDeviation = {

        id: Date.now(),

        type:
        document.getElementById("typeInput").value,

        priority:
        document.getElementById("priorityInput").value,

        date:
        document.getElementById("dateInput").value,

        restaurant:
        document.getElementById("restaurantInput").value,

        description:
        document.getElementById("descriptionInput").value,

        createdBy:
        document.getElementById("createdByInput").value,

        status: "Ny",

        comments: []

    }


    /* ------------------------------------------------------
    Add to global array
    ------------------------------------------------------ */

    deviations.push(newDeviation)



    /* ------------------------------------------------------
    Refresh UI
    ------------------------------------------------------ */

    renderDeviations()



    /* ------------------------------------------------------
    Close modal
    ------------------------------------------------------ */

    document
    .getElementById("createModal")
    .classList.add("hidden")

}



/* ==========================================================
MODAL CONTROL
========================================================== */

document
.getElementById("createDeviationBtn")
.onclick = function(){

    document
    .getElementById("createModal")
    .classList.remove("hidden")

}



document
.getElementById("closeModal")
.onclick = function(){

    document
    .getElementById("createModal")
    .classList.add("hidden")

}



/* ==========================================================
INITIAL PAGE LOAD
========================================================== */

renderDeviations()
