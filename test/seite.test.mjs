// Die Seite lädt Code und Schriften nur von hier. Fremd sind allein die Kartenkacheln.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("public/index.html", "utf8");

test("keine Google-Fonts, kein unpkg, kein CDN", () => {
  for (const fremd of ["googleapis", "gstatic", "unpkg", "jsdelivr", "cdnjs"]) {
    assert.ok(!html.includes(fremd), `index.html verweist auf ${fremd}`);
  }
});

test("jede lokale Datei, auf die die Seite verweist, existiert", () => {
  const pfade = [...html.matchAll(/(?:src|href)="([^"#:$]+)"|url\('([^')]+)'\)/g)].map((m) => m[1] || m[2]);
  assert.ok(pfade.length >= 7, `nur ${pfade.length} lokale Verweise gefunden`);
  for (const p of pfade) assert.ok(existsSync(`public/${p}`), `fehlt: public/${p}`);
});

test("Impressum und Datenschutz sind verlinkt", () => {
  assert.match(html, /href="https:\/\/cbb-digital\.com\/impressum\.html"/);
  assert.match(html, /href="https:\/\/cbb-digital\.com\/datenschutz\.html"/);
});
