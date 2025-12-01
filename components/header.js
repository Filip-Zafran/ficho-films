class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
             header.site-header {
    background-color: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    border-bottom: 1px solid rgba(245, 197, 24, 0.1);
}


                .nav-link {
                    position: relative;
                    padding-bottom: 4px;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #f5c518;
                    transition: width 0.3s ease;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .nav-link.active {
                    color: #f5c518;
                }

                .nav-link.active::after {
                    width: 100%;
                }
            </style>

            <header class="site-header py-4">
                <div class="container mx-auto px-4 flex justify-between items-center">
                    <!-- Logo / Home -->
                    <a href="index.html" class="text-2xl font-bold text-imdb-yellow">
                        Films, Locations & Creative Coordination
                    </a>

                    <!-- Desktop nav -->
                    <nav class="hidden md:flex items-center gap-8">
                        <a href="index.html" class="nav-link text-white hover:text-imdb-yellow transition" data-page="index">Projects</a>
                        <a href="about.html" class="nav-link text-white hover:text-imdb-yellow transition" data-page="about">About Me</a>
                        <a href="contact.html" class="nav-link text-white hover:text-imdb-yellow transition" data-page="contact">Contact</a>
                    </nav>

                    <!-- Mobile nav button -->
                    <button id="mobile-menu-toggle" class="md:hidden text-white">
                        <i data-feather="menu"></i>
                    </button>
                </div>

                <!-- Mobile nav menu -->
                <div id="mobile-nav-menu" class="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-imdb-dark border-t border-gray-800">
                    <a href="index.html" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-page="index">Projects</a>
                    <a href="about.html" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-page="about">About Me</a>
                    <a href="contact.html" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-page="contact">Contact</a>
                </div>
            </header>
        `;

        // Mobile menu toggle
        const toggleBtn = this.querySelector('#mobile-menu-toggle');
        const mobileMenu = this.querySelector('#mobile-nav-menu');

        if (toggleBtn && mobileMenu) {
            toggleBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Highlight active link based on current page
        const path = window.location.pathname.split('/').pop() || 'index.html';
        let current = 'index';

        if (path.includes('about')) current = 'about';
        else if (path.includes('contact')) current = 'contact';

        const navLinks = this.querySelectorAll(`.nav-link[data-page="${current}"]`);
        navLinks.forEach(link => link.classList.add('active', 'text-imdb-yellow'));
    }
}

customElements.define('custom-header', CustomHeader);
