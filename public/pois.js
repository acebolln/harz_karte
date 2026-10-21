/* =====================================================================
   HARZ-HIGHLIGHTS · DATEN  (AUTO-MANAGED durch add-poi.mjs)
   ---------------------------------------------------------------------
   Nicht von Hand bearbeiten – neue POIs über:
       node add-poi.mjs <eingabe.json>
   Browser → window.HARZ_*   ·   Node → globalThis.HARZ_*
   ===================================================================== */
(function (root) {
const HARZ_CATS = {
  "natur": {
    "label": "Natur & Aussicht",
    "color": "#277a4d"
  },
  "hoehle": {
    "label": "Höhlen",
    "color": "#8f6328"
  },
  "kultur": {
    "label": "Kultur & Bauwerke",
    "color": "#4a6fa5"
  },
  "erlebnis": {
    "label": "Erlebnis & Action",
    "color": "#c2501f"
  },
  "mtb": {
    "label": "MTB & Trails",
    "color": "#7a3ea8"
  }
};
const HARZ_POIS = [
  {
    "name": "Magische Rhumequelle",
    "lat": 51.589656,
    "lng": 10.310175,
    "cat": "natur",
    "region": "Südharz",
    "desc": "Mystischer Ort bei Rhumspringe. Mit bis zu 5000 Litern pro Sekunde eine der stärksten Karstquellen Deutschlands. Das Wasser schimmert oft türkis.",
    "web": "https://www.rhumspringe.de/portal/seiten/die-rhumequelle-900000162-25560.html",
    "parken": "Parkplatz an der L 530, von dort gut 100 m Fußweg zur Quelle",
    "dauer": "ca. 15–30 Min.",
    "kinder": "ja",
    "kinderHinweis": "Kurzer, ebener Fußweg und kleiner Rundweg um den Quelltopf",
    "quellen": [
      "https://www.rhumspringe.de/portal/seiten/die-rhumequelle-900000162-25560.html",
      "https://de.wikipedia.org/wiki/Rhumequelle",
      "https://tourispo.de/sehenswuerdigkeit/rhumequelle-in-rhumspringe.html"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Rappbodetalsperre & Titan-RT",
    "lat": 51.741,
    "lng": 10.893,
    "cat": "erlebnis",
    "region": "Ostharz",
    "desc": "Höchste Staumauer und die drittlängste Hängeseilbrücke (485,5 m) Deutschlands. Extra: GigaSwing in 64m Tiefe oder Aussichtspunkt Rotestein.",
    "web": "https://harzdrenalin.de/abenteuer/titan-rt/",
    "parken": "Hauptparkplatz „Rappbodetalsperre“ an der L 96, Ticketcenter am Parkplatz",
    "dauer": "1–2 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Kinderwagen nur nach Anmeldung im Ticketcenter (Rolli-Ticket); unter 14 nur mit Erwachsenen",
    "quellen": [
      "https://harzdrenalin.de/abenteuer/titan-rt/",
      "https://harzdrenalin.de/abenteuer/gigaswing/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Stabkirche Hahnenklee",
    "lat": 51.8569,
    "lng": 10.34,
    "cat": "kultur",
    "region": "Westharz",
    "desc": "Die Gustav-Adolf-Stabkirche von 1907. Typisch norwegische Bauweise im Goslarer Stadtteil Hahnenklee. Duftet innen herrlich nach Holz.",
    "web": "https://www.stabkirche.de/",
    "dauer": "ca. 45 Min.",
    "kinder": "ja",
    "kinderHinweis": "Kurzer Besuch; Kirche täglich geöffnet (Mo–Sa 10:30–17 Uhr, So 12–17 Uhr)",
    "quellen": [
      "https://www.stabkirche.de/"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Baumwipfelpfad Harz",
    "lat": 51.87,
    "lng": 10.5632,
    "cat": "erlebnis",
    "region": "Westharz",
    "desc": "Ein 1000 Meter langer Pfad in Bad Harzburg in bis zu 30 Metern Höhe. Bietet 18 Plattformen und schöne Natur-Ausblicke.",
    "parken": "Gebührenpflichtiger Parkplatz an der Tourist-Info (Nordhäuser Str. 4)",
    "dauer": "1–2 Std.",
    "kinder": "ja",
    "kinderHinweis": "Barrierefrei, max. 5,8 % Steigung; nur oberste Turmplattform über Treppe",
    "quellen": [
      "https://tourispo.de/attraktion/baumwipfelpfad-harz.html",
      "https://www.ich-geh-wandern.de/baumwipfelpfad-und-baumschwebebahn-harz-bad-harzburg"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Wolfswarte auf dem Bruchberg",
    "lat": 51.7836,
    "lng": 10.5,
    "cat": "natur",
    "region": "Westharz",
    "desc": "Die waldlose Kuppe aus Quarzit auf dem zweithöchsten Berg Niedersachsens (Bruchberg). Bietet bei gutem Wetter atemberaubende Ausblicke.",
    "web": "https://www.harzer-wandernadel.de/en/stamping-points/overview-map/stamping-point-135-wolfswarte-nph/",
    "parken": "Kleiner Wanderparkplatz an der L 504 zwischen Torfhaus und Altenau",
    "dauer": "ca. 1,5 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Steiniger, oft nasser Pfad – kein Kinderwagen, nur mit Trage",
    "quellen": [
      "https://www.harzer-wandernadel.de/en/stamping-points/overview-map/stamping-point-135-wolfswarte-nph/",
      "https://bergsteiger.de/touren/wandern/wandern-harz-wolfswarte-von-der-landesstrasse",
      "https://www.ich-geh-wandern.de/rundwanderung-von-altenau-ueber-torfhaus-zur-wolfswarte"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Das Kleinste Haus in Wernigerode",
    "lat": 51.8329,
    "lng": 10.7873,
    "cat": "kultur",
    "region": "Ostharz",
    "desc": "Nur 2,95m breit und 4,20m hoch, mit einer 1,70m hohen Tür. Zwischen Baulücken errichtet, diente es einst als Wohnung für bis zu 11 Personen.",
    "web": "https://www.wernigerode-tourismus.de/poi/museum-kleinstes-haus",
    "dauer": "ca. 15–30 Min.",
    "kinder": "bedingt",
    "kinderHinweis": "Sehr steile, enge Treppe im Haus; Kinderwagen draußen lassen",
    "quellen": [
      "https://www.wernigerode-tourismus.de/poi/museum-kleinstes-haus"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Burg Falkenstein",
    "lat": 51.6816,
    "lng": 11.265,
    "cat": "kultur",
    "region": "Ostharz",
    "desc": "Im 12. Jahrhundert erbaut, erhebt sich die Burg majestätisch über der Selke. Gilt als am besten erhaltene Burg im Harz mit tollem Panorama.",
    "web": "https://www.burg-falkenstein.de/",
    "parken": "Parkplatz „Gartenhaus“, 3,00 €/Tag; 1,9 km Fußweg oder Kleinbahn/Burgtaxi",
    "dauer": "2–3 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Kinderwagen auf Kopfsteinpflaster bis Burghof; Ausstellung nur über Treppen",
    "quellen": [
      "https://www.burg-falkenstein.de/ihr-besuch/fragen-antworten/",
      "https://www.burg-falkenstein.de/ihr-besuch/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Einhornhöhle",
    "lat": 51.635,
    "lng": 10.4042,
    "cat": "hoehle",
    "region": "Südharz",
    "desc": "Größte begehbare Höhle im Westharz bei Scharzfeld. Die einst dort gefundenen Knochen hielt man früher für Überreste von Einhörnern (waren aber Höhlenbären).",
    "web": "https://www.einhornhoehle.de/",
    "parken": "Kostenloser Waldparkplatz ca. 250 m vor der Höhle (Navi: „Im Rott“)",
    "dauer": "ca. 1 Std.",
    "kinder": "ja",
    "kinderHinweis": "Höhle mit Kinderwagen befahrbar; Kinder 3–5 J. 3,00 €",
    "quellen": [
      "https://www.einhornhoehle.de/besucherinfo.html",
      "https://www.einhornhoehle.de/die-hoehle-01.html"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Steinkirche bei Scharzfeld",
    "lat": 51.6335,
    "lng": 10.3777,
    "cat": "hoehle",
    "region": "Südharz",
    "desc": "Rundbogige Felsenhöhle, die schon in der Steinzeit genutzt wurde. Im Mittelalter diente sie als Kirche (Kanzel und Altar aus Stein noch sichtbar).",
    "parken": "Wanderparkplatz Steinkirche unter der Mönchtalbrücke (B 27/B 243)",
    "dauer": "ca. 30 Min.",
    "kinder": "bedingt",
    "kinderHinweis": "Ausgeschilderter Fußweg bergauf; Eignung für Kinderwagen nicht belegt",
    "quellen": [
      "https://maps.adac.de/poi/steinkirche-scharzfeld-herzberg-am-harz",
      "https://www.ich-geh-wandern.de/wanderung-durch-die-scharzfelder-dolomiten",
      "https://de.wikipedia.org/wiki/Steinkirche_Scharzfeld"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Höhlenwohnungen von Langenstein",
    "lat": 51.8519,
    "lng": 10.9898,
    "cat": "kultur",
    "region": "Ostharz",
    "desc": "Wie bei den Hobbits: Per Hand in den Fels geschlagene Wohnungen, in denen bis vor 100 Jahren noch Menschen (Troglodyten) lebten.",
    "dauer": "ca. 1 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Besuch per Führung; Angaben zu Kinderwagen fehlen",
    "quellen": [
      "https://entdecke-deutschland.de/en/bundeslaender/sachsen-anhalt/the-hobbit-caves-of-langenstein/",
      "https://www.showcaves.com/english/de/subterranea/Langenstein.html"
    ],
    "konfidenz": "Niedrig"
  },
  {
    "name": "Blaue Kirche von Clausthal",
    "lat": 51.804,
    "lng": 10.334,
    "cat": "kultur",
    "region": "Westharz",
    "desc": "Größte Holzkirche Deutschlands (Heilig-Geist-Kirche). Seit 2013 erstrahlt sie wieder in ihrem ursprünglichen, markanten Kobaltblau.",
    "dauer": "ca. 30 Min.",
    "kinder": "ja",
    "kinderHinweis": "Kurzer Kirchenbesuch, kein Weg im Gelände",
    "quellen": [
      "https://www.evangelisch.de/inhalte/88598/22-09-2013",
      "https://www.travelbook.de/attraktionen/im-harz-steht-die-groesste-holzkirche-deutschlands"
    ],
    "konfidenz": "Niedrig"
  },
  {
    "name": "Hexentanzplatz in Thale",
    "lat": 51.7333,
    "lng": 11.0244,
    "cat": "erlebnis",
    "region": "Ostharz",
    "desc": "Mystisches Plateau über dem Bodetal. Schauplatz der Walpurgisnacht. Mit Bobbahn, Bergtheater und erreichbar per Bodetal-Seilbahn.",
    "web": "https://www.bodetal.de/urlaub-im-bodetal/ausflugsziele/hexentanzplatz",
    "parken": "Großparkplatz Bodetal (Parkstraße 1a, Thale) an der Talstation, 3 €/Tag",
    "dauer": "2–4 Std.",
    "kinder": "ja",
    "kinderHinweis": "Kinderwagen fährt in der Kabinenbahn mit (1,50 €); Harzbob ab 3 J. mit Begleitung ab 12",
    "quellen": [
      "https://www.bodetal.de/urlaub-im-bodetal/ausflugsziele/hexentanzplatz",
      "https://www.seilbahnen-thale.de/service/preise",
      "https://www.seilbahnen-thale.de/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Wurmberg",
    "lat": 51.7277,
    "lng": 10.6172,
    "cat": "erlebnis",
    "region": "Westharz",
    "desc": "Höchster Berg Niedersachsens bei Braunlage. Beliebtes Skigebiet und im Sommer ideal für rasante Fahrten mit dem Monsterroller oder Seilbahn.",
    "web": "https://www.braunlage.de/poi/wurmbergseilbahn",
    "parken": "Großparkplatz an der Talstation der Wurmbergseilbahn (Am Amtsweg 5)",
    "dauer": "2–4 Std.",
    "kinder": "ja",
    "kinderHinweis": "Seilbahn nimmt Kinderwagen mit; Spielplätze und Tiergehege am Gipfel. Monsterroller erst ab 10 Jahren.",
    "quellen": [
      "https://www.braunlage.de/poi/wurmbergseilbahn",
      "https://www.braunlage.de/poi/monsterroller"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Weltkulturerbe Rammelsberg",
    "lat": 51.89,
    "lng": 10.4183,
    "cat": "kultur",
    "region": "Westharz",
    "desc": "Ehemaliges Erzbergwerk in Goslar, das heute als faszinierendes Museum Einblicke in über 1000 Jahre Bergbaugeschichte bietet (UNESCO-Welterbe).",
    "web": "https://www.rammelsberg.de/",
    "parken": "Besucherparkplatz direkt an der Anlage (Bergtal 19, Goslar)",
    "dauer": "3–4 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Familienführung ca. 1,5 Std.; Angaben zu Kinderwagen unter Tage fehlen.",
    "quellen": [
      "https://www.rammelsberg.de/service/anfahrt-parken",
      "https://www.rammelsberg.de/fuehrungen/schulklassen-kindergruppen/familienfuehrungen",
      "https://www.rammelsberg.de/"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Iberger Tropfsteinhöhle",
    "lat": 51.8157,
    "lng": 10.252,
    "cat": "hoehle",
    "region": "Westharz",
    "desc": "HöhlenErlebnisZentrum bei Bad Grund. Erforsche faszinierende Tropfsteine und spannende archäologische Funde aus der Bronzezeit.",
    "web": "https://www.hoehlen-erlebnis-zentrum.de/",
    "parken": "Parkplatz direkt am Museum; Ausweichparkplatz am Sportplatz Bad Grund",
    "dauer": "1–2 Std. (Höhlenführung ca. 30 Min.)",
    "kinder": "bedingt",
    "kinderHinweis": "Höhle erst ab 4 Jahren; die Ausstellungen gehen auch mit Dreijährigem.",
    "quellen": [
      "https://www.hoehlen-erlebnis-zentrum.de/",
      "https://www.hoehlen-erlebnis-zentrum.de/hoehlenerlebniszentrum/anfahrt-anreise-pkw/nahverkehr-%C3%B6pnv-seesen-osterode-goslar-clausthal/",
      "https://www.hoehlen-erlebnis-zentrum.de/hoehlenerlebniszentrum/angebote-fuer-kinder-familien/familienausflug-harz/"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Kloster Walkenried",
    "lat": 51.5828,
    "lng": 10.619,
    "cat": "kultur",
    "region": "Südharz",
    "desc": "Eindrucksvolles ehemaliges Zisterzienserkloster. Beherbergt eines der größten und innovativsten Klostermuseen Europas (UNESCO-Welterbe).",
    "web": "https://www.kloster-walkenried.de/",
    "parken": "Großer Besucherparkplatz direkt am Kloster, mit E-Ladesäule",
    "dauer": "1,5–2 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Kinderwagen bleibt am Besucherservice; Obergeschoss nur über Treppen. Kinder bis 6 frei.",
    "quellen": [
      "https://www.kloster-walkenried.de/de/besuch/anfahrt",
      "https://www.kloster-walkenried.de/de/besuch/wichtige-hinweise-und-besucherordnung",
      "https://www.kloster-walkenried.de/de/besuch/oeffnungszeiten-und-preise"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Josephskreuz",
    "lat": 51.5806,
    "lng": 10.9361,
    "cat": "natur",
    "region": "Südharz",
    "desc": "Das größte eiserne Doppelkreuz der Welt auf dem Großen Auerberg bei Stolberg. Die Aussichtsplattform bietet eine herrliche Fernsicht.",
    "web": "https://www.harzinfo.de/erlebnisse/poi/josephskreuz-auf-dem-grossen-auerberg",
    "parken": "Parkplatz Auerberg zwischen L235 und L236, dann ca. 1,1 km bergauf",
    "dauer": "1,5–2 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Spielplatz am Kreuz; Plattform nur über mehr als 200 Stufen, Zuweg bergauf.",
    "quellen": [
      "https://www.harzinfo.de/erlebnisse/poi/josephskreuz-auf-dem-grossen-auerberg",
      "https://www.ich-geh-wandern.de/hoehen-und-tiefen-josephskreuz-und-kiliansteich-im-harz"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Europa-Rosarium",
    "lat": 51.4748,
    "lng": 11.3108,
    "cat": "natur",
    "region": "Südharz",
    "desc": "Die größte Rosensammlung der Welt in Sangerhausen. Erlebe rund 8.600 verschiedene Rosenarten auf einem 13 Hektar großen Parkgelände.",
    "web": "https://www.europa-rosarium.de/de/",
    "parken": "Parkplatz Sotterhäuser Weg, Sangerhausen (Navi-Adresse)",
    "dauer": "2–3 Std.",
    "kinder": "ja",
    "kinderHinweis": "Hauptwege barrierefrei; Erlebnisspielplatz in der Parkmitte.",
    "quellen": [
      "https://www.europa-rosarium.de/de/besucher-service/anreisetipps",
      "https://www.europa-rosarium.de/de/besucher-service/barrierefreiheit",
      "https://www.europa-rosarium.de/de/unser-rosarium/spiel-und-spass"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Kyffhäuser-Denkmal",
    "lat": 51.4131,
    "lng": 11.1098,
    "cat": "kultur",
    "region": "Südharz",
    "desc": "Monumentales Denkmal zu Ehren von Kaiser Wilhelm I. und Kaiser Barbarossa südlich des Harzes. Bietet einen grandiosen Ausblick.",
    "web": "https://www.kyffhaeuser-denkmal.de/",
    "parken": "Parkplatz am Fuß des Denkmals, dann 10–15 Min. Fußweg",
    "dauer": "2–3 Std.",
    "kinder": "bedingt",
    "kinderHinweis": "Mit Kinderwagen bis zum Denkmal, letztes Stück steil; Türme nur über Treppen.",
    "quellen": [
      "https://www.kyffhaeuser-denkmal.de/unser-service/faq/",
      "https://www.kyffhaeuser-denkmal.de/unser-service/barrierefreiheit-vor-ort/"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Barbarossahöhle",
    "lat": 51.3756,
    "lng": 11.0375,
    "cat": "hoehle",
    "region": "Südharz",
    "desc": "Eine von weltweit nur sehr wenigen Schauhöhlen im Anhydritgestein. Mit weitläufigen unterirdischen Seen und bizarren Gesteinsschichten.",
    "web": "https://barbarossahoehle.de/",
    "dauer": "1,5–2 Std. (Führung 50–60 Min.)",
    "kinder": "ja",
    "kinderHinweis": "Unter 3 Jahren frei; 58 Stufen, 9 °C in der Höhle. Spielplatz im GeoErlebnisland.",
    "quellen": [
      "https://barbarossahoehle.de/besucherinformationen/",
      "https://barbarossahoehle.de/erlebnisbereiche/3-geoerlebnisland/"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Bikepark Hahnenklee · Bocksberg",
    "lat": 51.85713,
    "lng": 10.35199,
    "cat": "mtb",
    "region": "Westharz",
    "desc": "Liftgestützter Bikepark am Bocksberg, ~25 km nördlich. Sessellift transportiert Bike + Fahrer.",
    "mtb": {
      "typ": "Bikepark",
      "lift": "Sessellift Bocksberg-Seilbahn",
      "detail": "8 Hauptstrecken blau→schwarz: Böckchen & Wilder Drache (flowig/Freeride), Sprungbock (Jumpline), Bock auf Wurzeln (Roots), Wilder Bock (steiler DH, keine Umfahrung) + Northshore-Line. Saison ~Ende April–Anfang November, Tagesticket ~30 €."
    },
    "confidence": "HIGH",
    "web": "https://www.bikepark-hahnenklee.de/",
    "parken": "Kostenloser Parkplatz am Sessellift (An den Teichwiesen, Hahnenklee)",
    "dauer": "halber bis ganzer Tag",
    "kinder": "ja",
    "kinderHinweis": "Nicht zum Fahren, aber Sommerrodelbahn ab 3 Jahren mit Erwachsenem und Spaßpark mit Spielplatz.",
    "quellen": [
      "https://www.bikepark-hahnenklee.de/",
      "https://www.erlebnisbocksberg.de/service-kontakt/so-finden-sie-zu-uns/",
      "https://www.erlebnisbocksberg.de/sommersaison/sommerrodelbahn/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Bikepark Braunlage · Wurmberg",
    "lat": 51.7195,
    "lng": 10.6065,
    "cat": "mtb",
    "region": "Westharz",
    "desc": "Bikepark an der Wurmberg-Seilbahn (~22 km östlich). Längste Abfahrten im Harz, ~400 Hm am Stück.",
    "mtb": {
      "typ": "Bikepark",
      "lift": "Wurmbergseilbahn (2.800 m, längste Seilbahn Norddeutschlands)",
      "detail": "4 Hauptlinien: Freeride (rot, ~3,4 km, Holz/Sprünge/Anlieger), Snakebite (mittel, Steinfelder), Enduro (Wurzel-Singletrail), Evil Rocks (schwer, extrem verblockt, Drops). DH-Linie bis ~4,4 km. Saison Mai–Oktober, Tageskarte 45 €. Vor Anfahrt Streckenfreigabe prüfen."
    },
    "confidence": "HIGH",
    "web": "https://www.braunlage.de/poi/bikepark-braunlage",
    "parken": "Großparkplatz an der Talstation der Wurmbergseilbahn",
    "dauer": "halber bis ganzer Tag",
    "kinder": "bedingt",
    "kinderHinweis": "Bikepark nichts für Kleinkinder; Seilbahn nimmt Kinderwagen mit, Spielplätze am Gipfel.",
    "quellen": [
      "https://www.braunlage.de/poi/bikepark-braunlage",
      "https://www.braunlage.de/poi/monsterroller",
      "https://www.braunlage.de/poi/wurmbergseilbahn"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Bikepark St. Andreasberg · MSB-X-Trail",
    "lat": 51.7095,
    "lng": 10.5285,
    "cat": "mtb",
    "region": "Westharz",
    "desc": "Naturbelassener Bikepark am Matthias-Schmidt-Berg, nur ~14 km von Scharzfeld – der nächste Lift-Park.",
    "mtb": {
      "typ": "Bikepark",
      "lift": "Sessellift Albert-Lift",
      "detail": "6 Strecken / ~12 km: Flowtrail (blau, Anlieger/Wellen), MSB-X-2 & X-3 (Singletrails), Jumpline (Tables/Doubles), Northshore/Hexentreppe (rot), Enduro/Stollentour (~4 km) + Schwarze Sechs (DH). Sehr einsteiger- und fortgeschrittenenfreundlich, kurze Liftwartezeiten."
    },
    "confidence": "HIGH",
    "web": "https://www.bikepark-andreasberg.de/",
    "dauer": "halber bis ganzer Tag",
    "kinder": "bedingt",
    "kinderHinweis": "Kids-Trail erst ab ca. 5 Jahren; Sommerrodelbahn gemeinsam mit Erwachsenem möglich.",
    "quellen": [
      "https://www.bikepark-andreasberg.de/",
      "https://www.bikepark-andreasberg.de/trails",
      "https://www.alberti-lift.de/index.php/main-soro"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Racepark Schulenberg",
    "lat": 51.8155,
    "lng": 10.436,
    "cat": "mtb",
    "region": "Westharz",
    "desc": "Insider-Bikepark an der Okertalsperre (~20 km nordöstlich). Gilt als technisch anspruchsvollster Spot im Harz.",
    "mtb": {
      "typ": "Bikepark",
      "lift": "Schlepplift (Ankerbügel)",
      "detail": "6 Strecken: Down(c)Hiller (glattester Flowtrail im Harz), BX/X-Cross (700 m, Doubles), Freeride (Wurzeln/Northshore), Downhill (~1,2–1,4 km, Roadgap ~4 m, schwerster DH im Harz), Hiddenshred (Enduro). Nur Sa/So + Feiertage, 10–16 Uhr, Tageskarte 25 €. Kein PKW hoch – Parken an der Brücke."
    },
    "confidence": "HIGH",
    "web": "https://www.outdoorwerkstatt.eu/",
    "parken": "Ausgewiesene Parkplätze am Racepark, Anfahrt über Clausthal-Zellerfeld",
    "dauer": "halber bis ganzer Tag",
    "kinder": "nein",
    "kinderHinweis": "Anspruchsvoller Park ohne Familienangebot; mit Kleinkind nur Zuschauen.",
    "quellen": [
      "https://www.outdoorwerkstatt.eu/racepark-schulenberg/anfahrt-1/",
      "https://www.outdoorwerkstatt.eu/racepark-schulenberg/%C3%B6ffnungszeiten/",
      "https://www.harzinfo.de/en/experiences/poi/racepark-schulenberg"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Devils Trail (Etappenstart Hanskühnenburg)",
    "lat": 51.751,
    "lng": 10.346,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Ausgeschilderter MTB-Fernweg als Rundkurs – führt direkt durchs Gebiet um Scharzfeld.",
    "mtb": {
      "typ": "MTB-Fernweg / Rundkurs",
      "lift": "–",
      "detail": "184 km / 4.300 Hm, 8 Etappen, komplett im Gelände markiert. Bündelt die besten Trail-Abschnitte des Südharzes (u.a. Schalke→Hanskühnenburg→Großer Knollen→Stöberhai→Braunlage). 8 Stempelstellen der Harzer Wandernadel. Ideal als rote Linie zum Kennenlernen der Region."
    },
    "confidence": "HIGH",
    "web": "https://devils-trail.de/strecke-1-3/",
    "parken": "Parkplatz Stieglitzeck (B 242), dann über die Ackerstraße zur Baude",
    "dauer": "Etappe bis Großer Knollen: 23 km, 472 Hm; gesamt 184 km, 4.300 Hm",
    "kinder": "nein",
    "kinderHinweis": "Sehr anspruchsvolle MTB-Fernrunde; Baude am Start nur zu Fuß erreichbar.",
    "quellen": [
      "https://devils-trail.de/strecke-1-3/",
      "https://devils-trail.de/start/",
      "https://www.harzer-wandernadel.de/stempelstellen/uebersichtskarte/stempelstelle-144-hanskuehnenburg/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Tante-Ju-Trail",
    "lat": 51.743,
    "lng": 10.365,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Das Highlight der Hanskühnenburg-Runde – wurzeliger, technisch-flowiger Singletrail-Abstieg.",
    "mtb": {
      "typ": "Singletrail",
      "lift": "–",
      "detail": "~3–4 km, ca. 400 Hm bergab, S1–S2. Abfahrt vom Hanskühnenburg-Plateau Richtung Sieber/Lonau. Voll gefedert klar im Vorteil."
    },
    "confidence": "MED-HIGH",
    "parken": "Parkplatz am Ortsende von Lonau (Sackgasse), Runde über Hanskühnenburg",
    "dauer": "Abfahrt ca. 400 Hm, S1–S2",
    "kinder": "nein",
    "kinderHinweis": "Technischer Singletrail im Nationalpark, kein Familienangebot am Einstieg.",
    "quellen": [
      "https://www.gps-tour.info/de/touren/detail.58369.html",
      "https://www.komoot.com/de-de/highlight/259197"
    ],
    "konfidenz": "Niedrig"
  },
  {
    "name": "Nasser Weg",
    "lat": 51.727,
    "lng": 10.312,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Langer Singletrail von der Hanskühnenburg hinab Richtung Osterode.",
    "mtb": {
      "typ": "Singletrail",
      "lift": "–",
      "detail": "~6 km, ~300 Hm bergab. Oben flach/matschig (S1), unten steil und steinig (S2) – kompletter Federweg empfohlen. Bei Nässe deutlich anspruchsvoller. Gut belegt (Komoot-Highlight, mehrere POV-Videos)."
    },
    "confidence": "HIGH",
    "parken": "Parkplatz Tilman-Riemenschneider-Haus (Fuchshallerweg), Osterode",
    "dauer": "ca. 6 km Abfahrt, 300 Hm",
    "kinder": "nein",
    "kinderHinweis": "Oben matschig, unten steil und steinig (S2) – nichts für Kinder.",
    "quellen": [
      "https://www.gps-tour.info/de/touren/detail.20645.html",
      "https://www.gps-tour.info/de/touren/detail.58369.html",
      "https://www.komoot.com/de-de/highlight/520930"
    ],
    "konfidenz": "Mittel"
  },
  {
    "name": "Paradies-Trail",
    "lat": 51.701,
    "lng": 10.385,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Trail-Abstieg vom Großen Knollen hinunter ins Siebertal.",
    "mtb": {
      "typ": "Singletrail",
      "lift": "–",
      "detail": "~300 Hm bergab, S1. Südseitiger Knollen-Hang, mündet bei Sieber. Lässt sich gut mit Goldenke und Brackberg zu einer Sieber-Runde verketten."
    },
    "confidence": "MED",
    "parken": "Parkplatz am Ortsende von Lonau (Sackgasse), Runde über Sieber",
    "dauer": "Abfahrt ca. 300 Hm, S1",
    "kinder": "nein",
    "kinderHinweis": "Reiner MTB-Trail im Wald, kein Ziel für Kleinkinder.",
    "quellen": [
      "https://www.gps-tour.info/de/touren/detail.58369.html"
    ],
    "konfidenz": "Niedrig"
  },
  {
    "name": "Goldenke-Trail",
    "lat": 51.718,
    "lng": 10.352,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Kurzer, feiner Verbindungstrail zwischen Lonau und Sieber.",
    "mtb": {
      "typ": "Singletrail",
      "lift": "–",
      "detail": "Kurzer S1-Trail ins Goldenketal: griffiger Waldboden, kurze Stein-/Wurzelpassagen, kleine Spitzkehren. Laut Trailtech 'leider viel zu kurz'."
    },
    "confidence": "MED",
    "parken": "Parkplatz am Ortsende von Lonau (Sackgasse)",
    "kinder": "nein",
    "kinderHinweis": "Kurzer MTB-Trail zwischen Lonau und Sieber, kein Familienangebot.",
    "quellen": [
      "https://www.gps-tour.info/de/touren/detail.58369.html"
    ],
    "konfidenz": "Niedrig"
  },
  {
    "name": "Brackberg-Trail",
    "lat": 51.709,
    "lng": 10.338,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Schneller Speedtrail bei Lonau – nicht technisch, dafür Tempo.",
    "mtb": {
      "typ": "Singletrail",
      "lift": "–",
      "detail": "S1, ~300 Hm Anstieg vor dem Einstieg. Kaum technisch, dafür schnell – 'mit 40 km/h durch den Wald', mündet am Lonauer Campingplatz."
    },
    "confidence": "MED",
    "parken": "Parkplatz am Ortsende von Lonau, ca. 200 m vom Campingplatz",
    "dauer": "ca. 300 Hm Anstieg, dann S1-Speedtrail bis Lonau",
    "kinder": "nein",
    "kinderHinweis": "Schneller Trail; am Einstieg nichts für Kinder.",
    "quellen": [
      "https://www.gps-tour.info/de/touren/detail.58369.html"
    ],
    "konfidenz": "Niedrig"
  },
  {
    "name": "Hanskühnenburg (Trail-Hub)",
    "lat": 51.751,
    "lng": 10.346,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Baude & Aussichtsturm am Acker-Höhenzug – Drehscheibe für mehrere Trail-Abfahrten.",
    "mtb": {
      "typ": "Trail-Knotenpunkt",
      "lift": "–",
      "detail": "~800 m ü. NN, Stempelstelle HWN 144. Ausgangspunkt für Tante-Ju, Nasser Weg und Anschlüsse Richtung Goldenke. Devils-Trail-Etappe 1 endet hier."
    },
    "confidence": "HIGH",
    "web": "https://www.harzer-wandernadel.de/stempelstellen/uebersichtskarte/stempelstelle-144-hanskuehnenburg/",
    "parken": "Parkplatz Stieglitzeck (B 242), dann Ackerstraße oder Reitstieg",
    "dauer": "HE 1 ab Herzberg: 4:30 Std. (41,7 km, 914 Hm)",
    "kinder": "bedingt",
    "kinderHinweis": "Waldgaststätte mit Aussichtsturm, aber nur zu Fuß über Waldwege erreichbar.",
    "quellen": [
      "https://www.harzer-wandernadel.de/stempelstellen/uebersichtskarte/stempelstelle-144-hanskuehnenburg/",
      "https://touren.harzinfo.de/de/tour/mountainbike/he1-tour-der-giganten/37514222/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Großer Knollen (Trail-Hub)",
    "lat": 51.705,
    "lng": 10.3725,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Aussichtsturm & Baude – Startpunkt für Südharz-Trails direkt vor der Haustür von Scharzfeld.",
    "mtb": {
      "typ": "Trail-Knotenpunkt",
      "lift": "–",
      "detail": "687 m, nordöstlich von Herzberg. Start des Paradies-Trails und der Knollen-Double-Tour (~32 km / 900 Hm, S1). Gut mit der Volksbank-Arena-Beschilderung kombinierbar."
    },
    "confidence": "HIGH",
    "web": "https://www.harzer-wandernadel.de/stempelstellen/uebersichtskarte/stempelstelle-150-grosser-knollen/",
    "parken": "Wanderparkplatz Lutterstraße, Ortsrand Bad Lauterberg",
    "dauer": "HE 2 ab Herzberg: 2 Std. (21,6 km, 371 Hm)",
    "kinder": "bedingt",
    "kinderHinweis": "Baude und 20 m hoher Aussichtsturm; nur zu Fuß ab Lutterstraße erreichbar.",
    "quellen": [
      "https://www.harzer-wandernadel.de/stempelstellen/uebersichtskarte/stempelstelle-150-grosser-knollen/",
      "https://touren.harzinfo.de/de/tour/mountainbike/he2-waldgrafen-runde/37514322/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "Ravensberg-Trails (Bad Sachsa)",
    "lat": 51.6225,
    "lng": 10.568,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Trail-Berg am Südharzrand bei Bad Sachsa mit teils schwerem Trailanstieg.",
    "mtb": {
      "typ": "Tour-Trails",
      "lift": "–",
      "detail": "Mittelschwere Bergtour mit Trail-Passagen über Baudensteig und Försterstieg. Volksbank-Arena-Routen BS1/BS2/BL2-4/SW2 führen vorbei. Stöberhai als zweiter Gipfel mit Trail-Abfahrt in der Nähe."
    },
    "confidence": "HIGH",
    "web": "https://www.volksbank-arena-harz.de/routen/routen-ab-bad-sachsa/bs-2-steinaer-bachtour",
    "parken": "Startpunkt BS 2: Salztal Paradies, Talstraße 27, Bad Sachsa",
    "dauer": "BS 2: 2 Std. (20,7 km, 496 Hm)",
    "kinder": "nein",
    "kinderHinweis": "Steiler Trailanstieg; selbst die Familienroute BS 1 ist erst ab 12 Jahren empfohlen.",
    "quellen": [
      "https://www.volksbank-arena-harz.de/routen/routen-ab-bad-sachsa/bs-2-steinaer-bachtour",
      "https://touren.harzinfo.de/de/tour/mountainbike/bs2-steinaer-bachtour/37304028/",
      "https://www.volksbank-arena-harz.de/routen/routen-ab-bad-sachsa/bs-1-suedharz-perle"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "VBA · HE 2 Waldherr-Tour (Herzberg)",
    "lat": 51.654,
    "lng": 10.341,
    "cat": "mtb",
    "region": "Südharz",
    "desc": "Ausgeschilderte Singletrail-Route der Volksbank Arena – Start direkt in Herzberg.",
    "mtb": {
      "typ": "Ausgeschilderte MTB-Route",
      "lift": "–",
      "detail": "Mittelschwere Rundroute, als 'Singletrail-Route' markiert (erhöhter Trail-Anteil). Start an der Tourist-Info am Marktplatz. Daneben HE 1 'Tour der Giganten' (44 km / 1.350 Hm, schwer) ab demselben Startort."
    },
    "confidence": "HIGH",
    "web": "https://www.volksbank-arena-harz.de/routen/routen-ab-herzberg/he-2-waldgrafen-runde",
    "dauer": "2 Std. (21,6 km, 371 Hm)",
    "kinder": "nein",
    "kinderHinweis": "MTB-Rundroute; Betreiber-Tipp am Ende: Abstecher zur Steinkirche Scharzfeld.",
    "quellen": [
      "https://www.volksbank-arena-harz.de/routen/routen-ab-herzberg/he-2-waldgrafen-runde",
      "https://touren.harzinfo.de/de/tour/mountainbike/he2-waldgrafen-runde/37514322/",
      "https://touren.harzinfo.de/de/tour/mountainbike/he1-tour-der-giganten/37514222/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "VBA · A 1 Sonnenberg-Rundtour",
    "lat": 51.712,
    "lng": 10.521,
    "cat": "mtb",
    "region": "Westharz",
    "desc": "Schwere Singletrail-Route der Volksbank Arena ab St. Andreasberg.",
    "mtb": {
      "typ": "Ausgeschilderte MTB-Route",
      "lift": "–",
      "detail": "21 km / 916 Hm, schwer, als Singletrail-Route markiert. Technischer Trail über Baumstämme zwischen Oderteich und Sonnenberg – bei Nässe heikel. 5 weitere A-Routen ab St. Andreasberg."
    },
    "confidence": "HIGH",
    "web": "https://www.volksbank-arena-harz.de/routen/routen-ab-st-andreasberg/a-1-sonnenberg-rundtour",
    "dauer": "1:30 Std. (20,5 km, 318 Hm)",
    "kinder": "nein",
    "kinderHinweis": "Bohlen-Trail bei Nässe gefährlich; Start an der Tourist-Info im Ort.",
    "quellen": [
      "https://www.volksbank-arena-harz.de/routen/routen-ab-st-andreasberg/a-1-sonnenberg-rundtour",
      "https://touren.harzinfo.de/de/tour/mountainbike/a1-sonnenberg-rundtour/36859040/"
    ],
    "konfidenz": "Hoch"
  },
  {
    "name": "VBA · O 1 Wild Man's Trail (Clausthal)",
    "lat": 51.803,
    "lng": 10.339,
    "cat": "mtb",
    "region": "Westharz",
    "desc": "Schwere Singletrail-Route der Volksbank Arena ab Clausthal-Zellerfeld.",
    "mtb": {
      "typ": "Ausgeschilderte MTB-Route",
      "lift": "–",
      "detail": "31 km / 968 Hm, schwer, als Singletrail-Route markiert. Einer von ~11 O-Routen im Oberharz rund um Clausthal-Zellerfeld/Altenau – das dichteste Netz ausgeschilderter Touren der Region."
    },
    "confidence": "HIGH",
    "web": "https://www.volksbank-arena-harz.de/routen/routen-ab-clausthal-zellerfeld/o-1-wild-mans-trail",
    "dauer": "3 Std. (28,9 km, 811 Hm)",
    "kinder": "nein",
    "kinderHinweis": "Schwere Route mit steilen Abfahrten; Start am Oberharzer Bergwerksmuseum.",
    "quellen": [
      "https://www.volksbank-arena-harz.de/routen/routen-ab-clausthal-zellerfeld/o-1-wild-mans-trail",
      "https://touren.harzinfo.de/de/tour/mountainbike/o1-wild-man-s-trail/37123156/"
    ],
    "konfidenz": "Hoch"
  }
];
root.HARZ_CATS = HARZ_CATS;
root.HARZ_POIS = HARZ_POIS;
})(typeof window !== "undefined" ? window : globalThis);
