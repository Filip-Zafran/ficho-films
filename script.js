// Render project cards from PROJECTS (defined in projects.js)
function renderProjectsFromData() {
    if (typeof PROJECTS === "undefined") return;

    const featuredBig = document.getElementById("featured-big");
    const featuredSmall = document.getElementById("featured-small");
    const allContainer = document.getElementById("projects-container");

    // If we're not on the Projects page, just skip rendering
    if (!allContainer || !featuredBig || !featuredSmall) return;

    featuredBig.innerHTML = "";
    featuredSmall.innerHTML = "";
    allContainer.innerHTML = "";

// Featured Projects card (NO YEAR)
const buildFeaturedCard = (project, imageHeightClasses = "h-48") => {
    const linkHtml =
        project.link && project.link !== "#"
            ? `<a href="${project.link}" target="_blank" class="inline-block mt-2 text-imdb-yellow hover:underline">More</a>`
            : "";

    return `
        <div class="project-card" data-role="${project.role}">
            <img src="${project.image}" alt="${project.title}" class="w-full ${imageHeightClasses} object-cover rounded-t-lg">
            <div class="bg-imdb-gray p-4 rounded-b-lg">
                <h3 class="text-xl font-bold">${project.title}</h3>
                <p class="text-imdb-yellow">${project.roleLabel}</p>
                ${project.client ? `<p class="text-sm text-gray-400">${project.client}</p>` : ""}
                ${project.stars ? `<p class="text-xs text-gray-500 mt-1">${project.stars}</p>` : ""}
                ${linkHtml}
            </div>
        </div>
    `;
};

// All Projects card (KEEP YEAR)
const buildAllProjectsCard = (project, imageHeightClasses = "h-48") => {
    const yearText = project.year ? ` (${project.year})` : "";
    const linkHtml =
        project.link && project.link !== "#"
            ? `<a href="${project.link}" target="_blank" class="inline-block mt-2 text-imdb-yellow hover:underline">More</a>`
            : "";

    return `
        <div class="project-card" data-role="${project.role}">
            <img src="${project.image}" alt="${project.title}" class="w-full ${imageHeightClasses} object-cover rounded-t-lg">
            <div class="bg-imdb-gray p-4 rounded-b-lg">
                <h3 class="text-xl font-bold">${project.title}${yearText}</h3>
                <p class="text-imdb-yellow">${project.roleLabel}</p>
                ${project.client ? `<p class="text-sm text-gray-400">${project.client}</p>` : ""}
                ${project.stars ? `<p class="text-xs text-gray-500 mt-1">${project.stars}</p>` : ""}
                ${linkHtml}
            </div>
        </div>
    `;
};


    // === FEATURED (BIG + SMALL) ===
    const featuredProjects = PROJECTS.filter(p => p.featuredSize);
    featuredProjects.forEach((project) => {
       if (project.featuredSize === "big") {
    featuredBig.insertAdjacentHTML("beforeend", buildFeaturedCard(project, "h-64"));
} else if (project.featuredSize === "small") {
    featuredSmall.insertAdjacentHTML("beforeend", buildFeaturedCard(project, "h-48"));
}

    });

    // === ALL PROJECTS: non-featured first, then featured ===
    const featuredIds = new Set(featuredProjects.map(p => p.id));
    const normalProjects = PROJECTS.filter(p => !featuredIds.has(p.id));
    const orderedProjects = [...normalProjects, ...featuredProjects];

    orderedProjects.forEach((project) => {
      allContainer.insertAdjacentHTML("beforeend", buildAllProjectsCard(project, "h-48"));

    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Render projects (on index.html only)
    renderProjectsFromData();

    // === PROJECT FILTERING (Projects page only) ===
    const roleFilters = document.querySelectorAll(".role-filter");

    if (roleFilters.length > 0) {
        const updateProjectVisibility = (role) => {
            const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((card) => {
                const cardRoles = (card.getAttribute("data-role") || "").split(" ");
                if (role === "all" || cardRoles.includes(role)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        };

        roleFilters.forEach((filter) => {
            filter.addEventListener("click", function () {
                const role = this.getAttribute("data-role");

                roleFilters.forEach((f) =>
                    f.classList.remove("bg-imdb-yellow", "text-imdb-dark")
                );
                this.classList.add("bg-imdb-yellow", "text-imdb-dark");

                updateProjectVisibility(role);
            });
        });

        // Default to "All Projects" filter if present
        const defaultFilter = document.querySelector('.role-filter[data-role="all"]');
        if (defaultFilter) {
            defaultFilter.click();
        }
    }

    // === PRODUCTION DROPDOWN TOGGLE (Projects page only) ===
    const productionToggle = document.getElementById("production-toggle");
    const productionSubmenu = document.getElementById("production-submenu");

    if (productionToggle && productionSubmenu) {
        productionToggle.addEventListener("click", () => {
            productionSubmenu.classList.toggle("hidden");
        });
    }

    // === CONTACT FORM HANDLER (Contact page only) ===
    const contactForm = document.getElementById("contact-form");
    const formSuccess = document.getElementById("form-success");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // TODO: connect to backend / Formspree. For now just fake success.
            if (formSuccess) {
                formSuccess.classList.remove("hidden");
            }
            contactForm.reset();

            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.classList.add("hidden");
                }
            }, 5000);
        });
    }
});
