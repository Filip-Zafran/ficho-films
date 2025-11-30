document.addEventListener('DOMContentLoaded', function() {
    // === TAB NAVIGATION ===
    const tabs = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            // If it's an <a>, prevent jumping to "#"
            if (this.tagName.toLowerCase() === 'a') {
                e.preventDefault();
            }

            const target = this.getAttribute('data-tab');
            if (!target) return;

            // Update active tab styling
            tabs.forEach(t => t.classList.remove('active', 'text-imdb-yellow', 'border-b-2', 'border-imdb-yellow'));
            this.classList.add('active', 'text-imdb-yellow', 'border-b-2', 'border-imdb-yellow');

            // Show target content and hide others
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });

            const targetEl = document.getElementById(target);
            if (targetEl) {
                targetEl.classList.remove('hidden');
                targetEl.classList.add('active');
            }
        });
    });

    // === PROJECT FILTERING ===
    const roleFilters = document.querySelectorAll('.role-filter');
    const projectCards = document.querySelectorAll('.project-card');

    roleFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            const role = this.getAttribute('data-role');

            // Update active filter button styling
            roleFilters.forEach(f => f.classList.remove('bg-imdb-yellow', 'text-imdb-dark'));
            this.classList.add('bg-imdb-yellow', 'text-imdb-dark');

            // Filter projects
            projectCards.forEach(card => {
                const cardRoles = (card.getAttribute('data-role') || '').split(' ');
                
                if (role === 'all' || cardRoles.includes(role)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // === CONTACT FORM ===
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Placeholder behavior – hook to backend later
            if (formSuccess) {
                formSuccess.classList.remove('hidden');
            }
            contactForm.reset();

            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.classList.add('hidden');
                }
            }, 5000);
        });
    }

    // === INITIAL STATE ===
    // Activate first tab (usually "Projects")
    if (tabs.length > 0) {
        tabs[0].click();
    }

    // Activate "All Projects" filter by default
    const defaultFilter = document.querySelector('.role-filter[data-role="all"]');
    if (defaultFilter) {
        defaultFilter.click();
    }
});
