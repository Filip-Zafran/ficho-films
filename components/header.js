class CustomHeader extends HTMLElement {
    connectedCallback() {
        const headerHTML = [
            '<style>',
            'header.site-header {',
            '  background-color: rgba(18,18,18,0.9);',
            '  backdrop-filter: blur(10px);',
            '  position: fixed;',
            '  top: 0;',
            '  left: 0;',
            '  width: 100%;',
            '  z-index: 99999;',
            '  border-bottom: 1px solid rgba(245,197,24,0.15);',
            '}',
            '.nav-link { position: relative; padding-bottom: 4px; }',
            '.nav-link::after { content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #f5c518; transition: width 0.3s ease; }',
            '.nav-link:hover::after { width: 100%; }',
            '.nav-link.active { color: #f5c518; }',
            '.nav-link.active::after { width: 100%; }',
            '</style>',

            '<header class="site-header py-4">',
            '<div class="container mx-auto px-4 flex items-center justify-between">',

            '<a href="index.html" class="text-2xl font-bold text-imdb-yellow whitespace-nowrap">',
            'Films, Locations & Creative Coordination',
            '</a>',

            '<nav class="hidden md:flex items-center gap-8">',
            '<a href="index.html" class="nav-link text-white hover:text-imdb-yellow transition" data-page="index" data-i18n="nav_projects">Projects</a>',
            '<a href="about.html" class="nav-link text-white hover:text-imdb-yellow transition" data-page="about" data-i18n="nav_about">About Me</a>',
            '<a href="contact.html" class="nav-link text-white hover:text-imdb-yellow transition" data-page="contact" data-i18n="nav_contact">Contact</a>',
            '</nav>',

            '<div class="flex items-center gap-4">',

            '<div class="flex items-center gap-2 text-sm">',
            '<button onclick="setLanguage(\'en\')" class="hover:text-imdb-yellow">EN</button>',
            '<span>|</span>',
            '<button onclick="setLanguage(\'de\')" class="hover:text-imdb-yellow">DE</button>',
            '</div>',

            '<button id="mobile-menu-toggle" class="md:hidden text-white">',
            '<i data-feather="menu"></i>',
            '</button>',

            '</div>',
            '</div>',

            '<div id="mobile-nav-menu" class="hidden md:hidden flex-col gap-2 px-4 pb-4 bg-imdb-dark border-t border-gray-800">',
            '<a href="index.html" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-page="index" data-i18n="nav_projects">Projects</a>',
            '<a href="about.html" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-page="about" data-i18n="nav_about">About Me</a>',
            '<a href="contact.html" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-page="contact" data-i18n="nav_contact">Contact</a>',
            '</div>',

            '</header>'
        ].join("");

        this.innerHTML = headerHTML;

        // Mobile toggle
        const toggleBtn = this.querySelector("#mobile-menu-toggle");
        const mobileMenu = this.querySelector("#mobile-nav-menu");
        if (toggleBtn && mobileMenu) {
            toggleBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
            });
        }

        // Active page detection
        const path = window.location.pathname.split("/").pop() || "index.html";
        let current = "index";
        if (path.includes("about")) current = "about";
        else if (path.includes("contact")) current = "contact";

        this.querySelectorAll('.nav-link[data-page="' + current + '"]')
            .forEach(link => link.classList.add("active", "text-imdb-yellow"));
    }
}

customElements.define("custom-header", CustomHeader);
