/* ==========================================================
   FILE: dashboard.js
   PURPOSE: Uppdaterar statistik-dashboard
========================================================== */

function updateDashboard() {

    const total = deviations.length;

    const newCount = deviations.filter(function(d) {
        return d.status === "Ny";
    }).length;

    const progressCount = deviations.filter(function(d) {
        return d.status === "Under utredning";
    }).length;

    const actionCount = deviations.filter(function(d) {
        return d.status === "Åtgärdsplan";
    }).length;

    const resolvedCount = deviations.filter(function(d) {
        return d.status === "Åtgärdad";
    }).length;


    document.getElementById("totalCount").innerText = total;
    document.getElementById("newCount").innerText = newCount;
    document.getElementById("progressCount").innerText = progressCount;
    document.getElementById("actionCount").innerText = actionCount;
    document.getElementById("resolvedCount").innerText = resolvedCount;

}
