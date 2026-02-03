// ===========================
// Shared Utilities (run on every page)
// ===========================
document.addEventListener('DOMContentLoaded', function () {

    // ── Body loaded class (triggers hero animations on index.html) ──
    requestAnimationFrame(function () {
        document.body.classList.add('loaded');
    });

    // ── Copy Email ──
    var copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var email = 'filip@jaern.se';
            var label = copyBtn.querySelector('.copy-label');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email)
                    .then(function () { showCopiedState(copyBtn, label); })
                    .catch(function () { fallbackCopy(email, copyBtn, label); });
            } else {
                fallbackCopy(email, copyBtn, label);
            }
        });
    }

    // ── Page routing: detect which page we're on and run the right renderer ──
    if (document.getElementById('works-grid-mount')) {
        renderWorksGrid(window.WORKS_DATA || []);
    }

    if (document.getElementById('work-detail')) {
        initWorkDetail(window.WORKS_DATA || []);
    }
});

// ===========================
// Shared Helpers
// ===========================

/** Show "Copied" for 1.2s then revert */
function showCopiedState(button, label) {
    var original = label.textContent;
    label.textContent = 'Copied';
    button.classList.add('copied');
    setTimeout(function () {
        label.textContent = original;
        button.classList.remove('copied');
    }, 1200);
}

/** Fallback copy for browsers without Clipboard API */
function fallbackCopy(text, button, label) {
    var input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999);
    try {
        if (document.execCommand('copy')) {
            showCopiedState(button, label);
        }
    } catch (e) { /* silent */ }
    document.body.removeChild(input);
}

/**
 * Returns HTML for an image slot.
 * If url is a non-empty string → <img> with the given classes.
 * If url is empty/falsy        → <div class="media-placeholder"> with the given classes.
 */
function imageOrPlaceholder(url, extraClasses) {
    extraClasses = extraClasses || '';
    if (url && url.trim() !== '') {
        return '<img src="' + url + '" alt="" class="placeholder-img ' + extraClasses + '">';
    }
    return '<div class="media-placeholder ' + extraClasses + '"></div>';
}

// ===========================
// Works Grid Renderer (works.html)
// ===========================

/**
 * Renders the project card grid into #works-grid-mount.
 * @param {Array} data - The full WORKS_DATA array.
 */
function renderWorksGrid(data) {
    var mount = document.getElementById('works-grid-mount');
    if (!mount || !data.length) return;

    mount.innerHTML = data.map(function (project) {
        return [
            '<a href="work.html?id=' + project.id + '" class="project-card">',
                '<div class="card-header">',
                    '<h3 class="card-title">' + project.title + '</h3>',
                    '<div class="card-tags">',
                        '<span class="tag">' + project.industry + '</span>',
                        '<span class="tag">' + project.year + '</span>',
                    '</div>',
                '</div>',
                '<div class="card-media">',
                    imageOrPlaceholder(project.heroImage, 'card-image'),
                '</div>',
                '<div class="card-cta">',
                    '<button class="cta-button">View project</button>',
                '</div>',
            '</a>'
        ].join('');
    }).join('');
}

// ===========================
// Work Detail Renderer (work.html)
// ===========================

/**
 * Entry point for work.html.
 * Reads ?id= from the URL, finds the project, renders it.
 * Shows not-found state if the id is missing or invalid.
 * @param {Array} data - The full WORKS_DATA array.
 */
function initWorkDetail(data) {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    // Find the project and its index
    var currentIndex = -1;
    var current = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            current = data[i];
            currentIndex = i;
            break;
        }
    }

    // ── Not found ──
    if (!current) {
        document.getElementById('not-found').style.display = 'flex';
        document.getElementById('work-detail').style.display = 'none';
        document.title = 'Not Found - Filip Jaern';
        return;
    }

    // ── Compute next work (wraps around) ──
    var nextIndex = (currentIndex + 1) % data.length;
    var next = data[nextIndex];

    // ── Render ──
    renderWorkDetail(current, next);

    // ── Update page title ──
    document.title = current.title + ' - Filip Jaern';

    // ── Show the detail, hide not-found ──
    document.getElementById('work-detail').style.display = 'block';
    document.getElementById('not-found').style.display = 'none';
}

/**
 * Populates all the mount points on work.html with one project's data.
 * @param {Object} work     - The current project object.
 * @param {Object} nextWork - The next project object (for the teaser).
 */
function renderWorkDetail(work, nextWork) {

    // ── Hero ──
    document.getElementById('work-hero-bg').innerHTML = imageOrPlaceholder(work.heroImage, 'work-hero-placeholder');
    document.getElementById('work-hero-title').textContent = work.title;

    // ── Intro text ──
    document.getElementById('work-intro-text').textContent = work.introText;

    // ── Deliverables ──
    document.getElementById('work-deliverables').innerHTML = work.deliverables.map(function (item) {
        return '<p class="project-deliverables-item">' + item + '</p>';
    }).join('');

    // ── Meta pills ──
    document.getElementById('work-meta-pills').innerHTML = Object.keys(work.meta).map(function (key) {
        return '<span class="pill pill-filled">' + key + ' / ' + work.meta[key] + '</span>';
    }).join('');

    // ── Three images ──
    document.getElementById('work-image-large').innerHTML  = imageOrPlaceholder(work.images[0], 'project-image-large');
    document.getElementById('work-image-half-1').innerHTML = imageOrPlaceholder(work.images[1], 'project-image-half');
    document.getElementById('work-image-half-2').innerHTML = imageOrPlaceholder(work.images[2], 'project-image-half');

    // ── Next work teaser ──
    // Preview image: use nextPreviewImage if set, otherwise fall back to the next project's heroImage
    var previewImg = nextWork.nextPreviewImage || nextWork.heroImage;
    document.getElementById('next-work-image').innerHTML = imageOrPlaceholder(previewImg, 'next-work-placeholder');
    document.getElementById('next-work-title').textContent = nextWork.title;
    document.getElementById('next-work-link').setAttribute('href', 'work.html?id=' + nextWork.id);
}
