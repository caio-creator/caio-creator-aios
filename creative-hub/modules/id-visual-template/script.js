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

// Copy text to clipboard with visual feedback
async function copyToClipboard(text, button = null) {
    try {
        await navigator.clipboard.writeText(text);

        if (button) {
            const originalText = button.textContent;
            button.textContent = '✓ Copiado!';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }

        return true;
    } catch (error) {
        console.error('Copy failed:', error);
        return false;
    }
}

// Create a copy button element
function createCopyButton(text, label = 'Copy') {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => copyToClipboard(text, btn));
    return btn;
}
