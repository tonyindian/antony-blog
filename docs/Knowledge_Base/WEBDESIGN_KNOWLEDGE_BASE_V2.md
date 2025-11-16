# Web Design Knowledge Base
**Professional Web Design Guide für Executive & Corporate Websites**  
Version 2.0 | Oktober 2025 | Basierend auf pius-gyger.ch Redesign

---

## 📋 EXECUTIVE SUMMARY

Diese Knowledge Base dokumentiert alle Learnings aus einem 7-wöchigen Website-Redesign für einen Executive-Consultant. Sie deckt ab:

- ✅ **Strategie:** Client-Profiling, Zielgruppen-Analyse, Benchmarking
- ✅ **Technical:** Typography, Responsive Design, Performance, Security
- ✅ **Compliance:** WCAG 2.2, ADA Requirements 2026-2027
- ✅ **2025 Trends:** AI Personalization, Sustainable Design, Dark Mode
- ✅ **Process:** Client Communication, Testing, Deployment

**Für wen:**
- Web Designer/Developers
- UX/UI Specialists
- Projekt-Manager für Corporate Websites
- Freelancer mit Executive-Kunden

**Was anders ist:**
- Keine Theorie – nur praktische, validierte Learnings
- Code-Beispiele für jede Empfehlung
- Kritische Perspektive (was NICHT funktioniert)
- Legal Compliance (WCAG 2.2, ADA, EU)

---

## 📚 INHALTSVERZEICHNIS

### TEIL I: STRATEGIE & KONZEPT
- [1. Client-Profiling & Zielgruppen-Analyse](#1-client-profiling--zielgruppen-analyse)
- [2. Content-Strategie](#2-content-strategie)
- [3. Design Philosophy](#3-design-philosophy)

### TEIL II: TECHNICAL IMPLEMENTATION
- [4. Typography System](#4-typography-system)
- [5. Layout & Spacing](#5-layout--spacing)
- [6. Responsive Design](#6-responsive-design)
- [7. Performance Optimization](#7-performance-optimization)

### TEIL III: COMPLIANCE & STANDARDS 2025
- [8. WCAG 2.2 Accessibility (NEW)](#8-wcag-22-accessibility)
- [9. Security Headers (Mandatory)](#9-security-headers)
- [10. SEO & Metadata](#10-seo--metadata)

### TEIL IV: EMERGING TECHNOLOGIES 2025
- [11. Sustainable Web Design (NEW)](#11-sustainable-web-design)
- [12. AI & Personalization (NEW)](#12-ai--personalization)
- [13. Dark Mode Implementation (NEW)](#13-dark-mode-implementation)
- [14. Micro-Interactions (NEW)](#14-micro-interactions)

### TEIL V: PROCESS & WORKFLOW
- [15. Client Communication](#15-client-communication)
- [16. Testing & Quality Assurance](#16-testing--quality-assurance)
- [17. Common Mistakes & Corrections](#17-common-mistakes--corrections)
- [18. Tools & Resources](#18-tools--resources)

### QUICK REFERENCE
- [Checklists (Pre-Launch, Post-Launch)](#checklists)
- [Decision Frameworks](#decision-frameworks)
- [Code Snippets Library](#code-snippets-library)

---

# TEIL I: STRATEGIE & KONZEPT

## 1. CLIENT-PROFILING & ZIELGRUPPEN-ANALYSE

### Warum kritisch
80% erfolgreicher Projekte starten mit richtiger Zielgruppen-Analyse. "Best practices" ohne Context führen zu generischen, ineffektiven Websites.

### Client-Profiling Framework

**Kritische Fragen VOR Design:**

1. **Wer ist der Kunde?**
   - Alter, Hintergrund, Branche
   - Position, Status, Reputation
   - Persönliche Präferenzen vs. Zielgruppen-Needs

2. **Wer ist die Zielgruppe?**
   - Demographics (Alter, Bildung, Position)
   - Psychographics (Was lesen sie? Welche Marken nutzen sie?)
   - Tech-Affinität (Mobile-first? Desktop-Power-User?)

3. **Was sind deren Erwartungen?**
   - NICHT was du denkst
   - Competitor Research
   - Industry Standards

### Beispiel: Executive Consultant

**Kunde:** Schweizer Gesundheitsökonom, 64, ex-Helsana Direktion  
**Zielgruppe:** VRs von Pharma/Versicherungen, CEOs, Politik  

**Falsche Assumptions:**
- ❌ "Modern = Startup-Style mit bunten Farben"
- ❌ "Trust Bars mit Firmen-Logos"
- ❌ "Lead-Gen CTAs überall"

**Richtige Insights (nach Research):**
- ✅ Zielgruppe hat selbst HSG/Uni
- ✅ Lesen Financial Times, Economist, NZZ
- ✅ Erwarten Editorial-Style, nicht Marketing
- ✅ → "Modern" = FT/Monocle-Style, nicht Tech-Startup

### Benchmark die richtige Peer Group

**Nicht vergleichen mit:**
- Generic consultant templates
- Startup landing pages
- Deine persönlichen Präferenzen

**Sondern mit:**
- Direkte Wettbewerber (min. 3-5 analysieren)
- Medien die Zielgruppe konsumiert
- Institutionen wo Kunde Credibility hat

**Konkreter Prozess:**
1. Google: "[Kunde's Profession] [Region]"
2. Analysiere Top 5 Wettbewerber
3. Notiere: Was haben sie NICHT? (Oft wichtiger als was sie haben)
4. Medien-Research: Was liest die Zielgruppe?
5. Adjust Design entsprechend

**Beispiel-Finding:**
Willy Oggier & Heinz Locher (Top Gesundheitsökonomen CH):
- Minimalistisch, CV-fokussiert
- Keine Services-Grids, keine CTAs
- Publikationen prominent
- → Adjustierte Design von Marketing zu Editorial

---

## 2. CONTENT-STRATEGIE

### Publikationen/Portfolio strukturieren

**Problem:** Wie zeigt man 30+ Publikationen ohne zu erschlagen?

**Falsche Optionen:**
- ❌ Alle 32 prominent → Overwhelming
- ❌ Nur neueste 3 → Verliert Credibility
- ❌ Thematisch gruppieren → Künstlich wenn keine echten Kategorien

**Richtige Lösung: Featured + Archiv**

```
├─ Featured (6 neueste, chronologisch)
│  ├─ Mit Links (PDF/External)
│  ├─ Cards mit Hover
│  └─ Abstract/Description (2-3 Sätze)
│
└─ Archiv (Rest, kollabierbar)
   ├─ Button "26 weitere anzeigen"
   ├─ Kompakte Liste (nur Titel + Meta)
   └─ Ohne Links (reine Credibility)
```

**Warum das funktioniert:**
- Zeigt Aktualität (Featured)
- Zeigt Masse/Expertise (Archiv Count)
- Überfordert nicht (collapsed by default)
- Intentional Design (nicht unfertig)

### PDF-Naming Convention (SEO)

**Schema:** `autor-jahr-thema.pdf`

**Beispiele:**
```
gyger-2020-gesundheitskosten-lastenverteilung.pdf
gyger-2020-helsana-regionenreport.pdf
gyger-2023-biosimilar-markets-international.pdf
```

**Begründung:**
- Google indexiert Dateinamen
- Chronologisch sortierbar
- Eindeutig identifizierbar
- Keine Umlaute/Sonderzeichen (URL-safe)

### Content-Hierarchie für Executive Sites

**Falsche Struktur (Marketing-Style):**
```
1. Hero mit Value Prop
2. Services (Was ich biete)
3. Trust Bar (Logos/Zahlen)
4. Publikationen
5. About
6. CTA
```

**Problem:** Behauptungen vor Beweisen

**Richtige Struktur (Editorial-Style):**
```
1. Hero (Wer ich bin)
2. Intro-Zeile (Value Prop, 1 Satz)
3. About (Warum relevant: ex-Direktion, 25J)
4. Publikationen (Beweis)
5. Leistungen (Worin ich unterstütze)
6. Kontakt (subtil, nicht pushy)
```

**Warum besser:**
- Confidence through Restraint
- Beweise vor Behauptungen
- Publikationen = objektiver Beweis
- Services = "Hier kann ich helfen" nicht "Hier verkaufe ich"

### Trust Signals evaluieren

**Trust Bar Diskussion:**
- Initial: "Seelenlose Zahlen, zu generisch"
- Nach Research mit VRs/CEOs: Quantifizierbare Signale werden geschätzt
- **Final:** "25+ Jahre • 32 Publikationen • 4 Hochschulen"

**Kritisches Learning:**
Selbständige Consultants (seit 2014) brauchen stärkere Trust-Signale als etablierte Institutionen (30+ Jahre). Nicht mit falschen Benchmarks vergleichen.

---

## 3. DESIGN PHILOSOPHY

### Tyler Brûlé / Monocle Principles

**Kern-Prinzip:**
> "You have a logo. That's your mark. Everything else is editorial - typography, hierarchy, white space, quality of writing."

### "Why do you need more blue?"

**Kritische Frage** wenn man Brand-Color überall einsetzen will.

**Das Problem:**
- Decorative Brand-Color = Eingeständnis dass Content nicht stark genug ist
- Executive Confidence = Restraint, nicht Dekoration

**Was Elite-Sites NICHT haben:**
- ❌ Service-Grids mit blauen Boxen
- ❌ "Ich biete Unterstützung an" CTAs
- ❌ Trust Bars mit Firmenlogos
- ❌ Hero-Beschreibungen die Services erklären

**Was sie HABEN:**
- ✅ Selbstbewusste, knappe Statements
- ✅ Publikationen als Beweis (nicht Behauptung)
- ✅ Werdegang kompakt
- ✅ Minimalistische Ästhetik
- ✅ Expertise zeigen, nicht verkaufen

### Content-First bedeutet Design-Restraint

**Tyler's Verdict:**
> "If Pius needs his name in the header, he should rethink his introduction. The structure already does the work."

**Praktische Anwendung:**
- Logo = Farbe ✓
- Funktionale Links = Farbe ✓
- Dekorative Akzente = ✗

### Listen vs. Prose

**Tyler Brûlé Prinzip:**
> "Listen sind für Supermärkte. Prose ist für Menschen die denken können."

**Implementierung:**
- Reports, Erklärungen → Prose ohne Bullets
- Services, Navigation → Structured Grids
- **Niemals:** Bullet-Points in Fließtext

**Ausnahme:** User fragt explizit nach Liste/Ranking

---

# TEIL II: TECHNICAL IMPLEMENTATION

## 4. TYPOGRAPHY SYSTEM

### System Fonts sind 2025 professionell

**Myth:** "Custom Fonts = professionell"  
**Reality:** Apple, UBS, Porsche nutzen System Fonts

**Font Stack (iOS/macOS optimiert):**
```css
font-family: 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  Roboto, 
  "Helvetica Neue", 
  Arial, 
  sans-serif;
```

**Vorteile:**
- Zero Download (Performance)
- Native Rendering (perfekt auf allen Devices)
- Vertraut für User
- Keine Licensing-Kosten

### Multi-Device Typography

**Problem:** Desktop perfekt, iPad Pro zu klein

**Ursache:** Unterschiedliche Pixeldichten + Lesedistanzen

**Lösung: Device-Specific Sizing**

```css
/* Base: Mobile (iPhone, Android) */
body { 
  font-size: 17px;  /* WCAG minimum */
  line-height: 1.65;
}

/* iPad Pro (1024-1366px, 264ppi, 40-50cm) */
@media (min-width: 1024px) and (max-width: 1366px) {
  body { font-size: 20px; }
  h1 { font-size: clamp(52px, 5vw, 64px); }
}

/* Desktop */
@media (min-width: 1367px) {
  body { font-size: 18px; }
}

/* 4K (2560px+, 80-100cm Distanz) */
@media (min-width: 2560px) {
  body { font-size: 19px; }
}
```

**Alters-Optimierung (45-65 Jahre):**
```css
/* Für Executive-Zielgruppe */
@media (min-width: 2560px) {
  body { font-size: 19-20px; }  /* +1-2px größer */
}
```

### Line Length (wissenschaftlich validiert)

**Optimal:** 50-75 Zeichen pro Zeile  
**Max:** 80 Zeichen (WCAG 2.1)

**Implementierung:**
```css
.editorial-content {
  max-width: 520px;  /* ~60-65 Zeichen bei 19-24px */
}
```

**Wissenschaftliche Basis:**
- Emil Ruder: 50-60 optimal
- Dyson & Haselgrove: 60-70 = beste Lesegeschwindigkeit
- Zu breit (90-100) = ermüdend

### Kontrast-Hierarchie (3 Levels)

```css
:root {
  /* Heading: Most Important */
  --text-heading: #1A1A1A;  /* WCAG AAA: 10.9:1 */
  
  /* Body: Standard Text */
  --text-body: #333333;     /* WCAG AAA: 10.9:1 */
  
  /* Meta: Less Important */
  --text-meta: #6B6B6B;     /* WCAG AA: 5.7:1 */
  
  /* Background */
  --bg-primary: #FAFAF7;    /* Off-white, nicht Pure White */
}
```

**Warum nicht Pure Black (#000):**
- OLED-Displays: Zu starker Kontrast
- Soft-black (#1A1A1A) angenehmer

### ALL CAPS vermeiden

**Impact:**
- 10-15% langsamer lesbar
- Fehlende Wortform-Recognition
- Wirkt schreierisch

**Nur nutzen für:**
- Sehr kurze Labels (<3 Wörter)
- Navigation Items (optional)

**Besser:** Title Case oder Sentence case

---

## 5. LAYOUT & SPACING

### Zwei Container-Systeme

**Problem:** Editorial content braucht engere Spalte als Grids

**Lösung:**
```css
.container-editorial {
  max-width: 920px;   /* Für Lesetexte */
  padding: 0 clamp(20px, 4vw, 80px);
}

.container-structured {
  max-width: 1140px;  /* Für Grids, Navigation */
  padding: 0 clamp(20px, 4vw, 80px);
}
```

**Verwendung:**
- **Editorial:** Hero, Intro, CV-Text, Blog Posts
- **Structured:** Navigation, Services-Grid, Publikations-Cards, Footer

### Section Spacing für Executive Sites

**Standard (zu eng):** 64px  
**Premium-Sites:** 72-88px

```css
section {
  padding: 80px 0;  /* Desktop: Apple ~80px, Porsche ~76px */
}

@media (max-width: 767px) {
  section {
    padding: 56px 0;  /* Mobile: weniger Scroll */
  }
}
```

**Begründung:** "Atmen lassen" signalisiert Confidence

### Responsive Container Padding

```css
.container {
  padding: 0 clamp(20px, 4vw, 80px);
}
```

**Effekt:**
- 320px: 20px padding
- 768px: ~30px padding
- 1920px: 80px padding
- Fluid ohne Breakpoints

---

## 6. RESPONSIVE DESIGN

### Mobile-First ist MANDATORY 2025

**Warum:**
- >50% aller Web Traffic = Mobile
- Google Mobile-First Indexing (seit 2019)
- WCAG 2.2: 24×24px Touch Targets

### Breakpoints (Oktober 2025)

```css
/* Mobile First Base */
.element { ... }

/* Tablet Portrait */
@media (min-width: 768px) { ... }

/* iPad Pro (wichtig!) */
@media (min-width: 1024px) and (max-width: 1366px) { ... }

/* Desktop */
@media (min-width: 1367px) { ... }

/* Large Desktop */
@media (min-width: 1440px) { ... }

/* 4K */
@media (min-width: 2560px) { ... }
```

**Kritisch:** iPad Pro (1024-1366px) ist eigene Kategorie

### Touch Targets (WCAG 2.2 Update)

**OLD (WCAG 2.1):** 44×44px (iOS Standard)  
**NEW (WCAG 2.2):** 24×24px minimum (AA Level)

```css
/* Success Criterion 2.5.8: Target Size - Minimum (AA) */
button, a {
  min-height: 24px;
  min-width: 24px;
  padding: 12px 24px;  /* Großzügiger für bessere UX */
}

/* Tablet: Material Design Standard */
@media (min-width: 768px) {
  button, a {
    min-height: 48px;
  }
}
```

**Wichtig:** 24px ist MINIMUM, 44-48px bleibt Best Practice

---

## 7. PERFORMANCE OPTIMIZATION

### Core Web Vitals 2025 Targets

```
LCP (Largest Contentful Paint): ≤2.5s  ✅ Target: ~2.0s
INP (Interaction to Next Paint):  ≤200ms ✅ Target: ~150ms
CLS (Cumulative Layout Shift):    ≤0.1   ✅ Target: ~0.05
```

### Font Loading Strategy

```html
<!-- 1. Preconnect (DNS + Handshake early) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. Preload Critical Font -->
<link rel="preload" 
      href="/fonts/inter-var.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>

<!-- 3. Non-Blocking CSS Load -->
<link rel="stylesheet" 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" 
      media="print" 
      onload="this.media='all'">

<!-- 4. Noscript Fallback -->
<noscript>
  <link rel="stylesheet" href="...fonts.css">
</noscript>
```

### Image Optimization

```html
<picture>
  <!-- Modern Formats (80% smaller) -->
  <source type="image/avif" srcset="img-800.avif 800w, img-1200.avif 1200w">
  <source type="image/webp" srcset="img-800.webp 800w, img-1200.webp 1200w">
  
  <!-- Fallback -->
  <img src="img-1200.jpg" 
       alt="Description" 
       loading="lazy"           <!-- Native Lazy Loading -->
       decoding="async"         <!-- Non-blocking -->
       width="1200" 
       height="800">            <!-- Prevent CLS -->
</picture>
```

### Lazy Loading

```html
<!-- Native (Einfach, gut supported) -->
<img src="image.jpg" loading="lazy" decoding="async">

<!-- Intersection Observer (Custom Control) -->
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
</script>
```

---

# TEIL III: COMPLIANCE & STANDARDS 2025

## 8. WCAG 2.2 ACCESSIBILITY

### KRITISCH: Neue Success Criteria (2025-2027)

**Legal Deadlines:**
- **EU:** Juni 28, 2025 (European Accessibility Act)
- **USA Public >50K:** April 24, 2026 (ADA Title II)
- **USA Public <50K:** April 24, 2027 (ADA Title II)

### 9 Neue Success Criteria in WCAG 2.2

#### 2.4.11 Focus Not Obscured - Minimum (AA)

**Requirement:** Focus indicator darf nicht verdeckt werden

```css
/* Ensure focus visible behind modals/sticky elements */
.modal {
  z-index: 1000;
}

button:focus {
  position: relative;
  z-index: 1001;  /* Above modals */
  outline: 2px solid #005fcc;
}
```

#### 2.4.12 Focus Not Obscured - Enhanced (AAA)

**Requirement:** Focus IMMER vollständig sichtbar

#### 2.4.13 Focus Appearance (AAA)

**Requirement:**
- Contrast Ratio: min. 3:1 gegen Background
- Thickness: min. 2px oder equivalente Fläche

```css
button:focus {
  outline: 2px solid #005fcc;  /* 3:1 against white */
  outline-offset: 2px;
}
```

#### 2.5.7 Dragging Movements (AA)

**Requirement:** Alternative zu Drag-and-Drop

```javascript
// Falsch: Nur Drag-and-Drop
element.draggable = true;

// Richtig: Click-to-Move Alternative
element.addEventListener('click', moveToPosition);
element.addEventListener('dragstart', dragHandler);
```

#### 2.5.8 Target Size - Minimum (AA)

**Requirement:** 24×24px minimum (nicht 44×44px!)

```css
/* WCAG 2.2 AA: 24px minimum */
button, a {
  min-width: 24px;
  min-height: 24px;
}

/* Best Practice: 44px+ */
button {
  padding: 12px 24px;  /* Ergibt 48px height */
}
```

**Spacing Alternative:** 24px Target mit 24px Abstand = compliant

#### 3.3.7 Redundant Entry (A)

**Requirement:** Keine redundanten Eingaben

```html
<!-- Falsch: User muss Email 2x eingeben -->
<input type="email" name="email">
<input type="email" name="confirm_email">

<!-- Richtig: Autocomplete erlauben -->
<input type="email" name="email" autocomplete="email">
```

#### 3.3.8 Accessible Authentication - Minimum (AA)

**Requirement:** Keine Cognitive Function Tests

```html
<!-- Compliant: Password Manager erlauben -->
<input type="password" 
       autocomplete="current-password"
       <!-- paste erlauben -->
       onpaste="return true">

<!-- Nicht compliant auf AA: -->
<!-- - CAPTCHA mit Objekt-Erkennung -->
<!-- - "Type this word" ohne Alternative -->
```

#### 3.3.9 Accessible Authentication - Enhanced (AAA)

**Requirement:** Auch Object Recognition nicht erlaubt

```
AA Level: CAPTCHA mit Stop-Sign = OK
AAA Level: Auch das nicht erlaubt
```

### Testing-Ansatz (WCAG 2.2)

**Kritisch:** Automated Tools = nur 30-50% Detection

**Richtiger Prozess:**
1. **Automated Scan** (WAVE, axe, Lighthouse)
2. **Manual Testing** (Keyboard Navigation, Screen Reader)
3. **User Testing** (mit Menschen mit Disabilities)

**Tools:**
- WAVE (WebAIM) - Free Browser Extension
- axe DevTools - Chrome/Firefox
- Lighthouse - Chrome DevTools (built-in)
- NVDA (Free Screen Reader - Windows)
- VoiceOver (Mac/iOS built-in)

### Skip Links (Mandatory)

```html
<body>
  <a href="#main" class="skip-link">Zum Inhalt springen</a>
  
  <nav>...</nav>
  
  <main id="main">
    <!-- Content -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### Semantic HTML

```html
<!-- Richtig -->
<header>
  <nav aria-label="Hauptnavigation">
    <ul>
      <li><a href="#services">Services</a></li>
    </ul>
  </nav>
</header>

<main id="main">
  <article>
    <h1>Heading</h1>
    <section>
      <h2>Subheading</h2>
    </section>
  </article>
</main>

<footer>
  <nav aria-label="Footer Navigation">
    ...
  </nav>
</footer>
```

---

## 9. SECURITY HEADERS

### MANDATORY Oktober 2025

**F-Rating → A-Rating Requirements**

#### Apache (.htaccess)

```apache
<IfModule mod_headers.c>
  # HSTS: Force HTTPS (2 Jahre für Preload)
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  
  # CSP: Content Security Policy
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  
  # Clickjacking Protection
  Header always set X-Frame-Options "SAMEORIGIN"
  
  # MIME-Sniffing Prevention
  Header always set X-Content-Type-Options "nosniff"
  
  # Referrer Policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Browser Features Control
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  
  # XSS Protection (Legacy Browser)
  Header always set X-XSS-Protection "1; mode=block"
  
  # Clean Up
  Header always unset X-Powered-By
  Header always unset Server
</IfModule>

# UTF-8 Encoding
AddDefaultCharset UTF-8
```

#### Nginx

```nginx
# In server block
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'..." always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=()..." always;

charset utf-8;
```

### Testing

```
1. securityheaders.com → Target: A oder A+
2. ssllabs.com → Target: A Rating
```

### External Links Security

```html
<!-- MANDATORY seit 2020 -->
<a href="https://external.com" 
   target="_blank" 
   rel="noopener noreferrer">
   External Link
</a>
```

**Begründung:**
- `noopener`: Verhindert Tabnabbing (window.opener manipulation)
- `noreferrer`: Privacy (kein Referrer)

---

## 10. SEO & METADATA

### JSON-LD Structured Data (Person)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Name",
  "jobTitle": "Title",
  "url": "https://domain.com",
  "sameAs": [
    "https://linkedin.com/in/username",
    "https://twitter.com/username"
  ],
  "knowsAbout": [
    "Area 1",
    "Area 2",
    "Area 3"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University Name"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CH"
  }
}
</script>
```

### Complete Social Media Meta Tags

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description (155 chars)">
<meta property="og:image" content="https://domain.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta property="og:url" content="https://domain.com">
<meta property="og:locale" content="de_CH">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://domain.com/twitter-image.png">
<meta name="twitter:image:alt" content="Image description">
```

**Image Requirements:**
- OG: 1200×630px (2:1 ratio)
- Twitter: 1200×675px oder 1:1
- Format: PNG oder JPG, max 5MB

### hreflang (Schweiz-Spezifika)

```html
<link rel="alternate" hreflang="de-CH" href="https://domain.ch">
<link rel="alternate" hreflang="x-default" href="https://domain.ch">
```

---

# TEIL IV: EMERGING TECHNOLOGIES 2025

## 11. SUSTAINABLE WEB DESIGN

### Warum kritisch 2025

**Facts:**
- Internet = 3.7% globale CO2 Emissionen
- Communications Tech emittiert 2025 mehr als jedes Land außer China, India, USA
- Average Website: 1.76g CO2/page
- **Target: <0.5g CO2/page**

**Regulation kommt:**
- EU Digital Sustainability Requirements (Draft)
- W3C Sustainable Web Guidelines (94 Empfehlungen)
- European Accessibility Act 2025 (includes Sustainability)

### Messung

**Tools (kostenlos):**
- Website Carbon Calculator (https://websitecarbon.com)
- Ecograder (https://ecograder.com) - Mightybytes
- GTmetrix (indirekt via Performance)

**Metrics:**
```
Carbon per Visit:  <0.5g = Excellent
Energy per Load:   Track monthly
Green Hosting:     100% Renewable Target
```

### Quick Wins (40-60% Reduction möglich)

#### 1. Image Optimization (Größter Impact)

```html
<!-- Modern Formats: 80% kleiner -->
<picture>
  <source type="image/avif" srcset="img.avif">
  <source type="image/webp" srcset="img.webp">
  <img src="img.jpg" loading="lazy" alt="...">
</picture>
```

**Tools:**
- Squoosh (Google) - https://squoosh.app
- ImageOptim (Mac)
- TinyPNG

#### 2. Dark Mode (OLED Power Savings)

**Impact:** 60-63% weniger Power auf OLED Screens (Google Data)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0A0A0A;      /* Soft-black, nicht Pure Black */
    --text: #E5E5E5;
  }
  
  body {
    background: var(--bg);
    color: var(--text);
  }
}
```

**Warum nicht #000 Pure Black:**
- Manche OLEDs haben Ghosting bei Pure Black
- #0A0A0A = 98% der Savings, keine Artefakte

#### 3. Green Hosting (100% Renewable)

**Empfohlene Provider:**
- **GreenGeeks** (300% carbon offset)
- **Kualo** (100% renewable, London DC)
- **Greenhost** (Dutch wind energy, NGO focus)
- **DigitalOcean London** (100% renewable)

**Regional Hosting:**
- Server näher an Audience = weniger Transmission
- Bessere Performance + Lower Carbon

#### 4. Minimal Code

```css
/* PurgeCSS: Removes unused styles */
/* Reduces CSS by 80-90% typically */
```

**Process:**
1. CSS/JS minifizieren
2. Unused Code entfernen (PurgeCSS, Tree Shaking)
3. Critical CSS inline
4. Non-critical async laden

#### 5. Lazy Loading Everything

```html
<img src="..." loading="lazy">
<iframe src="..." loading="lazy">

<script>
// Videos nur laden wenn User scrollt
</script>
```

### Business Benefits

**Nicht nur "grün", auch profitabel:**
- 30-50% niedrigere Hosting Costs
- Bessere SEO (Performance = Ranking Factor)
- Niedrigere Bounce Rate (schneller)
- CSR Compliance (EU Requirements)
- 73% Millennials zahlen mehr für Sustainable (2025 Data)

### Monitoring

**Track monatlich:**
```
Carbon per Visit:     <0.5g target
Page Weight:          <2MB target
Hosting CO2:          100% renewable
Load Time:            <2.5s (LCP)
```

---

## 12. AI & PERSONALIZATION

### Critical Perspective 2025

**The Hype:**
- AI-driven layouts adaptieren real-time
- Personalized Content Recommendations
- 30% von Web Pages haben Audio-Narration bis 2025

**The Reality:**
> "When done right, it feels like magic. When done wrong, it's just creepy surveillance." - Medium, Juli 2025

### Wann AI-Personalisierung Sinn macht

**Good Use Cases:**
- **E-Commerce:** Product Recommendations basierend auf Purchases
- **Content Platforms:** Adaptive Layouts nach Reading Behavior
- **Learning Platforms:** Individualisierte Curricula nach Progress
- **SaaS:** Dashboard personalisiert nach Usage Patterns

**Bad Use Cases:**
- **Executive/Corporate Sites** - Confidence > Tricks
- **Editorial Content** - Content muss stark genug sein
- **Privacy-Sensitive** - Legal/Medical/Financial ohne Consent

### Consent-First Implementation (Mandatory)

```javascript
// Falsch: Tracking ohne Consent
analytics.track('page_view');

// Richtig: Opt-in mit Erklärung
if (userConsent === true) {
  analytics.track('page_view', {
    purpose: 'Improve your experience',
    data_retention: '90 days',
    opt_out_link: '/privacy#opt-out'
  });
}
```

**UI Pattern:**
```html
<div class="consent-banner">
  <p>Wir personalisieren basierend auf Ihrem Nutzungsverhalten.</p>
  <p>Was wird gespeichert: Besuchte Seiten, Scroll-Tiefe</p>
  <p>Zweck: Bessere Content-Empfehlungen</p>
  <button onclick="acceptPersonalization()">Akzeptieren</button>
  <button onclick="rejectPersonalization()">Ablehnen</button>
  <a href="/privacy">Details</a>
</div>
```

### Tools & Frameworks (2025)

**Enterprise:**
- Adobe Target (AI-powered)
- Personyze (ML-driven)
- VWO Personalize (A/B Testing + AI)

**Kritisch:** Für Small Business/Corporate meist Overkill

**Besser:** Einfache Segmentierung
```
- New vs. Returning Visitors
- Geographic (Europe vs. US)
- Referrer (LinkedIn vs. Google)
```

### Anti-Patterns vermeiden

**Echo Chamber:**
Nur Content zeigen basierend auf Past Behavior = User sieht nie neues

**Creepy Surveillance:**
"Sie haben vor 3 Tagen Produkt X angesehen" = Too specific

**Over-Personalization:**
Website verändert sich zu stark = User verliert Orientierung

---

## 13. DARK MODE IMPLEMENTATION

### Mandatory User Expectation 2025

**Stats:**
- 82% von Users nutzen Dark Mode gelegentlich
- 95% mobiler OS haben Dark Mode
- OLED Screens: 60-63% Power Savings

### System Preference Detection

```css
/* Auto-detect User Preference */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0A0A0A;    /* Soft-black für OLED */
    --bg-secondary: #1A1A1A;
    --text-primary: #E5E5E5;
    --text-secondary: #B0B0B0;
    --accent: #4A9EFF;        /* Hellere Farbe für Dark Mode */
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #FAFAF7;
    --bg-secondary: #FFFFFF;
    --text-primary: #1A1A1A;
    --text-secondary: #6B6B6B;
    --accent: #005FCC;
  }
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

### Manual Toggle (Optional)

```html
<button id="theme-toggle" aria-label="Toggle Dark Mode">
  <svg class="sun-icon">...</svg>
  <svg class="moon-icon">...</svg>
</button>

<script>
const toggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved preference or use system
let currentTheme = localStorage.getItem('theme') || 
                   (prefersDark.matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);

toggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
});
</script>

<style>
[data-theme="dark"] {
  --bg: #0A0A0A;
  --text: #E5E5E5;
}

[data-theme="light"] {
  --bg: #FAFAF7;
  --text: #1A1A1A;
}
</style>
```

### OLED Optimization

**Kritisch:** Pure Black (#000) kann Probleme machen

```css
/* Falsch */
background: #000000;  /* Kann Ghosting auf manchen OLEDs */

/* Richtig */
background: #0A0A0A;  /* 98% der Savings, keine Artefakte */
background: #0D0D0D;  /* Alternative */
```

### Image Handling

```css
/* Bilder in Dark Mode anpassen */
@media (prefers-color-scheme: dark) {
  img {
    opacity: 0.9;  /* Leicht dimmen */
  }
  
  /* Logos invertieren falls nötig */
  .logo-light {
    display: none;
  }
  .logo-dark {
    display: block;
  }
}
```

---

## 14. MICRO-INTERACTIONS

### Definition

Subtile Animationen als Response auf User Actions:
- Button transformiert on hover
- Tooltips erscheinen smooth
- Loading States
- Success/Error Feedback

### Best Practices 2025

**Principles:**
- Subtil nicht ablenkend
- 60fps Performance
- Respektiere `prefers-reduced-motion`

### Lottie Animations

**Warum Lottie:**
- Vector-based = kleine File Size
- Smooth 60fps
- After Effects → Web (Bodymovin' Plugin)

```html
<!-- Lottie Player -->
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

<lottie-player
  src="animation.json"
  background="transparent"
  speed="1"
  style="width: 300px; height: 300px"
  loop
  autoplay>
</lottie-player>
```

### CSS Micro-Interactions

```css
/* Button Hover */
button {
  transition: transform 0.2s ease, background 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

button:active {
  transform: translateY(0);
}

/* Loading State */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading {
  animation: spin 1s linear infinite;
}

/* Success Checkmark */
@keyframes checkmark {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}

.success-icon path {
  stroke-dasharray: 100;
  animation: checkmark 0.5s ease forwards;
}
```

### Reduced Motion

```css
/* MANDATORY: Respect User Preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# TEIL V: PROCESS & WORKFLOW

## 15. CLIENT COMMUNICATION

### Strategy-Call Template (BEFORE Design)

**Email Template:**
```
Betreff: Website [domain] – Strategiefragen für die Neugestaltung

Guten Tag [Name],

Um eine moderne Lösung zu entwickeln die Ihren Bedürfnissen entspricht, 
brauche ich einige Informationen von Ihnen.

ZIELGRUPPE & ZWECK:
- Wen möchten Sie primär ansprechen?
- Was soll die Website bewirken?

INHALTE & STRUKTUR:
- Gibt es Inhalte die vollständig bleiben sollen?
- Welche Bereiche brauchen mehr Erklärung?
- Gibt es neue Inhalte die fehlen?

PRÄFERENZEN:
- Bevorzugen Sie einen formellen oder zugänglichen Ton?
- Möchten Sie die Seite selbst pflegen können?

Wir können diese Fragen gerne telefonisch besprechen (20-30 Minuten) 
oder Sie antworten per Mail, wie es Ihnen passt.

Zeitlich ist nichts dringend.

Beste Grüsse
```

**Wichtig:** Client nicht überfordern mit Details

### Keine Technik-Entscheidungen ohne Business-Context

**Falsch:**
"Soll ich WordPress nutzen?" → Zu früh

**Richtig:**
1. Wie oft ändert Kunde Inhalte? (<5x/Jahr = Static OK)
2. Braucht er Blog? (Nein = Static OK)
3. Plant er Events/Kurse? (Nein = Static OK)
4. Budget für Wartung? (Niedrig = Static besser)
5. **Dann erst:** CMS vs. Static entscheiden

### Iterative Feedback-Loops

**Netlify für Preview ist Gold:**
1. Design-Iteration erstellen
2. Auf Netlify deployen (app.netlify.com/drop)
3. Link an Kunde → https://randomname.netlify.app
4. Direkt am Live-Mockup diskutieren

**Nicht:** Screenshots oder lokale Files per Email

---

## 16. TESTING & QUALITY ASSURANCE

### Essential Testing Tools

**Security:**
- https://securityheaders.com (A+ Target)
- https://ssllabs.com (A Rating minimum)

**Performance:**
- PageSpeed Insights (100/100 Target)
- https://webpagetest.org

**Accessibility:**
- WAVE (WebAIM Extension)
- axe DevTools (Chrome/Firefox)
- Lighthouse Accessibility Audit

**Cross-Browser:**
- BrowserStack / LambdaTest
- Eigene Devices (iPhone, iPad, Samsung)

**SEO:**
- Google Rich Results Test
- LinkedIn Post Inspector
- Facebook Sharing Debugger

### Testing Matrix

```
Devices:
✓ iPhone SE (375px)
✓ iPhone 14 Pro (393px)
✓ iPad Pro (1024px)
✓ MacBook Pro (1440px)
✓ 4K Monitor (2560px)

Browsers:
✓ Safari (iOS + macOS)
✓ Chrome (Desktop + Android)
✓ Firefox (Desktop)
✓ Edge (Desktop)

Accessibility:
✓ Keyboard Navigation
✓ Screen Reader (VoiceOver, NVDA)
✓ Color Blindness Simulator
✓ Zoom to 200%
```

---

## 17. COMMON MISTAKES & CORRECTIONS

### "Best Practice" ohne Context

**Fehler:**
Trust Bars, Service-Grids, CTAs weil "das macht man so"

**Correction:**
Research ob Peer Group das auch hat

### Zu viel Design zu früh

**Fehler:**
Fancy Animationen bevor Struktur steht

**Correction:**
1. Content-Strategie
2. Hierarchie
3. Typography
4. Dann erst: Polish

### Typography ohne Testing

**Fehler:**
Schrift sieht auf MacBook gut aus, auf iPad Pro zu klein

**Correction:**
Multi-Device Testing mandatory

### Security als Afterthought

**Fehler:**
"Machen wir später" → Rating F

**Correction:**
Security Headers from Day 1

---

## 18. TOOLS & RESOURCES

### Design-to-Code Workflow

```
1. Strategy Call → Notizen dokumentieren
2. Content Inventory → Was existiert, was fehlt
3. Wireframe (low-fi) → Struktur validieren
4. Typography System → BEFORE Visual Design
5. HTML Prototype → Direkt im Code (kein Figma für Static)
6. Deploy Preview (Netlify) → Client Feedback
7. Iterate → 2-3 Runden
8. Security Check → Headers, SSL
9. Performance Optimization → Fonts, Images
10. Launch
```

### Version Control (auch für Static)

```bash
git init
git add index.html
git commit -m "Initial structure"

# Branching
main (production)
└─ feature/wcag-2.2-updates
└─ feature/dark-mode
```

### Documentation Standards

**Für jeden Launch:**
```
/docs
  ├─ DESIGN_SYSTEM.md
  ├─ TECHNICAL_SPECS.md
  ├─ DEPLOYMENT.md
  └─ CHANGELOG.md
```

---

# QUICK REFERENCE

## CHECKLISTS

### Pre-Launch Checklist

**Content:**
- [ ] Texte finalisiert & Rechtschreibung geprüft
- [ ] Kontaktdaten verifiziert
- [ ] Impressum & Datenschutz (EU/CH)

**Technical:**
- [ ] SSL-Zertifikat aktiv
- [ ] HTTPS Redirect funktioniert
- [ ] Security Headers (A-Rating minimum)
- [ ] Character Encoding UTF-8
- [ ] robots.txt & sitemap.xml
- [ ] Favicon (32×32, 192×192, 512×512)

**SEO & Social:**
- [ ] Title & Meta Description
- [ ] OG Image (1200×630px)
- [ ] Twitter Card
- [ ] JSON-LD Structured Data
- [ ] hreflang (falls Schweiz)

**Performance:**
- [ ] PageSpeed Insights >90
- [ ] Images optimiert (WebP + Fallback)
- [ ] Fonts preloaded
- [ ] Critical CSS inline

**Accessibility:**
- [ ] WAVE Scan (0 Errors)
- [ ] Keyboard Navigation
- [ ] Skip Link
- [ ] ARIA Labels
- [ ] Alt-Texte für Bilder

**WCAG 2.2 Specific:**
- [ ] Touch Targets min. 24×24px
- [ ] Focus Not Obscured
- [ ] Accessible Authentication (Password Manager OK)
- [ ] No Redundant Entry

**Cross-Device:**
- [ ] iPhone (Safari iOS)
- [ ] iPad Pro (Safari iPadOS)
- [ ] Android (Chrome)
- [ ] macOS (Safari, Chrome)
- [ ] Windows (Edge, Chrome)

### Post-Launch Checklist

**Woche 1:**
- [ ] Google Search Console einrichten
- [ ] SSL Labs A-Rating bestätigen
- [ ] Security Headers Rating (securityheaders.com)
- [ ] LinkedIn/Facebook Sharing testen
- [ ] Mobile Usability Test

**Monat 1:**
- [ ] Traffic analysieren
- [ ] Bounce Rate
- [ ] Mobile vs. Desktop Ratio
- [ ] 404-Errors prüfen

**Quarterly:**
- [ ] Security Headers updaten
- [ ] SSL-Renewal (meist auto)
- [ ] Performance Re-Check
- [ ] Carbon Footprint messen

---

## DECISION FRAMEWORKS

### Static HTML vs. CMS?

**Static wenn:**
- Content ändert <5x/Jahr ✓
- Kein Blog/News ✓
- Budget begrenzt ✓
- Performance kritisch ✓

**CMS wenn:**
- Kunde will selbst pflegen
- Blog/News häufig
- Multi-User
- Events/Booking

### Custom Fonts vs. System Fonts?

**System wenn:**
- Executive/Corporate Site ✓
- Performance Priority ✓
- Budget begrenzt ✓

**Custom wenn:**
- Brand-Identity zentral
- Einzigartige Positionierung
- Budget für FOUT-Handling

### Wann mehr Farbe?

**Monochrome wenn:**
- Editorial Focus ✓
- Executive Zielgruppe ✓
- Content stark genug ✓

**Farbe wenn:**
- Kreativ-Branche
- Junge Zielgruppe
- Brand-Recognition

---

## CODE SNIPPETS LIBRARY

### Security Headers (Complete)

```apache
# .htaccess (Apache)
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-XSS-Protection "1; mode=block"
</IfModule>
AddDefaultCharset UTF-8
```

### Responsive Typography

```css
:root {
  --font-size-base: clamp(17px, 1.0625rem, 19px);
  --font-size-h1: clamp(48px, 5.5vw, 64px);
  --font-size-h2: clamp(32px, 3.5vw, 40px);
}

body {
  font-size: var(--font-size-base);
  line-height: 1.65;
}

/* iPad Pro Specific */
@media (min-width: 1024px) and (max-width: 1366px) {
  body { font-size: 20px; }
}
```

### Dark Mode (Complete)

```css
:root {
  --bg: #FAFAF7;
  --text: #1A1A1A;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0A0A0A;
    --text: #E5E5E5;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Lazy Loading

```html
<!-- Native -->
<img src="image.jpg" loading="lazy" decoding="async" alt="...">

<!-- Custom Intersection Observer -->
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '50px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
</script>
```

---

## FINAL TAKEAWAYS

### Process > Perfektion
- Iterative Feedback-Loops
- Online-Testing vor finalem Design
- Kritisches Hinterfragen eigener Assumptions

### Research nicht optional
Bei jedem Projekt:
1. Competitor-Analyse (3-5 direkt)
2. Target-Audience Research
3. Standards Check (WCAG 2.2, Security)
4. Device-Testing

### Confidence durch Reduction
- Weniger Farbe = mehr Impact
- Weniger CTAs = mehr Clarity
- Weniger Features = mehr Performance

### Documentation lohnt sich
2 Stunden Documentation sparen 5+ beim nächsten Projekt

---

**Erstellungsdatum:** Oktober 2025  
**Projekt Basis:** pius-gyger.ch Redesign  
**Umfang:** 7 Wochen, ~40 Design-Iterationen  
**Version:** 2.0 (Updated mit 2025 Standards)

**Key Takeaway:**  
Ein Executive-Website-Projekt ist 20% Design, 80% Strategy + Research + Testing. Diese Knowledge Base dokumentiert beide.