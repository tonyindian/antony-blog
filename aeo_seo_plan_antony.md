# AEO / SEO Masterplan – antony.ch (2025/26)

Ziel: Maximale AI‑Sichtbarkeit für TEXT, maximale Sicherheit für AUDIO.
Die Website bleibt ruhig, minimalistisch und professionell. Alle Optimierungen dienen Klarheit, Expertise und echter Nutzbarkeit.

---

## 1. Leitprinzipien

1. **Text ja – Audio geschützt.**
   - Texte, Blogposts, FAQs, Snippets → AI‑freundlich, crawlbar.
   - Audio-Demos → nicht indexierbar, nicht AI‑verwertbar.

2. **Authentizität vor SEO‑Tricks.**
   - Keine generischen SEO-Texte.
   - Inhalte aus echter Sprecher‑Erfahrung, musikalischer Perspektive und Arbeitsweise.

3. **AEO (Answer Engine Optimization) statt altem Keyword‑SEO.**
   - Klare Antworten, strukturierte Fragen, saubere Schema-Daten.
   - Ziel: von ChatGPT, Gemini, Perplexity als *Quelle* zitiert werden.

4. **Hoher Content‑Effort.**
   - Originalität, echtes Wissen, reflektierte Erfahrung.
   - Struktur: kurz, präzise, klar.

---

## 2. Technische Grundlage

### 2.1 robots.txt
- `/audio/` für alle Bots sperren.
- Rest der Seite für GPTBot, OAI‑SearchBot, PerplexityBot etc. offen lassen.

### 2.2 llms.txt
- Nur relevante Textseiten auflisten:
  - Startseite, Blog, About, Kontakt.
- Keine Audioseiten oder MP3-Pfade nennen.

### 2.3 HTTP‑Header (`_headers`)
Für `/audio/*`:
- `X-Robots-Tag: noindex, noai, noimageai, nosnippet`

### 2.4 11ty Config
- `site.url` korrekt setzen.
- Konsistente Canonicals.

---

## 3. Strukturierte Daten (Schema.org)

### 3.1 Person Schema
- Typ: `Person` + `VoiceActor`.
- Felder: Name, Bild, @id, Adresse/Zürich, URL, sameAs.

### 3.2 Article Schema
Für jeden Blogpost:
- `Article` mit `headline`, `author`, `datePublished`, `dateModified`.
- Optional: `mainEntityOfPage`.

### 3.3 FAQPage Schema
Auf Blogposts oder eigener FAQ-Seite:
- Fragen/H2 als echte Nutzerfragen.
- Antworten kurz, direkt, präzise.

### 3.4 KEIN AudioObject Schema
- Keine maschinenlesbare Referenz zu MP3‑Files.
- Nur HTML `<audio>` Element ohne zusätzliche Daten.

---

## 4. Inhaltsarchitektur (AEO)

### 4.1 Blogpost-Struktur
Jeder Artikel folgt:
1. **40–60-Wort-Kernaussage** im Frontmatter (`answer`).
2. H2 und H3 in Frageform.
3. Kurze Absätze (<80 Wörter).
4. Kleine persönliche Beispiele aus deiner Arbeit.
5. FAQ-Block am Ende (2–4 Fragen).
6. Autorblock + „Zuletzt aktualisiert“.

### 4.2 Startseite
- Minimal bleiben.
- Kein zusätzlicher SEO-Textblock.
- Nur Person‑Schema hinzufügen.

### 4.3 Themen
Nur echte Expertise:
- Rhythmus & Stimme
- Timing & Musikalität im Voice‑Over
- Wie man Takes effizient produziert
- Arbeit mit Regie / Feedback
- Wie du Dokus, Werbung, Hörbuch unterschiedlich angehst
- Studio-Alltag, Workflow, Vorbereitung

NICHT:
- Generisches „Sprecher in Zürich“.
- „Wie findet man eine Sprecherstimme?“.
- Technik, die du nicht selbst nutzt.

### 4.4 Originalität & Effort
- Jeder Artikel soll eigene Einsichten enthalten.
- Keine Wiederholungen, keine KI-Floskeln.
- Mindestens ein konkretes Szenario pro Text.

---

## 5. Interne Verlinkung

- Thematisch verwandte Artikel vernetzen.
- Von Blogposts zu passenden Hörbeispielen (ohne Schema).
- Dezente Links zurück zur Kontaktseite.

---

## 6. Sicherheit für Audio

### 6.1 Verhindern von KI-Training
- robots.txt Sperre für `/audio/`.
- HTTP-Header mit `noai`.
- Keine Audio-Schema-Daten.
- Keine Audio-Pfade in llms.txt.

### 6.2 Optionale Schutzmassnahmen
- Kürzere Ausschnitte statt Vollversion.
- Rechtehinweis auf Demo-Seite:
  „Audio-Demos dürfen nicht für KI-Training oder -Analyse verwendet werden.“

---

## 7. Design & Struktur

- Minimalistisch, ruhig, klar.
- Fokus auf Lesbarkeit und Glaubwürdigkeit.
- Keine aggressive SEO-Optik.
- Keine unnötigen Widgets.

---

## 8. Monitoring

### 8.1 Manuelle AI-Checks
Regelmäßig testen:
- „Sprecher Zürich“
- „Voice Actor rhythmisch“
- „Wie klingt eine ruhige, präzise Sprecherstimme?“
- „Wer erklärt Timing im Voice-Over?“

### 8.2 Periodische Updates
- Blogposts regelmäßig überarbeiten.
- Datum im Frontmatter aktualisieren.

---

## 9. Entwicklungsworkflow in Cursor

### 9.1 Vorgehen pro Task
1. Referenz: `AEO-SEO-PLAN.md`.
2. Einzelaufgabe formulieren (z. B. “Person-Schema in base.njk einbauen”).
3. ChatGPT soll:
   - nur betroffene Dateien ändern,
   - nichts anderes anfassen,
   - keine Audio-Struktur öffnen.

### 9.2 Projektweite Regeln
- Keine Änderungen an `/audio/` ohne explizite Erlaubnis.
- Nur Textseiten AI‑optimieren.
- Blogposts streng nach Struktur.
- Hinweise und Schema strikt befolgen.

---

## 9\. Content Freshness

- Alle 4–6 Wochen kleine Aktualisierungen an bestehenden Blogposts.
- Frontmatter `updated:` immer pflegen.
- Snippets und FAQs bei Bedarf anpassen.
- AI-Sichtbarkeit manuell prüfen und Erkenntnisse einarbeiten.

---

## 10. Technische Hygiene: Canonicals & URLs

- Jede Seite erhält eine eindeutige Canonical-URL.
- Konsistente Slashes (z. B. immer mit `/` am Ende oder strikt ohne).
- Keine doppelten Routen in 11ty.
- Canonicals im Base-Template definieren.

---

## 11. llms.txt – Erweiterung

- Blog-Übersichtsseite aufnehmen.
- Bei besonders relevanten Artikeln auch deren direkte URLs.
- Keine Audio-Pfade.

---

## 12. Semantische HTML-Landmarks

- `<main>` auf der Startseite einführen.
- `<nav aria-label="Hauptnavigation">` im Header.
- Abschnittsstruktur klar halten (`<section>` mit sinnvollen Überschriften).

---

## 13. Priorisierte Umsetzung (Roadmap)

### Phase 1: Technik
- robots.txt, llms.txt, _headers
- Canonicals & URL-Hygiene

### Phase 2: Schema
- Person-Schema
- Article & FAQ Schema

### Phase 3: Blogstruktur
- Layouts anpassen
- FAQ-Partials
- Author-Block
- Semantische Landmarks

### Phase 4: Content produzieren
- 3–5 hochwertige Artikel
- interne Verlinkung

### Phase 5: Monitoring & Freshness
- AI-Sichtbarkeit testen
- Blogposts regelmäßig aktualisieren (Roadmap)

### Phase 1: Technik
- robots.txt, llms.txt, _headers
- Canonicals prüfen

### Phase 2: Schema
- Person-Schema
- Article & FAQ Schema

### Phase 3: Blogstruktur
- Layouts anpassen
- FAQ-Partials
- Author-Block

### Phase 4: Content produzieren
- 3–5 hochwertige Artikel
- interne Verlinkung

### Phase 5: Monitoring
- AI-Sichtbarkeit testen
- Artikel pflegen

---

Das ist der offizielle, vollständige AEO-/SEO‑Masterplan für antony.ch.
Er verbindet maximale AI‑Sichtbarkeit mit professionellem Schutz deiner Stimme.

