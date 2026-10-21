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
    "desc": "Mystischer Ort bei Rhumspringe. Mit bis zu 5000 Litern pro Sekunde eine der stärksten Karstquellen Deutschlands. Das Wasser schimmert oft türkis."
  },
  {
    "name": "Rappbodetalsperre & Titan-RT",
    "lat": 51.741,
    "lng": 10.893,
    "cat": "erlebnis",
    "region": "Ostharz",
    "desc": "Höchste Staumauer und die drittlängste Hängeseilbrücke (485,5 m) Deutschlands. Extra: GigaSwing in 64m Tiefe oder Aussichtspunkt Rotestein."
  },
  {
    "name": "Stabkirche Hahnenklee",
    "lat": 51.8569,
    "lng": 10.34,
    "cat": "kultur",
    "region": "Westharz",
    "desc": "Die Gustav-Adolf-Stabkirche von 1907. Typisch norwegische Bauweise im Goslarer Stadtteil Hahnenklee. Duftet innen herrlich nach Holz."
  },
  {
    "name": "Baumwipfelpfad Harz",
    "lat": 51.87,
    "lng": 10.5632,
    "cat": "erlebnis",
    "region": "Westharz",
    "desc": "Ein 1000 Meter langer Pfad in Bad Harzburg in bis zu 30 Metern Höhe. Bietet 18 Plattformen und schöne Natur-Ausblicke."
  },
  {
    "name": "Wolfswarte auf dem Bruchberg",
    "lat": 51.7836,
    "lng": 10.5,
    "cat": "natur",
    "region": "Westharz",
    "desc": "Die waldlose Kuppe aus Quarzit auf dem zweithöchsten Berg Niedersachsens (Bruchberg). Bietet bei gutem Wetter atemberaubende Ausblicke."
  },
  {
    "name": "Das Kleinste Haus in Wernigerode",
    "lat": 51.8329,
    "lng": 10.7873,
    "cat": "kultur",
    "region": "Ostharz",
    "desc": "Nur 2,95m breit und 4,20m hoch, mit einer 1,70m hohen Tür. Zwischen Baulücken errichtet, diente es einst als Wohnung für bis zu 11 Personen."
  },
  {
    "name": "Burg Falkenstein",
    "lat": 51.6816,
    "lng": 11.265,
    "cat": "kultur",
    "region": "Ostharz",
    "desc": "Im 12. Jahrhundert erbaut, erhebt sich die Burg majestätisch über der Selke. Gilt als am besten erhaltene Burg im Harz mit tollem Panorama."
  },
  {
    "name": "Einhornhöhle",
    "lat": 51.635,
    "lng": 10.4042,
    "cat": "hoehle",
    "region": "Südharz",
    "desc": "Größte begehbare Höhle im Westharz bei Scharzfeld. Die einst dort gefundenen Knochen hielt man früher für Überreste von Einhörnern (waren aber Höhlenbären)."
  },
  {
    "name": "Steinkirche bei Scharzfeld",
    "lat": 51.6335,
    "lng": 10.3777,
    "cat": "hoehle",
    "region": "Südharz",
    "desc": "Rundbogige Felsenhöhle, die schon in der Steinzeit genutzt wurde. Im Mittelalter diente sie als Kirche (Kanzel und Altar aus Stein noch sichtbar)."
  },
  {
    "name": "Höhlenwohnungen von Langenstein",
    "lat": 51.8519,
    "lng": 10.9898,
    "cat": "kultur",
    "region": "Ostharz",
    "desc": "Wie bei den Hobbits: Per Hand in den Fels geschlagene Wohnungen, in denen bis vor 100 Jahren noch Menschen (Troglodyten) lebten."
  },
  {
    "name": "Blaue Kirche von Clausthal",
    "lat": 51.804,
    "lng": 10.334,
    "cat": "kultur",
    "region": "Westharz",
    "desc": "Größte Holzkirche Deutschlands (Heilig-Geist-Kirche). Seit 2013 erstrahlt sie wieder in ihrem ursprünglichen, markanten Kobaltblau."
  },
  {
    "name": "Hexentanzplatz in Thale",
    "lat": 51.7333,
    "lng": 11.0244,
    "cat": "erlebnis",
    "region": "Ostharz",
    "desc": "Mystisches Plateau über dem Bodetal. Schauplatz der Walpurgisnacht. Mit Bobbahn, Bergtheater und erreichbar per Bodetal-Seilbahn."
  },
  {
    "name": "Wurmberg",
    "lat": 51.7277,
    "lng": 10.6172,
    "cat": "erlebnis",
    "region": "Westharz",
    "desc": "Höchster Berg Niedersachsens bei Braunlage. Beliebtes Skigebiet und im Sommer ideal für rasante Fahrten mit dem Monsterroller oder Seilbahn."
  },
  {
    "name": "Weltkulturerbe Rammelsberg",
    "lat": 51.89,
    "lng": 10.4183,
    "cat": "kultur",
    "region": "Westharz",
    "desc": "Ehemaliges Erzbergwerk in Goslar, das heute als faszinierendes Museum Einblicke in über 1000 Jahre Bergbaugeschichte bietet (UNESCO-Welterbe)."
  },
  {
    "name": "Iberger Tropfsteinhöhle",
    "lat": 51.8157,
    "lng": 10.252,
    "cat": "hoehle",
    "region": "Westharz",
    "desc": "HöhlenErlebnisZentrum bei Bad Grund. Erforsche faszinierende Tropfsteine und spannende archäologische Funde aus der Bronzezeit."
  },
  {
    "name": "Kloster Walkenried",
    "lat": 51.5828,
    "lng": 10.619,
    "cat": "kultur",
    "region": "Südharz",
    "desc": "Eindrucksvolles ehemaliges Zisterzienserkloster. Beherbergt eines der größten und innovativsten Klostermuseen Europas (UNESCO-Welterbe)."
  },
  {
    "name": "Josephskreuz",
    "lat": 51.5806,
    "lng": 10.9361,
    "cat": "natur",
    "region": "Südharz",
    "desc": "Das größte eiserne Doppelkreuz der Welt auf dem Großen Auerberg bei Stolberg. Die Aussichtsplattform bietet eine herrliche Fernsicht."
  },
  {
    "name": "Europa-Rosarium",
    "lat": 51.4748,
    "lng": 11.3108,
    "cat": "natur",
    "region": "Südharz",
    "desc": "Die größte Rosensammlung der Welt in Sangerhausen. Erlebe rund 8.600 verschiedene Rosenarten auf einem 13 Hektar großen Parkgelände."
  },
  {
    "name": "Kyffhäuser-Denkmal",
    "lat": 51.4131,
    "lng": 11.1098,
    "cat": "kultur",
    "region": "Südharz",
    "desc": "Monumentales Denkmal zu Ehren von Kaiser Wilhelm I. und Kaiser Barbarossa südlich des Harzes. Bietet einen grandiosen Ausblick."
  },
  {
    "name": "Barbarossahöhle",
    "lat": 51.3756,
    "lng": 11.0375,
    "cat": "hoehle",
    "region": "Südharz",
    "desc": "Eine von weltweit nur sehr wenigen Schauhöhlen im Anhydritgestein. Mit weitläufigen unterirdischen Seen und bizarren Gesteinsschichten."
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "MED-HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "MED"
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
    "confidence": "MED"
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
    "confidence": "MED"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
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
    "confidence": "HIGH"
  }
];
root.HARZ_CATS = HARZ_CATS;
root.HARZ_POIS = HARZ_POIS;
})(typeof window !== "undefined" ? window : globalThis);
