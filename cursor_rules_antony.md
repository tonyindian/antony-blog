# Cursor Rules – antony.ch (Stand November 2025)

Diese Regeln gelten für alle AI-Änderungen in diesem Projekt. Cursor und alle angebundenen Modelle (GPT-5.1) müssen sie strikt befolgen.

---

## Kontext des Projekts
- Dies ist die Website von Antony Alex, Sprecher & Musiker in Zürich.
- Die gesamte SEO- und AEO-Strategie ist in `AEO_SEO_PLAN_ANTONY_FINAL.md` definiert.
- Alle Optimierungen müssen sich an diesen Plan halten.
- Das Design der Seite ist bewusst minimalistisch, ruhig und professionell.

---

## Allgemeine Regeln
- Lies bei jeder Aufgabe zuerst `AEO_SEO_PLAN_ANTONY_FINAL.md`.
- Keine generischen SEO-Texte. Inhalte müssen auf echter Sprecher- und Musikerfahrung basieren.
- Stil bleibt knapp, klar, professionell – keine Werbefloskeln.
- Keine strukturellen Änderungen ohne Notwendigkeit.

---

## Audio-Schutz (sehr wichtig)
- Ordner `/audio/` ist geschützt.
- Niemals Audio-Dateien verändern, verschieben, referenzieren oder optimieren.
- Kein AudioObject-Schema hinzufügen.
- Keine Maßnahmen vornehmen, die Audio für AI-Systeme leichter zugänglich machen.
- `robots.txt` und `_headers` dürfen niemals Regeln entfernen, die `/audio/` schützen.

---

## Arbeiten an Texten und Templates
Wenn `.njk`, `.md`, `.html` oder `.11tydata.js` Dateien bearbeitet werden:

- Texte AI-freundlich strukturieren:
  - 40–60-Wort-Snippets,
  - H2/H3 als Fragen,
  - FAQ-Blöcke,
  - kurze Absätze (<80 Wörter).
- Schema.org nur für TEXT:
  - `Person`, `VoiceActor`, `Article`, `FAQPage`.
- Kein Schema.org für Audio.
- Keine Keyword-Füllung.
- Wo Beispiele gebraucht werden: echte Beispiele aus Antonys Praxis nutzen.

---

## robots.txt
- `/audio/` muss für alle AI-Bots gesperrt bleiben (GPTBot, OAI-SearchBot, PerplexityBot usw.).
- Textbereiche müssen für AI-Bots offen bleiben.
- Keine Lockerung ohne expliziten Auftrag.

---

## _headers
- Für `/audio/*` immer:
  `X-Robots-Tag: noindex, noai, noimageai, nosnippet`
- Keine Änderungen an diesen Headern ohne explizite Anweisung.

---

## llms.txt
- Darf nur TEXT-Seiten listen: Startseite, Blog, About, Kontakt, ausgewählte Artikel.
- Keine Audio- oder Medienpfade.
- URLs müssen canonical sein.

---

## Änderungen am Masterplan
- `AEO_SEO_PLAN_ANTONY_FINAL.md` darf nur auf ausdrückliche Aufforderung des Nutzers geändert werden.
- Cursor soll nie automatisch versuchen, diesen Plan zu verbessern, zu kürzen oder umzuschreiben.

---

## Sicherheit & Kontrolle
- Cursor soll bei jedem Vorschlag prüfen, ob Audio-Schutz verletzt wird.
- Cursor soll warnen, wenn eine Änderung dem Masterplan widerspricht.
- Git-Diffs immer minimieren und klar ausweisen.

