# ANTONY.CH – PROJECT BRIEF (UPDATED)
**Stand:** 22. Oktober 2025  
**Status:** Development Blog technisch fertig, bereit für Git + Netlify

---

## ÜBERBLICK

Rebuild von antony.ch als persönliche Portfolio-Website mit Blog-Dokumentation des Entwicklungsprozesses.

**Kern-Philosophie:**
- "All the power, all the love" (Wim Hof)
- Transparenz durch öffentliche Entwicklungs-Dokumentation
- Explosive Kreativität mit System (jede Farbe, jede Animation hat Bedeutung)
- Performance & Accessibility First
- AEO (Answer Engine Optimization) von Anfang an

---

## DEVELOPMENT BLOG (technisch fertig)

### Setup (22. Oktober 2025)

**Tech-Stack:**
- 11ty v3.1.2 (Static Site Generator)
- @11ty/eleventy-plugin-rss v2.0.4
- CommonJS Mode
- Nunjucks Templates
- Markdown Content
- System Fonts
- Netlify Deployment (noch nicht deployed)

**Struktur:**
```
antony-blog/
├─ src/
│  ├─ posts/
│  │  └─ test-post.md        # Erster Test-Post
│  ├─ _includes/
│  │  ├─ base.njk            # Base Layout
│  │  └─ post.njk            # Post Template (AEO/SEO optimiert)
│  ├─ css/
│  │  └─ style.css
│  ├─ index.md               # Blog-Index
│  └─ feed.njk               # RSS Feed (Atom Format)
├─ .eleventy.js              # Config mit Collections, Filters, RSS
└─ package.json
```

**Status:**
✅ 11ty installiert & läuft
✅ Post-Template (mit Microdata + JSON-LD für AEO)
✅ Posts-Collection (automatisch, sortiert nach Datum)
✅ RSS Feed (Atom Format, AI-friendly)
✅ Blog-Index (listet alle Posts)
✅ Date-Filter (ISO + Human-readable Deutsch)
✅ AEO/SEO von Anfang an (Schema.org BlogPosting)

**Noch zu bauen:**
- [ ] Git Repository Setup
- [ ] Deployment zu Netlify
- [ ] Erste echte Blog-Posts schreiben

---

## KRITISCHE LEARNINGS (aus Setup-Session)

### 11ty v3 + RSS Plugin v2 Spezifika

**Problem:** RSS Plugin Filter werden nicht automatisch registriert
**Lösung:** Manuelle Nunjucks-Filter-Registrierung required

```javascript
const pluginRss = require("@11ty/eleventy-plugin-rss");

eleventyConfig.addPlugin(pluginRss);

// Filter MANUELL registrieren (11ty v3 Requirement)
eleventyConfig.addNunjucksFilter("dateToRfc3339", pluginRss.dateToRfc3339);
eleventyConfig.addNunjucksFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate);
eleventyConfig.addNunjucksFilter("absoluteUrl", pluginRss.absoluteUrl);
eleventyConfig.addNunjucksAsyncFilter("htmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);
```

**Warum kritisch:**
- Dokumentation suggeriert automatische Registrierung
- Fehler: "filter not found: dateToRfc3339"
- Known Issue #52 im eleventy-plugin-rss Repository

### Nunjucks Syntax Basics

**Variables vs. Strings:**
```javascript
// JavaScript
"dateIso"  // String (Name)
dateIso    // Variable (Wert)

// Nunjucks
{{ date | dateIso }}  // date = Variable, dateIso = Filter-Name
{{ "Text" }}          // String (wörtlich)
```

**Template Syntax:**
- `{{ }}` = Output (Variable ausgeben)
- `{% %}` = Logic (if, for, etc.)
- `{# #}` = Comment

### AEO/SEO von Anfang an

**Kritisch für AI-Indexierung:**
1. **Semantic HTML** – `<article>`, `<time>`, nicht nur `<div>`
2. **Microdata** – `itemscope`, `itemprop` (Google versteht es)
3. **JSON-LD** – LLMs bevorzugen JSON-LD (einfacher zu parsen)
4. **ISO Dates** – Machine-readable (`2025-10-22T00:00:00Z`)
5. **RSS Feed** – LLMs crawlen RSS aktiv
6. **Absolute URLs** – Wichtig für RSS + JSON-LD

**Post-Template Pattern:**
```njk
<article itemscope itemtype="https://schema.org/BlogPosting">
  <h1 itemprop="headline">{{ title }}</h1>
  <time datetime="{{ date | dateIso }}" itemprop="datePublished">
    {{ date | dateReadable }}
  </time>
  <div itemprop="articleBody">
    {{ content | safe }}
  </div>
</article>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ title }}",
  "datePublished": "{{ date | dateIso }}",
  "author": { "@type": "Person", "name": "Antony Alex" }
}
</script>
```

### Debugging-Ansatz

**Was funktionierte:**
1. Systematisch, Schritt für Schritt
2. Validierte Lösungen (offizielle Docs, nicht spekulieren)
3. Bei Unsicherheit: Recherche bevor Änderungen
4. Server neu starten nach Config-Änderungen

**Was nicht funktionierte:**
- Spekulative Code-Änderungen ohne Validierung
- Filter-Namen raten (rfc3339 vs. dateToRfc3339)

---

## NÄCHSTE SCHRITTE

### Immediate (nächste Session)

1. **Git Repository Setup**
   - .gitignore erstellen (node_modules, _site)
   - Initial commit
   - GitHub Repository erstellen

2. **Netlify Deployment**
   - Netlify Account (falls noch nicht vorhanden)
   - Repository verbinden
   - Build Settings: `npm run build`
   - Publish Directory: `_site`
   - Auto-Deploy testen

3. **DNS Setup** (später)
   - www.antony.ch → Netlify
   - Oder Subdomain: blog.antony.ch

### Short-term (nächste Woche)

1. **Erste echte Blog-Posts**
   - "Warum ich meine Website neu baue" (Entwurf vorhanden)
   - "Content-First Approach"
   - "AEO/SEO von Anfang an"

2. **Styling verbessern**
   - Typography (System Fonts)
   - Spacing
   - Responsive (Mobile-First)

3. **Meta Tags**
   - OpenGraph (LinkedIn, Twitter)
   - Favicon
   - Sitemap

---

## TECH-DETAILS (für Wiederaufnahme)

### Aktuelle .eleventy.js (funktionierend)

```javascript
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  eleventyConfig.addPlugin(pluginRss);
  
  // RSS Filter manuell registrieren
  eleventyConfig.addNunjucksFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addNunjucksFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate);
  eleventyConfig.addNunjucksFilter("absoluteUrl", pluginRss.absoluteUrl);
  eleventyConfig.addNunjucksAsyncFilter("htmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);
  
  // Date Filter: ISO Format
  eleventyConfig.addFilter("dateIso", (dateObj) => {
    return new Date(dateObj).toISOString();
  });
  
  // Date Filter: Human-readable
  eleventyConfig.addFilter("dateReadable", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('de-CH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Global Data
  eleventyConfig.addGlobalData("site", {
    url: "https://www.antony.ch",
    title: "Antony Alex",
    description: "Renaissance-Typ mit vielen Instrumenten"
  });
  
  // Posts Collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["md", "html", "njk"],
    markdownTemplateEngine: "njk"
  };
};
```

### Post Frontmatter Pattern

```markdown
---
layout: post.njk
title: "Post Title"
description: "SEO/OG Description (155 chars)"
date: 2025-10-22
---

Content hier...
```

### RSS Feed URL

- Lokal: `http://localhost:8080/feed.xml`
- Production: `https://www.antony.ch/feed.xml`

---

## PHILOSOPHIE & WERTE (unverändert)

### Kern-Überzeugungen

**AI als Instrument:**
- Nicht Enabler, sondern neuestes Medium
- Wie Klavier vor 40 Jahren
- Wie Code nach Bootcamp
- Tool mit dem man Dinge schneller schafft

**Energie-Haushalt als Feature:**
- Constraints erzwingen Effizienz
- Systeme bauen aus Notwendigkeit
- Performance-First ist nicht nur Tech, sondern Lebensrealität

**Transparenz:**
- Prozess dokumentieren
- Fehler zeigen
- Learnings teilen
- CMS wird selbst Content

**Humanismus:**
- Leber-Geschichte als Wendepunkt
- Von "machen müssen" zu "sein dürfen"
- Empathie für Menschen & Systeme
- Grenzen sind im Kopf

---

## ZUSAMMENFASSUNG FÜR NÄCHSTEN CHAT

**Wo wir stehen:**
- Development Blog technisch komplett (Post-Template, Collection, RSS, Index)
- AEO/SEO von Anfang an implementiert (Microdata + JSON-LD)
- Test-Post läuft: https://www.antony.ch/posts/test-post/ (lokal)
- RSS Feed funktioniert: https://www.antony.ch/feed.xml (lokal)

**Was als nächstes:**
1. Git Repository Setup
2. Netlify Deployment
3. Erste echte Blog-Posts schreiben

**Kritische Erkenntnisse:**
- 11ty v3 + RSS Plugin v2 braucht manuelle Filter-Registrierung
- AEO/SEO von Anfang an = Microdata + JSON-LD + RSS
- Systematisches Debugging > Spekulative Fixes
- RSS Feed = kritisch für AI-Indexierung (Perplexity, ChatGPT)

**Philosophie:**
"All the power, all the love" – Mit voller Energie + vollem Herzen, trotz Constraints.

---

**Erstellt:** 22. Oktober 2025  
**Letzte Session:** Blog-Setup (Post-Template, Collection, RSS Feed, AEO/SEO)  
**Nächster Schritt:** Git + Netlify Deployment
