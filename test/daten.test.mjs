// Daten in public/pois.js: Schema, eindeutige Namen, lesbare Pin-Farben.
import { test } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { fehler } from "../poi-schema.mjs";

await import(pathToFileURL("public/pois.js").href);
const CATS = globalThis.HARZ_CATS;
const POIS = globalThis.HARZ_POIS;

test("jeder POI erfüllt das Schema", () => {
  assert.deepEqual(POIS.flatMap((p) => fehler(p, CATS)), []);
});

test("Namen sind eindeutig, weil --update darüber abgleicht", () => {
  const namen = POIS.map((p) => p.name.toLowerCase());
  assert.deepEqual(namen.filter((n, i) => namen.indexOf(n) !== i), []);
});

test("das Schema lehnt typische Fehler ab", () => {
  const ok = { name: "X", cat: "natur", region: "Westharz", desc: "d", lat: 51.8, lng: 10.6 };
  assert.deepEqual(fehler(ok, CATS), []);
  assert.equal(fehler({ ...ok, lat: 48.1 }, CATS).length, 1);
  assert.equal(fehler({ ...ok, web: "http://unsicher.de" }, CATS).length, 1);
  assert.equal(fehler({ ...ok, kinder: "vielleicht", quellen: ["https://a.de"], konfidenz: "Hoch" }, CATS).length, 1);
  assert.equal(fehler({ ...ok, dauer: "2 h" }, CATS).length, 1, "Angabe ohne Beleg");
  assert.equal(fehler({ ...ok, dauerr: "2 h" }, CATS).length, 1, "Tippfehler im Feldnamen");
});

// WCAG: weiße Ziffer auf farbigem Pin braucht mindestens 4,5:1.
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
test("weiße Schrift auf jeder Kategoriefarbe hat Kontrast >= 4,5", () => {
  for (const [k, c] of Object.entries(CATS)) {
    const kontrast = 1.05 / (lum(c.color) + 0.05);
    assert.ok(kontrast >= 4.5, `${k} ${c.color}: ${kontrast.toFixed(2)}`);
  }
});
