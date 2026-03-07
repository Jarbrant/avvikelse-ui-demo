/* ==========================================================
FILE: dashboard.js
PURPOSE:
Handles statistics shown in the dashboard section.

This file calculates:

- total deviations
- new deviations
- in progress
- resolved

NOTE:
Uses global array "deviations"
defined in data/demo-data.js
========================================================== */


/* ==========================================================
FUNCTION
updateDashboard()

Updates the numbers shown in the dashboard cards
========================================================== */

function updateDashboard(){

    /* ------------------------------------------------------
    TOTAL DEVIATIONS
    ------------------------------------------------------ */

    const total =
    deviations.length


    /* ------------------------------------------------------
    NEW DEVIATIONS
    ------------------------------------------------------ */

    const newCount =
    deviations.filter(function(d){

        return d.status === "Ny"

    }).length


    /* ------------------------------------------------------
    UNDER INVESTIGATION
    ------------------------------------------------------ */

    const progressCount =
    deviations.filter(function(d){

        return d.status === "Under utredning"

    }).length


    /* ------------------------------------------------------
    RESOLVED
    ------------------------------------------------------ */

    const resolvedCount =
    deviations.filter(function(d){

        return d.status === "Åtgärdad"

    }).length


    /* ------------------------------------------------------
    UPDATE UI
    ------------------------------------------------------ */

    document.getElementById("totalCount").innerText =
    total


    document.getElementById("newCount").innerText =
    newCount


    document.getElementById("progressCount").innerText =
    progressCount


    document.getElementById("resolvedCount").innerText =
    resolvedCount

}
