# Harz Highlights Karte — Project Memory

Private personal project (**acebolln** account, not Appvantage). Public Leaflet map of Harz points of interest at
https://harz-landkarte.cbb-digital.com. Plain static HTML/CSS/JS, no build step, no TypeScript: a documented
exception to the cbb-digital stack (Christian, 21.10.2026), because one page with a data file needs nothing more.

## References
[acebolln/cbb-referenzen](https://github.com/acebolln/cbb-referenzen) (clone `~/cbb-referenzen`): read
`conventions/design.md` and `conventions/content.md` before UI or content work, check `building-blocks/` before
building a feature. The shared hooks are registered in `.claude/settings.json`.

## Conventions
- **Checkpoints:** On every `/checkpoint`, ALSO update `docs/progress.md` (new entry at the top) and commit it.
- **Deploy:** Git → Vercel (project `harzhighlights`). Pull requests get a preview, merge to `main` deploys
  production. Vercel serves only `public/` (`vercel.json`), so docs and scripts stay off the web.
- **Tests:** `npm test` (data schema, page assets, layout sweep 360–1440 px with Playwright). Green before a PR;
  the `pr-tests` hook enforces it.
- UI texts and code comments German with real umlauts; commit messages English.
- Commit identity: `acebolln <acebolln@gmail.com>`.
- Design: cbb-digital tokens (copied from `website/public/index.html`), self-hosted fonts in `public/fonts/`,
  Leaflet 1.9.4 vendored in `public/vendor/leaflet/`. Nothing loads from third parties except map tiles
  (OpenTopoMap, Esri World Imagery, CARTO); a test enforces this.

## Adding POIs (growing map)
- POI + category data live in `public/pois.js`: **auto-managed, do not hand-edit**.
- Add via `node add-poi.mjs <input.json> [--dry-run]` (geocodes via OSM, validates, dedups).
- Add practical info (web, parken, dauer, kinder, quellen, konfidenz) via `node add-poi.mjs <info.json> --update`.
- Field rules: `poi-schema.mjs`. Workflow: `POI-WORKFLOW.md`.
- Categories: `natur`, `hoehle`, `kultur`, `erlebnis`, `mtb`. Pin colours must keep white text ≥ 4.5:1 (tested).
- Flow when the user names a POI: research cat/region/desc → `--dry-run` to confirm coords → real run → branch, PR.

## Structure
- `public/index.html`: UI (map with terrain/satellite/street switch, list, search, category and child filters).
- `public/pois.js`: categories + POIs (`window.HARZ_*` in browser, `globalThis.HARZ_*` in Node).
- `add-poi.mjs`, `poi-schema.mjs`: data tooling.
- `test/`: `daten`, `seite`, `layout/karte` tests; `layout/hilfe.mjs` is a copy from the website repo.
