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
            <!-- Poster image -->
            <img
                src="${project.image}"
                alt="${project.title}"
                class="featured-poster absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100"
            >

            <!-- Video -->
            <video
                class="featured-video absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 pointer-events-none"
                poster="${project.image}"
                data-teaser-src="${project.teaserVideo}"
                muted
                preload="metadata"
                playsinline
            ></video>

            <!-- MOBILE HINT -->
            <span class="mobile-video-hint">Tap to play video</span>
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
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="w-full ${imageHeightClasses} object-cover rounded-t-lg"
                >
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
    const featuredProjects = PROJECTS.filter((p) => p.featuredSize);
    featuredProjects.forEach((project) => {
        if (project.featuredSize === "big") {
            featuredBig.insertAdjacentHTML("beforeend", buildFeaturedCard(project, "h-64"));
        } else if (project.featuredSize === "small") {
            featuredSmall.insertAdjacentHTML("beforeend", buildFeaturedCard(project, "h-48"));
        }
    });

    // === ALL PROJECTS: non-featured first, then featured ===
    const featuredIds = new Set(featuredProjects.map((p) => p.id));
    const normalProjects = PROJECTS.filter((p) => !featuredIds.has(p.id));
    const orderedProjects = [...normalProjects, ...featuredProjects];

    orderedProjects.forEach((project) => {
        allContainer.insertAdjacentHTML("beforeend", buildAllProjectsCard(project, "h-48"));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // === PROJECTS PAGE: render projects (index.html only) ===
    renderProjectsFromData();

    // === ROLE FILTERS (Projects page only) ===
    const roleFilters = document.querySelectorAll(".role-filter");

    if (roleFilters.length > 0) {
        const featuredSection = document.getElementById("featured-projects");
        const allProjectsSection = document.getElementById("all-projects-section");
        const allProjectsHeading = document.getElementById("all-projects-heading");

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
                const label = this.textContent.trim();

                // UI highlight
                roleFilters.forEach((f) =>
                    f.classList.remove("bg-imdb-yellow", "text-imdb-dark")
                );
                this.classList.add("bg-imdb-yellow", "text-imdb-dark");

                // Show/hide Featured section + update heading
           const featuredHeading = document.getElementById("featured-heading");

if (role === "all") {
    featuredSection?.classList.remove("hidden");
    featuredHeading?.classList.remove("hidden");

    allProjectsSection?.classList.remove("hidden");
    allProjectsHeading.textContent = "All Projects";
} else {
    featuredSection?.classList.add("hidden");     // hide featured cards
    featuredHeading?.classList.add("hidden");     // hide the heading

    allProjectsSection?.classList.remove("hidden");
    allProjectsHeading.textContent = label;
}


                // Filter all cards
                updateProjectVisibility(role);
            });
        });

        // Default to "All Projects" filter if present
        const defaultFilter = document.querySelector('.role-filter[data-role="all"]');
        if (defaultFilter) {
            defaultFilter.click();
        }
    }

    // === FEATURED VIDEOS (hover poster -> teaser) ===
  function initFeaturedVideos() {
    const videos = document.querySelectorAll(".featured-video");

    videos.forEach((video) => {
        const src = video.getAttribute("data-teaser-src");
        if (!src) return;

        video.src = src;
        video.load();
        video.loop = true;

        const container = video.parentElement;
        const poster = container.querySelector(".featured-poster");
        const hint = container.querySelector(".mobile-video-hint");

        if (!poster) return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        // --- Hover IN (desktop) ---
        container.addEventListener("mouseenter", () => {
            poster.classList.remove("opacity-100");
            poster.classList.add("opacity-0");

            video.classList.remove("opacity-0");
            video.classList.add("opacity-100");

            video.play();

            // Hide hint immediately on desktop hover
            if (!isMobile && hint) {
                hint.classList.add("hidden");
            }
        });

        // --- Hover OUT (desktop) ---
        container.addEventListener("mouseleave", () => {
            video.pause();
            video.classList.remove("opacity-100");
            video.classList.add("opacity-0");

            poster.classList.remove("opacity-0");
            poster.classList.add("opacity-100");

            // Desktop: show hint again next hover start
            if (!isMobile && hint) {
                hint.classList.remove("hidden");
            }
        });

        // --- Mobile tap: hide hint when video starts ---
        container.addEventListener("click", () => {
            if (isMobile) {
                video.play();
                poster.classList.add("opacity-0");
                video.classList.add("opacity-100");

                if (hint) hint.classList.add("hidden");
            }
        });

        // --- Mobile: show hint again if video is paused ---
        video.addEventListener("pause", () => {
            if (isMobile && hint) hint.classList.remove("hidden");
        });
    });
}


    initFeaturedVideos();

    // === PRODUCTION DROPDOWN TOGGLE (Projects page only) ===
    const productionToggle = document.getElementById("production-toggle");
    const productionSubmenu = document.getElementById("production-submenu");

    if (productionToggle && productionSubmenu) {
        productionToggle.addEventListener("click", () => {
            productionSubmenu.classList.toggle("hidden");
        });
    }

// === CONTACT FORM HANDLER ===
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        // Let Formspree handle the real sending
        // But show confirmation after a successful response

        fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" }
        })
        .then(response => {
            if (response.ok) {
                formSuccess.classList.remove("hidden");
                contactForm.reset();
            } else {
                alert("Something went wrong. Please try again.");
            }
        })
        .catch(() => {
            alert("Could not send the message. Please try again later.");
        });

        e.preventDefault(); // prevent page reload but still send via Fetch
    });
}


    // === SIMPLE GALLERY HELPER (ABOUT PAGE) ===
function setupSimpleGallery(options) {
    const {
        triggerId,
        sectionId,
        gridId,
        folder,
        baseName,
        totalImages
    } = options;

    const trigger = document.getElementById(triggerId);
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (!trigger || !section || !grid) return;

    const exts = [".JPG", ".jpg", ".jpeg", ".png"];

    // Build thumbnails once
    if (grid.children.length === 0) {
        for (let i = 1; i <= totalImages; i++) {
            const num = String(i).padStart(2, "0"); // 01, 02, ...
            const basePath = `images/${folder}/${baseName}${num}`;

            const wrapper = document.createElement("div");
            wrapper.className =
                "border-2 border-imdb-yellow rounded-lg overflow-hidden bg-black/40";

            const inner = document.createElement("div");
            inner.className = "w-full h-40 md:h-52";

            const img = document.createElement("img");
            img.alt = `${folder} ${i}`;
            img.className = "w-full h-full object-cover";

            // store base path + current extension index
            img.dataset.basePath = basePath;
            img.dataset.extIndex = "0";

            function tryNextSrc() {
                const idx = parseInt(img.dataset.extIndex || "0", 10);
                if (idx >= exts.length) {
                    // no valid extension, hide this tile
                    wrapper.style.display = "none";
                    return;
                }
                img.src = basePath + exts[idx];
                img.dataset.extIndex = String(idx + 1);
            }

            img.addEventListener("error", tryNextSrc);

            // start loading with first extension
            tryNextSrc();

            inner.appendChild(img);
            wrapper.appendChild(inner);
            grid.appendChild(wrapper);
        }
    }

    // Toggle show/hide on click
    trigger.addEventListener("click", () => {
        const isHidden = section.classList.contains("hidden");

        if (isHidden) {
            section.classList.remove("hidden");
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            section.classList.add("hidden");
        }
    });
}


    // === INIT ABOUT PAGE GALLERIES (if present) ===
    setupSimpleGallery({
        triggerId: "open-behind-gallery",
        sectionId: "behind-gallery",
        gridId: "behind-grid",
        folder: "behind_scenes",
        baseName: "behind",
        totalImages: 20 // adjust if needed
    });

    setupSimpleGallery({
        triggerId: "open-berlin-gallery",
        sectionId: "berlin-gallery",
        gridId: "berlin-grid",
        folder: "berlin_locs",
        baseName: "berlin_",
        totalImages: 29 // adjust to how many berlin_* files you have
    });

    setupSimpleGallery({
        triggerId: "open-cro-gallery",
        sectionId: "cro-gallery",
        gridId: "cro-grid",
        folder: "cro_locs",
        baseName: "croatia_",
        totalImages: 28 // adjust to your croatia_* count
    });
});
