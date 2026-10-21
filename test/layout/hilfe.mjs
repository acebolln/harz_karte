// Kopie aus acebolln/cbb-digital-website test/layout/hilfe.mjs (21.10.2026). Änderungen dort zuerst.
// Werkzeug fuer die Umbruch-Tests: statischer Server, Browser, Messung.
//
// Warum ueberhaupt ein Browser: Der Fehler, den diese Tests verhindern sollen,
// entsteht aus dem min-content einer Grid-Spalte. Den kann nur eine echte
// Layout-Engine berechnen — mit Textparsing ist er nicht zu finden.
import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { join, extname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// fileURLToPath, nicht .pathname — sonst bleiben Leerzeichen im Pfad als %20 stehen.
const WURZEL = fileURLToPath(new URL("../../public/", import.meta.url));

const TYPEN = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".mjs": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
};

/** Startet einen statischen Server auf einem freien Port. */
export async function starteServer(wurzel = WURZEL) {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (p.endsWith("/")) p += "index.html";
    try {
      const daten = await readFile(join(wurzel, p));
      res.writeHead(200, { "Content-Type": TYPEN[extname(p)] || "application/octet-stream" });
      res.end(daten);
    } catch {
      res.writeHead(404).end("nicht gefunden");
    }
  });
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const port = server.address().port;
  return { port, basis: `http://127.0.0.1:${port}`, stopp: () => new Promise((ok) => server.close(ok)) };
}

/**
 * Alle HTML-Seiten unter public/ als URL-Pfade.
 * Bewusst dynamisch: eine neue Seite ist damit automatisch mitgetestet,
 * ohne dass jemand diese Liste pflegen muss.
 */
export async function seitenFinden(wurzel = WURZEL) {
  const raus = [];
  async function lauf(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const vollstaendig = join(dir, e.name);
      if (e.isDirectory()) await lauf(vollstaendig);
      else if (e.name.endsWith(".html")) {
        const rel = relative(wurzel, vollstaendig).split(sep).join("/");
        raus.push("/" + rel.replace(/(^|\/)index\.html$/, "$1"));
      }
    }
  }
  await lauf(wurzel);
  return raus.sort();
}

export async function starteBrowser() {
  try {
    return await chromium.launch();
  } catch (e) {
    throw new Error(
      "Chromium liess sich nicht starten. Einmalig nachinstallieren:\n" +
      "    npx playwright install chromium\n" +
      "Urspruenglicher Fehler: " + e.message
    );
  }
}

/**
 * Im Browser ausgefuehrt. Liefert Ueberlauf-Befunde fuer die aktuelle Breite.
 *
 * Zwei Dinge werden bewusst NICHT als Verstoss gezaehlt:
 *   - `position:fixed` — das Leiterbahn-Motiv ragt an jeder Breite ueber den
 *     rechten Rand und erzeugt keinen Seitenueberlauf. Steht so im Journal
 *     2026-07-27 und ist Absicht, kein Fehler.
 *   - Elemente unter einem clippenden oder scrollenden Vorfahren — was
 *     abgeschnitten wird, ist optisch nicht draussen.
 */
export const MESSUNG = () => {
  const de = document.documentElement;
  const grenze = de.clientWidth;
  const tol = 1.5; // Subpixel-Rundung von Chromium

  const geclippt = (el) => {
    for (let p = el.parentElement; p && p !== de; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (/hidden|clip|auto|scroll/.test(s.overflowX + s.overflowY)) return true;
    }
    return false;
  };

  const taeter = [];
  for (const el of de.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (s.position === "fixed" || s.display === "none" || s.visibility === "hidden") continue;
    const b = el.getBoundingClientRect();
    if (b.width === 0 && b.height === 0) continue;
    const raus = Math.max(b.right - grenze, -b.left);
    if (raus > tol && !geclippt(el)) {
      taeter.push({
        raus: Math.round(raus * 10) / 10,
        was: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).join(".") : ""),
      });
    }
  }
  taeter.sort((a, b) => b.raus - a.raus);

  return {
    seitenUeberlauf: Math.round(Math.max(0, de.scrollWidth - grenze) * 10) / 10,
    taeter: taeter.slice(0, 5),
  };
};

/** Zeilenhoehen-Verhaeltnisse (§6.4) fuer Fliesstext und Ueberschriften. */
export const ZEILENHOEHEN = () => {
  const werte = { text: [], headline: [] };
  for (const el of document.querySelectorAll("p, li, h1, h2, h3")) {
    const s = getComputedStyle(el);
    if (s.display === "none" || !el.textContent.trim()) continue;
    const fs = parseFloat(s.fontSize);
    const lh = s.lineHeight === "normal" ? fs * 1.2 : parseFloat(s.lineHeight);
    if (!fs || !lh) continue;
    const eintrag = {
      verhaeltnis: Math.round((lh / fs) * 100) / 100,
      was: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/)[0] : ""),
      px: Math.round(fs * 10) / 10,
    };
    (/^h/.test(el.tagName.toLowerCase()) ? werte.headline : werte.text).push(eintrag);
  }
  return werte;
};

/**
 * Faehrt eine Seite ueber einen Breitenbereich und sammelt die Befunde.
 *
 * Ohne Reload je Breite: Das Layout haengt hier nur an CSS, nicht an
 * JavaScript, das beim Laden Groessen einfriert. Nachgeprueft — der Sweep
 * findet den bekannten 721-856px-Fehler auch ohne Reload.
 */
export async function sweep(page, url, { von = 360, bis = 1440, schritt = 4 } = {}) {
  await page.setViewportSize({ width: von, height: 900 });
  await page.goto(url, { waitUntil: "load" });
  // Reveal-Animationen aufheben, sonst ist alles opacity:0 und nichts messbar.
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in"));
    document.documentElement.style.scrollBehavior = "auto";
  });

  const befunde = [];
  for (let w = von; w <= bis; w += schritt) {
    await page.setViewportSize({ width: w, height: 900 });
    const r = await page.evaluate(MESSUNG);
    if (r.seitenUeberlauf > 1.5 || r.taeter.length) befunde.push({ breite: w, ...r });
  }
  return befunde;
}

/** Befunde zu einer lesbaren Fehlermeldung verdichten. */
export function bericht(seite, befunde) {
  if (!befunde.length) return "";
  const breiten = befunde.map((b) => b.breite);
  const schlimmster = befunde.reduce((a, b) => (b.seitenUeberlauf > a.seitenUeberlauf ? b : a));
  const zeilen = befunde.slice(0, 4).map(
    (b) => `      ${b.breite}px: Seite +${b.seitenUeberlauf}px` +
      (b.taeter.length ? `, groesster Ausbrecher ${b.taeter[0].was} +${b.taeter[0].raus}px` : "")
  );
  return `${seite} laeuft bei ${breiten.length} Breiten ueber ` +
    `(${Math.min(...breiten)}-${Math.max(...breiten)}px, max +${schlimmster.seitenUeberlauf}px bei ${schlimmster.breite}px)\n` +
    zeilen.join("\n");
}
