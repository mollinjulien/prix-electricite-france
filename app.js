/* Site « Prix de l'électricité de demain » : lit data/donnees.json (écrit chaque jour par site_web.py) et dessine onglets, tableaux et graphiques (Chart.js). */
"use strict";

const TXT = {
  fr: {
    titre: "Prix de l'électricité de demain en France",
    sous_titre: "Chaque matin, trois modèles de machine learning prévoient le prix de l'électricité du lendemain en France (enchère day-ahead EPEX, au quart d'heure), avant sa publication vers 12 h 45. Ils sont ensuite comparés au prix fixé par le marché.",
    o_prevision: "Prévision", o_historique: "Historique", o_performance: "Performance", o_modeles: "Les modèles",
    maj: "site mis à jour le {d}",
    prix_du: "Prix du {d}",
    b_demain: "demain", b_aujourdhui: "aujourd'hui", b_passe: "jour passé",
    retard: "La prévision du {d} n'est pas encore publiée : elle est normalement calculée vers 10 h. Le site affiche la dernière prévision disponible.",
    etat_du_jour: "État de la prévision",
    prix_du_jour: "Prix de la journée, en €/MWh (heure de Paris)",
    p_quart: "Quart d'heure", p_heure: "Heure", p_jour: "Moyenne par jour",
    note_prev_attente: "Le prix du marché s'ajoutera au tableau et au graphique dès sa publication (vers 12 h 45 la veille, récupéré vers 13 h 30).",
    note_prev_reel: "Le prix du marché est publié : comparez les courbes, ou ouvrez l'onglet Historique pour les écarts détaillés.",
    ck_prix_veille: "Prix des jours passés", ck_prix_veille_d: "connus jusqu'au {d}",
    ck_conso: "Consommation prévue par RTE", ck_conso_d: "{x} GW en moyenne",
    ck_gaz: "Prix du gaz (TTF)", ck_gaz_d: "clôture du {d} · {s}",
    ck_meteo: "Météo GFS (NOAA)", ck_meteo_d: "run du {d} à 00 h UTC · {h} heures sur {n}",
    ck_prod: "Production solaire et éolienne prévue", ck_prod_d: "solaire {s} GWh · éolien {e} GWh",
    ck_modeles: "Modèles calculés", ck_modeles_ok: "les trois modèles ont tourné", ck_modeles_part: "{l} calculés · {m} absent",
    ck_publie: "Prévision publiée", ck_publie_avant: "le {d}, avant l'enchère de 12 h 45", ck_publie_apres: "le {d}, après l'enchère de 12 h 45 (rejeu)",
    ck_reel: "Prix réel du marché", ck_reel_d: "reçu le {d}", ck_reel_fichier: "reçu", ck_reel_attente: "attendu vers 12 h 45 le {d}",
    ck_reel_cours: "publié à 12 h 45, récupération vers 13 h 30", ck_reel_retard: "pas encore reçu",
    ck_rejeu: "Journée rejouée a posteriori", ck_rejeu_d: "avant la mise en ligne, avec exactement la méthode du service",
    ck_inconnu: "non enregistré",
    prix_moyen: "prix moyen prévu", marche_moyen: "Prix moyen du marché", veille: "Prix moyen de la veille",
    moins_plus: "Heure la moins chère · la plus chère", selon_principal: "selon le modèle principal",
    fourchette: "Fourchette indicative (80 % des écarts passés)",
    marche: "Marché (prix réel)", marche_court: "Marché", hier: "Même quart d'heure la veille", hier_court: "Repère « hier »", veille_court: "Veille",
    heure: "Heure", prevu: "prévu", ecart: "écart €", ecart_pc: "écart %",
    erreur_moy: "erreur moyenne", erreur_rel: "erreur relative", err_e: "erreur €", err_pc: "erreur %",
    m_jour: "Un jour", m_plage: "Plusieurs jours",
    source_direct: "prévision publiée la veille", source_rejeu: "rejoué a posteriori",
    hist_quart: "Quart d'heure par quart d'heure", hist_heure: "Heure par heure",
    pas_de_reel: "Le prix du marché de ce jour n'est pas encore publié : seules les prévisions sont affichées.",
    note_ecarts: "Écart = prix prévu − prix du marché (positif : on a vu trop haut). L'écart en % est marqué « n.s. » quand le prix du marché est sous 20 €/MWh : diviser par un prix proche de zéro n'a pas de sens.",
    p_7: "7 jours", p_30: "30 jours", p_tout: "Tout", du: "du", au: "au",
    plage_titre: "{n} jours, du {a} au {b}",
    jour_par_jour: "Jour par jour",
    clic_jour: "Cliquez sur une ligne pour ouvrir ce jour dans le détail.",
    date: "Date", source: "Source", rejeu: "rejeu", direct: "direct", meilleur: "meilleur",
    intro_perf: "Erreur de chaque modèle par rapport au prix du marché, au quart d'heure. Plus c'est bas, mieux c'est. L'erreur relative rapporte la somme des erreurs à la somme des prix. Le gain se mesure contre le repère naïf « même quart d'heure la veille ».",
    pf_tout: "Tout l'historique", pf_30: "30 derniers jours", pf_direct: "Depuis la mise en ligne",
    aucun_direct: "Pas encore de jour prévu en direct : les premières prévisions publiées commencent le {d}.",
    c_modele: "Modèle", c_mae: "Erreur moyenne", c_rel: "Erreur relative", c_biais: "Biais", c_rmse: "Erreur quadratique", c_meilleur: "Meilleur des 3", c_gain: "Gain contre « hier »",
    jours_n: "{n} jours",
    perf_jours: "Erreur moyenne de chaque jour (€/MWh)",
    perf_heures: "À quelle heure se trompe-t-on ? Erreur moyenne par heure de la journée (€/MWh)",
    perf_difficiles: "Les jours les plus difficiles (modèle principal)",
    mise_en_ligne: "mise en ligne",
    m_qui: "Les trois modèles et le repère",
    m_chaine: "Ce qui se passe chaque jour",
    m_lexique: "Petit lexique",
    m_limites: "Limites, sources et méthode",
    nom_GR: "Tout GFS + gaz", nom_CR: "Avec notre prévision de production", nom_GT: "Prix rapporté au gaz",
    tag_principal: "principal", tag_test: "en test",
    f_GR: ["Le modèle principal. Il apprend le lien entre le prix et ce qu'on sait la veille : prévisions météo GFS (soleil, vent, température), consommation prévue par RTE, jour de la semaine et jours fériés, prix des jours passés et prix du gaz.",
           "Algorithme : LightGBM (arbres de décision en série). Réentraîné chaque matin sur toutes les heures depuis 2020, en donnant plus de poids aux années récentes.",
           "Test sur 2026, réentraîné chaque jour : 18,5 €/MWh d'erreur moyenne, contre 27,9 pour « même heure la veille »."],
    f_CR: ["Comme le principal, mais le soleil et le vent bruts sont remplacés par la production solaire et éolienne prévue par nos propres modèles de production (appris eux aussi sur GFS).",
           "Idée : le prix dépend de la production renouvelable, autant la prévoir d'abord. En pratique, elle vient de la même météo et n'apporte pas d'information nouvelle.",
           "Test sur 2026 : 18,8 €/MWh, un peu moins bon que le principal (0,3 €/MWh d'écart, significatif)."],
    f_GT: ["Comme le principal, mais le modèle apprend le prix divisé par le coût du gaz pour une centrale (prix du gaz TTF ÷ 0,55), puis le remultiplie. Ainsi, ce qu'il a appris quand le gaz était bon marché reste valable quand il est cher.",
           "Il réagit plus fort au vent : très bon les jours où le prix s'effondre toute la journée, moins bon quand seul l'après-midi s'effondre.",
           "En observation depuis le 23/10/2026 : 4 % de mieux que le principal de septembre à octobre, mais pas encore démontré statistiquement."],
    f_hier: ["Repère naïf, sans modèle : le prix de demain sera celui d'aujourd'hui au même quart d'heure. Un modèle utile doit faire mieux."],
    etapes: [
      ["Vers 10 h, la veille", "Mise à jour des données : prix des jours passés, consommation et prévision de consommation de RTE, production régionale récente, prix du gaz."],
      ["Météo de demain", "Téléchargement du dernier run de minuit du modèle météo GFS (NOAA) : rayonnement, vent à 100 m, température, nuages, pression sur la France."],
      ["Production prévue", "Nos modèles de production transforment la météo en production solaire et éolienne par région (utilisée par le modèle « avec notre prévision de production »)."],
      ["Prix horaire", "Les trois modèles sont réentraînés sur tout l'historique jusqu'à minuit, puis prévoient le prix de chaque heure de demain."],
      ["Quart d'heure", "Un second modèle répartit chaque heure en quatre quarts d'heure (le prix varie dans l'heure, surtout matin et soir)."],
      ["Publication", "Le site est mis à jour, avant l'enchère de 12 h 45."],
      ["Vers 13 h 30", "Le prix fixé par le marché est récupéré : le site ajoute la courbe réelle et calcule les écarts."],
    ],
    lexique: [
      ["Prix day-ahead", "Prix de l'électricité pour chaque quart d'heure du lendemain, fixé la veille vers 12 h 45 par une enchère (EPEX SPOT) où producteurs et acheteurs déposent leurs offres."],
      ["€/MWh", "Euros par mégawattheure. 100 €/MWh = 10 centimes le kWh, avant taxes et acheminement."],
      ["GFS", "Global Forecast System, le modèle de prévision météo mondial de l'agence américaine NOAA, gratuit et archivé depuis 2015."],
      ["TTF", "Prix de référence du gaz naturel en Europe. Une centrale à gaz fixe souvent le prix de l'électricité : son coût de combustible ≈ prix du gaz ÷ 0,55."],
      ["Écrêtement", "Quand le soleil et le vent produisent plus que ce que le pays consomme et peut exporter, le prix tombe près de 0, voire en dessous."],
      ["Erreur moyenne", "Moyenne des écarts absolus entre prix prévu et prix du marché. Une erreur de 20 €/MWh signifie qu'on se trompe en moyenne de 20 € par MWh."],
    ],
    limites: [
      "La prévision n'utilise que des données connues la veille au matin : prix passés, prévisions météo et prévision de consommation. Aucun prix du jour prévu n'entre dans les modèles.",
      "Les modèles n'ont appris que sur des prévisions météo archivées (GFS depuis 2020), jamais sur la météo observée : ce qu'ils voient à l'entraînement ressemble à ce qu'ils voient en service.",
      "Limite connue : les effondrements de prix par grand vent (prix proches de 0 pendant quelques heures) sont mal anticipés, surtout quand le marché est cher.",
      "Non pris en compte : disponibilité du nucléaire, prix et météo des pays voisins, prix du CO₂ (testés : pas de gain mesurable).",
      "Historique : avant le {d}, les jours sont rejoués a posteriori avec exactement la méthode du service ; à partir de cette date, ce sont les prévisions publiées en direct, la veille.",
      "Sources : prix EPEX SPOT via Energy-Charts (Fraunhofer ISE) ; consommation et production RTE (ODRÉ, éCO2mix) ; météo NOAA GFS ; gaz TTF (Yahoo Finance).",
      "Projet étudiant (emlyon business school). Les modèles et ce site ont été construits avec l'aide de Claude (Anthropic). Ce n'est pas un conseil d'investissement.",
    ],
    pied: "Projet étudiant (emlyon business school), réalisé avec l'aide de Claude (Anthropic). Ces prévisions ne constituent pas un conseil d'investissement. Prix du marché : EPEX SPOT via Energy-Charts.info (Fraunhofer ISE).",
    chargement: "Impossible de charger les données.",
    unite: "€/MWh",
  },
  en: {
    titre: "Tomorrow's electricity price in France",
    sous_titre: "Every morning, three machine-learning models forecast the next day's French electricity price (EPEX day-ahead auction, 15-minute resolution) before it is published around 12:45. They are then compared with the price set by the market.",
    o_prevision: "Forecast", o_historique: "History", o_performance: "Performance", o_modeles: "The models",
    maj: "site updated {d}",
    prix_du: "Prices for {d}",
    b_demain: "tomorrow", b_aujourdhui: "today", b_passe: "past day",
    retard: "The forecast for {d} is not published yet: it is normally computed around 10:00. The site shows the latest available forecast.",
    etat_du_jour: "Forecast status",
    prix_du_jour: "Prices over the day, €/MWh (Paris time)",
    p_quart: "Quarter-hour", p_heure: "Hour", p_jour: "Daily average",
    note_prev_attente: "The market price will be added to the table and chart once published (around 12:45 the day before, fetched around 13:30).",
    note_prev_reel: "The market price is out: compare the curves, or open the History tab for detailed errors.",
    ck_prix_veille: "Past prices", ck_prix_veille_d: "known up to {d}",
    ck_conso: "RTE load forecast", ck_conso_d: "{x} GW on average",
    ck_gaz: "Gas price (TTF)", ck_gaz_d: "close of {d} · {s}",
    ck_meteo: "GFS weather (NOAA)", ck_meteo_d: "run of {d} 00 UTC · {h} hours out of {n}",
    ck_prod: "Forecast solar and wind output", ck_prod_d: "solar {s} GWh · wind {e} GWh",
    ck_modeles: "Models computed", ck_modeles_ok: "all three models ran", ck_modeles_part: "{l} computed · {m} missing",
    ck_publie: "Forecast published", ck_publie_avant: "{d}, before the 12:45 auction", ck_publie_apres: "{d}, after the 12:45 auction (replay)",
    ck_reel: "Actual market price", ck_reel_d: "received {d}", ck_reel_fichier: "received", ck_reel_attente: "expected around 12:45 on {d}",
    ck_reel_cours: "published at 12:45, fetched around 13:30", ck_reel_retard: "not received yet",
    ck_rejeu: "Day replayed afterwards", ck_rejeu_d: "before going live, with exactly the service's method",
    ck_inconnu: "not recorded",
    prix_moyen: "average forecast price", marche_moyen: "Average market price", veille: "Previous day's average",
    moins_plus: "Cheapest · most expensive hour", selon_principal: "according to the main model",
    fourchette: "Indicative range (80% of past errors)",
    marche: "Market (actual price)", marche_court: "Market", hier: "Same quarter-hour the day before", hier_court: "\"Yesterday\" benchmark", veille_court: "Day before",
    heure: "Time", prevu: "forecast", ecart: "error €", ecart_pc: "error %",
    erreur_moy: "mean error", erreur_rel: "relative error", err_e: "error €", err_pc: "error %",
    m_jour: "One day", m_plage: "Several days",
    source_direct: "forecast published the day before", source_rejeu: "replayed afterwards",
    hist_quart: "Quarter-hour by quarter-hour", hist_heure: "Hour by hour",
    pas_de_reel: "The market price for this day is not published yet: only forecasts are shown.",
    note_ecarts: "Error = forecast − market price (positive: forecast too high). The % error is marked \"n.s.\" when the market price is below 20 €/MWh: dividing by a price close to zero is meaningless.",
    p_7: "7 days", p_30: "30 days", p_tout: "All", du: "from", au: "to",
    plage_titre: "{n} days, from {a} to {b}",
    jour_par_jour: "Day by day",
    clic_jour: "Click a row to open that day in detail.",
    date: "Date", source: "Source", rejeu: "replay", direct: "live", meilleur: "best",
    intro_perf: "Error of each model against the market price, per quarter-hour. Lower is better. The relative error divides the sum of errors by the sum of prices. The gain is measured against the naive \"same quarter-hour the day before\" benchmark.",
    pf_tout: "Full history", pf_30: "Last 30 days", pf_direct: "Since going live",
    aucun_direct: "No live day yet: the first published forecasts start on {d}.",
    c_modele: "Model", c_mae: "Mean error", c_rel: "Relative error", c_biais: "Bias", c_rmse: "Root mean square error", c_meilleur: "Best of the 3", c_gain: "Gain over \"yesterday\"",
    jours_n: "{n} days",
    perf_jours: "Mean error of each day (€/MWh)",
    perf_heures: "When are we wrong? Mean error by hour of the day (€/MWh)",
    perf_difficiles: "The hardest days (main model)",
    mise_en_ligne: "live",
    m_qui: "The three models and the benchmark",
    m_chaine: "What happens every day",
    m_lexique: "Glossary",
    m_limites: "Limitations, sources and method",
    nom_GR: "All-GFS + gas", nom_CR: "With our production forecast", nom_GT: "Gas-relative price",
    tag_principal: "main", tag_test: "testing",
    f_GR: ["The main model. It learns the link between the price and what is known the day before: GFS weather forecasts (sun, wind, temperature), RTE load forecast, weekday and holidays, past prices and the gas price.",
           "Algorithm: LightGBM (boosted decision trees). Retrained every morning on every hour since 2020, with more weight on recent years.",
           "2026 test, retrained daily: 18.5 €/MWh mean error, versus 27.9 for \"same hour the day before\"."],
    f_CR: ["Like the main model, but raw sun and wind are replaced by the solar and wind output forecast by our own production models (also trained on GFS).",
           "Idea: the price depends on renewable output, so forecast it first. In practice it comes from the same weather and adds no new information.",
           "2026 test: 18.8 €/MWh, slightly worse than the main model (0.3 €/MWh, significant)."],
    f_GT: ["Like the main model, but it learns the price divided by the fuel cost of a gas plant (TTF gas price ÷ 0.55), then multiplies back. What it learned when gas was cheap thus still applies when gas is expensive.",
           "It reacts more strongly to wind: very good when the price collapses all day long, worse when only the afternoon collapses.",
           "Under observation since 23/10/2026: 4% better than the main model in September-October, but not yet statistically proven."],
    f_hier: ["Naive benchmark, no model: tomorrow's price equals today's at the same quarter-hour. A useful model must beat it."],
    etapes: [
      ["Around 10:00, the day before", "Data update: past prices, RTE load and load forecast, recent regional output, gas price."],
      ["Tomorrow's weather", "Download of the latest midnight run of the GFS weather model (NOAA): radiation, 100 m wind, temperature, clouds, pressure over France."],
      ["Forecast output", "Our production models turn the weather into solar and wind output per region (used by the \"with our production forecast\" model)."],
      ["Hourly price", "The three models are retrained on the full history up to midnight, then forecast the price of each hour of tomorrow."],
      ["Quarter-hour", "A second model splits each hour into four quarter-hours (prices move within the hour, especially morning and evening)."],
      ["Publication", "The site is updated, before the 12:45 auction."],
      ["Around 13:30", "The market price is fetched: the site adds the actual curve and computes the errors."],
    ],
    lexique: [
      ["Day-ahead price", "Electricity price for each quarter-hour of the next day, set the day before around 12:45 by an auction (EPEX SPOT) where producers and buyers submit bids."],
      ["€/MWh", "Euros per megawatt-hour. 100 €/MWh = 10 cents per kWh, before taxes and grid fees."],
      ["GFS", "Global Forecast System, the global weather model of the US agency NOAA, free and archived since 2015."],
      ["TTF", "Europe's benchmark natural gas price. A gas plant often sets the electricity price: its fuel cost ≈ gas price ÷ 0.55."],
      ["Curtailment", "When sun and wind produce more than the country consumes and can export, the price drops close to 0 or even below."],
      ["Mean error", "Average absolute gap between forecast and market price. A 20 €/MWh error means being 20 € per MWh off on average."],
    ],
    limites: [
      "The forecast only uses data known on the morning before: past prices, weather forecasts and load forecast. No price of the forecast day enters the models.",
      "The models were trained only on archived weather forecasts (GFS since 2020), never on observed weather: what they see in training matches what they see in service.",
      "Known limitation: price collapses during very windy periods (prices near 0 for a few hours) are poorly anticipated, especially when the market is expensive.",
      "Not included: nuclear availability, neighbouring countries' prices and weather, CO₂ price (tested: no measurable gain).",
      "History: before {d}, days are replayed afterwards with exactly the service's method; from that date on, they are the forecasts published live, the day before.",
      "Sources: EPEX SPOT prices via Energy-Charts (Fraunhofer ISE); RTE load and output (ODRÉ, éCO2mix); NOAA GFS weather; TTF gas (Yahoo Finance).",
      "Student project (emlyon business school). The models and this site were built with the help of Claude (Anthropic). This is not investment advice.",
    ],
    pied: "Student project (emlyon business school), built with the help of Claude (Anthropic). These forecasts are not investment advice. Market prices: EPEX SPOT via Energy-Charts.info (Fraunhofer ISE).",
    chargement: "Could not load the data.",
    unite: "€/MWh",
  },
};

const MODELES = [
  { code: "GR", couleur: "--s-gr", tirets: null, tag: "tag_principal" },
  { code: "CR", couleur: "--s-cr", tirets: null, tag: null },
  { code: "GT", couleur: "--s-gt", tirets: [6, 4], tag: "tag_test" },
];
const SEUIL_PC = 20;
const etat = { d: null, langue: "fr", onglet: "prevision", jourHist: null, modeHist: "jour", plage: { preset: "7", debut: null, fin: null },
               pasPrev: "quart", pasHist: "quart", pasPlage: "heure", periodePerf: "tout", graphiques: {} };

/* ---------------------------------------------------------------- outils */
const $ = (id) => document.getElementById(id);
function lire(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function ecrireLocal(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible : sans effet */ } }
function t(cle, vars) {
  let s = TXT[etat.langue][cle];
  if (vars && typeof s === "string") for (const [k, v] of Object.entries(vars)) s = s.split("{" + k + "}").join(v);
  return s;
}
const loc = () => (etat.langue === "fr" ? "fr-FR" : "en-GB");
function nombre(v, dec = 1) {
  if (v === null || v === undefined || Number.isNaN(v)) return "–";
  return new Intl.NumberFormat(loc(), { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
}
const signe = (v, dec = 1) => (v === null || v === undefined ? "–" : (v > 0 ? "+" : "") + nombre(v, dec));
const dateObj = (iso) => new Date(iso + "T12:00:00");
const dateLongue = (iso) => dateObj(iso).toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const dateMoyenne = (iso) => dateObj(iso).toLocaleDateString(loc(), { weekday: "short", day: "numeric", month: "short" });
const dateCourte = (iso) => dateObj(iso).toLocaleDateString(loc(), { day: "2-digit", month: "2-digit" });
function dateHeure(iso) {                                           // « 2026-10-23T10:05+02:00 » (heure de Paris) -> « 23/10 à 10:05 »
  if (!iso || iso.length < 16) return "";
  return `${dateCourte(iso.slice(0, 10))} ${etat.langue === "fr" ? "à" : "at"} ${iso.slice(11, 16)}`;
}
function ajouterJours(iso, n) { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
function maintenantParis() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hm: `${p.hour}:${p.minute}` };
}
const css = (nom) => getComputedStyle(document.documentElement).getPropertyValue(nom).trim();
const moyenne = (a) => { const v = (a || []).filter((x) => x !== null && x !== undefined); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
const nomModele = (code) => (code === "hier" ? t("hier_court") : t("nom_" + code));
const jours = () => etat.d.jours;
const joursAvecPrix = () => jours().filter((j) => j.reel);
const jourDe = (iso) => jours().find((j) => j.jour === iso);
const modelesDuJour = (j) => MODELES.filter((m) => j[m.code]);

function parHeure(serie, heures) {                                   // moyenne de chaque heure (24 valeurs ; 25 ou 23 les jours de changement d'heure)
  if (!serie) return null;
  const cles = [], groupes = {};
  heures.forEach((h, i) => { const k = h.slice(0, 2); if (!(k in groupes)) { groupes[k] = []; cles.push(k); } if (serie[i] !== null) groupes[k].push(serie[i]); });
  return cles.map((k) => (groupes[k].length ? groupes[k].reduce((a, b) => a + b, 0) / groupes[k].length : null));
}
function heuresLabels(heures) { return [...new Set(heures.map((h) => h.slice(0, 2)))].map((h) => h + (etat.langue === "fr" ? " h" : ":00")); }
function series(j, pas) {                                           // séries d'un jour, au quart d'heure ou à l'heure
  const cles = ["reel", "hier", "bas", "haut", ...MODELES.map((m) => m.code)];
  if (pas === "quart") return { labels: j.heures, ...Object.fromEntries(cles.map((k) => [k, j[k] || null])) };
  return { labels: heuresLabels(j.heures), ...Object.fromEntries(cles.map((k) => [k, parHeure(j[k], j.heures)])) };
}

function stats(listeJours, cle) {                                    // erreurs au quart d'heure sur plusieurs jours
  let n = 0, sa = 0, s = 0, s2 = 0, sr = 0;
  for (const j of listeJours) {
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
function cellPct(prevu, reel) {
  if (prevu === null || prevu === undefined || reel === null || reel === undefined) return "<td>–</td>";
  if (Math.abs(reel) < SEUIL_PC) return `<td class="ns" title="${t("note_ecarts")}">n.s.</td>`;
  return `<td>${signe((100 * (prevu - reel)) / Math.abs(reel), 0)} %</td>`;
}
function pastille(code) {
  if (code === "reel") return `<span class="pastille" style="color:${css("--ink")}"></span>`;
  if (code === "hier") return `<span class="pastille points" style="color:${css("--muted")}"></span>`;
  const m = MODELES.find((x) => x.code === code);
  return `<span class="pastille${m.tirets ? " tirets" : ""}" style="color:${css(m.couleur)}"></span>`;
}
const etiquette = (m) => (m.tag ? ` <span class="etiquette">${t(m.tag)}</span>` : "");
function segments(id, liste, valeur, rappel) {
  const el = $(id);
  el.innerHTML = liste.map(([k, lib]) => `<button type="button" data-v="${k}" aria-pressed="${k === valeur}">${lib}</button>`).join("");
  el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => rappel(b.dataset.v)));
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
function options(maxTicks) {
  const muted = css("--muted");
  return {
    responsive: true, maintainAspectRatio: false, animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top", align: "start", labels: { color: css("--ink-2"), boxWidth: 16, boxHeight: 3, padding: 12, filter: (it) => !it.text.startsWith("_") } },
      tooltip: {
        filter: (it) => !it.dataset.label.startsWith("_") && it.dataset.label !== t("fourchette") && it.parsed.y !== null,
        callbacks: { label: (c) => ` ${c.dataset.label}${etat.langue === "fr" ? " : " : ": "}${nombre(c.parsed.y)} ${t("unite")}` },
      },
      marqueur: {},
    },
    scales: {
      x: { ticks: { color: muted, maxRotation: 0, autoSkip: true, maxTicksLimit: innerWidth < 600 ? 6 : maxTicks || 12 }, grid: { display: false }, border: { color: css("--axis") } },
      y: { ticks: { color: muted, callback: (v) => nombre(v, 0) }, grid: { color: css("--grid") }, border: { display: false }, title: { display: true, text: t("unite"), color: muted } },
    },
    elements: { point: { radius: 0, hoverRadius: 3 }, line: { borderWidth: 2, tension: 0 } },
  };
}
function dsModele(m, data, extra = {}) {
  const c = css(m.couleur);
  return { label: nomModele(m.code) + (m.tag === "tag_test" ? " (" + t("tag_test") + ")" : ""), data, borderColor: c, backgroundColor: c, borderDash: m.tirets || [], fill: false, spanGaps: true, ...extra };
}
const dsMarche = (data) => ({ label: t("marche"), data, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 2.5, fill: false, spanGaps: true });
const dsHier = (data) => ({ label: t("hier"), data, borderColor: css("--muted"), backgroundColor: css("--muted"), borderWidth: 1.5, borderDash: [2, 3], fill: false });
function dsBande(bas, haut) {
  return [{ label: "_bas", data: bas, borderWidth: 0, pointRadius: 0, fill: false },
          { label: t("fourchette"), data: haut, borderWidth: 0, pointRadius: 0, backgroundColor: css("--bande"), borderColor: css("--bande"), fill: "-1" }];
}
function dessiner(id, config) {
  if (etat.graphiques[id]) etat.graphiques[id].destroy();
  etat.graphiques[id] = new Chart($(id), config);
  return etat.graphiques[id];
}
function lier(chart, tableId) {                                      // survol du tableau <-> point du graphique
  const table = $(tableId), cadre = table.parentElement;
  const surligner = (i) => {
    table.querySelectorAll("tr.actif").forEach((r) => r.classList.remove("actif"));
    if (i === null) return;
    const r = table.querySelector(`tbody tr[data-i="${i}"]`);
    if (!r) return;
    r.classList.add("actif");
    const entete = table.tHead ? table.tHead.offsetHeight : 0;
    if (r.offsetTop - entete < cadre.scrollTop || r.offsetTop + r.offsetHeight > cadre.scrollTop + cadre.clientHeight) cadre.scrollTop = r.offsetTop - entete - cadre.clientHeight / 3;
  };
  chart.options.onHover = (evt, els) => { if (!table.matches(":hover")) surligner(els.length ? els[0].index : null); };
  chart.update("none");
  table.querySelectorAll("tbody tr").forEach((r) => {
    r.addEventListener("mouseenter", () => {
      const i = +r.dataset.i;
      const els = chart.data.datasets.map((ds, k) => ({ datasetIndex: k, index: i }))
        .filter((e) => { const ds = chart.data.datasets[e.datasetIndex]; return !ds.label.startsWith("_") && ds.label !== t("fourchette") && ds.data[i] !== null && ds.data[i] !== undefined; });
      chart.setActiveElements(els);
      chart.tooltip.setActiveElements(els, { x: chart.scales.x.getPixelForValue(i), y: chart.chartArea.top + 10 });
      chart.update("none");
    });
  });
  table.addEventListener("mouseleave", () => { chart.setActiveElements([]); chart.tooltip.setActiveElements([], { x: 0, y: 0 }); chart.update("none"); });
}

/* ---------------------------------------------------------------- onglet Prévision */
function coches(j) {
  const L = [], ok = (lib, det) => L.push(["ok", "✓", lib, det]), att = (lib, det) => L.push(["attente", "…", lib, det]),
        al = (lib, det) => L.push(["alerte", "!", lib, det]), ko = (lib, det) => L.push(["echec", "✕", lib, det]), inf = (lib, det) => L.push(["info", "i", lib, det]);
  const veille = ajouterJours(j.jour, -1), now = maintenantParis();
  if (j.source === "rejeu") {
    inf(t("ck_rejeu"), t("ck_rejeu_d"));
  } else {
    const c = j.controles || {};
    c.prix_connus_jusqu ? ok(t("ck_prix_veille"), t("ck_prix_veille_d", { d: dateHeure(c.prix_connus_jusqu.replace(" ", "T")) })) : inf(t("ck_prix_veille"), t("ck_inconnu"));
    c.conso_rte_GW ? ok(t("ck_conso"), t("ck_conso_d", { x: nombre(c.conso_rte_GW) })) : inf(t("ck_conso"), t("ck_inconnu"));
    const g = j.gaz || {};
    const dg = g.cloture ? t("ck_gaz_d", { d: dateCourte(g.cloture), s: g.source || "" }) : t("ck_inconnu");
    if (g.niveau === "normal") ok(t("ck_gaz"), dg); else if (g.niveau === "orange") al(t("ck_gaz"), g.message || dg); else if (g.niveau === "rouge") ko(t("ck_gaz"), g.message || dg); else inf(t("ck_gaz"), dg);
    const m = c.meteo;
    if (m) (m.heures_sans_valeur ? al : ok)(t("ck_meteo"), t("ck_meteo_d", { d: dateCourte(m.run.slice(0, 10)), h: m.heures - m.heures_sans_valeur, n: m.heures }));
    else inf(t("ck_meteo"), t("ck_inconnu"));
    const p = c.production_GWh;
    p ? ok(t("ck_prod"), t("ck_prod_d", { s: nombre(p.solaire, 0), e: nombre(p.eolien, 0) })) : inf(t("ck_prod"), t("ck_inconnu"));
    const presents = modelesDuJour(j), absents = MODELES.filter((x) => !j[x.code]);
    if (!absents.length) ok(t("ck_modeles"), t("ck_modeles_ok"));
    else al(t("ck_modeles"), t("ck_modeles_part", { l: presents.map((x) => x.code).join(", "), m: absents.map((x) => x.code).join(", ") }));
    if (j.genere) {
      const avant = j.genere.slice(0, 16) <= `${veille}T12:45`;
      (avant ? ok : al)(t("ck_publie"), t(avant ? "ck_publie_avant" : "ck_publie_apres", { d: dateHeure(j.genere) }));
    } else inf(t("ck_publie"), t("ck_inconnu"));
  }
  if (j.reel) ok(t("ck_reel"), j.reel_recu && j.reel_recu !== "fichier" ? t("ck_reel_d", { d: dateHeure(j.reel_recu) }) : t("ck_reel_fichier"));
  else if (now.date < veille || (now.date === veille && now.hm < "12:45")) att(t("ck_reel"), t("ck_reel_attente", { d: dateCourte(veille) }));
  else if (now.date === veille && now.hm < "14:30") att(t("ck_reel"), t("ck_reel_cours"));
  else al(t("ck_reel"), t("ck_reel_retard"));
  return L.map(([cls, sym, lib, det]) => `<li><span class="coche ${cls}" aria-hidden="true">${sym}</span><span><span class="libelle">${lib}</span><span class="detail">${det}</span></span></li>`).join("");
}

function tuilesPrevision(j) {
  const T = [];
  for (const m of modelesDuJour(j)) {
    T.push(`<div class="tuile"><div class="libelle">${pastille(m.code)}${nomModele(m.code)}${etiquette(m)}</div>
      <div class="valeur">${nombre(moyenne(j[m.code]))} <small>${t("unite")}</small></div><div class="detail">${t("prix_moyen")}</div></div>`);
  }
  if (j.reel) T.push(`<div class="tuile"><div class="libelle">${pastille("reel")}${t("marche_moyen")}</div><div class="valeur">${nombre(moyenne(j.reel))} <small>${t("unite")}</small></div><div class="detail">${dateCourte(j.jour)}</div></div>`);
  T.push(`<div class="tuile"><div class="libelle">${pastille("hier")}${t("veille")}</div><div class="valeur">${nombre(moyenne(j.hier))} <small>${t("unite")}</small></div><div class="detail">${t("hier")}</div></div>`);
  if (j.GR) {
    const h = parHeure(j.GR, j.heures), lab = heuresLabels(j.heures), v = h.filter((x) => x !== null);
    const iMin = h.indexOf(Math.min(...v)), iMax = h.indexOf(Math.max(...v));
    T.push(`<div class="tuile"><div class="libelle">${t("moins_plus")}</div><div class="valeur">${lab[iMin]} · ${lab[iMax]}</div><div class="detail">${nombre(h[iMin], 0)} € · ${nombre(h[iMax], 0)} €, ${t("selon_principal")}</div></div>`);
  }
  return T.join("");
}

function rendrePrevision() {
  const js = jours(), j = js[js.length - 1], now = maintenantParis(), demain = ajouterJours(now.date, 1);
  const bandeau = $("bandeau-retard");
  bandeau.hidden = !(j.jour < demain && now.hm >= "11:00");
  if (!bandeau.hidden) bandeau.textContent = "⚠ " + t("retard", { d: dateLongue(demain) });
  $("prev-titre").textContent = t("prix_du", { d: dateLongue(j.jour) });
  const badge = $("prev-badge");
  badge.textContent = j.jour === demain ? t("b_demain") : j.jour === now.date ? t("b_aujourdhui") : t("b_passe");
  badge.className = "badge" + (j.jour === demain ? " fort" : "");
  $("maj").textContent = t("maj", { d: new Date(etat.d.maj).toLocaleString(loc(), { dateStyle: "long", timeStyle: "short" }) });
  $("prev-coches").innerHTML = coches(j);
  $("prev-tuiles").innerHTML = tuilesPrevision(j);
  segments("prev-pas", [["quart", t("p_quart")], ["heure", t("p_heure")]], etat.pasPrev, (v) => { etat.pasPrev = v; rendrePrevision(); });
  const s = series(j, etat.pasPrev), ms = modelesDuJour(j);
  let h = `<thead><tr><th>${t("heure")}</th>${ms.map((m) => `<th>${pastille(m.code)} ${m.code}</th>`).join("")}${s.reel ? `<th>${pastille("reel")} ${t("marche_court")}</th>` : ""}<th>${pastille("hier")} ${t("veille_court")}</th></tr></thead><tbody>`;
  s.labels.forEach((lab, i) => {
    h += `<tr data-i="${i}"><td>${lab}</td>${ms.map((m) => `<td>${nombre(s[m.code][i])}</td>`).join("")}${s.reel ? `<td class="reel">${nombre(s.reel[i])}</td>` : ""}<td>${nombre(s.hier[i])}</td></tr>`;
  });
  $("prev-table").innerHTML = h + "</tbody>";
  const ds = [];
  if (s.bas && s.haut) ds.push(...dsBande(s.bas, s.haut));
  if (s.reel) ds.push(dsMarche(s.reel));
  for (const m of ms) ds.push(dsModele(m, s[m.code]));
  ds.push(dsHier(s.hier));
  const ch = dessiner("prev-graphique", { type: "line", data: { labels: s.labels, datasets: ds }, options: options(13), plugins: [curseur] });
  $("prev-graphique").setAttribute("aria-label", $("prev-titre").textContent);
  lier(ch, "prev-table");
  $("prev-note").textContent = t(j.reel ? "note_prev_reel" : "note_prev_attente");
}

/* ---------------------------------------------------------------- onglet Historique */
function rendreHistorique() {
  segments("hist-mode", [["jour", t("m_jour")], ["plage", t("m_plage")]], etat.modeHist, (v) => { location.hash = v === "plage" ? "#historique/plage" : "#historique/" + (etat.jourHist || ""); });
  $("hist-jour").hidden = etat.modeHist !== "jour";
  $("hist-plage").hidden = etat.modeHist !== "plage";
  if (etat.modeHist === "jour") rendreJour(); else rendrePlage();
}

function rendreJour() {
  const js = jours();
  if (!etat.jourHist || !jourDe(etat.jourHist)) { const a = joursAvecPrix(); etat.jourHist = (a.length ? a[a.length - 1] : js[js.length - 1]).jour; }
  const j = jourDe(etat.jourHist), i = js.indexOf(j);
  const inp = $("hist-date");
  inp.min = js[0].jour; inp.max = js[js.length - 1].jour; inp.value = j.jour;
  $("hist-prec").disabled = i === 0; $("hist-suiv").disabled = i === js.length - 1;
  $("hist-badge").textContent = `${dateLongue(j.jour)} · ${t(j.source === "direct" ? "source_direct" : "source_rejeu")}`;
  const ms = modelesDuJour(j), cles = ms.map((m) => m.code).concat(["hier"]);
  const best = j.erreurs ? ms.map((m) => m.code).reduce((a, b) => (j.erreurs[b].mae < j.erreurs[a].mae ? b : a)) : null;
  const T = [];
  if (j.reel) T.push(`<div class="tuile"><div class="libelle">${pastille("reel")}${t("marche_moyen")}</div><div class="valeur">${nombre(moyenne(j.reel))} <small>${t("unite")}</small></div><div class="detail">${dateCourte(j.jour)}</div></div>`);
  for (const c of cles) {
    const m = MODELES.find((x) => x.code === c), e = j.erreurs && j.erreurs[c];
    T.push(`<div class="tuile"><div class="libelle">${pastille(c)}${nomModele(c)}${m ? etiquette(m) : ""}${c === best ? ` <span class="etiquette">${t("meilleur")}</span>` : ""}</div>`
      + (e ? `<div class="valeur">${nombre(e.mae)} <small>€ · ${nombre(e.rel, 0)} %</small></div><div class="detail">${t("erreur_moy")} · ${t("erreur_rel")}</div>`
           : `<div class="valeur">${nombre(moyenne(c === "hier" ? j.hier : j[c]))} <small>${t("unite")}</small></div><div class="detail">${t("prix_moyen")}</div>`) + "</div>");
  }
  $("hist-tuiles").innerHTML = T.join("");
  segments("hist-pas", [["quart", t("p_quart")], ["heure", t("p_heure")]], etat.pasHist, (v) => { etat.pasHist = v; rendreJour(); });
  $("hist-sous-titre").textContent = j.reel ? t(etat.pasHist === "quart" ? "hist_quart" : "hist_heure") : t("pas_de_reel");
  const s = series(j, etat.pasHist), colonnes = ms.map((m) => m.code);        // le repère « hier » reste dans les tuiles et le graphique
  let h = `<thead><tr><th rowspan="2">${t("heure")}</th><th rowspan="2">${pastille("reel")} ${t("marche_court")}</th>`
    + colonnes.map((c) => `<th colspan="3" class="groupe">${pastille(c)} ${c}</th>`).join("") + "</tr><tr>"
    + colonnes.map(() => `<th class="groupe">${t("prevu")}</th><th>${t("ecart")}</th><th>${t("ecart_pc")}</th>`).join("") + "</tr></thead><tbody>";
  s.labels.forEach((lab, k) => {
    const r = s.reel ? s.reel[k] : null;
    h += `<tr data-i="${k}"><td>${lab}</td><td class="reel">${nombre(r)}</td>` + colonnes.map((c) => {
      const p = s[c] ? s[c][k] : null;
      return `<td class="groupe">${nombre(p)}</td><td>${r === null || p === null ? "–" : signe(p - r)}</td>${cellPct(p, r)}`;
    }).join("") + "</tr>";
  });
  const tab = $("hist-table");
  tab.innerHTML = h + "</tbody>";
  const l1 = tab.tHead.rows[0].offsetHeight;                         // deuxième ligne d'en-tête collée sous la première
  [...tab.tHead.rows[1].cells].forEach((c) => { c.style.top = l1 + "px"; });
  const ds = [];
  if (s.reel) ds.push(dsMarche(s.reel));
  for (const m of ms) ds.push(dsModele(m, s[m.code]));
  ds.push(dsHier(s.hier));
  const ch = dessiner("hist-graphique", { type: "line", data: { labels: s.labels, datasets: ds }, options: options(9), plugins: [curseur] });
  $("hist-graphique").setAttribute("aria-label", dateLongue(j.jour));
  lier(ch, "hist-table");
}

function bornesPlage() {
  const js = jours(), dernier = js[js.length - 1].jour, premier = js[0].jour;
  if (etat.plage.preset === "perso" && etat.plage.debut && etat.plage.fin) return [etat.plage.debut, etat.plage.fin];
  if (etat.plage.preset === "tout") return [premier, dernier];
  const n = etat.plage.preset === "30" ? 30 : 7, debut = ajouterJours(dernier, -(n - 1));
  return [debut < premier ? premier : debut, dernier];
}
function rendrePlage() {
  segments("plage-presets", [["7", t("p_7")], ["30", t("p_30")], ["tout", t("p_tout")]], etat.plage.preset, (v) => { etat.plage.preset = v; rendrePlage(); });
  const [a, b] = bornesPlage(), js = jours().filter((j) => j.jour >= a && j.jour <= b);
  const d1 = $("plage-debut"), d2 = $("plage-fin");
  for (const el of [d1, d2]) { el.min = jours()[0].jour; el.max = jours()[jours().length - 1].jour; }
  d1.value = a; d2.value = b;
  $("plage-sous-titre").textContent = t("plage_titre", { n: js.length, a: dateCourte(a), b: dateCourte(b) });
  segments("plage-pas", [["heure", t("p_heure")], ["jour", t("p_jour")]], etat.pasPlage, (v) => { etat.pasPlage = v; rendrePlage(); });
  const labels = [], S = { reel: [], ...Object.fromEntries(MODELES.map((m) => [m.code, []])) };
  for (const j of js) {
    if (etat.pasPlage === "jour") {
      labels.push(dateCourte(j.jour));
      S.reel.push(j.reel ? moyenne(j.reel) : null);
      for (const m of MODELES) S[m.code].push(j[m.code] ? moyenne(j[m.code]) : null);
    } else {
      const s = series(j, "heure"), vide = s.labels.map(() => null);
      s.labels.forEach((lab) => labels.push(`${dateCourte(j.jour)} ${lab}`));
      S.reel.push(...(s.reel || vide));
      for (const m of MODELES) S[m.code].push(...(s[m.code] || vide));
    }
  }
  const ds = [dsMarche(S.reel)];
  for (const m of MODELES) if (S[m.code].some((x) => x !== null)) ds.push(dsModele(m, S[m.code], etat.pasPlage === "jour" ? { pointRadius: 2 } : { borderWidth: 1.5 }));
  dessiner("plage-graphique", { type: "line", data: { labels, datasets: ds }, options: options(10), plugins: [curseur] });
  $("plage-graphique").setAttribute("aria-label", $("plage-sous-titre").textContent);
  let h = `<thead><tr><th>${t("date")}</th><th>${t("source")}</th><th>${pastille("reel")} ${t("marche_moyen")}</th>`
    + MODELES.map((m) => `<th class="groupe">${pastille(m.code)} ${m.code} ${t("prevu")}</th><th>${t("err_e")}</th><th>${t("err_pc")}</th>`).join("") + "</tr></thead><tbody>";
  for (const j of [...js].reverse()) {
    const best = j.erreurs ? modelesDuJour(j).map((m) => m.code).reduce((x, y) => (j.erreurs[y].mae < j.erreurs[x].mae ? y : x)) : null;
    h += `<tr data-jour="${j.jour}"><td>${dateMoyenne(j.jour)}</td><td>${t(j.source === "direct" ? "direct" : "rejeu")}</td><td class="reel">${nombre(j.reel ? moyenne(j.reel) : null)}</td>`
      + MODELES.map((m) => {
        const e = j.erreurs && j.erreurs[m.code], fort = m.code === best ? ' style="font-weight:600"' : "";
        return `<td class="groupe">${nombre(j[m.code] ? moyenne(j[m.code]) : null)}</td><td${fort}>${e ? nombre(e.mae) : "–"}</td><td${fort}>${e ? nombre(e.rel, 0) + " %" : "–"}</td>`;
      }).join("") + "</tr>";
  }
  $("plage-table").innerHTML = h + "</tbody>";
  $("plage-table").querySelectorAll("tbody tr").forEach((r) => r.addEventListener("click", () => ouvrirJour(r.dataset.jour)));
}
function ouvrirJour(iso) { etat.jourHist = iso; etat.modeHist = "jour"; location.hash = "#historique/" + iso; }

/* ---------------------------------------------------------------- onglet Performance */
function rendrePerformance() {
  segments("perf-periode", [["tout", t("pf_tout")], ["30", t("pf_30")], ["direct", t("pf_direct")]], etat.periodePerf, (v) => { etat.periodePerf = v; rendrePerformance(); });
  let js = joursAvecPrix();
  if (etat.periodePerf === "30") js = js.slice(-30);
  if (etat.periodePerf === "direct") js = js.filter((j) => j.source === "direct");
  const resume = $("perf-resume");
  if (!js.length) {
    resume.innerHTML = `<tbody><tr><td>${t("aucun_direct", { d: dateLongue(etat.d.debut_direct) })}</td></tr></tbody>`;
    for (const id of ["perf-jours", "perf-heures"]) if (etat.graphiques[id]) { etat.graphiques[id].destroy(); delete etat.graphiques[id]; }
    $("perf-difficiles").innerHTML = "";
    return;
  }
  const codes = MODELES.map((m) => m.code), victoires = Object.fromEntries(codes.map((c) => [c, 0]));
  let nj = 0;
  for (const j of js) { const dispo = codes.filter((c) => j.erreurs[c]); if (!dispo.length) continue; nj++; victoires[dispo.reduce((a, b) => (j.erreurs[b].mae < j.erreurs[a].mae ? b : a))]++; }
  const sh = stats(js, "hier"), st = codes.map((c) => [c, stats(js, c)]).filter(([, s]) => s);
  const best = st.reduce((a, b) => (b[1].mae < a[1].mae ? b : a))[0];
  let h = `<thead><tr><th>${t("c_modele")} · ${t("jours_n", { n: js.length })}</th><th>${t("c_mae")}</th><th>${t("c_rel")}</th><th>${t("c_biais")}</th><th>${t("c_rmse")}</th><th>${t("c_meilleur")}</th><th>${t("c_gain")}</th></tr></thead><tbody>`;
  for (const [c, s] of st.concat([["hier", sh]])) {
    const m = MODELES.find((x) => x.code === c);
    h += `<tr${c === best ? ' class="meilleur"' : ""}><td><span class="nom-modele">${pastille(c)}${nomModele(c)}${m ? etiquette(m) : ""}</span></td><td>${nombre(s.mae)} ${t("unite")}</td><td>${nombre(s.rel, 0)} %</td><td>${signe(s.biais)}</td><td>${nombre(s.rmse)}</td>`
      + `<td>${c === "hier" ? "–" : nombre((100 * victoires[c]) / nj, 0) + " %"}</td><td>${c === "hier" ? "–" : `<span class="positif">${signe((100 * (sh.mae - s.mae)) / sh.mae, 0)} %</span>`}</td></tr>`;
  }
  resume.innerHTML = h + "</tbody>";
  const ds = MODELES.filter((m) => js.some((j) => j.erreurs[m.code])).map((m) => dsModele(m, js.map((j) => (j.erreurs[m.code] ? j.erreurs[m.code].mae : null)), { pointRadius: 2 }));
  ds.push(dsHier(js.map((j) => j.erreurs.hier.mae)));
  const o = options(8), iDirect = js.findIndex((j) => j.source === "direct");
  o.plugins.marqueur = { index: iDirect > 0 ? iDirect : null, texte: t("mise_en_ligne") };
  dessiner("perf-jours", { type: "line", data: { labels: js.map((j) => dateCourte(j.jour)), datasets: ds }, options: o, plugins: [curseur, marqueur] });
  const somme = {}, nb = {};
  for (const j of js) {
    j.heures.forEach((hq, i) => {
      const k = hq.slice(0, 2);
      for (const c of [...codes, "hier"]) {
        const p = c === "hier" ? j.hier : j[c];
        if (!p || p[i] === null || j.reel[i] === null) continue;
        somme[c] = somme[c] || {}; nb[c] = nb[c] || {};
        somme[c][k] = (somme[c][k] || 0) + Math.abs(p[i] - j.reel[i]); nb[c][k] = (nb[c][k] || 0) + 1;
      }
    });
  }
  const hs = [...Array(24).keys()].map((x) => String(x).padStart(2, "0"));
  const serieH = (c) => hs.map((k) => (nb[c] && nb[c][k] ? somme[c][k] / nb[c][k] : null));
  const dh = MODELES.filter((m) => somme[m.code]).map((m) => dsModele(m, serieH(m.code), { pointRadius: 2 }));
  dh.push(dsHier(serieH("hier")));
  dessiner("perf-heures", { type: "line", data: { labels: hs.map((k) => k + (etat.langue === "fr" ? " h" : ":00")), datasets: dh }, options: options(12), plugins: [curseur] });
  const dur = js.filter((j) => j.erreurs.GR).sort((a, b) => b.erreurs.GR.mae - a.erreurs.GR.mae).slice(0, 8);
  let hd = `<thead><tr><th>${t("date")}</th><th>${pastille("reel")} ${t("marche_moyen")}</th>` + MODELES.map((m) => `<th>${pastille(m.code)} ${m.code} · ${t("erreur_moy")}</th>`).join("") + `<th>${pastille("hier")} ${t("hier_court")}</th></tr></thead><tbody>`;
  for (const j of dur) {
    hd += `<tr data-jour="${j.jour}"><td>${dateMoyenne(j.jour)}</td><td>${nombre(moyenne(j.reel))}</td>` + MODELES.map((m) => `<td>${j.erreurs[m.code] ? nombre(j.erreurs[m.code].mae) : "–"}</td>`).join("") + `<td>${nombre(j.erreurs.hier.mae)}</td></tr>`;
  }
  $("perf-difficiles").innerHTML = hd + "</tbody>";
  $("perf-difficiles").querySelectorAll("tbody tr").forEach((r) => r.addEventListener("click", () => ouvrirJour(r.dataset.jour)));
}

/* ---------------------------------------------------------------- onglet Modèles */
function rendreModeles() {
  const f = MODELES.map((m) => `<div class="fiche"><h4>${pastille(m.code)}${nomModele(m.code)} <span class="etiquette">${m.code}</span>${etiquette(m)}</h4>${t("f_" + m.code).map((p, i) => `<p${i === 2 ? ' class="chiffre"' : ""}>${p}</p>`).join("")}</div>`);
  f.push(`<div class="fiche"><h4>${pastille("hier")}${t("hier_court")}</h4>${t("f_hier").map((p) => `<p>${p}</p>`).join("")}</div>`);
  $("m-fiches").innerHTML = f.join("");
  $("m-etapes").innerHTML = t("etapes").map(([a, b]) => `<li><div><b>${a}</b><span>${b}</span></div></li>`).join("");
  $("m-lexique").innerHTML = t("lexique").map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("");
  $("m-limites").innerHTML = t("limites").map((p) => `<li>${p.split("{d}").join(dateLongue(etat.d.debut_direct))}</li>`).join("");
}

/* ---------------------------------------------------------------- navigation */
const RENDUS = { prevision: rendrePrevision, historique: rendreHistorique, performance: rendrePerformance, modeles: rendreModeles };
function lireAncre() {
  const [o, jour] = location.hash.replace("#", "").split("/");
  etat.onglet = RENDUS[o] ? o : "prevision";
  if (etat.onglet === "historique" && jour === "plage") etat.modeHist = "plage";
  else if (etat.onglet === "historique" && jour && etat.d && jourDe(jour)) { etat.jourHist = jour; etat.modeHist = "jour"; }
}
function afficher() {
  document.querySelectorAll("[role=tab]").forEach((b) => { const actif = b.dataset.onglet === etat.onglet; b.setAttribute("aria-selected", String(actif)); b.tabIndex = actif ? 0 : -1; });
  document.querySelectorAll("[role=tabpanel]").forEach((p) => { p.hidden = p.id !== etat.onglet; });
  RENDUS[etat.onglet]();
}
function toutAfficher() {
  document.documentElement.lang = etat.langue;
  document.title = t("titre");
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
  $("langue").textContent = etat.langue === "fr" ? "EN" : "FR";
  $("pied").textContent = t("pied");
  afficher();
}

function demarrer() {
  etat.langue = lire("langue") || "fr";
  const th = lire("theme");
  if (th) document.documentElement.dataset.theme = th;
  $("langue").addEventListener("click", () => { etat.langue = etat.langue === "fr" ? "en" : "fr"; ecrireLocal("langue", etat.langue); toutAfficher(); });
  $("theme").addEventListener("click", () => {
    const sombre = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = sombre ? "light" : "dark"; ecrireLocal("theme", document.documentElement.dataset.theme); toutAfficher();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (etat.d) toutAfficher(); });
  document.querySelectorAll("[role=tab]").forEach((b) => b.addEventListener("click", () => {
    location.hash = b.dataset.onglet === "historique" && etat.jourHist && etat.modeHist === "jour" ? "#historique/" + etat.jourHist : "#" + b.dataset.onglet;
  }));
  document.querySelector("[role=tablist]").addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tabs = [...document.querySelectorAll("[role=tab]")], i = tabs.findIndex((x) => x.dataset.onglet === etat.onglet);
    const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); n.click();
  });
  window.addEventListener("hashchange", () => { lireAncre(); afficher(); });
  $("hist-date").addEventListener("change", (e) => { if (jourDe(e.target.value)) ouvrirJour(e.target.value); });
  const pas = (d) => { const js = jours(), i = js.findIndex((j) => j.jour === etat.jourHist) + d; if (js[i]) ouvrirJour(js[i].jour); };
  $("hist-prec").addEventListener("click", () => pas(-1));
  $("hist-suiv").addEventListener("click", () => pas(1));
  const perso = () => { const a = $("plage-debut").value, b = $("plage-fin").value; if (a && b && a <= b) { etat.plage = { preset: "perso", debut: a, fin: b }; rendrePlage(); } };
  $("plage-debut").addEventListener("change", perso);
  $("plage-fin").addEventListener("change", perso);
  let attente;
  window.addEventListener("resize", () => { clearTimeout(attente); attente = setTimeout(() => { if (etat.d) afficher(); }, 250); });
  fetch("data/donnees.json", { cache: "no-store" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => { etat.d = d; lireAncre(); toutAfficher(); })
    .catch(() => { document.querySelector("main").innerHTML = `<p class="carte">${t("chargement")}</p>`; });
}
document.addEventListener("DOMContentLoaded", demarrer);
