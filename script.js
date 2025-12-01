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

    // === Featured Projects card (NO YEAR + teaser video with poster) ===
    const buildFeaturedCard = (project, imageHeightClasses = "h-48") => {
        const linkHtml =
            project.link && project.link !== "#"
                ? `<a href="${project.link}" target="_blank" class="inline-block mt-2 text-imdb-yellow hover:underline">More</a>`
                : "";

        const media = project.teaserVideo
            ? `
                <div class="relative overflow-hidden rounded-t-lg ${imageHeightClasses}">
                    <!-- Poster image (default visible) -->
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="featured-poster absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100"
                    >

                    <!-- Video (invisible until hover) -->
                    <video
                        class="featured-video absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 pointer-events-none"
                        poster="${project.image}"
                        data-teaser-src="${project.teaserVideo}"
                        muted
                        preload="metadata"
                        playsinline
                    ></video>
                </div>
            `
            : `
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="w-full ${imageHeightClasses} object-cover rounded-t-lg"
                >
            `;

        return `
            <div class="project-card" data-role="${project.role}">
                ${media}
                <div class="bg-imdb-gray p-4 rounded-b-lg">
                    <h3 class="text-xl font-bold">${project.title}</h3>
                    <p class="text-imdb-yellow">${project.roleLabel}</p>
                    ${project.stars ? `<p class="text-sm font-semibold text-gray-200 mb-1">${project.stars}</p>` : ""}
                    ${project.client ? `<p class="text-xs text-gray-400">${project.client}</p>` : ""}
                    ${linkHtml}
                </div>
            </div>
        `;
    };

    // === All Projects card (KEEP YEAR, same stars/client order) ===
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
                    ${project.stars ? `<p class="text-sm font-semibold text-gray-200 mb-1">${project.stars}</p>` : ""}
                    ${project.client ? `<p class="text-xs text-gray-400">${project.client}</p>` : ""}
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

initFeaturedVideos();

function initFeaturedVideos() {
    const videos = document.querySelectorAll(".featured-video");

    videos.forEach((video) => {
        const src = video.getAttribute("data-teaser-src");
        if (!src) return;

        // Attach actual source & start loading
        video.src = src;
        video.load();
        video.loop = true;

        const container = video.parentElement; // the <div class="relative ...">
        const poster = container.querySelector(".featured-poster");
        if (!poster) return;

        // Hover IN: fade poster out, fade video in, play (from current position)
        container.addEventListener("mouseenter", () => {
            poster.classList.remove("opacity-100");
            poster.classList.add("opacity-0");

            video.classList.remove("opacity-0");
            video.classList.add("opacity-100");

            video.play();
        });

        // Hover OUT: pause video, fade it out, fade poster in
        // (do NOT reset currentTime so it resumes next hover)
        container.addEventListener("mouseleave", () => {
            video.pause();

            video.classList.remove("opacity-100");
            video.classList.add("opacity-0");

            poster.classList.remove("opacity-0");
            poster.classList.add("opacity-100");
        });
    });
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
