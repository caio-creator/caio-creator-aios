// Global config holder
let currentConfig = null;

// Load and render brand data
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Config not found');
        currentConfig = await response.json();
        renderBrand();
    } catch (error) {
        console.error('Error loading config:', error);
        const brandEl = document.getElementById('brandName');
        if (brandEl) brandEl.textContent = 'Erro ao carregar';
    }
}

function renderBrand() {
    // Use textContent (safe) not innerHTML
    const brandEl = document.getElementById('brandName');
    const dateEl = document.getElementById('updatedDate');

    if (brandEl) brandEl.textContent = currentConfig.brand.name;
    if (dateEl) dateEl.textContent = currentConfig.brand.updated_at;

    renderAllSections();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Section navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            showSection(section);

            // Update active state
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Theme toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('preferredTheme', theme);

            // Update active theme button
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Restore saved theme
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const activeBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

// Show specific section
function showSection(sectionName) {
    const container = document.getElementById('sectionsContainer');
    if (!container) return;

    container.textContent = ''; // Clear safely

    const renderFn = sectionRenderers[sectionName];
    if (renderFn) {
        renderFn(container);
    }
}

// Section renderer dispatcher
const sectionRenderers = {
    logo: renderLogoSection,
    typography: renderTypographySection,
    colors: renderColorsSection,
    components: renderComponentsSection,
    icons: renderIconsSection,
    photography: renderPhotographySection,
    applications: renderApplicationsSection
};

function renderAllSections() {
    showSection('logo'); // Default section
}

// Placeholder functions for section renderers (to be implemented in Tasks 5-11)
function renderLogoSection(container) { }
function renderTypographySection(container) { }
function renderColorsSection(container) { }
function renderComponentsSection(container) { }
function renderIconsSection(container) { }
function renderPhotographySection(container) { }
function renderApplicationsSection(container) { }
