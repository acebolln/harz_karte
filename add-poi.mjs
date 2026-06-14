/* =====================================================================
   add-poi.mjs · POIs zur Harz-Karte hinzufügen
   ---------------------------------------------------------------------
   Aufruf:
     node add-poi.mjs <eingabe.json> [--dry-run]

   <eingabe.json> = ein POI-Objekt ODER ein Array von POI-Objekten.
   Pflichtfelder : name, cat, region, desc
   Optional      : lat, lng       (fehlen sie → Geocoding via OSM Nominatim)
                   query           (alternativer Geocoding-Text statt name)
                   mtb {typ,lift,detail}, confidence

   --dry-run = nur prüfen + geocoden + anzeigen, pois.js NICHT schreiben.

   Beispiel-Eingabe:
     [{ "name":"Brocken", "cat":"natur", "region":"Ostharz",
        "desc":"Höchster Berg des Harzes (1.141 m) ..." }]
   ===================================================================== */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POIS_FILE = path.join(__dirname, "pois.js");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ----------  Daten laden (IIFE setzt globalThis.HARZ_*)  ---------- */
await import(pathToFileURL(POIS_FILE).href);
const CATS = globalThis.HARZ_CATS;
const POIS = globalThis.HARZ_POIS;
if (!CATS || !POIS) {
  console.error("✗ Konnte pois.js nicht laden (HARZ_CATS / HARZ_POIS fehlen).");
  process.exit(1);
}
const VALID_CATS = Object.keys(CATS);

/* ----------  Hilfsfunktionen  ---------- */
function distanceKm(a, b) {
  const R = 6371, rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(s));
}

async function geocode(query) {
  const url = "https://nominatim.openstreetmap.org/search" +
    `?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "harz-karte-poi-script/1.0 (privates Projekt)" },
  });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const arr = await res.json();
  if (!arr.length) return null;
  const h = arr[0];
  return { lat: +(+h.lat).toFixed(5), lng: +(+h.lon).toFixed(5), display: h.display_name };
}

function findDuplicate(poi) {
  const byName = POIS.find((p) => p.name.toLowerCase() === poi.name.toLowerCase());
  if (byName) return { type: "Name", p: byName };
  if (poi.lat != null && poi.lng != null) {
    const near = POIS.find((p) => distanceKm(p, poi) < 0.15);
    if (near) return { type: "Nähe <150m", p: near };
  }
  return null;
}

function serialize(cats, pois) {
  return `/* =====================================================================
   HARZ-HIGHLIGHTS · DATEN  (AUTO-MANAGED durch add-poi.mjs)
   ---------------------------------------------------------------------
   Nicht von Hand bearbeiten – neue POIs über:
       node add-poi.mjs <eingabe.json>
   Browser → window.HARZ_*   ·   Node → globalThis.HARZ_*
   ===================================================================== */
(function (root) {
const HARZ_CATS = ${JSON.stringify(cats, null, 2)};
const HARZ_POIS = ${JSON.stringify(pois, null, 2)};
root.HARZ_CATS = HARZ_CATS;
root.HARZ_POIS = HARZ_POIS;
})(typeof window !== "undefined" ? window : globalThis);
`;
}

/* ----------  Argumente  ---------- */
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inputPath = args.find((a) => !a.startsWith("--"));
if (!inputPath) {
  console.error("Aufruf: node add-poi.mjs <eingabe.json> [--dry-run]");
  process.exit(1);
}

let input = JSON.parse(await readFile(inputPath, "utf8"));
if (!Array.isArray(input)) input = [input];

/* ----------  Verarbeiten  ---------- */
const toAdd = [];
const notes = [];

for (const raw of input) {
  const poi = { ...raw };
  let bad = false;

  for (const f of ["name", "cat", "region", "desc"]) {
    if (!poi[f]) { notes.push(`✗ "${poi.name || "?"}": Pflichtfeld '${f}' fehlt`); bad = true; }
  }
  if (poi.cat && !VALID_CATS.includes(poi.cat)) {
    notes.push(`✗ "${poi.name}": Kategorie '${poi.cat}' ungültig (erlaubt: ${VALID_CATS.join(", ")})`);
    bad = true;
  }
  if (bad) continue;

  if (poi.lat == null || poi.lng == null) {
    const query = poi.query || `${poi.name}, Harz, Deutschland`;
    await sleep(1100); // Nominatim: max. 1 Anfrage/Sekunde
    let g;
    try { g = await geocode(query); }
    catch (e) { notes.push(`✗ "${poi.name}": Geocoding-Fehler (${e.message})`); continue; }
    if (!g) { notes.push(`✗ "${poi.name}": kein Geocoding-Treffer für '${query}'`); continue; }
    poi.lat = g.lat; poi.lng = g.lng; poi._geo = g.display;
  }
  delete poi.query;

  const dup = findDuplicate(poi);
  if (dup) { notes.push(`⚠ "${poi.name}": mögliches Duplikat (${dup.type}) zu "${dup.p.name}" – übersprungen`); continue; }

  toAdd.push(poi);
}

/* ----------  Vorschau  ---------- */
console.log("\n=== Vorschau ===");
if (!toAdd.length) console.log("(keine gültigen neuen POIs)");
for (const p of toAdd) {
  const geo = p._geo ? `  ← OSM: ${p._geo}` : "  (Koordinaten vorgegeben)";
  console.log(`• ${p.name}  [${p.cat} / ${p.region}]  ${p.lat}, ${p.lng}${geo}`);
}
if (notes.length) { console.log("\n=== Hinweise ==="); notes.forEach((n) => console.log(n)); }

/* ----------  Schreiben  ---------- */
const clean = toAdd.map(({ _geo, ...p }) => p);

if (dryRun) {
  console.log(`\n[dry-run] ${clean.length} POI(s) würden hinzugefügt. pois.js bleibt unverändert.`);
  process.exit(0);
}
if (!clean.length) {
  console.log("\nNichts zu schreiben.");
  process.exit(notes.some((n) => n.startsWith("✗")) ? 1 : 0);
}

const next = [...POIS, ...clean];
await writeFile(POIS_FILE, serialize(CATS, next), "utf8");
console.log(`\n✓ ${clean.length} POI(s) hinzugefügt. Neue Gesamtzahl: ${next.length}.`);
console.log("→ Danach committen & deployen (git add/commit/push bzw. vercel deploy --prod).");
