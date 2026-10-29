/* Site « Prix de l'électricité de demain » : lit data/donnees.json (écrit chaque jour par site_web.py) et dessine onglets, tableaux et graphiques (Chart.js). */
"use strict";

const TXT = {
  fr: {
    titre: "Prix de l'électricité de demain en France",
    sous_titre: "Chaque matin, nos modèles de machine learning prévoient le prix de l'électricité du lendemain en France (enchère day-ahead EPEX, au quart d'heure), avant sa publication vers 12 h 45. Le modèle principal est la moyenne de quatre variantes du modèle « Europe », qui combine prévisions météo, gaz, marchés voisins, prix britannique et nucléaire disponible. Les prévisions sont ensuite comparées au prix fixé par le marché.",
    jour_prec: "Jour précédent", jour_suiv: "Jour suivant", modele_aff: "Modèle affiché", modeles_menu: "Modèles", m_meilleur: "meilleur du jour", m_meilleur_p: "meilleur de la période", m_tout: "Tout cocher", n_modeles: "{n} modèles", m_reset: "Revenir au modèle principal", t_moyenne: "Prix moyen", t_erreur: "Erreur moyenne", t_attente: "en attente du prix", o_prevision: "Prévision", o_historique: "Historique", o_performance: "Performance", o_modeles: "Les modèles", o_apropos: "À propos", o_anciens: "Anciens modèles",
    maj: "Site mis à jour le {d}",
    prix_du: "Prix du {d}",
    b_demain: "demain", b_aujourdhui: "aujourd'hui", b_hier: "hier", b_passe: "jour passé", b_reel: "prix réel connu", b_calcul: "calcul en cours",
    retard: "La prévision du {d} n'est pas encore publiée : elle est normalement calculée vers 11 h 30 et publiée vers 11 h 45.",
    attente_d: "Le calcul démarre vers 11 h 30 (après la publication du prix britannique) et dure une quinzaine de minutes. Cette page se met à jour toute seule.",
    etapes_titre: "Étapes de la prévision",
    etapes_voir: "Étapes de la prévision de ce jour",
    g_donnees: "Données reçues", g_calculs: "Calculs", g_resultat: "Publication et vérification", g_donnees_c: "Données", g_calculs_c: "Calculs", g_resultat_c: "Publication",
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
    ck_modele_d: "appris avec les prix jusqu'au {v} inclus · {h} heures prévues · {a} arbres", ck_modele_d_simple: "appris avec les prix jusqu'au {v} inclus",
    ck_modele_rejeu: "calculé a posteriori (rejeu)", ck_modele_absent_d: "absent de la prévision", ck_modele_sans_gaz: "pas de prix du gaz récent",
    ck_publie: "Prévision publiée", nk_publie: "Publication de la prévision",
    ck_publie_d: "le {d}", ck_publie_att: "vers 10 h 30",
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
    intro_perf: "Erreur de chaque modèle par rapport au prix du marché, au quart d'heure. Plus c'est bas, mieux c'est. L'erreur relative rapporte la somme des erreurs à la somme des prix. Le gain se mesure contre le repère naïf « même quart d'heure la veille ». La corrélation (de −1 à 1, 1 = parfait) dit si le modèle suit bien les hausses et les baisses du prix, sans tenir compte du niveau ; « dans la journée » = moyenne des corrélations de chaque jour sur ses quarts d'heure.",
    pf_tout: "Tout l'historique", pf_30: "30 derniers jours", pf_direct: "Depuis la mise en ligne",
    aucun_direct: "Pas encore de jour prévu en direct : les premières prévisions publiées commencent le {d}.",
    c_corr: "Corrélation", c_corr_j: "Corrél. jour", corr_court: "corrélation {r}",
    c_modele: "Modèle", c_mae: "Erreur moyenne", c_rel: "Erreur relative", c_biais: "Biais", c_rmse: "Erreur quadratique", c_meilleur: "Meilleur du jour", c_gain: "Gain contre la veille",
    jours_n: "{n} jours",
    perf_jours: "Erreur moyenne de chaque jour (€/MWh)",
    perf_heures: "À quelle heure se trompe-t-on ? Erreur moyenne par heure de la journée (€/MWh)",
    perf_difficiles: "Les jours les plus difficiles pour nos modèles (classés selon l'erreur moyenne des modèles en service)",
    mise_en_ligne: "mise en ligne",
    m_qui: "Les modèles en service et le repère",
    m_chaine: "Ce qui se passe chaque jour",
    m_lexique: "Petit lexique",
    m_limites: "Limites, sources et méthode",
    nom_GR: "Données prévisions météo GFS + données gaz",
    nom_CR: "Données prévisions météo GFS + gaz + modèle de prédiction de l'électricité solaire / éolienne",
    nom_GT: "Données prévisions météo GFS + prix rapporté au gaz",
    court_GR: "GFS-G", court_CR: "GFS-G-P", court_GT: "GFS-RG",
    nom_court: "Dans les tableaux : « {c} »",
    tag_principal: "principal",
    f_GR: ["Ancien modèle principal (22 au 28/10/2026), aujourd'hui dernier secours : il ne dépend que de la météo GFS, de RTE et du gaz, donc il tourne même si les sources européennes sont en panne. Il apprend le lien entre le prix et ce qu'on sait la veille : prévisions météo GFS (soleil, vent, température), consommation prévue par RTE, jour de la semaine et jours fériés, prix des jours passés et prix du gaz.",
           "Algorithme : LightGBM (arbres de décision en série). Réentraîné chaque matin sur toutes les heures depuis 2020, en donnant plus de poids aux années récentes.",
           "Test sur 2026, réentraîné chaque jour : 19,2 €/MWh d'erreur moyenne à l'heure, contre 13,6 pour le modèle Europe et 27,9 pour « même heure la veille »."],
    f_CR: ["Comme le principal, mais le soleil et le vent bruts sont remplacés par la production solaire et éolienne prévue par nos propres modèles de production (appris eux aussi sur GFS).",
           "Idée : le prix dépend de la production renouvelable, autant la prévoir d'abord. En pratique, elle vient de la même météo et n'apporte pas d'information nouvelle.",
           "Test sur 2026 : 18,8 €/MWh, un peu moins bon que le principal (0,3 €/MWh d'écart, significatif)."],
    f_GT: ["Comme le principal, mais le modèle apprend le prix divisé par le coût du gaz pour une centrale (prix du gaz TTF ÷ 0,55), puis le remultiplie. Ainsi, ce qu'il a appris quand le gaz était bon marché reste valable quand il est cher.",
           "Il réagit plus fort au vent : très bon les jours où le prix s'effondre toute la journée, moins bon quand seul l'après-midi s'effondre.",
           "Septembre-octobre 2026, réentraîné chaque jour : 25,6 €/MWh contre 26,7 pour le principal (4 % de mieux ; écart pas encore démontré statistiquement)."],
    f_hier: ["Repère naïf, sans modèle : le prix de demain sera celui d'aujourd'hui au même quart d'heure. Un modèle utile doit faire mieux. Masqué par défaut : cochez « Veille » pour l'afficher."],
    etapes: [
      ["Vers 11 h 30, la veille", "Mise à jour des données : prix des jours passés en France et chez les voisins, consommation et prévision de consommation de RTE, production régionale récente, prix du gaz, échanges aux frontières (JAO), consommation prévue des voisins et avis d'indisponibilité des réacteurs nucléaires (ENTSO-E), prix britannique de demain (Nord Pool, publié vers 11 h)."],
      ["Météo de demain", "Téléchargement du dernier run de minuit du modèle météo GFS (NOAA) : rayonnement, vent à 100 m, température, nuages, pression sur la France."],
      ["Production prévue", "Nos modèles de production sont réappris avec la production réelle de RTE jusqu'à hier, puis transforment la météo en production solaire et éolienne par région (utilisée par le modèle « GFS-G-P »)."],
      ["Prix horaire", "Tous les modèles sont réentraînés sur tout l'historique jusqu'à minuit, puis prévoient le prix de chaque heure de demain. Depuis le 30/10/2026 le modèle publié est la moyenne EM ; s'il lui manque des données, le premier niveau disponible de la chaîne EM, EP, EU, GB, GR le remplace."],
      ["Quart d'heure", "Un second modèle répartit chaque heure en quatre quarts d'heure (le prix varie dans l'heure, surtout matin et soir)."],
      ["Publication", "Le site est mis à jour vers 11 h 45, avant l'enchère de 12 h 45."],
      ["Vers 13 h 45", "Le prix fixé par le marché est récupéré : le site ajoute la courbe réelle et calcule les écarts."],
    ],
    lexique: [
      ["Prix day-ahead", "Prix de l'électricité pour chaque quart d'heure du lendemain, fixé la veille vers 12 h 45 par une enchère (EPEX SPOT) où producteurs et acheteurs déposent leurs offres."],
      ["€/MWh", "Euros par mégawattheure. 100 €/MWh = 10 centimes le kWh, avant taxes et acheminement."],
      ["GFS", "Global Forecast System, le modèle de prévision météo mondial de l'agence américaine NOAA, gratuit et archivé depuis 2015."],
      ["TTF", "Prix de référence du gaz naturel en Europe. Une centrale à gaz fixe souvent le prix de l'électricité : son coût de combustible ≈ prix du gaz ÷ 0,55."],
      ["Noms courts", "GFS-G = météo GFS + gaz (modèle principal) · GFS-G-P = GFS + gaz + notre prévision de production (P) · GFS-RG = GFS + prix rapporté au gaz (RG = rapport gaz). Le nom complet s'affiche au survol."],
      ["Arbres", "Les modèles additionnent des centaines de petits arbres de décision ; leur nombre est choisi chaque jour automatiquement (on s'arrête quand l'erreur sur l'année précédente ne baisse plus)."],
      ["Écrêtement", "Quand le soleil et le vent produisent plus que ce que le pays consomme et peut exporter, le prix tombe près de 0, voire en dessous."],
      ["Erreur moyenne", "Moyenne des écarts absolus entre prix prévu et prix du marché. Une erreur de 20 €/MWh signifie qu'on se trompe en moyenne de 20 € par MWh."],
    ],
    limites: [
      "La prévision n'utilise que des données connues la veille au matin : prix passés, prévisions météo et prévision de consommation. Aucun prix du jour prévu n'entre dans les modèles.",
      "Les modèles n'ont appris que sur des prévisions météo archivées (GFS depuis 2020), jamais sur la météo observée : ce qu'ils voient à l'entraînement ressemble à ce qu'ils voient en service.",
      "Limite connue : les effondrements de prix par grand vent (prix proches de 0 pendant quelques heures) sont mal anticipés, surtout quand le marché est cher.",
      "Pris en compte depuis le 29/10/2026 (modèle Europe) : prix des voisins de la veille, échanges aux frontières, consommation prévue des voisins, prix britannique du jour et nucléaire disponible. Toujours absents : météo des voisins et prix du CO₂ (testés : pas de gain mesurable).",
      "Le nucléaire indisponible de l'historique vient de la dernière version de chaque avis ENTSO-E : il peut contenir de petites corrections publiées après coup. En service, seuls les avis connus le matin sont utilisés.",
      "Les modèles Europe sont en service depuis le 29/10/2026. Avant cette date, leurs prévisions sont rejouées a posteriori avec la même méthode (réappris chaque jour, uniquement avec les données publiées avant l'enchère), au pas horaire, avec la forme dans l'heure de GFS-G.",
      "Historique : avant le {d}, les jours sont rejoués a posteriori avec exactement la méthode du service ; à partir de cette date, ce sont les prévisions publiées en direct, la veille.",
      "Sources : prix EPEX SPOT (Bundesnetzagentur | SMARD.de, CC BY 4.0, via Energy-Charts / Fraunhofer ISE) ; consommation et production RTE (ODRÉ, éCO2mix) ; météo NOAA GFS ; gaz TTF (Yahoo Finance).",
      "Projet étudiant (emlyon business school). Les modèles et ce site ont été construits avec l'aide de Claude (Anthropic). Ce n'est pas un conseil d'investissement.",
    ],
    pied: "Projet étudiant (emlyon business school), réalisé avec l'aide de Claude (Anthropic). Ces prévisions ne constituent pas un conseil d'investissement. Prix du marché : EPEX SPOT, données Bundesnetzagentur | SMARD.de (CC BY 4.0) via Energy-Charts.info (Fraunhofer ISE).",
    o_production: "Production (bonus)", o_sources: "Sources",
    plus_details: "Plus de détails : variables, apprentissage, sources",
    d_vars: "Variables d'entrée ({n})", d_cible: "Ce que le modèle prévoit", d_appr: "Apprentissage", d_sources: "Données utilisées", d_arbres: "Dernière prévision (pour le {d}) : {a} arbres.",
    v_cal: ["Calendrier (7)", ["heure de la journée (heure de Paris)", "jour de la semaine", "week-end", "jour férié", "mois", "saison : sinus et cosinus du jour de l'année (2)"]],
    v_prix: ["Prix passés (6)", ["prix de la même heure la veille", "prix de la même heure 7 jours avant", "moyenne de la même heure sur les 7 derniers jours", "prix moyen, minimum et maximum de la veille (3)"]],
    v_prix_gaz: ["Prix passés rapportés au coût du gaz (6)", ["les 6 mêmes prix passés, chacun divisé par le coût du gaz d'une centrale (prix TTF ÷ 0,55)"]],
    v_fond: ["Prévisions pour le jour visé (5)", ["consommation prévue par RTE", "solaire : indicateur national GFS (rayonnement prévu × capacité installée, en GW)", "vent : indicateur national GFS (vent prévu à 100 m → courbe de puissance × capacité installée, en GW)", "température prévue (moyenne nationale GFS)", "charge résiduelle = consommation − 0,845 × solaire − 0,9 × vent"]],
    v_fond_prod: ["Prévisions pour le jour visé (5)", ["consommation prévue par RTE", "production solaire prévue par notre modèle de production (12 régions, en GW)", "production éolienne prévue par notre modèle de production (12 régions, en GW)", "température prévue (moyenne nationale GFS)", "charge résiduelle = consommation − solaire prévu − éolien prévu"]],
    v_gaz: ["Gaz (2)", ["prix du gaz TTF : dernière clôture connue (avant-veille du jour visé)", "variation du prix du gaz sur 7 jours"]],
    cible_prix: "Le prix de chaque heure du jour visé, en €/MWh, puis réparti en quarts d'heure.",
    cible_GT: "Le prix de chaque heure divisé par le coût du gaz (TTF ÷ 0,55) ; la prévision est ensuite remultipliée par ce coût, puis répartie en quarts d'heure.",
    a_GR: "Toutes les heures depuis le 15/01/2020 jusqu'à minuit (heure de Paris) la veille du jour visé : environ 59 000 heures.",
    a_CR: "Toutes les heures depuis janvier 2021 (première année où notre production prévue existe sans avoir été apprise sur ces mêmes jours) jusqu'à minuit la veille du jour visé : environ 51 000 heures.",
    a_commun: [
      "Réentraîné de zéro chaque matin vers 10 h 15.",
      "Algorithme : LightGBM, des centaines de petits arbres de décision ajoutés les uns après les autres, chacun corrigeant les erreurs des précédents. Perte L1 : le modèle vise la médiane, moins sensible aux pics de prix.",
      "Réglages : 31 feuilles par arbre, taux d'apprentissage 0,06, au moins 50 heures par feuille, 90 % des variables et 80 % des heures tirées au hasard pour chaque arbre.",
      "Nombre d'arbres choisi automatiquement : apprentissage jusqu'à il y a un an, validation sur les 12 derniers mois, arrêt quand l'erreur ne baisse plus, puis 10 % d'arbres en plus.",
      "Poids : les heures récentes comptent davantage (demi-vie d'un an : une heure d'il y a un an pèse deux fois moins qu'une heure d'hier).",
      "Moyenne de 3 modèles appris avec 3 graines aléatoires différentes, pour lisser le hasard.",
      "Quart d'heure : un second LightGBM (22 variables : position du quart dans l'heure, calendrier, écarts des quarts d'heure des jours passés, prix de la veille, consommation, solaire, vent, charge résiduelle et leurs variations d'une heure à l'autre) prévoit l'écart de chaque quart d'heure à la moyenne de son heure. Appris sur les quarts d'heure depuis octobre 2025.",
    ],
    ck_rejeu: "Prévision recalculée après coup", ck_rejeu_d: "le site a été mis en ligne le {m} : ce jour a été rejoué avec exactement la méthode du service. Le détail des étapes n'est enregistré que depuis le {d}.",
    prod_titre: "Bonus : notre prévision de production solaire et éolienne",
    intro_prod: "Avant de prévoir le prix, nous prévoyons la production solaire et éolienne de chaque région à partir de la même météo GFS. C'est cette production qui alimente le modèle « GFS-G-P ». Elle est comparée ici à la production réellement mesurée par RTE.",
    prod_details: "Détails des deux modèles de production (variables, apprentissage)",
    prod_demain: "Production prévue pour le {d} (France, GW)", prod_prevu_jour: "prévu sur la journée",
    prod_controle: "Prévu contre réel : notre modèle a-t-il bien prévu ?", prod_controle_note: "Production prévue la veille (pointillés) et production réellement mesurée par RTE (traits pleins), pour la France heure par heure. Changez de jour avec les flèches ou le calendrier ; par défaut, le dernier jour dont la production réelle est complète.",
    prod_heure: "Heure par heure (GW)", prod_regions: "Par région (GWh sur la journée)",
    prod_historique: "Précision sur tout l'historique",
    prod_hist_note: "Calculée sur les jours où la production réelle est connue toute la journée. Erreur journalière : écart entre le total prévu et le total réel de chaque jour ; erreur horaire : somme des écarts heure par heure ; les deux rapportées à la production réelle. Biais positif : on prévoit trop.",
    prod_hist_sol: "Solaire : total de chaque jour (GWh)", prod_hist_eol: "Éolien : total de chaque jour (GWh)",
    prod_note: "Nos modèles prévoient la production « potentielle » : ce que produiraient les installations sans écrêtement. Quand le prix devient négatif, une partie des parcs s'arrête volontairement : la production réelle est alors plus basse que la prévision (surtout le solaire en milieu de journée). Production réelle : éCO2mix temps réel de RTE, valeurs provisoires, mises à jour chaque matin.",
    p_prevu: "prévu", p_reel: "réel (RTE)", sol_court: "Solaire", eol_court: "Éolien", total_court: "Total solaire + éolien", region: "Région", france: "France",
    sol_prevu: "Solaire prévu", eol_prevu: "Éolien prévu", sol_reel: "Solaire réel", eol_reel: "Éolien réel",
    reel_vs: "réel {r} GWh · écart {e} %", reel_partiel: "réel connu sur {h} h sur {n}", reel_absent: "réel pas encore publié (mis à jour chaque matin)",
    perf_ligne: "erreur journalière {j} % · horaire {h} % · biais {b} %", perf_n: "{n} jours complets",
    pas_de_prod: "Pas encore de prévision de production.",
    pm_sol_titre: "Modèle de production solaire", pm_eol_titre: "Modèle de production éolienne",
    pm_sol_cible: "La production potentielle de chaque région, heure par heure : taux de charge prévu × capacité solaire installée.",
    pm_eol_cible: "La production potentielle de chaque région, heure par heure : taux de charge prévu × capacité éolienne installée.",
    pm_sol_vars: [["Rayonnement théorique (4)", ["sur un panneau horizontal, incliné de 30° plein sud, orienté est 10°, orienté ouest 10° (moyennes des départements pondérées par la capacité)"]],
                  ["Soleil et ciel (7)", ["azimut du soleil : sinus et cosinus (2)", "cosinus de l'angle zénithal", "indice de clarté du ciel", "indice de ciel clair", "part du rayonnement diffus", "couverture nuageuse"]],
                  ["Température (1)", ["température prévue"]],
                  ["Calendrier (7)", ["heure : sinus et cosinus (2)", "jour de l'année : sinus et cosinus (2)", "jour de la semaine", "week-end", "jour férié"]],
                  ["Région (1)", ["l'une des 12 régions"]],
                  ["Rendement observé (3)", ["production réelle ÷ production théorique prévue : la veille, sur 3 jours et sur 30 jours (données RTE jusqu'à l'avant-veille)"]],
                  ["Indicateurs nationaux (4)", ["taux de charge théorique national (horizontal et 30° sud)", "solaire national prévu (GW)", "température nationale prévue"]]],
    pm_eol_vars: [["Vent sur les parcs (7)", ["taux de charge théorique (vent à 100 m → courbe de puissance)", "vent à 100 m", "vent à 10 m", "densité de l'air", "direction du vent : sinus et cosinus (2)", "dispersion du taux de charge entre les points de la région"]],
                  ["Heure (2)", ["heure : sinus et cosinus"]],
                  ["Région (1)", ["l'une des 12 régions"]],
                  ["Indicateurs nationaux (3)", ["éolien national prévu (GW)", "taux de charge éolien national", "solaire national prévu (GW)"]]],
    pm_sol_appr: ["Réappris de zéro chaque matin (depuis le 24/10/2026) : toutes les heures × régions depuis janvier 2020 (environ 350 000 lignes), prévisions GFS et production réelle de RTE jusqu'à la veille ; jamais de météo observée.", "LightGBM : 63 feuilles par arbre, au moins 400 lignes par feuille, nombre d'arbres choisi chaque matin par arrêt précoce sur les 2 derniers mois, moyenne de 3 graines.", "Appris en écartant les heures à prix négatif, où une partie des parcs s'arrête : il prévoit donc la production avant écrêtement.", "Test du 01/09 au 22/10/2026 : réappris chaque jour, son erreur journalière passe de 12,4 % (modèle figé au 31/08) à 9,8 % ; il surestime moins (+8 % au lieu de +12 %)."],
    pm_eol_appr: ["Réappris de zéro chaque matin (depuis le 24/10/2026) : toutes les heures × régions depuis janvier 2020 (environ 680 000 lignes), prévisions GFS et production réelle de RTE jusqu'à la veille ; jamais de météo observée.", "LightGBM : 31 feuilles par arbre, au moins 400 lignes par feuille, 4 000 à 7 000 arbres selon les jours (arrêt précoce), moyenne de 3 graines.", "Capacité éolienne de chaque région recalculée chaque mois avec les données temps réel de RTE.", "Test du 01/09 au 22/10/2026 : même erreur journalière (8,7 %) qu'il soit réappris chaque jour ou figé au 31/08 : le vent prévu fait l'essentiel."],
    pm_dernier: "Dernier réapprentissage (pour le {d}) : solaire {s} arbres, éolien {e} arbres.",
    ck_prod_modeles: "Modèles de production réappris", nk_prod_modeles: "Réapprentissage des modèles de production",
    ck_prod_modeles_d: "avec la production réelle jusqu'au {d} inclus · solaire {s} arbres · éolien {e} arbres",
    ck_prod_modeles_echec: "échec : modèles de la veille utilisés", ck_prod_modeles_fige: "prévision faite avant la mise en place du réapprentissage quotidien (le 23/10 au soir) : production apprise jusqu'au 31/08/2026",
    intro_sources: "Toutes les données utilisées sont publiques et gratuites. Voici d'où elles viennent, à quoi elles servent et où les retrouver.",
    s_outils: "Outils",
    s_utilise: "Utilisé pour : {u}",
    src: [
      ["voisins", "Prix day-ahead des pays voisins", "Energy-Charts (Fraunhofer ISE), d'après les résultats des bourses européennes", "Prix de la veille en Allemagne-Luxembourg, Belgique, Espagne, Italie (Nord) et Suisse.", [["API Energy-Charts", "https://api.energy-charts.info/"]]],
      ["jao", "Échanges aux frontières (couplage flow-based de la région Core)", "JAO, Joint Allocation Office (Publication Tool)", "Position nette de la France et échanges programmés de la veille, capacités maximales d'échange.", [["JAO Publication Tool", "https://publicationtool.jao.eu/core/"]]],
      ["entsoe", "Consommation prévue des voisins, capacités d'échange, indisponibilités nucléaires", "ENTSO-E, plateforme de transparence (gratuite, avec inscription)", "Prévision de consommation de la veille pour le lendemain des pays voisins, capacités d'échange vers l'Espagne, l'Italie et la Suisse, avis d'indisponibilité des réacteurs français (pour le nucléaire disponible et le surplus).", [["Plateforme de transparence ENTSO-E", "https://transparency.entsoe.eu/"]]],
      ["gb", "Prix day-ahead britannique", "Nord Pool, enchère N2EX (publiée vers 11 h, API publique non officielle) ; historique : Low Carbon Contracts Company", "Prix de chaque heure du jour visé en Grande-Bretagne, connu avant l'enchère française.", [["Nord Pool", "https://data.nordpoolgroup.com/"], ["Low Carbon Contracts Company", "https://www.lowcarboncontracts.uk/"]]],
      ["prix", "Prix day-ahead de l'électricité en France", "Enchère EPEX SPOT ; prix republiés par la Bundesnetzagentur / SMARD.de (licence CC BY 4.0) et récupérés via l'API Energy-Charts (Fraunhofer ISE)", "Prix de chaque heure, puis de chaque quart d'heure depuis octobre 2025, de 2020 à aujourd'hui : ce que les modèles apprennent et prévoient, et le « prix du marché » du site (onglet Historique, colonne Marché).", [["Résultats officiels EPEX SPOT (France, quarts d'heure)", "https://www.epexspot.com/en/market-results?market_area=FR&auction=MRC&modality=Auction&sub_modality=DayAhead&data_mode=table&product=15"], ["Graphique Energy-Charts (France)", "https://www.energy-charts.info/charts/price_spot_market/chart.htm?l=fr&c=FR"], ["API Energy-Charts (exemple : 23/10/2026)", "https://api.energy-charts.info/price?bzn=FR&start=2026-10-23&end=2026-10-23"], ["SMARD.de", "https://www.smard.de/"]]],
      ["conso", "Consommation et prévision de consommation", "RTE, éCO2mix national (Open Data Réseaux Énergies)", "Consommation réelle et prévision de consommation de RTE pour le lendemain, publiée le matin, au quart d'heure.", [["éCO2mix national temps réel", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/"], ["éCO2mix national consolidé", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-cons-def/"]]],
      ["gfs", "Prévisions météo GFS", "NOAA (États-Unis) ; archive NCAR / UCAR ; copie AWS Open Data", "Run de minuit, échéances de 27 à 48 h (prévision faite la veille pour le lendemain) : rayonnement, vent à 10 et 100 m, température, nuages, pression, sur la France. Archive 2020 → 18/10/2026 pour apprendre, run du jour pour prévoir (les deux sources donnent des valeurs identiques, vérifié).", [["Présentation de GFS (NOAA)", "https://www.ncei.noaa.gov/products/weather-climate-models/global-forecast"], ["Archive NCAR d084001", "https://gdex.ucar.edu/datasets/d084001/"], ["Runs du jour (AWS)", "https://registry.opendata.aws/noaa-gfs-bdp-pds/"]]],
      ["gaz", "Prix du gaz TTF", "Yahoo Finance (contrat TTF=F) ; secours OilPriceAPI", "Clôture quotidienne du gaz naturel néerlandais, la référence européenne, en €/MWh, depuis décembre 2019.", [["TTF sur Yahoo Finance", "https://finance.yahoo.com/quote/TTF%3DF/"], ["OilPriceAPI", "https://www.oilpriceapi.com/"]]],
      ["prod", "Production solaire et éolienne par région", "RTE, éCO2mix régional (Open Data Réseaux Énergies)", "Production réelle de chaque région (consolidée jusqu'au 31/08/2026, temps réel ensuite) : ce qu'apprennent les modèles de production, leur « rendement observé » et la courbe réelle de l'onglet Production.", [["éCO2mix régional temps réel", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-tr/"], ["éCO2mix régional consolidé", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-cons-def/"]]],
      ["capa", "Capacité solaire installée", "SDES (ministère de la Transition écologique), tableau de bord solaire photovoltaïque, édition T2 2026", "Puissance installée par département et par trimestre, recalée sur le total national de RTE : elle pondère la météo de chaque département.", [["Site du SDES", "https://www.statistiques.developpement-durable.gouv.fr/"]]],
      ["registre", "Registre national des installations", "Open Data Réseaux Énergies et data.gouv.fr (au 31/12/2025)", "Emplacement des parcs : chaque département a un point météo placé au centre de gravité de ses installations (94 points solaires, 55 points éoliens).", [["ODRÉ", "https://odre.opendatasoft.com/explore/dataset/registre-national-installation-production-stockage-electricite-agrege-311225/"], ["data.gouv.fr", "https://www.data.gouv.fr/datasets/registre-national-des-installations-de-production-et-de-stockage-delectricite-au-31-12-2025"]]],
    ],
    src_usage: { voisins: "les modèles Europe", jao: "les modèles Europe", entsoe: "les modèles Europe (consommation des voisins, surplus)", gb: "les modèles Europe", prix: "tous les modèles de prix", conso: "tous les modèles de prix", gfs: "les modèles de prix et de production", gaz: "tous les modèles de prix", prod: "les modèles de production", capa: "les modèles de production", registre: "les modèles de production" },
    outils: [["LightGBM (Microsoft) : l'algorithme de tous les modèles", "https://lightgbm.readthedocs.io/"], ["Python : pandas, NumPy, ecCodes pour lire les fichiers GFS", null], ["Chart.js : les graphiques de ce site", "https://www.chartjs.org/"], ["GitHub Pages : l'hébergement du site", null], ["Claude (Anthropic) : aide à l'écriture du code, des tests et de ce site", null]],
    gt_pourquoi_titre: "Pourquoi rapporter le prix au coût du gaz ?",
    gt_pourquoi: [
      "En France, le prix de l'électricité est souvent fixé par la dernière centrale appelée pour équilibrer l'offre et la demande, et c'est très souvent une centrale à gaz. Son coût de combustible vaut environ prix du gaz ÷ 0,55, car elle transforme 55 % de l'énergie du gaz en électricité.",
      "D'une année à l'autre, le niveau des prix est donc surtout une multiplication par le prix du gaz. Le modèle principal apprend le prix en euros : le gaz n'y est qu'une variable parmi 20, et il doit découvrir seul qu'un jour venteux fait baisser le prix de 30 € quand le gaz est bon marché mais de 80 € quand il est cher, avec peu d'exemples de gaz cher (surtout 2022).",
      "Ce modèle apprend plutôt « combien de fois le coût du gaz » : le prix et les prix passés sont divisés par le coût du gaz, puis la prévision est remultipliée. Exemple : il prévoit 0,8 fois le coût du gaz ; avec un gaz à 90 €/MWh (coût 164 €/MWh), cela donne 0,8 × 164 = 131 €/MWh.",
      "Ce qu'il a appris quand le gaz était bon marché reste ainsi valable quand il est cher : les effets du vent ou du soleil deviennent des pourcentages du prix. Conséquence : il réagit plus fort au vent. Très bon le 23/10/2026, quand le prix s'est effondré toute la journée ; moins bon le 21/10, quand seul l'après-midi s'est effondré.",
    ],
    gt_table: [["Prix du gaz TTF", "Coût de l'électricité d'une centrale à gaz"], ["10 €/MWh (2020)", "18 €/MWh"], ["35 €/MWh (2025)", "64 €/MWh"], ["90 €/MWh (octobre 2026)", "164 €/MWh"]],
    nom_EM: "Moyenne de 4 modèles Europe (EU, P, Q, F : surplus avec notre production, météo du run de 6 h)",
    nom_EP: "Moyenne de 2 modèles Europe (EU + surplus avec notre production)",
    nom_EU: "Modèle Europe : prévisions GFS + gaz + marchés voisins + prix britannique + surplus d'électricité",
    nom_EUC: "Modèle Europe complet : Europe + capacités d'échange du jour + nucléaire indisponible",
    nom_GB: "Prévisions GFS + gaz + prix des voisins de la veille + prix britannique",
    court_EM: "EUR-moy4", court_EP: "EUR-moy2", court_EU: "EUR", court_EUC: "EUR+", court_GB: "EUR-GB",
    tag_s1: "secours n°1", tag_s2: "secours n°2", tag_s3: "secours n°3", tag_s4: "dernier recours", tag_suivi: "suivi", tag_ancien: "ancien",
    f_EM: ["Le modèle principal depuis le 30/10/2026 : la moyenne de quatre variantes du modèle Europe, toutes réapprises chaque matin. EU : le modèle Europe d'origine. P : EU dont le « surplus » est calculé avec NOTRE prévision de production solaire et éolienne au lieu des indicateurs météo bruts. Q : EU avec les deux surplus. F : EU avec la météo du run GFS de 6 h UTC (publié vers 10 h 45), plus récent de 6 h que le run de 0 h.",
           "Pourquoi une moyenne : les quatre variantes se trompent un peu différemment, et la moyenne efface une partie de ces erreurs. Il n'y a pas de modèle plus malin, juste moins de bruit.",
           "Test sur 2026 (301 jours, réappris chaque jour) : 13,29 €/MWh d'erreur moyenne à l'heure contre 13,60 pour EU seul (gain 0,30 [0,18 ; 0,43], mieux 63 % des jours). Sur les 48 jours d'OpenWindCast : 17,3 contre 17,6. Si le run de 6 h manque, le service publie EP."],
    f_EP: ["Premier secours : la moyenne de deux variantes, EU et P (surplus calculé avec notre production prévue). Il ne dépend pas du run de 6 h, donc il prend la main si ce run n'est pas encore publié.",
           "Test sur 2026 : 13,35 €/MWh contre 13,60 pour EU (gain 0,25 [0,11 ; 0,40], mieux 60 % des jours)."],
    f_EU: ["Modèle principal du 29/10/2026, aujourd'hui secours n°2 et composante des moyennes EM et EP. Il part de « GFS + gaz » (météo GFS, consommation RTE, calendrier, prix passés, gaz) et regarde aussi chez les voisins : leurs prix de la veille (Allemagne, Belgique, Espagne, Italie, Suisse), les échanges aux frontières (JAO), leur consommation prévue (ENTSO-E) et le prix britannique du jour visé, fixé vers 11 h par une enchère qui a lieu avant la nôtre.",
           "Variable clé : le « surplus » = nucléaire disponible (avis d'indisponibilité connus la veille à 11 h) + vent + soleil prévus − consommation prévue. Quand il est grand, la France doit exporter beaucoup et le prix s'effondre. Comme GFS-RG, le prix est appris rapporté au coût du gaz.",
           "Test sur 2026 (301 jours, réappris chaque jour) : 13,6 €/MWh d'erreur moyenne à l'heure, contre 19,2 pour « GFS + gaz » et 27,9 pour la veille. Sur les 48 jours où OpenWindCast publie ses erreurs : 17,8 contre 17,6 (égalité, écart non significatif)."],
    f_EUC: ["La version complète du modèle Europe : 13 variables de plus (capacités d'échange maximales du jour visé publiées par JAO, capacités vers l'Espagne, l'Italie et la Suisse, nucléaire indisponible seul).",
            "Ces variables n'ont rien apporté au test : la version allégée (le modèle principal) fait aussi bien avec 54 variables au lieu de 67. On garde la version complète en secours et on la suit chaque jour pour voir si elle devient meilleure avec le temps.",
            "Test sur 2026 : 13,6 €/MWh (écart avec le principal +0,07, non significatif)."],
    f_GB: ["Secours si les données ENTSO-E (consommation des voisins, nucléaire) manquent le matin : « GFS + gaz » + prix des voisins de la veille + échanges JAO de la veille + prix britannique du jour.",
           "Il ne connaît pas le surplus : il se trompe davantage les jours où le prix s'effondre.",
           "Test sur 2026 : 15,3 €/MWh."],
    v_vois: ["Prix des voisins la veille (10)", ["prix de la même heure la veille et prix moyen de la veille, en Allemagne-Luxembourg, Belgique, Espagne, Italie (Nord) et Suisse, rapportés au coût du gaz"]],
    v_jao: ["Échanges aux frontières la veille (11)", ["position nette de la France (heure et moyenne du jour)", "échanges programmés avec l'Allemagne, la Belgique et l'Espagne", "position nette minimale et maximale possible, échanges maximaux France ↔ Allemagne et France ↔ Belgique (JAO, flow-based)"]],
    v_charge: ["Consommation prévue des voisins (7)", ["Allemagne, Belgique, Pays-Bas, Espagne, Italie (Nord), Suisse et leur total (ENTSO-E, en GW)"]],
    v_gb: ["Prix britannique du jour visé (3)", ["prix de l'heure, moyenne de la journée, variation par rapport à la veille (Nord Pool N2EX, en £/MWh, rapportés au coût du gaz)"]],
    v_surplus: ["Surplus d'électricité (3)", ["surplus de l'heure = nucléaire disponible + vent + soleil prévus − consommation prévue (GW)", "surplus maximal et minimal de la journée"]],
    v_jaoa: ["Échanges possibles le jour visé (6)", ["position nette minimale et maximale, échanges maximaux France ↔ Allemagne et France ↔ Belgique (JAO, publiés vers 9 h 45 la veille)"]],
    v_ntc: ["Capacités d'échange du jour visé (6)", ["France → Espagne, Espagne → France, France → Italie, Italie → France, France → Suisse, Suisse → France (ENTSO-E)"]],
    v_nuc: ["Nucléaire (1)", ["puissance nucléaire indisponible d'après les avis connus la veille à 11 h (GW)"]],
    a_EU: "Toutes les heures depuis le 15/01/2020 jusqu'à minuit (heure de Paris) la veille du jour visé : environ 59 000 heures. Les données des voisins absentes au début (JAO n'existe que depuis juin 2022) restent vides : LightGBM sait faire avec.",
    a_arbres_EU: "Nombre d'arbres fixé une fois pour toutes ({a}) : appris jusqu'à fin 2024, arrêt quand l'erreur sur 2025 ne baisse plus, puis 10 % d'arbres en plus.",
    ck_europe: "Marchés voisins, échanges, nucléaire et prix britannique", nk_europe: "Marchés voisins et prix britannique",
    ck_europe_d: "prix britannique de demain publié le {d}", ck_europe_echec: "en panne : {l}", ck_europe_avant: "pas encore utilisés ce jour-là (modèle Europe en service depuis le 29/10/2026)",
    ck_modele_rejeu_eu: "recalculé a posteriori (modèle mis en service le 29/10/2026)", ck_modele_manque: "non calculé : données manquantes ({l})",
    an_intro: "Avant d'arriver au modèle Europe, nous avons construit et testé une trentaine de modèles. Les trois anciens modèles du site tournent toujours chaque jour, pour comparaison. Le tableau ci-dessous raconte le chemin parcouru : chaque ligne ajoute une idée, et l'erreur est mesurée de la même façon (2026, réappris chaque jour avant chaque prévision, uniquement avec des données publiées avant l'enchère).",
    an_parcours: "Le chemin parcouru (erreur moyenne à l'heure sur 2026, €/MWh)",
    an_cols: ["Date", "Modèle", "Ce qu'on a ajouté ou essayé", "Erreur 2026", "Verdict"],
    an_lignes: [
      ["16/10", "Repère « même heure la veille »", "aucun modèle", "27,9", "à battre"],
      ["16-21/10", "22 premières recettes LightGBM", "météo observée (ERA5) ou prévue (Open-Meteo, GFS), consommation, gaz, CO₂, nucléaire de l'avant-veille, notre production prévue", "19,7 à 26,8*", "le gaz et le réapprentissage aident ; CO₂ et nucléaire J-2 : rien"],
      ["22/10", "GFS-G : tout GFS + gaz", "une seule source météo, réapprise chaque jour", "19,1", "principal du 22 au 28/10"],
      ["22/10", "GFS-G-P : + notre production prévue", "la chaîne production → prix", "18,8**", "pas mieux que la météo seule"],
      ["23/10", "GFS-RG : prix rapporté au gaz", "le prix appris en multiple du coût du gaz", "18,5", "un peu mieux"],
      ["27/10", "+ prix des voisins et échanges de la veille", "Allemagne, Belgique, Espagne, Italie, Suisse ; JAO", "18,1", "un peu mieux"],
      ["27/10", "+ prévisions de vent et de soleil ENTSO-E", "prévisions officielles des voisins", "16,7", "écarté : publiées après l'enchère"],
      ["28/10", "+ prix britannique du jour", "l'enchère britannique a lieu vers 11 h, avant la nôtre", "15,4", "gros gain → secours n°2"],
      ["28/10", "+ consommation des voisins, échanges possibles, capacités", "ENTSO-E et JAO du jour", "15,1", "un peu mieux"],
      ["28/10", "+ nucléaire disponible et surplus", "avis d'indisponibilité connus la veille à 11 h", "13,7", "gros gain → secours n°1"],
      ["28/10", "Météo de l'Allemagne et du Benelux", "vent et soleil GFS, même la prévision officielle", "≈ 13,7", "aucun gain : abandonnée"],
      ["28/10", "Élagage fort (29 variables)", "retirer tous les groupes qui semblaient inutiles", "14,5", "pire : abandonné"],
      ["28/10", "Élagage léger (54 variables)", "retirer les données du jour inutiles", "13,6", "aussi bon et plus simple → principal"],
    ],
    an_notes: "* réappris chaque mois (22 recettes, test du 21/10/2026). ** autre série de test (291 jours, 21/10/2026). Tous les autres chiffres : même test de 300 jours (01/01 → 28/10/2026).",
    an_perf: "Tous les modèles sur l'historique du site (erreur au quart d'heure, jours où le prix du marché est connu)",
    an_fiches: "Les anciens modèles, toujours calculés chaque jour",
    chargement: "Impossible de charger les données.",
    unite: "€/MWh",
  },
  en: {
    titre: "Tomorrow's electricity price in France",
    sous_titre: "Every morning, our machine-learning models forecast the next day's French electricity price (EPEX day-ahead auction, 15-minute resolution) before it is published around 12:45. The main model is the average of four variants of the \"Europe\" model, which combines weather forecasts, gas, neighbouring markets, the British price and available nuclear capacity. Forecasts are then compared with the price set by the market.",
    jour_prec: "Previous day", jour_suiv: "Next day", modele_aff: "Model shown", modeles_menu: "Models", m_meilleur: "best of the day", m_meilleur_p: "best of the period", m_tout: "Select all", n_modeles: "{n} models", m_reset: "Back to the main model", t_moyenne: "Average price", t_erreur: "Mean error", t_attente: "awaiting price", o_prevision: "Forecast", o_historique: "History", o_performance: "Performance", o_modeles: "The models", o_apropos: "About", o_anciens: "Past models",
    maj: "Site updated {d}",
    prix_du: "Prices for {d}",
    b_demain: "tomorrow", b_aujourdhui: "today", b_hier: "yesterday", b_passe: "past day", b_reel: "actual price known", b_calcul: "computing",
    retard: "The forecast for {d} is not published yet: it is normally computed around 11:30 and published around 11:45.",
    attente_d: "The computation starts around 11:30 (after the British price is published) and takes about fifteen minutes. This page updates by itself.",
    etapes_titre: "Forecast steps",
    etapes_voir: "Forecast steps for this day",
    g_donnees: "Data received", g_calculs: "Computations", g_resultat: "Publication and check", g_donnees_c: "Data", g_calculs_c: "Models", g_resultat_c: "Publication",
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
    ck_modele_d: "trained on prices up to {v} included · {h} hours forecast · {a} trees", ck_modele_d_simple: "trained on prices up to {v} included",
    ck_modele_rejeu: "computed afterwards (replay)", ck_modele_absent_d: "missing from the forecast", ck_modele_sans_gaz: "no recent gas price",
    ck_publie: "Forecast published", nk_publie: "Forecast publication",
    ck_publie_d: "{d}", ck_publie_att: "around 10:30",
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
    intro_perf: "Error of each model against the market price, per quarter-hour. Lower is better. The relative error divides the sum of errors by the sum of prices. The gain is measured against the naive \"same quarter-hour the day before\" benchmark. The correlation (−1 to 1, 1 = perfect) tells whether the model follows the price ups and downs, regardless of level; \"within-day\" = average of each day's correlation over its quarter-hours.",
    pf_tout: "Full history", pf_30: "Last 30 days", pf_direct: "Since going live",
    aucun_direct: "No live day yet: the first published forecasts start on {d}.",
    c_corr: "Correlation", c_corr_j: "Daily correl.", corr_court: "correlation {r}",
    c_modele: "Model", c_mae: "Mean error", c_rel: "Relative error", c_biais: "Bias", c_rmse: "Root mean square error", c_meilleur: "Best of the day", c_gain: "Gain over the day before",
    jours_n: "{n} days",
    perf_jours: "Mean error of each day (€/MWh)",
    perf_heures: "When are we wrong? Mean error by hour of the day (€/MWh)",
    perf_difficiles: "The hardest days for our models (ranked by the average error of the models in service)",
    mise_en_ligne: "live",
    m_qui: "The models in service and the benchmark",
    m_chaine: "What happens every day",
    m_lexique: "Glossary",
    m_limites: "Limitations, sources and method",
    nom_GR: "GFS weather forecast data + gas data",
    nom_CR: "GFS weather forecast data + gas + solar / wind power prediction model",
    nom_GT: "GFS weather forecast data + gas-relative price",
    court_GR: "GFS-G", court_CR: "GFS-G-P", court_GT: "GFS-RG",
    nom_court: "In tables: \"{c}\"",
    tag_principal: "main",
    f_GR: ["Former main model (22 to 28/10/2026), now the last fallback: it only needs GFS weather, RTE and gas, so it runs even when the European sources are down. It learns the link between the price and what is known the day before: GFS weather forecasts (sun, wind, temperature), RTE load forecast, weekday and holidays, past prices and the gas price.",
           "Algorithm: LightGBM (boosted decision trees). Retrained every morning on every hour since 2020, with more weight on recent years.",
           "2026 test, retrained daily: 19.2 €/MWh mean hourly error, versus 13.6 for the Europe model and 27.9 for \"same hour the day before\"."],
    f_CR: ["Like the main model, but raw sun and wind are replaced by the solar and wind output forecast by our own production models (also trained on GFS).",
           "Idea: the price depends on renewable output, so forecast it first. In practice it comes from the same weather and adds no new information.",
           "2026 test: 18.8 €/MWh, slightly worse than the main model (0.3 €/MWh, significant)."],
    f_GT: ["Like the main model, but it learns the price divided by the fuel cost of a gas plant (TTF gas price ÷ 0.55), then multiplies back. What it learned when gas was cheap thus still applies when gas is expensive.",
           "It reacts more strongly to wind: very good when the price collapses all day long, worse when only the afternoon collapses.",
           "September-October 2026, retrained daily: 25.6 €/MWh versus 26.7 for the main model (4% better; gap not yet statistically proven)."],
    f_hier: ["Naive benchmark, no model: tomorrow's price equals today's at the same quarter-hour. A useful model must beat it. Hidden by default: tick \"Day before\" to show it."],
    etapes: [
      ["Around 11:30, the day before", "Data update: past prices in France and next door, RTE load and load forecast, recent regional output, gas price, cross-border flows (JAO), neighbours' load forecasts and nuclear outage notices (ENTSO-E), tomorrow's British price (Nord Pool, published around 11:00)."],
      ["Tomorrow's weather", "Download of the latest midnight run of the GFS weather model (NOAA): radiation, 100 m wind, temperature, clouds, pressure over France."],
      ["Forecast output", "Our production models are retrained with RTE actual output up to yesterday, then turn the weather into solar and wind output per region (used by the \"GFS-G-P\" model)."],
      ["Hourly price", "All models are retrained on the full history up to midnight, then forecast the price of each hour of tomorrow. The Europe model is published as the main one; if it lacks data, the first available fallback replaces it."],
      ["Quarter-hour", "A second model splits each hour into four quarter-hours (prices move within the hour, especially morning and evening)."],
      ["Publication", "The site is updated around 11:45, before the 12:45 auction."],
      ["Around 13:45", "The market price is fetched: the site adds the actual curve and computes the errors."],
    ],
    lexique: [
      ["Day-ahead price", "Electricity price for each quarter-hour of the next day, set the day before around 12:45 by an auction (EPEX SPOT) where producers and buyers submit bids."],
      ["€/MWh", "Euros per megawatt-hour. 100 €/MWh = 10 cents per kWh, before taxes and grid fees."],
      ["GFS", "Global Forecast System, the global weather model of the US agency NOAA, free and archived since 2015."],
      ["TTF", "Europe's benchmark natural gas price. A gas plant often sets the electricity price: its fuel cost ≈ gas price ÷ 0.55."],
      ["Short names", "GFS-G = GFS weather + gas (main model) · GFS-G-P = GFS + gas + our production forecast (P) · GFS-RG = GFS + gas-relative price (RG = gas ratio). The full name appears on hover."],
      ["Trees", "The models add up hundreds of small decision trees; their number is chosen automatically every day (training stops when the error on the previous year no longer falls)."],
      ["Curtailment", "When sun and wind produce more than the country consumes and can export, the price drops close to 0 or even below."],
      ["Mean error", "Average absolute gap between forecast and market price. A 20 €/MWh error means being 20 € per MWh off on average."],
    ],
    limites: [
      "The forecast only uses data known on the morning before: past prices, weather forecasts and load forecast. No price of the forecast day enters the models.",
      "The models were trained only on archived weather forecasts (GFS since 2020), never on observed weather: what they see in training matches what they see in service.",
      "Known limitation: price collapses during very windy periods (prices near 0 for a few hours) are poorly anticipated, especially when the market is expensive.",
      "Included since 29/10/2026 (Europe model): neighbours' prices of the day before, cross-border flows, neighbours' load forecasts, the British price of the day and available nuclear capacity. Still missing: neighbours' weather and the CO₂ price (tested: no measurable gain).",
      "Historical nuclear outages come from the latest version of each ENTSO-E notice: they may include small corrections published later. In service, only notices known in the morning are used.",
      "The Europe models have been in service since 29/10/2026. Before that date, their forecasts are replayed afterwards with the same method (retrained daily, using only data published before the auction), hourly, with the within-hour shape of GFS-G.",
      "History: before {d}, days are replayed afterwards with exactly the service's method; from that date on, they are the forecasts published live, the day before.",
      "Sources: EPEX SPOT prices (Bundesnetzagentur | SMARD.de, CC BY 4.0, via Energy-Charts / Fraunhofer ISE); RTE load and output (ODRÉ, éCO2mix); NOAA GFS weather; TTF gas (Yahoo Finance).",
      "Student project (emlyon business school). The models and this site were built with the help of Claude (Anthropic). This is not investment advice.",
    ],
    pied: "Student project (emlyon business school), built with the help of Claude (Anthropic). These forecasts are not investment advice. Market prices: EPEX SPOT, data Bundesnetzagentur | SMARD.de (CC BY 4.0) via Energy-Charts.info (Fraunhofer ISE).",
    o_production: "Production (bonus)", o_sources: "Sources",
    plus_details: "More details: variables, training, sources",
    d_vars: "Input variables ({n})", d_cible: "What the model forecasts", d_appr: "Training", d_sources: "Data used", d_arbres: "Latest forecast (for {d}): {a} trees.",
    v_cal: ["Calendar (7)", ["hour of day (Paris time)", "weekday", "weekend", "public holiday", "month", "season: sine and cosine of the day of the year (2)"]],
    v_prix: ["Past prices (6)", ["price at the same hour the day before", "price at the same hour 7 days before", "average of the same hour over the last 7 days", "average, minimum and maximum price of the day before (3)"]],
    v_prix_gaz: ["Past prices relative to the gas cost (6)", ["the same 6 past prices, each divided by a gas plant's fuel cost (TTF price ÷ 0.55)"]],
    v_fond: ["Forecasts for the target day (5)", ["RTE load forecast", "solar: GFS national indicator (forecast radiation × installed capacity, GW)", "wind: GFS national indicator (forecast 100 m wind → power curve × installed capacity, GW)", "forecast temperature (GFS national average)", "residual load = load − 0.845 × solar − 0.9 × wind"]],
    v_fond_prod: ["Forecasts for the target day (5)", ["RTE load forecast", "solar output forecast by our production model (12 regions, GW)", "wind output forecast by our production model (12 regions, GW)", "forecast temperature (GFS national average)", "residual load = load − forecast solar − forecast wind"]],
    v_gaz: ["Gas (2)", ["TTF gas price: latest known close (two days before the target day)", "7-day change of the gas price"]],
    cible_prix: "The price of each hour of the target day, €/MWh, then split into quarter-hours.",
    cible_GT: "The price of each hour divided by the gas cost (TTF ÷ 0.55); the forecast is then multiplied back by that cost and split into quarter-hours.",
    a_GR: "Every hour from 15/01/2020 up to midnight (Paris time) before the target day: about 59,000 hours.",
    a_CR: "Every hour from January 2021 (the first year in which our production forecast exists without having been trained on those same days) up to midnight before the target day: about 51,000 hours.",
    a_commun: [
      "Retrained from scratch every morning around 10:15.",
      "Algorithm: LightGBM, hundreds of small decision trees added one after another, each correcting the errors of the previous ones. L1 loss: the model targets the median, less sensitive to price spikes.",
      "Settings: 31 leaves per tree, learning rate 0.06, at least 50 hours per leaf, 90% of variables and 80% of hours drawn at random for each tree.",
      "Number of trees chosen automatically: training up to one year ago, validation on the last 12 months, stop when the error no longer falls, then 10% more trees.",
      "Weights: recent hours count more (one-year half-life: an hour from a year ago weighs half as much as yesterday's).",
      "Average of 3 models trained with 3 different random seeds, to smooth out chance.",
      "Quarter-hour: a second LightGBM (22 variables: position of the quarter within the hour, calendar, past days' quarter-hour deviations, previous day's price, load, solar, wind, residual load and their hour-to-hour changes) forecasts each quarter-hour's gap to its hourly average. Trained on quarter-hours since October 2025.",
    ],
    ck_rejeu: "Forecast recomputed afterwards", ck_rejeu_d: "the site went live on {m}: this day was replayed with exactly the service's method. Step details are only recorded since {d}.",
    prod_titre: "Bonus: our solar and wind production forecast",
    intro_prod: "Before forecasting the price, we forecast each region's solar and wind output from the same GFS weather. This output feeds the \"GFS-G-P\" model. Here it is compared with the output actually measured by RTE.",
    prod_details: "Details of the two production models (variables, training)",
    prod_demain: "Forecast output for {d} (France, GW)", prod_prevu_jour: "forecast for the day",
    prod_controle: "Forecast versus actual: did our model get it right?", prod_controle_note: "Output forecast the day before (dashed) and output actually measured by RTE (solid), for France hour by hour. Change day with the arrows or the calendar; by default, the latest day whose actual output is complete.",
    prod_heure: "Hour by hour (GW)", prod_regions: "By region (GWh over the day)",
    prod_historique: "Accuracy over the full history",
    prod_hist_note: "Computed on days where actual output is known for the whole day. Daily error: gap between forecast and actual daily totals; hourly error: sum of hour-by-hour gaps; both relative to actual output. Positive bias: forecast too high.",
    prod_hist_sol: "Solar: daily total (GWh)", prod_hist_eol: "Wind: daily total (GWh)",
    prod_note: "Our models forecast \"potential\" output: what installations would produce without curtailment. When the price turns negative, some plants stop on purpose, so actual output is lower than forecast (mostly solar around midday). Actual output: RTE éCO2mix real-time data, provisional values, updated every morning.",
    p_prevu: "forecast", p_reel: "actual (RTE)", sol_court: "Solar", eol_court: "Wind", total_court: "Solar + wind", region: "Region", france: "France",
    sol_prevu: "Forecast solar", eol_prevu: "Forecast wind", sol_reel: "Actual solar", eol_reel: "Actual wind",
    reel_vs: "actual {r} GWh · error {e}%", reel_partiel: "actual known for {h} h out of {n}", reel_absent: "actual not published yet (updated every morning)",
    perf_ligne: "daily error {j}% · hourly {h}% · bias {b}%", perf_n: "{n} complete days",
    pas_de_prod: "No production forecast yet.",
    pm_sol_titre: "Solar production model", pm_eol_titre: "Wind production model",
    pm_sol_cible: "Each region's potential output, hour by hour: forecast load factor × installed solar capacity.",
    pm_eol_cible: "Each region's potential output, hour by hour: forecast load factor × installed wind capacity.",
    pm_sol_vars: [["Theoretical radiation (4)", ["on a horizontal panel, tilted 30° due south, facing east 10°, facing west 10° (department averages weighted by capacity)"]],
                  ["Sun and sky (7)", ["solar azimuth: sine and cosine (2)", "cosine of the zenith angle", "clearness index", "clear-sky index", "diffuse fraction", "cloud cover"]],
                  ["Temperature (1)", ["forecast temperature"]],
                  ["Calendar (7)", ["hour: sine and cosine (2)", "day of year: sine and cosine (2)", "weekday", "weekend", "public holiday"]],
                  ["Region (1)", ["one of the 12 regions"]],
                  ["Observed yield (3)", ["actual output ÷ forecast theoretical output: previous day, 3 days and 30 days (RTE data up to two days before)"]],
                  ["National indicators (4)", ["national theoretical load factor (horizontal and 30° south)", "national forecast solar (GW)", "national forecast temperature"]]],
    pm_eol_vars: [["Wind at the farms (7)", ["theoretical load factor (100 m wind → power curve)", "100 m wind", "10 m wind", "air density", "wind direction: sine and cosine (2)", "spread of the load factor across the region's points"]],
                  ["Hour (2)", ["hour: sine and cosine"]],
                  ["Region (1)", ["one of the 12 regions"]],
                  ["National indicators (3)", ["national forecast wind (GW)", "national wind load factor", "national forecast solar (GW)"]]],
    pm_sol_appr: ["Retrained from scratch every morning (since 24/10/2026): every hour × region since January 2020 (about 350,000 rows), GFS forecasts and RTE actual output up to the day before; never observed weather.", "LightGBM: 63 leaves per tree, at least 400 rows per leaf, number of trees chosen every morning by early stopping on the last 2 months, average of 3 seeds.", "Trained without negative-price hours, when some plants stop: it therefore forecasts output before curtailment.", "Test from 01/09 to 22/10/2026: retrained daily, its daily error falls from 12.4% (model frozen on 31/08) to 9.8%; it overestimates less (+8% instead of +12%)."],
    pm_eol_appr: ["Retrained from scratch every morning (since 24/10/2026): every hour × region since January 2020 (about 680,000 rows), GFS forecasts and RTE actual output up to the day before; never observed weather.", "LightGBM: 31 leaves per tree, at least 400 rows per leaf, 4,000 to 7,000 trees depending on the day (early stopping), average of 3 seeds.", "Each region's wind capacity recomputed every month from RTE real-time data.", "Test from 01/09 to 22/10/2026: same daily error (8.7%) whether retrained daily or frozen on 31/08: the wind forecast does most of the work."],
    pm_dernier: "Latest retraining (for {d}): solar {s} trees, wind {e} trees.",
    ck_prod_modeles: "Production models retrained", nk_prod_modeles: "Production model retraining",
    ck_prod_modeles_d: "with actual output up to {d} included · solar {s} trees · wind {e} trees",
    ck_prod_modeles_echec: "failed: previous day's models used", ck_prod_modeles_fige: "forecast made before daily retraining was set up (evening of 23/10): output learned up to 31/08/2026",
    intro_sources: "All the data used is public and free. Here is where it comes from, what it is used for and where to find it.",
    s_outils: "Tools",
    s_utilise: "Used for: {u}",
    src: [
      ["voisins", "Day-ahead prices of neighbouring countries", "Energy-Charts (Fraunhofer ISE), from European power exchange results", "Prices of the day before in Germany-Luxembourg, Belgium, Spain, Italy (North) and Switzerland.", [["Energy-Charts API", "https://api.energy-charts.info/"]]],
      ["jao", "Cross-border flows (Core flow-based coupling)", "JAO, Joint Allocation Office (Publication Tool)", "France's net position and scheduled exchanges of the day before, maximum exchanges.", [["JAO Publication Tool", "https://publicationtool.jao.eu/core/"]]],
      ["entsoe", "Neighbours' load forecasts, transfer capacities, nuclear outages", "ENTSO-E Transparency Platform (free, registration required)", "Day-ahead load forecasts of neighbouring countries, transfer capacities to Spain, Italy and Switzerland, outage notices of French reactors (for available nuclear capacity and the surplus).", [["ENTSO-E Transparency Platform", "https://transparency.entsoe.eu/"]]],
      ["gb", "British day-ahead price", "Nord Pool, N2EX auction (published around 11:00, public but unofficial API); history: Low Carbon Contracts Company", "Price of each hour of the target day in Great Britain, known before the French auction.", [["Nord Pool", "https://data.nordpoolgroup.com/"], ["Low Carbon Contracts Company", "https://www.lowcarboncontracts.uk/"]]],
      ["prix", "French day-ahead electricity price", "EPEX SPOT auction; prices republished by Bundesnetzagentur / SMARD.de (CC BY 4.0 licence) and fetched through the Energy-Charts API (Fraunhofer ISE)", "Price of each hour, then of each quarter-hour since October 2025, from 2020 to today: what the models learn and forecast, and the site's \"market price\" (History tab, Market column).", [["Official EPEX SPOT results (France, quarter-hours)", "https://www.epexspot.com/en/market-results?market_area=FR&auction=MRC&modality=Auction&sub_modality=DayAhead&data_mode=table&product=15"], ["Energy-Charts chart (France)", "https://www.energy-charts.info/charts/price_spot_market/chart.htm?l=fr&c=FR"], ["Energy-Charts API (example: 23/10/2026)", "https://api.energy-charts.info/price?bzn=FR&start=2026-10-23&end=2026-10-23"], ["SMARD.de", "https://www.smard.de/"]]],
      ["conso", "Load and load forecast", "RTE, national éCO2mix (Open Data Réseaux Énergies)", "Actual load and RTE's next-day load forecast, published in the morning, per quarter-hour.", [["National éCO2mix real time", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/"], ["National éCO2mix consolidated", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-cons-def/"]]],
      ["gfs", "GFS weather forecasts", "NOAA (United States); NCAR / UCAR archive; AWS Open Data copy", "Midnight run, lead times of 27 to 48 h (forecast made the day before for the next day): radiation, 10 and 100 m wind, temperature, clouds, pressure over France. Archive 2020 → 18/10/2026 for training, today's run for forecasting (both sources give identical values, checked).", [["About GFS (NOAA)", "https://www.ncei.noaa.gov/products/weather-climate-models/global-forecast"], ["NCAR archive d084001", "https://gdex.ucar.edu/datasets/d084001/"], ["Today's runs (AWS)", "https://registry.opendata.aws/noaa-gfs-bdp-pds/"]]],
      ["gaz", "TTF gas price", "Yahoo Finance (TTF=F contract); OilPriceAPI as backup", "Daily close of Dutch natural gas, the European benchmark, €/MWh, since December 2019.", [["TTF on Yahoo Finance", "https://finance.yahoo.com/quote/TTF%3DF/"], ["OilPriceAPI", "https://www.oilpriceapi.com/"]]],
      ["prod", "Solar and wind output by region", "RTE, regional éCO2mix (Open Data Réseaux Énergies)", "Actual output of each region (consolidated up to 31/08/2026, real time after): what the production models learn, their \"observed yield\" and the actual curve in the Production tab.", [["Regional éCO2mix real time", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-tr/"], ["Regional éCO2mix consolidated", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-cons-def/"]]],
      ["capa", "Installed solar capacity", "SDES (French Ministry for the Ecological Transition), solar PV dashboard, Q2 2026 edition", "Installed capacity per department and quarter, aligned with RTE's national total: it weights each department's weather.", [["SDES website", "https://www.statistiques.developpement-durable.gouv.fr/"]]],
      ["registre", "National installation register", "Open Data Réseaux Énergies and data.gouv.fr (as of 31/12/2025)", "Location of the plants: each department has a weather point at the centre of gravity of its installations (94 solar points, 55 wind points).", [["ODRÉ", "https://odre.opendatasoft.com/explore/dataset/registre-national-installation-production-stockage-electricite-agrege-311225/"], ["data.gouv.fr", "https://www.data.gouv.fr/datasets/registre-national-des-installations-de-production-et-de-stockage-delectricite-au-31-12-2025"]]],
    ],
    src_usage: { voisins: "the Europe models", jao: "the Europe models", entsoe: "the Europe models (neighbours' load, surplus)", gb: "the Europe models", prix: "all price models", conso: "all price models", gfs: "the price and production models", gaz: "all price models", prod: "the production models", capa: "the production models", registre: "the production models" },
    outils: [["LightGBM (Microsoft): the algorithm of every model", "https://lightgbm.readthedocs.io/"], ["Python: pandas, NumPy, ecCodes to read GFS files", null], ["Chart.js: this site's charts", "https://www.chartjs.org/"], ["GitHub Pages: site hosting", null], ["Claude (Anthropic): help writing the code, the tests and this site", null]],
    gt_pourquoi_titre: "Why divide the price by the gas cost?",
    gt_pourquoi: [
      "In France, the electricity price is often set by the last plant called to balance supply and demand, very often a gas plant. Its fuel cost is about gas price ÷ 0.55, because it turns 55% of the gas energy into electricity.",
      "From one year to the next, the price level is therefore mostly a multiplication by the gas price. The main model learns the price in euros: gas is just one variable out of 20, and it must find out by itself that a windy day lowers the price by 30 € when gas is cheap but by 80 € when it is expensive, with few examples of expensive gas (mostly 2022).",
      "This model instead learns \"how many times the gas cost\": the price and past prices are divided by the gas cost, then the forecast is multiplied back. Example: it forecasts 0.8 times the gas cost; with gas at 90 €/MWh (cost 164 €/MWh), that gives 0.8 × 164 = 131 €/MWh.",
      "What it learned when gas was cheap thus still applies when gas is expensive: the effects of wind or sun become percentages of the price. As a result it reacts more strongly to wind. Very good on 23/10/2026, when the price collapsed all day; worse on 21/10, when only the afternoon collapsed.",
    ],
    gt_table: [["TTF gas price", "Electricity cost of a gas plant"], ["10 €/MWh (2020)", "18 €/MWh"], ["35 €/MWh (2025)", "64 €/MWh"], ["90 €/MWh (October 2026)", "164 €/MWh"]],
    nom_EM: "Average of 4 Europe models (EU, P, Q, F: surplus from our production forecast, 6 h GFS run)",
    nom_EP: "Average of 2 Europe models (EU + surplus from our production forecast)",
    nom_EU: "Europe model: GFS forecasts + gas + neighbouring markets + British price + power surplus",
    nom_EUC: "Full Europe model: Europe + transfer capacities of the day + unavailable nuclear",
    nom_GB: "GFS forecasts + gas + neighbours' prices of the day before + British price",
    court_EM: "EUR-avg4", court_EP: "EUR-avg2", court_EU: "EUR", court_EUC: "EUR+", court_GB: "EUR-GB",
    tag_s1: "fallback 1", tag_s2: "fallback 2", tag_s3: "fallback 3", tag_s4: "last resort", tag_suivi: "tracked", tag_ancien: "past",
    f_EM: ["The main model since 30/10/2026: the average of four variants of the Europe model, all retrained every morning. EU: the original Europe model. P: EU whose \"surplus\" is computed with OUR solar and wind production forecast instead of raw weather indicators. Q: EU with both surpluses. F: EU with the weather of the 06 UTC GFS run (published around 10:45), six hours fresher than the 00 UTC run.",
           "Why an average: the four variants err a little differently, and averaging cancels part of those errors. No smarter model, just less noise.",
           "2026 test (301 days, retrained daily): 13.29 €/MWh mean hourly error versus 13.60 for EU alone (gain 0.30 [0.18; 0.43], better on 63% of days). On the 48 OpenWindCast days: 17.3 versus 17.6. If the 6 h run is missing, the service publishes EP."],
    f_EP: ["First fallback: the average of two variants, EU and P (surplus computed with our production forecast). It does not depend on the 6 h run, so it takes over when that run is not yet published.",
           "2026 test: 13.35 €/MWh versus 13.60 for EU (gain 0.25 [0.11; 0.40], better on 60% of days)."],
    f_EU: ["Main model from 29/10/2026, now fallback 2 and a component of the EM and EP averages. It starts from \"GFS + gas\" (GFS weather, RTE load, calendar, past prices, gas) and also looks next door: neighbours' prices of the day before (Germany, Belgium, Spain, Italy, Switzerland), cross-border flows (JAO), their load forecasts (ENTSO-E) and the British price of the target day, set around 11:00 by an auction held before ours.",
           "Key variable: the \"surplus\" = available nuclear (outage notices known at 11:00 the day before) + forecast wind + sun − forecast load. When it is large, France must export a lot and the price collapses. Like GFS-RG, the price is learnt relative to the cost of gas.",
           "2026 test (301 days, retrained daily): 13.6 €/MWh mean hourly error, versus 19.2 for \"GFS + gas\" and 27.9 for the day before. On the 48 days for which OpenWindCast publishes its errors: 17.8 versus 17.6 (a tie, not significant)."],
    f_EUC: ["The full version of the Europe model: 13 more variables (maximum exchanges of the target day published by JAO, transfer capacities to Spain, Italy and Switzerland, unavailable nuclear on its own).",
            "These variables brought nothing in the test: the lighter version (the main model) does as well with 54 variables instead of 67. We keep the full version as a fallback and track it every day to see whether it improves over time.",
            "2026 test: 13.6 €/MWh (gap with the main model +0.07, not significant)."],
    f_GB: ["Fallback when ENTSO-E data (neighbours' load, nuclear) are missing in the morning: \"GFS + gas\" + neighbours' prices of the day before + JAO flows of the day before + British price of the day.",
           "It does not know the surplus: it errs more on days when the price collapses.",
           "2026 test: 15.3 €/MWh."],
    v_vois: ["Neighbours' prices the day before (10)", ["price of the same hour the day before and average price of the day before, in Germany-Luxembourg, Belgium, Spain, Italy (North) and Switzerland, relative to the cost of gas"]],
    v_jao: ["Cross-border flows the day before (11)", ["France's net position (hour and daily mean)", "scheduled exchanges with Germany, Belgium and Spain", "minimum and maximum possible net position, maximum exchanges France ↔ Germany and France ↔ Belgium (JAO, flow-based)"]],
    v_charge: ["Neighbours' load forecasts (7)", ["Germany, Belgium, Netherlands, Spain, Italy (North), Switzerland and their total (ENTSO-E, GW)"]],
    v_gb: ["British price of the target day (3)", ["price of the hour, daily mean, change from the day before (Nord Pool N2EX, £/MWh, relative to the cost of gas)"]],
    v_surplus: ["Power surplus (3)", ["surplus of the hour = available nuclear + forecast wind + sun − forecast load (GW)", "maximum and minimum surplus of the day"]],
    v_jaoa: ["Possible exchanges on the target day (6)", ["minimum and maximum net position, maximum exchanges France ↔ Germany and France ↔ Belgium (JAO, published around 9:45 the day before)"]],
    v_ntc: ["Transfer capacities of the target day (6)", ["France → Spain, Spain → France, France → Italy, Italy → France, France → Switzerland, Switzerland → France (ENTSO-E)"]],
    v_nuc: ["Nuclear (1)", ["unavailable nuclear capacity according to notices known at 11:00 the day before (GW)"]],
    a_EU: "Every hour from 15/01/2020 up to midnight (Paris time) before the target day: about 59,000 hours. Neighbour data missing in the early years (JAO only exists since June 2022) are left empty: LightGBM handles it.",
    a_arbres_EU: "Number of trees fixed once and for all ({a}): trained up to end-2024, stopped when the 2025 error no longer falls, then 10% more trees.",
    ck_europe: "Neighbouring markets, flows, nuclear and British price", nk_europe: "Neighbouring markets and British price",
    ck_europe_d: "tomorrow's British price published on {d}", ck_europe_echec: "down: {l}", ck_europe_avant: "not used yet on that day (Europe model in service since 29/10/2026)",
    ck_modele_rejeu_eu: "computed afterwards (model in service since 29/10/2026)", ck_modele_manque: "not computed: missing data ({l})",
    an_intro: "Before reaching the Europe model, we built and tested about thirty models. The site's three past models still run every day, for comparison. The table below tells the story: each row adds one idea, and the error is measured the same way (2026, retrained before each forecast, using only data published before the auction).",
    an_parcours: "How we got here (mean hourly error over 2026, €/MWh)",
    an_cols: ["Date", "Model", "What was added or tried", "2026 error", "Verdict"],
    an_lignes: [
      ["16/10", "Benchmark \"same hour the day before\"", "no model", "27.9", "to beat"],
      ["16-21/10", "First 22 LightGBM recipes", "observed (ERA5) or forecast (Open-Meteo, GFS) weather, load, gas, CO₂, nuclear two days before, our production forecast", "19.7 to 26.8*", "gas and retraining help; CO₂ and nuclear D-2: nothing"],
      ["22/10", "GFS-G: all GFS + gas", "a single weather source, retrained daily", "19.1", "main model 22-28/10"],
      ["22/10", "GFS-G-P: + our production forecast", "the production → price chain", "18.8**", "no better than weather alone"],
      ["23/10", "GFS-RG: price relative to gas", "price learnt as a multiple of the gas cost", "18.5", "slightly better"],
      ["27/10", "+ neighbours' prices and flows of the day before", "Germany, Belgium, Spain, Italy, Switzerland; JAO", "18.1", "slightly better"],
      ["27/10", "+ ENTSO-E wind and solar forecasts", "official forecasts of the neighbours", "16.7", "rejected: published after the auction"],
      ["28/10", "+ British price of the day", "the British auction runs around 11:00, before ours", "15.4", "big gain → fallback 2"],
      ["28/10", "+ neighbours' load, possible exchanges, capacities", "ENTSO-E and JAO of the day", "15.1", "slightly better"],
      ["28/10", "+ available nuclear and surplus", "outage notices known at 11:00 the day before", "13.7", "big gain → fallback 1"],
      ["28/10", "Weather of Germany and Benelux", "GFS wind and sun, even the official forecast", "≈ 13.7", "no gain: dropped"],
      ["28/10", "Strong pruning (29 variables)", "remove every group that looked useless", "14.5", "worse: dropped"],
      ["28/10", "Light pruning (54 variables)", "remove the useless same-day data", "13.6", "as good and simpler → main model"],
    ],
    an_notes: "* retrained monthly (22 recipes, test of 21/10/2026). ** another test series (291 days, 21/10/2026). All other figures: the same 300-day test (01/01 → 28/10/2026).",
    an_perf: "All models over the site's history (quarter-hour error, days when the market price is known)",
    an_fiches: "The past models, still computed every day",
    chargement: "Could not load the data.",
    unite: "€/MWh",
  },
};

const MODELES = [                                                     // modèles en service depuis le 29/10/2026 : principal puis secours
  { code: "EM", couleur: "--s-em", tirets: null, tag: "tag_principal" },
  { code: "EP", couleur: "--s-ep", tirets: [6, 4], tag: "tag_s1" },
  { code: "EU", couleur: "--s-eu", tirets: null, tag: "tag_s2" },
  { code: "GB", couleur: "--s-gb", tirets: [2, 3], tag: "tag_s3" },
  { code: "GR", couleur: "--s-gr", tirets: null, tag: "tag_s4" },
  { code: "EUC", couleur: "--s-euc", tirets: [6, 4], tag: "tag_suivi" },
];
const MODELES_ANCIENS = [                                             // toujours calculés, montrés dans l'onglet « Anciens modèles »
  { code: "CR", couleur: "--s-cr", tirets: null, tag: "tag_ancien" },
  { code: "GT", couleur: "--s-gt", tirets: [6, 4], tag: "tag_ancien" },
];
const TOUS = MODELES.concat(MODELES_ANCIENS);
const etat = { d: null, langue: "fr", onglet: "prevision", jourPrev: null, selPrev: null, menuOuvert: false,
               visibles: { EM: true, EP: true, EU: true, EUC: true, GB: true, GR: true, CR: true, GT: true, hier: false, bande: true },
               prodVisibles: { sol: true, eol: true },                          // cases Solaire / Éolien de l'onglet Production          // cases à cocher, communes à tous les tableaux et graphiques
               pasPrev: { haut: "quart", bas: "quart" }, pasHist: "quart", pasPlage: "heure", periodePerf: "tout", jourProd: null,
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
const visibles = (j) => TOUS.filter((m) => j[m.code] && etat.visibles[m.code]);
const colonnes = (j) => visibles(j).map((m) => m.code).concat(etat.visibles.hier ? ["hier"] : []);   // séries cochées d'un jour, repère « veille » compris
function meilleur(j, parmi) {                                        // modèle à la plus petite erreur moyenne du jour (parmi les modèles en service, ou la liste `parmi`)
  const c = modelesDuJour(j).map((m) => m.code).filter((k) => j.erreurs && j.erreurs[k] && (!parmi || parmi.includes(k)));
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
  const cles = ["reel", "hier", "bas", "haut", ...TOUS.map((m) => m.code)];
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
  const cases = codes.concat(["hier"], bande ? ["bande"] : []).map((c) => `<label class="choix-item"><input type="checkbox" id="${id}-${c}" data-c="${c}"${etat.visibles[c] ? " checked" : ""}>`
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
const aBande = (s) => Boolean(s.bas && s.haut);                              // la fourchette existe (jours publiés en direct), autour du modèle principal
const avecBande = () => false;                                       // fourchette retirée du site (demande de Julien, 27/10/2026)
function dsJour(s, j) {
  const ds = [];
  if (avecBande(s)) ds.push(...dsBande(s.bas, s.haut));
  if (s.reel) ds.push(dsMarche(s.reel));
  for (const m of visibles(j)) ds.push(dsModele(m, s[m.code]));
  if (etat.visibles.hier) ds.push(dsHier(s.hier));
  return ds;
}
const legendeJour = (s) => (s.reel ? [["reel", t("marche")]] : []);
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
    if (p) ajout("calculs", "ok", t("ck_prod"), t("ck_prod_d", { s: nombre(p.solaire, 0), e: nombre(p.eolien, 0) }));
    else ajout("calculs", "info", t("nk_prod"), t("ck_inconnu"));
  }
  for (const m of MODELES) {
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
  G.calculs.push(["attente", t("nk_prod"), a], ...MODELES.map((m) => ["attente", t("nk_modele", { m: courtModele(m.code) }), a]));
  G.resultat.push(["attente", t("nk_publie"), t("ck_publie_att")], ["attente", t("nk_reel"), t("ck_reel_attente", { d: dateCourte(veille) })], ["attente", t("nk_ecarts"), t("ck_ecarts_att")]);
  return groupesEtapes(G);
}

/* ---------------------------------------------------------------- onglet Prévision : deux jours */
function joursAccueil() {                                           // après 11 h 30 : demain en haut, aujourd'hui en bas ; avant : aujourd'hui, puis hier
  const now = maintenantParis(), haut = now.hm >= "11:30" ? ajouterJours(now.date, 1) : now.date, bas = ajouterJours(haut, -1);
  const avant = jours().filter((j) => j.jour < haut);
  return { now, haut, jHaut: jourDe(haut), jBas: jourDe(bas) || avant[avant.length - 1] };
}
function badgeJour(iso, now) {
  if (iso === ajouterJours(now.date, 1)) return "b_demain";
  if (iso === now.date) return "b_aujourdhui";
  if (iso === ajouterJours(now.date, -1)) return "b_hier";
  return "b_passe";
}
const meilleurDuJour = (j) => TOUS.map((m) => m.code).filter((k) => j[k] && j.erreurs && j.erreurs[k]).reduce((a, b) => (a === null || j.erreurs[b].mae < j.erreurs[a].mae ? b : a), null);
const CHAINE = ["EM", "EP", "EU", "GB", "GR"];                              // chaîne de repli du modèle publié
const principalActuel = () => ([...jours()].reverse().find((j) => j.source === "direct" && j.principal) || {}).principal || "EM";
function principalDe(j) {                                             // le principal ACTUEL pour tous les jours ; s'il manque ce jour-là, le niveau suivant de la chaîne
  const p = principalActuel(), L = [p, ...CHAINE.filter((c) => c !== p)];
  return L.find((c) => j[c]) || (TOUS.find((m) => j[m.code]) || {}).code;
}
const etiquetteJour = (m, j) => ` <span class="etiquette${m.code === principalDe(j) ? " principal" : ""}">${t(m.code === principalDe(j) ? "tag_principal" : m.tag)}</span>`;
function tuileModele(m, j, best) {
  const e = j.erreurs && j.erreurs[m.code];
  return `<div class="tuile modele${m.code === principalDe(j) ? " principal" : ""}" title="${nomModele(m.code)}"><div class="libelle">${pastille(m.code)}${courtModele(m.code)}${etiquetteJour(m, j)}${etiquetteMeilleur(m.code === best)}</div>`
    + `<div class="duo-valeurs"><div><div class="petit">${t("t_moyenne")}</div><div class="valeur">${enEuros(moyenne(j[m.code]))}</div></div>`
    + `<div><div class="petit">${t("t_erreur")}</div><div class="valeur erreur">${e ? enEuros(e.mae) : `<span class="attente">${t("t_attente")}</span>`}</div></div></div></div>`;
}
function tuilesJour(j) {
  const T = [], b = meilleurDuJour(j);
  if (j.reel) T.push(`<div class="tuile marche"><div class="libelle">${pastille("reel")}${t("marche_moyen")}</div><div class="duo-valeurs"><div><div class="petit">${t("t_moyenne")}</div><div class="valeur">${enEuros(moyenne(j.reel))}</div></div></div></div>`);
  for (const m of visibles(j)) T.push(tuileModele(m, j, b));
  const ref = j.reel ? "reel" : principalDe(j) || null;
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
const SEL_VIDE = () => Object.fromEntries(TOUS.map((m) => [m.code, false]).concat([["hier", false], ["bande", false]]));
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
  const js = jours(), premier = js[0].jour, dernier = js[js.length - 1].jour, A = joursAccueil(), max = dernier > A.haut ? dernier : A.haut;
  return `<div class="navigation-jour"><button type="button" id="prev-prec" class="bouton" aria-label="${t("jour_prec")}"${iso <= premier ? " disabled" : ""}>‹</button>`
    + `<input type="date" id="prev-date" aria-label="Date" min="${premier}" max="${max}" value="${iso}">`
    + `<button type="button" id="prev-suiv" class="bouton" aria-label="${t("jour_suiv")}"${iso >= max ? " disabled" : ""}>›</button></div>`;
}
function lierNavigation(iso) {
  const A = joursAccueil(), js = jours(), max = js[js.length - 1].jour > A.haut ? js[js.length - 1].jour : A.haut;
  $("prev-date").addEventListener("change", (e) => { const v = e.target.value; if (v && v >= js[0].jour && v <= max) ouvrirJour(v); });
  $("prev-prec").addEventListener("click", () => ouvrirJour(ajouterJours(iso, -1)));
  $("prev-suiv").addEventListener("click", () => ouvrirJour(ajouterJours(iso, 1)));
}
function menuModeles(p, j) {                                         // menu déroulant à cases à cocher : principal mis en avant, meilleur du jour signalé
  const sel = selectionDuJour(j), best = meilleurDuJour(j);
  const ligne = (m) => {
    const e = j.erreurs && j.erreurs[m.code], pr = m.code === principalDe(j);
    return `<label class="menu-item${pr ? " principal" : ""}"><input type="checkbox" data-c="${m.code}"${sel.includes(m.code) ? " checked" : ""}>${pastille(m.code)}`
      + `<span class="menu-nom"><b>${courtModele(m.code)}</b><small>${nomModele(m.code)}</small></span>`
      + `<span class="menu-tags">${pr ? `<span class="etiquette principal">${t("tag_principal")}</span>` : ""}${m.code === best ? `<span class="etiquette meilleur">${t("m_meilleur")}</span>` : ""}`
      + `${e ? `<span class="menu-err">${nombre(e.mae)} €</span>` : ""}</span></label>`;
  };
  const resume = sel.map((c) => courtModele(c)).join(", ");
  return `<details class="menu-modeles" id="${p}-menu"${etat.menuOuvert ? " open" : ""}><summary class="bouton"><span class="choix-titre">${t("modeles_menu")}</span> ${resume} ▾</summary>`
    + `<div class="menu-liste">${modelesDispos(j).map(ligne).join("")}<button type="button" class="bouton-discret" id="${p}-reset">${t("m_reset")}</button></div></details>`;
}
function rendreBlocJour(cote, iso, j, now) {
  const p = "p-" + cote, el = $("prev-" + cote), badge = badgeJour(iso, now), nav = navigationJour(iso);
  const tete = (extra) => `<div class="titre-jour"><h2>${t("prix_du", { d: dateLongue(iso) })}</h2><span class="badge${badge === "b_demain" ? " fort" : ""}">${t(badge)}</span>${extra}</div>`;
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
  el.innerHTML = tete(j.reel ? `<span class="badge">${t("b_reel")}</span>` : "") + bloc
    + `<div class="tuiles">${tuilesJour(j)}</div>`
    + `<div class="carte"><div class="barre-outils"><div class="outils-gauche">${nav}${menuModeles(p, j)}</div><div class="segments" id="${p}-pas" role="group"></div></div>`
    + `<div class="duo"><div class="cadre-table"><table id="${p}-table" class="table-donnees"></table></div>`
    + `<div class="graphique"><canvas id="${p}-graphique" role="img" aria-label="${t("prix_du", { d: dateLongue(iso) })}"></canvas></div></div>`
    + `<p class="note">${t("prix_du_jour")} · ${t(j.reel ? "note_prev_reel" : "note_prev_attente")}</p></div>`;
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
  const s = series(j, etat.pasPrev[cote]);
  tablePrix(p + "-table", s, j);
  lier(dessiner(p + "-graphique", { type: "line", data: { labels: s.labels, datasets: dsJour(s, j) }, options: options(13), plugins: [curseur] }), p + "-table");
}
function rendrePrevision() {
  const A = joursAccueil();
  const iso = etat.jourPrev && jourDe(etat.jourPrev) ? etat.jourPrev : A.haut;
  etat.cleAccueil = A.haut + (A.jHaut ? "+" : "-") + "|" + (etat.jourPrev || "");
  const bandeau = $("bandeau-retard");
  bandeau.hidden = iso !== A.haut || Boolean(A.jHaut) || (A.haut !== A.now.date && A.now.hm < "12:15");
  if (!bandeau.hidden) bandeau.textContent = "⚠ " + t("retard", { d: dateLongue(A.haut) });
  $("maj").textContent = t("maj", { d: new Date(etat.d.maj).toLocaleString(loc(), { dateStyle: "long", timeStyle: "short" }) });
  rendreBloc("haut", iso, jourDe(iso), A.now);
}

function ouvrirJour(iso) { etat.jourPrev = iso; location.hash = "#prevision/" + iso; }

/* ---------------------------------------------------------------- onglet Performance */
function menuPerf(id, codes, js) {                                   // même menu déroulant que l'onglet Prévision : principal mis en avant, meilleur de la période, erreur de chaque modèle
  const tous = codes.concat(["hier"]), princ = principalActuel();
  const err = Object.fromEntries(tous.map((c) => [c, js.length ? stats(js, c) : null]));
  const avec = codes.filter((c) => err[c]), best = avec.length ? avec.reduce((a, b) => (err[b].mae < err[a].mae ? b : a)) : null;
  const ligne = (c) => `<label class="menu-item${c === princ ? " principal" : ""}"><input type="checkbox" data-c="${c}"${etat.visibles[c] ? " checked" : ""}>${pastille(c)}`
    + `<span class="menu-nom"><b>${courtModele(c)}</b><small>${nomModele(c)}</small></span>`
    + `<span class="menu-tags">${c === princ ? `<span class="etiquette principal">${t("tag_principal")}</span>` : ""}${c === best ? `<span class="etiquette meilleur">${t("m_meilleur_p")}</span>` : ""}`
    + `${err[c] ? `<span class="menu-err">${nombre(err[c].mae)} €</span>` : ""}</span></label>`;
  const sel = tous.filter((c) => etat.visibles[c]);
  const resume = sel.length <= 3 ? sel.map((c) => courtModele(c)).join(", ") || "–" : t("n_modeles", { n: sel.length });
  $(id).innerHTML = `<details class="menu-modeles" id="${id}-menu"${etat.menuPerf === id ? " open" : ""}><summary class="bouton"><span class="choix-titre">${t("modeles_menu")}</span> ${resume} ▾</summary>`
    + `<div class="menu-liste">${tous.map(ligne).join("")}<button type="button" class="bouton-discret" id="${id}-tout">${t("m_tout")}</button></div></details>`;
  const menu = $(id + "-menu");
  menu.addEventListener("toggle", () => { etat.menuPerf = menu.open ? id : etat.menuPerf === id ? null : etat.menuPerf; });
  menu.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => { etat.visibles[inp.dataset.c] = inp.checked; etat.menuPerf = id; rendrePerformance(); }));
  $(id + "-tout").addEventListener("click", () => { for (const c of codes) etat.visibles[c] = true; etat.menuPerf = id; rendrePerformance(); });
}
function rendrePerformance() {
  segments("perf-periode", [["tout", t("pf_tout")], ["30", t("pf_30")], ["direct", t("pf_direct")]], etat.periodePerf, (v) => { etat.periodePerf = v; rendrePerformance(); });
  const codes = MODELES.map((m) => m.code);
  let js = joursAvecPrix();
  if (etat.periodePerf === "30") js = js.slice(-30);
  if (etat.periodePerf === "direct") js = js.filter((j) => j.source === "direct");
  for (const id of ["perf-choix", "perf-choix2"]) menuPerf(id, codes, js);
  const resume = $("perf-resume");
  if (!js.length) {
    resume.innerHTML = `<tbody><tr><td>${t("aucun_direct", { d: dateLongue(etat.d.debut_direct) })}</td></tr></tbody>`;
    for (const id of ["perf-jours", "perf-heures"]) effacer(id);
    $("perf-difficiles").innerHTML = "";
    return;
  }
  const vus = codes.filter((c) => etat.visibles[c]), sh = stats(js, "hier");
  const victoires = Object.fromEntries(codes.map((c) => [c, 0]));
  let nj = 0;
  for (const j of js) { const b = meilleur(j, vus); if (b) { nj++; victoires[b]++; } }          // « meilleur du jour » parmi les modèles cochés : le total fait 100 %
  const st = vus.map((c) => [c, stats(js, c)]).filter(([, s]) => s);
  const best = st.length ? st.reduce((a, b) => (b[1].mae < a[1].mae ? b : a))[0] : null;
  let h = `<thead><tr><th>${t("c_modele")} · ${t("jours_n", { n: js.length })}</th><th>${t("c_mae")}</th><th>${t("c_rel")}</th><th>${t("c_biais")}</th><th>${t("c_rmse")}</th><th>${t("c_corr")}</th><th>${t("c_corr_j")}</th><th>${t("c_meilleur")}</th><th>${t("c_gain")}</th></tr></thead><tbody>`;
  for (const [c, s] of st.concat(etat.visibles.hier ? [["hier", sh]] : [])) {
    const m = MODELES.find((x) => x.code === c);
    h += `<tr${c === best ? ' class="meilleur"' : ""}><td><span class="nom-modele" title="${nomModele(c)}">${pastille(c)}${courtModele(c)}${m ? etiquette(m) : ""}</span></td><td>${nombre(s.mae)} ${t("unite")}</td><td>${nombre(s.rel, 0)} %</td><td>${signe(s.biais)}</td><td>${nombre(s.rmse)}</td><td>${nombre(correlations(js, c).r, 2)}</td><td>${nombre(correlations(js, c).rj, 2)}</td>`
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
  const errMoy = (j) => moyenne(codes.filter((c) => j.erreurs[c]).map((c) => j.erreurs[c].mae));
  const dur = js.filter((j) => errMoy(j) !== null).sort((a, b) => errMoy(b) - errMoy(a)).slice(0, 8);
  let hd = `<thead><tr><th>${t("date")}</th><th>${pastille("reel")} ${t("marche_moyen")}</th>`
    + cols.map((c) => `<th class="modele" title="${nomModele(c)}">${pastille(c)} ${courtModele(c)} · ${t("erreur_moy")}</th>`).join("") + "</tr></thead><tbody>";
  for (const j of dur) {
    hd += `<tr data-jour="${j.jour}"><td>${dateMoyenne(j.jour)}</td><td>${nombre(moyenne(j.reel))}</td>` + cols.map((c) => `<td>${j.erreurs[c] ? nombre(j.erreurs[c].mae) : "–"}</td>`).join("") + "</tr>";
  }
  $("perf-difficiles").innerHTML = hd + "</tbody>";
  $("perf-difficiles").querySelectorAll("tbody tr").forEach((r) => r.addEventListener("click", () => ouvrirJour(r.dataset.jour)));
}

/* ---------------------------------------------------------------- onglet Modèles */
function fiche(m) {
  return `<div class="fiche"><h4>${pastille(m.code)}${nomModele(m.code)}${etiquette(m)}</h4><p class="court">${t("nom_court", { c: courtModele(m.code) })}</p>`
    + `${t("f_" + m.code).map((p, i) => `<p${i === 2 ? ' class="chiffre"' : ""}>${p}</p>`).join("")}${m.code === "GT" ? pourquoiGaz() : ""}${detailsModele(m.code)}</div>`;
}
function rendreModeles() {
  const f = MODELES.map(fiche);
  f.push(`<div class="fiche"><h4>${pastille("hier")}${t("hier")}</h4><p class="court">${t("nom_court", { c: t("hier_court") })}</p>${t("f_hier").map((p) => `<p>${p}</p>`).join("")}</div>`);
  $("m-fiches").innerHTML = f.join("");
  $("m-etapes").innerHTML = t("etapes").map(([a, b]) => `<li><div><b>${a}</b><span>${b}</span></div></li>`).join("");
  $("m-lexique").innerHTML = t("lexique").map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("");
  $("m-limites").innerHTML = t("limites").map((p) => `<li>${p.split("{d}").join(dateLongue(etat.d.debut_direct))}</li>`).join("");
}

/* ---------------------------------------------------------------- onglet Anciens modèles */
function rendreAnciens() {
  $("an-intro").textContent = t("an_intro");
  $("an-titre").textContent = t("an_parcours");
  $("an-parcours").innerHTML = `<thead><tr>${t("an_cols").map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>`
    + t("an_lignes").map((l) => `<tr>${l.map((c, i) => `<td${i === 3 ? ' class="reel"' : ""}>${c}</td>`).join("")}</tr>`).join("") + "</tbody>";
  $("an-notes").textContent = t("an_notes");
  $("an-perf-titre").textContent = t("an_perf");
  const js = joursAvecPrix(), sh = stats(js, "hier");
  const st = TOUS.map((m) => [m.code, stats(js, m.code)]).filter(([, x]) => x).sort((a, b) => a[1].mae - b[1].mae);
  let h = `<thead><tr><th>${t("c_modele")} · ${t("jours_n", { n: js.length })}</th><th>${t("c_mae")}</th><th>${t("c_rel")}</th><th>${t("c_biais")}</th><th>${t("c_rmse")}</th><th>${t("c_gain")}</th></tr></thead><tbody>`;
  for (const [c, x] of st.concat(sh ? [["hier", sh]] : [])) {
    const m = TOUS.find((y) => y.code === c);
    h += `<tr><td><span class="nom-modele" title="${nomModele(c)}">${pastille(c)}${courtModele(c)}${m ? etiquette(m) : ""}</span></td><td>${nombre(x.mae)} ${t("unite")}</td><td>${nombre(x.rel, 0)} %</td>`
      + `<td>${signe(x.biais)}</td><td>${nombre(x.rmse)}</td><td>${c === "hier" ? "–" : `<span class="positif">${signe((100 * (sh.mae - x.mae)) / sh.mae, 0)} %</span>`}</td></tr>`;
  }
  $("an-perf").innerHTML = h + "</tbody>";
  $("an-fiches-titre").textContent = t("an_fiches");
  $("an-fiches").innerHTML = MODELES_ANCIENS.map(fiche).join("");
}

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
function ficheProduction(cle) {
  const groupes = t(`pm_${cle}_vars`), n = groupes.reduce((s, g) => s + Number(g[0].match(/\((\d+)\)/)[1]), 0);
  const dir = [...jours()].reverse().find((j) => j.controles && j.controles.production_modeles && j.controles.production_modeles.reappris);
  const appr = t(`pm_${cle}_appr`).concat(dir ? [t("pm_dernier", { d: dateCourte(dir.jour), s: nombre(dir.controles.production_modeles.arbres.solaire, 0), e: nombre(dir.controles.production_modeles.arbres.eolien, 0) })] : []);
  return `<div class="fiche"><h4><span class="pastille" style="color:${css(cle === "sol" ? "--s-sol" : "--s-eol")}"></span>${t(`pm_${cle}_titre`)}</h4>`
    + `<div class="detail-bloc"><h5>${t("d_cible")}</h5><ul><li>${t(`pm_${cle}_cible`)}</li></ul></div>`
    + `<div class="detail-bloc"><h5>${t("d_vars", { n })}</h5><ul>${groupes.map(([g, l]) => `<li><b>${g}</b> : ${l.join(" ; ")}</li>`).join("")}</ul></div>`
    + `<div class="detail-bloc"><h5>${t("d_appr")}</h5><ul>${appr.map((x) => `<li>${x}</li>`).join("")}</ul></div>`
    + `<div class="detail-bloc"><h5>${t("d_sources")}</h5><ul>${["gfs", "prod", "capa", "registre"].map(lienSource).join("")}</ul></div></div>`;
}
const TECHS = [{ k: "sol", c: "--s-sol", lib: "sol_court", prevu: "sol_prevu", reel: "sol_reel" }, { k: "eol", c: "--s-eol", lib: "eol_court", prevu: "eol_prevu", reel: "eol_reel" }];
const pastTech = (x) => `<span class="pastille" style="color:${css(x.c)}"></span>`;
function choixProd(id) {                                             // cases Solaire / Éolien de l'onglet Production (un seul état pour tout l'onglet)
  const el = $(id);
  el.innerHTML = `<span class="choix-titre">${t("afficher")}</span>` + TECHS.map((x) => `<label class="choix-item"><input type="checkbox" id="${id}-${x.k}" data-k="${x.k}"${etat.prodVisibles[x.k] ? " checked" : ""}>${pastTech(x)}<span>${t(x.lib)}</span></label>`).join("");
  el.querySelectorAll("input").forEach((inp) => inp.addEventListener("change", () => {
    etat.prodVisibles[inp.dataset.k] = inp.checked;
    rendreProduction();
    const n = $(inp.id);
    if (n) n.focus({ preventScroll: true });
  }));
}
function rendreProduction() {
  $("prod-modeles").innerHTML = ficheProduction("sol") + ficheProduction("eol");
  const js = jours().filter((j) => j.prod), now = maintenantParis();
  if (!js.length) { $("prod-tuiles").innerHTML = `<p class="note">${t("pas_de_prod")}</p>`; return; }
  for (const id of ["prod-choix-demain", "prod-choix", "prod-choix-regions", "prod-choix-hist"]) choixProd(id);
  const vus = TECHS.filter((x) => etat.prodVisibles[x.k]), deux = vus.length === 2;
  // 1) production prévue du prochain jour (demain après 10 h)
  const A = joursAccueil(), jd = A.jHaut && A.jHaut.prod ? A.jHaut : js[js.length - 1], pd = jd.prod;
  $("prod-demain-titre").textContent = t("prod_demain", { d: dateLongue(jd.jour) });
  $("prod-demain-badge").textContent = t(badgeJour(jd.jour, now));
  const tuileSimple = (lib, v) => tuile(lib, `${nombre(v)} <small>GWh</small>`, t("prod_prevu_jour"));
  $("prod-demain-tuiles").innerHTML = vus.map((x) => tuileSimple(pastTech(x) + t(x.prevu), somme(pd[x.k]))).join("") + (deux ? tuileSimple(t("total_court"), somme(pd.sol) + somme(pd.eol)) : "");
  dessiner("prod-g-demain", { type: "line", data: { labels: pd.heures, datasets: vus.map((x) => dsProd(t(x.prevu), pd[x.k], x.c)) }, options: optionsGW(12, "GW"), plugins: [curseur] });
  // 2) contrôle : prévu contre réel, jour au choix (par défaut le dernier jour dont la production réelle est complète)
  const complets = js.filter((x) => x.prod.reel_complet);
  if (!etat.jourProd || !js.some((j) => j.jour === etat.jourProd)) etat.jourProd = (complets.length ? complets[complets.length - 1] : js[js.length - 1]).jour;
  const i = js.findIndex((j) => j.jour === etat.jourProd), j = js[i], p = j.prod;
  const inp = $("prod-date");
  inp.min = js[0].jour; inp.max = js[js.length - 1].jour; inp.value = j.jour;
  $("prod-prec").disabled = i === 0; $("prod-suiv").disabled = i === js.length - 1;
  $("prod-badge").textContent = `${dateLongue(j.jour)} · ${t(badgeJour(j.jour, now))}`;
  const nT = p.heures.length, tp_ = (k) => somme(p[k]), tr_ = (k) => (nConnus(p[k + "_reel"]) === nT ? somme(p[k + "_reel"]) : null);
  const T = vus.map((x) => tuileProd(pastTech(x) + t(x.prevu), tp_(x.k), tr_(x.k), nConnus(p[x.k + "_reel"]), nT));
  if (deux) T.push(tuileProd(t("total_court"), tp_("sol") + tp_("eol"), tr_("sol") !== null && tr_("eol") !== null ? tr_("sol") + tr_("eol") : null, Math.min(nConnus(p.sol_reel), nConnus(p.eol_reel)), nT));
  $("prod-tuiles").innerHTML = T.join("");
  const ds = vus.map((x) => dsProd(t(x.prevu), p[x.k], x.c, { borderDash: [6, 4] }));
  for (const x of vus) if (p[x.k + "_reel"]) ds.push(dsProd(t(x.reel) + " (RTE)", p[x.k + "_reel"], x.c, { borderWidth: 3 }));
  const ch = dessiner("prod-g-jour", { type: "line", data: { labels: p.heures, datasets: ds }, options: optionsGW(12, "GW"), plugins: [curseur] });
  $("prod-g-jour").setAttribute("aria-label", dateLongue(j.jour));
  const v = (a, k) => (a ? nombre(a[k]) : "–");
  const ec = (a, b, k) => (a && b && b[k] !== null && b[k] !== undefined ? signe(a[k] - b[k]) : "–");
  const ecJ = (a, b) => (b === null ? "–" : `${signe(ecartPc(a, b), 0)} %`);
  let h = `<thead><tr><th rowspan="2">${t("heure")}</th>${vus.map((x) => `<th colspan="3" class="groupe modele">${pastTech(x)} ${t(x.lib)}</th>`).join("")}</tr>`
    + `<tr>${vus.map(() => `<th class="groupe">${t("p_prevu")}</th><th>${t("p_reel")}</th><th>${t("ecart")}</th>`).join("")}</tr></thead><tbody>`;
  p.heures.forEach((lab, k) => {
    h += `<tr data-i="${k}"><td>${lab}</td>` + vus.map((x) => `<td class="groupe">${v(p[x.k], k)}</td><td class="reel">${v(p[x.k + "_reel"], k)}</td><td>${ec(p[x.k], p[x.k + "_reel"], k)}</td>`).join("") + "</tr>";
  });
  h += `</tbody><tfoot><tr><td>GWh</td>` + vus.map((x) => `<td class="groupe">${nombre(tp_(x.k))}</td><td class="reel">${tr_(x.k) === null ? "–" : nombre(tr_(x.k))}</td><td>${ecJ(tp_(x.k), tr_(x.k))}</td>`).join("") + "</tr></tfoot>";
  $("prod-table").innerHTML = vus.length ? h : "";
  if (vus.length) { collerEntetes($("prod-table")); lier(ch, "prod-table"); }
  const cellE = (pr, r) => (r === null ? "<td>–</td>" : `<td>${signe(ecartPc(pr, r), 0)} %</td>`);
  const col = { sol: [1, 2], eol: [3, 4] };
  let hr = `<thead><tr><th rowspan="2">${t("region")} · ${dateCourte(j.jour)}</th>${vus.map((x) => `<th colspan="3" class="groupe modele">${pastTech(x)} ${t(x.lib)}</th>`).join("")}</tr>`
    + `<tr>${vus.map(() => `<th class="groupe">${t("p_prevu")}</th><th>${t("p_reel")}</th><th>${t("ecart")}</th>`).join("")}</tr></thead><tbody>`;
  for (const r of p.regions) hr += `<tr><td>${r[0]}</td>` + vus.map((x) => { const [a, b] = col[x.k].map((c) => r[c]); return `<td class="groupe">${nombre(a)}</td><td class="reel">${b === null ? "–" : nombre(b)}</td>${cellE(a, b)}`; }).join("") + "</tr>";
  hr += `</tbody><tfoot><tr><td>${t("france")}</td>` + vus.map((x) => `<td class="groupe">${nombre(tp_(x.k))}</td><td class="reel">${tr_(x.k) === null ? "–" : nombre(tr_(x.k))}</td>${cellE(tp_(x.k), tr_(x.k))}`).join("") + "</tr></tfoot>";
  $("prod-regions").innerHTML = vus.length ? hr : "";
  if (vus.length) collerEntetes($("prod-regions"));
  // 3) précision sur tout l'historique (jours dont la production réelle est connue toute la journée)
  const perf = (P_, R_) => {
    let sj = 0, sh = 0, sb = 0, sr2 = 0;
    for (const x of complets) {
      const P = P_(x.prod), R = R_(x.prod);
      sj += Math.abs(somme(P) - somme(R)); sb += somme(P) - somme(R); sr2 += somme(R);
      P.forEach((y, k) => { sh += Math.abs(y - R[k]); });
    }
    return sr2 ? { j: (100 * sj) / sr2, h: (100 * sh) / sr2, b: (100 * sb) / sr2 } : null;
  };
  const tp = (lib, q) => tuile(lib, q ? `${nombre(q.j)} <small>%</small>` : "–", q ? t("perf_ligne", { j: nombre(q.j), h: nombre(q.h), b: signe(q.b) }) + " · " + t("perf_n", { n: complets.length }) : "");
  $("prod-perf").innerHTML = vus.map((x) => tp(pastTech(x) + t(x.lib), perf((y) => y[x.k], (y) => y[x.k + "_reel"]))).join("")
    + (deux ? tp(t("total_court"), perf((x) => x.sol.map((y, k) => y + x.eol[k]), (x) => x.sol_reel.map((y, k) => y + x.eol_reel[k]))) : "");
  const lab = js.map((x) => dateCourte(x.jour));
  const totJ = (x, k) => (x.prod[k] && nConnus(x.prod[k]) === x.prod.heures.length ? somme(x.prod[k]) : null);
  for (const x of TECHS) {
    const carte = $("prod-carte-h-" + x.k);
    carte.hidden = !etat.prodVisibles[x.k];
    if (carte.hidden) { effacer("prod-h-" + x.k); continue; }
    dessiner("prod-h-" + x.k, { type: "line", data: { labels: lab, datasets: [dsProd(t(x.prevu), js.map((y) => somme(y.prod[x.k])), x.c, { pointRadius: 2, borderDash: [6, 4] }), dsProd(t(x.reel) + " (RTE)", js.map((y) => totJ(y, x.k + "_reel")), x.c, { pointRadius: 2, borderWidth: 3 })] }, options: optionsGW(8, "GWh"), plugins: [curseur] });
  }
  $("prod-hist-cartes").classList.toggle("une", !deux);
}
function ouvrirProd(iso) { etat.jourProd = iso; location.hash = "#production/" + iso; }

/* ---------------------------------------------------------------- détails des modèles et sources */
function lienSource(id) {
  const s = t("src").find((x) => x[0] === id);
  return `<li><a href="#sources">${s[1]}</a> : ${s[2]}${s[4].length ? " · " + s[4].map(([lib, url]) => `<a href="${url}" target="_blank" rel="noopener">${lib}</a>`).join(" · ") : ""}</li>`;
}
const ARBRES_EUROPE = { EM: 3493, EP: 2026, EU: 721, EUC: 228, GB: 1064 };
function detailsModele(code) {
  const europe = code in ARBRES_EUROPE, relatif = europe || code === "GT";
  const groupes = [t("v_cal"), relatif ? t("v_prix_gaz") : t("v_prix"), code === "CR" ? t("v_fond_prod") : t("v_fond"), t("v_gaz")];
  if (europe) groupes.push(t("v_vois"), t("v_jao"), ...(code === "GB" ? [] : [t("v_charge")]), t("v_gb"), ...(code === "GB" ? [] : [t("v_surplus")]),
                           ...(code === "EUC" ? [t("v_jaoa"), t("v_ntc"), t("v_nuc")] : []));
  const n = groupes.reduce((s, g) => s + Number(g[0].match(/\((\d+)\)/)[1]), 0);
  const dir = [...jours()].reverse().find((j) => j.controles && j.controles.modeles && j.controles.modeles[code]);
  const appr = europe ? [t("a_EU"), ...t("a_commun").filter((x, i) => i !== 3), t("a_arbres_EU", { a: nombre(ARBRES_EUROPE[code], 0) })]
                      : [code === "CR" ? t("a_CR") : t("a_GR"), ...t("a_commun")];
  if (dir) appr.push(t("d_arbres", { d: dateCourte(dir.jour), a: nombre(dir.controles.modeles[code].arbres, 0) }));
  const src = ["prix", "conso", "gfs", "gaz"].concat(code === "CR" ? ["prod", "capa", "registre"] : [], europe ? ["voisins", "jao", ...(code === "GB" ? [] : ["entsoe"]), "gb"] : []);
  return `<details class="plus"><summary>${t("plus_details")}</summary>`
    + `<div class="detail-bloc"><h5>${t("d_cible")}</h5><ul><li>${relatif ? t("cible_GT") : t("cible_prix")}</li></ul></div>`
    + `<div class="detail-bloc"><h5>${t("d_vars", { n })}</h5><ul>${groupes.map(([g, l]) => `<li><b>${g}</b> : ${l.join(" ; ")}</li>`).join("")}</ul></div>`
    + `<div class="detail-bloc"><h5>${t("d_appr")}</h5><ul>${appr.map((x) => `<li>${x}</li>`).join("")}</ul></div>`
    + `<div class="detail-bloc"><h5>${t("d_sources")}</h5><ul>${src.map(lienSource).join("")}</ul></div></details>`;
}
function pourquoiGaz() {                                            // explication du modèle « prix rapporté au gaz »
  const [tete, ...lignes] = t("gt_table");
  return `<details class="plus"><summary>${t("gt_pourquoi_titre")}</summary><div class="detail-bloc">${t("gt_pourquoi").map((p) => `<p class="petit">${p}</p>`).join("")}`
    + `<table class="table-donnees mini"><thead><tr>${tete.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${lignes.map((l) => `<tr>${l.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
}
function rendreSources() {
  $("s-liste").innerHTML = t("src").map(([id, titre, fournisseur, usage, liens]) => `<div class="source" id="source-${id}"><h4>${titre}</h4><p class="fournisseur">${fournisseur}</p><p>${usage}</p>`
    + `<p class="fournisseur">${t("s_utilise", { u: t("src_usage")[id] })}</p><div class="liens">${liens.map(([lib, url]) => `<a href="${url}" target="_blank" rel="noopener">${lib} ↗</a>`).join("")}</div></div>`).join("");
  $("s-outils").innerHTML = t("outils").map(([lib, url]) => `<li>${url ? `<a href="${url}" target="_blank" rel="noopener">${lib}</a>` : lib}</li>`).join("");
}

/* ---------------------------------------------------------------- navigation */
const RENDUS = { prevision: rendrePrevision, performance: rendrePerformance, production: rendreProduction, anciens: rendreAnciens, apropos: () => { rendreModeles(); rendreSources(); } };
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
