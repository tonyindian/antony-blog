# ANTONY.CH – PROJECT BRIEF
**Stand:** 21. Oktober 2025  
**Status:** Development Blog läuft, Content-Strategie in Arbeit

---

## ÜBERBLICK

Rebuild von antony.ch als persönliche Portfolio-Website mit Blog-Dokumentation des Entwicklungsprozesses.

**Kern-Philosophie:**
- "All the power, all the love" (Wim Hof)
- Transparenz durch öffentliche Entwicklungs-Dokumentation
- Explosive Kreativität mit System (jede Farbe, jede Animation hat Bedeutung)
- Performance & Accessibility First

---

## WER IST ANTONY?

### Renaissance-Typ mit vielen Instrumenten

**Musik:**
- 40 Jahre Pianist (klassisch ausgebildet)
- Komponist mit Suno (eigene Lyrics, auf Streaming-Plattformen)
- TikTok Klavier-Dokumentation

**Tech:**
- Business Developer & ex-COO (Verlag)
- Fullstack Bootcamp (3 Monate, abgeschlossen)
- AI-Explorer seit ChatGPT (Deep Dive)
- Webdesign mit Cursor/AI-Assistenz
- AI Automations (finetodine.ch)

**Sprache & Kultur:**
- Speech Academy (professioneller Sprecher)
- Podcast (NotebookLM Experiment)
- Restaurantführer (Zürich, Basel, Tessin, Graubünden)
- Fine Dining Expertise
- Typographie & Design Auge

**Persönlich:**
- Neue Leber (vor 3 Jahren, Autoimmun-Geschichte)
- Vater, führt Haushalt
- Energie-Haushalt als Design-Constraint
- Humanist durch Lebens-Krise
- Pattern-Erkenner (Systeme & Menschen)
- Sehr empathisch, extrem hilfsbereit (manchmal zu sehr)

**AI & Ethics:**
- Denkt über EU-autarke Systeme nach
- LLM Skalierung vs. Agentic Systems
- Bedenken: KI-Bewertungen vs. reale Industrie

---

## DESIGN-PHILOSOPHIE

### "Wahnsinnig auf liebevolle Art"

**NICHT:**
- ❌ Minimalismus (zu kalt)
- ❌ Corporate Brutalism (zu unpersönlich)
- ❌ Generic Tech-Startup Style
- ❌ Marketing-Sprache ("Hire me")
- ❌ CV-Format mit Bullet-Points

**SONDERN:**
- ✅ Explosive Kreativität mit physikalischer Präzision
- ✅ Farben mit semantischer Bedeutung (nicht dekorativ)
- ✅ Sections ändern Farbe basierend auf Thema:
  - Musik = Warm (Rot/Orange/Violett)
  - Tech = Kühl (Cyan/Blau)
  - Leber-Story = Transformation (dunkel → hell)
  - "All the power, all the love" = Farb-Explosion
- ✅ Typography reagiert auf Context (Variable Fonts)
- ✅ Scroll-driven Storytelling (CSS native)
- ✅ Organic + Digital Fusion

### Technische Prinzipien

**Performance 2026:**
- LCP <2.0s
- CLS <0.05
- Carbon <0.5g per Visit
- WCAG 2.2 compliant

**Tech-Stack:**
- CSS Scroll-Driven Animations (native, kein GSAP)
- Variable Fonts (Inter/DM Sans)
- SVG Patterns (generiert aus Content: Waveforms, Code)
- View Transitions API
- Zero JavaScript (bis nötig)

**Nicht nutzen:**
- Cursor Trails (Kindergarten)
- Particle Effects (2000er)
- WebGL ohne Bedeutung
- Auto-Playing Content

---

## CONTENT-STRUKTUR (in Diskussion)

### Mögliche Gewichtung

**Hero:**
"Pianist. Geschichtenerzähler. System-Builder. AI-Explorer."

**Intro (2-3 Absätze):**
- Leber-Story als Kontext (warum Energie-Haushalt, warum AI)
- "All the power, all the love"
- Was du mit den Ressourcen machst die du hast

**Arbeitsfelder (nicht "Projekte"):**

**MUSIK:**
- 40 Jahre Klavier
- Suno → Streaming
- TikTok Dokumentation
- Eigene Lyrics + Kompositionen

**TECH:**
- AI Automations (finetodine.ch)
- Webdesign (Cursor)
- Fullstack Background
- Operations/Business Dev

**SPRACHE:**
- Speech Academy
- Podcast (NotebookLM)
- Storytelling

**KULTUR:**
- Restaurantführer (Role?)
- Fine Dining
- Typographie/Design

**Jedes Feld:**
- Was du machst
- Wie lange schon
- Warum es dich reizt
- Was du aktuell erschaffst

**Learnings/Essays:**
- AI & Ethics
- LLMs vs. Agentic Systems
- EU-Autarkie
- Sustainable Web Design
- Format: Short Essays (500-1000 Wörter) oder Notion-Style Docs

**Kontakt:**
"Wenn du über Musik, AI, Systeme, oder Geschichten reden willst"

---

## OFFENE FRAGEN (Content Inventory benötigt)

### Zu klären:

**Musik:**
- Wie viele Suno Tracks veröffentlicht?
- Streaming-Links (Spotify, Apple Music, etc.)
- TikTok: URL + ~Anzahl Videos
- Schreibst du nur Lyrics oder auch Melodie?

**Tech:**
- AI Automations (finetodine.ch): Was macht das konkret?
- Webdesign Projekte: Wie viele zeigbar?
- Fullstack Bootcamp: Jahr, Institution
- Cursor: Was baust du aktuell?

**Sprache:**
- Speech Academy: Jahr, wo
- Podcast: URL, Episoden-Anzahl
- Vorträge: Themen, Frequenz

**Business:**
- COO Verlag: Jahre, Name, Key Achievement
- Business Dev: Für wen, Art von Projekten
- Operations: Größte Erfolge

**Kultur:**
- Restaurantführer: Name, Rolle, Jahre
- Fine Dining Expertise: Wie zeigen?
- Typographie/Design: Konkretes?

**Story-Elemente:**
- Leber: Wie viel Detail preisgeben?
- Familie: Erwähnen ja/nein?
- Wim Hof: Seit wann, warum wichtig
- AI Ethics: Konkrete Thesen oder allgemein?
- "All the power, all the love": Zentral oder subtil?

---

## DEVELOPMENT BLOG (läuft bereits)

### Setup (21. Oktober 2025)

**Tech-Stack:**
- 11ty v3.1.2 (Static Site Generator)
- CommonJS Mode
- Nunjucks Templates
- Markdown Content
- System Fonts
- Netlify Deployment (geplant)

**Struktur:**
```
antony-blog/
├─ src/
│  ├─ posts/           # Blog Posts (Markdown)
│  ├─ _includes/       # Templates
│  │  └─ base.njk     # Base Layout
│  ├─ css/
│  │  └─ style.css    # Styling
│  └─ index.md        # Blog Homepage
├─ .eleventy.js       # 11ty Config
└─ package.json       # Dependencies
```

**Status:**
✅ 11ty installiert & läuft
✅ Markdown → HTML funktioniert
✅ Template-System aktiv
✅ CSS funktioniert
✅ Live-Reload aktiv

**Noch zu bauen:**
- [ ] Post-Template (für Blog-Posts)
- [ ] Posts-Collection (automatische Liste)
- [ ] RSS Feed (AI-friendly)
- [ ] Blog-Index (Übersicht aller Posts)
- [ ] Deployment zu Netlify
- [ ] Git Repository Setup

### Dokumentations-Themen (geplant)

**Blog-Posts während Entwicklung:**

1. **Warum ich meine Website neu baue** (Entwurf vorhanden)
   - Wer ich bin
   - Warum schwierig
   - Der Prozess

2. **Content-First Approach**
   - Content Inventory
   - Wie strukturiert man ein Leben das in keine Kategorie passt?
   - Gewichtung: Haupt-Story vs. Supporting

3. **Design-Prinzipien 2026**
   - Warum Farbe (semantisch, nicht dekorativ)
   - Variable Typography
   - Scroll-Storytelling
   - Performance-Budget

4. **Tech-Stack Entscheidungen**
   - 11ty vs. Astro vs. SvelteKit
   - CSS statt JS (wann und warum)
   - Native Browser Features
   - Sustainable Web Design

5. **AI-Assisted Development**
   - Cursor als Tool
   - AI für Struktur, Human für Soul
   - Was AI gut kann, was nicht

6. **Performance & Accessibility**
   - WCAG 2.2 Compliance
   - Sub-2s LCP
   - Carbon Footprint <0.5g

7. **Deployment & Workflow**
   - Git + Netlify
   - Von unterwegs schreiben (Mobile)
   - Continuous Deployment

---

## INSPIRATIONS & REFERENZEN

### Web-Trends 2025

**Was funktioniert:**
- Anti-Minimalismus mit System
- Flash-Revival Spirit (experimentell, aber modern)
- Scroll-driven Narratives
- Handmade + Digital Fusion
- Organic Shapes (SVG-basiert)
- Gaming UI Elements (holographisch, glühend)

**2026 Vorhersagen (validiert):**
- Scroll-Storytelling wird Standard (native Browser-Support)
- Variable Typography wird Default (Performance-Vorteil)
- Color-Systems mit Semantic Meaning
- Performance-Regulation (EU Carbon Budgets)
- AI-Differenzierung durch Human Touch

### Portfolio-Referenzen

**Inspirierend (von Awwwards/Muzli):**
- Samsy Ninja (SMSY) – Computational Design
- Studio Null – Interactive Web Spaces
- Joseph San – Kinetic Typography
- Cyd Stumpel – Transitions + 3D
- Flash-Revival Sites (experimentell, strukturiert)

**Prinzipien:**
- Nicht: "Schau wie fancy"
- Sondern: "Jede Bewegung hat Bedeutung"
- Choreographie, nicht Dekoration

---

## NÄCHSTE SCHRITTE

### Immediate (diese Woche)

1. **Content Inventory ausfüllen**
   - Template erstellt (siehe "Offene Fragen")
   - Alle Projekte/Links/Zahlen sammeln

2. **Blog fertigstellen**
   - Post-Template
   - RSS Feed
   - Deployment zu Netlify

3. **Ersten echten Post schreiben**
   - Content Inventory Ergebnisse
   - Oder: Design-Prinzipien

### Short-term (nächste 2-4 Wochen)

1. **Content-Strategie finalisieren**
   - Gewichtung festlegen
   - Struktur definieren
   - Texte schreiben

2. **Design-System entwickeln**
   - Farb-Palette (semantisch)
   - Typography-Hierarchie
   - Animation-Framework

3. **Prototyp bauen**
   - Hero + 1 Section testen
   - Scroll-Animationen implementieren
   - Feedback-Loop

### Medium-term (nächste 1-2 Monate)

1. **Finale Site bauen**
   - Alle Sections implementieren
   - Performance optimieren
   - WCAG 2.2 Testing

2. **Launch**
   - DNS zu neuer Site
   - Blog bleibt als Archiv/Learnings-Section?
   - Oder verschwindet?

---

## KRITISCHE LEARNINGS

### Aus dem Entwicklungsprozess

**Prozess > Perfektion:**
- Iterative Feedback-Loops
- Online-Testing vor finalem Design
- Kritisches Hinterfragen eigener Assumptions

**Content First ist nicht optional:**
- Code ist einfach
- Content ist Strategie
- Design folgt aus Content, nicht umgekehrt

**11ty v3 Spezifika:**
- CommonJS vs. ESM (beide funktionieren)
- Template-Engine muss explizit gesetzt werden
- Unsichtbare Zeichen beim Copy/Paste können Files kaputt machen
- Live-Reload ist Gold

**Debugging-Ansatz:**
- Nicht 5 Fragen auf einmal
- Systematisch, Schritt für Schritt
- Terminal-Output kritisch lesen
- Bei Problemen: `npx @11ty/eleventy` direkt aufrufen

---

## PHILOSOPHIE & WERTE

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

## TECH-DETAILS (für Wiederaufnahme)

### Aktuelle Config

**`.eleventy.js`:**
```javascript
module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
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

**`package.json` Scripts:**
```json
"scripts": {
  "start": "eleventy --serve",
  "build": "eleventy"
}
```

**Ordnerstruktur:**
- `src/` – Alle Source-Files
- `src/posts/` – Blog Posts (noch leer)
- `src/_includes/` – Templates
- `src/css/` – Styling
- `_site/` – Build Output (auto-generiert)

### Bekannte Issues

**Template-Problem (gelöst):**
- Copy/Paste von Templates kann unsichtbare Zeichen einfügen
- Symptom: Leere HTML-Files trotz korrektem Build
- Lösung: Templates selbst in Cursor abschreiben

**Auto-Save:**
- Cursor speichert nicht automatisch
- CMD+S / CTRL+S notwendig
- Oder: Settings → Auto Save aktivieren

---

## KONTAKT-INFO

**Projekt:** antony.ch  
**Current Domain:** antony.ch (bestehend, minimal)  
**Development Blog:** Lokal, wird zu Netlify deployed  
**Git Repository:** Noch nicht erstellt  

**Lokaler Pfad:** `~/webdesign/antony-blog/`

---

## ZUSAMMENFASSUNG FÜR NÄCHSTEN CHAT

**Wo wir stehen:**
- Development Blog läuft (11ty)
- Content-Strategie diskutiert, aber nicht finalisiert
- Design-Philosophie klar ("explosive Kreativität mit System")
- Tech-Stack definiert (CSS-native, Performance-First)
- Content Inventory benötigt (alle Projekte/Links sammeln)

**Was als nächstes:**
1. Content Inventory ausfüllen (Projekte, Links, Zahlen)
2. Blog fertigstellen (Posts, RSS, Deployment)
3. Design-System entwickeln (Farben, Typography)
4. Prototyp bauen (Hero + 1 Section testen)

**Kritische Erkenntnisse:**
- Du bist kein "Creative Technologist" – du bist Renaissance-Typ
- AI ist dein neuestes Instrument (wie Klavier, wie Code)
- Website muss "wahnsinnig auf liebevolle Art" sein
- Content First ist mandatory (kein Design ohne Content)
- Transparenz durch Blog-Dokumentation

**Philosophie:**
"All the power, all the love" – Mit voller Energie + vollem Herzen, trotz Constraints.

---

**Erstellt:** 21. Oktober 2025  
**Letzte Diskussion:** Setup von 11ty Blog, Content-Strategie, Design-Philosophie  
**Nächster Schritt:** Content Inventory + Blog finalisieren
