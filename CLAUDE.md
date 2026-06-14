# Harz Highlights Karte — Project Memory

Private personal project (**acebolln** account, not Appvantage). Interactive Leaflet map of Harz points of interest. Plain static HTML/CSS/JS — no build step, no TypeScript.

## Conventions
- **Checkpoints:** On every `/checkpoint`, ALSO update `docs/progress.md` (new entry at the top) and commit it.
- **Deploy is manual:** `vercel deploy --prod --yes` (no Git→Vercel auto-deploy). Production domain `harzhighlights.vercel.app` auto-updates on each prod deploy.
- Live: https://harzhighlights.vercel.app · Repo: https://github.com/acebolln/harz_karte
- Commit identity: `acebolln <acebolln@gmail.com>`.

## Adding POIs (growing map)
- POI + category data live in `pois.js` — **auto-managed, do not hand-edit**.
- Add via `node add-poi.mjs <input.json> [--dry-run]` (geocodes via OSM, validates, dedups). See `POI-WORKFLOW.md`.
- Categories: `natur`, `hoehle`, `kultur`, `erlebnis`, `mtb`.
- Flow when the user names a POI: research cat/region/desc → `--dry-run` to confirm coords → real run → commit + deploy.

## Structure
- `harz-highlights-karte.html` — UI: map + list + search + multi-select category filters (OR logic); loads `pois.js`.
- `pois.js` — categories + POIs (`window.HARZ_*` in browser, `globalThis.HARZ_*` in Node).
- `add-poi.mjs` — POI add script.
- `vercel.json` — rewrites `/` to the map HTML.
