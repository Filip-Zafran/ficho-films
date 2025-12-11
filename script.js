// Render project cards from PROJECTS (defined in projects.js)
function renderProjectsFromData() {
    if (typeof PROJECTS === "undefined") return;

    const featuredBig = document.getElementById("featured-big");
    const featuredSmall = document.getElementById("featured-small");
    const allContainer = document.getElementById("projects-container");

    // If we're not on the Projects page, skip
    if (!allContainer || !featuredBig || !featuredSmall) return;

    featuredBig.innerHTML = "";
    featuredSmall.innerHTML = "";
    allContainer.innerHTML = "";

    // Translate "More" button
    const moreLabel = t("More") || "More";

    // === FEATURED CARD (with optional teaser video) ===
    const buildFeaturedCard = (project, imageHeightClasses = "h-48") => {
        const linkHtml =
            project.link && project.link !== "#"
                ? `<a href="${project.link}" target="_blank" class="inline-block mt-2 text-imdb-yellow hover:underline">${moreLabel}</a>`
                : "";

        const translatedTitle = t(project.title);
        const translatedRole = t(project.roleLabel);

        const media = project.teaserVideo
            ? `
        <div class="relative overflow-hidden rounded-t-lg ${imageHeightClasses}">
            <!-- Poster -->
            <img
                src="${project.image}"
                alt="${translatedTitle}"
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

            <span class="mobile-video-hint">Tap to play video</span>
        </div>
    `
            : `
        <img
            src="${project.image}"
            alt="${translatedTitle}"
            class="w-full ${imageHeightClasses} object-cover rounded-t-lg"
        >
    `;

        return `
            <div class="project-card" data-role="${project.role}">
                ${media}
                <div class="bg-imdb-gray p-4 rounded-b-lg">
                    <h3 class="text-xl font-bold">${translatedTitle}</h3>
                    <p class="text-imdb-yellow">${translatedRole}</p>
                    ${project.stars ? `<p class="text-sm font-semibold text-gray-200 mb-1">${project.stars}</p>` : ""}
                    ${project.client ? `<p class="text-xs text-gray-400">${project.client}</p>` : ""}
                    ${linkHtml}
                </div>
            </div>
        `;
    };

    // === ALL PROJECTS CARD ===
    const buildAllProjectsCard = (project, imageHeightClasses = "h-48") => {
        const yearText = project.year ? ` (${project.year})` : "";
        const linkHtml =
            project.link && project.link !== "#"
                ? `<a href="${project.link}" target="_blank" class="inline-block mt-2 text-imdb-yellow hover:underline">${moreLabel}</a>`
                : "";

        const translatedTitle = t(project.title);
        const translatedRole = t(project.roleLabel);

        return `
            <div class="project-card" data-role="${project.role}">
                <img
                    src="${project.image}"
                    alt="${translatedTitle}"
                    class="w-full ${imageHeightClasses} object-cover rounded-t-lg"
                >
                <div class="bg-imdb-gray p-4 rounded-b-lg">
                    <h3 class="text-xl font-bold">${translatedTitle}${yearText}</h3>
                    <p class="text-imdb-yellow">${translatedRole}</p>
                    ${project.stars ? `<p class="text-sm font-semibold text-gray-200 mb-1">${project.stars}</p>` : ""}
                    ${project.client ? `<p class="text-xs text-gray-400">${project.client}</p>` : ""}
                    ${linkHtml}
                </div>
            </div>
        `;
    };

    // === FEATURED PROJECTS ===
    const featuredProjects = PROJECTS.filter((p) => p.featuredSize);
    featuredProjects.forEach((project) => {
        if (project.featuredSize === "big") {
            featuredBig.insertAdjacentHTML("beforeend", buildFeaturedCard(project, "h-64"));
        } else if (project.featuredSize === "small") {
            featuredSmall.insertAdjacentHTML("beforeend", buildFeaturedCard(project, "h-48"));
        }
    });

    // === ALL PROJECTS (non-featured + featured) ===
    const featuredIds = new Set(featuredProjects.map((p) => p.id));
    const normalProjects = PROJECTS.filter((p) => !featuredIds.has(p.id));
    const orderedProjects = [...normalProjects, ...featuredProjects];

    orderedProjects.forEach((project) => {
        allContainer.insertAdjacentHTML("beforeend", buildAllProjectsCard(project, "h-48"));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderProjectsFromData();

    // === ROLE FILTERS ===
    const roleFilters = document.querySelectorAll(".role-filter");

    if (roleFilters.length > 0) {
        const featuredSection = document.getElementById("featured-projects");
        const allProjectsSection = document.getElementById("all-projects-section");
        const allProjectsHeading = document.getElementById("all-projects-heading");
        const featuredHeading = document.getElementById("featured-heading");

        const updateProjectVisibility = (role) => {
            const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((card) => {
                const roles = (card.getAttribute("data-role") || "").split(" ");
                card.style.display = role === "all" || roles.includes(role) ? "block" : "none";
            });
        };

        roleFilters.forEach((filter) => {
            filter.addEventListener("click", function () {
                const role = this.getAttribute("data-role");

                // Highlight selected filter
                roleFilters.forEach((f) =>
                    f.classList.remove("bg-imdb-yellow", "text-imdb-dark")
                );
                this.classList.add("bg-imdb-yellow", "text-imdb-dark");

                // Heading translation
                if (role === "all") {
                    featuredSection?.classList.remove("hidden");
                    featuredHeading?.classList.remove("hidden");

                    allProjectsSection?.classList.remove("hidden");
                    allProjectsHeading.textContent = t("All Projects");
                } else {
                    featuredSection?.classList.add("hidden");
                    featuredHeading?.classList.add("hidden");

                    allProjectsSection?.classList.remove("hidden");
                    allProjectsHeading.textContent = t(this.textContent.trim());
                }

                updateProjectVisibility(role);
            });
        });

        // Default = "All Projects"
        const defaultFilter = document.querySelector('.role-filter[data-role="all"]');
        if (defaultFilter) defaultFilter.click();
    }

document.addEventListener("DOMContentLoaded", () => {

    // Each gallery trigger (thumbnail)
    const triggers = document.querySelectorAll(".gallery-trigger");

    triggers.forEach(trigger => {
        const galleryId = trigger.id.replace("open-", "").replace("-gallery", "") + "-gallery";
        const gallery = document.getElementById(galleryId);
        const arrow = trigger.querySelector(".gallery-arrow");
        const closeBtn = gallery.querySelector(".gallery-close");

        trigger.addEventListener("click", () => {
            const isOpening = gallery.classList.contains("hidden");
            gallery.classList.toggle("hidden");

            // Update arrow (mobile only)
            if (arrow) arrow.textContent = isOpening ? "▼" : "►";

            // Show close button (mobile only)
            if (closeBtn) {
                if (isOpening) closeBtn.classList.remove("hidden");
                else closeBtn.classList.add("hidden");
            }

            // Scroll gallery into view (mobile)
            if (isOpening && window.innerWidth < 768) {
                setTimeout(() => {
                    gallery.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
            }
        });

        // Close button logic
        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // prevent retrigger

                gallery.classList.add("hidden");
                closeBtn.classList.add("hidden");

                // Update mobile arrow
                if (arrow) arrow.textContent = "►";

                // Smooth scroll back to thumbnail
                trigger.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        }
    });
});


    // === FEATURED VIDEOS (teaser hover/tap) ===
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
            const isMobile = window.matchMedia("(max-width: 768px)").matches;

            container.addEventListener("mouseenter", () => {
                poster.classList.add("opacity-0");
                video.classList.add("opacity-100");
                video.play();
                if (!isMobile && hint) hint.classList.add("hidden");
            });

            container.addEventListener("mouseleave", () => {
                video.pause();
                video.classList.remove("opacity-100");
                poster.classList.remove("opacity-0");
                if (!isMobile && hint) hint.classList.remove("hidden");
            });

            container.addEventListener("click", () => {
                if (isMobile) {
                    video.play();
                    poster.classList.add("opacity-0");
                    video.classList.add("opacity-100");
                    if (hint) hint.classList.add("hidden");
                }
            });

            video.addEventListener("pause", () => {
                if (isMobile && hint) hint.classList.remove("hidden");
            });
        });
    }

    initFeaturedVideos();

    // === PRODUCTION DROPDOWN ===
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
            fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            })
                .then((response) => {
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

            e.preventDefault();
        });
    }

    // === ABOUT PAGE SIMPLE GALLERY ===
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

        if (grid.children.length === 0) {
            for (let i = 1; i <= totalImages; i++) {
                const num = String(i).padStart(2, "0");
                const basePath = `images/${folder}/${baseName}${num}`;

                const wrapper = document.createElement("div");
                wrapper.className =
                    "border-2 border-imdb-yellow rounded-lg overflow-hidden bg-black/40";

                const inner = document.createElement("div");
                inner.className = "w-full h-40 md:h-52";

                const img = document.createElement("img");
                img.alt = `${folder} ${i}`;
                img.className = "w-full h-full object-cover";

                img.dataset.basePath = basePath;
                img.dataset.extIndex = "0";

                function tryNextSrc() {
                    const idx = parseInt(img.dataset.extIndex || "0", 10);
                    if (idx >= exts.length) {
                        wrapper.style.display = "none";
                        return;
                    }
                    img.src = basePath + exts[idx];
                    img.dataset.extIndex = String(idx + 1);
                }

                img.addEventListener("error", tryNextSrc);
                tryNextSrc();

                inner.appendChild(img);
                wrapper.appendChild(inner);
                grid.appendChild(wrapper);
            }
        }

        trigger.addEventListener("click", () => {
            const hidden = section.classList.contains("hidden");
            if (hidden) {
                section.classList.remove("hidden");
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                section.classList.add("hidden");
            }
        });
    }

    setupSimpleGallery({
        triggerId: "open-behind-gallery",
        sectionId: "behind-gallery",
        gridId: "behind-grid",
        folder: "behind_scenes",
        baseName: "behind",
        totalImages: 20
    });

    setupSimpleGallery({
        triggerId: "open-berlin-gallery",
        sectionId: "berlin-gallery",
        gridId: "berlin-grid",
        folder: "berlin_locs",
        baseName: "berlin_",
        totalImages: 29
    });

    setupSimpleGallery({
        triggerId: "open-cro-gallery",
        sectionId: "cro-gallery",
        gridId: "cro-grid",
        folder: "cro_locs",
        baseName: "croatia_",
        totalImages: 28
    });
});
