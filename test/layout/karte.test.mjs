// Layout der Karte: kein horizontaler Überlauf von 360 bis 1440 px, Tippziele >= 44 px,
// und außer den Kartenkacheln geht keine Anfrage an fremde Server.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { starteServer, starteBrowser, sweep, bericht } from "./hilfe.mjs";

const KACHELN = ["tile.opentopomap.org", "server.arcgisonline.com", "basemaps.cartocdn.com"];

const srv = await starteServer();
const browser = await starteBrowser();
after(async () => { await browser.close(); await srv.stopp(); });

// Fremde Anfragen abbrechen und mitschreiben: der Test braucht kein Netz und sieht jeden Fremdzugriff.
async function neueSeite(optionen = {}, ansicht = "map") {
  const ctx = await browser.newContext(optionen);
  const fremd = [];
  await ctx.route("**/*", (r) => {
    const host = new URL(r.request().url()).hostname;
    if (host === "127.0.0.1") return r.continue();
    fremd.push(host);
    return r.abort();
  });
  // body hat overflow:hidden (App-Layout). Für die Messung aus, sonst gilt alles als abgeschnitten.
  // ansicht: unter 820 px ist nur Karte oder Liste sichtbar, beide müssen gemessen werden.
  await ctx.addInitScript((v) => addEventListener("DOMContentLoaded", () => {
    document.body.style.overflow = "visible";
    document.body.dataset.view = v;
  }), ansicht);
  return { ctx, page: await ctx.newPage(), fremd };
}

for (const ansicht of ["map", "list"]) {
  test(`kein horizontaler Überlauf von 360 bis 1440 px, Ansicht ${ansicht}`, async () => {
    const { ctx, page } = await neueSeite({}, ansicht);
    try {
      const befunde = await sweep(page, srv.basis + "/", { von: 360, bis: 1440, schritt: 8 });
      assert.equal(befunde.length, 0, "\n" + bericht(ansicht, befunde));
    } finally { await ctx.close(); }
  });
}

test("auf dem Handy sind alle sichtbaren Bedienelemente mindestens 44 px hoch", async () => {
  const { ctx, page } = await neueSeite({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  try {
    await page.goto(srv.basis + "/", { waitUntil: "load" });
    for (const ansicht of ["#tab-map", "#tab-list"]) {
      await page.click(ansicht);
      const zuKlein = await page.evaluate(() => [...document.querySelectorAll("button, .leaflet-bar a")]
        .filter((el) => el.offsetParent !== null)
        .map((el) => ({ was: el.id || el.className || el.textContent.trim(), h: el.getBoundingClientRect().height }))
        .filter((e) => e.h < 43.5));
      assert.deepEqual(zuKlein, [], `zu klein in ${ansicht}`);
    }
  } finally { await ctx.close(); }
});

test("fremde Anfragen gehen nur an die Kachelserver", async () => {
  const { ctx, page, fremd } = await neueSeite();
  try {
    await page.goto(srv.basis + "/", { waitUntil: "load" });
    for (const k of ["satellit", "strasse"]) await page.click(`.basemap button[data-key="${k}"]`);
    const unerwartet = [...new Set(fremd)].filter((h) => !KACHELN.some((k) => h.endsWith(k)));
    assert.deepEqual(unerwartet, []);
    assert.ok(fremd.length > 0, "keine Kachel angefragt: lädt die Karte überhaupt?");
  } finally { await ctx.close(); }
});

test("Klick auf einen Listeneintrag öffnet das Popup mit Routenlink", async () => {
  const { ctx, page } = await neueSeite({ viewport: { width: 1280, height: 900 } });
  try {
    await page.goto(srv.basis + "/", { waitUntil: "load" });
    await page.click(".poi-card >> nth=0");
    await page.waitForSelector(".leaflet-popup .pop-title");
    const route = await page.getAttribute(".leaflet-popup .pop-actions a", "href");
    assert.match(route, /^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=5\d\.\d+,1\d\.\d+$/);
  } finally { await ctx.close(); }
});
