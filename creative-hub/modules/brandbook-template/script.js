/* ==========================================================================
   Brandbook One-Page Template — Script
   Loads config.json and populates the entire brandbook dynamically.
   SAFETY: Zero innerHTML usage. All DOM via createElement/textContent/appendChild.
   ========================================================================== */

// ---------------------------------------------------------------------------
// Global State
// ---------------------------------------------------------------------------

let config = null;

// Global fallback for broken images
window.addEventListener('error', function(e) {
  if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
    e.target.classList.remove('img-skeleton');
    var fallbackText = encodeURIComponent(e.target.alt || 'Asset Missing');
    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%231A1A1D"/><path d="M150 150 L250 150 M200 100 L200 200" stroke="%2327272A" stroke-width="1"/><text x="50%" y="50%" fill="%2371717A" font-family="sans-serif" font-size="14" font-weight="600" letter-spacing="2" text-anchor="middle" dominant-baseline="middle">' + fallbackText + '</text></svg>';
    e.target.style.objectFit = 'cover';
    e.target.style.minHeight = '120px';
  }
}, true);

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('config.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ' ' + response.statusText);
    }
    config = await response.json();
    renderAll();
    setupScrollSpy();
    setupMobileMenu();
    setupScrollReveal();
  } catch (error) {
    console.error('Failed to load config:', error);
    showError('Erro ao carregar configuracao. Verifique se config.json existe.');
  }
});

// ---------------------------------------------------------------------------
// Error Display
// ---------------------------------------------------------------------------

function showError(message) {
  var div = document.createElement('div');
  div.className = 'error-message';
  div.textContent = message;
  div.style.position = 'fixed';
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.transform = 'translate(-50%, -50%)';
  div.style.background = '#1A1A1D';
  div.style.color = '#ef4444';
  div.style.padding = '32px 48px';
  div.style.borderRadius = '12px';
  div.style.border = '1px solid rgba(239, 68, 68, 0.3)';
  div.style.fontSize = '16px';
  div.style.fontFamily = 'Inter, sans-serif';
  div.style.zIndex = '9999';
  div.style.textAlign = 'center';
  document.body.appendChild(div);
}

// ---------------------------------------------------------------------------
// Render Orchestrator
// ---------------------------------------------------------------------------

function renderAll() {
  renderHero();
  renderManifesto();
  renderValues();
  renderVoice();
  renderLogo();
  renderColors();
  renderTypography();
  renderPatterns();
  renderPhotography();
  renderApplications();
  renderSummary();
  renderFooter();
  renderSidebar();

  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.classList.add('img-skeleton');
        img.addEventListener('load', () => img.classList.remove('img-skeleton'));
      }
    });
  }, 0);
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function renderSidebar() {
  // Sidebar logo
  if (config.brand && config.brand.logo) {
    var container = document.getElementById('sidebarLogo');
    if (container) {
      var img = document.createElement('img');
      img.src = config.brand.logo;
      img.alt = config.brand.name || 'Logo';
      container.appendChild(img);
    }
  }

  // Sidebar year
  var yearEl = document.getElementById('sidebarYear');
  if (yearEl) {
    var year = (config.brand && config.brand.year) ? config.brand.year : new Date().getFullYear();
    yearEl.textContent = year;
  }
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------

function renderHero() {
  // Hero logo
  if (config.brand && config.brand.logo) {
    var logoContainer = document.getElementById('heroLogo');
    if (logoContainer) {
      var img = document.createElement('img');
      img.src = config.brand.logo;
      img.alt = config.brand.name || 'Logo';
      logoContainer.appendChild(img);
    }
  }

  // Hero title
  var titleEl = document.getElementById('heroTitle');
  if (titleEl && config.brand && config.brand.name) {
    titleEl.textContent = config.brand.name;
  }

  // Hero tagline
  var taglineEl = document.getElementById('heroTagline');
  if (taglineEl && config.brand && config.brand.tagline) {
    taglineEl.textContent = config.brand.tagline;
  }

  // Marquee
  var marqueeEl = document.getElementById('marqueeText');
  if (marqueeEl && config.brand && config.brand.name) {
    var separator = ' \u00B7 ';
    var repeated = '';
    for (var i = 0; i < 4; i++) {
      if (i > 0) {
        repeated += separator;
      }
      repeated += config.brand.name;
    }
    repeated += separator;
    marqueeEl.textContent = repeated;

    // Clone the marquee-text span for seamless infinite loop
    var clone = document.createElement('span');
    clone.className = 'marquee-text';
    clone.textContent = repeated;
    marqueeEl.parentNode.appendChild(clone);
  }
}

// ---------------------------------------------------------------------------
// Manifesto Section
// ---------------------------------------------------------------------------

function renderManifesto() {
  // Title
  var titleEl = document.getElementById('manifestoTitle');
  if (titleEl && config.manifesto) {
    titleEl.textContent = config.manifesto.title || 'Manifesto';
  }

  // Text paragraphs
  var textContainer = document.getElementById('manifestoText');
  if (textContainer && config.manifesto && config.manifesto.text) {
    var paragraphs;
    if (Array.isArray(config.manifesto.text)) {
      paragraphs = config.manifesto.text;
    } else {
      paragraphs = config.manifesto.text.split('\n\n');
    }

    for (var i = 0; i < paragraphs.length; i++) {
      var p = document.createElement('p');
      p.textContent = paragraphs[i];
      if (i === 0) {
        p.className = 'drop-cap';
      }
      textContainer.appendChild(p);
    }
  }
}

// ---------------------------------------------------------------------------
// Values Section
// ---------------------------------------------------------------------------

function renderValues() {
  var grid = document.getElementById('valuesGrid');
  if (!grid || !config.values || !Array.isArray(config.values)) return;

  for (var i = 0; i < config.values.length; i++) {
    var value = config.values[i];

    var card = document.createElement('div');
    card.className = 'value-card';

    var icon = document.createElement('span');
    icon.className = 'value-icon';
    icon.textContent = value.icon || '';

    var title = document.createElement('h3');
    title.className = 'value-title';
    title.textContent = value.title || '';

    var desc = document.createElement('p');
    desc.className = 'value-description';
    desc.textContent = value.description || '';

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(desc);
    grid.appendChild(card);
  }
}

// ---------------------------------------------------------------------------
// Voice Section
// ---------------------------------------------------------------------------

function renderVoice() {
  if (!config.voice) return;

  // "We are" list
  var doList = document.getElementById('voiceDo');
  if (doList && config.voice.we_are && Array.isArray(config.voice.we_are)) {
    for (var i = 0; i < config.voice.we_are.length; i++) {
      var li = document.createElement('li');
      li.textContent = config.voice.we_are[i];
      doList.appendChild(li);
    }
  }

  // "We are not" list
  var dontList = document.getElementById('voiceDont');
  if (dontList && config.voice.we_are_not && Array.isArray(config.voice.we_are_not)) {
    for (var j = 0; j < config.voice.we_are_not.length; j++) {
      var li2 = document.createElement('li');
      li2.textContent = config.voice.we_are_not[j];
      dontList.appendChild(li2);
    }
  }

  // Voice examples
  var examplesContainer = document.getElementById('voiceExamples');
  if (examplesContainer && config.voice.examples && Array.isArray(config.voice.examples)) {
    for (var k = 0; k < config.voice.examples.length; k++) {
      var example = config.voice.examples[k];

      var exDiv = document.createElement('div');
      exDiv.className = 'voice-example';

      var label = document.createElement('span');
      label.className = 'voice-example-label';
      label.textContent = example.context || '';

      var text = document.createElement('p');
      text.className = 'voice-example-text';
      text.textContent = example.text || '';

      exDiv.appendChild(label);
      exDiv.appendChild(text);
      examplesContainer.appendChild(exDiv);
    }
  }
}

// ---------------------------------------------------------------------------
// Logo Section
// ---------------------------------------------------------------------------

function renderLogo() {
  if (!config.logo) return;

  // Primary logo
  var primaryContainer = document.getElementById('logoPrimary');
  if (primaryContainer && config.logo.primary) {
    var img = document.createElement('img');
    img.src = config.logo.primary;
    img.alt = 'Logo principal';
    primaryContainer.appendChild(img);
  }

  // Logo variations
  var variationsGrid = document.getElementById('logoVariations');
  if (variationsGrid && config.logo.variations && Array.isArray(config.logo.variations)) {
    for (var i = 0; i < config.logo.variations.length; i++) {
      var variation = config.logo.variations[i];

      var card = document.createElement('div');
      card.className = 'logo-variation-card';

      var varImg = document.createElement('img');
      varImg.src = variation.src || '';
      varImg.alt = variation.name || 'Variacao';

      var varLabel = document.createElement('span');
      varLabel.className = 'variation-label';
      varLabel.textContent = variation.name || '';

      card.appendChild(varImg);
      card.appendChild(varLabel);
      variationsGrid.appendChild(card);
    }
  }

  // Logo restrictions
  var restrictionsContainer = document.getElementById('logoRestrictions');
  if (restrictionsContainer && config.logo.restrictions && Array.isArray(config.logo.restrictions)) {
    for (var j = 0; j < config.logo.restrictions.length; j++) {
      var restriction = config.logo.restrictions[j];

      var rCard = document.createElement('div');
      rCard.className = 'restriction-card';
      if (restriction.type === 'do' || restriction.type === 'dont') {
        rCard.classList.add(restriction.type);
      }

      var rIcon = document.createElement('span');
      rIcon.className = 'restriction-icon';
      rIcon.textContent = restriction.type === 'do' ? '\u2713' : '\u2717';

      var rText = document.createElement('span');
      rText.className = 'restriction-text';
      rText.textContent = restriction.text || '';

      rCard.appendChild(rIcon);
      rCard.appendChild(rText);
      restrictionsContainer.appendChild(rCard);
    }
  }
}

// ---------------------------------------------------------------------------
// Colors Section
// ---------------------------------------------------------------------------

function renderColors() {
  var container = document.getElementById('colorsContainer');
  if (!container || !config.colors) return;

  var groupKeys = Object.keys(config.colors);

  for (var g = 0; g < groupKeys.length; g++) {
    var groupKey = groupKeys[g];
    var groupColors = config.colors[groupKey];

    if (!Array.isArray(groupColors)) continue;

    var groupDiv = document.createElement('div');
    groupDiv.className = 'color-group';

    var groupTitle = document.createElement('h3');
    groupTitle.className = 'color-group-title';
    groupTitle.textContent = capitalize(groupKey);

    var colorsGrid = document.createElement('div');
    colorsGrid.className = 'colors-grid';

    for (var c = 0; c < groupColors.length; c++) {
      var color = groupColors[c];

      var swatch = document.createElement('div');
      swatch.className = 'color-swatch';

      var preview = document.createElement('div');
      preview.className = 'swatch-preview';
      preview.style.backgroundColor = color.hex || '#000';

      var info = document.createElement('div');
      info.className = 'swatch-info';

      var name = document.createElement('span');
      name.className = 'swatch-name';
      name.textContent = color.name || '';

      var hex = document.createElement('span');
      hex.className = 'swatch-hex';
      hex.textContent = color.hex || '';

      var rgb = document.createElement('span');
      rgb.className = 'swatch-rgb';
      rgb.textContent = color.rgb ? 'RGB ' + color.rgb : '';

      info.appendChild(name);
      info.appendChild(hex);
      info.appendChild(rgb);

      swatch.appendChild(preview);
      swatch.appendChild(info);

      // Click to copy — use closure to capture hex value
      (function(hexValue) {
        swatch.addEventListener('click', function() {
          copyToClipboard(hexValue);
        });
      })(color.hex || '');

      colorsGrid.appendChild(swatch);
    }

    groupDiv.appendChild(groupTitle);
    groupDiv.appendChild(colorsGrid);
    container.appendChild(groupDiv);
  }
}

// ---------------------------------------------------------------------------
// Typography Section
// ---------------------------------------------------------------------------

function renderTypography() {
  var showcase = document.getElementById('typographyShowcase');
  if (!showcase || !config.typography) return;

  var fonts;
  if (Array.isArray(config.typography)) {
    fonts = config.typography;
  } else {
    // Object format: { headline: {...}, body: {...} }
    fonts = [];
    var keys = Object.keys(config.typography);
    for (var k = 0; k < keys.length; k++) {
      var font = config.typography[keys[k]];
      if (!font.role) {
        font.role = capitalize(keys[k]);
      }
      fonts.push(font);
    }
  }

  for (var i = 0; i < fonts.length; i++) {
    var font = fonts[i];

    var specimen = document.createElement('div');
    specimen.className = 'type-specimen';

    // Header
    var header = document.createElement('div');
    header.className = 'type-specimen-header';

    var typeName = document.createElement('span');
    typeName.className = 'type-name';
    typeName.textContent = font.family || '';

    var typeRole = document.createElement('span');
    typeRole.className = 'type-role';
    typeRole.textContent = font.role || '';

    header.appendChild(typeName);
    header.appendChild(typeRole);
    specimen.appendChild(header);

    // Large sample
    var sampleLarge = document.createElement('div');
    sampleLarge.className = 'type-sample-large';
    sampleLarge.textContent = 'Aa Bb Cc';
    if (font.family) {
      sampleLarge.style.fontFamily = font.family;
    }
    specimen.appendChild(sampleLarge);

    // Weights
    if (font.weights && Array.isArray(font.weights)) {
      var weightsContainer = document.createElement('div');
      weightsContainer.className = 'type-weights';

      for (var w = 0; w < font.weights.length; w++) {
        var weight = font.weights[w];

        var weightDiv = document.createElement('div');
        weightDiv.className = 'type-weight';

        var weightLabel = document.createElement('span');
        weightLabel.className = 'type-weight-label';
        weightLabel.textContent = weight.toString();

        var weightSample = document.createElement('span');
        weightSample.className = 'type-weight-sample';
        weightSample.textContent = 'The quick brown fox';
        weightSample.style.fontWeight = weight;
        if (font.family) {
          weightSample.style.fontFamily = font.family;
        }

        weightDiv.appendChild(weightLabel);
        weightDiv.appendChild(weightSample);
        weightsContainer.appendChild(weightDiv);
      }

      specimen.appendChild(weightsContainer);
    }

    // Sizes
    if (font.sizes && Array.isArray(font.sizes)) {
      var sizesContainer = document.createElement('div');
      sizesContainer.className = 'type-sizes';

      for (var s = 0; s < font.sizes.length; s++) {
        var size = font.sizes[s];

        var sizeDiv = document.createElement('div');
        sizeDiv.className = 'type-size';

        var sizeValue = document.createElement('span');
        sizeValue.className = 'type-size-value';
        sizeValue.textContent = size + 'px';

        var sizeSample = document.createElement('span');
        sizeSample.className = 'type-size-sample';
        sizeSample.textContent = 'Amostra';
        sizeSample.style.fontSize = size + 'px';

        sizeDiv.appendChild(sizeValue);
        sizeDiv.appendChild(sizeSample);
        sizesContainer.appendChild(sizeDiv);
      }

      specimen.appendChild(sizesContainer);
    }

    showcase.appendChild(specimen);
  }
}

// ---------------------------------------------------------------------------
// Patterns / Grafismos Section
// ---------------------------------------------------------------------------

function renderPatterns() {
  var grid = document.getElementById('patternsGrid');
  var section = document.getElementById('grafismos');
  if (!grid) return;

  // Hide entire section if no patterns data
  if (!config.patterns || !Array.isArray(config.patterns) || config.patterns.length === 0) {
    if (section) {
      section.style.display = 'none';
    }
    return;
  }

  for (var i = 0; i < config.patterns.length; i++) {
    var pattern = config.patterns[i];

    var card = document.createElement('div');
    card.className = 'pattern-card';

    var previewDiv = document.createElement('div');
    previewDiv.className = 'pattern-preview';

    if (pattern.src) {
      var img = document.createElement('img');
      img.src = pattern.src;
      img.alt = pattern.name || 'Grafismo';
      previewDiv.appendChild(img);
    }

    var infoDiv = document.createElement('div');
    infoDiv.className = 'pattern-info';

    var pName = document.createElement('span');
    pName.className = 'pattern-name';
    pName.textContent = pattern.name || '';

    var pDesc = document.createElement('p');
    pDesc.className = 'pattern-description';
    pDesc.textContent = pattern.description || '';

    infoDiv.appendChild(pName);
    infoDiv.appendChild(pDesc);

    card.appendChild(previewDiv);
    card.appendChild(infoDiv);
    grid.appendChild(card);
  }
}

// ---------------------------------------------------------------------------
// Photography Section
// ---------------------------------------------------------------------------

function renderPhotography() {
  if (!config.photography) return;

  // Guidelines text
  var guidelinesContainer = document.getElementById('photoGuidelines');
  if (guidelinesContainer && config.photography.guidelines) {
    var guideText = config.photography.guidelines;
    var guideLines;
    if (Array.isArray(guideText)) {
      guideLines = guideText;
    } else {
      guideLines = guideText.split('\n\n');
    }

    for (var i = 0; i < guideLines.length; i++) {
      var p = document.createElement('p');
      p.textContent = guideLines[i];
      guidelinesContainer.appendChild(p);
    }
  }

  // Mood board photos
  var moodBoard = document.getElementById('moodBoard');
  if (moodBoard && config.photography.mood && Array.isArray(config.photography.mood)) {
    for (var j = 0; j < config.photography.mood.length; j++) {
      var photo = config.photography.mood[j];

      var photoDiv = document.createElement('div');
      photoDiv.className = 'mood-photo';

      var img = document.createElement('img');
      if (typeof photo === 'string') {
        img.src = photo;
        img.alt = 'Mood board';
      } else {
        img.src = photo.src || '';
        img.alt = photo.alt || 'Mood board';
      }

      photoDiv.appendChild(img);
      moodBoard.appendChild(photoDiv);
    }
  }
}

// ---------------------------------------------------------------------------
// Applications Section
// ---------------------------------------------------------------------------

function renderApplications() {
  var grid = document.getElementById('applicationsGrid');
  if (!grid || !config.applications || !Array.isArray(config.applications)) return;

  for (var i = 0; i < config.applications.length; i++) {
    var app = config.applications[i];

    var card = document.createElement('div');
    card.className = 'application-card';

    var previewDiv = document.createElement('div');
    previewDiv.className = 'app-preview';

    if (app.image) {
      var img = document.createElement('img');
      img.src = app.image;
      img.alt = app.title || 'Aplicacao';
      previewDiv.appendChild(img);
    }

    var infoDiv = document.createElement('div');
    infoDiv.className = 'app-info';

    var appLabel = document.createElement('span');
    appLabel.className = 'app-label';
    appLabel.textContent = app.category || '';

    var appTitle = document.createElement('h3');
    appTitle.className = 'app-title';
    appTitle.textContent = app.title || '';

    infoDiv.appendChild(appLabel);
    infoDiv.appendChild(appTitle);

    card.appendChild(previewDiv);
    card.appendChild(infoDiv);
    grid.appendChild(card);
  }
}

// ---------------------------------------------------------------------------
// Summary Section
// ---------------------------------------------------------------------------

function renderSummary() {
  var summaryCard = document.getElementById('summaryCard');
  if (!summaryCard) return;

  // 1. Logo mini section
  if (config.brand && config.brand.logo) {
    var logoSection = document.createElement('div');
    logoSection.className = 'summary-section';

    var logoTitle = document.createElement('span');
    logoTitle.className = 'summary-section-title';
    logoTitle.textContent = 'Logo';

    var logoImg = document.createElement('img');
    logoImg.className = 'summary-logo-mini';
    logoImg.src = config.brand.logo;
    logoImg.alt = config.brand.name || 'Logo';

    logoSection.appendChild(logoTitle);
    logoSection.appendChild(logoImg);
    summaryCard.appendChild(logoSection);
  }

  // 2. Colors section
  if (config.colors && config.colors.primary) {
    var colorsSection = document.createElement('div');
    colorsSection.className = 'summary-section';

    var colorsTitle = document.createElement('span');
    colorsTitle.className = 'summary-section-title';
    colorsTitle.textContent = 'Cores';

    var colorsDots = document.createElement('div');
    colorsDots.className = 'summary-colors';

    var primaryColors = config.colors.primary;
    var maxDots = Math.min(primaryColors.length, 5);
    for (var i = 0; i < maxDots; i++) {
      var dot = document.createElement('div');
      dot.className = 'summary-color-dot';
      dot.style.backgroundColor = primaryColors[i].hex || '#000';
      dot.setAttribute('title', primaryColors[i].name || '');
      colorsDots.appendChild(dot);
    }

    colorsSection.appendChild(colorsTitle);
    colorsSection.appendChild(colorsDots);
    summaryCard.appendChild(colorsSection);
  }

  // 3. Typography section
  if (config.typography) {
    var typoSection = document.createElement('div');
    typoSection.className = 'summary-section';

    var typoTitle = document.createElement('span');
    typoTitle.className = 'summary-section-title';
    typoTitle.textContent = 'Tipografia';

    typoSection.appendChild(typoTitle);

    var fonts = getTypographyFonts();
    for (var j = 0; j < fonts.length; j++) {
      var fontName = document.createElement('span');
      fontName.className = 'summary-font-name';
      fontName.textContent = fonts[j].family || '';
      if (fonts[j].family) {
        fontName.style.fontFamily = fonts[j].family;
      }

      var fontDetail = document.createElement('span');
      fontDetail.className = 'summary-font-detail';
      fontDetail.textContent = fonts[j].role || '';

      typoSection.appendChild(fontName);
      typoSection.appendChild(fontDetail);
    }

    summaryCard.appendChild(typoSection);
  }

  // 4. Brand section
  if (config.brand) {
    var brandSection = document.createElement('div');
    brandSection.className = 'summary-section';

    var brandTitle = document.createElement('span');
    brandTitle.className = 'summary-section-title';
    brandTitle.textContent = 'Marca';

    var brandName = document.createElement('span');
    brandName.className = 'summary-font-name';
    brandName.textContent = config.brand.name || '';

    var brandTagline = document.createElement('span');
    brandTagline.className = 'summary-font-detail';
    brandTagline.textContent = config.brand.tagline || '';

    brandSection.appendChild(brandTitle);
    brandSection.appendChild(brandName);
    brandSection.appendChild(brandTagline);
    summaryCard.appendChild(brandSection);
  }
}

/**
 * Helper to normalize typography config into an array of font objects.
 */
function getTypographyFonts() {
  if (!config.typography) return [];

  if (Array.isArray(config.typography)) {
    return config.typography;
  }

  var fonts = [];
  var keys = Object.keys(config.typography);
  for (var i = 0; i < keys.length; i++) {
    var font = config.typography[keys[i]];
    if (!font.role) {
      font.role = capitalize(keys[i]);
    }
    fonts.push(font);
  }
  return fonts;
}

// ---------------------------------------------------------------------------
// Footer Section
// ---------------------------------------------------------------------------

function renderFooter() {
  var dateEl = document.getElementById('footerDate');
  if (!dateEl) return;

  if (config.brand && config.brand.updated_at) {
    dateEl.textContent = config.brand.updated_at;
  } else {
    dateEl.textContent = 'Atualizado em ' + new Date().toLocaleDateString('pt-BR');
  }
}

// ---------------------------------------------------------------------------
// Copy to Clipboard
// ---------------------------------------------------------------------------

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showCopyToast(text);
    }).catch(function() {
      copyFallback(text);
    });
  } else {
    copyFallback(text);
  }
}

function copyFallback(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    // silently fail
  }
  document.body.removeChild(textarea);
  showCopyToast(text);
}

// ---------------------------------------------------------------------------
// Copy Toast Notification
// ---------------------------------------------------------------------------

function showCopyToast(text) {
  var toast = document.querySelector('.copy-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = 'Copiado: ' + text;
  toast.classList.add('visible');

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(function() {
    toast.classList.remove('visible');
  }, 2000);
}

// ---------------------------------------------------------------------------
// Scroll Spy — Tracks active section in sidebar nav
// ---------------------------------------------------------------------------

function setupScrollSpy() {
  var sections = document.querySelectorAll('.section[id]');
  var navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove('active');
        }
        var activeLink = document.querySelector('.nav-link[data-section="' + entry.target.id + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  for (var i = 0; i < sections.length; i++) {
    observer.observe(sections[i]);
  }
}

// ---------------------------------------------------------------------------
// Scroll Reveal — Fade-in animation on scroll
// ---------------------------------------------------------------------------

function setupScrollReveal() {
  // Add reveal class to section-inner and hero-content elements
  var revealTargets = document.querySelectorAll('.section-inner, .hero-content');
  for (var i = 0; i < revealTargets.length; i++) {
    revealTargets[i].classList.add('reveal');
  }

  // Add reveal-children to grid and list containers
  var childTargets = document.querySelectorAll(
    '.values-grid, .colors-grid, .logo-variations-grid, ' +
    '.applications-grid, .patterns-grid, .type-weights, .mood-board'
  );
  for (var j = 0; j < childTargets.length; j++) {
    childTargets[j].classList.add('reveal-children');
  }

  var observer = new IntersectionObserver(function(entries) {
    for (var k = 0; k < entries.length; k++) {
      var entry = entries[k];
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    }
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  var allReveal = document.querySelectorAll('.reveal, .reveal-children');
  for (var l = 0; l < allReveal.length; l++) {
    observer.observe(allReveal[l]);
  }
}

// ---------------------------------------------------------------------------
// Mobile Menu — Hamburger toggle + overlay
// ---------------------------------------------------------------------------

function setupMobileMenu() {
  // Create mobile menu button
  var menuBtn = document.createElement('button');
  menuBtn.className = 'mobile-menu-btn';
  menuBtn.textContent = '\u2630';
  menuBtn.setAttribute('aria-label', 'Menu');
  document.body.appendChild(menuBtn);

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  var sidebar = document.getElementById('sidebar');

  // Toggle sidebar on menu button click
  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-open');
    overlay.classList.toggle('active');
    if (sidebar.classList.contains('sidebar-open')) {
      menuBtn.textContent = '\u2715';
    } else {
      menuBtn.textContent = '\u2630';
    }
  });

  // Close sidebar on overlay click
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('active');
    menuBtn.textContent = '\u2630';
  });

  // Close sidebar on nav link click (mobile)
  var navLinks = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('sidebar-open');
        overlay.classList.remove('active');
        menuBtn.textContent = '\u2630';
      }
    });
  }
}

// ---------------------------------------------------------------------------
// Utility: Capitalize first letter
// ---------------------------------------------------------------------------

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
