/* ==========================================================
   FILE: comments.js
   PURPOSE: Hanterar kommentarer / dialog på avvikelser
========================================================== */

function addComment(id, text) {

    if (!text || text.trim() === "") {
        return;
    }

    const deviation = deviations.find(function(d) {
        return d.id === id;
    });

    if (!deviation) {
        return;
    }

    /* Hämta aktiv roll */
    const role = document.getElementById("roleSelect").value;

    const authorName = role === "Beställare"
        ? "Anna Karlsson"
        : "Erik Ström";

    /* Skapa tidsstämpel */
    const now = new Date();
    const timeStr =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + " " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    const newComment = {
        author: authorName,
        role: role,
        text: text,
        time: timeStr
    };

    deviation.comments.push(newComment);

    renderDeviations();
}
