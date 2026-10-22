/* Site « Prix de l'électricité de demain » : lit data/donnees.json (écrit chaque jour par site_web.py) et dessine les graphiques avec Chart.js. */
"use strict";

const TXT = {
  fr: {
    titre: "Prix de l'électricité de demain en France",
    sous_titre: "Chaque matin, trois modèles de machine learning prévoient le prix day-ahead de l'électricité en France (enchère EPEX, au quart d'heure), avant sa publication vers 12 h 45. Ils sont ensuite comparés au prix fixé par le marché.",
    maj: "Mis à jour le {d}",
    demain_avenir: "Prévision pour le {d}",
    demain_passe: "Dernière prévision : {d}",
    intro_avenir: "Prix prévu au quart d'heure (heure de Paris). Le prix réel sera publié par le marché vers 12 h 45 la veille.",
    intro_passe: "Le prix du marché de ce jour est déjà publié : la comparaison est plus bas. La prochaine prévision paraît vers 10 h.",
    prix_moyen: "prix moyen prévu",
    veille: "Prix moyen de la veille",
    marche_moyen: "Prix moyen du marché",
    moins_chere: "Heure la moins chère",
    plus_chere: "Heure la plus chère",
    selon_principal: "selon le modèle principal",
    fourchette: "Fourchette indicative (80 % des écarts passés)",
    titre_jour: "Prévu contre marché, jour par jour",
    source_direct: "Prévision publiée la veille",
    source_rejeu: "Rejoué a posteriori avec la méthode du service",
    marche: "Marché (prix réel)",
    hier: "Même quart d'heure la veille",
    hier_court: "Repère « hier »",
    col_modele: "Modèle",
    col_prevu: "Prix moyen prévu",
    col_mae: "Erreur moyenne",
    col_rel: "Erreur relative",
    col_biais: "Biais",
    col_rmse: "Erreur quadratique",
    col_meilleur: "Meilleur des 3 modèles",
    col_gain: "Gain contre « hier »",
    col_jour: "Jour",
    col_source: "Source",
    unite: "€/MWh",
    titre_historique: "Historique des erreurs",
    intro_historique: "Erreur moyenne de chaque modèle, en €/MWh au quart d'heure (écart absolu entre prix prévu et prix du marché). Plus c'est bas, mieux c'est. L'erreur relative rapporte la somme des erreurs à la somme des prix.",
    p_tout: "Tout l'historique",
    p_30: "30 derniers jours",
    p_direct: "Depuis la mise en ligne",
    aucun_direct: "Pas encore de jour prévu en direct : les premières prévisions publiées arrivent à partir du {d}.",
    voir_tableau: "Voir le tableau jour par jour",
    mise_en_ligne: "mise en ligne",
    rejeu: "rejeu",
    direct: "direct",
    jours_n: "{n} jours",
    titre_methode: "Les modèles et la méthode",
    nom_GR: "Tout GFS + gaz",
    nom_CR: "Avec notre prévision de production",
    nom_GT: "Prix rapporté au gaz",
    tag_principal: "principal",
    tag_test: "en test",
    desc_GR: "Prévisions météo GFS (soleil, vent, température), consommation prévue par RTE, calendrier, prix des jours passés et prix du gaz. Réentraîné chaque matin sur toutes les données depuis 2020.",
    desc_CR: "Comme le principal, mais le soleil et le vent sont remplacés par la production solaire et éolienne prévue par nos propres modèles de production.",
    desc_GT: "Comme le principal, mais le modèle apprend le prix divisé par le coût du gaz pour une centrale (TTF ÷ 0,55), puis le remultiplie. En observation : son avantage n'est pas encore démontré.",
    desc_hier: "Repère naïf, sans modèle : le prix du même quart d'heure la veille. Un modèle utile doit faire mieux.",
    points: [
      "La prévision est faite la veille au matin, avant la publication des prix vers 12 h 45, avec uniquement des données connues à ce moment-là.",
      "Météo : modèle GFS de la NOAA (run de minuit). Les modèles ont appris uniquement sur des prévisions GFS archivées depuis 2020, jamais sur de la météo observée.",
      "Données : prix day-ahead EPEX (via Energy-Charts, Fraunhofer ISE), consommation et prévision de RTE (ODRÉ, éCO2mix), prix du gaz TTF (clôture de l'avant-veille).",
      "Historique : avant le {d}, les jours sont rejoués a posteriori avec exactement la méthode du service ; à partir de cette date, ce sont les prévisions publiées en direct, la veille.",
      "Limite connue : les effondrements de prix par grand vent (prix proches de 0 €/MWh pendant quelques heures) sont mal anticipés.",
    ],
    pied: "Projet étudiant (emlyon business school), réalisé avec l'aide de Claude (Anthropic). Ces prévisions ne constituent pas un conseil d'investissement. Prix du marché : EPEX SPOT via Energy-Charts.info (Fraunhofer ISE).",
    chargement: "Impossible de charger les données.",
    gaz_sans: "Gaz",
  },
  en: {
    titre: "Tomorrow's electricity price in France",
    sous_titre: "Every morning, three machine-learning models forecast the French day-ahead electricity price (EPEX auction, 15-minute resolution) before it is published around 12:45. They are then compared with the price set by the market.",
    maj: "Updated {d}",
    demain_avenir: "Forecast for {d}",
    demain_passe: "Latest forecast: {d}",
    intro_avenir: "Forecast price per quarter-hour (Paris time). The market publishes the actual price around 12:45 the day before.",
    intro_passe: "The market price for this day is already published: see the comparison below. The next forecast appears around 10:00.",
    prix_moyen: "average forecast price",
    veille: "Previous day's average price",
    marche_moyen: "Average market price",
    moins_chere: "Cheapest hour",
    plus_chere: "Most expensive hour",
    selon_principal: "according to the main model",
    fourchette: "Indicative range (80% of past errors)",
    titre_jour: "Forecast versus market, day by day",
    source_direct: "Forecast published the day before",
    source_rejeu: "Replayed afterwards with the service's method",
    marche: "Market (actual price)",
    hier: "Same quarter-hour the day before",
    hier_court: "\"Yesterday\" benchmark",
    col_modele: "Model",
    col_prevu: "Average forecast",
    col_mae: "Mean error",
    col_rel: "Relative error",
    col_biais: "Bias",
    col_rmse: "Root mean square error",
    col_meilleur: "Best of the 3 models",
    col_gain: "Gain over \"yesterday\"",
    col_jour: "Day",
    col_source: "Source",
    unite: "€/MWh",
    titre_historique: "Error history",
    intro_historique: "Mean error of each model, in €/MWh per quarter-hour (absolute gap between forecast and market price). Lower is better. The relative error divides the sum of errors by the sum of prices.",
    p_tout: "Full history",
    p_30: "Last 30 days",
    p_direct: "Since going live",
    aucun_direct: "No live day yet: the first published forecasts start on {d}.",
    voir_tableau: "Show the day-by-day table",
    mise_en_ligne: "live from here",
    rejeu: "replay",
    direct: "live",
    jours_n: "{n} days",
    titre_methode: "Models and method",
    nom_GR: "All-GFS + gas",
    nom_CR: "With our production forecast",
    nom_GT: "Gas-relative price",
    tag_principal: "main",
    tag_test: "testing",
    desc_GR: "GFS weather forecasts (sun, wind, temperature), RTE load forecast, calendar, past prices and gas price. Retrained every morning on all data since 2020.",
    desc_CR: "Like the main model, but sun and wind are replaced by the solar and wind output forecast by our own production models.",
    desc_GT: "Like the main model, but it learns the price divided by the fuel cost of a gas plant (TTF ÷ 0.55), then multiplies back. Under observation: its advantage is not yet proven.",
    desc_hier: "Naive benchmark, no model: the price of the same quarter-hour the day before. A useful model must beat it.",
    points: [
      "The forecast is made on the morning of the day before, before prices are published around 12:45, using only data available at that time.",
      "Weather: NOAA's GFS model (midnight run). The models were trained only on archived GFS forecasts since 2020, never on observed weather.",
      "Data: EPEX day-ahead prices (via Energy-Charts, Fraunhofer ISE), RTE load and load forecast (ODRÉ, éCO2mix), TTF gas price (close two days before).",
      "History: before {d}, days are replayed afterwards with exactly the service's method; from that date on, they are the forecasts published live, the day before.",
      "Known limitation: price collapses during very windy periods (prices close to 0 €/MWh for a few hours) are poorly anticipated.",
    ],
    pied: "Student project (emlyon business school), built with the help of Claude (Anthropic). These forecasts are not investment advice. Market prices: EPEX SPOT via Energy-Charts.info (Fraunhofer ISE).",
    chargement: "Could not load the data.",
    gaz_sans: "Gas",
  },
};

const MODELES = [
  { code: "GR", couleur: "--s-gr", tirets: null, tag: "tag_principal" },
  { code: "CR", couleur: "--s-cr", tirets: null, tag: null },
  { code: "GT", couleur: "--s-gt", tirets: [6, 4], tag: "tag_test" },
];

const etat = { donnees: null, langue: "fr", jour: null, periode: "tout", graphiques: {} };

function lire(cle) { try { return localStorage.getItem(cle); } catch (e) { return null; } }
function ecrireLocal(cle, v) { try { localStorage.setItem(cle, v); } catch (e) { /* stockage indisponible : sans effet */ } }

function t(cle, vars) {
  let s = TXT[etat.langue][cle];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace("{" + k + "}", v);
  return s;
}
const loc = () => (etat.langue === "fr" ? "fr-FR" : "en-GB");
function nombre(v, dec = 1) {
  if (v === null || v === undefined || Number.isNaN(v)) return "–";
  return new Intl.NumberFormat(loc(), { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
}
function signe(v, dec = 1) { return (v > 0 ? "+" : "") + nombre(v, dec); }
function dateLongue(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function dateCourte(iso) { return new Date(iso + "T12:00:00").toLocaleDateString(loc(), { day: "2-digit", month: "2-digit" }); }
function css(nom) { return getComputedStyle(document.documentElement).getPropertyValue(nom).trim(); }
function nomModele(code) { return code === "hier" ? t("hier_court") : t("nom_" + code); }
const moyenne = (a) => { const v = a.filter((x) => x !== null); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };

/* ---------------------------------------------------------------- statistiques */
function statsPeriode(jours, cle) {
  let n = 0, sa = 0, s = 0, s2 = 0, sr = 0;
  for (const j of jours) {
    const p = cle === "hier" ? j.hier : j[cle];
    if (!p || !j.reel) continue;
    for (let i = 0; i < p.length; i++) {
      if (p[i] === null || j.reel[i] === null) continue;
      const e = p[i] - j.reel[i];
      n++; sa += Math.abs(e); s += e; s2 += e * e; sr += Math.abs(j.reel[i]);
    }
  }
  return n ? { mae: sa / n, biais: s / n, rmse: Math.sqrt(s2 / n), rel: (100 * sa) / sr, n } : null;
}
function joursAvecPrix() { return etat.donnees.jours.filter((j) => j.reel); }
function joursPeriode() {
  let js = joursAvecPrix();
  if (etat.periode === "30") js = js.slice(-30);
  if (etat.periode === "direct") js = js.filter((j) => j.source === "direct");
  return js;
}
function heuresMoyennes(serie, heures) {
  const parH = {};
  heures.forEach((h, i) => { const k = h.slice(0, 2); if (serie[i] !== null) (parH[k] = parH[k] || []).push(serie[i]); });
  return Object.entries(parH).map(([h, v]) => [h, v.reduce((a, b) => a + b, 0) / v.length]);
}

/* ---------------------------------------------------------------- graphiques */
const curseur = {
  id: "curseur",
  afterDatasetsDraw(chart) {
    const actifs = chart.tooltip && chart.tooltip.getActiveElements();
    if (!actifs || !actifs.length) return;
    const x = actifs[0].element.x, { top, bottom } = chart.chartArea, ctx = chart.ctx;
    ctx.save(); ctx.strokeStyle = css("--axis"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke(); ctx.restore();
  },
};
const marqueur = {
  id: "marqueur",
  afterDraw(chart, args, opts) {
    if (opts.index === undefined || opts.index === null || opts.index < 0) return;
    const x = chart.scales.x.getPixelForValue(opts.index), { top, bottom } = chart.chartArea, ctx = chart.ctx;
    ctx.save(); ctx.strokeStyle = css("--muted"); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle = css("--muted"); ctx.font = "12px system-ui, sans-serif"; ctx.fillText(opts.texte, x + 4, top + 12); ctx.restore();
  },
};

function optionsCommunes(axeX) {
  const muted = css("--muted");
  return {
    responsive: true, maintainAspectRatio: false, animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top", align: "start", labels: { color: css("--ink-2"), boxWidth: 16, boxHeight: 3, padding: 14, filter: (it) => !it.text.startsWith("_") } },
      tooltip: {
        filter: (it) => !it.dataset.label.startsWith("_") && it.dataset.label !== t("fourchette"),
        callbacks: { label: (c) => ` ${c.dataset.label}${etat.langue === "fr" ? " : " : ": "}${nombre(c.parsed.y)} ${t("unite")}` },
      },
      marqueur: {},
    },
    scales: {
      x: { ticks: { color: muted, maxRotation: 0, autoSkip: true, maxTicksLimit: innerWidth < 600 ? 6 : axeX === "heures" ? 13 : 10 }, grid: { display: false }, border: { color: css("--axis") } },
      y: { ticks: { color: muted, callback: (v) => nombre(v, 0) }, grid: { color: css("--grid") }, border: { display: false },
           title: { display: true, text: t("unite"), color: muted } },
    },
    elements: { point: { radius: 0, hoverRadius: 3 }, line: { borderWidth: 2, tension: 0 } },
  };
}
function serieModele(m, data) {
  const c = css(m.couleur);
  return { label: nomModele(m.code) + (m.tag === "tag_test" ? " (" + t("tag_test") + ")" : ""), data, borderColor: c, backgroundColor: c, borderDash: m.tirets || [], fill: false };
}
function serieMarche(data) { const c = css("--ink"); return { label: t("marche"), data, borderColor: c, backgroundColor: c, borderWidth: 2.5, fill: false }; }
function serieHier(data) { const c = css("--muted"); return { label: t("hier"), data, borderColor: c, backgroundColor: c, borderWidth: 1.5, borderDash: [2, 3], fill: false }; }
function dessiner(id, config) {
  if (etat.graphiques[id]) etat.graphiques[id].destroy();
  etat.graphiques[id] = new Chart(document.getElementById(id), config);
}

/* ---------------------------------------------------------------- sections */
function sectionDemain() {
  const js = etat.donnees.jours;
  const avenir = [...js].reverse().find((j) => !j.reel);
  const j = avenir || js[js.length - 1];
  document.getElementById("titre-demain").textContent = t(avenir ? "demain_avenir" : "demain_passe", { d: dateLongue(j.jour) });
  document.getElementById("intro-demain").textContent = t(avenir ? "intro_avenir" : "intro_passe");
  const alerte = document.getElementById("alerte-gaz");
  if (j.gaz && j.gaz.message && j.gaz.niveau !== "normal") {
    alerte.hidden = false; alerte.className = "alerte " + j.gaz.niveau; alerte.textContent = "⚠ " + j.gaz.message;
  } else alerte.hidden = true;

  const tuiles = [];
  for (const m of MODELES) {
    if (!j[m.code]) continue;
    const tag = m.tag ? ` <span class="etiquette-test">${t(m.tag)}</span>` : "";
    tuiles.push(`<div class="tuile"><div class="libelle"><span class="pastille${m.tirets ? " tirets" : ""}" style="color:${css(m.couleur)}"></span>${nomModele(m.code)}${tag}</div>
      <div class="valeur">${nombre(moyenne(j[m.code]))} <small>${t("unite")}</small></div><div class="detail">${t("prix_moyen")}</div></div>`);
  }
  if (j.reel) tuiles.push(`<div class="tuile"><div class="libelle"><span class="pastille" style="color:${css("--ink")}"></span>${t("marche_moyen")}</div>
      <div class="valeur">${nombre(moyenne(j.reel))} <small>${t("unite")}</small></div><div class="detail">${dateCourte(j.jour)}</div></div>`);
  tuiles.push(`<div class="tuile"><div class="libelle"><span class="pastille points" style="color:${css("--muted")}"></span>${t("veille")}</div>
      <div class="valeur">${nombre(moyenne(j.hier))} <small>${t("unite")}</small></div><div class="detail">${t("hier")}</div></div>`);
  if (j.GR) {
    const h = heuresMoyennes(j.GR, j.heures), min = h.reduce((a, b) => (b[1] < a[1] ? b : a)), max = h.reduce((a, b) => (b[1] > a[1] ? b : a));
    tuiles.push(`<div class="tuile"><div class="libelle">${t("moins_chere")} · ${t("plus_chere").toLowerCase()}</div>
      <div class="valeur">${min[0]} h <small>${nombre(min[1], 0)} €</small> · ${max[0]} h <small>${nombre(max[1], 0)} €</small></div><div class="detail">${t("selon_principal")}</div></div>`);
  }
  document.getElementById("tuiles-demain").innerHTML = tuiles.join("");

  const ds = [];
  if (j.bas && j.haut) {
    ds.push({ label: "_bas", data: j.bas, borderWidth: 0, pointRadius: 0, fill: false });
    ds.push({ label: t("fourchette"), data: j.haut, borderWidth: 0, pointRadius: 0, backgroundColor: css("--bande"), borderColor: css("--bande"), fill: "-1" });
  }
  if (j.reel) ds.push(serieMarche(j.reel));
  for (const m of MODELES) if (j[m.code]) ds.push(serieModele(m, j[m.code]));
  ds.push(serieHier(j.hier));
  dessiner("graphique-demain", { type: "line", data: { labels: j.heures, datasets: ds }, options: optionsCommunes("heures"), plugins: [curseur] });
  document.getElementById("graphique-demain").setAttribute("aria-label", document.getElementById("titre-demain").textContent);
}

function sectionJour() {
  const js = joursAvecPrix();
  const choix = document.getElementById("choix-jour");
  if (!js.length) { document.getElementById("jour").hidden = true; return; }
  if (!etat.jour || !js.find((j) => j.jour === etat.jour)) etat.jour = js[js.length - 1].jour;
  choix.innerHTML = [...js].reverse().map((j) => `<option value="${j.jour}"${j.jour === etat.jour ? " selected" : ""}>${dateLongue(j.jour)}</option>`).join("");
  const i = js.findIndex((j) => j.jour === etat.jour), j = js[i];
  document.getElementById("jour-prec").disabled = i === 0;
  document.getElementById("jour-suiv").disabled = i === js.length - 1;
  document.getElementById("badge-source").textContent = t(j.source === "direct" ? "source_direct" : "source_rejeu");

  const ds = [serieMarche(j.reel)];
  for (const m of MODELES) if (j[m.code]) ds.push(serieModele(m, j[m.code]));
  ds.push(serieHier(j.hier));
  dessiner("graphique-jour", { type: "line", data: { labels: j.heures, datasets: ds }, options: optionsCommunes("heures"), plugins: [curseur] });
  document.getElementById("graphique-jour").setAttribute("aria-label", t("titre_jour") + " : " + dateLongue(j.jour));

  const codes = MODELES.map((m) => m.code).filter((c) => j[c]).concat(["hier"]);
  const best = codes.filter((c) => c !== "hier").reduce((a, b) => (j.erreurs[b].mae < j.erreurs[a].mae ? b : a));
  let h = `<thead><tr><th>${t("col_modele")}</th><th>${t("col_prevu")}</th><th>${t("col_mae")}</th><th>${t("col_rel")}</th><th>${t("col_biais")}</th><th>${t("col_rmse")}</th></tr></thead><tbody>`;
  h += `<tr><td><span class="nom-modele"><span class="pastille" style="color:${css("--ink")}"></span>${t("marche")}</span></td><td>${nombre(moyenne(j.reel))}</td><td>–</td><td>–</td><td>–</td><td>–</td></tr>`;
  for (const c of codes) {
    const e = j.erreurs[c], m = MODELES.find((x) => x.code === c);
    const coul = m ? css(m.couleur) : css("--muted"), cls = m && m.tirets ? " tirets" : c === "hier" ? " points" : "";
    h += `<tr${c === best ? ' class="meilleur"' : ""}><td><span class="nom-modele"><span class="pastille${cls}" style="color:${coul}"></span>${nomModele(c)}</span></td>
      <td>${nombre(moyenne(c === "hier" ? j.hier : j[c]))}</td><td>${nombre(e.mae)}</td><td>${nombre(e.rel, 0)} %</td><td>${signe(e.biais)}</td><td>${nombre(e.rmse)}</td></tr>`;
  }
  document.getElementById("table-jour").innerHTML = h + "</tbody>";
}

function sectionHistorique() {
  const tous = joursAvecPrix();
  const direct = tous.filter((j) => j.source === "direct");
  const per = document.getElementById("periodes");
  per.innerHTML = [["tout", "p_tout"], ["30", "p_30"], ["direct", "p_direct"]]
    .map(([k, c]) => `<button type="button" data-periode="${k}" aria-pressed="${etat.periode === k}">${t(c)}</button>`).join("");
  per.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { etat.periode = b.dataset.periode; sectionHistorique(); }));
  const js = joursPeriode();
  const resume = document.getElementById("table-resume");
  if (!js.length) {
    resume.innerHTML = `<tbody><tr><td>${t("aucun_direct", { d: dateLongue(etat.donnees.debut_direct) })}</td></tr></tbody>`;
  } else {
    const codes = MODELES.map((m) => m.code);
    const victoires = Object.fromEntries(codes.map((c) => [c, 0]));
    let nj = 0;
    for (const j of js) {
      const dispo = codes.filter((c) => j.erreurs && j.erreurs[c]);
      if (!dispo.length) continue;
      nj++; victoires[dispo.reduce((a, b) => (j.erreurs[b].mae < j.erreurs[a].mae ? b : a))]++;
    }
    const sh = statsPeriode(js, "hier");
    let h = `<thead><tr><th>${t("col_modele")} · ${t("jours_n", { n: js.length })}</th><th>${t("col_mae")}</th><th>${t("col_rel")}</th><th>${t("col_biais")}</th><th>${t("col_rmse")}</th><th>${t("col_meilleur")}</th><th>${t("col_gain")}</th></tr></thead><tbody>`;
    const stats = codes.map((c) => [c, statsPeriode(js, c)]).filter(([, s]) => s);
    const best = stats.reduce((a, b) => (b[1].mae < a[1].mae ? b : a))[0];
    for (const [c, s] of stats.concat([["hier", sh]])) {
      const m = MODELES.find((x) => x.code === c), coul = m ? css(m.couleur) : css("--muted"), cls = m && m.tirets ? " tirets" : c === "hier" ? " points" : "";
      const gain = c === "hier" ? "–" : `<span class="positif">${signe((100 * (sh.mae - s.mae)) / sh.mae, 0)} %</span>`;
      h += `<tr${c === best ? ' class="meilleur"' : ""}><td><span class="nom-modele"><span class="pastille${cls}" style="color:${coul}"></span>${nomModele(c)}</span></td>
        <td>${nombre(s.mae)} ${t("unite")}</td><td>${nombre(s.rel, 0)} %</td><td>${signe(s.biais)}</td><td>${nombre(s.rmse)}</td>
        <td>${c === "hier" ? "–" : nombre((100 * victoires[c]) / nj, 0) + " %"}</td><td>${gain}</td></tr>`;
    }
    resume.innerHTML = h + "</tbody>";
  }
  const labels = js.map((j) => dateCourte(j.jour));
  const ds = MODELES.filter((m) => js.some((j) => j.erreurs && j.erreurs[m.code]))
    .map((m) => ({ ...serieModele(m, js.map((j) => (j.erreurs && j.erreurs[m.code] ? j.erreurs[m.code].mae : null))), pointRadius: 2 }));
  ds.push({ ...serieHier(js.map((j) => j.erreurs.hier.mae)), pointRadius: 0 });
  const opt = optionsCommunes("jours");
  const iDirect = js.findIndex((j) => j.source === "direct");
  opt.plugins.marqueur = { index: iDirect > 0 ? iDirect : null, texte: t("mise_en_ligne") };
  dessiner("graphique-historique", { type: "line", data: { labels, datasets: ds }, options: opt, plugins: [curseur, marqueur] });
  document.getElementById("graphique-historique").setAttribute("aria-label", t("titre_historique"));

  let tj = `<thead><tr><th>${t("col_jour")}</th><th>${t("col_source")}</th><th>${t("marche_moyen")}</th>${MODELES.map((m) => `<th>${nomModele(m.code)}</th>`).join("")}<th>${t("hier_court")}</th></tr></thead><tbody>`;
  for (const j of [...js].reverse()) {
    tj += `<tr><td>${dateCourte(j.jour)}</td><td>${t(j.source === "direct" ? "direct" : "rejeu")}</td><td>${nombre(moyenne(j.reel))}</td>`
      + MODELES.map((m) => `<td>${j.erreurs[m.code] ? nombre(j.erreurs[m.code].mae) : "–"}</td>`).join("") + `<td>${nombre(j.erreurs.hier.mae)}</td></tr>`;
  }
  document.getElementById("table-jours").innerHTML = tj + "</tbody>";
}

function sectionMethode() {
  const fiches = MODELES.map((m) => `<div class="fiche"><h3><span class="pastille${m.tirets ? " tirets" : ""}" style="color:${css(m.couleur)}"></span>${nomModele(m.code)}${m.tag ? ` <span class="etiquette-test">${t(m.tag)}</span>` : ""}</h3><p>${t("desc_" + m.code)}</p></div>`);
  fiches.push(`<div class="fiche"><h3><span class="pastille points" style="color:${css("--muted")}"></span>${t("hier_court")}</h3><p>${t("desc_hier")}</p></div>`);
  document.getElementById("fiches-modeles").innerHTML = fiches.join("");
  document.getElementById("points-methode").innerHTML = TXT[etat.langue].points.map((p) => `<li>${p.replace("{d}", dateLongue(etat.donnees.debut_direct))}</li>`).join("");
}

function toutAfficher() {
  document.documentElement.lang = etat.langue;
  document.title = t("titre");
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
  document.getElementById("langue").textContent = etat.langue === "fr" ? "EN" : "FR";
  const maj = new Date(etat.donnees.maj);
  document.getElementById("maj").textContent = t("maj", { d: maj.toLocaleString(loc(), { dateStyle: "long", timeStyle: "short" }) });
  document.getElementById("pied").textContent = t("pied");
  sectionDemain(); sectionJour(); sectionHistorique(); sectionMethode();
}

function demarrer() {
  etat.langue = lire("langue") || "fr";
  const th = lire("theme");
  if (th) document.documentElement.dataset.theme = th;
  document.getElementById("langue").addEventListener("click", () => { etat.langue = etat.langue === "fr" ? "en" : "fr"; ecrireLocal("langue", etat.langue); toutAfficher(); });
  document.getElementById("theme").addEventListener("click", () => {
    const sombre = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = sombre ? "light" : "dark"; ecrireLocal("theme", document.documentElement.dataset.theme); toutAfficher();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (etat.donnees) toutAfficher(); });
  const choix = document.getElementById("choix-jour");
  choix.addEventListener("change", () => { etat.jour = choix.value; sectionJour(); });
  const pas = (d) => { const js = joursAvecPrix(), i = js.findIndex((j) => j.jour === etat.jour) + d; if (js[i]) { etat.jour = js[i].jour; sectionJour(); } };
  document.getElementById("jour-prec").addEventListener("click", () => pas(-1));
  document.getElementById("jour-suiv").addEventListener("click", () => pas(1));
  fetch("data/donnees.json", { cache: "no-store" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => { etat.donnees = d; toutAfficher(); })
    .catch(() => { document.querySelector("main").innerHTML = `<p class="carte">${t("chargement")}</p>`; });
}
document.addEventListener("DOMContentLoaded", demarrer);
