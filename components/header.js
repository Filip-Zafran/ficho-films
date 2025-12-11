class CustomHeader extends HTMLElement {
    connectedCallback() {

        this.innerHTML = `
            <style>
                header.site-header {
                    background-color: rgba(18,18,18,0.95);
                    backdrop-filter: blur(10px);
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    /* no fixed height – let content define it */
                    z-index: 99999;
                    border-bottom: 1px solid rgba(245,197,24,0.15);
                }

                /* NAV + LANGUAGE underline */
                .nav-link, .lang-btn {
                    position: relative;
                    padding-bottom: 4px;
                }
                .nav-link::after, .lang-btn::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #f5c518;
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after,
                .lang-btn:hover::after {
                    width: 100%;
                }
                .nav-link.active, .lang-btn.active {
                    color: #f5c518;
                }
                .nav-link.active::after,
                .lang-btn.active::after {
                    width: 100%;
                }
            </style>

            <header class="site-header py-3">
                <div class="container mx-auto px-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">

                    <!-- LOGO -->
                    <div class="relative flex flex-col">

                    <a href="index.html"
                    class="text-base sm:text-xl md:text-2xl font-bold text-imdb-yellow whitespace-nowrap">
                        Films, Locations & Creative Coordination
                    </a>

                    <!-- MOBILE PORTRAIT (absolute positioned, overlapping, far left) -->
                    <a href="about.html"
                    class="md:hidden">
                        <img src="images/about-portrait.png"
                            alt="Ficho portrait"
                            class="absolute left-0 -bottom-[42px] w-10 h-10 rounded-full border border-imdb-yellow shadow-md object-cover">
                    </a>
                </div>



                    <!-- DESKTOP NAV -->
                    <nav class="hidden md:flex items-center gap-8">
                        <a href="index.html" class="nav-link text-white"
                           data-page="index" data-i18n="nav_projects">Projects</a>
                        <a href="about.html" class="nav-link text-white"
                           data-page="about" data-i18n="nav_about">About Me</a>
                        <a href="contact.html" class="nav-link text-white"
                           data-page="contact" data-i18n="nav_contact">Contact</a>
                    </nav>

                    <!-- LANGUAGE + MOBILE BUTTON -->
                    <div class="flex items-center gap-4 ml-auto">
                        <!-- LANGUAGE SWITCH -->
                        <div class="flex items-center gap-2 text-sm">
                            <button onclick="setLanguage('en')" data-lang="en"
                                    class="lang-btn hover:text-imdb-yellow">EN</button>
                            <span>|</span>
                            <button onclick="setLanguage('de')" data-lang="de"
                                    class="lang-btn hover:text-imdb-yellow">DE</button>
                        </div>

                        <!-- MOBILE MENU TOGGLE -->
                        <button id="mobile-menu-toggle" class="md:hidden text-white text-2xl">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                </div>

                <!-- MOBILE NAV -->
                <div id="mobile-nav-menu"
                     class="hidden flex-col gap-2 px-4 pb-4 bg-imdb-dark border-t border-gray-800 md:hidden">
                    <a href="index.html" class="nav-link block py-2 text-white"
                       data-page="index" data-i18n="nav_projects">Projects</a>
                    <a href="about.html" class="nav-link block py-2 text-white"
                       data-page="about" data-i18n="nav_about">About Me</a>
                    <a href="contact.html" class="nav-link block py-2 text-white"
                       data-page="contact" data-i18n="nav_contact">Contact</a>
                </div>
            </header>
        `;

        // --- Mobile Menu Toggle ---
        const toggle = this.querySelector("#mobile-menu-toggle");
        const menu = this.querySelector("#mobile-nav-menu");

        if (toggle && menu) {
            toggle.addEventListener("click", () => {
                menu.classList.toggle("hidden");
            });
        }

        // --- Highlight Current Page ---
        const path = window.location.pathname.split("/").pop() || "index.html";
        let current = "index";
        if (path.includes("about")) current = "about";
        else if (path.includes("contact")) current = "contact";

        this.querySelectorAll(`.nav-link[data-page="${current}"]`)
            .forEach(link => link.classList.add("active"));

        // --- Highlight Selected Language ---
        const activeLang = localStorage.getItem("lang") || "en";
        this.querySelectorAll(".lang-btn").forEach(btn => {
            if (btn.dataset.lang === activeLang) {
                btn.classList.add("active");
            }
        });
    }
}

customElements.define("custom-header", CustomHeader);
