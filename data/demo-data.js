/* ==================================================
   DEMO DATA

   Påhittad data för UI-demo.
   I skarpt läge kommer detta från API/databas.

   direction = vem som rapporterade avvikelsen
   status    = Ny | Under utredning | Åtgärdsplan | Åtgärdad
================================================== */

let deviations = [

{
    id: 1,
    type: "Saknad måltid",
    direction: "Beställare → Restaurang",
    createdByRole: "Beställare",
    createdBy: "Anna Karlsson",
    unit: "Adela Omsorg",
    date: "2026-03-02",
    status: "Ny",
    priority: "Hög",
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
    direction: "Beställare → Restaurang",
    createdByRole: "Beställare",
    createdBy: "Maria Lindgren",
    unit: "Björkgården Äldreboende",
    date: "2026-03-01",
    status: "Under utredning",
    priority: "Normal",
    description: "Maten var kall vid leverans kl 11:45. Uppmätt temperatur: 42°C (ska vara minst 60°C).",
    actionPlan: null,
    comments: [
        {
            author: "Maria Lindgren",
            role: "Beställare",
            text: "Vi mätte temperaturen direkt vid leverans. Se bifogad bild.",
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
    direction: "Beställare → Restaurang",
    createdByRole: "Beställare",
    createdBy: "Lars Ekström",
    unit: "Solgläntan Gruppboende",
    date: "2026-02-28",
    status: "Åtgärdsplan",
    priority: "Akut",
    description: "Brukare med glutenintolerans fick fel maträtt. Beställningen var tydligt markerad som glutenfri.",
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
            text: "Vi beklagar djupt. Har tagit fram en åtgärdsplan, se nedan.",
            time: "2026-02-28 15:30"
        },
        {
            author: "Lars Ekström",
            role: "Beställare",
            text: "Tack. Vi vill ha uppföljning senast 10 mars.",
            time: "2026-02-28 16:00"
        }
    ]
},

{
    id: 4,
    type: "Felaktig beställning",
    direction: "Restaurang → Beställare",
    createdByRole: "Restaurang",
    createdBy: "Erik Ström",
    unit: "Köket Brahem",
    date: "2026-03-01",
    status: "Ny",
    priority: "Normal",
    description: "Beställningen från Björkgården innehöll motstridiga uppgifter: 15 portioner angivna i systemet men 22 portioner i kommentarsfältet.",
    actionPlan: null,
    comments: [
        {
            author: "Erik Ström",
            role: "Restaurang",
            text: "Vi lagade 22 portioner för säkerhets skull men behöver tydligare rutiner.",
            time: "2026-03-01 08:15"
        }
    ]
},

{
    id: 5,
    type: "Sen beställning",
    direction: "Restaurang → Beställare",
    createdByRole: "Restaurang",
    createdBy: "Sara Nilsson",
    unit: "Köket Brahem",
    date: "2026-02-27",
    status: "Åtgärdad",
    priority: "Låg",
    description: "Beställning från Adela Omsorg inkom kl 09:30 istället för senast 08:00. Medförde stress i köket.",
    actionPlan: {
        cause: "Personal på enheten glömde skicka beställningen i tid.",
        action: "Påminnelserutin införd: automatiskt mejl kl 07:30 om beställning ej inskickad.",
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
            text: "Förstår helt. Vi inför en påminnelserutin direkt.",
            time: "2026-02-27 11:30"
        },
        {
            author: "Sara Nilsson",
            role: "Restaurang",
            text: "Toppen! Stänger denna som åtgärdad.",
            time: "2026-03-05 09:00"
        }
    ]
}

];
