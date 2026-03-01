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

// Task 5: Logo Section Renderer
function renderLogoSection(container) {
    const section = document.createElement('section');
    section.className = 'section-logo';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Logo';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Variações e usos do logotipo';
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    // Logo variations grid
    const grid = document.createElement('div');
    grid.className = 'logo-variations';

    if (currentConfig.logo && currentConfig.logo.variations) {
        currentConfig.logo.variations.forEach(variant => {
            const item = document.createElement('div');
            item.className = 'logo-item';

            // Logo preview (image)
            const preview = document.createElement('div');
            preview.className = 'logo-preview';
            const img = document.createElement('img');
            img.src = variant.file;
            img.alt = variant.name;
            preview.appendChild(img);
            item.appendChild(preview);

            // Logo name
            const name = document.createElement('p');
            name.className = 'logo-name';
            name.textContent = variant.name;
            item.appendChild(name);

            // Action buttons
            const actions = document.createElement('div');
            actions.className = 'logo-actions';

            const copyBtn = createCopyButton(variant.file, 'Copiar');
            const dlBtn = document.createElement('button');
            dlBtn.className = 'action-btn secondary';
            dlBtn.textContent = 'Download';
            dlBtn.addEventListener('click', () => downloadFile(variant.file));

            actions.appendChild(copyBtn);
            actions.appendChild(dlBtn);
            item.appendChild(actions);

            grid.appendChild(item);
        });
    }

    section.appendChild(grid);
    container.appendChild(section);
}

function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
}

// Task 6: Typography Section Renderer
function renderTypographySection(container) {
    const section = document.createElement('section');
    section.className = 'section-typography';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Tipografia';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Famílias, pesos e tamanhos de fonte';
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    // Typography grid
    const grid = document.createElement('div');
    grid.className = 'typography-grid';

    if (currentConfig.typography) {
        // Primary font
        const primary = currentConfig.typography.primary;
        const primaryDiv = document.createElement('div');
        primaryDiv.className = 'typography-family';

        const primaryTitle = document.createElement('h3');
        primaryTitle.textContent = primary.name;
        primaryDiv.appendChild(primaryTitle);

        const primaryCategory = document.createElement('p');
        primaryCategory.className = 'font-category';
        primaryCategory.textContent = 'Fonte primária';
        primaryDiv.appendChild(primaryCategory);

        const primaryWeights = document.createElement('div');
        primaryWeights.className = 'weights-grid';

        if (primary.weights) {
            primary.weights.forEach(weight => {
                const sample = document.createElement('div');
                sample.className = 'weight-sample';
                sample.style.fontWeight = weight;
                sample.style.fontFamily = `'${primary.name}'`;

                const label = document.createElement('p');
                label.textContent = `Peso ${weight}`;
                sample.appendChild(label);

                const text = document.createElement('p');
                text.className = 'sample-text';
                text.textContent = 'Abc defghijklm nopqr stuvwxyz';
                sample.appendChild(text);

                primaryWeights.appendChild(sample);
            });
        }

        primaryDiv.appendChild(primaryWeights);
        grid.appendChild(primaryDiv);

        // Secondary font (similar structure)
        const secondary = currentConfig.typography.secondary;
        const secondaryDiv = document.createElement('div');
        secondaryDiv.className = 'typography-family';

        const secondaryTitle = document.createElement('h3');
        secondaryTitle.textContent = secondary.name;
        secondaryDiv.appendChild(secondaryTitle);

        const secondaryCategory = document.createElement('p');
        secondaryCategory.className = 'font-category';
        secondaryCategory.textContent = 'Fonte secundária';
        secondaryDiv.appendChild(secondaryCategory);

        const secondaryWeights = document.createElement('div');
        secondaryWeights.className = 'weights-grid';

        if (secondary.weights) {
            secondary.weights.forEach(weight => {
                const sample = document.createElement('div');
                sample.className = 'weight-sample';
                sample.style.fontWeight = weight;
                sample.style.fontFamily = `'${secondary.name}'`;

                const label = document.createElement('p');
                label.textContent = `Peso ${weight}`;
                sample.appendChild(label);

                const text = document.createElement('p');
                text.className = 'sample-text';
                text.textContent = 'Abc defghijklm nopqr stuvwxyz';
                sample.appendChild(text);

                secondaryWeights.appendChild(sample);
            });
        }

        secondaryDiv.appendChild(secondaryWeights);
        grid.appendChild(secondaryDiv);

        section.appendChild(grid);

        // Sizes reference
        const sizesRef = document.createElement('div');
        sizesRef.className = 'sizes-reference';
        const sizesTitle = document.createElement('h3');
        sizesTitle.textContent = 'Tamanhos recomendados';
        sizesRef.appendChild(sizesTitle);

        const sizesList = document.createElement('div');
        sizesList.className = 'sizes-list';

        if (primary.sizes) {
            primary.sizes.forEach(size => {
                const sizeItem = document.createElement('div');
                sizeItem.className = 'size-item';

                const sizeDisplay = document.createElement('p');
                sizeDisplay.style.fontSize = `${size}px`;
                sizeDisplay.style.fontFamily = `'${primary.name}'`;
                sizeDisplay.textContent = `${size}px`;
                sizeItem.appendChild(sizeDisplay);

                const copyBtn = createCopyButton(`${size}px`, 'Copy');
                sizeItem.appendChild(copyBtn);

                sizesList.appendChild(sizeItem);
            });
        }

        sizesRef.appendChild(sizesList);
        section.appendChild(sizesRef);
    }

    container.appendChild(section);
}

// Task 7: Colors Section Renderer
function renderColorsSection(container) {
    const section = document.createElement('section');
    section.className = 'section-colors';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Paleta de Cores';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Cores primárias, secundárias e neutras';
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    // Color categories
    if (currentConfig.colors) {
        ['primary', 'secondary', 'neutral'].forEach(category => {
            if (!currentConfig.colors[category]) return;

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'color-category';

            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryDiv.appendChild(categoryTitle);

            const colorsGrid = document.createElement('div');
            colorsGrid.className = 'colors-grid';

            currentConfig.colors[category].forEach(color => {
                const item = document.createElement('div');
                item.className = 'color-item';
                item.addEventListener('click', () => copyToClipboard(color.hex));
                item.style.cursor = 'pointer';

                // Color swatch
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color.hex;
                item.appendChild(swatch);

                // Color info
                const info = document.createElement('div');
                info.className = 'color-info';

                const name = document.createElement('p');
                name.className = 'color-name';
                name.textContent = color.name;
                info.appendChild(name);

                const values = document.createElement('p');
                values.className = 'color-values';

                const hexSpan = document.createElement('span');
                hexSpan.className = 'hex';
                hexSpan.textContent = color.hex;
                values.appendChild(hexSpan);

                if (color.rgb) {
                    const rgbSpan = document.createElement('span');
                    rgbSpan.className = 'rgb';
                    rgbSpan.textContent = `rgb(${color.rgb})`;
                    values.appendChild(rgbSpan);
                }

                info.appendChild(values);
                item.appendChild(info);

                const icon = document.createElement('button');
                icon.className = 'copy-icon';
                icon.textContent = '📋';
                icon.style.border = 'none';
                icon.style.background = 'none';
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    copyToClipboard(color.hex, icon);
                });
                item.appendChild(icon);

                colorsGrid.appendChild(item);
            });

            categoryDiv.appendChild(colorsGrid);
            section.appendChild(categoryDiv);
        });
    }

    container.appendChild(section);
}

// Task 8: Components Section Renderer
function renderComponentsSection(container) {
    const section = document.createElement('section');
    section.className = 'section-components';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Componentes UI';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Botões, cards, badges e outros elementos';
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    if (currentConfig.components) {
        // Tabs
        const tabs = document.createElement('div');
        tabs.className = 'components-tabs';

        const tabBtns = {};
        ['buttons', 'cards', 'badges'].forEach((tabName, idx) => {
            if (!currentConfig.components[tabName]) return;

            const btn = document.createElement('button');
            btn.className = 'tab-btn' + (idx === 0 ? ' active' : '');
            btn.dataset.tab = tabName;
            btn.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);
            tabs.appendChild(btn);
            tabBtns[tabName] = btn;
        });

        section.appendChild(tabs);

        // Tab content
        const content = document.createElement('div');
        content.className = 'components-content';

        ['buttons', 'cards', 'badges'].forEach((tabName, idx) => {
            if (!currentConfig.components[tabName]) return;

            const tabContent = document.createElement('div');
            tabContent.className = 'tab-content' + (idx === 0 ? ' active' : '');
            tabContent.dataset.tab = tabName;

            const grid = document.createElement('div');
            grid.className = 'component-grid';

            currentConfig.components[tabName].forEach(comp => {
                const preview = document.createElement('div');
                preview.className = 'component-preview';

                // Render preview
                const render = document.createElement('div');
                render.className = 'preview-render';
                const compName = document.createElement('p');
                compName.textContent = comp.name;
                render.appendChild(compName);
                preview.appendChild(render);

                // Name
                const name = document.createElement('p');
                name.className = 'component-name';
                name.textContent = comp.name;
                preview.appendChild(name);

                // Expand button
                const expandBtn = document.createElement('button');
                expandBtn.className = 'expand-btn';
                expandBtn.textContent = 'Código';
                preview.appendChild(expandBtn);

                // Code display (hidden initially)
                const codeDiv = document.createElement('div');
                codeDiv.className = 'component-code';
                codeDiv.style.display = 'none';

                const codeBlock = document.createElement('pre');
                const code = document.createElement('code');
                const codeText = (comp.html || '') + '\n\n' + (comp.css || '');
                code.textContent = codeText;
                codeBlock.appendChild(code);
                codeDiv.appendChild(codeBlock);

                const copyCodeBtn = document.createElement('button');
                copyCodeBtn.className = 'copy-code-btn';
                copyCodeBtn.textContent = 'Copy Code';
                copyCodeBtn.addEventListener('click', () => {
                    copyToClipboard(codeText, copyCodeBtn);
                });
                codeDiv.appendChild(copyCodeBtn);

                preview.appendChild(codeDiv);

                // Toggle code display
                expandBtn.addEventListener('click', () => {
                    codeDiv.style.display = codeDiv.style.display === 'none' ? 'block' : 'none';
                });

                grid.appendChild(preview);
            });

            tabContent.appendChild(grid);
            content.appendChild(tabContent);
        });

        section.appendChild(content);

        // Tab switching logic
        Object.keys(tabBtns).forEach(tabName => {
            tabBtns[tabName].addEventListener('click', () => {
                // Hide all tabs
                document.querySelectorAll('.tab-content').forEach(t => {
                    if (t.parentElement === content) t.classList.remove('active');
                });
                document.querySelectorAll('.tab-btn').forEach(b => {
                    if (b.parentElement === tabs) b.classList.remove('active');
                });

                // Show selected tab
                const selectedTab = Array.from(content.children).find(t => t.dataset.tab === tabName);
                if (selectedTab) selectedTab.classList.add('active');
                tabBtns[tabName].classList.add('active');
            });
        });
    }

    container.appendChild(section);
}

// Task 9: Icons Section Renderer
function renderIconsSection(container) {
    const section = document.createElement('section');
    section.className = 'section-icons';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Ícones';
    const iconCount = (currentConfig.icons && currentConfig.icons.count) || 0;
    const subtitle = document.createElement('p');
    subtitle.textContent = `${iconCount} ícones disponíveis`;
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    // Icons grid
    const grid = document.createElement('div');
    grid.className = 'icons-grid';

    for (let i = 0; i < iconCount; i++) {
        const item = document.createElement('div');
        item.className = 'icon-item';
        item.addEventListener('click', () => copyToClipboard(`icon-${i + 1}`));
        item.style.cursor = 'pointer';

        const preview = document.createElement('div');
        preview.className = 'icon-preview';

        // SVG icon (placeholder)
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '40');
        svg.setAttribute('height', '40');
        svg.setAttribute('viewBox', '0 0 40 40');
        svg.setAttribute('fill', 'currentColor');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '20');
        circle.setAttribute('cy', '20');
        circle.setAttribute('r', '18');
        circle.setAttribute('stroke', 'currentColor');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'none');
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '20');
        text.setAttribute('y', '24');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.textContent = String(i + 1);
        svg.appendChild(text);

        preview.appendChild(svg);
        item.appendChild(preview);

        const name = document.createElement('p');
        name.className = 'icon-name';
        name.textContent = `icon-${i + 1}`;
        item.appendChild(name);

        grid.appendChild(item);
    }

    section.appendChild(grid);
    container.appendChild(section);
}

// Task 10: Photography Section Renderer
function renderPhotographySection(container) {
    const section = document.createElement('section');
    section.className = 'section-photography';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Fotografia';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Estilo, composição e aplicação de imagens';
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    if (currentConfig.photography) {
        // Guidelines
        const guidelines = document.createElement('div');
        guidelines.className = 'photo-guidelines';
        const guideTitle = document.createElement('h3');
        guideTitle.textContent = 'Diretrizes de Estilo';
        guidelines.appendChild(guideTitle);
        const guideText = document.createElement('p');
        guideText.textContent = currentConfig.photography.guidelines || 'Warm, humanized style';
        guidelines.appendChild(guideText);
        section.appendChild(guidelines);

        // Mood board
        const moodboard = document.createElement('div');
        moodboard.className = 'mood-board';
        const moodTitle = document.createElement('h3');
        moodTitle.textContent = 'Mood Board';
        moodboard.appendChild(moodTitle);

        const moodImages = document.createElement('div');
        moodImages.className = 'mood-images';

        if (currentConfig.photography.mood_images) {
            currentConfig.photography.mood_images.forEach(img => {
                const item = document.createElement('div');
                item.className = 'mood-image';
                const imgEl = document.createElement('img');
                imgEl.src = img;
                imgEl.alt = 'Mood board image';
                item.appendChild(imgEl);
                moodImages.appendChild(item);
            });
        }

        moodboard.appendChild(moodImages);
        section.appendChild(moodboard);
    }

    container.appendChild(section);
}

// Task 11: Applications Section Renderer
function renderApplicationsSection(container) {
    const section = document.createElement('section');
    section.className = 'section-applications';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    const title = document.createElement('h2');
    title.textContent = 'Aplicações';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Exemplos de uso da marca em contexto real';
    header.appendChild(title);
    header.appendChild(subtitle);
    section.appendChild(header);

    // Applications grid
    const grid = document.createElement('div');
    grid.className = 'applications-grid';

    if (currentConfig.applications) {
        currentConfig.applications.forEach(app => {
            const mockup = document.createElement('div');
            mockup.className = 'app-mockup';

            const img = document.createElement('img');
            img.src = app.image;
            img.alt = app.name;
            mockup.appendChild(img);

            const name = document.createElement('p');
            name.className = 'app-name';
            name.textContent = app.name;
            mockup.appendChild(name);

            grid.appendChild(mockup);
        });
    }

    section.appendChild(grid);
    container.appendChild(section);
}

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
