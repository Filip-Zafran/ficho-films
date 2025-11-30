class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                header.site-header {
                    background-color: rgba(18, 18, 18, 0.9);
                    backdrop-filter: blur(10px);
                    position: sticky;
                    top: 0;
                    z-index: 100;
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
                    <a href="#" class="text-2xl font-bold text-imdb-yellow nav-link" data-tab="projects">
                        ficho-films
                    </a>

                    <!-- Desktop nav -->
                    <nav class="hidden md:flex items-center gap-8">
                        <a href="#" class="nav-link text-white hover:text-imdb-yellow transition" data-tab="projects">Projects</a>
                        <a href="#" class="nav-link text-white hover:text-imdb-yellow transition" data-tab="about">About Me</a>
                        <a href="#" class="nav-link text-white hover:text-imdb-yellow transition" data-tab="contact">Contact</a>
                    </nav>

                    <!-- Mobile nav button -->
                    <button id="mobile-menu-toggle" class="md:hidden text-white">
                        <i data-feather="menu"></i>
                    </button>
                </div>

                <!-- Mobile nav menu -->
                <div id="mobile-nav-menu" class="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-imdb-dark border-t border-gray-800">
                    <a href="#" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-tab="projects">Projects</a>
                    <a href="#" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-tab="about">About Me</a>
                    <a href="#" class="nav-link block py-2 text-white hover:text-imdb-yellow transition" data-tab="contact">Contact</a>
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
    }
}

customElements.define('custom-header', CustomHeader);
