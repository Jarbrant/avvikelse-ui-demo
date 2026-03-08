/* ==================================================
   DEMO DATA (VERSION 2)

   Nyckelidé:
   - reporterOrg  = organisationen som rapporterar avvikelsen
   - targetOrg    = organisationen som avvikelsen gäller (mottagare/motpart)
   - reporterRole = Beställare | Restaurang

   Roll-vy:
   - Beställare ser ärenden där reporterOrg === beställareOrg OR targetOrg === beställareOrg
   - Restaurang ser ärenden där reporterOrg === restaurangOrg OR targetOrg === restaurangOrg
================================================== */

/* "Inloggade" organisationer (demo) */
const ORGS = {
  ordererOrg: "Adela Omsorg",
  restaurantOrg: "Köket Brahem"
};

let deviations = [
  {
    id: 1,
    type: "Saknad måltid",
    reporterRole: "Beställare",
    reporterOrg: "Adela Omsorg",
    targetOrg: "Köket Brahem",
    date: "2026-03-02",
    status: "Ny",
    priority: "Hög",
    createdBy: "Anna Karlsson",
    description: "En matlåda saknades helt i dagens leverans till avdelning 3. Brukaren fick ingen lunch.",
    actionPlan: null,
    comments: [
      {
        author: "Anna Karlsson",
        role: "Beställare",
        text: "Brukaren fick äta smörgås istället. Behöver svar snarast.",
        time: "2026-03-02 12:30"
      }
    ]
  },

  {
    id: 2,
    type: "Fel temperatur",
    reporterRole: "Beställare",
    reporterOrg: "Björkgården Äldreboende",
    targetOrg: "Köket Brahem",
    date: "2026-03-01",
    status: "Under utredning",
    priority: "Normal",
    createdBy: "Maria Lindgren",
    description: "Maten var kall vid leverans kl 11:45. Uppmätt temperatur: 42°C (ska vara minst 60°C).",
    actionPlan: null,
    comments: [
      {
        author: "Maria Lindgren",
        role: "Beställare",
        text: "Vi mätte temperaturen direkt vid leverans.",
        time: "2026-03-01 12:00"
      },
      {
        author: "Erik Ström",
        role: "Restaurang",
        text: "Vi undersöker transportrutinerna. Kan ha berott på försenad avfärd.",
        time: "2026-03-01 14:15"
      }
    ]
  },

  {
    id: 3,
    type: "Allergi/specialkost",
    reporterRole: "Beställare",
    reporterOrg: "Solgläntan Gruppboende",
    targetOrg: "Köket Brahem",
    date: "2026-02-28",
    status: "Åtgärdsplan",
    priority: "Akut",
    createdBy: "Lars Ekström",
    description: "Brukare med glutenintolerans fick fel maträtt. Beställningen var markerad som glutenfri.",
    actionPlan: {
      cause: "Felaktig märkning vid packning. Glutenfri-etiketten saknades på lådan.",
      action: "Införa dubbel kontroll av specialkost vid packning. Ny checklista skapas.",
      responsible: "Kökschef Erik Ström",
      deadline: "2026-03-10"
    },
    comments: [
      {
        author: "Lars Ekström",
        role: "Beställare",
        text: "Det här är allvarligt. Brukaren mådde illa men behövde inte söka vård.",
        time: "2026-02-28 13:00"
      },
      {
        author: "Erik Ström",
        role: "Restaurang",
        text: "Vi beklagar djupt. Åtgärdsplan finns nu i ärendet.",
        time: "2026-02-28 15:30"
      }
    ]
  },

  /* Viktigt: Avvikelse skapad av KÖKET mot BESTÄLLAREN (Adela Omsorg) */
  {
    id: 4,
    type: "Felaktig beställning",
    reporterRole: "Restaurang",
    reporterOrg: "Köket Brahem",
    targetOrg: "Adela Omsorg",
    date: "2026-03-01",
    status: "Ny",
    priority: "Normal",
    createdBy: "Erik Ström",
    description: "Beställningen innehöll motstridiga uppgifter: 15 portioner i systemet men 22 portioner i kommentarsfältet.",
    actionPlan: null,
    comments: [
      {
        author: "Erik Ström",
        role: "Restaurang",
        text: "Vi lagade 22 portioner för säkerhets skull men behöver tydligare rutin.",
        time: "2026-03-01 08:15"
      }
    ]
  },

  {
    id: 5,
    type: "Sen beställning",
    reporterRole: "Restaurang",
    reporterOrg: "Köket Brahem",
    targetOrg: "Adela Omsorg",
    date: "2026-02-27",
    status: "Åtgärdad",
    priority: "Låg",
    createdBy: "Sara Nilsson",
    description: "Beställning inkom kl 09:30 istället för senast 08:00. Medförde stress i köket.",
    actionPlan: {
      cause: "Personal på enheten glömde skicka beställningen i tid.",
      action: "Påminnelserutin införd (intern rutin).",
      responsible: "Enhetschef Anna Karlsson",
      deadline: "2026-03-05"
    },
    comments: [
      {
        author: "Sara Nilsson",
        role: "Restaurang",
        text: "Det här händer återkommande. Vi behöver en lösning.",
        time: "2026-02-27 10:00"
      },
      {
        author: "Anna Karlsson",
        role: "Beställare",
        text: "Vi inför påminnelserutin direkt.",
        time: "2026-02-27 11:30"
      },
      {
        author: "Sara Nilsson",
        role: "Restaurang",
        text: "Bra. Markerar som åtgärdad.",
        time: "2026-03-05 09:00"
      }
    ]
  }
];
