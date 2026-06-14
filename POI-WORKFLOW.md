# POI-Workflow — Harz-Karte

Die Karte wächst über eine zentrale Datendatei. So kommen neue Points of Interest rein.

## Dateien
- **`pois.js`** — einzige Datenquelle (Kategorien + alle POIs). Wird vom Skript verwaltet → **nicht von Hand bearbeiten**.
- **`add-poi.mjs`** — fügt POIs hinzu (Geocoding, Validierung, Dedup).
- **`harz-highlights-karte.html`** — lädt `pois.js`, rendert Karte + Liste + Filter.

## POI-Schema
| Feld | Pflicht | Beschreibung |
|------|---------|--------------|
| `name` | ✅ | Anzeigename |
| `cat` | ✅ | eine von: `natur`, `hoehle`, `kultur`, `erlebnis`, `mtb` |
| `region` | ✅ | z.B. `Westharz`, `Ostharz`, `Südharz` |
| `desc` | ✅ | 1–2 Sätze |
| `lat`, `lng` | – | fehlt → Geocoding via OpenStreetMap |
| `query` | – | alternativer Geocoding-Text statt `name` |
| `mtb` | – | `{ typ, lift, detail }` (für `cat:"mtb"`) |
| `confidence` | – | `HIGH` · `MED-HIGH` · `MED` · `LOW` |

## Hinzufügen
1. Eingabe-JSON anlegen (ein Objekt **oder** eine Liste), z.B. `neu.json`:
   ```json
   [
     { "name": "Brocken", "cat": "natur", "region": "Ostharz",
       "desc": "Höchster Berg des Harzes (1.141 m), oft in Nebel gehüllt." }
   ]
   ```
2. **Vorschau** (geocodet + prüft, schreibt nichts):
   ```bash
   node add-poi.mjs neu.json --dry-run
   ```
3. Passt es → **echter Lauf** (schreibt `pois.js`):
   ```bash
   node add-poi.mjs neu.json
   ```
4. Veröffentlichen:
   ```bash
   git add pois.js && git commit -m "Add POI: <Name>" && git push
   # oder direkt: vercel deploy --prod
   ```

## Prüfungen im Skript
- Pflichtfelder vorhanden, Kategorie gültig.
- Fehlende Koordinaten → Geocoding (max. 1 Anfrage/Sek., zeigt OSM-Treffer zur Kontrolle).
- Dedup: gleicher Name **oder** < 150 m zu vorhandenem POI → übersprungen.

## Ablauf mit Claude
Du nennst nur den Namen („füge den Brocken hinzu"). Claude recherchiert Kategorie/Region/Beschreibung,
macht einen `--dry-run` zur Koordinaten-Kontrolle, du bestätigst, dann echter Lauf + Deploy.
