/* Site « Prix de l'électricité de demain » : lit data/donnees.json (écrit chaque jour par site_web.py) et dessine onglets, tableaux et graphiques (Chart.js). */
"use strict";

const TXT = {
  fr: {
    titre: "Prédiction du prix de l’électricité à J+1",
    prevision_modele: "Prévision de notre modèle",
    legende_prevision: "Notre prévision ({m})",
    jour_prec: "Jour précédent", jour_suiv: "Jour suivant", modele_aff: "Modèle affiché", contact: "Contact", modeles_menu: "Modèles", m_meilleur: "meilleur du jour", m_meilleur_p: "meilleur de la période", m_tout: "Tout cocher", n_modeles: "{n} modèles", m_reset: "Revenir au modèle principal", t_moyenne: "Prix moyen", t_erreur: "Erreur moyenne", t_erreur_quart: "Erreur au quart d'heure", t_erreur_heure: "Erreur à l'heure", t_attente: "en attente du prix", err_titre: "Erreur moyenne", err_quart: "au quart d'heure", err_heure: "à l'heure", err_pct: "{p} % du prix moyen", err_veille: "Repère « veille » : {x} € · {g}", err_mieux: "{p} % d'erreur en moins", err_moins: "{p} % d'erreur en plus", err_attente: "Calculée dès que le prix du marché est publié (vers 13 h 45)", err_aide: "Écart moyen, en valeur absolue, entre notre prévision et le prix fixé par le marché", o_prevision: "Prévision", o_historique: "Historique", o_performance: "Performance", maj: "Site mis à jour le {d}",
    prix_du: "Prix du {d}",
    b_demain: "demain", b_aujourdhui: "aujourd'hui", b_hier: "hier", b_passe: "jour passé", b_reel: "prix réel connu", b_calcul: "calcul en cours",
    retard: "La prévision du {d} n'est pas encore publiée : elle l'est normalement vers 11 h 15.",
    attente_d: "Le calcul démarre vers 11 h 30 (après la publication du prix britannique) et dure une quinzaine de minutes. Cette page se met à jour toute seule.",
    etapes_titre: "Étapes de la prévision",
    etapes_voir: "Étapes de la prévision de ce jour",
    g_donnees: "Données reçues", g_calculs: "Calculs", g_resultat: "Publication et vérification", g_donnees_c: "Données", g_calculs_c: "Calculs", g_resultat_c: "Publication",
    prix_du_jour: "Prix de la journée, en €/MWh (heure de Paris)",
    p_quart: "Quart d'heure", p_heure: "Heure", p_jour: "Moyenne par jour",
    note_prev_attente: "Le prix du marché s'ajoutera au tableau et au graphique dès sa publication (enchère de 12 h 45, récupéré vers 13 h 45).",
    note_prev_reel: "Le prix du marché est publié : il apparaît à côté des prévisions.",
    afficher: "Afficher :",
    ck_prix: "Prix des jours passés reçus", nk_prix: "Prix des jours passés", ck_prix_d: "connus jusqu'au {d}",
    ck_conso: "Prévision de consommation RTE reçue", nk_conso: "Prévision de consommation RTE", ck_conso_d: "{x} GW en moyenne sur la journée",
    ck_gaz: "Données gaz reçues (prix TTF)", nk_gaz: "Données gaz (prix TTF)", ck_gaz_d: "clôture du {d} · source : {s}",
    ck_gaz_orange: "Données gaz un peu anciennes", ck_gaz_rouge: "Données gaz manquantes",
    ck_meteo: "Données météo reçues (GFS, NOAA)", nk_meteo: "Données météo (GFS, NOAA)", ck_meteo_trou: "Données météo incomplètes",
    ck_meteo_d: "run du {d} à 00 h UTC · {h} heures sur {n}",
    ck_prod: "Production solaire et éolienne prévue", nk_prod: "Prévision de production solaire et éolienne", ck_prod_d: "solaire {s} GWh · éolien {e} GWh sur la journée",
    ck_prod_run_06Z: " · météo du run de 6 h", ck_prod_run_00Z: " · météo du run de 0 h (run de 6 h indisponible : secours)",
    ck_prod_modeles06: "Modèles de production (run de 6 h) réappris", nk_prod_modeles06: "Réapprentissage des modèles de production (run de 6 h)",
    ck_modele: "Modèle « {m} » calculé", nk_modele: "Modèle « {m} »", ck_modele_absent: "Modèle « {m} » non calculé",
    ck_modele_d: "appris avec les prix jusqu'au {v} inclus · {h} heures prévues · {a} arbres", ck_modele_d_simple: "appris avec les prix jusqu'au {v} inclus",
    ck_modele_rejeu: "calculé a posteriori (rejeu)", ck_modele_absent_d: "absent de la prévision", ck_modele_sans_gaz: "pas de prix du gaz récent",
    ck_publie: "Prévision publiée", nk_publie: "Publication de la prévision",
    ck_publie_d: "le {d}, sans voir le prix réel du jour visé", ck_publie_att: "vers 10 h 30",
    ck_reel: "Prix réel de l'électricité reçu", nk_reel: "Prix réel de l'électricité", ck_reel_d: "le {d}", ck_reel_fichier: "fichier des prix du marché",
    ck_reel_attente: "publié vers 12 h 45 le {d}, récupéré vers 13 h 45", ck_reel_cours: "enchère publiée à 12 h 45 : récupération vers 13 h 45", ck_reel_retard: "pas encore reçu",
    ck_ecarts: "Écarts calculés", nk_ecarts: "Calcul des écarts", ck_ecarts_d: "meilleur : « {m} », {x} €/MWh d'erreur moyenne", ck_ecarts_att: "dès que le prix réel est reçu",
    ck_inconnu: "non enregistré", ck_attente_d: "en attente (vers 11 h 30)",
    prix_moyen: "prix moyen prévu", prevu_erreur: "prix moyen prévu · erreur moyenne {x} €", erreur_biais: "erreur moyenne · biais {b} €",
    marche_moyen: "Prix moyen du marché", veille: "Prix moyen de la veille",
    moins_plus: "Heure la moins chère · la plus chère", selon: "selon « {m} »", selon_marche: "selon le marché",
    fourchette: "Fourchette indicative (80 % des écarts passés)",
    marche: "Marché (prix réel)", marche_court: "Marché",
    hier: "Prix de la veille (même quart d'heure)", hier_court: "Veille",
    sem: "Prix du même jour de la semaine précédente (même quart d'heure)", sem_court: "Même jour sem. d'avant", sem_mini: "Sem. d'avant",
    heure: "Heure", prevu: "prévu", ecart: "écart", ecart_pc: "écart %", ns: "n.s.", ns_t: "Prix du marché inférieur à 20 €/MWh : un écart en % n'aurait pas de sens", biais_t: "Écart moyen prévu − marché (positif : prévision trop haute en moyenne)", err_rel_t: "Erreur moyenne rapportée au prix moyen du marché", moyenne: "Moyenne", min_t: "Prix le plus bas de la journée", max_t: "Prix le plus haut de la journée", min_c: "le plus bas", max_c: "le plus haut", erreur_abs: "Erreur moyenne",
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
    intro_perf: "Erreur de chaque modèle par rapport au prix du marché, au quart d'heure. Plus c'est bas, mieux c'est. L'erreur relative rapporte la somme des erreurs à la somme des prix. Deux repères naïfs, sans modèle, servent de comparaison : « Veille » (même quart d'heure la veille) et « Même jour sem. d'avant » (même quart d'heure, le même jour de la semaine précédente : un mardi est comparé au mardi d'avant). Le gain se mesure contre la veille. La corrélation (de −1 à 1, 1 = parfait) dit si le modèle suit bien les hausses et les baisses du prix, sans tenir compte du niveau ; « dans la journée » = moyenne des corrélations de chaque jour sur ses quarts d'heure.",
    pf_pas_titre: "Erreur calculée", pf_quart: "Au quart d'heure", pf_heure: "À l'heure", pf_jour: "Par jour", pf_note_pas: "Prévision et prix du marché sont moyennés par {u} avant de calculer l'écart : plus la durée est longue, plus les erreurs se compensent.", u_heure: "heure", u_jour: "journée", pf_dates: "Dates précises", jours_h: "{n} jours = {h} heures", pf_du: "du", pf_au: "au", pf_tout: "Tout l'historique", pf_30: "30 derniers jours", pf_direct: "Depuis la mise en ligne",
    aucun_direct: "Pas encore de jour prévu en direct : les premières prévisions publiées commencent le {d}.",
    c_corr: "Corrélation", c_corr_j: "Corrél. jour", corr_court: "corrélation {r}",
    c_modele: "Modèle", c_mae: "Erreur moyenne", c_rel: "Erreur relative", c_biais: "Biais", c_rmse: "Erreur quadratique", c_meilleur: "Meilleur du jour", c_gain: "Gain contre la veille",
    jours_n: "{n} jours",
    perf_courbe: "Prix prévu et prix du marché sur la période (€/MWh)", perf_courbe_note: "Toute la période choisie plus haut, d'un seul tenant, au pas choisi (quart d'heure, heure ou moyenne de la journée). Passez la souris sur la courbe pour lire les prix. Les jours d'avant la mise en ligne sont rejoués a posteriori.", pf_7: "7 derniers jours",
    perf_jours: "Erreur moyenne de chaque jour (€/MWh)",
    perf_heures: "À quelle heure se trompe-t-on ? Erreur moyenne par heure de la journée (€/MWh)",
    perf_difficiles: "Les jours les plus difficiles pour Zéphyr (classés selon son erreur moyenne)",
    mise_en_ligne: "mise en ligne",
    court_GR: "GFS-G", court_CR: "GFS-G-P", court_GT: "GFS-RG",
    tag_principal: "principal", tag_secours_jour: "modèle de secours",
    pied: "Ces prévisions ne constituent pas un conseil d'investissement. Prix du marché : EPEX SPOT, données Bundesnetzagentur | SMARD.de (CC BY 4.0) via Energy-Charts.info (Fraunhofer ISE).",
    o_production: "Production (bonus)", ck_rejeu: "Prévision recalculée après coup", ck_rejeu_d: "le site a été mis en ligne le {m} : ce jour a été rejoué avec exactement la méthode du service. Le détail des étapes n'est enregistré que depuis le {d}.",
    prod_titre: "Bonus : notre prévision de production solaire et éolienne",
    prod_demain: "Production prévue pour le {d} (France, GW)", prod_prevu_jour: "prévu sur la journée",
    prod_controle: "Prévu contre réel : notre modèle a-t-il bien prévu ?", prod_controle_note: "Production prévue la veille (pointillés) et production réellement mesurée par RTE (traits pleins), pour la France heure par heure. Changez de jour avec les flèches ou le calendrier ; par défaut, le dernier jour dont la production réelle est complète.",
    prod_heure: "Heure par heure (GW)", prod_regions: "Par région (GWh sur la journée)",
    prod_historique: "Précision sur tout l'historique",
    prod_hist_note: "Calculée sur les jours où la production réelle est connue toute la journée. Erreur journalière : écart entre le total prévu et le total réel de chaque jour ; erreur horaire : somme des écarts heure par heure ; les deux rapportées à la production réelle. Biais positif : on prévoit trop.",
    p_prevu: "prévu", p_reel: "réel (RTE)", sol_court: "Solaire", eol_court: "Éolien", total_court: "Total solaire + éolien", region: "Région", france: "France",
    sol_prevu: "Solaire prévu", eol_prevu: "Éolien prévu", sol_reel: "Solaire réel", eol_reel: "Éolien réel",
    reel_vs: "réel {r} GWh · écart {e} %", reel_partiel: "réel connu sur {h} h sur {n}", reel_absent: "réel pas encore publié (mis à jour chaque matin)",
    perf_ligne: "erreur journalière {j} % · horaire {h} % · biais {b} %", perf_n: "{n} jours complets",
    p_rte: "prévu RTE", rte_court: "Prévision RTE", sol_rte: "Solaire prévu par RTE", eol_rte: "Éolien prévu par RTE", rte_jour: "RTE prévoit {v} GWh",
    rte_titre: "Notre prévision de production contre celle de RTE",
    prod_jour: "Production solaire et éolienne du {d}",
    duel_nous: "Notre modèle", duel_rte: "Prévision de RTE", duel_reel: "Réel mesuré par RTE", duel_proche: "le plus proche",
    duel_ecart: "écart au réel : {e} %", duel_faite: "prévision faite la veille vers 11 h 30", duel_rte_absent: "pas encore publiée",
    duel_rte_quand: "publiée la veille jusqu'à 18 h, trop tard pour l'enchère", duel_attente: "pas encore connu", duel_attente_d: "publié par RTE au fil de la journée",
    duel_mesure: "éCO2mix temps réel, valeurs provisoires", duel_rte_partiel: "{f} seulement : l'autre filière n'est pas publiée par RTE ce jour-là",
    rte_hist_titre: "Sur tout l'historique : notre modèle contre RTE et la veille ({q}, {n} jours)",
    duel_veille: "Repère naïf : la veille", veille_prod_court: "Veille (repère naïf)", hist_mieux_v: "et que la veille {p} % des jours",
    rte_veille_note: "Repère naïf « veille » : la production réelle de la veille, à la même heure. Elle n'est pas encore finie à 11 h, quand la prévision est faite : ce repère est donc un peu avantagé.",
    hist_det: "erreur journalière · horaire {h} % · biais {b} %", hist_mieux: "Notre modèle fait mieux que RTE", hist_jours: "des jours", hist_mieux_d: "{m} jours sur {n}",
    rte_court_note: "RTE publie sa prévision trop tard pour l'enchère du prix (jusqu'à 18 h la veille, contre 12 h 45) : nous devons donc prévoir nous-mêmes la production. Pourquoi RTE fait un peu mieux : voir en bas de page.",
    rte_err_titre: "Erreur moyenne par semaine (écart entre le total prévu et le total réel de chaque jour, en %) : plus c'est bas, mieux c'est",
    sem_du: "Semaine du {d} au {f} ({n} jours)",
    rte_pourquoi: "Pourquoi prévoir nous-mêmes alors que RTE publie une prévision ?",
    rte_detail: "Détail par filière (erreur journalière, horaire, biais ; nous, RTE et la veille)",
    rte_t_jour: "Erreur journalière, solaire + éolien", rte_t_heure: "Erreur horaire, solaire + éolien", rte_t_mieux: "Jours où nous faisons mieux que RTE",
    rte_t_nous: "nous", rte_t_rte: "RTE : {v} %", rte_t_n: "sur {n} jours",
    rte_cols: ["", "Erreur journalière : nous", "RTE", "Veille", "Erreur horaire : nous", "RTE", "Veille", "Biais : nous", "RTE", "Veille", "Jours mieux que RTE", "Jours mieux que la veille"],
    pas_de_prod: "Pas encore de prévision de production.",
    ck_prod_modeles: "Modèles de production réappris", nk_prod_modeles: "Réapprentissage des modèles de production",
    ck_prod_modeles_d: "avec la production réelle jusqu'au {d} inclus · solaire {s} arbres · éolien {e} arbres",
    ck_prod_modeles_echec: "échec : modèles de la veille utilisés", ck_prod_modeles_fige: "prévision faite avant la mise en place du réapprentissage quotidien (le 23/10 au soir) : production apprise jusqu'au 31/08/2026",
    court_EMT: "EUR+Zéphyr",
    court_EMT0: "EUR+Zéphyr (été)",
    court_TOUT: "Zéphyr",
    court_TOUT0: "Zéphyr (été)",
    tag_s5: "secours n°4", tag_ete: "secours d'été",
    court_EM: "EUR-moy4", court_EP: "EUR-moy2", court_EU: "EUR", court_EUC: "EUR+", court_GB: "EUR-GB",
    tag_s1: "secours n°1", tag_s2: "secours n°2", tag_s3: "secours n°3", tag_s4: "dernier recours", tag_suivi: "suivi", tag_ancien: "ancien",
    ck_europe: "Marchés voisins, échanges, nucléaire et prix britannique", nk_europe: "Marchés voisins et prix britannique",
    ck_europe_d: "prix britannique de demain publié le {d}", ck_europe_echec: "en panne : {l}", ck_europe_avant: "pas encore utilisés ce jour-là (modèle Europe en service depuis le 29/10/2026)",
    ck_modele_rejeu_eu: "recalculé a posteriori (modèle mis en service le 29/10/2026)", ck_modele_manque: "non calculé : données manquantes ({l})",
    chargement: "Impossible de charger les données.",
    unite: "€/MWh",
      // recette masquée (07/11/2026) : noms et textes neutres, remplacés par ceux de infos_modeles.js quand ce fichier est chargé
    nom_TOUT: "Modèle principal",
    nom_TOUT0: "Secours d'été du modèle principal",
    nom_EM: "Modèle de secours n°1",
    nom_EP: "Modèle de secours n°2",
    nom_EU: "Modèle de secours n°3",
    nom_GB: "Modèle de secours n°4",
    nom_GR: "Modèle de dernier recours",
    nom_EMT: "Modèle suivi n°1",
    nom_EMT0: "Secours d'été du modèle suivi n°1",
    nom_EUC: "Modèle suivi n°2",
    nom_CR: "Ancien modèle n°1",
    nom_GT: "Ancien modèle n°2",
    intro_prod: "Avant de prévoir le prix, nous prévoyons la production solaire et éolienne de chaque région. Les modèles de production sont réappris chaque matin. L'historique affiché ici est la production prévue chaque jour la veille.",
    rte_note: "La prévision de RTE arrive trop tard : RTE la publie la veille jusqu'à 18 h, alors que l'enchère qui fixe le prix a lieu à 12 h 45. Pour prévoir le prix, nous devons donc prévoir nous-mêmes la production solaire et éolienne, le matin. RTE fait un peu mieux, et cela s'explique : sa prévision est faite plus tard, avec une météo plus récente et la télémesure de ses installations. Notre prévision ne tient pas compte de l'arrêt volontaire des parcs quand le prix est négatif, d'où un biais positif sur le solaire. Les deux prévisions sont comparées sur les mêmes jours, à la production réellement mesurée par RTE.",
    prod_note: "Quand le prix devient négatif, une partie des parcs s'arrête volontairement : la production réelle est alors plus basse que notre prévision (surtout le solaire en milieu de journée). Production réelle : éCO2mix temps réel de RTE, valeurs provisoires, mises à jour à chaque mise à jour du site (matin et après-midi).",
  },
  en: {
    titre: "Next-day electricity price forecast",
    prevision_modele: "Our model’s forecast",
    legende_prevision: "Our forecast ({m})",
    jour_prec: "Previous day", jour_suiv: "Next day", modele_aff: "Model shown", contact: "Contact", modeles_menu: "Models", m_meilleur: "best of the day", m_meilleur_p: "best of the period", m_tout: "Select all", n_modeles: "{n} models", m_reset: "Back to the main model", t_moyenne: "Average price", t_erreur: "Mean error", t_erreur_quart: "Quarter-hour error", t_erreur_heure: "Hourly error", t_attente: "awaiting price", err_titre: "Mean error", err_quart: "per quarter-hour", err_heure: "per hour", err_pct: "{p} % of the average price", err_veille: "\"Day before\" benchmark: €{x} · {g}", err_mieux: "{p} % less error", err_moins: "{p} % more error", err_attente: "Computed as soon as the market price is published (around 13:45)", err_aide: "Average absolute gap between our forecast and the price set by the market", o_prevision: "Forecast", o_historique: "History", o_performance: "Performance", maj: "Site updated {d}",
    prix_du: "Prices for {d}",
    b_demain: "tomorrow", b_aujourdhui: "today", b_hier: "yesterday", b_passe: "past day", b_reel: "actual price known", b_calcul: "computing",
    retard: "The forecast for {d} is not published yet: it normally is around 11:15.",
    attente_d: "The computation starts around 11:30 (after the British price is published) and takes about fifteen minutes. This page updates by itself.",
    etapes_titre: "Forecast steps",
    etapes_voir: "Forecast steps for this day",
    g_donnees: "Data received", g_calculs: "Computations", g_resultat: "Publication and check", g_donnees_c: "Data", g_calculs_c: "Models", g_resultat_c: "Publication",
    prix_du_jour: "Prices over the day, €/MWh (Paris time)",
    p_quart: "Quarter-hour", p_heure: "Hour", p_jour: "Daily average",
    note_prev_attente: "The market price will be added to the table and chart once published (12:45 auction, fetched around 13:45).",
    note_prev_reel: "The market price is out: it is shown next to the forecasts.",
    afficher: "Show:",
    ck_prix: "Past prices received", nk_prix: "Past prices", ck_prix_d: "known up to {d}",
    ck_conso: "RTE load forecast received", nk_conso: "RTE load forecast", ck_conso_d: "{x} GW on average over the day",
    ck_gaz: "Gas data received (TTF price)", nk_gaz: "Gas data (TTF price)", ck_gaz_d: "close of {d} · source: {s}",
    ck_gaz_orange: "Gas data slightly old", ck_gaz_rouge: "Gas data missing",
    ck_meteo: "Weather data received (GFS, NOAA)", nk_meteo: "Weather data (GFS, NOAA)", ck_meteo_trou: "Weather data incomplete",
    ck_meteo_d: "run of {d} 00 UTC · {h} hours out of {n}",
    ck_prod: "Solar and wind output forecast", nk_prod: "Solar and wind output forecast", ck_prod_d: "solar {s} GWh · wind {e} GWh over the day",
    ck_prod_run_06Z: " · 06:00 UTC run weather", ck_prod_run_00Z: " · 00:00 UTC run weather (06:00 run unavailable: fallback)",
    ck_prod_modeles06: "Production models (06:00 run) retrained", nk_prod_modeles06: "Production model retraining (06:00 run)",
    ck_modele: "Model \"{m}\" computed", nk_modele: "Model \"{m}\"", ck_modele_absent: "Model \"{m}\" not computed",
    ck_modele_d: "trained on prices up to {v} included · {h} hours forecast · {a} trees", ck_modele_d_simple: "trained on prices up to {v} included",
    ck_modele_rejeu: "computed afterwards (replay)", ck_modele_absent_d: "missing from the forecast", ck_modele_sans_gaz: "no recent gas price",
    ck_publie: "Forecast published", nk_publie: "Forecast publication",
    ck_publie_d: "{d}, without seeing the actual price of the target day", ck_publie_att: "around 10:30",
    ck_reel: "Actual electricity price received", nk_reel: "Actual electricity price", ck_reel_d: "{d}", ck_reel_fichier: "market price file",
    ck_reel_attente: "published around 12:45 on {d}, fetched around 13:45", ck_reel_cours: "auction published at 12:45: fetched around 13:45", ck_reel_retard: "not received yet",
    ck_ecarts: "Errors computed", nk_ecarts: "Error computation", ck_ecarts_d: "best: \"{m}\", {x} €/MWh mean error", ck_ecarts_att: "once the actual price is received",
    ck_inconnu: "not recorded", ck_attente_d: "waiting (around 11:30)",
    prix_moyen: "average forecast price", prevu_erreur: "average forecast · mean error {x} €", erreur_biais: "mean error · bias {b} €",
    marche_moyen: "Average market price", veille: "Previous day's average",
    moins_plus: "Cheapest · most expensive hour", selon: "according to \"{m}\"", selon_marche: "according to the market",
    fourchette: "Indicative range (80% of past errors)",
    marche: "Market (actual price)", marche_court: "Market",
    hier: "Previous day's price (same quarter-hour)", hier_court: "Day before",
    sem: "Price on the same weekday of the previous week (same quarter-hour)", sem_court: "Same day last week", sem_mini: "Last week",
    heure: "Time", prevu: "forecast", ecart: "error", ecart_pc: "error %", ns: "n.s.", ns_t: "Market price below 20 €/MWh: a percentage error would be meaningless", biais_t: "Average forecast − market gap (positive: forecast too high on average)", err_rel_t: "Mean error relative to the average market price", moyenne: "Average", min_t: "Lowest price of the day", max_t: "Highest price of the day", min_c: "lowest", max_c: "highest", erreur_abs: "Mean error",
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
    intro_perf: "Error of each model against the market price, per quarter-hour. Lower is better. The relative error divides the sum of errors by the sum of prices. Two naive benchmarks, with no model, serve as references: \"Day before\" (same quarter-hour the day before) and \"Same day last week\" (same quarter-hour, same weekday of the previous week: a Tuesday is compared with the previous Tuesday). The gain is measured against the day before. The correlation (−1 to 1, 1 = perfect) tells whether the model follows the price ups and downs, regardless of level; \"within-day\" = average of each day's correlation over its quarter-hours.",
    pf_pas_titre: "Error computed", pf_quart: "Per quarter-hour", pf_heure: "Per hour", pf_jour: "Per day", pf_note_pas: "Forecast and market price are averaged over each {u} before the gap is computed: the longer the span, the more the errors cancel out.", u_heure: "hour", u_jour: "day", pf_dates: "Custom dates", jours_h: "{n} days = {h} hours", pf_du: "from", pf_au: "to", pf_tout: "Full history", pf_30: "Last 30 days", pf_direct: "Since going live",
    aucun_direct: "No live day yet: the first published forecasts start on {d}.",
    c_corr: "Correlation", c_corr_j: "Daily correl.", corr_court: "correlation {r}",
    c_modele: "Model", c_mae: "Mean error", c_rel: "Relative error", c_biais: "Bias", c_rmse: "Root mean square error", c_meilleur: "Best of the day", c_gain: "Gain over the day before",
    jours_n: "{n} days",
    perf_courbe: "Forecast and market price over the period (€/MWh)", perf_courbe_note: "The whole period chosen above, in one piece, at the chosen step (quarter-hour, hour or daily average). Hover over the curve to read the prices. Days before going live are replayed after the fact.", pf_7: "Last 7 days",
    perf_jours: "Mean error of each day (€/MWh)",
    perf_heures: "When are we wrong? Mean error by hour of the day (€/MWh)",
    perf_difficiles: "The hardest days for Zéphyr (ranked by its average error)",
    mise_en_ligne: "live",
    court_GR: "GFS-G", court_CR: "GFS-G-P", court_GT: "GFS-RG",
    tag_principal: "main", tag_secours_jour: "backup model",
    pied: "These forecasts are not investment advice. Market prices: EPEX SPOT, data Bundesnetzagentur | SMARD.de (CC BY 4.0) via Energy-Charts.info (Fraunhofer ISE).",
    o_production: "Production (bonus)", ck_rejeu: "Forecast recomputed afterwards", ck_rejeu_d: "the site went live on {m}: this day was replayed with exactly the service's method. Step details are only recorded since {d}.",
    prod_titre: "Bonus: our solar and wind production forecast",
    prod_demain: "Forecast output for {d} (France, GW)", prod_prevu_jour: "forecast for the day",
    prod_controle: "Forecast versus actual: did our model get it right?", prod_controle_note: "Output forecast the day before (dashed) and output actually measured by RTE (solid), for France hour by hour. Change day with the arrows or the calendar; by default, the latest day whose actual output is complete.",
    prod_heure: "Hour by hour (GW)", prod_regions: "By region (GWh over the day)",
    prod_historique: "Accuracy over the full history",
    prod_hist_note: "Computed on days where actual output is known for the whole day. Daily error: gap between forecast and actual daily totals; hourly error: sum of hour-by-hour gaps; both relative to actual output. Positive bias: forecast too high.",
    p_prevu: "forecast", p_reel: "actual (RTE)", sol_court: "Solar", eol_court: "Wind", total_court: "Solar + wind", region: "Region", france: "France",
    sol_prevu: "Forecast solar", eol_prevu: "Forecast wind", sol_reel: "Actual solar", eol_reel: "Actual wind",
    reel_vs: "actual {r} GWh · error {e}%", reel_partiel: "actual known for {h} h out of {n}", reel_absent: "actual not published yet (updated every morning)",
    perf_ligne: "daily error {j}% · hourly {h}% · bias {b}%", perf_n: "{n} complete days",
    p_rte: "RTE forecast", rte_court: "RTE forecast", sol_rte: "Solar forecast by RTE", eol_rte: "Wind forecast by RTE", rte_jour: "RTE forecasts {v} GWh",
    rte_titre: "Our production forecast against RTE's",
    prod_jour: "Solar and wind output on {d}",
    duel_nous: "Our model", duel_rte: "RTE forecast", duel_reel: "Actual, measured by RTE", duel_proche: "closest",
    duel_ecart: "error vs actual: {e}%", duel_faite: "forecast made the day before around 11:30", duel_rte_absent: "not published yet",
    duel_rte_quand: "published up to 18:00 the day before, too late for the auction", duel_attente: "not known yet", duel_attente_d: "published by RTE during the day",
    duel_mesure: "éCO2mix real time, provisional values", duel_rte_partiel: "{f} only: RTE has not published the other technology for this day",
    rte_hist_titre: "Over the whole history: our model against RTE and the previous day ({q}, {n} days)",
    duel_veille: "Naive benchmark: previous day", veille_prod_court: "Previous day (naive)", hist_mieux_v: "and the previous day on {p}% of days",
    rte_veille_note: "Naive \"previous day\" benchmark: actual output of the previous day at the same hour. That day is not over yet at 11:00, when the forecast is made, so this benchmark is slightly favoured.",
    hist_det: "daily error · hourly {h}% · bias {b}%", hist_mieux: "Our model beats RTE", hist_jours: "of days", hist_mieux_d: "{m} days out of {n}",
    rte_court_note: "RTE publishes its forecast too late for the price auction (up to 18:00 the day before, versus 12:45): we therefore have to forecast output ourselves. Why RTE does slightly better: see the bottom of the page.",
    rte_err_titre: "Average error per week (gap between forecast and actual daily totals, %): lower is better",
    sem_du: "Week of {d} to {f} ({n} days)",
    rte_pourquoi: "Why forecast ourselves when RTE publishes a forecast?",
    rte_detail: "Detail by technology (daily error, hourly error, bias; us, RTE and previous day)",
    rte_t_jour: "Daily error, solar + wind", rte_t_heure: "Hourly error, solar + wind", rte_t_mieux: "Days we beat RTE",
    rte_t_nous: "us", rte_t_rte: "RTE: {v}%", rte_t_n: "over {n} days",
    rte_cols: ["", "Daily error: us", "RTE", "Previous day", "Hourly error: us", "RTE", "Previous day", "Bias: us", "RTE", "Previous day", "Days better than RTE", "Days better than previous day"],
    pas_de_prod: "No production forecast yet.",
    ck_prod_modeles: "Production models retrained", nk_prod_modeles: "Production model retraining",
    ck_prod_modeles_d: "with actual output up to {d} included · solar {s} trees · wind {e} trees",
    ck_prod_modeles_echec: "failed: previous day's models used", ck_prod_modeles_fige: "forecast made before daily retraining was set up (evening of 23/10): output learned up to 31/08/2026",
    court_EMT: "EUR+Zéphyr",
    court_EMT0: "EUR+Zéphyr (summer)",
    court_TOUT: "Zéphyr",
    court_TOUT0: "Zéphyr (summer)",
    tag_s5: "fallback 4", tag_ete: "summer fallback",
    court_EM: "EUR-avg4", court_EP: "EUR-avg2", court_EU: "EUR", court_EUC: "EUR+", court_GB: "EUR-GB",
    tag_s1: "fallback 1", tag_s2: "fallback 2", tag_s3: "fallback 3", tag_s4: "last resort", tag_suivi: "tracked", tag_ancien: "past",
    ck_europe: "Neighbouring markets, flows, nuclear and British price", nk_europe: "Neighbouring markets and British price",
    ck_europe_d: "tomorrow's British price published on {d}", ck_europe_echec: "down: {l}", ck_europe_avant: "not used yet on that day (Europe model in service since 29/10/2026)",
    ck_modele_rejeu_eu: "computed afterwards (model in service since 29/10/2026)", ck_modele_manque: "not computed: missing data ({l})",
    chargement: "Could not load the data.",
    unite: "€/MWh",
      // recette masquée (07/11/2026) : noms et textes neutres, remplacés par ceux de infos_modeles.js quand ce fichier est chargé
    nom_TOUT: "Main model",
    nom_TOUT0: "Summer fallback of the main model",
    nom_EM: "Fallback model 1",
    nom_EP: "Fallback model 2",
    nom_EU: "Fallback model 3",
    nom_GB: "Fallback model 4",
    nom_GR: "Last-resort model",
    nom_EMT: "Tracked model 1",
    nom_EMT0: "Summer fallback of tracked model 1",
    nom_EUC: "Tracked model 2",
    nom_CR: "Former model 1",
    nom_GT: "Former model 2",
    intro_prod: "Before forecasting the price, we forecast each region's solar and wind output. The production models are retrained every morning. The history shown here is the output forecast each day the day before.",
    rte_note: "RTE's forecast comes too late: RTE publishes it up to 18:00 the day before, while the auction that sets the price closes at 12:45. To forecast the price, we therefore have to forecast solar and wind output ourselves, in the morning. RTE does slightly better, and this is expected: its forecast is made later, with more recent weather and live telemetry from its plants. Our forecast does not account for plants deliberately stopping when the price is negative, hence a positive bias on solar. Both forecasts are compared on the same days, against the output actually measured by RTE.",
    prod_note: "When the price turns negative, some plants stop on purpose, so actual output is lower than our forecast (mostly solar around midday). Actual output: RTE éCO2mix real-time data, provisional values, refreshed at every site update (morning and afternoon).",
  },
};
if (window.RECETTE) for (const l of ["fr", "en"]) Object.assign(TXT[l], window.RECETTE.txt[l]);   // recette masquée sur le site public (07/11/2026) : textes complets seulement avec infos_modeles.js

const MODELES = [                                                     // modèles en service depuis le 29/10/2026 : principal puis secours
  { code: "TOUT", couleur: "--s-tout", tirets: null, tag: "tag_principal" },
  { code: "TOUT0", couleur: "--s-tout", tirets: [6, 4], tag: "tag_ete" },
  { code: "EM", couleur: "--s-em", tirets: null, tag: "tag_s1" },
  { code: "EP", couleur: "--s-ep", tirets: [6, 4], tag: "tag_s2" },
  { code: "EU", couleur: "--s-eu", tirets: null, tag: "tag_s3" },
  { code: "GB", couleur: "--s-gb", tirets: [2, 3], tag: "tag_s5" },
  { code: "GR", couleur: "--s-gr", tirets: null, tag: "tag_s4" },
  { code: "EMT", couleur: "--s-emt", tirets: [2, 3], tag: "tag_suivi" },
  { code: "EUC", couleur: "--s-euc", tirets: [6, 4], tag: "tag_suivi" },
];
const MODELES_ANCIENS = [                                             // toujours calculés, montrés dans l'onglet « Anciens modèles »
  { code: "CR", couleur: "--s-cr", tirets: null, tag: "tag_ancien" },
  { code: "GT", couleur: "--s-gt", tirets: [6, 4], tag: "tag_ancien" },
];
const TOUS = MODELES.concat(MODELES_ANCIENS);
const etat = { d: null, langue: "fr", onglet: "prevision", jourPrev: null, selPrev: null, menuOuvert: false,
               visibles: { TOUT: true, TOUT0: false, EMT: false, EM: false, EP: false, EU: false, EUC: false, GB: false, GR: false, CR: false, GT: false, hier: true, sem: true, bande: true },   // par défaut (Performance) : Zéphyr et les deux repères naïfs (09/11/2026)
               prodVisibles: { sol: true, eol: true, rte: true, veille: true },                          // cases Solaire / Éolien de l'onglet Production          // cases à cocher, communes à tous les tableaux et graphiques
               pasPrev: { haut: "quart", bas: "quart" }, pasHist: "quart", pasPlage: "heure", periodePerf: "tout", pasPerf: "quart", jourProd: null,
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
const REPERES = ["hier", "sem"];                                     // repères naïfs : veille et semaine d'avant
const nomModele = (code) => (REPERES.includes(code) ? t(code) : t("nom_" + code));
const courtModele = (code) => (REPERES.includes(code) ? t(code + "_court") : t("court_" + code));
const jours = () => etat.d.jours;
const joursAvecPrix = () => jours().filter((j) => j.reel);
const jourDe = (iso) => jours().find((j) => j.jour === iso);
const modelesDuJour = (j) => MODELES.filter((m) => j[m.code]);
const visibles = (j) => TOUS.filter((m) => j[m.code] && etat.visibles[m.code]);
const colonnes = (j) => visibles(j).map((m) => m.code).concat(REPERES.filter((r) => etat.visibles[r] && j[r]));   // séries cochées d'un jour, repères naïfs compris
function meilleur(j, parmi) {                                        // modèle à la plus petite erreur moyenne du jour (parmi les modèles en service, ou la liste `parmi`)
  const c = (parmi || TOUS.map((m) => m.code)).filter((k) => j[k] && j.erreurs && j.erreurs[k]);
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
  const cles = ["reel", ...REPERES, "bas", "haut", ...TOUS.map((m) => m.code)];
  if (pas === "quart") return { labels: j.heures, ...Object.fromEntries(cles.map((k) => [k, j[k] || null])) };
  return { labels: heuresLabels(j.heures), ...Object.fromEntries(cles.map((k) => [k, parHeure(j[k], j.heures)])) };
}

function erreurJour(j, code, pas) {                                 // erreur moyenne d'un jour : au quart d'heure (calculée par site_web.py) ou à l'heure (moyennes horaires du prévu et du marché)
  if (!j.reel || !j[code]) return null;
  if (pas !== "heure") return j.erreurs ? j.erreurs[code] || null : null;
  const p = parHeure(j[code], j.heures), r = parHeure(j.reel, j.heures);
  let n = 0, sa = 0;
  p.forEach((x, i) => { if (x !== null && r[i] !== null) { n++; sa += Math.abs(x - r[i]); } });
  return n ? { mae: sa / n } : null;
}
function stats(listeJours, cle, pas) {                               // erreurs sur plusieurs jours : au quart d'heure, ou à l'heure (pas = "heure" : moyennes horaires du prévu et du marché)
  let n = 0, sa = 0, s = 0, s2 = 0, sr = 0;
  for (const j of listeJours) {
    if (!j[cle] || !j.reel) continue;
    const p = pas === "heure" ? parHeure(j[cle], j.heures) : j[cle], r = pas === "heure" ? parHeure(j.reel, j.heures) : j.reel;
    for (let i = 0; i < p.length; i++) {
      if (p[i] === null || r[i] === null) continue;
      const e = p[i] - r[i];
      n++; sa += Math.abs(e); s += e; s2 += e * e; sr += Math.abs(r[i]);
    }
  }
  return n ? { mae: sa / n, biais: s / n, rmse: Math.sqrt(s2 / n), rel: (100 * sa) / sr, n } : null;
}
function aggJours(liste, pas) {                                       // regroupe chaque jour par heure ou par journée entière (moyenne du prix et des prévisions), seulement si le prix du marché est connu sur tout le groupe
  if (pas === "quart") return liste;
  const noms = ["reel", ...REPERES, ...TOUS.map((m) => m.code)];
  return liste.map((j) => {
    const cle = j.heures.map((h) => (pas === "heure" ? h.slice(0, 2) : "j")), ks = [...new Set(cle)], o = { jour: j.jour, source: j.source, heures: ks };
    for (const nom of noms) {
      const x = j[nom];
      if (!x) continue;
      o[nom] = ks.map((k) => {
        const v = x.filter((_, i) => cle[i] === k);
        return v.length && v.every((a) => a !== null && a !== undefined) && j.reel.filter((_, i) => cle[i] === k).every((a) => a !== null) ? v.reduce((a, b) => a + b, 0) / v.length : null;
      });
    }
    return o;
  });
}
function correlation(a, b) {                                         // corrélation de Pearson entre deux séries (valeurs manquantes ignorées)
  let n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (x === null || y === null || x === undefined || y === undefined) continue;
    n++; sx += x; sy += y; sxx += x * x; syy += y * y; sxy += x * y;
  }
  const v = (n * sxx - sx * sx) * (n * syy - sy * sy);
  return n > 2 && v > 0 ? (n * sxy - sx * sy) / Math.sqrt(v) : null;
}
function correlations(listeJours, c) {                               // sur toute la période, et moyenne des corrélations de chaque journée
  const P = [], R = [], parJour = [];
  for (const j of listeJours) {
    if (!j[c] || !j.reel) continue;
    P.push(...j[c]); R.push(...j.reel);
    const r = correlation(j[c], j.reel);
    if (r !== null) parJour.push(r);
  }
  return { r: correlation(P, R), rj: moyenne(parJour) };
}
function celluleEcart(p, r) {                                        // écart prévu − marché, case d'autant plus foncée que l'écart est grand
  if (p === null || p === undefined || r === null || r === undefined) return "<td>–</td>";
  const a = Math.min(Math.abs(p - r) / 80, 1) * 0.22;
  return `<td style="background-color:rgba(var(--ecart-rgb),${a.toFixed(3)})">${signe(p - r)}</td>`;
}
function pastille(code) {
  if (code === "reel") return `<span class="pastille" style="color:${css("--ink")}"></span>`;
  if (code === "hier") return `<span class="pastille points" style="color:${css("--muted")}"></span>`;
  if (code === "sem") return `<span class="pastille tirets" style="color:${css("--muted")}"></span>`;
  const m = TOUS.find((x) => x.code === code);
  return `<span class="pastille${m.tirets ? " tirets" : ""}" style="color:${css(m.couleur)}"></span>`;
}
const etiquette = (m) => (m.tag ? ` <span class="etiquette">${t(m.tag)}</span>` : "");
const etiquetteMeilleur = (ok) => (ok ? ` <span class="etiquette">${t("meilleur")}</span>` : "");
function segments(id, liste, valeur, rappel) {
  const el = $(id);
  el.innerHTML = liste.map(([k, lib]) => `<button type="button" data-v="${k}" aria-pressed="${k === valeur}">${lib}</button>`).join("");
  el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => rappel(b.dataset.v)));
}
function choixModeles(id, codes, fixes = [], bande = false) {         // cases à cocher des modèles (+ fourchette si elle existe, + légende des courbes toujours affichées)
  const el = $(id);
  const cases = codes.concat(REPERES, bande ? ["bande"] : []).map((c) => `<label class="choix-item"><input type="checkbox" id="${id}-${c}" data-c="${c}"${etat.visibles[c] ? " checked" : ""}>`
    + `${c === "bande" ? '<span class="pastille bande"></span>' : pastille(c)}<span>${c === "bande" ? t("fourchette") : nomModele(c)}</span></label>`);
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
const rgba = (hex, a) => { const h = hex.replace("#", ""), n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
const degrade = (hex) => (ctx) => {                                   // dégradé sous la courbe principale : de la couleur du modèle (en haut) à transparent (en bas)
  const a = ctx.chart.chartArea;
  if (!a) return "transparent";
  const g = ctx.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
  g.addColorStop(0, rgba(hex, 0.26)); g.addColorStop(1, rgba(hex, 0));
  return g;
};
function options(maxTicks, legende = false) {                       // sans légende Chart.js quand les cases à cocher servent de légende
  const muted = css("--muted");
  return {
    responsive: true, maintainAspectRatio: false, animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: legende, position: "top", align: "start", labels: { color: css("--ink-2"), boxWidth: 16, boxHeight: 3, padding: 12, filter: (it) => !it.text.startsWith("_") } },
      tooltip: {
        backgroundColor: css("--surface"), titleColor: css("--ink"), bodyColor: css("--ink-2"), borderColor: css("--axis"), borderWidth: 1,
        padding: 11, cornerRadius: 8, boxPadding: 5, usePointStyle: true, titleMarginBottom: 6,
        filter: (it) => !it.dataset.label.startsWith("_") && it.dataset.label !== t("fourchette") && it.parsed.y !== null,
        callbacks: { label: (c) => ` ${c.dataset.label}${etat.langue === "fr" ? " : " : ": "}${nombre(c.parsed.y)} ${t("unite")}` },
      },
      marqueur: {},
    },
    scales: {
      x: { ticks: { color: muted, maxRotation: 0, autoSkip: true, maxTicksLimit: innerWidth < 600 ? 6 : maxTicks || 12 }, grid: { display: false }, border: { color: css("--axis") } },
      y: { ticks: { color: muted, callback: (v) => nombre(v, 0) }, grid: { color: css("--grid"), lineWidth: 1, tickLength: 0 }, border: { display: false, dash: [3, 5] }, title: { display: true, text: t("unite"), color: muted } },
    },
    elements: { point: { radius: 0, hoverRadius: 5, hoverBorderWidth: 2, hoverBorderColor: css("--surface") }, line: { borderWidth: 2.25, tension: 0, borderJoinStyle: "round", borderCapStyle: "round" } },
  };
}
function dsModele(m, data, extra = {}) {
  const c = css(m.couleur);
  return { label: courtModele(m.code), data, borderColor: c, backgroundColor: c, borderDash: m.tirets || [], fill: false, spanGaps: true, cubicInterpolationMode: "monotone", ...extra };
}
const dsMarche = (data) => ({ label: t("marche"), data, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 2, fill: false, spanGaps: true, cubicInterpolationMode: "monotone" });
const dsHier = (data, extra = {}) => ({ label: t("hier_court"), data, borderColor: css("--muted"), backgroundColor: css("--muted"), borderWidth: 1.5, borderDash: [2, 3], fill: false, ...extra });
const dsSem = (data, extra = {}) => ({ label: t("sem_court"), data, borderColor: css("--muted"), backgroundColor: css("--muted"), borderWidth: 1.5, borderDash: [7, 4], fill: false, ...extra });
const dsRepere = (r, data, extra = {}) => (r === "hier" ? dsHier : dsSem)(data, extra);
function dsBande(bas, haut) {
  return [{ label: "_bas", data: bas, borderWidth: 0, pointRadius: 0, fill: false },
          { label: t("fourchette"), data: haut, borderWidth: 0, pointRadius: 0, backgroundColor: css("--bande"), borderColor: css("--bande"), fill: "-1" }];
}
const aBande = (s) => Boolean(s.bas && s.haut);                              // la fourchette existe (jours publiés en direct), autour du modèle principal
const avecBande = () => false;                                       // fourchette retirée du site (demande de Julien, 27/10/2026)
function dsJour(s, j) {
  const ds = [];
  if (avecBande(s)) ds.push(...dsBande(s.bas, s.haut));
  if (s.reel) ds.push(dsMarche(s.reel));
  for (const m of visibles(j)) ds.push(dsModele(m, s[m.code], m.code === principalDe(j) ? { fill: "start", backgroundColor: degrade(css(m.couleur)) } : {}));
  for (const r of REPERES) if (etat.visibles[r] && s[r]) ds.push(dsRepere(r, s[r]));
  return ds;
}
function legendeJour(s, j) {
  const principal = principalDe(j);
  const courbes = visibles(j).map(({ code }) => {
    const nom = courtModele(code);
    return [code, code === principal ? t("legende_prevision", { m: nom }) : nom];
  });
  if (s.reel) courbes.push(["reel", t("marche")]);
  return courbes;
}
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
function groupesEtapes(G) {                                           // trois colonnes sobres : un point de couleur par étape, un compteur par groupe
  const niveau = (L) => (L.some((x) => x[0] === "echec") ? "echec" : L.some((x) => x[0] === "alerte") ? "alerte" : L.some((x) => x[0] === "attente") ? "attente" : "ok");
  return [["donnees", "g_donnees"], ["calculs", "g_calculs"], ["resultat", "g_resultat"]].map(([k, titre]) => {
    const L = G[k], fait = L.filter((x) => x[0] === "ok" || x[0] === "info").length;
    return `<div class="groupe-etapes" data-cle="${titre}" data-niveau="${niveau(L)}" data-fait="${fait}" data-total="${L.length}"><h4>${t(titre)}<span class="compte">${fait}/${L.length}</span></h4><ul class="coches">`
      + L.map(([cls, lib, det]) => `<li class="${cls}"><span class="point ${cls}" aria-hidden="true"></span><span><span class="libelle">${lib}</span>${det ? `<span class="detail">${det}</span>` : ""}</span></li>`).join("")
      + "</ul></div>";
  }).join("");
}
function etapesJour(j) {
  const G = { donnees: [], calculs: [], resultat: [] }, ajout = (g, cls, lib, det) => G[g].push([cls, lib, det]);
  const veille = ajouterJours(j.jour, -1), now = maintenantParis(), rejeu = j.source === "rejeu", c = j.controles || {};
  if (rejeu) ajout("donnees", "info", t("ck_rejeu"), t("ck_rejeu_d", { m: dateCourte(ajouterJours(etat.d.debut_direct, -1)), d: dateCourte(etat.d.debut_direct) }));
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
    const pm = c.production_modeles;
    if (pm && pm.reappris) ajout("calculs", "ok", t("ck_prod_modeles"), t("ck_prod_modeles_d", { d: dateCourte(ajouterJours(j.jour, -2)), s: nombre(pm.arbres.solaire, 0), e: nombre(pm.arbres.eolien, 0) }));
    else if (pm) ajout("calculs", "alerte", t("nk_prod_modeles"), t("ck_prod_modeles_echec"));
    else ajout("calculs", "info", t("nk_prod_modeles"), t("ck_prod_modeles_fige"));
    const ed = c.europe_donnees;
    if (ed && !ed.sans_maj) {
      const panne = [["prix_voisins", "Energy-Charts"], ["jao", "JAO"], ["entsoe", "ENTSO-E"], ["gb", "Nord Pool"]].filter(([k]) => !(ed[k] && ed[k].ok)).map(([, n]) => n);
      ajout("donnees", panne.length ? "alerte" : "ok", t("ck_europe"), panne.length ? t("ck_europe_echec", { l: panne.join(", ") })
            : ed.gb && ed.gb.publie ? t("ck_europe_d", { d: dateHeure(ed.gb.publie.replace(" ", "T")) }) : "");
    } else if (!ed) ajout("donnees", "info", t("nk_europe"), t("ck_europe_avant"));
    const p = c.production_GWh;
    const p6 = c.production_06z && c.production_06z.modeles;
    if (p6 && p6.reappris) ajout("calculs", "ok", t("ck_prod_modeles06"), t("ck_prod_modeles_d", { d: dateCourte(ajouterJours(j.jour, -2)), s: nombre(p6.arbres.solaire, 0), e: nombre(p6.arbres.eolien, 0) }));
    else if (p6) ajout("calculs", "alerte", t("nk_prod_modeles06"), t("ck_prod_modeles_echec"));
    if (p) ajout("calculs", p.run === "00Z" && c.production_06z ? "alerte" : "ok", t("ck_prod"), t("ck_prod_d", { s: nombre(p.solaire, 0), e: nombre(p.eolien, 0) }) + (p.run ? t("ck_prod_run_" + p.run) : ""));
    else ajout("calculs", "info", t("nk_prod"), t("ck_inconnu"));
  }
  for (const m of MODELES) {
    if (m.code === "TOUT0" && !j.TOUT0) continue;                       // secours d'été : affiché seulement le jour où il sert
    const nom = courtModele(m.code), cm = (c.modeles || {})[m.code];
    const ce = (c.europe || {})[m.code];
    if (j[m.code] && (j.rejeu_modeles || []).includes(m.code)) ajout("calculs", "info", t("ck_modele", { m: nom }), t("ck_modele_rejeu_eu"));
    else if (!j[m.code] && ce && ce.donnees_manquantes) ajout("calculs", "alerte", t("ck_modele_absent", { m: nom }), t("ck_modele_manque", { l: Object.keys(ce.donnees_manquantes).join(", ") }));
    else if (j[m.code]) ajout("calculs", "ok", t("ck_modele", { m: nom }), rejeu ? t("ck_modele_rejeu") : cm ? t("ck_modele_d", { v: dateCourte(veille), h: cm.heures, a: nombre(cm.arbres, 0) }) : t("ck_modele_d_simple", { v: dateCourte(veille) }));
    else ajout("calculs", rejeu ? "info" : "echec", t("ck_modele_absent", { m: nom }),
               m.code === "GT" && j.gaz && j.gaz.niveau === "rouge" ? t("ck_modele_sans_gaz") : t("ck_modele_absent_d"));
  }
  if (!rejeu) {
    if (j.genere) {
      ajout("resultat", "ok", t("ck_publie"), t("ck_publie_d", { d: dateHeure(j.genere) }));
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
  G.calculs.push(["attente", t("nk_prod"), a], ...MODELES.filter((m) => m.code !== "TOUT0").map((m) => ["attente", t("nk_modele", { m: courtModele(m.code) }), a]));
  G.resultat.push(["attente", t("nk_publie"), t("ck_publie_att")], ["attente", t("nk_reel"), t("ck_reel_attente", { d: dateCourte(veille) })], ["attente", t("nk_ecarts"), t("ck_ecarts_att")]);
  return groupesEtapes(G);
}

/* ---------------------------------------------------------------- onglet Prévision : deux jours */
function joursAccueil() {                                           // demain dès que sa prévision est publiée, sinon aujourd'hui (jamais un jour vide : demande de Julien, 07/11/2026)
  const now = maintenantParis(), js = jours(), demain = ajouterJours(now.date, 1);
  const haut = jourDe(demain) ? demain : jourDe(now.date) || !js.length ? now.date : js[js.length - 1].jour, bas = ajouterJours(haut, -1);
  const avant = jours().filter((j) => j.jour < haut);
  return { now, haut, jHaut: jourDe(haut), jBas: jourDe(bas) || avant[avant.length - 1] };
}
function badgeJour(iso, now) {
  if (iso === ajouterJours(now.date, 1)) return "b_demain";
  if (iso === now.date) return "b_aujourdhui";
  if (iso === ajouterJours(now.date, -1)) return "b_hier";
  return "b_passe";
}
const meilleurDuJour = (j, pas) => TOUS.map((m) => m.code).filter((k) => erreurJour(j, k, pas)).reduce((a, b) => (a === null || erreurJour(j, b, pas).mae < erreurJour(j, a, pas).mae ? b : a), null);
const CHAINE = ["TOUT", "TOUT0", "EM", "EP", "EU", "GB", "GR"];                              // chaîne de repli du modèle publié
const PRINCIPAL = "TOUT";                                              // Zéphyr est TOUJOURS le modèle principal (Julien, 09/11/2026) ; un autre modèle qui le remplace un jour est marqué « modèle de secours »
const principalActuel = () => PRINCIPAL;
function principalDe(j) {                                             // modèle affiché par défaut un jour donné : Zéphyr ; s'il manque ce jour-là, le premier secours disponible de la chaîne
  return CHAINE.find((c) => j[c]) || (TOUS.find((m) => j[m.code]) || {}).code;
}
const estSecours = (code, j) => code !== PRINCIPAL && code === principalDe(j);          // ce modèle remplace Zéphyr ce jour-là
const tagJour = (code, j) => (code === PRINCIPAL ? `<span class="etiquette principal">${t("tag_principal")}</span>`
  : estSecours(code, j) ? `<span class="etiquette secours">${t("tag_secours_jour")}</span>` : "");
const etiquetteJour = (m, j) => " " + (tagJour(m.code, j) || `<span class="etiquette">${t(m.tag)}</span>`);
function blocErreur(j, code, pas) {                                  // l'erreur de la prévision : valeur, part du prix moyen et repère « veille »
  const e = erreurJour(j, code, pas), titre = `<div class="petit">${t("err_titre")} <span class="err-pas">${t(pas === "heure" ? "err_heure" : "err_quart")}</span></div>`;
  if (!e) return `<div class="bloc-erreur" title="${t("err_aide")}">${titre}<div class="err-attente">${t("err_attente")}</div></div>`;
  const pc = (100 * e.mae) / moyenne(j.reel);
  return `<div class="bloc-erreur" title="${t("err_aide")}">${titre}<div class="valeur erreur">${enEuros(e.mae)}</div>`
    + `<div class="err-detail"><span>${t("err_pct", { p: nombre(pc, 1) })}</span>${comparaisonVeille(j, code, e, pas)}</div></div>`;
}
function comparaisonVeille(j, code, e, pas) {                         // le modèle contre le repère naïf « veille » (même quart d'heure la veille), le même jour
  const v = REPERES.includes(code) ? null : erreurJour(j, "hier", pas);
  if (!v || !v.mae) return "";
  const g = (100 * (v.mae - e.mae)) / v.mae;
  return `<span class="err-veille ${g > 0 ? "positif" : ""}">${t("err_veille", { x: nombre(v.mae), g: t(g > 0 ? "err_mieux" : "err_moins", { p: nombre(Math.abs(g), 0) }) })}</span>`;
}
function tuileModele(m, j, best, pas) {
  const e = erreurJour(j, m.code, pas);
  const principal = m.code === principalDe(j);
  const titre = principal ? `<h3 class="titre-prevision">${t("prevision_modele")}</h3>` : "";
  return `<div class="tuile modele${principal ? " principal" : ""}" title="${nomModele(m.code)}">${titre}<div class="libelle">${pastille(m.code)}${courtModele(m.code)}${etiquetteJour(m, j)}${etiquetteMeilleur(m.code === best)}</div>`
    + `<div class="duo-valeurs"><div><div class="petit">${t("prix_moyen")}</div><div class="valeur">${enEuros(moyenne(j[m.code]))}</div></div>`
    + blocErreur(j, m.code, pas) + `</div></div>`;
}
function tuilesJour(j, pas) {
  const T = [], b = meilleurDuJour(j, pas);
  if (j.reel) T.push(`<div class="tuile marche"><div class="libelle">${pastille("reel")}${t("marche_moyen")}</div><div class="duo-valeurs"><div><div class="petit">${t("t_moyenne")}</div><div class="valeur">${enEuros(moyenne(j.reel))}</div></div></div></div>`);
  for (const m of visibles(j)) T.push(tuileModele(m, j, b, pas));
  const prin = principalDe(j) || null, lab = heuresLabels(j.heures);
  const bloc = (code, serie, nom) => {                                // heure la moins chère et la plus chère d'une série (moyennes horaires), avec son étiquette
    const h = parHeure(serie, j.heures), v = h.filter((x) => x !== null);
    if (!v.length) return "";
    const iMin = h.indexOf(Math.min(...v)), iMax = h.indexOf(Math.max(...v));
    return `<div class="mm-bloc"><div class="petit">${pastille(code)}${nom}</div><div class="valeur">${lab[iMin]} · ${lab[iMax]}</div>`
      + `<div class="detail">${nombre(h[iMin], 0)} € · ${nombre(h[iMax], 0)} €</div></div>`;
  };
  const blocs = (j.reel ? bloc("reel", j.reel, t("marche")) : "") + (prin ? bloc(prin, j[prin], t("legende_prevision", { m: courtModele(prin) })) : "");
  if (blocs) T.push(`<div class="tuile mm"><div class="libelle">${t("moins_plus")}</div>${blocs}</div>`);
  return T.join("");
}
function tablePrix(id, s, j, pas) {                                       // tableau des prix d'un jour (onglet Prévision) ; prix du marché connu : prévu, écart et écart en % pour chaque modèle (06/11/2026)
  const cols = colonnes(j), R = s.reel;
  const th = (c, extra = "") => `<th class="modele${extra}" title="${nomModele(c)}"${R ? ' colspan="3"' : ""}>${pastille(c)} ${courtModele(c)}</th>`;
  const bornes = (a) => { let lo = -1, hi = -1; a.forEach((x, i) => { if (x === null || x === undefined) return; if (lo < 0 || x < a[lo]) lo = i; if (hi < 0 || x > a[hi]) hi = i; }); return [lo, hi]; };
  const mm = {}; if (R) mm.reel = bornes(R); cols.forEach((c) => { mm[c] = bornes(s[c]); });
  const cell = (c, i, cls = "") => { const [lo, hi] = mm[c], k = i === lo ? "mn" : i === hi ? "mx" : ""; return `<td class="${(cls + " " + k).trim()}"${k ? ` title="${t(k === "mn" ? "min_t" : "max_t")}"` : ""}>${nombre((c === "reel" ? R : s[c])[i])}</td>`; };
  const vide = (v) => v === null || v === undefined;
  const pc = (e, r) => (vide(e) || vide(r) ? "<td>–</td>" : Math.abs(r) < SEUIL_PC ? `<td class="ns" title="${t("ns_t")}">${t("ns")}</td>` : `<td>${signe((100 * e) / Math.abs(r), 0)} %</td>`);
  const paires = (c) => R.map((r, i) => [s[c][i], r]).filter(([p, r]) => !vide(p) && !vide(r));
  let h = `<thead><tr><th${R ? ' rowspan="2"' : ""}>${t("heure")}</th>${R ? `<th rowspan="2">${pastille("reel")} ${t("marche_court")}</th>` : ""}${cols.map((c) => th(c, R ? " groupe centre" : "")).join("")}</tr>`
    + (R ? `<tr>${cols.map(() => `<th class="groupe">${t("prevu")}</th><th>${t("ecart")}</th><th>${t("ecart_pc")}</th>`).join("")}</tr>` : "") + `</thead><tbody>`;
  s.labels.forEach((lab, i) => {
    h += `<tr data-i="${i}"><td>${lab}</td>${R ? cell("reel", i, "reel") : ""}`
      + cols.map((c) => (R ? cell(c, i, "groupe") + celluleEcart(s[c][i], R[i]) + pc(vide(s[c][i]) || vide(R[i]) ? null : s[c][i] - R[i], R[i]) : cell(c, i))).join("") + `</tr>`;
  });
  h += `</tbody><tfoot><tr><td>${t("moyenne")}</td>${R ? `<td class="reel">${nombre(moyenne(R))}</td>` : ""}`
    + cols.map((c) => {
      if (!R) return `<td>${nombre(moyenne(s[c]))}</td>`;
      const P = paires(c), b = P.length ? moyenne(P.map(([p, r]) => p - r)) : null, rm = P.length ? moyenne(P.map(([, r]) => Math.abs(r))) : null;
      return `<td class="groupe">${nombre(moyenne(s[c]))}</td><td title="${t("biais_t")}">${signe(b)}</td>${pc(b, rm)}`;
    }).join("") + `</tr>`
    + (R ? `<tr><td>${t(pas === "heure" ? "t_erreur_heure" : "t_erreur_quart")}</td><td class="reel">–</td>${cols.map((c) => {
      const e = erreurJour(j, c, pas), P = paires(c), rm = P.length ? moyenne(P.map(([, r]) => Math.abs(r))) : null;
      return `<td class="groupe">–</td><td>${e ? nombre(e.mae) : "–"}</td><td title="${t("err_rel_t")}">${e && rm ? nombre((100 * e.mae) / rm, 0) + " %" : "–"}</td>`;
    }).join("")}</tr>` : "")
    + `</tfoot>`;
  $(id).innerHTML = h;
  collerEntetes($(id));
}
const SEUIL_PC = 20;                                                  // €/MWh : en dessous, un écart en % n'a pas de sens (même seuil que les Excel du bilan)
const SEL_VIDE = () => Object.fromEntries(TOUS.map((m) => [m.code, false]).concat(REPERES.map((r) => [r, false]), [["bande", false]]));
const modeleParDefaut = (j) => principalDe(j);
const modelesDispos = (j) => TOUS.filter((m) => j[m.code]);
function selectionDuJour(j) {                                        // modèles cochés dans le menu (ceux qui existent ce jour-là), sinon le principal du jour
  const sel = (etat.selPrev || []).filter((c) => j[c]);
  return sel.length ? sel : [modeleParDefaut(j)];
}
function rendreBloc(cote, iso, j, now) {                              // un seul graphique : les modèles choisis (par défaut le principal du jour) et le marché
  const sauv = etat.visibles;
  try {
    if (j) { etat.visibles = SEL_VIDE(); for (const c of selectionDuJour(j)) etat.visibles[c] = true; }
    rendreBlocJour(cote, iso, j, now);
  } finally { etat.visibles = sauv; }
}
function resumeEtapes(html) {                                         // ligne de synthèse de l'en-tête repliable : un point et un compteur par groupe d'étapes
  const re = /data-cle="(\w+)" data-niveau="(\w+)" data-fait="(\d+)" data-total="(\d+)"/g, L = [];
  for (const m of html.matchAll(re)) L.push(`<span class="chip-etape"><span class="point ${m[2]}"></span>${t(m[1] + "_c")} <b>${m[3]}/${m[4]}</b></span>`);
  return `<span class="resume-etapes">${L.join("")}</span>`;
}
function navigationJour(iso) {
  const js = jours(), premier = js[0].jour, max = js[js.length - 1].jour;                // dernier jour publié : pas de jour vide dans le calendrier
  return `<div class="navigation-jour"><button type="button" id="prev-prec" class="bouton" aria-label="${t("jour_prec")}"${iso <= premier ? " disabled" : ""}>‹</button>`
    + `<input type="date" id="prev-date" aria-label="Date" min="${premier}" max="${max}" value="${iso}">`
    + `<button type="button" id="prev-suiv" class="bouton" aria-label="${t("jour_suiv")}"${iso >= max ? " disabled" : ""}>›</button></div>`;
}
function lierNavigation(iso) {
  const js = jours(), max = js[js.length - 1].jour;
  $("prev-date").addEventListener("change", (e) => { const v = e.target.value; if (v && v >= js[0].jour && v <= max) ouvrirJour(v); });
  $("prev-prec").addEventListener("click", () => ouvrirJour(ajouterJours(iso, -1)));
  $("prev-suiv").addEventListener("click", () => ouvrirJour(ajouterJours(iso, 1)));
}
function resumeModeles(sel, max = 4) {                               // bouton du menu : une puce par modèle coché (trait de couleur + nom court)
  if (!sel.length) return `<span class="resume-vide">–</span>`;
  if (sel.length > max) return `<span class="puce-modele">${t("n_modeles", { n: sel.length })}</span>`;
  return sel.map((c) => `<span class="puce-modele">${pastille(c)}${c === "sem" ? t("sem_mini") : courtModele(c)}</span>`).join("");
}
function menuModeles(p, j, pas) {                                    // menu déroulant à cases à cocher : principal mis en avant, meilleur du jour signalé
  const sel = selectionDuJour(j), best = meilleurDuJour(j, pas);
  const ligne = (m) => {
    const e = erreurJour(j, m.code, pas), pr = m.code === principalDe(j);
    return `<label class="menu-item${pr ? " principal" : ""}"><input type="checkbox" data-c="${m.code}"${sel.includes(m.code) ? " checked" : ""}>${pastille(m.code)}`
      + `<span class="menu-nom"><b>${courtModele(m.code)}</b><small>${nomModele(m.code)}</small></span>`
      + `<span class="menu-tags">${tagJour(m.code, j)}${m.code === best ? `<span class="etiquette meilleur">${t("m_meilleur")}</span>` : ""}`
      + `${e ? `<span class="menu-err">${nombre(e.mae)} €</span>` : ""}</span></label>`;
  };
  return `<details class="menu-modeles" id="${p}-menu"${etat.menuOuvert ? " open" : ""}><summary class="bouton"><span class="choix-titre">${t("modeles_menu")}</span>${resumeModeles(sel)}<span class="chevron" aria-hidden="true">▾</span></summary>`
    + `<div class="menu-liste">${modelesDispos(j).concat(REPERES.filter((r) => j[r]).map((r) => ({ code: r }))).map(ligne).join("")}<button type="button" class="bouton-discret" id="${p}-reset">${t("m_reset")}</button></div></details>`;
}
function rendreBlocJour(cote, iso, j, now) {
  const p = "p-" + cote, el = $("prev-" + cote), nav = navigationJour(iso), pas = etat.pasPrev[cote];
  const tete = (extra) => `<div class="titre-jour"><h2>${t("prix_du", { d: dateLongue(iso) })}</h2>${extra}</div>`;
  if (!j) {
    effacer(p + "-graphique");
    const att = `<div class="etapes-jour">${etapesAttente(ajouterJours(iso, -1))}</div>`;
    el.innerHTML = tete(iso > now.date ? `<span class="badge">${t("b_calcul")}</span>` : "")
      + (iso > now.date ? `<details class="replie compact"><summary><span class="petit-titre">${t("etapes_titre")}</span>${resumeEtapes(att)}</summary>${att}<p class="note">${t("attente_d")}</p></details>` : "")
      + `<div class="carte"><div class="barre-outils">${nav}</div><p class="note">${t(iso > now.date ? "attente_d" : "pas_de_reel")}</p></div>`;
    lierNavigation(iso);
    return;
  }
  const etapes = j.controles && Object.keys(j.controles).length ? `<div class="etapes-jour">${etapesJour(j)}</div>` : "";
  const bloc = !etapes ? "" : `<details class="replie compact" id="${p}-details"${etat.etapesOuvertes ? " open" : ""}><summary><span class="petit-titre">${t("etapes_titre")}</span>${resumeEtapes(etapes)}</summary>${etapes}</details>`;
  const s = series(j, pas);
  const legende = legendeJour(s, j).map(([code, libelle]) => `<li>${pastille(code)}${libelle}</li>`).join("");
  el.innerHTML = tete("") + bloc
    + `<div class="tuiles">${tuilesJour(j, pas)}</div>`
    + `<div class="carte"><div class="barre-outils"><div class="outils-gauche">${nav}${menuModeles(p, j, pas)}</div><div class="segments" id="${p}-pas" role="group"></div></div>`
    + `<ul class="legende-courbes">${legende}</ul>`
    + `<div class="duo"><div class="cadre-table"><table id="${p}-table" class="table-donnees"></table></div>`
    + `<div class="graphique"><canvas id="${p}-graphique" role="img" aria-label="${t("prix_du", { d: dateLongue(iso) })}"></canvas></div></div>`
    + `<p class="note">${t("prix_du_jour")} · ${t(j.reel ? "note_prev_reel" : "note_prev_attente")} <span class="leg-mm"><i class="mn"></i>${t("min_c")} <i class="mx"></i>${t("max_c")}</span></p></div>`;
  lierNavigation(iso);
  const det = $(p + "-details");
  if (det) det.addEventListener("toggle", () => { etat.etapesOuvertes = det.open; });
  segments(p + "-pas", [["quart", t("p_quart")], ["heure", t("p_heure")]], etat.pasPrev[cote], (v) => { etat.pasPrev[cote] = v; rendreBloc(cote, iso, j, maintenantParis()); });
  const menu = $(p + "-menu");
  menu.addEventListener("toggle", () => { etat.menuOuvert = menu.open; });
  menu.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => {
    const L = [...menu.querySelectorAll("input:checked")].map((x) => x.dataset.c);
    etat.selPrev = L.length ? L : null;
    rendreBloc(cote, iso, j, maintenantParis());
  }));
  $(p + "-reset").addEventListener("click", () => { etat.selPrev = null; rendreBloc(cote, iso, j, maintenantParis()); });
  tablePrix(p + "-table", s, j, pas);
  lier(dessiner(p + "-graphique", { type: "line", data: { labels: s.labels, datasets: dsJour(s, j) }, options: options(13), plugins: [curseur] }), p + "-table");
}
function rendrePrevision() {
  const A = joursAccueil();
  const iso = etat.jourPrev && jourDe(etat.jourPrev) ? etat.jourPrev : A.haut;
  etat.cleAccueil = A.haut + (A.jHaut ? "+" : "-") + "|" + (etat.jourPrev || "");
  const bandeau = $("bandeau-retard");
  const demain = ajouterJours(A.now.date, 1);                          // prévision de demain en retard (pas encore publiée à 12 h 15) : bandeau, sans afficher de jour vide
  bandeau.hidden = iso !== A.haut || Boolean(jourDe(demain)) || A.now.hm < "12:15";
  if (!bandeau.hidden) bandeau.textContent = "⚠ " + t("retard", { d: dateLongue(demain) });
  $("maj").textContent = t("maj", { d: new Date(etat.d.maj).toLocaleString(loc(), { dateStyle: "long", timeStyle: "short" }) });
  rendreBloc("haut", iso, jourDe(iso), A.now);
}

function ouvrirJour(iso) { etat.jourPrev = iso; location.hash = "#prevision/" + iso; }

/* ---------------------------------------------------------------- onglet Performance */
function menuPerf(id, codes, js) {                                   // même menu déroulant que l'onglet Prévision : principal mis en avant, meilleur de la période, erreur de chaque modèle
  const tous = codes.concat(REPERES), princ = principalActuel();
  const err = Object.fromEntries(tous.map((c) => [c, js.length ? stats(js, c) : null]));
  const avec = codes.filter((c) => err[c]), best = avec.length ? avec.reduce((a, b) => (err[b].mae < err[a].mae ? b : a)) : null;
  const ligne = (c) => `<label class="menu-item${c === princ ? " principal" : ""}"><input type="checkbox" data-c="${c}"${etat.visibles[c] ? " checked" : ""}>${pastille(c)}`
    + `<span class="menu-nom"><b>${courtModele(c)}</b><small>${nomModele(c)}</small></span>`
    + `<span class="menu-tags">${c === princ ? `<span class="etiquette principal">${t("tag_principal")}</span>` : ""}${c === best ? `<span class="etiquette meilleur">${t("m_meilleur_p")}</span>` : ""}`
    + `${err[c] ? `<span class="menu-err">${nombre(err[c].mae)} €</span>` : ""}</span></label>`;
  const sel = tous.filter((c) => etat.visibles[c]);
  $(id).innerHTML = `<details class="menu-modeles" id="${id}-menu"${etat.menuPerf === id ? " open" : ""}><summary class="bouton"><span class="choix-titre">${t("modeles_menu")}</span>${resumeModeles(sel)}<span class="chevron" aria-hidden="true">▾</span></summary>`
    + `<div class="menu-liste">${tous.map(ligne).join("")}<button type="button" class="bouton-discret" id="${id}-tout">${t("m_tout")}</button></div></details>`;
  const menu = $(id + "-menu");
  menu.addEventListener("toggle", () => { etat.menuPerf = menu.open ? id : etat.menuPerf === id ? null : etat.menuPerf; });
  menu.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => { etat.visibles[inp.dataset.c] = inp.checked; etat.menuPerf = id; rendrePerformance(); }));
  $(id + "-tout").addEventListener("click", () => { for (const c of codes) etat.visibles[c] = true; etat.menuPerf = id; rendrePerformance(); });
}
function periodePrecise() {                                          // « Dates précises » : choix du premier et du dernier jour de la comparaison (09/11/2026)
  const js = joursAvecPrix(), min = js[0].jour, max = js[js.length - 1].jour;
  if (!etat.perfDu || etat.perfDu < min || etat.perfDu > max) etat.perfDu = min;
  if (!etat.perfAu || etat.perfAu > max || etat.perfAu < min) etat.perfAu = max;
  let el = $("perf-dates");
  if (!el) { $("perf-periode").insertAdjacentHTML("afterend", '<div class="perf-dates" id="perf-dates"></div>'); el = $("perf-dates"); }
  el.hidden = etat.periodePerf !== "dates";
  el.innerHTML = `<label>${t("pf_du")} <input type="date" id="perf-du" min="${min}" max="${max}" value="${etat.perfDu}"></label>`
    + `<label>${t("pf_au")} <input type="date" id="perf-au" min="${min}" max="${max}" value="${etat.perfAu}"></label>`;
  const changer = (cle, id) => $(id).addEventListener("change", (e) => {
    const v = e.target.value;
    if (!v || v < min || v > max) return;
    etat[cle] = v;
    if (etat.perfDu > etat.perfAu) { if (cle === "perfDu") etat.perfAu = v; else etat.perfDu = v; }
    rendrePerformance();
  });
  changer("perfDu", "perf-du"); changer("perfAu", "perf-au");
}
function courbePeriode(js, codes, vusR) {                            // prix prévu et prix du marché sur toute la période, d'un seul tenant (demande de Julien, 11/11/2026)
  const pas = etat.pasPerf, fr = etat.langue === "fr", jc = aggJours(js, pas);
  const cles = ["reel", ...REPERES, ...codes], val = Object.fromEntries(cles.map((c) => [c, []])), labels = [], debut = new Map();
  jc.forEach((j, n) => {
    if (n && jc[n - 1].jour !== ajouterJours(j.jour, -1)) { labels.push(""); for (const c of cles) val[c].push(null); }   // jour absent : la courbe s'interrompt
    debut.set(labels.length, j.jour);
    j.heures.forEach((h, i) => {
      labels.push(pas === "jour" ? dateMoyenne(j.jour) : `${dateMoyenne(j.jour)} · ${pas === "heure" ? h + (fr ? " h" : ":00") : h}`);
      for (const c of cles) val[c].push(j[c] && j[c][i] !== undefined ? j[c][i] : null);
    });
  });
  const ordre = [...debut.keys()], saut = Math.max(1, Math.ceil(ordre.length / (innerWidth < 600 ? 4 : 10)));
  const montres = new Set(ordre.filter((_, k) => k % saut === 0)), lignes = ordre.length <= 31 ? new Set(ordre) : montres;
  const lisse = { spanGaps: false, cubicInterpolationMode: "default", borderWidth: pas === "quart" && jc.length > 14 ? 1.5 : 2 };
  const ds = [{ ...dsMarche(val.reel), ...lisse }];
  for (const m of TOUS) if (etat.visibles[m.code] && codes.includes(m.code)) ds.push(dsModele(m, val[m.code], lisse));
  for (const r of vusR) ds.push(dsRepere(r, val[r], { spanGaps: false, borderWidth: 1.2 }));
  const o = options(10, true);
  o.scales.x.ticks = { ...o.scales.x.ticks, autoSkip: false, callback: (v, i) => (montres.has(i) ? dateCourte(debut.get(i)) : null) };
  o.scales.x.grid = pas === "jour" ? { display: false } : { display: true, drawTicks: false, color: (c) => (lignes.has(c.index) ? css("--grid") : "transparent") };
  dessiner("perf-courbe", { type: "line", data: { labels, datasets: ds }, options: o, plugins: [curseur] });
}
function rendrePerformance() {
  segments("perf-periode", [["tout", t("pf_tout")], ["7", t("pf_7")], ["30", t("pf_30")], ["direct", t("pf_direct")], ["dates", t("pf_dates")]], etat.periodePerf, (v) => { etat.periodePerf = v; rendrePerformance(); });
  periodePrecise();
  let js = joursAvecPrix();
  if (etat.periodePerf === "7") js = js.slice(-7);
  if (etat.periodePerf === "30") js = js.slice(-30);
  if (etat.periodePerf === "direct") js = js.filter((j) => j.source === "direct");
  if (etat.periodePerf === "dates") js = js.filter((j) => j.jour >= etat.perfDu && j.jour <= etat.perfAu);
  segments("perf-pas", [["quart", t("pf_quart")], ["heure", t("pf_heure")], ["jour", t("pf_jour")]], etat.pasPerf, (v) => { etat.pasPerf = v; rendrePerformance(); });
  $("perf-pas-note").textContent = etat.pasPerf === "quart" ? "" : t("pf_note_pas", { u: t(etat.pasPerf === "heure" ? "u_heure" : "u_jour") });
  const jp = aggJours(js, etat.pasPerf);                                     // jours regroupés au pas choisi : sert au tableau de synthèse seulement
  const codes = TOUS.map((m) => m.code).filter((c) => js.some((j) => j[c]));   // seulement les modèles qui ont des prévisions sur la période (TOUT0 / EMT0 : calculés seulement si le run de 6 h manque)
  for (const id of ["perf-choix", "perf-choix2"]) menuPerf(id, codes, jp);
  const resume = $("perf-resume");
  if (!js.length) {
    resume.innerHTML = `<tbody><tr><td>${t("aucun_direct", { d: dateLongue(etat.d.debut_direct) })}</td></tr></tbody>`;
    for (const id of ["perf-jours", "perf-heures", "perf-courbe"]) effacer(id);
    $("perf-difficiles").innerHTML = "";
    return;
  }
  const vus = codes.filter((c) => etat.visibles[c]), sh = stats(jp, "hier");
  const vusR = REPERES.filter((r) => etat.visibles[r]);                       // repères naïfs cochés
  const victoires = Object.fromEntries(codes.concat(REPERES).map((c) => [c, 0]));
  let nj = 0;
  for (const j of js) { const b = meilleur(j, vus.concat(vusR)); if (b) { nj++; victoires[b]++; } }   // « meilleur du jour » parmi les séries cochées (repères compris) : le total fait 100 %
  const st = vus.map((c) => [c, stats(jp, c)]).filter(([, s]) => s);
  const best = st.length ? st.reduce((a, b) => (b[1].mae < a[1].mae ? b : a))[0] : null;
  let h = `<thead><tr><th>${t("c_modele")} · ${t("jours_h", { n: js.length, h: nombre(js.reduce((a, j) => a + j.heures.length, 0) / 4, 0) })}</th><th>${t("c_mae")}</th><th>${t("c_rel")}</th><th>${t("c_biais")}</th><th>${t("c_rmse")}</th><th>${t("c_corr")}</th><th>${t("c_corr_j")}</th><th>${t("c_meilleur")}</th><th>${t("c_gain")}</th></tr></thead><tbody>`;
  for (const [c, s] of st.concat(vusR.map((r) => [r, r === "hier" ? sh : stats(jp, r)]).filter(([, s]) => s))) {
    const m = TOUS.find((x) => x.code === c);
    h += `<tr${c === best ? ' class="meilleur"' : ""}><td><span class="nom-modele" title="${nomModele(c)}">${pastille(c)}${courtModele(c)}${m ? etiquette(m) : ""}</span></td><td>${nombre(s.mae)} ${t("unite")}</td><td>${nombre(s.rel, 0)} %</td><td>${signe(s.biais)}</td><td>${nombre(s.rmse)}</td><td>${nombre(correlations(jp, c).r, 2)}</td><td>${etat.pasPerf === "jour" ? "–" : nombre(correlations(jp, c).rj, 2)}</td>`
      + `<td>${nj ? nombre((100 * victoires[c]) / nj, 0) + " %" : "–"}</td><td>${c === "hier" ? "–" : `<span class="${s.mae < sh.mae ? "positif" : ""}">${signe((100 * (sh.mae - s.mae)) / sh.mae, 0)} %</span>`}</td></tr>`;
  }
  resume.innerHTML = h + "</tbody>";
  courbePeriode(js, codes, vusR);
  const ds = TOUS.filter((m) => etat.visibles[m.code] && js.some((j) => j.erreurs[m.code])).map((m) => dsModele(m, js.map((j) => (j.erreurs[m.code] ? j.erreurs[m.code].mae : null)), { pointRadius: 2 }));
  for (const r of vusR) ds.push(dsRepere(r, js.map((j) => (j.erreurs[r] ? j.erreurs[r].mae : null)), { spanGaps: true }));
  dessiner("perf-jours", { type: "line", data: { labels: js.map((j) => dateCourte(j.jour)), datasets: ds }, options: options(8, true), plugins: [curseur] });   // plus de trait « mise en ligne » (Julien, 09/11/2026)
  const somme = {}, nb = {};
  for (const j of js) {
    j.heures.forEach((hq, i) => {
      const k = hq.slice(0, 2);
      for (const c of [...codes, ...REPERES]) {
        const p = j[c];
        if (!p || p[i] === null || j.reel[i] === null) continue;
        somme[c] = somme[c] || {}; nb[c] = nb[c] || {};
        somme[c][k] = (somme[c][k] || 0) + Math.abs(p[i] - j.reel[i]); nb[c][k] = (nb[c][k] || 0) + 1;
      }
    });
  }
  const hs = [...Array(24).keys()].map((x) => String(x).padStart(2, "0"));
  const serieH = (c) => hs.map((k) => (nb[c] && nb[c][k] ? somme[c][k] / nb[c][k] : null));
  const dh = TOUS.filter((m) => etat.visibles[m.code] && somme[m.code]).map((m) => dsModele(m, serieH(m.code), { pointRadius: 2 }));
  for (const r of vusR) if (somme[r]) dh.push(dsRepere(r, serieH(r)));
  dessiner("perf-heures", { type: "line", data: { labels: hs.map((k) => k + (etat.langue === "fr" ? " h" : ":00")), datasets: dh }, options: options(12, true), plugins: [curseur] });
  const cols = vus.concat(vusR);
  const errZ = (j) => { const c = j.erreurs[PRINCIPAL] ? PRINCIPAL : principalDe(j); return c && j.erreurs[c] ? j.erreurs[c].mae : null; };   // Zéphyr (ou son secours ce jour-là)
  const dur = js.filter((j) => errZ(j) !== null).sort((a, b) => errZ(b) - errZ(a)).slice(0, 8);
  let hd = `<thead><tr><th>${t("date")}</th><th>${pastille("reel")} ${t("marche_moyen")}</th>`
    + cols.map((c) => `<th class="modele" title="${nomModele(c)}">${pastille(c)} ${courtModele(c)} · ${t("erreur_moy")}</th>`).join("") + "</tr></thead><tbody>";
  for (const j of dur) {
    hd += `<tr data-jour="${j.jour}"><td>${dateMoyenne(j.jour)}</td><td>${nombre(moyenne(j.reel))}</td>` + cols.map((c) => `<td>${j.erreurs[c] ? nombre(j.erreurs[c].mae) : "–"}</td>`).join("") + "</tr>";
  }
  $("perf-difficiles").innerHTML = hd + "</tbody>";
  $("perf-difficiles").querySelectorAll("tbody tr").forEach((r) => r.addEventListener("click", () => ouvrirJour(r.dataset.jour)));
}

/* ---------------------------------------------------------------- onglet Modèles */

/* ---------------------------------------------------------------- onglet Production (bonus) */
const somme = (a) => (a ? a.reduce((s, x) => s + (x === null ? 0 : x), 0) : null);
const nConnus = (a) => (a ? a.filter((x) => x !== null).length : 0);
const ecartPc = (p, r) => (r ? (100 * (p - r)) / r : null);
function optionsGW(maxTicks, unite) {
  const o = options(maxTicks, true);
  o.scales.y.title.text = unite;
  o.plugins.tooltip.callbacks.label = (c) => ` ${c.dataset.label}${etat.langue === "fr" ? " : " : ": "}${nombre(c.parsed.y)} ${unite}`;
  return o;
}
const dsProd = (lib, data, couleur, extra = {}) => ({ label: lib, data, borderColor: css(couleur), backgroundColor: css(couleur), fill: false, spanGaps: false, ...extra });
const dsReel = (lib, data, extra = {}) => ({ label: lib, data, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 2.5, fill: false, spanGaps: false, ...extra });
function tuileProd(lib, prevu, reel, n, nTot) {
  let det;
  if (reel !== null && n === nTot) det = t("reel_vs", { r: nombre(reel), e: signe(ecartPc(prevu, reel), 0) });
  else det = n ? t("reel_partiel", { h: n, n: nTot }) : t("reel_absent");
  return tuile(lib, `${nombre(prevu)} <small>GWh</small>`, det);
}
const TECHS = [{ k: "sol", c: "--s-sol", lib: "sol_court", prevu: "sol_prevu", reel: "sol_reel", rte: "sol_rte" }, { k: "eol", c: "--s-eol", lib: "eol_court", prevu: "eol_prevu", reel: "eol_reel", rte: "eol_rte" }];
const trait = (couleur, style) => `<span class="trait ${style}" style="color:${css(couleur)}" aria-hidden="true"></span>`;   // réel : plein, foncé ; nous : tirets ; RTE : points, clair
const pastTech = (x) => `<span class="pastille" style="color:${css(x.c)}"></span>`;
function choixProd(id) {                                             // cases Solaire / Éolien de l'onglet Production (un seul état pour tout l'onglet)
  const el = $(id);
  el.innerHTML = `<span class="choix-titre">${t("afficher")}</span>` + TECHS.map((x) => `<label class="choix-item"><input type="checkbox" id="${id}-${x.k}" data-k="${x.k}"${etat.prodVisibles[x.k] ? " checked" : ""}>${pastTech(x)}<span>${t(x.lib)}</span></label>`).join("")
    + (id === "prod-choix-regions" ? "" : `<label class="choix-item"><input type="checkbox" id="${id}-rte" data-k="rte"${etat.prodVisibles.rte ? " checked" : ""}>${id === "prod-choix-hist" ? trait("--p-rte", "points") : '<span class="trait-rte" aria-hidden="true"></span>'}<span>${t("rte_court")}</span></label>`)   // RTE ne publie que pour la France entière
    + (id === "prod-choix-hist" ? `<label class="choix-item"><input type="checkbox" id="${id}-veille" data-k="veille"${etat.prodVisibles.veille ? " checked" : ""}>${trait("--p-veille", "tirets")}<span>${t("veille_prod_court")}</span></label>` : "");
  el.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => {
    etat.prodVisibles[inp.dataset.k] = inp.checked;
    rendreProduction();
    const n = $(inp.id);
    if (n) n.focus({ preventScroll: true });
  }));
}
function rendreProduction() {
  if (window.RECETTE) $("prod-modeles").innerHTML = ficheProduction("sol") + ficheProduction("eol");     // recette masquée : fiches des modèles de production absentes
  const js = jours().filter((j) => j.prod), now = maintenantParis();
  if (!js.length) { $("prod-duel").innerHTML = `<p class="note">${t("pas_de_prod")}</p>`; return; }
  for (const id of ["prod-choix", "prod-choix-regions", "prod-choix-hist"]) choixProd(id);
  const vus = TECHS.filter((x) => etat.prodVisibles[x.k]), deux = vus.length === 2, rteOn = etat.prodVisibles.rte;
  const RTE_DS = { borderDash: [2, 3], borderWidth: 2.2 };
  const aR = (q, k) => rteOn && Boolean(q[k + "_rte"]);                      // prévision RTE de cette filière connue ce jour-là
  // 1) un jour au choix (par défaut : demain après 11 h 30, comme l'onglet Prévision)
  const A = joursAccueil(), complets = js.filter((x) => x.prod.reel_complet);
  if (!etat.jourProd || !js.some((j) => j.jour === etat.jourProd)) etat.jourProd = (A.jHaut && A.jHaut.prod ? A.jHaut : js[js.length - 1]).jour;
  const i = js.findIndex((j) => j.jour === etat.jourProd), j = js[i], p = j.prod;
  const inp = $("prod-date");
  inp.min = js[0].jour; inp.max = js[js.length - 1].jour; inp.value = j.jour;
  $("prod-prec").disabled = i === 0; $("prod-suiv").disabled = i === js.length - 1;
  $("prod-titre-jour").textContent = t("prod_jour", { d: dateLongue(j.jour) });
  $("prod-badge").textContent = t(badgeJour(j.jour, now));
  const nT = p.heures.length;
  const tot = (suf) => (vus.length && vus.every((x) => p[x.k + suf] && nConnus(p[x.k + suf]) === nT) ? vus.reduce((s, x) => s + somme(p[x.k + suf]), 0) : null);
  const vN = vus.length ? vus.reduce((s, x) => s + somme(p[x.k]), 0) : null, vR = rteOn ? tot("_rte") : null, vV = tot("_reel");
  const nReel = vus.length ? Math.min(...vus.map((x) => nConnus(p[x.k + "_reel"]))) : 0;
  const ecart = (v) => (v !== null && vV ? t("duel_ecart", { e: signe(ecartPc(v, vV), 1) }) : "");
  const gagnant = vN !== null && vR !== null && vV ? (Math.abs(vN - vV) <= Math.abs(vR - vV) ? "nous" : "rte") : null;
  const cas = (cls, trait_, lib, val, det, gagne) => `<div class="duel-case ${cls}${gagne ? " gagne" : ""}"><div class="duel-lib">${trait_}${lib}${gagne ? `<span class="duel-badge">${t("duel_proche")}</span>` : ""}</div>`
    + `<div class="duel-val">${val}</div><div class="duel-det">${det}</div></div>`;
  const gwh = (v) => `${nombre(v)} <small>GWh</small>`;
  let duel = cas("nous", trait("--ink-2", "tirets"), t("duel_nous"), vN === null ? "–" : gwh(vN), vV ? ecart(vN) : t("duel_faite"), gagnant === "nous");
  const partR = vus.filter((x) => p[x.k + "_rte"]);                              // RTE n'a parfois publié qu'une filière (solaire absent d'ENTSO-E depuis le 26/10/2026)
  if (rteOn) duel += cas("rte", trait("--muted", "points"), t("duel_rte"),
    vR !== null ? gwh(vR) : partR.length ? gwh(partR.reduce((s, x) => s + somme(p[x.k + "_rte"]), 0)) : `<span class="duel-vide">${t("duel_rte_absent")}</span>`,
    vR !== null ? (vV ? ecart(vR) : t("duel_rte_quand")) : partR.length ? t("duel_rte_partiel", { f: t(partR[0].lib).toLowerCase() }) : t("duel_rte_quand"), gagnant === "rte");
  duel += cas("reel", trait("--ink", "plein"), t("duel_reel"), vV === null ? `<span class="duel-vide">${t("duel_attente")}</span>` : gwh(vV), vV === null ? (nReel ? t("reel_partiel", { h: nReel, n: nT }) : t("duel_attente_d")) : t("duel_mesure"), false);
  $("prod-duel").innerHTML = vus.length ? duel : "";
  $("prod-duel").classList.toggle("deux", !rteOn);
  // graphique + tableau du jour
  const ds = vus.map((x) => dsProd(t(x.prevu), p[x.k], x.c, { borderDash: [6, 4] }));
  for (const x of vus) if (aR(p, x.k)) ds.push(dsProd(t(x.rte), p[x.k + "_rte"], x.c + "-rte", RTE_DS));
  for (const x of vus) if (p[x.k + "_reel"]) ds.push(dsProd(t(x.reel) + " (RTE)", p[x.k + "_reel"], x.c + "-reel", { borderWidth: 3 }));
  const ch = dessiner("prod-g-jour", { type: "line", data: { labels: p.heures, datasets: ds }, options: optionsGW(12, "GW"), plugins: [curseur] });
  $("prod-g-jour").setAttribute("aria-label", dateLongue(j.jour));
  const tp_ = (k) => somme(p[k]), tr_ = (k) => (nConnus(p[k + "_reel"]) === nT ? somme(p[k + "_reel"]) : null);
  const v = (a, k) => (a ? nombre(a[k]) : "–");
  const ec = (a, b, k) => (a && b && b[k] !== null && b[k] !== undefined ? signe(a[k] - b[k]) : "–");
  const ecJ = (a, b) => (b === null ? "–" : `${signe(ecartPc(a, b), 0)} %`);
  const ar = rteOn, nc = ar ? 4 : 3;
  const cRte = (x, k) => (ar ? `<td class="faible">${v(p[x.k + "_rte"], k)}</td>` : "");
  let h = `<thead><tr><th rowspan="2">${t("heure")}</th>${vus.map((x) => `<th colspan="${nc}" class="groupe modele">${pastTech(x)} ${t(x.lib)}</th>`).join("")}</tr>`
    + `<tr>${vus.map((x) => `<th class="groupe">${trait(x.c, "tirets")}${t("p_prevu")}</th>${ar ? `<th>${trait(x.c + "-rte", "points")}${t("p_rte")}</th>` : ""}<th>${trait(x.c + "-reel", "plein")}${t("p_reel")}</th><th>${t("ecart")}</th>`).join("")}</tr></thead><tbody>`;
  p.heures.forEach((lab, k) => {
    h += `<tr data-i="${k}"><td>${lab}</td>` + vus.map((x) => `<td class="groupe">${v(p[x.k], k)}</td>${cRte(x, k)}<td class="reel">${v(p[x.k + "_reel"], k)}</td><td>${ec(p[x.k], p[x.k + "_reel"], k)}</td>`).join("") + "</tr>";
  });
  h += `</tbody><tfoot><tr><td>GWh</td>` + vus.map((x) => `<td class="groupe">${nombre(tp_(x.k))}</td>${ar ? `<td class="faible">${p[x.k + "_rte"] ? nombre(somme(p[x.k + "_rte"])) : "–"}</td>` : ""}<td class="reel">${tr_(x.k) === null ? "–" : nombre(tr_(x.k))}</td><td>${ecJ(tp_(x.k), tr_(x.k))}</td>`).join("") + "</tr></tfoot>";
  $("prod-table").innerHTML = vus.length ? h : "";
  if (vus.length) { collerEntetes($("prod-table")); lier(ch, "prod-table"); }
  // régions du jour choisi
  const cellE = (pr, r) => (r === null ? "<td>–</td>" : `<td>${signe(ecartPc(pr, r), 0)} %</td>`);
  const col = { sol: [1, 2], eol: [3, 4] };
  let hr = `<thead><tr><th rowspan="2">${t("region")} · ${dateCourte(j.jour)}</th>${vus.map((x) => `<th colspan="3" class="groupe modele">${pastTech(x)} ${t(x.lib)}</th>`).join("")}</tr>`
    + `<tr>${vus.map(() => `<th class="groupe">${t("p_prevu")}</th><th>${t("p_reel")}</th><th>${t("ecart")}</th>`).join("")}</tr></thead><tbody>`;
  for (const r of p.regions) hr += `<tr><td>${r[0]}</td>` + vus.map((x) => { const [a, b] = col[x.k].map((c) => r[c]); return `<td class="groupe">${nombre(a)}</td><td class="reel">${b === null ? "–" : nombre(b)}</td>${cellE(a, b)}`; }).join("") + "</tr>";
  hr += `</tbody><tfoot><tr><td>${t("france")}</td>` + vus.map((x) => `<td class="groupe">${nombre(tp_(x.k))}</td><td class="reel">${tr_(x.k) === null ? "–" : nombre(tr_(x.k))}</td>${cellE(tp_(x.k), tr_(x.k))}`).join("") + "</tr></tfoot>";
  $("prod-regions").innerHTML = vus.length ? hr : "";
  if (vus.length) collerEntetes($("prod-regions"));
  // 2) tout l'historique : notre modèle contre RTE, mêmes jours (réel complet et prévision RTE des filières cochées connue)
  const parJour = new Map(js.map((x) => [x.jour, x.prod]));
  const avecVeille = (x) => {                                                   // repère naïf : production réelle de la veille, même heure (jours de même longueur)
    const q = parJour.get(ajouterJours(x.jour, -1));
    if (!q || !q.reel_complet || q.heures.length !== x.prod.heures.length) return null;
    return { ...x, prod: { ...x.prod, sol_veille: q.sol_reel, eol_veille: q.eol_reel } };
  };
  const cr = complets.filter((x) => vus.length && vus.every((y) => x.prod[y.k + "_rte"])).map(avecVeille).filter(Boolean);
  const vOn = etat.prodVisibles.veille;
  const cle = (k, a) => (a === "" ? k : k + "_" + a);
  const serie = (k, a) => (k === "tot" ? (q) => q[cle("sol", a)].map((y, n) => y + q[cle("eol", a)][n]) : (q) => q[cle(k, a)]);
  const mes = (P_, R_, J) => {
    let sj = 0, sh = 0, sb = 0, sr = 0;
    for (const x of J) { const P = P_(x.prod), R = R_(x.prod); sj += Math.abs(somme(P) - somme(R)); sb += somme(P) - somme(R); sr += somme(R); P.forEach((y, n) => { sh += Math.abs(y - R[n]); }); }
    return { j: (100 * sj) / sr, h: (100 * sh) / sr, b: (100 * sb) / sr };
  };
  const kv = deux ? "tot" : vus.length ? vus[0].k : null;
  $("prod-rte-carte").hidden = !cr.length;
  if (cr.length) {
    const n = mes(serie(kv, ""), serie(kv, "reel"), cr), r = mes(serie(kv, "rte"), serie(kv, "reel"), cr), w = mes(serie(kv, "veille"), serie(kv, "reel"), cr);
    const errJ = (x, a) => (100 * Math.abs(somme(serie(kv, a)(x.prod)) - somme(serie(kv, "reel")(x.prod)))) / somme(serie(kv, "reel")(x.prod));
    const mieux = cr.filter((x) => errJ(x, "") < errJ(x, "rte")).length, mieuxV = cr.filter((x) => errJ(x, "") < errJ(x, "veille")).length;
    const best = Math.min(n.j, r.j, vOn ? w.j : Infinity);
    const quoi = (deux ? t("total_court") : t(vus[0].lib)).toLowerCase();
    $("prod-rte-titre").textContent = t("rte_hist_titre", { q: quoi, n: cr.length });
    const pc = (x) => `${nombre(x)} <small>%</small>`;
    $("prod-rte-duel").innerHTML = cas("nous", trait("--p-nous", "plein"), t("duel_nous"), pc(n.j), t("hist_det", { h: nombre(n.h), b: signe(n.b) }), n.j === best)
      + cas("rte", trait("--p-rte", "points"), t("duel_rte"), pc(r.j), t("hist_det", { h: nombre(r.h), b: signe(r.b) }), r.j === best && n.j !== best)
      + (vOn ? cas("veille", trait("--p-veille", "tirets"), t("duel_veille"), pc(w.j), t("hist_det", { h: nombre(w.h), b: signe(w.b) }), false) : "")
      + cas("reel", "", t("hist_mieux"), `${nombre((100 * mieux) / cr.length, 0)} <small>% ${t("hist_jours")}</small>`,
        t("hist_mieux_d", { m: mieux, n: cr.length }) + (vOn ? " · " + t("hist_mieux_v", { p: nombre((100 * mieuxV) / cr.length, 0) }) : ""), false);
    $("prod-rte-duel").classList.toggle("quatre", vOn);
    // erreur moyenne par semaine (lundi → dimanche) : des barres groupées, plus lisibles que 60 jours en dents de scie
    const sems = [];
    for (const x of cr) {
      const d = new Date(x.jour + "T12:00:00Z"), lundi = ajouterJours(x.jour, -((d.getUTCDay() + 6) % 7));
      if (!sems.length || sems[sems.length - 1].lundi !== lundi) sems.push({ lundi, js: [] });
      sems[sems.length - 1].js.push(x);
    }
    const moyS = (a) => sems.map((S) => S.js.reduce((u, x) => u + errJ(x, a), 0) / S.js.length);
    const barre = (lib, a, c, extra = {}) => ({ type: "bar", label: lib, data: moyS(a), backgroundColor: css(c), borderColor: css("--surface"), borderWidth: { left: 1, right: 1 },
      borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: "bottom", categoryPercentage: 0.78, barPercentage: 0.92, ...extra });
    const dsE = [barre(t("duel_nous"), "", "--p-nous"), barre(t("duel_rte"), "rte", "--p-rte")];
    if (vOn) dsE.push(barre(t("veille_prod_court"), "veille", "--p-veille-barre"));
    const oE = optionsGW(12, "%");
    oE.scales.y.min = 0; oE.scales.x.grid = { display: false };
    Object.assign(oE.plugins.legend.labels, { boxWidth: 12, boxHeight: 12, useBorderRadius: true, borderRadius: 3 });
    oE.plugins.tooltip.usePointStyle = false;
    oE.plugins.tooltip.callbacks.title = (it) => { const S = sems[it[0].dataIndex]; return t("sem_du", { d: dateCourte(S.js[0].jour), f: dateCourte(S.js[S.js.length - 1].jour), n: S.js.length }); };
    dessiner("prod-g-err", { type: "bar", data: { labels: sems.map((S) => dateCourte(S.js[0].jour)), datasets: dsE }, options: oE });
    const lignesR = vus.map((x) => [pastTech(x) + t(x.lib), x.k]).concat(deux ? [[t("total_court"), "tot"]] : []);
    let hrt = `<thead><tr>${t("rte_cols").map((c, q) => `<th${q === 0 ? "" : ' class="num"'}>${q === 0 ? t("jours_n", { n: cr.length }) : c}</th>`).join("")}</tr></thead><tbody>`;
    for (const [lib, k] of lignesR) {
      const a = mes(serie(k, ""), serie(k, "reel"), cr), b = mes(serie(k, "rte"), serie(k, "reel"), cr), c = mes(serie(k, "veille"), serie(k, "reel"), cr);
      const e1 = (x, s) => Math.abs(somme(serie(k, s)(x.prod)) - somme(serie(k, "reel")(x.prod)));
      const m = cr.filter((x) => e1(x, "") < e1(x, "rte")).length, mv = cr.filter((x) => e1(x, "") < e1(x, "veille")).length;
      const trio = (q) => [a[q], b[q], c[q]].map((u, z, l) => `<td${u === Math.min(...l) ? ' class="positif"' : ""}>${nombre(u)} %</td>`).join("");
      hrt += `<tr><td>${lib}</td>${trio("j")}${trio("h")}<td>${signe(a.b)} %</td><td>${signe(b.b)} %</td><td>${signe(c.b)} %</td>`
        + `<td>${nombre((100 * m) / cr.length, 0)} %</td><td>${nombre((100 * mv) / cr.length, 0)} %</td></tr>`;
    }
    $("prod-rte").innerHTML = hrt + "</tbody>";
  } else effacer("prod-g-err");
}
function ouvrirProd(iso) { etat.jourProd = iso; location.hash = "#production/" + iso; }

/* ---------------------------------------------------------------- détails des modèles et sources */

/* ---------------------------------------------------------------- navigation */
const RENDUS = { prevision: rendrePrevision, performance: rendrePerformance, production: rendreProduction, ...(window.RECETTE ? window.RECETTE.rendus : {}) };   // onglets « Anciens modèles » et « Les modèles » : seulement avec infos_modeles.js
const ANCIENS = { historique: ["prevision"], modeles: ["apropos"], sources: ["apropos"] };       // anciens liens
function lireAncre() {
  let [o, jour] = location.hash.replace("#", "").split("/");
  if (ANCIENS[o]) [o, jour] = ANCIENS[o];
  etat.onglet = RENDUS[o] ? o : "prevision";
  if (etat.onglet === "prevision") etat.jourPrev = jour && etat.d && jourDe(jour) ? jour : etat.jourPrev;
  else if (etat.onglet === "production" && jour && etat.d && jourDe(jour)) etat.jourProd = jour;
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
  $("langue").setAttribute("aria-label", etat.langue === "fr" ? "Passer en anglais" : "Switch to French");
  $("theme").setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
  const icoLinkedin = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>`;
  const icoMail = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M3 5.5h18v13H3z M3.5 6l8.5 7 8.5-7"/></svg>`;
  $("pied").innerHTML = `<div class="contact"><div class="contact-qui"><span class="contact-titre">${t("contact")}</span><span class="contact-nom">Julien Mollin</span></div>`
    + `<div class="contact-liens"><a class="contact-lien linkedin" href="https://www.linkedin.com/in/julien-mollin/" target="_blank" rel="noopener" aria-label="LinkedIn : Julien Mollin">${icoLinkedin}<span>LinkedIn</span></a>`
    + `<a class="contact-lien" href="mailto:mollinjulien@gmail.com">${icoMail}<span>mollinjulien@gmail.com</span></a>`
    + `<a class="contact-lien" href="mailto:julien.mollin@edu.em-lyon.com">${icoMail}<span>julien.mollin@edu.em-lyon.com</span></a></div></div><p class="mentions">${t("pied")}</p>`;
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
      if (nouveau || (etat.onglet === "prevision" && A.haut + (A.jHaut ? "+" : "-") + "|" + (etat.jourPrev || "") !== etat.cleAccueil)) afficher();
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
    location.hash = "#" + b.dataset.onglet;
  }));
  document.querySelector("[role=tablist]").addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tabs = [...document.querySelectorAll("[role=tab]")], i = tabs.findIndex((x) => x.dataset.onglet === etat.onglet);
    const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); n.click();
  });
  window.addEventListener("hashchange", () => { lireAncre(); afficher(); });
  document.addEventListener("click", (e) => { const m = document.querySelector(".menu-modeles[open]"); if (m && !m.contains(e.target)) { m.open = false; etat.menuOuvert = false; etat.menuPerf = null; } });
  $("prod-date").addEventListener("change", (e) => { if (jourDe(e.target.value)) ouvrirProd(e.target.value); });
  const pasProd = (d) => { const js = jours().filter((j) => j.prod), i = js.findIndex((j) => j.jour === etat.jourProd) + d; if (js[i]) ouvrirProd(js[i].jour); };
  $("prod-prec").addEventListener("click", () => pasProd(-1));
  $("prod-suiv").addEventListener("click", () => pasProd(1));
  let attente;
  window.addEventListener("resize", () => { clearTimeout(attente); attente = setTimeout(() => { if (etat.d) afficher(); }, 250); });
  fetch("data/donnees.json", { cache: "no-store" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => { etat.d = d; lireAncre(); toutAfficher(); setInterval(rafraichir, 5 * 60 * 1000); })
    .catch(() => { document.querySelector("main").innerHTML = `<p class="carte">${t("chargement")}</p>`; });
}
document.addEventListener("DOMContentLoaded", demarrer);
