# POI-Workflow: Harz-Karte

Die Karte wächst über eine zentrale Datendatei. So kommen neue Ziele und praktische Angaben hinein.

## Dateien
- `public/pois.js`: einzige Datenquelle (Kategorien und alle POIs). Wird vom Skript verwaltet, nicht von Hand bearbeiten.
- `add-poi.mjs`: fügt POIs hinzu (Geocoding, Prüfung, Dubletten) oder ergänzt praktische Angaben (`--update`).
- `poi-schema.mjs`: Regeln für jedes Feld. Skript und Tests nutzen dieselben Regeln.
- `public/index.html`: lädt `pois.js` und zeigt Karte, Liste und Filter.

## POI-Schema
| Feld | Pflicht | Beschreibung |
|------|---------|--------------|
| `name` | ja | Anzeigename, eindeutig (`--update` gleicht darüber ab) |
| `cat` | ja | `natur`, `hoehle`, `kultur`, `erlebnis` oder `mtb` |
| `region` | ja | z. B. `Westharz`, `Ostharz`, `Südharz` |
| `desc` | ja | 1–2 Sätze |
| `lat`, `lng` | ja im Ergebnis | fehlen sie in der Eingabe, geocodet das Skript über OpenStreetMap; müssen im Harz liegen |
| `query` | nein | alternativer Geocoding-Text statt `name` (wird nicht gespeichert) |
| `mtb` | nein | `{ typ, lift, detail }` für `cat: "mtb"` |
| `confidence` | nein | MTB-Altfeld: `HIGH`, `MED-HIGH`, `MED`, `LOW` |
| `web` | nein | offizielle Website, nur `https://` |
| `parken` | nein | wo parken, ob kostenpflichtig |
| `dauer` | nein | typische Besuchsdauer, z. B. „1–2 Std.“ |
| `kinder` | nein | `ja`, `bedingt` oder `nein`: geeignet mit Kleinkind (Kinderwagen, Trage) |
| `kinderHinweis` | nein | ein Satz, warum |
| `quellen` | Pflicht bei `parken`, `dauer`, `kinder` | Liste von `https://`-Belegen |
| `konfidenz` | Pflicht bei `parken`, `dauer`, `kinder` | `Hoch` selbst geprüft, `Mittel` plausibel abgeleitet, `Niedrig` Schätzung |

## Neues Ziel hinzufügen
1. Eingabe anlegen (ein Objekt oder eine Liste), z. B. `neu.json`:
   ```json
   [
     { "name": "Brocken", "cat": "natur", "region": "Ostharz",
       "desc": "Höchster Berg des Harzes (1.141 m), oft im Nebel." }
   ]
   ```
2. Vorschau (geocodet und prüft, schreibt nichts): `node add-poi.mjs neu.json --dry-run`
3. Passt es, echter Lauf: `node add-poi.mjs neu.json`

## Praktische Angaben ergänzen
1. Eingabe mit `name` und den Feldern, die sich ändern sollen. `null` oder `""` entfernt ein Feld:
   ```json
   [
     { "name": "Brocken", "dauer": "halber Tag", "kinder": "bedingt",
       "kinderHinweis": "Mit der Brockenbahn hinauf, oben kinderwagentauglich.",
       "quellen": ["https://www.hsb-wr.de/"], "konfidenz": "Mittel" }
   ]
   ```
2. `node add-poi.mjs info.json --update --dry-run`, danach ohne `--dry-run`.

## Veröffentlichen
`npm test`, dann Branch, Commit und Pull Request. Vercel baut für den PR eine Vorschau und nach dem Merge die
Produktion.

## Ablauf mit Claude
Du nennst nur den Namen („füge den Brocken hinzu“). Claude recherchiert Kategorie, Region, Beschreibung und die
praktischen Angaben mit Quellen, macht einen `--dry-run` zur Kontrolle der Koordinaten, du bestätigst, dann folgen
echter Lauf und PR.
