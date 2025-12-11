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

    // === NAVIGATION ===
    nav_projects: "Projects",
    nav_about: "About Me",
    nav_contact: "Contact",
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
    el.textContent = t(key);
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
