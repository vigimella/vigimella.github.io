let cvData = {};

document.addEventListener("DOMContentLoaded", () => {
    // Load clean, decoupling dynamic portfolio data matrix matrix
    fetch('../json/cv-data.json')
        .then(res => res.json())
        .then(data => {
            cvData = data;
            initializePortfolio();
        })
        .catch(err => console.error("Error loading decoupled component JSON:", err));
});

function initializePortfolio() {
    // Bind core text elements
    document.getElementById('dyn-name').innerText = cvData.profile.name;
    document.title = `${cvData.profile.name} | Portfolio & Research`;
    document.getElementById('dyn-title').innerText = cvData.profile.title;
    document.getElementById('dyn-summary-text').innerText = cvData.profile.summary;
    document.getElementById('stat-pub-count').innerText = cvData.publications.length;

    let journalCount = 0;
    let conferenceCount = 0;

    cvData.publications.forEach(pub => {
        if (pub.type === 'journal') journalCount++;
        if (pub.type === 'conference') conferenceCount++;
    });

    document.getElementById('stat-journal-count').innerText = journalCount;
    document.getElementById('stat-conference-count').innerText = conferenceCount;

    // Generate Sidebar Core Communications links Components
    const socialsBox = document.getElementById('dyn-socials');
    socialsBox.innerHTML = `
                <a href="mailto:${cvData.profile.email}"><i class="fa-solid fa-envelope" style="color:var(--pastel-blue-dark);"></i> ${cvData.profile.email}</a>
                <a href="https://linkedin.com/in/${cvData.profile.linkedin}" target="_blank"><i class="fa-brands fa-linkedin" style="color:#0077b5;"></i> linkedin.com/in/${cvData.profile.linkedin}</a>
                <a href="https://github.com/${cvData.profile.github}" target="_blank"><i class="fa-brands fa-github" style="color:#171515;"></i> github.com/${cvData.profile.github}</a>
                <a href="https://scholar.google.com/citations?user=${cvData.profile.scholar}" target="_blank"><i class="fa-brands fa-google" style="color:#4285F4;"></i> Google Scholar</a>
                <a href="#"><i class="fa-solid fa-location-dot" style="color:var(--text-secondary);"></i> ${cvData.profile.location}</a>
            `;

    // Build structural timeline templates cleanly via looping architectures
    renderTimeline('timeline-education', cvData.education, 'education');
    renderTimeline('timeline-experience', cvData.experience, 'experience');

    // Render Tech stacks
    const skillsGrid = document.getElementById('skills-grid');
    for (const [category, list] of Object.entries(cvData.skills)) {
        const group = document.createElement('div');
        group.className = 'skill-group';
        group.innerHTML = `
                    <h4>${category}</h4>
                    <div class="tag-cloud">
                        ${list.map(skill => `<span class="tag">${skill}</span>`).join('')}
                    </div>
                `;
        skillsGrid.appendChild(group);
    }

    // Render Awards elements layout modules
    const awardsContainer = document.getElementById('awards-container');
    cvData.awards.forEach(aw => {
        const node = document.createElement('div');
        node.className = 'award-banner';
        node.innerHTML = `
                    <i class="fa-solid fa-trophy"></i>
                    <div>
                        <h4>${aw.title}</h4>
                        <p>${aw.details}</p>
                    </div>
                `;
        awardsContainer.appendChild(node);
    });

    // Initialize reactive layout table array list for research output items
    renderPublications(cvData.publications);

    // Hook up operational runtime instant query filtering index layers
    document.getElementById('pub-search').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = cvData.publications.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.authors.toLowerCase().includes(term) ||
            p.venue.toLowerCase().includes(term)
        );
        renderPublications(filtered);
    });

    // Launch active lazy scroll intersection dynamic reveal animation loops
    const sections = document.querySelectorAll('.reveal-section');
    const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        sec.classList.add('reveal-section');
        sectionObserver.observe(sec);
    });

    // Interactive Navigation highlighters tracking systems
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop;
            if (pageYOffset >= top - 120) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function renderTimeline(elementId, dataset, type) {
    const container = document.getElementById(elementId);
    dataset.forEach(item => {
        const el = document.createElement('div');
        el.className = `timeline-card ${type}-card`;
        el.innerHTML = `
                    <div class="card-header">
                        <div>
                            <h3>${item.role}</h3>
                            <span class="institution-badge">${item.institution}</span>
                        </div>
                        <span class="period-badge">${item.period}</span>
                    </div>
                    <div class="card-body">${item.details}</div>
                `;
        container.appendChild(el);
    });
}

function renderPublications(list) {
    const container = document.getElementById('publications-target');
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-secondary); font-size:14px;">No matching publication records located inside the database.</div>`;
        return;
    }

    list.forEach(p => {
        // Emphasize current author across publication strings dynamically
        const safeAuthors = p.authors.replace('Giovanni Ciaramella', '<span class="highlight-me">Giovanni Ciaramella</span>');
        const item = document.createElement('div');
        item.className = 'pub-item';
        item.innerHTML = `
                    <div class="pub-title">${p.title}</div>
                    <div class="pub-authors">${safeAuthors}</div>
                    <div class="pub-venue">${p.venue}</div>
                    ${p.url !== '#' ? `<a href="${p.url}" target="_blank" class="pub-link-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Publisher DOI Link</a>` : ''}
                `;
        container.appendChild(item);
    });
}
