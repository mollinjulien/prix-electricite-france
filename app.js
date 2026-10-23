/* Site « Prix de l'électricité de demain » : lit data/donnees.json (écrit chaque jour par site_web.py) et dessine onglets, tableaux et graphiques (Chart.js). */
"use strict";

const TXT = {
  fr: {
    titre: "Prix de l'électricité de demain en France",
    sous_titre: "Chaque matin, trois modèles de machine learning prévoient le prix de l'électricité du lendemain en France (enchère day-ahead EPEX, au quart d'heure), avant sa publication vers 12 h 45. Ils sont ensuite comparés au prix fixé par le marché.",
    o_prevision: "Prévision", o_historique: "Historique", o_performance: "Performance", o_modeles: "Les modèles",
    maj: "Site mis à jour le {d}",
    prix_du: "Prix du {d}",
    b_demain: "demain", b_aujourdhui: "aujourd'hui", b_hier: "hier", b_passe: "jour passé", b_reel: "prix réel connu", b_calcul: "calcul en cours",
    retard: "La prévision du {d} n'est pas encore publiée : elle est normalement calculée vers 10 h 15 et publiée vers 10 h 30.",
    attente_d: "Le calcul démarre vers 10 h 15 et dure une dizaine de minutes. Cette page se met à jour toute seule.",
    etapes_titre: "Étapes de la prévision",
    etapes_voir: "Étapes de la prévision de ce jour",
    g_donnees: "Données reçues", g_calculs: "Calculs", g_resultat: "Publication et vérification",
    prix_du_jour: "Prix de la journée, en €/MWh (heure de Paris)",
    p_quart: "Quart d'heure", p_heure: "Heure", p_jour: "Moyenne par jour",
    note_prev_attente: "Le prix du marché s'ajoutera au tableau et au graphique dès sa publication (enchère de 12 h 45, récupéré vers 13 h 45).",
    note_prev_reel: "Le prix du marché est publié : les écarts heure par heure sont dans l'onglet Historique.",
    afficher: "Afficher :",
    ck_prix: "Prix des jours passés reçus", nk_prix: "Prix des jours passés", ck_prix_d: "connus jusqu'au {d}",
    ck_conso: "Prévision de consommation RTE reçue", nk_conso: "Prévision de consommation RTE", ck_conso_d: "{x} GW en moyenne sur la journée",
    ck_gaz: "Données gaz reçues (prix TTF)", nk_gaz: "Données gaz (prix TTF)", ck_gaz_d: "clôture du {d} · source : {s}",
    ck_gaz_orange: "Données gaz un peu anciennes", ck_gaz_rouge: "Données gaz manquantes",
    ck_meteo: "Données météo reçues (GFS, NOAA)", nk_meteo: "Données météo (GFS, NOAA)", ck_meteo_trou: "Données météo incomplètes",
    ck_meteo_d: "run du {d} à 00 h UTC · {h} heures sur {n}",
    ck_prod: "Production solaire et éolienne prévue", nk_prod: "Prévision de production solaire et éolienne", ck_prod_d: "solaire {s} GWh · éolien {e} GWh sur la journée",
    ck_modele: "Modèle « {m} » calculé", nk_modele: "Modèle « {m} »", ck_modele_absent: "Modèle « {m} » non calculé",
    ck_modele_d: "réentraîné jusqu'à hier · {h} heures prévues · {a} arbres", ck_modele_d_simple: "réentraîné jusqu'à hier",
    ck_modele_rejeu: "calculé a posteriori (rejeu)", ck_modele_absent_d: "absent de la prévision", ck_modele_sans_gaz: "pas de prix du gaz récent",
    ck_publie: "Prévision publiée", nk_publie: "Publication de la prévision",
    ck_publie_avant: "le {d}, avant l'enchère de 12 h 45", ck_publie_apres: "le {d}, après l'enchère de 12 h 45", ck_publie_att: "vers 10 h 30",
    ck_reel: "Prix réel de l'électricité reçu", nk_reel: "Prix réel de l'électricité", ck_reel_d: "le {d}", ck_reel_fichier: "fichier des prix du marché",
    ck_reel_attente: "publié vers 12 h 45 le {d}, récupéré vers 13 h 45", ck_reel_cours: "enchère publiée à 12 h 45 : récupération vers 13 h 45", ck_reel_retard: "pas encore reçu",
    ck_ecarts: "Écarts calculés", nk_ecarts: "Calcul des écarts", ck_ecarts_d: "meilleur : « {m} », {x} €/MWh d'erreur moyenne", ck_ecarts_att: "dès que le prix réel est reçu",
    ck_rejeu: "Journée rejouée a posteriori", ck_rejeu_d: "avant la mise en ligne du site, avec exactement la méthode du service (étapes du jour non enregistrées)",
    ck_inconnu: "non enregistré", ck_attente_d: "en attente (vers 10 h 15)",
    prix_moyen: "prix moyen prévu", prevu_erreur: "prix moyen prévu · erreur moyenne {x} €", erreur_biais: "erreur moyenne · biais {b} €",
    marche_moyen: "Prix moyen du marché", veille: "Prix moyen de la veille",
    moins_plus: "Heure la moins chère · la plus chère", selon: "selon « {m} »", selon_marche: "selon le marché",
    fourchette: "Fourchette indicative (80 % des écarts passés)",
    marche: "Marché (prix réel)", marche_court: "Marché",
    hier: "Prix de la veille (même quart d'heure)", hier_court: "Veille",
    heure: "Heure", prevu: "prévu", ecart: "écart", moyenne: "Moyenne", erreur_abs: "Erreur moyenne",
    erreur_moy: "erreur moyenne",
    m_jour: "Un jour", m_plage: "Plusieurs jours",
    source_direct: "prévision publiée la veille", source_rejeu: "rejoué a posteriori",
    hist_quart: "Quart d'heure par quart d'heure", hist_heure: "Heure par heure",
    pas_de_reel: "Le prix du marché de ce jour n'est pas encore publié : seules les prévisions sont affichées.",
    note_ecarts: "Écart = prix prévu − prix du marché, en €/MWh (positif : prévision trop haute). Plus la case est foncée, plus l'écart est grand. En bas : moyenne de la journée (la colonne écart donne alors le biais), puis erreur moyenne au quart d'heure (écart moyen sans tenir compte du signe).",
    p_7: "7 jours", p_30: "30 jours", p_tout: "Tout", du: "du", au: "au",
    plage_titre: "{n} jours, du {a} au {b}",
    jour_par_jour: "Jour par jour",
    clic_jour: "Cliquez sur une ligne pour ouvrir ce jour dans le détail.",
    date: "Date", source: "Source", rejeu: "rejeu", direct: "direct", meilleur: "meilleur",
    prevu_moyen: "prévu", erreur_court: "erreur", moyenne_periode: "Moyenne de la période",
    intro_perf: "Erreur de chaque modèle par rapport au prix du marché, au quart d'heure. Plus c'est bas, mieux c'est. L'erreur relative rapporte la somme des erreurs à la somme des prix. Le gain se mesure contre le repère naïf « même quart d'heure la veille ».",
    pf_tout: "Tout l'historique", pf_30: "30 derniers jours", pf_direct: "Depuis la mise en ligne",
    aucun_direct: "Pas encore de jour prévu en direct : les premières prévisions publiées commencent le {d}.",
    c_modele: "Modèle", c_mae: "Erreur moyenne", c_rel: "Erreur relative", c_biais: "Biais", c_rmse: "Erreur quadratique", c_meilleur: "Meilleur des 3", c_gain: "Gain contre la veille",
    jours_n: "{n} jours",
    perf_jours: "Erreur moyenne de chaque jour (€/MWh)",
    perf_heures: "À quelle heure se trompe-t-on ? Erreur moyenne par heure de la journée (€/MWh)",
    perf_difficiles: "Les jours les plus difficiles (modèle « GFS + gaz »)",
    mise_en_ligne: "mise en ligne",
    m_qui: "Les trois modèles et le repère",
    m_chaine: "Ce qui se passe chaque jour",
    m_lexique: "Petit lexique",
    m_limites: "Limites, sources et méthode",
    nom_GR: "Données prévisions météo GFS + données gaz",
    nom_CR: "Données prévisions météo GFS + gaz + modèle de prédiction de l'électricité solaire / éolienne",
    nom_GT: "Données prévisions météo GFS + prix rapporté au gaz",
    court_GR: "GFS + gaz", court_CR: "GFS + gaz + production", court_GT: "GFS + prix/gaz",
    nom_court: "Dans les tableaux : « {c} »",
    tag_principal: "principal",
    f_GR: ["Le modèle principal. Il apprend le lien entre le prix et ce qu'on sait la veille : prévisions météo GFS (soleil, vent, température), consommation prévue par RTE, jour de la semaine et jours fériés, prix des jours passés et prix du gaz.",
           "Algorithme : LightGBM (arbres de décision en série). Réentraîné chaque matin sur toutes les heures depuis 2020, en donnant plus de poids aux années récentes.",
           "Test sur 2026, réentraîné chaque jour : 18,5 €/MWh d'erreur moyenne, contre 27,9 pour « même heure la veille »."],
    f_CR: ["Comme le principal, mais le soleil et le vent bruts sont remplacés par la production solaire et éolienne prévue par nos propres modèles de production (appris eux aussi sur GFS).",
           "Idée : le prix dépend de la production renouvelable, autant la prévoir d'abord. En pratique, elle vient de la même météo et n'apporte pas d'information nouvelle.",
           "Test sur 2026 : 18,8 €/MWh, un peu moins bon que le principal (0,3 €/MWh d'écart, significatif)."],
    f_GT: ["Comme le principal, mais le modèle apprend le prix divisé par le coût du gaz pour une centrale (prix du gaz TTF ÷ 0,55), puis le remultiplie. Ainsi, ce qu'il a appris quand le gaz était bon marché reste valable quand il est cher.",
           "Il réagit plus fort au vent : très bon les jours où le prix s'effondre toute la journée, moins bon quand seul l'après-midi s'effondre.",
           "Septembre-octobre 2026, réentraîné chaque jour : 25,6 €/MWh contre 26,7 pour le principal (4 % de mieux ; écart pas encore démontré statistiquement)."],
    f_hier: ["Repère naïf, sans modèle : le prix de demain sera celui d'aujourd'hui au même quart d'heure. Un modèle utile doit faire mieux. Masqué par défaut : cochez « Veille » pour l'afficher."],
    etapes: [
      ["Vers 10 h 15, la veille", "Mise à jour des données : prix des jours passés, consommation et prévision de consommation de RTE, production régionale récente, prix du gaz."],
      ["Météo de demain", "Téléchargement du dernier run de minuit du modèle météo GFS (NOAA) : rayonnement, vent à 100 m, température, nuages, pression sur la France."],
      ["Production prévue", "Nos modèles de production transforment la météo en production solaire et éolienne par région (utilisée par le modèle « GFS + gaz + production »)."],
      ["Prix horaire", "Les trois modèles sont réentraînés sur tout l'historique jusqu'à minuit, puis prévoient le prix de chaque heure de demain."],
      ["Quart d'heure", "Un second modèle répartit chaque heure en quatre quarts d'heure (le prix varie dans l'heure, surtout matin et soir)."],
      ["Publication", "Le site est mis à jour vers 10 h 30, avant l'enchère de 12 h 45."],
      ["Vers 13 h 45", "Le prix fixé par le marché est récupéré : le site ajoute la courbe réelle et calcule les écarts."],
    ],
    lexique: [
      ["Prix day-ahead", "Prix de l'électricité pour chaque quart d'heure du lendemain, fixé la veille vers 12 h 45 par une enchère (EPEX SPOT) où producteurs et acheteurs déposent leurs offres."],
      ["€/MWh", "Euros par mégawattheure. 100 €/MWh = 10 centimes le kWh, avant taxes et acheminement."],
      ["GFS", "Global Forecast System, le modèle de prévision météo mondial de l'agence américaine NOAA, gratuit et archivé depuis 2015."],
      ["TTF", "Prix de référence du gaz naturel en Europe. Une centrale à gaz fixe souvent le prix de l'électricité : son coût de combustible ≈ prix du gaz ÷ 0,55."],
      ["Arbres", "Les modèles additionnent des centaines de petits arbres de décision ; leur nombre est choisi chaque jour automatiquement (on s'arrête quand l'erreur sur l'année précédente ne baisse plus)."],
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
    maj: "Site updated {d}",
    prix_du: "Prices for {d}",
    b_demain: "tomorrow", b_aujourdhui: "today", b_hier: "yesterday", b_passe: "past day", b_reel: "actual price known", b_calcul: "computing",
    retard: "The forecast for {d} is not published yet: it is normally computed around 10:15 and published around 10:30.",
    attente_d: "The computation starts around 10:15 and takes about ten minutes. This page updates by itself.",
    etapes_titre: "Forecast steps",
    etapes_voir: "Forecast steps for this day",
    g_donnees: "Data received", g_calculs: "Computations", g_resultat: "Publication and check",
    prix_du_jour: "Prices over the day, €/MWh (Paris time)",
    p_quart: "Quarter-hour", p_heure: "Hour", p_jour: "Daily average",
    note_prev_attente: "The market price will be added to the table and chart once published (12:45 auction, fetched around 13:45).",
    note_prev_reel: "The market price is out: hour-by-hour errors are in the History tab.",
    afficher: "Show:",
    ck_prix: "Past prices received", nk_prix: "Past prices", ck_prix_d: "known up to {d}",
    ck_conso: "RTE load forecast received", nk_conso: "RTE load forecast", ck_conso_d: "{x} GW on average over the day",
    ck_gaz: "Gas data received (TTF price)", nk_gaz: "Gas data (TTF price)", ck_gaz_d: "close of {d} · source: {s}",
    ck_gaz_orange: "Gas data slightly old", ck_gaz_rouge: "Gas data missing",
    ck_meteo: "Weather data received (GFS, NOAA)", nk_meteo: "Weather data (GFS, NOAA)", ck_meteo_trou: "Weather data incomplete",
    ck_meteo_d: "run of {d} 00 UTC · {h} hours out of {n}",
    ck_prod: "Solar and wind output forecast", nk_prod: "Solar and wind output forecast", ck_prod_d: "solar {s} GWh · wind {e} GWh over the day",
    ck_modele: "Model \"{m}\" computed", nk_modele: "Model \"{m}\"", ck_modele_absent: "Model \"{m}\" not computed",
    ck_modele_d: "retrained up to yesterday · {h} hours forecast · {a} trees", ck_modele_d_simple: "retrained up to yesterday",
    ck_modele_rejeu: "computed afterwards (replay)", ck_modele_absent_d: "missing from the forecast", ck_modele_sans_gaz: "no recent gas price",
    ck_publie: "Forecast published", nk_publie: "Forecast publication",
    ck_publie_avant: "{d}, before the 12:45 auction", ck_publie_apres: "{d}, after the 12:45 auction", ck_publie_att: "around 10:30",
    ck_reel: "Actual electricity price received", nk_reel: "Actual electricity price", ck_reel_d: "{d}", ck_reel_fichier: "market price file",
    ck_reel_attente: "published around 12:45 on {d}, fetched around 13:45", ck_reel_cours: "auction published at 12:45: fetched around 13:45", ck_reel_retard: "not received yet",
    ck_ecarts: "Errors computed", nk_ecarts: "Error computation", ck_ecarts_d: "best: \"{m}\", {x} €/MWh mean error", ck_ecarts_att: "once the actual price is received",
    ck_rejeu: "Day replayed afterwards", ck_rejeu_d: "before the site went live, with exactly the service's method (steps of the day not recorded)",
    ck_inconnu: "not recorded", ck_attente_d: "waiting (around 10:15)",
    prix_moyen: "average forecast price", prevu_erreur: "average forecast · mean error {x} €", erreur_biais: "mean error · bias {b} €",
    marche_moyen: "Average market price", veille: "Previous day's average",
    moins_plus: "Cheapest · most expensive hour", selon: "according to \"{m}\"", selon_marche: "according to the market",
    fourchette: "Indicative range (80% of past errors)",
    marche: "Market (actual price)", marche_court: "Market",
    hier: "Previous day's price (same quarter-hour)", hier_court: "Day before",
    heure: "Time", prevu: "forecast", ecart: "error", moyenne: "Average", erreur_abs: "Mean error",
    erreur_moy: "mean error",
    m_jour: "One day", m_plage: "Several days",
    source_direct: "forecast published the day before", source_rejeu: "replayed afterwards",
    hist_quart: "Quarter-hour by quarter-hour", hist_heure: "Hour by hour",
    pas_de_reel: "The market price for this day is not published yet: only forecasts are shown.",
    note_ecarts: "Error = forecast − market price, €/MWh (positive: forecast too high). The darker the cell, the larger the error. At the bottom: daily average (the error column then gives the bias), then mean quarter-hour error (average gap regardless of sign).",
    p_7: "7 days", p_30: "30 days", p_tout: "All", du: "from", au: "to",
    plage_titre: "{n} days, from {a} to {b}",
    jour_par_jour: "Day by day",
    clic_jour: "Click a row to open that day in detail.",
    date: "Date", source: "Source", rejeu: "replay", direct: "live", meilleur: "best",
    prevu_moyen: "forecast", erreur_court: "error", moyenne_periode: "Period average",
    intro_perf: "Error of each model against the market price, per quarter-hour. Lower is better. The relative error divides the sum of errors by the sum of prices. The gain is measured against the naive \"same quarter-hour the day before\" benchmark.",
    pf_tout: "Full history", pf_30: "Last 30 days", pf_direct: "Since going live",
    aucun_direct: "No live day yet: the first published forecasts start on {d}.",
    c_modele: "Model", c_mae: "Mean error", c_rel: "Relative error", c_biais: "Bias", c_rmse: "Root mean square error", c_meilleur: "Best of the 3", c_gain: "Gain over the day before",
    jours_n: "{n} days",
    perf_jours: "Mean error of each day (€/MWh)",
    perf_heures: "When are we wrong? Mean error by hour of the day (€/MWh)",
    perf_difficiles: "The hardest days (\"GFS + gas\" model)",
    mise_en_ligne: "live",
    m_qui: "The three models and the benchmark",
    m_chaine: "What happens every day",
    m_lexique: "Glossary",
    m_limites: "Limitations, sources and method",
    nom_GR: "GFS weather forecast data + gas data",
    nom_CR: "GFS weather forecast data + gas + solar / wind power prediction model",
    nom_GT: "GFS weather forecast data + gas-relative price",
    court_GR: "GFS + gas", court_CR: "GFS + gas + output", court_GT: "GFS + price/gas",
    nom_court: "In tables: \"{c}\"",
    tag_principal: "main",
    f_GR: ["The main model. It learns the link between the price and what is known the day before: GFS weather forecasts (sun, wind, temperature), RTE load forecast, weekday and holidays, past prices and the gas price.",
           "Algorithm: LightGBM (boosted decision trees). Retrained every morning on every hour since 2020, with more weight on recent years.",
           "2026 test, retrained daily: 18.5 €/MWh mean error, versus 27.9 for \"same hour the day before\"."],
    f_CR: ["Like the main model, but raw sun and wind are replaced by the solar and wind output forecast by our own production models (also trained on GFS).",
           "Idea: the price depends on renewable output, so forecast it first. In practice it comes from the same weather and adds no new information.",
           "2026 test: 18.8 €/MWh, slightly worse than the main model (0.3 €/MWh, significant)."],
    f_GT: ["Like the main model, but it learns the price divided by the fuel cost of a gas plant (TTF gas price ÷ 0.55), then multiplies back. What it learned when gas was cheap thus still applies when gas is expensive.",
           "It reacts more strongly to wind: very good when the price collapses all day long, worse when only the afternoon collapses.",
           "September-October 2026, retrained daily: 25.6 €/MWh versus 26.7 for the main model (4% better; gap not yet statistically proven)."],
    f_hier: ["Naive benchmark, no model: tomorrow's price equals today's at the same quarter-hour. A useful model must beat it. Hidden by default: tick \"Day before\" to show it."],
    etapes: [
      ["Around 10:15, the day before", "Data update: past prices, RTE load and load forecast, recent regional output, gas price."],
      ["Tomorrow's weather", "Download of the latest midnight run of the GFS weather model (NOAA): radiation, 100 m wind, temperature, clouds, pressure over France."],
      ["Forecast output", "Our production models turn the weather into solar and wind output per region (used by the \"GFS + gas + output\" model)."],
      ["Hourly price", "The three models are retrained on the full history up to midnight, then forecast the price of each hour of tomorrow."],
      ["Quarter-hour", "A second model splits each hour into four quarter-hours (prices move within the hour, especially morning and evening)."],
      ["Publication", "The site is updated around 10:30, before the 12:45 auction."],
      ["Around 13:45", "The market price is fetched: the site adds the actual curve and computes the errors."],
    ],
    lexique: [
      ["Day-ahead price", "Electricity price for each quarter-hour of the next day, set the day before around 12:45 by an auction (EPEX SPOT) where producers and buyers submit bids."],
      ["€/MWh", "Euros per megawatt-hour. 100 €/MWh = 10 cents per kWh, before taxes and grid fees."],
      ["GFS", "Global Forecast System, the global weather model of the US agency NOAA, free and archived since 2015."],
      ["TTF", "Europe's benchmark natural gas price. A gas plant often sets the electricity price: its fuel cost ≈ gas price ÷ 0.55."],
      ["Trees", "The models add up hundreds of small decision trees; their number is chosen automatically every day (training stops when the error on the previous year no longer falls)."],
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
  { code: "GT", couleur: "--s-gt", tirets: [6, 4], tag: null },
];
const etat = { d: null, langue: "fr", onglet: "prevision", jourHist: null, modeHist: "jour", plage: { preset: "7", debut: null, fin: null },
               visibles: { GR: true, CR: true, GT: true, hier: false },          // cases à cocher, communes à tous les tableaux et graphiques
               pasPrev: { haut: "quart", bas: "quart" }, pasHist: "quart", pasPlage: "heure", periodePerf: "tout",
               etapesOuvertes: false, cleAccueil: null, graphiques: {} };

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
const nomModele = (code) => (code === "hier" ? t("hier") : t("nom_" + code));
const courtModele = (code) => (code === "hier" ? t("hier_court") : t("court_" + code));
const jours = () => etat.d.jours;
const joursAvecPrix = () => jours().filter((j) => j.reel);
const jourDe = (iso) => jours().find((j) => j.jour === iso);
const modelesDuJour = (j) => MODELES.filter((m) => j[m.code]);
const visibles = (j) => modelesDuJour(j).filter((m) => etat.visibles[m.code]);
const colonnes = (j) => visibles(j).map((m) => m.code).concat(etat.visibles.hier ? ["hier"] : []);   // séries cochées d'un jour, repère « veille » compris
function meilleur(j) {                                               // modèle à la plus petite erreur moyenne du jour (parmi les trois)
  const c = modelesDuJour(j).map((m) => m.code).filter((k) => j.erreurs && j.erreurs[k]);
  return c.length ? c.reduce((a, b) => (j.erreurs[b].mae < j.erreurs[a].mae ? b : a)) : null;
}

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
    const p = j[cle];
    if (!p || !j.reel) continue;
    for (let i = 0; i < p.length; i++) {
      if (p[i] === null || j.reel[i] === null) continue;
      const e = p[i] - j.reel[i];
      n++; sa += Math.abs(e); s += e; s2 += e * e; sr += Math.abs(j.reel[i]);
    }
  }
  return n ? { mae: sa / n, biais: s / n, rmse: Math.sqrt(s2 / n), rel: (100 * sa) / sr, n } : null;
}
function celluleEcart(p, r) {                                        // écart prévu − marché, case d'autant plus foncée que l'écart est grand
  if (p === null || p === undefined || r === null || r === undefined) return "<td>–</td>";
  const a = Math.min(Math.abs(p - r) / 80, 1) * 0.22;
  return `<td style="background-color:rgba(var(--ecart-rgb),${a.toFixed(3)})">${signe(p - r)}</td>`;
}
function pastille(code) {
  if (code === "reel") return `<span class="pastille" style="color:${css("--ink")}"></span>`;
  if (code === "hier") return `<span class="pastille points" style="color:${css("--muted")}"></span>`;
  const m = MODELES.find((x) => x.code === code);
  return `<span class="pastille${m.tirets ? " tirets" : ""}" style="color:${css(m.couleur)}"></span>`;
}
const etiquette = (m) => (m.tag ? ` <span class="etiquette">${t(m.tag)}</span>` : "");
const etiquetteMeilleur = (ok) => (ok ? ` <span class="etiquette">${t("meilleur")}</span>` : "");
function segments(id, liste, valeur, rappel) {
  const el = $(id);
  el.innerHTML = liste.map(([k, lib]) => `<button type="button" data-v="${k}" aria-pressed="${k === valeur}">${lib}</button>`).join("");
  el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => rappel(b.dataset.v)));
}
function choixModeles(id, codes, fixes = []) {                       // cases à cocher des modèles (+ légende des courbes toujours affichées)
  const el = $(id);
  const cases = codes.concat(["hier"]).map((c) => `<label class="choix-item"><input type="checkbox" id="${id}-${c}" data-c="${c}"${etat.visibles[c] ? " checked" : ""}>`
    + `${pastille(c)}<span>${nomModele(c)}</span></label>`);
  const leg = fixes.map(([c, lib]) => `<span class="choix-fixe">${c === "bande" ? '<span class="pastille bande"></span>' : pastille(c)}${lib}</span>`);
  el.innerHTML = `<span class="choix-titre">${t("afficher")}</span>${cases.join("")}${leg.length ? `<span class="choix-legende">${leg.join("")}</span>` : ""}`;
  el.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => {
    etat.visibles[inp.dataset.c] = inp.checked;
    afficher();
    const n = $(inp.id);
    if (n) n.focus({ preventScroll: true });
  }));
}
function tuile(lib, val, det, titre) {
  return `<div class="tuile"${titre ? ` title="${titre}"` : ""}><div class="libelle">${lib}</div><div class="valeur">${val}</div><div class="detail">${det}</div></div>`;
}
const enEuros = (v) => `${nombre(v)} <small>${t("unite")}</small>`;
function collerEntetes(tab) {                                         // deuxième ligne d'en-tête collée sous la première (le pied est collé en bas par le CSS)
  const h = tab.tHead ? [...tab.tHead.rows] : [];
  if (h.length > 1) [...h[1].cells].forEach((c) => { c.style.top = h[0].offsetHeight + "px"; });
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
function options(maxTicks, legende = false) {                       // sans légende Chart.js quand les cases à cocher servent de légende
  const muted = css("--muted");
  return {
    responsive: true, maintainAspectRatio: false, animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: legende, position: "top", align: "start", labels: { color: css("--ink-2"), boxWidth: 16, boxHeight: 3, padding: 12, filter: (it) => !it.text.startsWith("_") } },
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
  return { label: courtModele(m.code), data, borderColor: c, backgroundColor: c, borderDash: m.tirets || [], fill: false, spanGaps: true, ...extra };
}
const dsMarche = (data) => ({ label: t("marche"), data, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 2.5, fill: false, spanGaps: true });
const dsHier = (data, extra = {}) => ({ label: t("hier_court"), data, borderColor: css("--muted"), backgroundColor: css("--muted"), borderWidth: 1.5, borderDash: [2, 3], fill: false, ...extra });
function dsBande(bas, haut) {
  return [{ label: "_bas", data: bas, borderWidth: 0, pointRadius: 0, fill: false },
          { label: t("fourchette"), data: haut, borderWidth: 0, pointRadius: 0, backgroundColor: css("--bande"), borderColor: css("--bande"), fill: "-1" }];
}
const avecBande = (s) => Boolean(s.bas && s.haut && s.GR && etat.visibles.GR);       // la fourchette est construite autour du modèle principal
function dsJour(s, j) {
  const ds = [];
  if (avecBande(s)) ds.push(...dsBande(s.bas, s.haut));
  if (s.reel) ds.push(dsMarche(s.reel));
  for (const m of visibles(j)) ds.push(dsModele(m, s[m.code]));
  if (etat.visibles.hier) ds.push(dsHier(s.hier));
  return ds;
}
const legendeJour = (s) => (s.reel ? [["reel", t("marche")]] : []).concat(avecBande(s) ? [["bande", t("fourchette")]] : []);
function dessiner(id, config) {
  if (etat.graphiques[id]) etat.graphiques[id].destroy();
  etat.graphiques[id] = new Chart($(id), config);
  return etat.graphiques[id];
}
function effacer(id) { if (etat.graphiques[id]) { etat.graphiques[id].destroy(); delete etat.graphiques[id]; } }
function lier(chart, tableId) {                                      // survol du tableau <-> point du graphique
  const table = $(tableId), cadre = table.parentElement;
  const surligner = (i) => {
    table.querySelectorAll("tr.actif").forEach((r) => r.classList.remove("actif"));
    if (i === null) return;
    const r = table.querySelector(`tbody tr[data-i="${i}"]`);
    if (!r) return;
    r.classList.add("actif");
    const entete = table.tHead ? table.tHead.offsetHeight : 0, pied = table.tFoot ? table.tFoot.offsetHeight : 0;
    if (r.offsetTop - entete < cadre.scrollTop || r.offsetTop + r.offsetHeight > cadre.scrollTop + cadre.clientHeight - pied) cadre.scrollTop = r.offsetTop - entete - cadre.clientHeight / 3;
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

/* ---------------------------------------------------------------- étapes de la prévision (coches) */
const SYMBOLES = { ok: "✓", attente: "…", alerte: "!", echec: "✕", info: "i" };
function groupesEtapes(G) {
  return [["donnees", "g_donnees"], ["calculs", "g_calculs"], ["resultat", "g_resultat"]].map(([k, titre], n) =>
    `<div class="groupe-etapes"><h4><span class="num">${n + 1}</span>${t(titre)}</h4><ul class="coches">`
    + G[k].map(([cls, lib, det]) => `<li><span class="coche ${cls}" aria-hidden="true">${SYMBOLES[cls]}</span><span><span class="libelle">${lib}</span>${det ? `<span class="detail">${det}</span>` : ""}</span></li>`).join("")
    + "</ul></div>").join("");
}
function etapesJour(j) {
  const G = { donnees: [], calculs: [], resultat: [] }, ajout = (g, cls, lib, det) => G[g].push([cls, lib, det]);
  const veille = ajouterJours(j.jour, -1), now = maintenantParis(), rejeu = j.source === "rejeu", c = j.controles || {};
  if (rejeu) ajout("donnees", "info", t("ck_rejeu"), t("ck_rejeu_d"));
  else {
    if (c.prix_connus_jusqu) ajout("donnees", "ok", t("ck_prix"), t("ck_prix_d", { d: dateHeure(c.prix_connus_jusqu.replace(" ", "T")) }));
    else ajout("donnees", "info", t("nk_prix"), t("ck_inconnu"));
    if (c.conso_rte_GW) ajout("donnees", "ok", t("ck_conso"), t("ck_conso_d", { x: nombre(c.conso_rte_GW) }));
    else ajout("donnees", "info", t("nk_conso"), t("ck_inconnu"));
    const g = j.gaz || {}, dg = g.cloture ? t("ck_gaz_d", { d: dateCourte(g.cloture), s: g.source || "?" }) : t("ck_inconnu");
    if (g.niveau === "normal") ajout("donnees", "ok", t("ck_gaz"), dg);
    else if (g.niveau === "orange") ajout("donnees", "alerte", t("ck_gaz_orange"), g.message || dg);
    else if (g.niveau === "rouge") ajout("donnees", "echec", t("ck_gaz_rouge"), g.message || dg);
    else ajout("donnees", "info", t("nk_gaz"), dg);
    const m = c.meteo;
    if (m) ajout("donnees", m.heures_sans_valeur ? "alerte" : "ok", t(m.heures_sans_valeur ? "ck_meteo_trou" : "ck_meteo"),
                 t("ck_meteo_d", { d: dateCourte(m.run.slice(0, 10)), h: m.heures - m.heures_sans_valeur, n: m.heures }));
    else ajout("donnees", "info", t("nk_meteo"), t("ck_inconnu"));
    const p = c.production_GWh;
    if (p) ajout("calculs", "ok", t("ck_prod"), t("ck_prod_d", { s: nombre(p.solaire, 0), e: nombre(p.eolien, 0) }));
    else ajout("calculs", "info", t("nk_prod"), t("ck_inconnu"));
  }
  for (const m of MODELES) {
    const nom = courtModele(m.code), cm = (c.modeles || {})[m.code];
    if (j[m.code]) ajout("calculs", "ok", t("ck_modele", { m: nom }), rejeu ? t("ck_modele_rejeu") : cm ? t("ck_modele_d", { h: cm.heures, a: nombre(cm.arbres, 0) }) : t("ck_modele_d_simple"));
    else ajout("calculs", rejeu ? "info" : "echec", t("ck_modele_absent", { m: nom }),
               m.code === "GT" && j.gaz && j.gaz.niveau === "rouge" ? t("ck_modele_sans_gaz") : t("ck_modele_absent_d"));
  }
  if (!rejeu) {
    if (j.genere) {
      const avant = j.genere.slice(0, 16) <= `${veille}T12:45`;
      ajout("resultat", avant ? "ok" : "alerte", t("ck_publie"), t(avant ? "ck_publie_avant" : "ck_publie_apres", { d: dateHeure(j.genere) }));
    } else ajout("resultat", "info", t("nk_publie"), t("ck_inconnu"));
  }
  if (j.reel) ajout("resultat", "ok", t("ck_reel"), !rejeu && j.reel_recu && j.reel_recu !== "fichier" ? t("ck_reel_d", { d: dateHeure(j.reel_recu) }) : t("ck_reel_fichier"));
  else if (now.date < veille || (now.date === veille && now.hm < "12:45")) ajout("resultat", "attente", t("nk_reel"), t("ck_reel_attente", { d: dateCourte(veille) }));
  else if (now.date === veille && now.hm < "15:45") ajout("resultat", "attente", t("nk_reel"), t("ck_reel_cours"));
  else ajout("resultat", "alerte", t("nk_reel"), t("ck_reel_retard"));
  const b = meilleur(j);
  if (b) ajout("resultat", "ok", t("ck_ecarts"), t("ck_ecarts_d", { m: courtModele(b), x: nombre(j.erreurs[b].mae) }));
  else ajout("resultat", "attente", t("nk_ecarts"), t("ck_ecarts_att"));
  return groupesEtapes(G);
}
function etapesAttente(veille) {                                    // prévision pas encore calculée : toutes les étapes en attente
  const a = t("ck_attente_d"), G = { donnees: [], calculs: [], resultat: [] };
  for (const k of ["nk_prix", "nk_conso", "nk_gaz", "nk_meteo"]) G.donnees.push(["attente", t(k), a]);
  G.calculs.push(["attente", t("nk_prod"), a], ...MODELES.map((m) => ["attente", t("nk_modele", { m: courtModele(m.code) }), a]));
  G.resultat.push(["attente", t("nk_publie"), t("ck_publie_att")], ["attente", t("nk_reel"), t("ck_reel_attente", { d: dateCourte(veille) })], ["attente", t("nk_ecarts"), t("ck_ecarts_att")]);
  return groupesEtapes(G);
}

/* ---------------------------------------------------------------- onglet Prévision : deux jours */
function joursAccueil() {                                           // après 10 h : demain en haut, aujourd'hui en bas ; avant 10 h : aujourd'hui, puis hier
  const now = maintenantParis(), haut = now.hm >= "10:00" ? ajouterJours(now.date, 1) : now.date, bas = ajouterJours(haut, -1);
  const avant = jours().filter((j) => j.jour < haut);
  return { now, haut, jHaut: jourDe(haut), jBas: jourDe(bas) || avant[avant.length - 1] };
}
function badgeJour(iso, now) {
  if (iso === ajouterJours(now.date, 1)) return "b_demain";
  if (iso === now.date) return "b_aujourdhui";
  if (iso === ajouterJours(now.date, -1)) return "b_hier";
  return "b_passe";
}
function tuilesJour(j) {
  const T = [], b = meilleur(j);
  if (j.reel) T.push(tuile(pastille("reel") + t("marche_moyen"), enEuros(moyenne(j.reel)), dateCourte(j.jour)));
  for (const m of visibles(j)) {
    const e = j.erreurs && j.erreurs[m.code];
    T.push(tuile(pastille(m.code) + courtModele(m.code) + etiquette(m) + etiquetteMeilleur(m.code === b), enEuros(moyenne(j[m.code])),
                 e ? t("prevu_erreur", { x: nombre(e.mae) }) : t("prix_moyen"), nomModele(m.code)));
  }
  if (etat.visibles.hier) {
    const e = j.erreurs && j.erreurs.hier;
    T.push(tuile(pastille("hier") + t("veille"), enEuros(moyenne(j.hier)), e ? t("prevu_erreur", { x: nombre(e.mae) }) : t("hier")));
  }
  const ref = j.reel ? "reel" : j.GR ? "GR" : modelesDuJour(j).length ? modelesDuJour(j)[0].code : null;
  if (ref) {
    const h = parHeure(j[ref], j.heures), lab = heuresLabels(j.heures), v = h.filter((x) => x !== null);
    const iMin = h.indexOf(Math.min(...v)), iMax = h.indexOf(Math.max(...v));
    T.push(tuile(t("moins_plus"), `${lab[iMin]} · ${lab[iMax]}`,
                 `${nombre(h[iMin], 0)} € · ${nombre(h[iMax], 0)} €, ${ref === "reel" ? t("selon_marche") : t("selon", { m: courtModele(ref) })}`));
  }
  return T.join("");
}
function tablePrix(id, s, j) {                                       // tableau des prix d'un jour (onglet Prévision)
  const cols = colonnes(j);
  const th = (c) => `<th class="modele" title="${nomModele(c)}">${pastille(c)} ${courtModele(c)}</th>`;
  let h = `<thead><tr><th>${t("heure")}</th>${s.reel ? `<th>${pastille("reel")} ${t("marche_court")}</th>` : ""}${cols.map(th).join("")}</tr></thead><tbody>`;
  s.labels.forEach((lab, i) => {
    h += `<tr data-i="${i}"><td>${lab}</td>${s.reel ? `<td class="reel">${nombre(s.reel[i])}</td>` : ""}${cols.map((c) => `<td>${nombre(s[c][i])}</td>`).join("")}</tr>`;
  });
  h += `</tbody><tfoot><tr><td>${t("moyenne")}</td>${s.reel ? `<td class="reel">${nombre(moyenne(s.reel))}</td>` : ""}${cols.map((c) => `<td>${nombre(moyenne(s[c]))}</td>`).join("")}</tr></tfoot>`;
  $(id).innerHTML = h;
  collerEntetes($(id));
}
function rendreBloc(cote, iso, j, now) {
  const p = "p-" + cote, el = $("prev-" + cote), badge = badgeJour(iso, now);
  const tete = (extra) => `<div class="titre-jour"><h2>${t("prix_du", { d: dateLongue(iso) })}</h2><span class="badge${badge === "b_demain" ? " fort" : ""}">${t(badge)}</span>${extra}</div>`;
  if (!j) {
    effacer(p + "-graphique");
    el.innerHTML = tete(`<span class="badge">${t("b_calcul")}</span>`)
      + `<div class="carte"><h3 class="petit-titre">${t("etapes_titre")}</h3><div class="etapes-jour">${etapesAttente(ajouterJours(iso, -1))}</div><p class="note">${t("attente_d")}</p></div>`;
    return;
  }
  const etapes = `<div class="etapes-jour">${etapesJour(j)}</div>`;
  el.innerHTML = tete(j.reel ? `<span class="badge">${t("b_reel")}</span>` : "")
    + (cote === "haut" ? `<div class="carte"><h3 class="petit-titre">${t("etapes_titre")}</h3>${etapes}</div>`
                       : `<details class="carte replie" id="${p}-details"${etat.etapesOuvertes ? " open" : ""}><summary class="petit-titre">${t("etapes_voir")}</summary>${etapes}</details>`)
    + `<div class="tuiles">${tuilesJour(j)}</div>`
    + `<div class="carte"><div class="barre-outils"><h3 class="petit-titre">${t("prix_du_jour")}</h3><div class="segments" id="${p}-pas" role="group"></div></div>`
    + `<div class="choix" id="${p}-choix"></div>`
    + `<div class="duo"><div class="cadre-table"><table id="${p}-table" class="table-donnees"></table></div>`
    + `<div class="graphique"><canvas id="${p}-graphique" role="img" aria-label="${t("prix_du", { d: dateLongue(iso) })}"></canvas></div></div>`
    + `<p class="note">${t(j.reel ? "note_prev_reel" : "note_prev_attente")}</p></div>`;
  const det = $(p + "-details");
  if (det) det.addEventListener("toggle", () => { etat.etapesOuvertes = det.open; });
  segments(p + "-pas", [["quart", t("p_quart")], ["heure", t("p_heure")]], etat.pasPrev[cote], (v) => { etat.pasPrev[cote] = v; rendreBloc(cote, iso, j, maintenantParis()); });
  const s = series(j, etat.pasPrev[cote]);
  choixModeles(p + "-choix", modelesDuJour(j).map((m) => m.code), legendeJour(s));
  tablePrix(p + "-table", s, j);
  lier(dessiner(p + "-graphique", { type: "line", data: { labels: s.labels, datasets: dsJour(s, j) }, options: options(13), plugins: [curseur] }), p + "-table");
}
function rendrePrevision() {
  const A = joursAccueil();
  etat.cleAccueil = A.haut + (A.jHaut ? "+" : "-");
  const bandeau = $("bandeau-retard");
  bandeau.hidden = Boolean(A.jHaut) || (A.haut !== A.now.date && A.now.hm < "11:00");
  if (!bandeau.hidden) bandeau.textContent = "⚠ " + t("retard", { d: dateLongue(A.haut) });
  $("maj").textContent = t("maj", { d: new Date(etat.d.maj).toLocaleString(loc(), { dateStyle: "long", timeStyle: "short" }) });
  rendreBloc("haut", A.haut, A.jHaut, A.now);
  if (A.jBas) rendreBloc("bas", A.jBas.jour, A.jBas, A.now); else $("prev-bas").innerHTML = "";
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
  const cols = colonnes(j), b = meilleur(j), T = [];
  if (j.reel) T.push(tuile(pastille("reel") + t("marche_moyen"), enEuros(moyenne(j.reel)), dateCourte(j.jour)));
  for (const c of cols) {
    const m = MODELES.find((x) => x.code === c), e = j.erreurs && j.erreurs[c], lib = pastille(c) + courtModele(c) + (m ? etiquette(m) : "") + etiquetteMeilleur(c === b);
    T.push(e ? tuile(lib, enEuros(e.mae), t("erreur_biais", { b: signe(e.biais) }), nomModele(c)) : tuile(lib, enEuros(moyenne(j[c])), t("prix_moyen"), nomModele(c)));
  }
  $("hist-tuiles").innerHTML = T.join("");
  segments("hist-pas", [["quart", t("p_quart")], ["heure", t("p_heure")]], etat.pasHist, (v) => { etat.pasHist = v; rendreJour(); });
  $("hist-sous-titre").textContent = j.reel ? t(etat.pasHist === "quart" ? "hist_quart" : "hist_heure") : t("pas_de_reel");
  const s = series(j, etat.pasHist);
  choixModeles("hist-choix", modelesDuJour(j).map((m) => m.code), s.reel ? [["reel", t("marche")]] : []);
  let h = `<thead><tr><th rowspan="2">${t("heure")}</th><th rowspan="2">${pastille("reel")} ${t("marche_court")}</th>`
    + cols.map((c) => `<th colspan="2" class="groupe modele" title="${nomModele(c)}">${pastille(c)} ${courtModele(c)}</th>`).join("") + "</tr><tr>"
    + cols.map(() => `<th class="groupe">${t("prevu")}</th><th>${t("ecart")}</th>`).join("") + "</tr></thead><tbody>";
  s.labels.forEach((lab, k) => {
    const r = s.reel ? s.reel[k] : null;
    h += `<tr data-i="${k}"><td>${lab}</td><td class="reel">${nombre(r)}</td>` + cols.map((c) => `<td class="groupe">${nombre(s[c][k])}</td>${celluleEcart(s[c][k], r)}`).join("") + "</tr>";
  });
  const err = (c) => j.erreurs && j.erreurs[c];                       // erreurs officielles du jour, au quart d'heure (comme les tuiles)
  h += `</tbody><tfoot><tr><td>${t("moyenne")}</td><td class="reel">${nombre(moyenne(s.reel))}</td>`
    + cols.map((c) => `<td class="groupe">${nombre(moyenne(s[c]))}</td><td>${err(c) ? signe(err(c).biais) : "–"}</td>`).join("")
    + `</tr><tr><td>${t("erreur_abs")}</td><td></td>` + cols.map((c) => `<td class="groupe"></td><td>${err(c) ? nombre(err(c).mae) : "–"}</td>`).join("") + "</tr></tfoot>";
  const tab = $("hist-table");
  tab.innerHTML = h;
  collerEntetes(tab);
  const ds = [];
  if (s.reel) ds.push(dsMarche(s.reel));
  for (const m of visibles(j)) ds.push(dsModele(m, s[m.code]));
  if (etat.visibles.hier) ds.push(dsHier(s.hier));
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
  const codes = MODELES.map((m) => m.code), cols = codes.filter((c) => etat.visibles[c]).concat(etat.visibles.hier ? ["hier"] : []);
  for (const id of ["plage-choix", "plage-choix2"]) choixModeles(id, codes, [["reel", t("marche")]]);
  const labels = [], S = { reel: [], ...Object.fromEntries(cols.map((c) => [c, []])) };
  for (const j of js) {
    if (etat.pasPlage === "jour") {
      labels.push(dateCourte(j.jour));
      S.reel.push(j.reel ? moyenne(j.reel) : null);
      for (const c of cols) S[c].push(j[c] ? moyenne(j[c]) : null);
    } else {
      const s = series(j, "heure"), vide = s.labels.map(() => null);
      s.labels.forEach((lab) => labels.push(`${dateCourte(j.jour)} ${lab}`));
      S.reel.push(...(s.reel || vide));
      for (const c of cols) S[c].push(...(s[c] || vide));
    }
  }
  const style = etat.pasPlage === "jour" ? { pointRadius: 2 } : { borderWidth: 1.5 }, ds = [dsMarche(S.reel)];
  for (const m of MODELES) if (S[m.code] && S[m.code].some((x) => x !== null)) ds.push(dsModele(m, S[m.code], style));
  if (etat.visibles.hier) ds.push(dsHier(S.hier, etat.pasPlage === "jour" ? { pointRadius: 2 } : {}));
  dessiner("plage-graphique", { type: "line", data: { labels, datasets: ds }, options: options(10), plugins: [curseur] });
  $("plage-graphique").setAttribute("aria-label", $("plage-sous-titre").textContent);
  let h = `<thead><tr><th rowspan="2">${t("date")}</th><th rowspan="2">${t("source")}</th><th rowspan="2">${pastille("reel")} ${t("marche_moyen")}</th>`
    + cols.map((c) => `<th colspan="2" class="groupe modele" title="${nomModele(c)}">${pastille(c)} ${courtModele(c)}</th>`).join("") + "</tr><tr>"
    + cols.map(() => `<th class="groupe">${t("prevu_moyen")}</th><th>${t("erreur_court")}</th>`).join("") + "</tr></thead><tbody>";
  for (const j of [...js].reverse()) {
    const best = meilleur(j);
    h += `<tr data-jour="${j.jour}"><td>${dateMoyenne(j.jour)}</td><td>${t(j.source === "direct" ? "direct" : "rejeu")}</td><td class="reel">${nombre(j.reel ? moyenne(j.reel) : null)}</td>`
      + cols.map((c) => {
        const e = j.erreurs && j.erreurs[c];
        return `<td class="groupe">${nombre(j[c] ? moyenne(j[c]) : null)}</td><td${c === best ? ' class="fort"' : ""}>${e ? nombre(e.mae) : "–"}</td>`;
      }).join("") + "</tr>";
  }
  const avecPrix = js.filter((j) => j.reel);
  h += `</tbody><tfoot><tr><td>${t("moyenne_periode")}</td><td></td><td class="reel">${nombre(moyenne(avecPrix.map((j) => moyenne(j.reel))))}</td>`
    + cols.map((c) => { const st = stats(avecPrix, c); return `<td class="groupe">${nombre(moyenne(js.map((j) => (j[c] ? moyenne(j[c]) : null))))}</td><td>${st ? nombre(st.mae) : "–"}</td>`; }).join("")
    + "</tr></tfoot>";
  const tab = $("plage-table");
  tab.innerHTML = h;
  collerEntetes(tab);
  tab.querySelectorAll("tbody tr").forEach((r) => r.addEventListener("click", () => ouvrirJour(r.dataset.jour)));
}
function ouvrirJour(iso) { etat.jourHist = iso; etat.modeHist = "jour"; location.hash = "#historique/" + iso; }

/* ---------------------------------------------------------------- onglet Performance */
function rendrePerformance() {
  segments("perf-periode", [["tout", t("pf_tout")], ["30", t("pf_30")], ["direct", t("pf_direct")]], etat.periodePerf, (v) => { etat.periodePerf = v; rendrePerformance(); });
  const codes = MODELES.map((m) => m.code);
  for (const id of ["perf-choix", "perf-choix2"]) choixModeles(id, codes);
  let js = joursAvecPrix();
  if (etat.periodePerf === "30") js = js.slice(-30);
  if (etat.periodePerf === "direct") js = js.filter((j) => j.source === "direct");
  const resume = $("perf-resume");
  if (!js.length) {
    resume.innerHTML = `<tbody><tr><td>${t("aucun_direct", { d: dateLongue(etat.d.debut_direct) })}</td></tr></tbody>`;
    for (const id of ["perf-jours", "perf-heures"]) effacer(id);
    $("perf-difficiles").innerHTML = "";
    return;
  }
  const victoires = Object.fromEntries(codes.map((c) => [c, 0]));
  let nj = 0;
  for (const j of js) { const b = meilleur(j); if (b) { nj++; victoires[b]++; } }
  const vus = codes.filter((c) => etat.visibles[c]), sh = stats(js, "hier");
  const st = vus.map((c) => [c, stats(js, c)]).filter(([, s]) => s);
  const best = st.length ? st.reduce((a, b) => (b[1].mae < a[1].mae ? b : a))[0] : null;
  let h = `<thead><tr><th>${t("c_modele")} · ${t("jours_n", { n: js.length })}</th><th>${t("c_mae")}</th><th>${t("c_rel")}</th><th>${t("c_biais")}</th><th>${t("c_rmse")}</th><th>${t("c_meilleur")}</th><th>${t("c_gain")}</th></tr></thead><tbody>`;
  for (const [c, s] of st.concat(etat.visibles.hier ? [["hier", sh]] : [])) {
    const m = MODELES.find((x) => x.code === c);
    h += `<tr${c === best ? ' class="meilleur"' : ""}><td><span class="nom-modele">${pastille(c)}${nomModele(c)}${m ? etiquette(m) : ""}</span></td><td>${nombre(s.mae)} ${t("unite")}</td><td>${nombre(s.rel, 0)} %</td><td>${signe(s.biais)}</td><td>${nombre(s.rmse)}</td>`
      + `<td>${c === "hier" ? "–" : nombre((100 * victoires[c]) / nj, 0) + " %"}</td><td>${c === "hier" ? "–" : `<span class="positif">${signe((100 * (sh.mae - s.mae)) / sh.mae, 0)} %</span>`}</td></tr>`;
  }
  resume.innerHTML = h + "</tbody>";
  const ds = MODELES.filter((m) => etat.visibles[m.code] && js.some((j) => j.erreurs[m.code])).map((m) => dsModele(m, js.map((j) => (j.erreurs[m.code] ? j.erreurs[m.code].mae : null)), { pointRadius: 2 }));
  if (etat.visibles.hier) ds.push(dsHier(js.map((j) => j.erreurs.hier.mae)));
  const o = options(8, true), iDirect = js.findIndex((j) => j.source === "direct");
  o.plugins.marqueur = { index: iDirect > 0 ? iDirect : null, texte: t("mise_en_ligne") };
  dessiner("perf-jours", { type: "line", data: { labels: js.map((j) => dateCourte(j.jour)), datasets: ds }, options: o, plugins: [curseur, marqueur] });
  const somme = {}, nb = {};
  for (const j of js) {
    j.heures.forEach((hq, i) => {
      const k = hq.slice(0, 2);
      for (const c of [...codes, "hier"]) {
        const p = j[c];
        if (!p || p[i] === null || j.reel[i] === null) continue;
        somme[c] = somme[c] || {}; nb[c] = nb[c] || {};
        somme[c][k] = (somme[c][k] || 0) + Math.abs(p[i] - j.reel[i]); nb[c][k] = (nb[c][k] || 0) + 1;
      }
    });
  }
  const hs = [...Array(24).keys()].map((x) => String(x).padStart(2, "0"));
  const serieH = (c) => hs.map((k) => (nb[c] && nb[c][k] ? somme[c][k] / nb[c][k] : null));
  const dh = MODELES.filter((m) => etat.visibles[m.code] && somme[m.code]).map((m) => dsModele(m, serieH(m.code), { pointRadius: 2 }));
  if (etat.visibles.hier) dh.push(dsHier(serieH("hier")));
  dessiner("perf-heures", { type: "line", data: { labels: hs.map((k) => k + (etat.langue === "fr" ? " h" : ":00")), datasets: dh }, options: options(12, true), plugins: [curseur] });
  const cols = vus.concat(etat.visibles.hier ? ["hier"] : []);
  const dur = js.filter((j) => j.erreurs.GR).sort((a, b) => b.erreurs.GR.mae - a.erreurs.GR.mae).slice(0, 8);
  let hd = `<thead><tr><th>${t("date")}</th><th>${pastille("reel")} ${t("marche_moyen")}</th>`
    + cols.map((c) => `<th class="modele" title="${nomModele(c)}">${pastille(c)} ${courtModele(c)} · ${t("erreur_moy")}</th>`).join("") + "</tr></thead><tbody>";
  for (const j of dur) {
    hd += `<tr data-jour="${j.jour}"><td>${dateMoyenne(j.jour)}</td><td>${nombre(moyenne(j.reel))}</td>` + cols.map((c) => `<td>${j.erreurs[c] ? nombre(j.erreurs[c].mae) : "–"}</td>`).join("") + "</tr>";
  }
  $("perf-difficiles").innerHTML = hd + "</tbody>";
  $("perf-difficiles").querySelectorAll("tbody tr").forEach((r) => r.addEventListener("click", () => ouvrirJour(r.dataset.jour)));
}

/* ---------------------------------------------------------------- onglet Modèles */
function rendreModeles() {
  const f = MODELES.map((m) => `<div class="fiche"><h4>${pastille(m.code)}${nomModele(m.code)}${etiquette(m)}</h4><p class="court">${t("nom_court", { c: courtModele(m.code) })}</p>`
    + `${t("f_" + m.code).map((p, i) => `<p${i === 2 ? ' class="chiffre"' : ""}>${p}</p>`).join("")}</div>`);
  f.push(`<div class="fiche"><h4>${pastille("hier")}${t("hier")}</h4><p class="court">${t("nom_court", { c: t("hier_court") })}</p>${t("f_hier").map((p) => `<p>${p}</p>`).join("")}</div>`);
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
function rafraichir() {                                              // toutes les 5 min : nouvelles données, ou passage de 10 h (changement des deux jours affichés)
  fetch("data/donnees.json", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (!d) return;
      const nouveau = d.maj !== etat.d.maj;
      etat.d = d;
      const A = joursAccueil();
      if (nouveau || (etat.onglet === "prevision" && A.haut + (A.jHaut ? "+" : "-") !== etat.cleAccueil)) afficher();
    })
    .catch(() => { /* réseau indisponible : on réessaiera */ });
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
    .then((d) => { etat.d = d; lireAncre(); toutAfficher(); setInterval(rafraichir, 5 * 60 * 1000); })
    .catch(() => { document.querySelector("main").innerHTML = `<p class="carte">${t("chargement")}</p>`; });
}
document.addEventListener("DOMContentLoaded", demarrer);
