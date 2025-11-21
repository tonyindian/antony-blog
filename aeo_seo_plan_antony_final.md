# AEO / SEO Masterplan – antony.ch (2025/26)

Ziel: Maximale AI-Sichtbarkeit für TEXT, maximale Sicherheit für AUDIO.
Die Website bleibt ruhig, minimalistisch und professionell. Alle Optimierungen dienen Klarheit, Expertise und echter Nutzbarkeit.

---

## 1. Leitprinzipien

1. **Text ja – Audio geschützt.**
   - Texte, Blogposts, FAQs, Snippets → AI-freundlich, crawlbar.
   - Audio-Demos → nicht indexierbar, nicht für KI-Training oder -Analyse freigeben.

2. **Authentizität vor SEO-Tricks.**
   - Keine generischen SEO-Texte.
   - Inhalte aus echter Sprecher-Erfahrung, musikalischer Perspektive und Arbeitsweise.

3. **AEO (Answer Engine Optimization) statt altem Keyword-SEO.**
   - Klare Antworten, strukturierte Fragen, saubere Schema-Daten.
   - Ziel: von ChatGPT, Gemini, Perplexity etc. als *Quelle* zitiert werden.

4. **Hoher Content-Effort.**
   - Originalität, echtes Wissen, reflektierte Erfahrung.
   - Struktur: kurz, präzise, klar.

---

## 2. Technische Grundlage

### 2.1 robots.txt

- `/audio/` für Bots sperren.
- Rest der Seite für Such- und AI-Crawler offen lassen.

### 2.2 llms.txt

- Wichtige Textseiten auflisten (Startseite, Blog, About, Kontakt).
- Keine Audio-Verzeichnisse oder MP3-Dateien nennen.

### 2.3 HTTP-Header (`_headers`)

Für `/audio/*`:
- `X-Robots-Tag: noindex, noai, noimageai, nosnippet`

### 2.4 11ty Config

- `site.url` korrekt setzen.
- Canonical-URLs im Base-Template definieren.
- Trailing Slashes konsistent behandeln.

---

## 3. Strukturierte Daten (Schema.org)

### 3.1 Person Schema

- Typ: `Person` + `VoiceActor`.
- Felder: Name, Bild, @id, Adresse/Zürich, URL, sameAs.

### 3.2 Article Schema

- `headline`, `author`, `datePublished`, `dateModified`, `mainEntityOfPage`.

### 3.3 FAQPage Schema

- Fragen/H2 als echte Nutzerfragen.
- Antworten kurz und klar.

### 3.4 KEIN AudioObject Schema

- Keine maschinenlesbare Referenz zu MP3-Files.
- Demos nur als `<audio>` im HTML.

---

## 4. Inhaltsarchitektur (AEO)

### 4.1 Blogpost-Struktur

1. **40–60-Wort-Kernaussage** im Lead-Absatz.
2. H2/H3 als echte Fragen.
3. Kurze Absätze (<80 Wörter).
4. Konkrete Beispiele aus deiner Arbeit.
5. FAQ-Block am Ende.
6. Autorblock.
7. "Zuletzt aktualisiert" sichtbar.

### 4.2 Startseite

- Minimal halten.
- Kein zusätzlicher SEO-Block.
- Person-Schema einbinden.

### 4.3 Themenfokus

Nur echte Expertise:
- Rhythmus & Stimme
- Timing & Musikalität
- Stille als Werkzeug
- Mikrofonarbeit
- Regie & Feedback
- Unterschiedliche Herangehensweisen (Werbung, Doku, Hörbuch)

### 4.4 Originalität & Effort

- Jeder Artikel enthält mindestens eine eigene Einsicht.
- Keine generischen KI-Texte.

---

## 5. Interne Verlinkung

- Verwandte Artikel vernetzen.
- Links zu Hörbeispielen (ohne Schema).
- Dezente Kontaktlinks.

---

## 6. Sicherheit für Audio

### 6.1 Web-Technik

- Sperre in `robots.txt`.
- `X-Robots-Tag` für `/audio/*`.
- Keine Audio-Schemas.
- Keine Audio-Pfade in `llms.txt`.

### 6.2 Kommunikation

Hinweis auf Website:
„Audio-Demos dienen ausschließlich zur Hörprobe und dürfen nicht für KI-/ML-Training verwendet werden.“

---

## 7. Design & Struktur

- Minimalistisch, ruhig, klar.
- Fokus auf Lesbarkeit.
- Semantische Struktur (`<main>`, `<nav>`).

---

## 8. Monitoring

### 8.1 Manuelle AI-Checks

Regelmäßig testen in ChatGPT, Gemini, Perplexity:
- "Sprecher Zürich musikalisches Timing"
- "Stimme mit rhythmischer Präzision"

### 8.2 Freshness

- Inhaltliche Updates alle 4–6 Wochen.
- Frontmatter `updated:` pflegen.

---

## 9. Technische Hygiene

- Jede Seite hat eine eindeutige Canonical-URL.
- Keine doppelten Routen.
- Slashes konsistent.

---

## 10. llms.txt – Erweiterung

- Blog-Übersicht aufnehmen.
- Relevante Artikel einzeln listen.
- Audio-Pfade weglassen.

---

## 11. Semantische HTML-Landmarks

- `<main>` muss Hauptinhalt umschließen.
- `<nav aria-label="Hauptnavigation">` verwenden.
- Sinnvolle `<section>`-Struktur.

---

## 12. Entwicklungsworkflow in Cursor

### 12.1 Prinzip

Cursor + ChatGPT 5.1 helfen bei strukturierter Umsetzung des Plans.
Wichtig:
- Audio-Schutz ist **Web-Technik**, nicht Cursor-Funktion.
- Verantwortung bleibt beim Projekt.

### 12.2 Projektdateien

- `AEO-SEO-PLAN.md` im Root.
- `CURSOR_NOTES.md` mit Projektregeln.
- `.cursorrules` mit:
  - "Audio nie anfassen"
  - "AEO-Plan immer befolgen"

### 12.3 Vorgehen pro Task

1. Task formulieren.
2. Dateien öffnen.
3. Cursor bitten: "Bitte nur diese Dateien ändern und AEO-Plan befolgen."
4. Änderungen prüfen.

### 12.4 Kontrollschleife

- Prüfen, ob Cursor nicht versehentlich Audio-Schemas oder falsche Header eingefügt hat.
- Git-Diffs immer kritisch kontrollieren.

---

## 13. Priorisierte Umsetzung (Roadmap)

### Phase 1: Technik
- robots.txt, llms.txt, `_headers`.
- Canonicals.
- Semantische Landmarks.

### Phase 2: Schema
- Person-Schema.
- Article & FAQs.

### Phase 3: Blogstruktur
- Post-Layout.
- FAQ-Partials.
- Autorblock.

### Phase 4: Content
- 3–5 hochwertige Artikel.
- Interne Verlinkung.

### Phase 5: Monitoring
- AI-Sichtbarkeit checken.
- Blogposts aktualisieren.

---

Das ist der vollständige, aktualisierte AEO-/SEO-Masterplan für antony.ch – optimiert für maximale AI-Sichtbarkeit bei vollem Schutz deiner Stimme.

