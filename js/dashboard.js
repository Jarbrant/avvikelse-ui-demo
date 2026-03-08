/* ==========================================================
   FILE: dashboard.js
   PURPOSE: Uppdaterar statistik-dashboard

   OBS: Tar emot en lista (t.ex. redan roll-filtrerad).
========================================================== */

function updateDashboard(list) {

  const items = Array.isArray(list) ? list : deviations;

  const total = items.length;

  const newCount = items.filter(d => d.status === "Ny").length;
  const progressCount = items.filter(d => d.status === "Under utredning").length;
  const actionCount = items.filter(d => d.status === "Åtgärdsplan").length;
  const resolvedCount = items.filter(d => d.status === "Åtgärdad").length;

  document.getElementById("totalCount").innerText = total;
  document.getElementById("newCount").innerText = newCount;
  document.getElementById("progressCount").innerText = progressCount;
  document.getElementById("actionCount").innerText = actionCount;
  document.getElementById("resolvedCount").innerText = resolvedCount;

}
