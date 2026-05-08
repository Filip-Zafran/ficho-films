/* ============================================
   RENDER PROJECTS (your original logic)
   ============================================ */

function renderProjectsFromData() {
    if (typeof PROJECTS === "undefined") return;

    const featuredBig = document.getElementById("featured-big");
    const featuredSmall = document.getElementById("featured-small");
    const recentContainer = document.getElementById("recent-projects");
    const allContainer = document.getElementById("projects-container");

    // If we're not on the Projects page, skip
    if (!allContainer || !featuredBig || !featuredSmall) return;

    featuredBig.innerHTML = "";
    featuredSmall.innerHTML = "";
    allContainer.innerHTML = "";

    // Translate "More" button
    const moreLabel = typeof t === "function" ? (t("More") || "More") : "More";

    // === FEATURED CARD (with optional teaser video) ===
    const buildFeaturedCard = (project, imageHeightClasses = "h-48") => {
        const linkHtml =
            project.link && project.link !== "#"
                ? `<a href="${project.link}" target="_blank" class="inline-block mt-2 text-imdb-yellow hover:underline">${moreLabel}</a>`
                : "";

        const translatedTitle = typeof t === "function" ? t(project.title) : project.title;
        const translatedRole = typeof t === "function" ? t(project.roleLabel) : project.roleLabel;

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

        const translatedTitle = typeof t === "function" ? t(project.title) : project.title;
        const translatedRole = typeof t === "function" ? t(project.roleLabel) : project.roleLabel;

        let clientHtml = "";
        if (project.client) {
            if (project.clientLink) {
                clientHtml = `<p class="text-xs text-gray-400"><a href="${project.clientLink}" target="_blank" class="hover:text-imdb-yellow transition">${project.client}</a></p>`;
            } else {
                clientHtml = `<p class="text-xs text-gray-400">${project.client}</p>`;
            }
        }

        const imageOrVideo = project.teaserVideo
            ? `
        <div class="relative overflow-hidden rounded-t-lg ${imageHeightClasses} ${project.fullHeight ? 'bg-black' : ''}">
            <!-- Poster -->
            <img
                src="${project.image}"
                alt="${translatedTitle}"
                class="recent-poster absolute inset-0 w-full h-full ${project.fullHeight ? 'object-contain' : 'object-cover'} transition-opacity duration-300 opacity-100"
            >

            <!-- Video -->
            <video
                class="recent-video absolute inset-0 w-full h-full ${project.fullHeight ? 'object-contain' : 'object-cover'} transition-opacity duration-300 opacity-0 pointer-events-none"
                poster="${project.image}"
                data-teaser-src="${project.teaserVideo}"
                muted
                preload="metadata"
                playsinline
            ></video>

            <span class="mobile-video-hint text-white text-sm">Tap to play video</span>
        </div>
    `
            : project.link
            ? `
        <div class="relative overflow-hidden rounded-t-lg ${imageHeightClasses} cursor-pointer group">
            <img
                src="${project.image}"
                alt="${translatedTitle}"
                class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                <svg class="w-12 h-12 text-white opacity-80 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </div>
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
            <div class="project-card" data-role="${project.role}" ${project.teaserVideo ? `data-video-src="${project.teaserVideo}"` : ""}>
                ${imageOrVideo}
                <div class="bg-imdb-gray p-4 rounded-b-lg">
                    <h3 class="text-xl font-bold">${translatedTitle}${yearText}</h3>
                    <p class="text-imdb-yellow">${translatedRole}</p>
                    ${project.type ? `<p class="text-sm text-gray-300">${project.type}</p>` : ""}
                    ${project.stars ? `<p class="text-sm font-semibold text-gray-200 mb-1">${project.stars}</p>` : ""}
                    ${clientHtml}
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

    // === RECENT PROJECTS ===
    if (recentContainer) {
        const recentProjects = PROJECTS.filter((p) => p.recent);
        recentContainer.innerHTML = "";
        recentProjects.forEach((project) => {
            recentContainer.insertAdjacentHTML("beforeend", buildAllProjectsCard(project, "h-48"));
        });
    }

    // === ALL PROJECTS (non-featured + featured) ===
    const featuredIds = new Set(featuredProjects.map((p) => p.id));
    const normalProjects = PROJECTS.filter((p) => !featuredIds.has(p.id));
    const orderedProjects = [...normalProjects, ...featuredProjects];

    orderedProjects.forEach((project) => {
        allContainer.insertAdjacentHTML("beforeend", buildAllProjectsCard(project, "h-48"));
    });
}

/* ============================================
   SIMPLE ABOUT PAGE GALLERY SYSTEM (fixed)
   ============================================ */

function setupSimpleGallery(options) {
    const { triggerId, sectionId, gridId, folder, baseName, totalImages } = options;

    const trigger = document.getElementById(triggerId);
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (!trigger || !section || !grid) return;

    const arrow = trigger.querySelector(".gallery-arrow");
    const header = section.querySelector(".gallery-header");
    const closeBtn = section.querySelector(".gallery-close");

    // Load images only once
    if (grid.children.length === 0) {
        const exts = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];

        for (let i = 1; i <= totalImages; i++) {
            const num = String(i).padStart(2, "0");
            const basePath = `images/${folder}/${baseName}${num}`;

            const wrap = document.createElement("div");
            wrap.className =
                "border-2 border-imdb-yellow rounded-lg overflow-hidden bg-black/40";

            const img = document.createElement("img");
            img.className = "w-full h-40 md:h-52 object-cover";
            img.dataset.base = basePath;
            img.dataset.index = "0";

            function loadNext() {
                const idx = parseInt(img.dataset.index, 10);
                if (idx >= exts.length) {
                    wrap.style.display = "none";
                    return;
                }
                img.src = img.dataset.base + exts[idx];
                img.dataset.index = String(idx + 1);
            }

            img.onerror = loadNext;
            loadNext();

            wrap.appendChild(img);
            grid.appendChild(wrap);
        }
    }

    // OPEN / CLOSE via thumbnail
    trigger.addEventListener("click", () => {
        const opening = section.classList.contains("hidden");
        section.classList.toggle("hidden");

        if (arrow) arrow.textContent = opening ? "▼" : "►";

        if (opening) {
            setTimeout(() => {
                const headerEl = section.querySelector(".gallery-header");
headerEl.scrollIntoView({ behavior: "smooth", block: "center" });

            }, 150);
        }
    });

    // HEADER click closes gallery and scrolls back to thumbnail
    if (header) {
        header.addEventListener("click", () => {
            section.classList.add("hidden");
            if (arrow) arrow.textContent = "►";
            trigger.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    // CLOSE BUTTON (▲) – optional, but we guard anyway
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            section.classList.add("hidden");
            if (arrow) arrow.textContent = "►";
            trigger.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }
}

/* ============================================
   RECENT PROJECT VIDEO/LINK HANDLING
   ============================================ */

function initRecentProjectVideos() {
    const recentContainer = document.getElementById('recent-projects');
    if (!recentContainer) return;

    // Handle videos (hover and click behavior)
    const videos = recentContainer.querySelectorAll('.recent-video');
    videos.forEach((video) => {
        const src = video.getAttribute('data-teaser-src');
        if (!src) return;

        video.src = src;
        video.load();
        video.loop = true;

        const container = video.parentElement;
        const poster = container.querySelector('.recent-poster');
        const hint = container.querySelector('.mobile-video-hint');
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        // Hover behavior for desktop
        container.addEventListener('mouseenter', () => {
            if (isMobile) return;
            poster.classList.add('opacity-0');
            video.classList.add('opacity-100');
            video.play();
            if (hint) hint.classList.add('hidden');
        });

        container.addEventListener('mouseleave', () => {
            if (isMobile) return;
            video.pause();
            video.classList.remove('opacity-100');
            poster.classList.remove('opacity-0');
            if (hint) hint.classList.remove('hidden');
        });

        // Click behavior for mobile
        container.addEventListener('click', () => {
            if (!isMobile) return;
            video.play();
            poster.classList.add('opacity-0');
            video.classList.add('opacity-100');
            if (hint) hint.classList.add('hidden');
        });

        video.addEventListener('pause', () => {
            if (isMobile && hint) hint.classList.remove('hidden');
        });

        // Click to open fullscreen
        container.addEventListener('click', () => {
            showVideoModal(src);
        });
    });

    // Handle link clicks
    const projectCards = recentContainer.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        const link = card.querySelector('a');
        const imageContainer = card.querySelector('[class*="relative"]');

        if (link && !card.querySelector('.recent-video')) {
            // Only for non-video projects with links
            if (imageContainer) {
                imageContainer.style.cursor = 'pointer';
                imageContainer.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(link.href, '_blank');
                });
            }
        }
    });
}

function showVideoModal(videoSrc) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="relative w-full max-w-4xl max-h-96">
            <button class="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 transition" onclick="this.closest('.fixed').remove()">×</button>
            <video class="w-full h-full object-contain rounded-lg" controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/* ============================================
   FEATURED VIDEOS (unchanged from your logic)
   ============================================ */

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
            if (isMobile) return;
            poster.classList.add("opacity-0");
            video.classList.add("opacity-100");
            video.play();
            if (hint) hint.classList.add("hidden");
        });

        container.addEventListener("mouseleave", () => {
            if (isMobile) return;
            video.pause();
            video.classList.remove("opacity-100");
            poster.classList.remove("opacity-0");
            if (hint) hint.classList.remove("hidden");
        });

        container.addEventListener("click", () => {
            if (!isMobile) return;
            video.play();
            poster.classList.add("opacity-0");
            video.classList.add("opacity-100");
            if (hint) hint.classList.add("hidden");
        });

        video.addEventListener("pause", () => {
            if (isMobile && hint) hint.classList.remove("hidden");
        });
    });
}

/* ============================================
   INIT ROLE FILTERS
   ============================================ */

function initRoleFilters() {
    const roleFilters = document.querySelectorAll(".role-filter");
    if (roleFilters.length === 0) return;

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

            if (role === "all") {
                featuredSection?.classList.remove("hidden");
                featuredHeading?.classList.remove("hidden");
                allProjectsSection?.classList.remove("hidden");
                if (allProjectsHeading && typeof t === "function") {
                    allProjectsHeading.textContent = t("All Projects");
                }
            } else {
                featuredSection?.classList.add("hidden");
                featuredHeading?.classList.add("hidden");
                allProjectsSection?.classList.remove("hidden");
                if (allProjectsHeading) {
                    allProjectsHeading.textContent = this.textContent.trim();
                }
            }

            updateProjectVisibility(role);
        });
    });

    // Default filter
    const defaultFilter = document.querySelector('.role-filter[data-role="all"]');
    if (defaultFilter) defaultFilter.click();
}

/* ============================================
   PRODUCTION MENU
   ============================================ */

function initProductionDropdown() {
    const productionToggle = document.getElementById("production-toggle");
    const productionSubmenu = document.getElementById("production-submenu");

    if (productionToggle && productionSubmenu) {
        productionToggle.addEventListener("click", () => {
            productionSubmenu.classList.toggle("hidden");
        });
    }
}

/* ============================================
   CONTACT FORM
   ============================================ */

function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formSuccess = document.getElementById("form-success");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" }
        })
            .then((response) => {
                if (response.ok) {
                    if (formSuccess) formSuccess.classList.remove("hidden");
                    contactForm.reset();
                } else {
                    alert("Something went wrong. Please try again.");
                }
            })
            .catch(() => {
                alert("Could not send the message. Please try again later.");
            });
    });
}



/* ============================================
   DOMContentLoaded – INIT EVERYTHING
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    // Projects page
    renderProjectsFromData();
    initRoleFilters();
    initFeaturedVideos();
    initRecentProjectVideos();
    initProductionDropdown();
    initContactForm();

    // About page galleries
    setupSimpleGallery({
        triggerId: "open-berlin-gallery",
        sectionId: "berlin-gallery",
        gridId: "berlin-grid",
        folder: "berlin_locs",
        baseName: "berlin_",
        totalImages: 29
    });

    setupSimpleGallery({
        triggerId: "open-behind-gallery",
        sectionId: "behind-gallery",
        gridId: "behind-grid",
        folder: "behind_scenes",
        baseName: "behind",
        totalImages: 20
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
