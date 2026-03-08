/* ==========================================================
   FILE: app.js
   PURPOSE: Huvudlogik – rendering, roll-vy, filtrering, modaler

   Depends on:
     data/demo-data.js (ORGS + deviations)
     js/dashboard.js   (updateDashboard(list))
     js/comments.js    (addComment)
========================================================== */


/* ==========================================================
   ROLL / CONTEXT
========================================================== */

function getContext() {

  const role = document.getElementById("roleSelect").value;

  if (role === "Beställare") {
    return {
      role: "Beställare",
      myOrg: ORGS.ordererOrg,
      counterpartDefault: ORGS.restaurantOrg
    };
  }

  return {
    role: "Restaurang",
    myOrg: ORGS.restaurantOrg,
    counterpartDefault: ORGS.ordererOrg
  };
}

function isRelevantToCurrentUser(dev) {
  const ctx = getContext();
  return dev.reporterOrg === ctx.myOrg || dev.targetOrg === ctx.myOrg;
}


/* ==========================================================
   RENDER
========================================================== */

function renderDeviations() {

  const container = document.getElementById("deviationList");
  container.innerHTML = "";

  const ctx = getContext();

  /* --- Filter inputs --- */
  const searchVal = document.getElementById("searchInput").value.toLowerCase();
  const statusVal = document.getElementById("statusFilter").value;
  const dirVal = document.getElementById("directionFilter").value; // valfri: visar riktning
  const prioVal = document.getElementById("priorityFilter").value;

  /* --- Baslista: bara relevanta ärenden --- */
  let list = deviations.filter(isRelevantToCurrentUser);

  /* --- Beräkna direction för display/filter --- */
  list = list.map(function(dev) {

    const direction = dev.reporterRole === "Beställare"
      ? "Beställare → Restaurang"
      : "Restaurang → Beställare";

    return {
      ...dev,
      direction
    };
  });

  /* --- Filter --- */
  const filtered = list.filter(function(dev) {

    if (statusVal && dev.status !== statusVal) return false;
    if (dirVal && dev.direction !== dirVal) return false;
    if (prioVal && dev.priority !== prioVal) return false;

    if (searchVal) {
      const hay = (
        dev.type + " " +
        dev.reporterOrg + " " +
        dev.targetOrg + " " +
        dev.description + " " +
        dev.createdBy
      ).toLowerCase();

      if (!hay.includes(searchVal)) return false;
    }

    return true;
  });

  /* --- Empty state --- */
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state"><span>📭</span>Inga avvikelser matchar filtret</div>';
    updateDashboard(filtered);
    return;
  }

  /* --- Render cards --- */
  filtered.forEach(function(dev) {

    const card = document.createElement("div");
    card.className = "deviation-card priority-" + dev.priority;

    /* status badge */
    let badgeClass = "badge-ny";
    if (dev.status === "Under utredning") badgeClass = "badge-progress";
    if (dev.status === "Åtgärdsplan") badgeClass = "badge-action";
    if (dev.status === "Åtgärdad") badgeClass = "badge-done";

    /* action plan */
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

    /* comments */
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

    /* actions */
    let actionsHTML = '<div class="card-actions">';

    /* Exempelregel: köket jobbar oftast med utredning/åtgärdsplan,
       men båda kan se knapparna i demo. Vill du rollstyra dem senare så gör vi det. */
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

    /* Build card */
    const counterpartLabel = ctx.role === "Beställare" ? "Restaurang" : "Beställare";

    card.innerHTML = `
      <div class="card-top">
        <div class="card-header">
          <h3>${dev.type}</h3>
          <div class="card-direction">
            ${dev.direction} · ${dev.reporterOrg} → ${dev.targetOrg}
          </div>
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

  updateDashboard(filtered);
}


/* ==========================================================
   COMMENTS
========================================================== */

function submitComment(id) {
  const input = document.getElementById("comment-" + id);
  const text = input.value;
  addComment(id, text);
}


/* ==========================================================
   STATUS
========================================================== */

function changeStatus(id, newStatus) {
  const dev = deviations.find(d => d.id === id);
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

  const dev = deviations.find(d => d.id === actionPlanTargetId);
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

function openCreateModal() {
  const ctx = getContext();

  document.getElementById("dateInput").value = new Date().toISOString().slice(0, 10);

  /* Förifyll "motpart" */
  const targetEl = document.getElementById("targetOrgInput");
  if (targetEl) {
    targetEl.value = ctx.counterpartDefault;
  }

  document.getElementById("createModal").classList.remove("hidden");
}

document.getElementById("createDeviationBtn").onclick = openCreateModal;

document.getElementById("closeModal").onclick = function() {
  document.getElementById("createModal").classList.add("hidden");
};

document.getElementById("cancelModal").onclick = function() {
  document.getElementById("createModal").classList.add("hidden");
};

document.getElementById("saveDeviation").onclick = function() {

  const ctx = getContext();

  const authorName = ctx.role === "Beställare" ? "Anna Karlsson" : "Erik Ström";

  const targetOrg = document.getElementById("targetOrgInput").value;

  const newDeviation = {
    id: Date.now(),
    type: document.getElementById("typeInput").value,

    reporterRole: ctx.role,
    reporterOrg: ctx.myOrg,
    targetOrg: targetOrg,

    createdBy: authorName,
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
   FILTER LISTENERS + ROLE LISTENER
========================================================== */

document.getElementById("searchInput").addEventListener("input", renderDeviations);
document.getElementById("statusFilter").addEventListener("change", renderDeviations);
document.getElementById("directionFilter").addEventListener("change", renderDeviations);
document.getElementById("priorityFilter").addEventListener("change", renderDeviations);

/* När man byter roll: rendera om (ny vy + ny dashboard) */
document.getElementById("roleSelect").addEventListener("change", function() {
  renderDeviations();
});


/* ==========================================================
   INITIAL LOAD
========================================================== */

renderDeviations();
