/* =====================================================================
   poi-schema.mjs · Regeln für einen POI in public/pois.js
   ---------------------------------------------------------------------
   Genutzt von add-poi.mjs (vor dem Schreiben) und test/daten.test.mjs.
   fehler(poi, cats) liefert eine Liste lesbarer Fehler, leer = gültig.
   ===================================================================== */

// Grob der Harz mit Vorland. Ein Geocoding-Treffer außerhalb ist fast sicher falsch.
export const HARZ = { latMin: 51.2, latMax: 52.2, lngMin: 9.8, lngMax: 11.8 };

// Praktische Angaben, die add-poi.mjs --update nachträgt.
export const INFO_FELDER = ["web", "parken", "dauer", "kinder", "kinderHinweis", "quellen", "konfidenz"];
export const KINDER = ["ja", "bedingt", "nein"];
export const KONFIDENZ = ["Hoch", "Mittel", "Niedrig"];
const MTB_KONFIDENZ = ["HIGH", "MED-HIGH", "MED", "LOW"];
const ERLAUBT = new Set(["name", "lat", "lng", "cat", "region", "desc", "mtb", "confidence", ...INFO_FELDER]);

const text = (v) => typeof v === "string" && v.trim().length > 0;
const https = (v) => typeof v === "string" && /^https:\/\/[^\s"'<>]+$/.test(v);

export function fehler(poi, cats) {
  const f = [];
  const n = poi.name || "?";
  for (const k of Object.keys(poi)) if (!ERLAUBT.has(k)) f.push(`"${n}": unbekanntes Feld '${k}'`);
  for (const k of ["name", "cat", "region", "desc"]) if (!text(poi[k])) f.push(`"${n}": Pflichtfeld '${k}' fehlt`);
  if (poi.cat && !cats[poi.cat]) f.push(`"${n}": Kategorie '${poi.cat}' ungültig`);
  if (!(poi.lat >= HARZ.latMin && poi.lat <= HARZ.latMax && poi.lng >= HARZ.lngMin && poi.lng <= HARZ.lngMax)) {
    f.push(`"${n}": Koordinaten ${poi.lat}, ${poi.lng} liegen nicht im Harz`);
  }
  if (poi.mtb && !["typ", "lift"].every((k) => text(poi.mtb[k]))) f.push(`"${n}": mtb braucht typ und lift`);
  if (poi.confidence != null && !MTB_KONFIDENZ.includes(poi.confidence)) f.push(`"${n}": confidence '${poi.confidence}' ungültig`);

  if (poi.web != null && !https(poi.web)) f.push(`"${n}": web ist keine https-Adresse`);
  for (const k of ["parken", "dauer", "kinderHinweis"]) if (poi[k] != null && !text(poi[k])) f.push(`"${n}": '${k}' ist leer`);
  if (poi.kinder != null && !KINDER.includes(poi.kinder)) f.push(`"${n}": kinder '${poi.kinder}' ungültig (${KINDER.join(", ")})`);
  if (poi.konfidenz != null && !KONFIDENZ.includes(poi.konfidenz)) f.push(`"${n}": konfidenz '${poi.konfidenz}' ungültig`);
  if (poi.quellen != null && !(Array.isArray(poi.quellen) && poi.quellen.length && poi.quellen.every(https))) {
    f.push(`"${n}": quellen muss eine Liste von https-Adressen sein`);
  }
  // Praktische Angaben ohne Beleg sind wertlos: wer sie setzt, nennt Quellen und Konfidenz.
  if (["parken", "dauer", "kinder"].some((k) => poi[k] != null) && !(poi.quellen && poi.konfidenz)) {
    f.push(`"${n}": praktische Angaben ohne quellen oder konfidenz`);
  }
  return f;
}
