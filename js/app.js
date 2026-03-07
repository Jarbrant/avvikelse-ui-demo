/* ==========================================================
   FILE: app.js
   PURPOSE: Huvudlogik – rendering, filtrering, modaler

   Depends on:
       data/demo-data.js
       js/dashboard.js
       js/comments.js
========================================================== */



/* ==========================================================
   RENDER
========================================================== */

function renderDeviations() {

    const container = document.getElementById("deviationList");
    container.innerHTML = "";

    /* ---------- Hämta filter ---------- */

    const searchVal = document.getElementById("searchInput").value.toLowerCase();
    const statusVal = document.getElementById("statusFilter").value;
    const dirVal = document.getElementById("directionFilter").value;
    const prioVal = document.getElementById("priorityFilter").value;

    /* ---------- Filtrera ---------- */

    const filtered = deviations.filter(function(dev) {

        if (statusVal && dev.status !== statusVal) return false;
        if (dirVal && dev.direction !== dirVal) return false;
        if (prioVal && dev.priority !== prioVal) return false;

        if (searchVal) {
            const hay = (
                dev.type + " " +
                dev.unit + " " +
                dev.description + " " +
                dev.createdBy
            ).toLowerCase();

            if (hay.indexOf(searchVal) === -1) return false;
        }

        return true;
    });


    /* ---------- Tom-state ---------- */

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><span>📭</span>Inga avvikelser matchar filtret</div>';
        updateDashboard();
        return;
    }


    /* ---------- Rendera kort ---------- */

    filtered.forEach(function(dev) {

        const card = document.createElement("div");
        card.className = "deviation-card priority-" + dev.priority;


        /* --- Status badge --- */

        let badgeClass = "badge-ny";
        if (dev.status === "Under utredning") badgeClass = "badge-progress";
        if (dev.status === "Åtgärdsplan") badgeClass = "badge-action";
        if (dev.status === "Åtgärdad") badgeClass = "badge-done";


        /* --- Kommentarer --- */

        let commentsHTML = "";

        dev.comments.forEach(function(c) {

            const avatarClass = c.role === "Beställare"
                ? "avatar-bestallare"
                : "avatar-restaurang";

            const bubbleClass = c.role === "Beställare"
                ? "from-bestallare"
                : "from-restaurang";

            const initial = c.role === "Beställare" ? "B" : "R";

            commentsHTML += `
                <div class="comment">
                    <div class="comment-avatar ${avatarClass}">${initial}</div>
                    <div class="comment-bubble ${bubbleClass}">
                        <div class="comment-author">
                            ${c.author} (${c.role})
                            <span class="comment-time">${c.time}</span>
                        </div>
                        <p class="comment-text">${c.text}</p>
                    </div>
                </div>
            `;
        });


        /* --- Åtgärdsplan --- */

        let actionHTML = "";

        if (dev.actionPlan) {
            actionHTML = `
                <div class="action-plan">
                    <h4>📝 Åtgärdsplan</h4>
                    <div class="action-plan-grid">
                        <div>
                            <div class="label">Orsaksanalys</div>
                            <div class="value">${dev.actionPlan.cause}</div>
                        </div>
                        <div>
                            <div class="label">Åtgärd</div>
                            <div class="value">${dev.actionPlan.action}</div>
                        </div>
                        <div>
                            <div class="label">Ansvarig</div>
                            <div class="value">${dev.actionPlan.responsible}</div>
                        </div>
                        <div>
                            <div class="label">Klart senast</div>
                            <div class="value">${dev.actionPlan.deadline}</div>
                        </div>
                    </div>
                </div>
            `;
        }


        /* --- Knappar --- */

        let actionsHTML = '<div class="card-actions">';

        if (dev.status === "Ny") {
            actionsHTML += `<button class="btn btn-sm btn-warning" onclick="changeStatus(${dev.id}, 'Under utredning')">🔍 Starta utredning</button>`;
        }

        if (dev.status === "Under utredning") {
            actionsHTML += `<button class="btn btn-sm btn-warning" onclick="openActionPlan(${dev.id})">📝 Skapa åtgärdsplan</button>`;
        }

        if (dev.status === "Åtgärdsplan") {
            actionsHTML += `<button class="btn btn-sm btn-success" onclick="changeStatus(${dev.id}, 'Åtgärdad')">✅ Markera som åtgärdad</button>`;
        }

        actionsHTML += '</div>';


        /* --- Bygg kort --- */

        card.innerHTML = `

            <div class="card-top">
                <div class="card-header">
                    <h3>${dev.type}</h3>
                    <div class="card-direction">${dev.direction} · ${dev.unit}</div>
                </div>
                <div class="card-badges">
                    <span class="badge ${badgeClass}">${dev.status}</span>
                    <span class="badge-priority badge-${dev.priority}">${dev.priority}</span>
                </div>
            </div>

            <div class="card-details">
                <span>Datum: <strong>${dev.date}</strong></span>
                <span>Skapad av: <strong>${dev.createdBy}</strong></span>
            </div>

            <div class="card-description">${dev.description}</div>

            ${actionHTML}

            <div class="comments-section">
                <h4>💬 Dialog (${dev.comments.length})</h4>
                ${commentsHTML}

                <div class="comment-input">
                    <input id="comment-${dev.id}" placeholder="Skriv ett svar...">
                    <button onclick="submitComment(${dev.id})">Skicka</button>
                </div>
            </div>

            ${actionsHTML}
        `;

        container.appendChild(card);
    });

    updateDashboard();
}



/* ==========================================================
   SUBMIT COMMENT
========================================================== */

function submitComment(id) {

    const input = document.getElementById("comment-" + id);
    const text = input.value;
    addComment(id, text);
}



/* ==========================================================
   STATUS CHANGE
========================================================== */

function changeStatus(id, newStatus) {

    const dev = deviations.find(function(d) {
        return d.id === id;
    });

    if (dev) {
        dev.status = newStatus;
        renderDeviations();
    }
}



/* ==========================================================
   ACTION PLAN MODAL
========================================================== */

let actionPlanTargetId = null;

function openActionPlan(id) {
    actionPlanTargetId = id;
    document.getElementById("causeInput").value = "";
    document.getElementById("actionInput").value = "";
    document.getElementById("responsibleInput").value = "";
    document.getElementById("deadlineInput").value = "";
    document.getElementById("actionModal").classList.remove("hidden");
}

document.getElementById("saveAction").onclick = function() {

    if (!actionPlanTargetId) return;

    const dev = deviations.find(function(d) {
        return d.id === actionPlanTargetId;
    });

    if (!dev) return;

    dev.actionPlan = {
        cause: document.getElementById("causeInput").value,
        action: document.getElementById("actionInput").value,
        responsible: document.getElementById("responsibleInput").value,
        deadline: document.getElementById("deadlineInput").value
    };

    dev.status = "Åtgärdsplan";

    document.getElementById("actionModal").classList.add("hidden");
    actionPlanTargetId = null;
    renderDeviations();
};

document.getElementById("closeActionModal").onclick = function() {
    document.getElementById("actionModal").classList.add("hidden");
};

document.getElementById("cancelActionModal").onclick = function() {
    document.getElementById("actionModal").classList.add("hidden");
};



/* ==========================================================
   CREATE DEVIATION MODAL
========================================================== */

document.getElementById("createDeviationBtn").onclick = function() {
    document.getElementById("dateInput").value = new Date().toISOString().slice(0, 10);
    document.getElementById("createModal").classList.remove("hidden");
};

document.getElementById("closeModal").onclick = function() {
    document.getElementById("createModal").classList.add("hidden");
};

document.getElementById("cancelModal").onclick = function() {
    document.getElementById("createModal").classList.add("hidden");
};

document.getElementById("saveDeviation").onclick = function() {

    const role = document.getElementById("roleSelect").value;

    const authorName = role === "Beställare"
        ? "Anna Karlsson"
        : "Erik Ström";

    const newDeviation = {
        id: Date.now(),
        type: document.getElementById("typeInput").value,
        direction: document.getElementById("directionInput").value,
        createdByRole: role,
        createdBy: authorName,
        unit: document.getElementById("unitInput").value,
        date: document.getElementById("dateInput").value,
        status: "Ny",
        priority: document.getElementById("priorityInput").value,
        description: document.getElementById("descriptionInput").value,
        actionPlan: null,
        comments: []
    };

    deviations.unshift(newDeviation);

    document.getElementById("createModal").classList.add("hidden");
    renderDeviations();
};



/* ==========================================================
   FILTER LISTENERS
========================================================== */

document.getElementById("searchInput").addEventListener("input", renderDeviations);
document.getElementById("statusFilter").addEventListener("change", renderDeviations);
document.getElementById("directionFilter").addEventListener("change", renderDeviations);
document.getElementById("priorityFilter").addEventListener("change", renderDeviations);



/* ==========================================================
   INITIAL LOAD
========================================================== */

renderDeviations();
