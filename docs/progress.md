# Progress — Harz Highlights Karte

## 2026-06-14 14:00

### Completed Tasks
- Uploaded the existing map to GitHub repo `acebolln/harz_karte` (authenticated gh as the personal `acebolln` account).
- Deployed to Vercel project `harzhighlights`; added `vercel.json` rewrite (`/` → map), disabled Vercel Authentication, registered `harzhighlights.vercel.app` as a production domain → live at https://harzhighlights.vercel.app.
- Built a reusable POI-adding workflow: externalized data to `pois.js` + `add-poi.mjs` script (OSM geocoding, validation, dedup, `--dry-run`).
- Filter feature: single-select → multi-select category filters (OR logic) shared across list + map views.
- Added an on-map quick-filter (mobile): "Filter" pill + popover with the same chips, count badge, and active-state styling.
- Verified end-to-end in a headless browser (desktop + 390px mobile): multi-select, dual-chip sync, badge, popover open/close, reset.

### Changed Files
- `harz-highlights-karte.html` — data now loaded from `pois.js`; multi-select filter state (`Set`); dual chip rendering + sync; map filter pill/popover markup + CSS.
- `pois.js` (new) — single source of truth for categories + 36 POIs; loadable in browser (`window.HARZ_*`) and Node (`globalThis.HARZ_*`). Auto-managed by the script.
- `add-poi.mjs` (new) — Node script to add POIs (geocode, validate, dedup, dry-run/write).
- `POI-WORKFLOW.md` (new) — schema + step-by-step for adding POIs.
- `vercel.json` — root rewrite to the map HTML.
- `.gitignore` — ignores `.vercel`, `.claude/`, `.playwright-mcp/`, `_*.json`.

### Technical Decisions
- **Externalize POI data to `pois.js`** (IIFE assigning to `window`/`globalThis`) instead of inline or a separate JSON: keeps the HTML lean, works locally (file://) and on Vercel, and is directly readable by the Node script. Chosen over inline-with-markers (fragile parsing).
- **Full regeneration on write** (JSON.stringify) in `add-poi.mjs` — robust, deterministic; the file is treated as auto-managed.
- **Multi-select via `state.cats` (Set), OR logic.** "Alle" clears the set; selecting a category toggles membership.
- **Map quick-filter on mobile only (≤820px)** — desktop keeps the praised sidebar (chips always visible there); avoids cluttering the desktop map. Easy to enable on desktop later.
- **Add-by-name workflow** — user names a POI; Claude researches cat/region/desc, geocodes, confirms via dry-run, then writes + deploys.

### Current State
- TypeScript errors: N/A — plain static HTML/CSS/JS, no TS, no build step.
- Build status: N/A; deployment is the "build". Live and verified (HTTP 200, new version serving `pois.js` + map filter) at https://harzhighlights.vercel.app.
- Works: map, list, search, distance sort, multi-select filters (both views), on-map mobile filter with badge, POI add script (validation/dedup/geocoding/dry-run all tested).
- Open: no Git→Vercel auto-deploy integration (deploys are manual via `vercel deploy --prod --yes`).

### Next Steps
- Optionally add the first batch of new POIs to exercise the workflow.
- Optional: connect Git integration in Vercel (Settings → Git) so GitHub pushes auto-deploy.
- Optional: surface the map quick-filter on desktop too, if wanted.

### Open Questions
- Which POIs to add next? (User can just name them.)
- Keep deploys manual, or set up GitHub→Vercel auto-deploy?
