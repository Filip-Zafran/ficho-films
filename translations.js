// Supported languages
let currentLang = localStorage.getItem("lang") || "en";

const translations = {
  en: {
    // === INDEX (Homepage) ===
    welcome_mobile: "Welcome to Ficho's Film Production Portfolio Page",
    intro_mobile: "As everything in the film industry, this page also looks much better on a larger screen.",
    roles_heading: "Roles & Credits",
    all_projects: "All Projects",
    assistant_director: "Assistant Director",
    location_manager: "Location Scout / Manager",
    production: "Production",
    coordinator: "Production Coordinator",
    manager: "Production Manager",
    producer: "Producer",
    event_manager: "Event Manager",
    featured_projects: "Featured Projects",
    all_projects_heading: "All Projects",
    tagline_locations: "Locations.",
    tagline_locked: "Locked.",
    tagline_action: "Action!",

    // === CONTACT PAGE ===
    contact_get_in_touch: "Get in Touch",
    contact_intro: "Please send me a short e-mail below - I normally respond in a few hours!",
    send_message: "Send Message",
    name_label: "Name",
    email_label: "Email",
    message_label: "Message",
    contact_success: "Thank you! Your message has been sent.",

    // Contact buttons
    btn_imdb: "View my IMDb Profile",
    btn_linkedin: "Connect on LinkedIn",
    btn_crew_united: "Crew United",

    // === ABOUT PAGE ===
    about_title: "About Ficho",
    about_subtitle: "Filmmaker, fixer, and production problem-solver.",
    key_roles: "Key Roles",
    key_skills: "Key Skills",
    languages: "Languages",
    locations_berlin: "Locations Berlin",
    locations_croatia: "Locations Croatia",
    behind_scenes: "Behind the Scenes",
    based_in_berlin: "Based in Berlin – shooting across Europe",

    about_text_1: `I'm Filip "Ficho" Zafran — filmmaker, location specialist and production all-rounder 
    with roots in Croatia and a base in Berlin. My background spans across 
    Assistant Directing, Location Scouting / Management, Production Coordination 
    and application & presentation preparation for productions.`,

    about_text_2: `I’ve worked on international feature films, European productions, TVCs, 
    and branded content.`,

    about_text_3: `My focus lies in managing Call-Sheets, running set operations, scouting the right 
    locations, and keeping departments aligned under pressure. I’m happiest when 
    things are moving fast.`,

    about_text_4: `In addition, I have a <b>background in web development and my IT knowledge</b> often 
    comes in handy when dealing with digital workflows, planning, and bidding. 
    I use these skills to improve efficiency and reduce costs on productions 
    whenever possible.`,

    about_text_5: `If there is one word that describes me best, it's reliability.`,

    about_text_6: `Why was I scouting the Tatras by helicopter at 22yo?<br>
    Because when things get complex and difficult, people know they can count on me.`,

    key_skills: "Key Skills",
    languages: "Languages",

    role_2nd_ad: "2nd AD",
    role_casting_manager: "Casting Manager",
    role_unit_manager: "Unit Manager",
    role_prod_coordinator: "Prod. Coordinator",
    role_prod_manager: "Prod. Manager",
    role_location_manager_scout: "Location Manager / Scout",

    skill_scouting: "Scouting",
    skill_presentations: "Presentations",
    skill_bidding: "Bidding",
    skill_budgeting: "Budgeting",
    skill_planning: "Planning",
    skill_set_coordination: "Set Coordination",
    skill_team_coordination: "Team Lead & Coordination",
    skill_communication: "Communication",
    skill_negotiation: "Negotiation & Conflict Resolution",

    lang_german: "German",
    lang_english: "English",
    lang_croatian: "Croatian",

    gallery_hint: "Click to open • click to close",


    // === NAVIGATION ===
    nav_projects: "Projects",
    nav_about: "About Me",
    nav_contact: "Contact",
    key_roles: "Key Roles",

  },

  de: {
    // === INDEX ===
    welcome_mobile: "Willkommen auf Fichos Filmproduktions-Portfolio-Seite",
    intro_mobile: "Wie alles in der Filmbranche sieht auch diese Seite auf einem größeren Bildschirm viel besser aus.",
    roles_heading: "Rollen & Credits",
    all_projects: "Alle Projekte",
    assistant_director: "Regieassistenz",
    location_manager: "Location Scout / Manager",
    production: "Produktion",
    coordinator: "Produktionskoordinator",
    manager: "Produktionsleiter",
    producer: "Producer",
    event_manager: "Eventmanager",
    featured_projects: "Ausgewählte Projekte",
    all_projects_heading: "Alle Projekte",
    tagline_locations: "Locations.",
    tagline_locked: "Locked.",
    tagline_action: "Action!",

    // === CONTACT PAGE ===
    contact_get_in_touch: "Kontakt aufnehmen",
    contact_intro: "Bitte schreib mir eine kurze Nachricht – ich antworte normalerweise innerhalb weniger Stunden.",
    send_message: "Nachricht senden",
    name_label: "Name",
    email_label: "E-Mail",
    message_label: "Nachricht",
    contact_success: "Danke! Deine Nachricht wurde gesendet.",

    // Contact buttons
    btn_imdb: "Mein IMDb-Profil",
    btn_linkedin: "LinkedIn",
    btn_crew_united: "Crew United",

    // === ABOUT PAGE ===
    about_title: "Über Ficho",
    about_subtitle: "Filmemacher, Fixer und Produktions-Problemlöser.",
    key_roles: "Wichtige Rollen",
    key_skills: "Wichtige Fähigkeiten",
    languages: "Sprachen",
    locations_berlin: "Locations Berlin",
    locations_croatia: "Locations Kroatien",
    behind_scenes: "Hinter den Kulissen",
    based_in_berlin: "Mit Sitz in Berlin – Drehs in ganz Europa",

    // ABOUT PAGE TAGS
    about_text_1: `Ich bin Filip „Ficho“ Zafran – Filmemacher, Location-Spezialist und vielseitiger 
    Produktionsallrounder mit Wurzeln in Kroatien und einem Standort in Berlin. 
    Mein beruflicher Hintergrund umfasst Regieassistenz, Location Scouting / Management, 
    Produktionskoordination sowie Bewerbungs- und Präsentationsvorbereitung für Produktionen.`,

    about_text_2: `Ich habe an internationalen Spielfilmen, europäischen Produktionen, TV-Werbungen 
    und Branded-Content-Projekten gearbeitet.`,

    about_text_3: `Mein Schwerpunkt liegt auf der Erstellung von Dispos, dem reibungslosen Ablauf 
    am Set, der Suche nach den passenden Drehorten und der Abstimmung der einzelnen 
    Departments unter hohem Druck. Am glücklichsten bin ich, wenn eine Produktion Tempo 
    aufnimmt und alles in Bewegung bleibt.`,

    about_text_4: `Zusätzlich habe ich einen <b>Hintergrund in Webentwicklung, und mein IT-Wissen</b> hilft 
    mir regelmäßig bei digitalen Workflows, in der Planung und beim Bidding. 
    Ich nutze diese Fähigkeiten, um Abläufe effizienter zu gestalten und Kosten zu 
    reduzieren – wo immer es möglich ist.`,

 
    about_text_5: `Wenn es ein Wort gibt, das mich am besten beschreibt, dann ist es Zuverlässigkeit.`,

    about_text_6: `Warum ich mit 22 Jahren die Tatra-Gebirge per Helikopter gescoutet habe?<br>
    Weil Menschen wissen, dass sie sich auf mich verlassen können – besonders wenn es 
    komplex und schwierig wird.`,


    key_roles: "Wichtige Rollen",
    key_skills: "Wichtige Fähigkeiten",
    languages: "Sprachen",

    // Roles list
    role_2nd_ad: "2. Regieassistenz",
    role_casting_manager: "Casting-Manager",
    role_unit_manager: "Aufnahmeleiter / Unit Manager",
    role_prod_coordinator: "Produktionskoordinator",
    role_prod_manager: "Produktionsleiter",
    role_location_manager_scout: "Location Manager / Scout",

    // Skills list
    skill_scouting: "Location Scouting",
    skill_presentations: "Präsentationen",
    skill_bidding: "Kostenkalkulation / Bidding",
    skill_budgeting: "Budgetierung",
    skill_planning: "Planung",
    skill_set_coordination: "Set-Koordination",
    skill_team_coordination: "Teamleitung & Koordination",
    skill_communication: "Kommunikation",
    skill_negotiation: "Verhandlung & Konfliktlösung",

    gallery_hint: "Zum Öffnen klicken • zum Schließen erneut klicken",


    // Languages list
    lang_german: "Deutsch",
    lang_english: "Englisch",
    lang_croatian: "Kroatisch",


    // === NAVIGATION ===
    nav_projects: "Projekte",
    nav_about: "Über mich",
    nav_contact: "Kontakt",

  }
};

// Universal translator function
function t(key) {
  return translations[currentLang][key] || key;
}

// Update DOM
function updateTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = t(key); // allows <b>, <br>, formatting
  });
}


function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  updateTranslations();

  // Highlight active language button
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add("active", "text-imdb-yellow");
    } else {
      btn.classList.remove("active", "text-imdb-yellow");
    }
  });
}


// === PROJECT ROLE LABEL OVERRIDES (German-only) ===
Object.assign(translations.de, {
  "Production Coordinator (Cro Crew)": "Produktionskoordinator (Kro Crew)",
  "Location Scout": "Location Scout",
  "Kenya Production Staff": "Kenianisches Produktionsteam",
  "Third Assistant Director": "3. Regieassistenz",
  "Assistant Location Manager": "Stellvertretender Location Manager",
  "Unit AD": "Set-Assistenzregie",
  "2nd Assistant Director": "2. Regieassistenz",
  "Production Manager": "Produktionsleiter",
  "Transportation Manager": "Transportmanager",
  "Producer": "Produzent",
  "Casting Manager": "Casting-Manager",
  "Main Event Manager": "Haupt-Eventmanager",
  "Weekly party series": "Wöchentliche Partyreihe",
  "Site Lead 2026": "Standortleitung 2026",
  "Project Lead": "Projektleiter",
  "Camp Lead & Workshop Facilitator (2025)": "Camp-Leitung & Workshop-Moderator (2025)",
  "Workshop Facilitator": "Workshop-Moderator",
  "Logistics Manager  (2007-2010)": "Logistikmanager (2007–2010)",
  "Workshop: Fostering Social Connection & Emotional Intelligence":
      "Workshop: Soziale Verbindung & Emotionale Intelligenz fördern",
  "Logistics Manager & Chairperson": "Logistikmanager & Vorsitzender",
  "Security Council Chairperson": "Vorsitzender des Sicherheitsrats",
  "Promotion Visual Manager": "Manager für visuelle Promotion",

  // === PROJECT TYPE ===
  "Feature Film": "Spielfilm",
  "Commercial": "Werbespot",
  "Production Company Collaboration": "Zusammenarbeit mit Produktionsfirmen",
  "Short Film": "Kurzfilm",
  "Casting": "Casting",
  "Events": "Events",
  "Music Video": "Musikvideo",

  
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateTranslations();

  // Delay update to allow custom-header to load
  setTimeout(() => {
    updateTranslations();

    // Highlight active language after header appears
    const activeLang = localStorage.getItem("lang") || "en";
    document.querySelectorAll(".lang-btn").forEach(btn => {
      if (btn.dataset.lang === activeLang) {
        btn.classList.add("active", "text-imdb-yellow");
      }
    });

  }, 50);
});
