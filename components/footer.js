class CustomFooter extends HTMLElement {
    connectedCallback() {
        const year = new Date().getFullYear();

        this.innerHTML = `
            <footer class="py-8 bg-imdb-dark border-t border-gray-800 mt-12">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-4 md:mb-0">
                            <span class="text-gray-400">© ${year} ficho-films</span>
                        </div>
                        <div class="flex gap-4">
                            <a href="https://www.imdb.com/name/nm2569625/" target="_blank" class="text-gray-400 hover:text-imdb-yellow transition">
                                <i data-feather="film"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/filip-zafran" target="_blank" class="text-gray-400 hover:text-blue-400 transition">
                                <i data-feather="linkedin"></i>
                            </a>
                            <a href="https://www.crew-united.com/en/Filip-Zafran_870880.html" 
                                target="_blank" 
                                class="flex items-center gap-2 hover:text-imdb-yellow transition">
                                    
                                    <img src="images/icons/crew_united-white.png" alt="Crew United" class="w-8 h-7 opacity-80">
                                                                    </a>

                        </div>
                    </div>
                    <div class="mt-8 text-center text-sm text-gray-500">
                        <p>Filip "Ficho" Zafran – Films, Locations & Creative Coordination</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
