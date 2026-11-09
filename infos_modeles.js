/* RECETTE DES MODÈLES : retirée du site public le 07/11/2026 (demande de Julien : « je ne veux pas être copié »).
   Ce fichier N'EST PAS publié tant que la recette est masquée : il vit dans site_recette/ (hors du dépôt du site).
   Pour tout remettre : .venv/bin/python recette_site.py remettre, puis site_web.py --publier.
   Chargé AVANT app.js (index.html), il remet : les textes complets (FR / EN), les onglets « Anciens modèles » et « Les modèles / Sources »,
   les fiches des modèles de production et les fonctions qui les dessinent (elles utilisent les fonctions d'app.js au moment de l'affichage). */
window.RECETTE = {
  txt: {
    fr: {
      o_modeles: "Les modèles",
      o_apropos: "À propos",
      o_anciens: "Anciens modèles",
      m_qui: "Les modèles en service et les repères",
      m_tous_matin: "Tous les modèles, de prix comme de production, sont réappris chaque matin avec toutes les données connues jusqu'à la veille, juste avant de prévoir le lendemain. Seuls les deux repères naïfs n'apprennent rien : ils recopient un prix passé.",
      m_chaine: "Ce qui se passe chaque jour",
      m_lexique: "Petit lexique",
      m_limites: "Limites, sources et méthode",
      nom_GR: "Données prévisions météo GFS + données gaz",
      nom_CR: "Données prévisions météo GFS + gaz + modèle de prédiction de l'électricité solaire / éolienne",
      nom_GT: "Données prévisions météo GFS + prix rapporté au gaz",
      nom_court: "Dans les tableaux : « {c} »",
      f_GR: ["Ancien modèle principal (22 au 28/10/2026), aujourd'hui dernier secours : il ne dépend que de la météo GFS, de RTE et du gaz, donc il tourne même si les sources européennes sont en panne. Il apprend le lien entre le prix et ce qu'on sait la veille : prévisions météo GFS (soleil, vent, température), consommation prévue par RTE, jour de la semaine et jours fériés, prix des jours passés et prix du gaz.",
             "Algorithme : LightGBM (arbres de décision en série), appris sur toutes les heures depuis 2020, en donnant plus de poids aux années récentes.",
             "Test sur 2026, réentraîné chaque jour : 19,2 €/MWh d'erreur moyenne à l'heure, contre 13,6 pour le modèle Europe et 27,9 pour « même heure la veille »."],
      f_CR: ["Comme le principal, mais le soleil et le vent bruts sont remplacés par la production solaire et éolienne prévue par nos propres modèles de production (appris eux aussi sur GFS).",
             "Idée : le prix dépend de la production renouvelable, autant la prévoir d'abord. En pratique, elle vient de la même météo et n'apporte pas d'information nouvelle.",
             "Test sur 2026 : 18,8 €/MWh, un peu moins bon que le principal (0,3 €/MWh d'écart, significatif)."],
      f_GT: ["Comme le principal, mais le modèle apprend le prix divisé par le coût du gaz pour une centrale (prix du gaz TTF ÷ 0,55), puis le remultiplie. Ainsi, ce qu'il a appris quand le gaz était bon marché reste valable quand il est cher.",
             "Il réagit plus fort au vent : très bon les jours où le prix s'effondre toute la journée, moins bon quand seul l'après-midi s'effondre.",
             "Septembre-octobre 2026, réentraîné chaque jour : 25,6 €/MWh contre 26,7 pour le principal (4 % de mieux ; écart pas encore démontré statistiquement)."],
      f_hier: ["Repère naïf, sans modèle : le prix de demain sera celui d'aujourd'hui au même quart d'heure. Un modèle utile doit faire mieux. Coché par défaut dans l'onglet Performance."],
      f_sem: ["Second repère naïf, sans modèle : le prix de demain sera celui du même jour de la semaine précédente, au même quart d'heure (heure de Paris). Il suit le rythme de la semaine (week-end, jours ouvrés) mais réagit avec une semaine de retard aux changements de météo et de marché. Coché par défaut dans l'onglet Performance."],
      etapes: [
        ["Vers 11 h 30, la veille", "Mise à jour des données : prix des jours passés en France et chez les voisins, consommation et prévision de consommation de RTE, production régionale récente, prix du gaz, échanges aux frontières (JAO), consommation prévue des voisins et avis d'indisponibilité des réacteurs nucléaires (ENTSO-E), prix britannique de demain (Nord Pool, publié vers 11 h)."],
        ["Météo de demain", "Téléchargement du dernier run de minuit du modèle météo GFS (NOAA) : rayonnement, vent à 100 m, température, nuages, pression sur la France."],
        ["Production prévue", "Nos modèles de production sont réappris avec la production réelle de RTE jusqu'à hier, puis transforment la météo en production solaire et éolienne par région. La production affichée utilise le run GFS de 6 h (publié vers 10 h 45), plus récent ; celle qui entre dans les modèles de prix utilise le run de minuit, sur lequel ils ont appris (utilisée par le principal « EUR-moy4 », le secours « EUR-moy2 » et l'ancien « GFS-G-P »)."],
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
        ["Noms courts", "GFS-G = météo GFS + gaz (dernier recours) · GFS-G-P = GFS + gaz + notre prévision de production (P) · GFS-RG = GFS + prix rapporté au gaz (RG = rapport gaz). Le nom complet s'affiche au survol."],
        ["Arbres", "Les modèles additionnent des centaines de petits arbres de décision ; leur nombre est choisi chaque jour automatiquement (on s'arrête quand l'erreur sur l'année précédente ne baisse plus)."],
        ["Écrêtement", "Quand le soleil et le vent produisent plus que ce que le pays consomme et peut exporter, le prix tombe près de 0, voire en dessous."],
        ["Erreur moyenne", "Moyenne des écarts absolus entre prix prévu et prix du marché. Une erreur de 20 €/MWh signifie que la prévision se trompe en moyenne de 20 € par MWh."],
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
        "Ce n'est pas un conseil d'investissement.",
      ],
      o_sources: "Sources",
      plus_details: "Plus de détails : variables, apprentissage, sources",
      d_vars: "Variables d'entrée ({n})",
      d_cible: "Ce que le modèle prévoit",
      d_appr: "Apprentissage",
      d_sources: "Données utilisées",
      d_arbres: "Dernière prévision (pour le {d}) : {a} arbres.",
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
      intro_prod: "Avant de prévoir le prix, nous prévoyons la production solaire et éolienne de chaque région à partir de la même météo GFS. Cette production alimente le modèle principal « Zéphyr » et ses secours (EUR-moy4, EUR-moy2) : ils calculent le surplus de la France (nucléaire disponible + éolien + solaire − consommation) avec notre production prévue plutôt qu'avec le rayonnement et le vent bruts de GFS, plus juste les jours de grand vent, quand les éoliennes plafonnent (erreur 2026 : 13,42 €/MWh avec notre production, 13,60 sans). Les modèles de production sont réappris chaque matin et appliqués au run GFS de 6 h, publié vers 10 h 45 : 6 heures de météo plus récente réduisent l'erreur éolienne (test 2021-2026 : 9,8 % d'erreur journalière contre 10,5 % avec le run de minuit, gain significatif chaque année ; solaire 9,5 % contre 9,6 %). Depuis le 04/11/2026, les modèles de prix utilisent eux aussi la production du run de 6 h. L'historique affiché ici est celui du run de 6 h, prévu chaque jour la veille (rejoué avec des modèles réappris chaque jour avant le 31/10). S'il manque le run de 6 h, le site affiche la production du run de minuit.",
      prod_details: "Détails des deux modèles de production (variables, apprentissage)",
      prod_note: "Nos modèles prévoient la production « potentielle » : ce que produiraient les installations sans écrêtement. Quand le prix devient négatif, une partie des parcs s'arrête volontairement : la production réelle est alors plus basse que la prévision (surtout le solaire en milieu de journée). Production réelle : éCO2mix temps réel de RTE, valeurs provisoires, mises à jour à chaque mise à jour du site (matin et après-midi).",
      rte_note: "La prévision de RTE arrive trop tard : RTE la publie la veille jusqu'à 18 h, alors que l'enchère qui fixe le prix a lieu à 12 h 45. Pour prévoir le prix, nous sommes donc obligés de prévoir nous-mêmes la production solaire et éolienne, vers 11 h 30. Nous sommes légèrement moins bons que RTE, et cela s'explique : son modèle tourne sur des prévisions météo plus récentes (publiées plusieurs heures après le run GFS de la nuit que nous utilisons) et sur la télémesure de ses installations. Notre solaire est en plus une production « potentielle » (avant l'arrêt volontaire des parcs quand le prix est négatif), d'où un biais positif. Les deux prévisions sont comparées sur les mêmes jours, à la production réellement mesurée par RTE.",
      pm_sol_titre: "Modèle de production solaire",
      pm_eol_titre: "Modèle de production éolienne",
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
      intro_sources: "Toutes les données utilisées sont publiques et gratuites. Voici d'où elles viennent, à quoi elles servent et où les retrouver.",
      s_outils: "Outils",
      s_utilise: "Utilisé pour : {u}",
      src: [
        ["voisins", "Prix day-ahead des pays voisins", "Energy-Charts (Fraunhofer ISE), d'après les résultats des bourses européennes", "Prix de la veille en Allemagne-Luxembourg, Belgique, Espagne, Italie (Nord) et Suisse.", [["API Energy-Charts", "https://api.energy-charts.info/"]]],
        ["jao", "Échanges aux frontières (couplage flow-based de la région Core)", "JAO, Joint Allocation Office (Publication Tool)", "Position nette de la France et échanges programmés de la veille, capacités maximales d'échange.", [["JAO Publication Tool", "https://publicationtool.jao.eu/core/"]]],
        ["entsoe", "Consommation prévue des voisins, capacités d'échange, indisponibilités nucléaires", "ENTSO-E, plateforme de transparence (gratuite, avec inscription)", "Prévision de consommation de la veille pour le lendemain des pays voisins, capacités d'échange vers l'Espagne, l'Italie et la Suisse, avis d'indisponibilité des réacteurs français (pour le nucléaire disponible et le surplus).", [["Plateforme de transparence ENTSO-E", "https://transparency.entsoe.eu/"]]],
        ["gb", "Prix day-ahead britannique", "Nord Pool, enchère N2EX (publiée vers 11 h, API publique non officielle) ; historique : Low Carbon Contracts Company", "Prix de chaque heure du jour visé en Grande-Bretagne, connu avant l'enchère française.", [["Nord Pool", "https://data.nordpoolgroup.com/"], ["Low Carbon Contracts Company", "https://www.lowcarboncontracts.uk/"]]],
        ["prix", "Prix day-ahead de l'électricité en France", "Enchère EPEX SPOT ; prix republiés par la Bundesnetzagentur / SMARD.de (licence CC BY 4.0) et récupérés via l'API Energy-Charts (Fraunhofer ISE)", "Prix de chaque heure, puis de chaque quart d'heure depuis octobre 2025, de 2020 à aujourd'hui : ce que les modèles apprennent et prévoient, et le « prix du marché » du site (onglet Prévision, colonne Marché).", [["Résultats officiels EPEX SPOT (France, quarts d'heure)", "https://www.epexspot.com/en/market-results?market_area=FR&auction=MRC&modality=Auction&sub_modality=DayAhead&data_mode=table&product=15"], ["Graphique Energy-Charts (France)", "https://www.energy-charts.info/charts/price_spot_market/chart.htm?l=fr&c=FR"], ["API Energy-Charts (exemple : 23/10/2026)", "https://api.energy-charts.info/price?bzn=FR&start=2026-10-23&end=2026-10-23"], ["SMARD.de", "https://www.smard.de/"]]],
        ["conso", "Consommation et prévision de consommation", "RTE, éCO2mix national (Open Data Réseaux Énergies)", "Consommation réelle et prévision de consommation de RTE pour le lendemain, publiée le matin, au quart d'heure.", [["éCO2mix national temps réel", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/"], ["éCO2mix national consolidé", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-cons-def/"]]],
        ["gfs", "Prévisions météo GFS", "NOAA (États-Unis) ; archive NCAR / UCAR ; copie AWS Open Data", "Run de minuit, échéances de 27 à 48 h (prévision faite la veille pour le lendemain) : rayonnement, vent à 10 et 100 m, température, nuages, pression, sur la France. Archive 2020 → 18/10/2026 pour apprendre, run du jour pour prévoir (les deux sources donnent des valeurs identiques, vérifié).", [["Présentation de GFS (NOAA)", "https://www.ncei.noaa.gov/products/weather-climate-models/global-forecast"], ["Archive NCAR d084001", "https://gdex.ucar.edu/datasets/d084001/"], ["Runs du jour (AWS)", "https://registry.opendata.aws/noaa-gfs-bdp-pds/"]]],
        ["gaz", "Prix du gaz TTF", "Yahoo Finance (contrat TTF=F) ; secours OilPriceAPI", "Clôture quotidienne du gaz naturel néerlandais, la référence européenne, en €/MWh, depuis décembre 2019.", [["TTF sur Yahoo Finance", "https://finance.yahoo.com/quote/TTF%3DF/"], ["OilPriceAPI", "https://www.oilpriceapi.com/"]]],
        ["prod", "Production solaire et éolienne par région", "RTE, éCO2mix régional (Open Data Réseaux Énergies)", "Production réelle de chaque région (consolidée jusqu'au 31/08/2026, temps réel ensuite) : ce qu'apprennent les modèles de production, leur « rendement observé » et la courbe réelle de l'onglet Production.", [["éCO2mix régional temps réel", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-tr/"], ["éCO2mix régional consolidé", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-cons-def/"]]],
        ["capa", "Capacité solaire installée", "SDES (ministère de la Transition écologique), tableau de bord solaire photovoltaïque, édition T2 2026", "Puissance installée par département et par trimestre, recalée sur le total national de RTE : elle pondère la météo de chaque département.", [["Site du SDES", "https://www.statistiques.developpement-durable.gouv.fr/"]]],
        ["registre", "Registre national des installations", "Open Data Réseaux Énergies et data.gouv.fr (au 31/12/2025)", "Emplacement des parcs : chaque département a un point météo placé au centre de gravité de ses installations (94 points solaires, 55 points éoliens).", [["ODRÉ", "https://odre.opendatasoft.com/explore/dataset/registre-national-installation-production-stockage-electricite-agrege-311225/"], ["data.gouv.fr", "https://www.data.gouv.fr/datasets/registre-national-des-installations-de-production-et-de-stockage-delectricite-au-31-12-2025"]]],
      ],
      src_usage: { voisins: "les modèles Europe", jao: "les modèles Europe", entsoe: "les modèles Europe (consommation des voisins, surplus)", gb: "les modèles Europe", prix: "tous les modèles de prix", conso: "tous les modèles de prix", gfs: "les modèles de prix et de production", gaz: "tous les modèles de prix", prod: "les modèles de production", capa: "les modèles de production", registre: "les modèles de production" },
      outils: [["LightGBM (Microsoft) : l'algorithme de tous les modèles", "https://lightgbm.readthedocs.io/"], ["Python : pandas, NumPy, ecCodes pour lire les fichiers GFS", null], ["Chart.js : les graphiques de ce site", "https://www.chartjs.org/"], ["GitHub Pages : l'hébergement du site", null]],
      gt_pourquoi_titre: "Pourquoi rapporter le prix au coût du gaz ?",
      gt_pourquoi: [
        "En France, le prix de l'électricité est souvent fixé par la dernière centrale appelée pour équilibrer l'offre et la demande, et c'est très souvent une centrale à gaz. Son coût de combustible vaut environ prix du gaz ÷ 0,55, car elle transforme 55 % de l'énergie du gaz en électricité.",
        "D'une année à l'autre, le niveau des prix est donc surtout une multiplication par le prix du gaz. Le modèle principal apprend le prix en euros : le gaz n'y est qu'une variable parmi 20, et il doit découvrir seul qu'un jour venteux fait baisser le prix de 30 € quand le gaz est bon marché mais de 80 € quand il est cher, avec peu d'exemples de gaz cher (surtout 2022).",
        "Ce modèle apprend plutôt « combien de fois le coût du gaz » : le prix et les prix passés sont divisés par le coût du gaz, puis la prévision est remultipliée. Exemple : il prévoit 0,8 fois le coût du gaz ; avec un gaz à 90 €/MWh (coût 164 €/MWh), cela donne 0,8 × 164 = 131 €/MWh.",
        "Ce qu'il a appris quand le gaz était bon marché reste ainsi valable quand il est cher : les effets du vent ou du soleil deviennent des pourcentages du prix. Conséquence : il réagit plus fort au vent. Très bon le 23/10/2026, quand le prix s'est effondré toute la journée ; moins bon le 21/10, quand seul l'après-midi s'est effondré.",
      ],
      gt_table: [["Prix du gaz TTF", "Coût de l'électricité d'une centrale à gaz"], ["10 €/MWh (2020)", "18 €/MWh"], ["35 €/MWh (2025)", "64 €/MWh"], ["90 €/MWh (octobre 2026)", "164 €/MWh"]],
      nom_EMT: "Moitié moyenne Europe (EM), moitié Zéphyr (tout ce qui est connu avant l'enchère)",
      nom_EMT0: "Secours d'été : moitié EP, moitié Zéphyr sans le run de 6 h",
      nom_TOUT: "Zéphyr : Europe + météo GFS des voisins, run de 6 h, CO2, mix de J-2",
      nom_TOUT0: "Secours d'été : Zéphyr sans le run de 6 h",
      f_TOUT0: ["Secours d'été : en heure d'été, le run de 6 h n'est publié que vers 11 h 45. Le service publie alors Zéphyr sans les trois variables du run de 6 h (99 variables, 159 arbres).",
                "Même modèle que le principal, sans attendre le run de 6 h.",
                "Coût mesuré sur 2024 : environ 0,06 €/MWh d'erreur en plus (non significatif). Utilisé seulement quand le run de 6 h manque."],
      f_EMT: ["Modèle suivi : la moyenne, à parts égales, de EM (moyenne des quatre variantes Europe) et de Zéphyr. Zéphyr reprend le modèle Europe et lui ajoute tout ce qui est connu avant l'enchère : la météo GFS des pays voisins (vent, soleil, température en Espagne, Italie, Suisse, Grande-Bretagne, Allemagne, Belgique, Pays-Bas), le run de 6 h, le CO2, le mix de J-2, les capacités d'échange et le nucléaire indisponible.",
              "Sur 665 jours × 24 h = 15 960 heures (2025-2026), même erreur moyenne que Zéphyr seul (11,41 contre 11,39 €/MWh) et moins de jours nettement pires que EM ; Zéphyr, plus simple et meilleur en septembre-octobre 2026, a été préféré comme principal.",
              "Tests réappris chaque jour : 2025 (365 jours × 24 h = 8 760 heures) 10,17 €/MWh contre 10,56 pour EM (gain 0,39 [0,29 ; 0,49], mieux 66 % des jours) ; 2026 (299 jours × 24 h = 7 176 heures) 12,82 contre 13,19 (gain 0,37 [0,19 ; 0,54], mieux 63 % des jours)."],
      f_EMT0: ["Secours d'été : en heure d'été, le run de 6 h n'est publié que vers 11 h 45. Le service publie alors la moyenne de EP (qui n'utilise pas ce run) et de Zéphyr sans le run de 6 h.",
               "Même principe que le modèle principal, avec les variantes qui n'attendent pas le run de 6 h.",
               "Utilisé seulement quand le run de 6 h manque."],
      f_TOUT: ["Le modèle principal depuis le 03/11/2026 : le modèle Europe complet (prix des voisins, échanges, consommation des voisins, prix britannique, capacités d'échange, nucléaire indisponible, surplus) avec en plus la météo GFS des voisins, la météo du run de 6 h, le CO2 et le mix de J-2 : 102 variables au total.",
               "La météo des voisins est découpée dans les mêmes fichiers GFS de NOAA que la météo française (run de 0 h de la veille), puis convertie en GW avec la prévision ENTSO-E des 90 jours précédents.",
               "Tests réappris chaque jour : 2025 (365 jours × 24 h = 8 760 heures) 10,12 €/MWh contre 10,56 pour EM (gain 0,43 [0,25 ; 0,61], mieux 60 % des jours) ; 2026 (299 jours × 24 h = 7 176 heures) 12,87 contre 13,19 (gain 0,32 [0,00 ; 0,65]). Si ses données manquent, le service retombe sur EM."],
      v_tout: ["Ajouts de Zéphyr (35)", ["surplus calculé avec notre production (3)", "météo nationale du run de 6 h (3)", "CO2 et mix de J-2 : nucléaire, hydraulique, gaz, échanges (6)", "météo GFS des voisins : vent, soleil, température et charge résiduelle en Espagne, Italie, Suisse, Grande-Bretagne, Allemagne, Belgique, Pays-Bas (23)"]],
      nom_EM: "Moyenne de 4 modèles Europe (EU, P, Q, F : surplus avec notre production, météo du run de 6 h)",
      nom_EP: "Moyenne de 2 modèles Europe (EU + surplus avec notre production)",
      nom_EU: "Modèle Europe : prévisions GFS + gaz + marchés voisins + prix britannique + surplus d'électricité",
      nom_EUC: "Modèle Europe complet : Europe + capacités d'échange du jour + nucléaire indisponible",
      nom_GB: "Prévisions GFS + gaz + prix des voisins de la veille + prix britannique",
      f_EM: ["Modèle principal du 30/10 au 02/11/2026, aujourd'hui secours n°1 : la moyenne de quatre variantes du modèle Europe. EU : le modèle Europe d'origine. P : EU dont le « surplus » est calculé avec NOTRE prévision de production solaire et éolienne au lieu des indicateurs météo bruts. Q : EU avec les deux surplus. F : EU avec la météo du run GFS de 6 h UTC (publié vers 10 h 45), plus récent de 6 h que le run de 0 h.",
             "Pourquoi une moyenne : les quatre variantes se trompent un peu différemment, et la moyenne efface une partie de ces erreurs. Il n'y a pas de modèle plus malin, juste moins de bruit.",
             "Test sur 2026 (301 jours × 24 h = 7 224 heures, réappris chaque jour) : 13,29 €/MWh d'erreur moyenne à l'heure contre 13,60 pour EU seul (gain 0,30 [0,18 ; 0,43], mieux 63 % des jours). Sur les 48 jours d'OpenWindCast (1 152 heures) : 17,3 contre 17,6. Si le run de 6 h manque, le service publie EP."],
      f_EP: ["Premier secours : la moyenne de deux variantes, EU et P (surplus calculé avec notre production prévue). Il ne dépend pas du run de 6 h, donc il prend la main si ce run n'est pas encore publié.",
             "Test sur 2026 : 13,35 €/MWh contre 13,60 pour EU (gain 0,25 [0,11 ; 0,40], mieux 60 % des jours)."],
      f_EU: ["Modèle principal du 29/10/2026, aujourd'hui secours n°2 et composante des moyennes EM et EP. Il part de « GFS + gaz » (météo GFS, consommation RTE, calendrier, prix passés, gaz) et regarde aussi chez les voisins : leurs prix de la veille (Allemagne, Belgique, Espagne, Italie, Suisse), les échanges aux frontières (JAO), leur consommation prévue (ENTSO-E) et le prix britannique du jour visé, fixé vers 11 h par une enchère qui a lieu avant la nôtre.",
             "Variable clé : le « surplus » = nucléaire disponible (avis d'indisponibilité connus la veille à 11 h) + vent + soleil prévus − consommation prévue. Quand il est grand, la France doit exporter beaucoup et le prix s'effondre. Comme GFS-RG, le prix est appris rapporté au coût du gaz.",
             "Test sur 2026 (301 jours × 24 h = 7 224 heures, réappris chaque jour) : 13,6 €/MWh d'erreur moyenne à l'heure, contre 19,2 pour « GFS + gaz » et 27,9 pour la veille. Sur les 48 jours où OpenWindCast publie ses erreurs (1 152 heures) : 17,8 contre 17,6 (égalité, écart non significatif)."],
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
      an_intro: "Une trentaine de modèles ont été construits et testés avant Zéphyr. Les anciens modèles du site tournent toujours chaque jour, pour comparaison, et sont réappris chaque matin comme Zéphyr. Chaque ligne du tableau ajoute une idée au modèle précédent ; l'erreur est toujours mesurée de la même façon : sur 2026, heure par heure, avec un modèle réappris chaque jour uniquement avec les données publiées avant l'enchère.",
      an_frise_titre: "Les modèles principaux successifs (erreur moyenne par heure sur 2026, €/MWh)",
      an_frise: [["16/10", "Repère « veille »", "27,9", "prix d'aujourd'hui à la même heure, aucun calcul"],
                 ["19/10", "Premier modèle", "20,8", "prix passés, météo, consommation, calendrier"],
                 ["20/10", "GFS", "20,6", "prix passés, météo prévue GFS, consommation prévue RTE, calendrier"],
                 ["22/10", "GFS-G", "19,1", "GFS + prix du gaz"],
                 ["29/10", "EUR", "13,6", "GFS-G + prix de la veille des voisins (Allemagne, Belgique, Espagne, Italie, Suisse), échanges aux frontières, consommation prévue des voisins, prix britannique de demain, nucléaire disponible, surplus"],
                 ["30/10", "EUR-moy4", "13,29", "moyenne de EUR et de 3 variantes : 2 avec notre production prévue, 1 avec la météo GFS de 6 h"],
                 ["03/11", "Zéphyr", "12,87", "EUR + notre production prévue (météo de 6 h) et le surplus qu'elle donne, échanges prévus et capacités aux frontières pour demain, nucléaire indisponible, CO₂, mix électrique d'avant-hier, météo des 8 voisins : 102 variables"]],
      an_legende: "★ en couleur : les modèles devenus le modèle principal. Les autres lignes sont des essais : gardés comme secours, ou écartés.",
      an_parcours: "Le chemin parcouru (erreur moyenne par heure sur 2026, €/MWh)",
      an_cols: ["Date", "Modèle", "Ce que fait ce modèle", "Erreur 2026", "Verdict"],
      an_lignes: [
        ["16/10", "Repère « veille »", "Prix de demain = prix d'aujourd'hui à la même heure. Aucun calcul.", "27,9", "point de départ : à battre", "repere"],
        ["16-21/10", "22 premières recettes", "Premiers modèles d'IA (LightGBM) : prix passés, météo, consommation, plus selon la recette gaz, CO₂, nucléaire ou production prévue.", "19,7 à 26,8*", "le gaz et le réapprentissage aident ; CO₂ et nucléaire : rien"],
        ["19/10", "Premier modèle", "Prix passés (veille, semaine d'avant, moyenne 7 jours) + soleil, vent et température prévus + consommation prévue + calendrier ; appris sur la météo observée.", "20,8***", "★ premier modèle principal (19 → 20/10)", "principal"],
        ["20/10", "GFS", "Les mêmes ingrédients, mais la météo vient uniquement des prévisions GFS, à l'apprentissage comme le jour de la prévision.", "20,6***", "★ devient le modèle principal (20 → 22/10) : même précision, plus cohérent", "principal"],
        ["22/10", "GFS-G", "GFS + prix du gaz (TTF), réappris chaque jour.", "19,1", "★ devient le modèle principal (22 → 28/10)", "principal"],
        ["22/10", "GFS-G-P", "Comme GFS-G, mais le soleil et le vent bruts sont remplacés par notre production solaire et éolienne prévue.", "18,8**", "pas mieux que la météo seule"],
        ["23/10", "GFS-RG", "Comme GFS-G, mais prévoit le prix divisé par le coût du gaz, puis le remultiplie : suit mieux les hausses du gaz.", "18,5", "un peu mieux"],
        ["27/10", "+ voisins", "GFS-RG + prix de la veille en Allemagne, Belgique, Espagne, Italie, Suisse et échanges aux frontières (JAO).", "18,1", "un peu mieux"],
        ["27/10", "+ prévisions ENTSO-E", "+ prévisions officielles de vent et de soleil des voisins.", "16,7", "écarté : publiées après l'enchère"],
        ["28/10", "+ Grande-Bretagne", "+ prix britannique de demain, fixé vers 11 h, avant l'enchère française.", "15,4", "gros gain → secours n°2"],
        ["28/10", "+ consommation des voisins", "+ consommation prévue des voisins et capacités d'échange aux frontières pour demain.", "15,1", "un peu mieux"],
        ["28/10", "+ nucléaire et surplus", "+ nucléaire disponible demain et « surplus » = nucléaire + vent + soleil − consommation.", "13,7", "gros gain → secours n°1"],
        ["28/10", "+ météo Allemagne / Benelux", "+ vent et soleil prévus en Allemagne et au Benelux.", "≈ 13,7", "aucun gain : abandonnée"],
        ["28/10", "Élagage fort", "Le même modèle réduit à 29 variables.", "14,5", "pire : abandonné"],
        ["28/10", "EUR", "Le même modèle réduit à 54 variables (données du jour inutiles retirées).", "13,6", "★ aussi bon et plus simple : devient le modèle principal (29/10)", "principal"],
        ["29/10", "Spécialiste des effondrements", "Un second modèle dédié aux heures sous 10 €, mélangé à EUR.", "≈ 13,6", "aucun gain : abandonné"],
        ["29/10", "Variante 1 (P)", "EUR, avec un surplus calculé à partir de notre production prévue.", "13,4", "un peu mieux"],
        ["29/10", "Variante 2 (Q)", "EUR + ce surplus ajouté comme variable.", "13,4", "un peu mieux"],
        ["29/10", "Variante 3 (F)", "EUR avec la météo GFS de 6 h, plus récente (publiée vers 10 h 45).", "13,5", "un peu mieux"],
        ["29/10", "EUR-moy2", "Moyenne des prix prévus par EUR et la variante 1.", "13,35", "secours n°1"],
        ["29/10", "EUR-moy4", "Moyenne de EUR et des 3 variantes : leurs erreurs se compensent en partie.", "13,29", "★ le meilleur : devient le modèle principal (30/10 → 02/11), puis secours", "principal"],
        ["29/10", "EUR-moy4 allégé", "EUR-moy4 avec 45 variables au lieu de 54.", "13,37", "pas mieux : non retenu"],
        ["30/10", "Production de 6 h", "Production solaire et éolienne prévue avec la météo de 6 h au lieu de celle de minuit.", "≈ 13,2", "production plus juste ; prix presque inchangé"],
        ["31/10", "Surplus non exportable", "+ surplus moins ce qui peut partir à l'export.", "13,60", "aucun gain : abandonné"],
        ["01/11", "+ météo sud et ouest", "+ vent, soleil et température prévus en Espagne, Italie, Suisse et Grande-Bretagne.", "≈ 13,6", "aucun gain seule : mise de côté"],
        ["01/11", "Zéphyr", "EUR + toutes les données écartées une par une : capacités, nucléaire, notre surplus, météo de 6 h, CO₂, mix d'avant-hier, météo des 8 voisins (102 variables).", "12,87", "inutiles une par une, utiles réunies : gros gain"],
        ["02/11", "Zéphyr sur 2025", "Le même test refait sur 2025 (365 jours × 24 h = 8 760 heures).", "10,1 en 2025 (EUR-moy4 10,6)", "gain confirmé"],
        ["02/11", "EUR+Zéphyr", "Moyenne des prix prévus par EUR-moy4 et Zéphyr.", "12,82", "égal à Zéphyr : suivi"],
        ["02/11", "Zéphyr élagué", "Zéphyr avec 84 variables au lieu de 102 (choix fait sur 2024, règle fixée avant le calcul).", "12,78 (2025 : 10,37)", "pire sur 2025 : abandonné"],
        ["02/11", "Zéphyr (version finale)", "+ notre production prévue avec la météo de 6 h.", "12,87", "★ devient le modèle principal (depuis le 03/11)", "principal"],
      ],
      an_notes: "Test : du 01/01 au 28/10/2026, soit 300 jours × 24 h = 7 200 heures prévues une à une (301 jours = 7 224 heures pour les lignes du 29/10 ; 299 jours = 7 176 heures pour Zéphyr et ses variantes). * modèles réappris chaque mois. ** autre série de test : 291 jours = 6 984 heures. *** appris jusqu'au 31/12/2025 sans réapprentissage, test du 01/01 au 18/10/2026 : 290 jours × 24 h = 6 960 heures.",
      an_perf: "Tous les modèles sur l'historique du site (erreur à l'heure, comme les autres prévisions publiées ; jours où le prix du marché est connu)",
      an_fiches: "Les anciens modèles, toujours calculés chaque jour",
    },
    en: {
      o_modeles: "The models",
      o_apropos: "About",
      o_anciens: "Past models",
      m_qui: "The models in service and the benchmarks",
      m_tous_matin: "All models, for prices as well as production, are retrained every morning with all the data known up to the day before, just before forecasting the next day. Only the two naive benchmarks learn nothing: they copy a past price.",
      m_chaine: "What happens every day",
      m_lexique: "Glossary",
      m_limites: "Limitations, sources and method",
      nom_GR: "GFS weather forecast data + gas data",
      nom_CR: "GFS weather forecast data + gas + solar / wind power prediction model",
      nom_GT: "GFS weather forecast data + gas-relative price",
      nom_court: "In tables: \"{c}\"",
      f_GR: ["Former main model (22 to 28/10/2026), now the last fallback: it only needs GFS weather, RTE and gas, so it runs even when the European sources are down. It learns the link between the price and what is known the day before: GFS weather forecasts (sun, wind, temperature), RTE load forecast, weekday and holidays, past prices and the gas price.",
             "Algorithm: LightGBM (boosted decision trees), trained on every hour since 2020, with more weight on recent years.",
             "2026 test, retrained daily: 19.2 €/MWh mean hourly error, versus 13.6 for the Europe model and 27.9 for \"same hour the day before\"."],
      f_CR: ["Like the main model, but raw sun and wind are replaced by the solar and wind output forecast by our own production models (also trained on GFS).",
             "Idea: the price depends on renewable output, so forecast it first. In practice it comes from the same weather and adds no new information.",
             "2026 test: 18.8 €/MWh, slightly worse than the main model (0.3 €/MWh, significant)."],
      f_GT: ["Like the main model, but it learns the price divided by the fuel cost of a gas plant (TTF gas price ÷ 0.55), then multiplies back. What it learned when gas was cheap thus still applies when gas is expensive.",
             "It reacts more strongly to wind: very good when the price collapses all day long, worse when only the afternoon collapses.",
             "September-October 2026, retrained daily: 25.6 €/MWh versus 26.7 for the main model (4% better; gap not yet statistically proven)."],
      f_hier: ["Naive benchmark, no model: tomorrow's price equals today's at the same quarter-hour. A useful model must beat it. Ticked by default in the Performance tab."],
      f_sem: ["Second naive benchmark, no model: tomorrow's price equals the price of the same weekday one week earlier, at the same quarter-hour (Paris time). It follows the weekly rhythm (weekends, working days) but reacts one week late to changes in weather and market. Ticked by default in the Performance tab."],
      etapes: [
        ["Around 11:30, the day before", "Data update: past prices in France and next door, RTE load and load forecast, recent regional output, gas price, cross-border flows (JAO), neighbours' load forecasts and nuclear outage notices (ENTSO-E), tomorrow's British price (Nord Pool, published around 11:00)."],
        ["Tomorrow's weather", "Download of the latest midnight run of the GFS weather model (NOAA): radiation, 100 m wind, temperature, clouds, pressure over France."],
        ["Forecast output", "Our production models are retrained with RTE actual output up to yesterday, then turn the weather into solar and wind output per region. The output shown uses the 06:00 UTC GFS run (published around 10:45), more recent; the one fed to the price models uses the midnight run they were trained on (used by the main model \"EUR-moy4\", the fallback \"EUR-moy2\" and the past model \"GFS-G-P\")."],
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
        ["Short names", "GFS-G = GFS weather + gas (last resort) · GFS-G-P = GFS + gas + our production forecast (P) · GFS-RG = GFS + gas-relative price (RG = gas ratio). The full name appears on hover."],
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
        "This is not investment advice.",
      ],
      o_sources: "Sources",
      plus_details: "More details: variables, training, sources",
      d_vars: "Input variables ({n})",
      d_cible: "What the model forecasts",
      d_appr: "Training",
      d_sources: "Data used",
      d_arbres: "Latest forecast (for {d}): {a} trees.",
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
      intro_prod: "Before forecasting the price, we forecast each region's solar and wind output from the same GFS weather. This output feeds the main model « Zéphyr » and its fallbacks (EUR-moy4, EUR-moy2): they compute France's surplus (available nuclear + wind + solar − load) with our production forecast instead of raw GFS radiation and wind, which is more accurate on very windy days, when wind farms cap out (2026 error: €13.42/MWh with our production, 13.60 without). The production models are retrained every morning and applied to the 06Z GFS run, out around 10:45: 6 more hours of weather cut the wind error (2021-2026 test: 9.8% daily error against 10.5% with the midnight run, significant every year; solar 9.5% against 9.6%). Since 04/11/2026 the price models also use the 06Z production. The history shown here is the 06Z run, forecast each day the day before (replayed with models retrained daily before 31/10). If the 06Z run is missing, the site shows the midnight run.",
      prod_details: "Details of the two production models (variables, training)",
      prod_note: "Our models forecast \"potential\" output: what installations would produce without curtailment. When the price turns negative, some plants stop on purpose, so actual output is lower than forecast (mostly solar around midday). Actual output: RTE éCO2mix real-time data, provisional values, refreshed at every site update (morning and afternoon).",
      rte_note: "RTE's forecast comes too late: RTE publishes it up to 18:00 the day before, while the auction that sets the price closes at 12:45. To forecast the price, we therefore have to forecast solar and wind output ourselves, around 11:30. We are slightly less accurate than RTE, and this is expected: its model runs on more recent weather forecasts (published several hours after the overnight GFS run we use) and on live telemetry from its plants. Our solar is also a \"potential\" output (before plants deliberately stop when the price is negative), hence a positive bias. Both forecasts are compared on the same days, against the output actually measured by RTE.",
      pm_sol_titre: "Solar production model",
      pm_eol_titre: "Wind production model",
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
      intro_sources: "All the data used is public and free. Here is where it comes from, what it is used for and where to find it.",
      s_outils: "Tools",
      s_utilise: "Used for: {u}",
      src: [
        ["voisins", "Day-ahead prices of neighbouring countries", "Energy-Charts (Fraunhofer ISE), from European power exchange results", "Prices of the day before in Germany-Luxembourg, Belgium, Spain, Italy (North) and Switzerland.", [["Energy-Charts API", "https://api.energy-charts.info/"]]],
        ["jao", "Cross-border flows (Core flow-based coupling)", "JAO, Joint Allocation Office (Publication Tool)", "France's net position and scheduled exchanges of the day before, maximum exchanges.", [["JAO Publication Tool", "https://publicationtool.jao.eu/core/"]]],
        ["entsoe", "Neighbours' load forecasts, transfer capacities, nuclear outages", "ENTSO-E Transparency Platform (free, registration required)", "Day-ahead load forecasts of neighbouring countries, transfer capacities to Spain, Italy and Switzerland, outage notices of French reactors (for available nuclear capacity and the surplus).", [["ENTSO-E Transparency Platform", "https://transparency.entsoe.eu/"]]],
        ["gb", "British day-ahead price", "Nord Pool, N2EX auction (published around 11:00, public but unofficial API); history: Low Carbon Contracts Company", "Price of each hour of the target day in Great Britain, known before the French auction.", [["Nord Pool", "https://data.nordpoolgroup.com/"], ["Low Carbon Contracts Company", "https://www.lowcarboncontracts.uk/"]]],
        ["prix", "French day-ahead electricity price", "EPEX SPOT auction; prices republished by Bundesnetzagentur / SMARD.de (CC BY 4.0 licence) and fetched through the Energy-Charts API (Fraunhofer ISE)", "Price of each hour, then of each quarter-hour since October 2025, from 2020 to today: what the models learn and forecast, and the site's \"market price\" (Forecast tab, Market column).", [["Official EPEX SPOT results (France, quarter-hours)", "https://www.epexspot.com/en/market-results?market_area=FR&auction=MRC&modality=Auction&sub_modality=DayAhead&data_mode=table&product=15"], ["Energy-Charts chart (France)", "https://www.energy-charts.info/charts/price_spot_market/chart.htm?l=fr&c=FR"], ["Energy-Charts API (example: 23/10/2026)", "https://api.energy-charts.info/price?bzn=FR&start=2026-10-23&end=2026-10-23"], ["SMARD.de", "https://www.smard.de/"]]],
        ["conso", "Load and load forecast", "RTE, national éCO2mix (Open Data Réseaux Énergies)", "Actual load and RTE's next-day load forecast, published in the morning, per quarter-hour.", [["National éCO2mix real time", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/"], ["National éCO2mix consolidated", "https://odre.opendatasoft.com/explore/dataset/eco2mix-national-cons-def/"]]],
        ["gfs", "GFS weather forecasts", "NOAA (United States); NCAR / UCAR archive; AWS Open Data copy", "Midnight run, lead times of 27 to 48 h (forecast made the day before for the next day): radiation, 10 and 100 m wind, temperature, clouds, pressure over France. Archive 2020 → 18/10/2026 for training, today's run for forecasting (both sources give identical values, checked).", [["About GFS (NOAA)", "https://www.ncei.noaa.gov/products/weather-climate-models/global-forecast"], ["NCAR archive d084001", "https://gdex.ucar.edu/datasets/d084001/"], ["Today's runs (AWS)", "https://registry.opendata.aws/noaa-gfs-bdp-pds/"]]],
        ["gaz", "TTF gas price", "Yahoo Finance (TTF=F contract); OilPriceAPI as backup", "Daily close of Dutch natural gas, the European benchmark, €/MWh, since December 2019.", [["TTF on Yahoo Finance", "https://finance.yahoo.com/quote/TTF%3DF/"], ["OilPriceAPI", "https://www.oilpriceapi.com/"]]],
        ["prod", "Solar and wind output by region", "RTE, regional éCO2mix (Open Data Réseaux Énergies)", "Actual output of each region (consolidated up to 31/08/2026, real time after): what the production models learn, their \"observed yield\" and the actual curve in the Production tab.", [["Regional éCO2mix real time", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-tr/"], ["Regional éCO2mix consolidated", "https://odre.opendatasoft.com/explore/dataset/eco2mix-regional-cons-def/"]]],
        ["capa", "Installed solar capacity", "SDES (French Ministry for the Ecological Transition), solar PV dashboard, Q2 2026 edition", "Installed capacity per department and quarter, aligned with RTE's national total: it weights each department's weather.", [["SDES website", "https://www.statistiques.developpement-durable.gouv.fr/"]]],
        ["registre", "National installation register", "Open Data Réseaux Énergies and data.gouv.fr (as of 31/12/2025)", "Location of the plants: each department has a weather point at the centre of gravity of its installations (94 solar points, 55 wind points).", [["ODRÉ", "https://odre.opendatasoft.com/explore/dataset/registre-national-installation-production-stockage-electricite-agrege-311225/"], ["data.gouv.fr", "https://www.data.gouv.fr/datasets/registre-national-des-installations-de-production-et-de-stockage-delectricite-au-31-12-2025"]]],
      ],
      src_usage: { voisins: "the Europe models", jao: "the Europe models", entsoe: "the Europe models (neighbours' load, surplus)", gb: "the Europe models", prix: "all price models", conso: "all price models", gfs: "the price and production models", gaz: "all price models", prod: "the production models", capa: "the production models", registre: "the production models" },
      outils: [["LightGBM (Microsoft): the algorithm of every model", "https://lightgbm.readthedocs.io/"], ["Python: pandas, NumPy, ecCodes to read GFS files", null], ["Chart.js: this site's charts", "https://www.chartjs.org/"], ["GitHub Pages: site hosting", null]],
      gt_pourquoi_titre: "Why divide the price by the gas cost?",
      gt_pourquoi: [
        "In France, the electricity price is often set by the last plant called to balance supply and demand, very often a gas plant. Its fuel cost is about gas price ÷ 0.55, because it turns 55% of the gas energy into electricity.",
        "From one year to the next, the price level is therefore mostly a multiplication by the gas price. The main model learns the price in euros: gas is just one variable out of 20, and it must find out by itself that a windy day lowers the price by 30 € when gas is cheap but by 80 € when it is expensive, with few examples of expensive gas (mostly 2022).",
        "This model instead learns \"how many times the gas cost\": the price and past prices are divided by the gas cost, then the forecast is multiplied back. Example: it forecasts 0.8 times the gas cost; with gas at 90 €/MWh (cost 164 €/MWh), that gives 0.8 × 164 = 131 €/MWh.",
        "What it learned when gas was cheap thus still applies when gas is expensive: the effects of wind or sun become percentages of the price. As a result it reacts more strongly to wind. Very good on 23/10/2026, when the price collapsed all day; worse on 21/10, when only the afternoon collapsed.",
      ],
      gt_table: [["TTF gas price", "Electricity cost of a gas plant"], ["10 €/MWh (2020)", "18 €/MWh"], ["35 €/MWh (2025)", "64 €/MWh"], ["90 €/MWh (October 2026)", "164 €/MWh"]],
      nom_EMT: "Half Europe average (EM), half Zéphyr (everything known before the auction)",
      nom_EMT0: "Summer fallback: half EP, half Zéphyr without the 6 h run",
      nom_TOUT: "Zéphyr: Europe + neighbours' GFS weather, 6 h run, CO2, D-2 mix",
      nom_TOUT0: "Summer fallback: Zéphyr without the 6 h run",
      f_TOUT0: ["Summer fallback: in summer time, the 6 h run is only published around 11:45. The service then publishes Zéphyr without the three 6 h run variables (99 variables, 159 trees).",
                "Same model as the main one, without waiting for the 6 h run.",
                "Cost measured on 2024: about 0.06 €/MWh of extra error (not significant). Used only when the 6 h run is missing."],
      f_EMT: ["Tracked model: an equal-weight average of EM (average of the four Europe variants) and Zéphyr. Zéphyr takes the Europe model and adds everything known before the auction: the neighbours' GFS weather (wind, sun, temperature in Spain, Italy, Switzerland, Great Britain, Germany, Belgium, the Netherlands), the 6 h run, CO2, the D-2 mix, cross-border capacities and unavailable nuclear.",
              "Over 665 days × 24 h = 15,960 hours (2025-2026), same mean error as Zéphyr alone (11.41 against 11.39 €/MWh) and fewer days clearly worse than EM; Zéphyr, simpler and better in September-October 2026, was preferred as the main model.",
              "Tests retrained every day: 2025 (365 days × 24 h = 8,760 hours) 10.17 €/MWh against 10.56 for EM (gain 0.39 [0.29; 0.49], better on 66% of days); 2026 (299 days × 24 h = 7,176 hours) 12.82 against 13.19 (gain 0.37 [0.19; 0.54], better on 63% of days)."],
      f_EMT0: ["Summer fallback: in summer time, the 6 h run is only published around 11:45. The service then publishes the average of EP (which does not use that run) and Zéphyr without the 6 h run.",
               "Same idea as the main model, with the variants that do not wait for the 6 h run.",
               "Used only when the 6 h run is missing."],
      f_TOUT: ["The main model since 03/11/2026: the full Europe model (neighbours' prices, flows, neighbours' load, British price, cross-border capacities, unavailable nuclear, surplus) plus the neighbours' GFS weather, the 6 h run weather, CO2 and the D-2 mix: 102 variables in all.",
               "The neighbours' weather is cut from the same NOAA GFS files as the French weather (00 h run of the day before), then converted into GW with the ENTSO-E forecast of the previous 90 days.",
               "Tests retrained every day: 2025 (365 days × 24 h = 8,760 hours) 10.12 €/MWh against 10.56 for EM (gain 0.43 [0.25; 0.61], better on 60% of days); 2026 (299 days × 24 h = 7,176 hours) 12.87 against 13.19 (gain 0.32 [0.00; 0.65]). If its data is missing, the service falls back on EM."],
      v_tout: ["Zéphyr additions (35)", ["surplus computed with our production (3)", "national weather of the 6 h run (3)", "CO2 and D-2 mix: nuclear, hydro, gas, flows (6)", "neighbours' GFS weather: wind, sun, temperature and residual load in Spain, Italy, Switzerland, Great Britain, Germany, Belgium, the Netherlands (23)"]],
      nom_EM: "Average of 4 Europe models (EU, P, Q, F: surplus from our production forecast, 6 h GFS run)",
      nom_EP: "Average of 2 Europe models (EU + surplus from our production forecast)",
      nom_EU: "Europe model: GFS forecasts + gas + neighbouring markets + British price + power surplus",
      nom_EUC: "Full Europe model: Europe + transfer capacities of the day + unavailable nuclear",
      nom_GB: "GFS forecasts + gas + neighbours' prices of the day before + British price",
      f_EM: ["Main model from 30/10 to 02/11/2026, now fallback 1: the average of four variants of the Europe model. EU: the original Europe model. P: EU whose \"surplus\" is computed with OUR solar and wind production forecast instead of raw weather indicators. Q: EU with both surpluses. F: EU with the weather of the 06 UTC GFS run (published around 10:45), six hours fresher than the 00 UTC run.",
             "Why an average: the four variants err a little differently, and averaging cancels part of those errors. No smarter model, just less noise.",
             "2026 test (301 days × 24 h = 7,224 hours, retrained daily): 13.29 €/MWh mean hourly error versus 13.60 for EU alone (gain 0.30 [0.18; 0.43], better on 63% of days). On the 48 OpenWindCast days: 17.3 versus 17.6. If the 6 h run is missing, the service publishes EP."],
      f_EP: ["First fallback: the average of two variants, EU and P (surplus computed with our production forecast). It does not depend on the 6 h run, so it takes over when that run is not yet published.",
             "2026 test: 13.35 €/MWh versus 13.60 for EU (gain 0.25 [0.11; 0.40], better on 60% of days)."],
      f_EU: ["Main model from 29/10/2026, now fallback 2 and a component of the EM and EP averages. It starts from \"GFS + gas\" (GFS weather, RTE load, calendar, past prices, gas) and also looks next door: neighbours' prices of the day before (Germany, Belgium, Spain, Italy, Switzerland), cross-border flows (JAO), their load forecasts (ENTSO-E) and the British price of the target day, set around 11:00 by an auction held before ours.",
             "Key variable: the \"surplus\" = available nuclear (outage notices known at 11:00 the day before) + forecast wind + sun − forecast load. When it is large, France must export a lot and the price collapses. Like GFS-RG, the price is learnt relative to the cost of gas.",
             "2026 test (301 days × 24 h = 7,224 hours, retrained daily): 13.6 €/MWh mean hourly error, versus 19.2 for \"GFS + gas\" and 27.9 for the day before. On the 48 days (1,152 hours) for which OpenWindCast publishes its errors: 17.8 versus 17.6 (a tie, not significant)."],
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
      an_intro: "About thirty models were built and tested before Zéphyr. The site's past models still run every day, for comparison, and are retrained every morning like Zéphyr. Each row of the table adds one idea to the previous model; the error is always measured the same way: over 2026, hour by hour, with a model retrained every day using only data published before the auction.",
      an_frise_titre: "The successive main models (mean error per hour over 2026, €/MWh)",
      an_frise: [["16/10", "\"Day before\" benchmark", "27.9", "today's price at the same hour, no computation"],
                 ["19/10", "First model", "20.8", "past prices, weather, load, calendar"],
                 ["20/10", "GFS", "20.6", "past prices, GFS weather forecast, RTE load forecast, calendar"],
                 ["22/10", "GFS-G", "19.1", "GFS + gas price"],
                 ["29/10", "EUR", "13.6", "GFS-G + neighbours' previous-day prices (Germany, Belgium, Spain, Italy, Switzerland), cross-border flows, neighbours' load forecast, tomorrow's British price, available nuclear, surplus"],
                 ["30/10", "EUR-moy4", "13.29", "average of EUR and 3 variants: 2 with our production forecast, 1 with the 06:00 GFS weather"],
                 ["03/11", "Zéphyr", "12.87", "EUR + our production forecast (06:00 weather) and the surplus it gives, tomorrow's scheduled flows and cross-border capacities, unavailable nuclear, CO₂, power mix of two days before, weather of the 8 neighbours: 102 variables"]],
      an_legende: "★ highlighted: the models that became the main model. The other rows are trials: kept as fallbacks, or dropped.",
      an_parcours: "How we got here (mean error per hour over 2026, €/MWh)",
      an_cols: ["Date", "Model", "What this model does", "2026 error", "Verdict"],
      an_lignes: [
        ["16/10", "\"Day before\" benchmark", "Tomorrow's price = today's price at the same hour. No computation.", "27.9", "starting point: to beat", "repere"],
        ["16-21/10", "First 22 recipes", "First AI models (LightGBM): past prices, weather, load, plus, depending on the recipe, gas, CO₂, nuclear or forecast production.", "19.7 to 26.8*", "gas and retraining help; CO₂ and nuclear: nothing"],
        ["19/10", "First model", "Past prices (day before, week before, 7-day average) + forecast sun, wind and temperature + load forecast + calendar; trained on observed weather.", "20.8***", "★ first main model (19 → 20/10)", "principal"],
        ["20/10", "GFS", "The same ingredients, but the weather comes only from GFS forecasts, in training as on forecast day.", "20.6***", "★ becomes the main model (20 → 22/10): same accuracy, more consistent", "principal"],
        ["22/10", "GFS-G", "GFS + gas price (TTF), retrained daily.", "19.1", "★ becomes the main model (22 → 28/10)", "principal"],
        ["22/10", "GFS-G-P", "Like GFS-G, but raw sun and wind are replaced by our solar and wind production forecast.", "18.8**", "no better than weather alone"],
        ["23/10", "GFS-RG", "Like GFS-G, but forecasts the price divided by the gas cost, then multiplies back: follows gas rises better.", "18.5", "slightly better"],
        ["27/10", "+ neighbours", "GFS-RG + previous-day prices in Germany, Belgium, Spain, Italy, Switzerland and cross-border flows (JAO).", "18.1", "slightly better"],
        ["27/10", "+ ENTSO-E forecasts", "+ official wind and solar forecasts of the neighbours.", "16.7", "rejected: published after the auction"],
        ["28/10", "+ Great Britain", "+ tomorrow's British price, set around 11:00, before the French auction.", "15.4", "big gain → fallback 2"],
        ["28/10", "+ neighbours' load", "+ neighbours' load forecast and tomorrow's cross-border capacities.", "15.1", "slightly better"],
        ["28/10", "+ nuclear and surplus", "+ nuclear available tomorrow and \"surplus\" = nuclear + wind + sun − load.", "13.7", "big gain → fallback 1"],
        ["28/10", "+ Germany / Benelux weather", "+ forecast wind and sun in Germany and Benelux.", "≈ 13.7", "no gain: dropped"],
        ["28/10", "Strong pruning", "The same model cut down to 29 variables.", "14.5", "worse: dropped"],
        ["28/10", "EUR", "The same model cut down to 54 variables (useless same-day data removed).", "13.6", "★ as good and simpler: becomes the main model (29/10)", "principal"],
        ["29/10", "Price-collapse specialist", "A second model for hours below €10, blended with EUR.", "≈ 13.6", "no gain: dropped"],
        ["29/10", "Variant 1 (P)", "EUR, with a surplus computed from our production forecast.", "13.4", "slightly better"],
        ["29/10", "Variant 2 (Q)", "EUR + this surplus added as a variable.", "13.4", "slightly better"],
        ["29/10", "Variant 3 (F)", "EUR with the 06Z GFS weather, more recent (out around 10:45).", "13.5", "slightly better"],
        ["29/10", "EUR-moy2", "Average of the prices forecast by EUR and variant 1.", "13.35", "fallback 1"],
        ["29/10", "EUR-moy4", "Average of EUR and the 3 variants: their errors partly cancel out.", "13.29", "★ the best: becomes the main model (30/10 → 02/11), then fallback", "principal"],
        ["29/10", "Lighter EUR-moy4", "EUR-moy4 with 45 variables instead of 54.", "13.37", "not better: not kept"],
        ["30/10", "06Z production", "Solar and wind production forecast with the 06Z weather instead of midnight's.", "≈ 13.2", "better production; price almost unchanged"],
        ["31/10", "Non-exportable surplus", "+ surplus minus what can be exported.", "13.60", "no gain: dropped"],
        ["01/11", "+ south and west weather", "+ forecast wind, sun and temperature in Spain, Italy, Switzerland and Great Britain.", "≈ 13.6", "no gain on its own: set aside"],
        ["01/11", "Zéphyr", "EUR + all the data dropped one by one: capacities, nuclear, our surplus, 06Z weather, CO₂, mix of two days before, weather of 8 neighbours (102 variables).", "12.87", "useless one by one, useful combined: big gain"],
        ["02/11", "Zéphyr on 2025", "The same test run again on 2025 (365 days × 24 h = 8,760 hours).", "10.1 in 2025 (EUR-moy4 10.6)", "gain confirmed"],
        ["02/11", "EUR+Zéphyr", "Average of the prices forecast by EUR-moy4 and Zéphyr.", "12.82", "equal to Zéphyr: tracked"],
        ["02/11", "Pruned Zéphyr", "Zéphyr with 84 variables instead of 102 (chosen on 2024, rule set before computing).", "12.78 (2025: 10.37)", "worse on 2025: dropped"],
        ["02/11", "Zéphyr (final version)", "+ our production forecast from the 06Z weather.", "12.87", "★ becomes the main model (since 03/11)", "principal"],
      ],
      an_notes: "Test: 01/01 to 28/10/2026, i.e. 300 days × 24 h = 7,200 hours forecast one by one (301 days = 7,224 hours for the 29/10 rows; 299 days = 7,176 hours for Zéphyr and its variants). * models retrained monthly. ** another test series: 291 days = 6,984 hours. *** trained up to 31/12/2025 without retraining, test 01/01 to 18/10/2026: 290 days × 24 h = 6,960 hours.",
      an_perf: "All models over the site's history (hourly error, like other published forecasts; days when the market price is known)",
      an_fiches: "The past models, still computed every day",
    },
  },
  rendus: { anciens: () => rendreAnciens(), apropos: () => { rendreModeles(); rendreSources(); } },
};

(function () {                                                     // morceaux de page : onglets, sections, fiches de production
  const nav = document.querySelector(".onglets");
  nav.insertAdjacentHTML("beforeend", "      <button type=\"button\" role=\"tab\" id=\"tab-anciens\" data-onglet=\"anciens\" aria-controls=\"anciens\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 8h16v12H4zM3 4h18v4H3m6 5h6\"/></svg><span data-t=\"o_anciens\"></span></button>\n      <button type=\"button\" role=\"tab\" id=\"tab-apropos\" data-onglet=\"apropos\" aria-controls=\"apropos\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v6m0-10v1\"/></svg><span data-t=\"o_apropos\"></span></button>\n");
  document.querySelector("main").insertAdjacentHTML("beforeend", "    <!-- ============================================================ ANCIENS MODÈLES -->\n    <section id=\"anciens\" role=\"tabpanel\" aria-labelledby=\"tab-anciens\" class=\"panneau\" hidden>\n      <div class=\"carte\">\n        <p class=\"intro\" id=\"an-intro\"></p>\n        <h3 class=\"petit-titre\" id=\"an-frise-titre\"></h3>\n        <div class=\"an-frise\" id=\"an-frise\"></div>\n        <h3 class=\"petit-titre\" id=\"an-titre\"></h3>\n        <p class=\"note\" id=\"an-legende\"></p>\n        <div class=\"cadre-table libre\"><table id=\"an-parcours\" class=\"table-donnees texte\"></table></div>\n        <p class=\"note\" id=\"an-notes\"></p>\n      </div>\n      <div class=\"carte\">\n        <h3 class=\"petit-titre\" id=\"an-perf-titre\"></h3>\n        <div class=\"cadre-table libre\"><table id=\"an-perf\" class=\"table-donnees\"></table></div>\n      </div>\n      <div class=\"carte\">\n        <h3 class=\"petit-titre\" id=\"an-fiches-titre\"></h3>\n        <div class=\"fiches\" id=\"an-fiches\"></div>\n      </div>\n    </section>\n\n    <!-- ============================================================ MODÈLES -->\n    <section id=\"apropos\" role=\"tabpanel\" aria-labelledby=\"tab-apropos\" class=\"panneau\" hidden>\n      <div class=\"carte\">\n        <h3 class=\"petit-titre\" data-t=\"m_qui\"></h3>\n        <p class=\"intro\" data-t=\"m_tous_matin\"></p>\n        <div class=\"fiches\" id=\"m-fiches\"></div>\n      </div>\n      <div class=\"carte\">\n        <h3 class=\"petit-titre\" data-t=\"m_chaine\"></h3>\n        <ol class=\"etapes\" id=\"m-etapes\"></ol>\n      </div>\n      <div class=\"deux-cartes\">\n        <div class=\"carte\">\n          <h3 class=\"petit-titre\" data-t=\"m_lexique\"></h3>\n          <dl class=\"lexique\" id=\"m-lexique\"></dl>\n        </div>\n        <div class=\"carte\">\n          <h3 class=\"petit-titre\" data-t=\"m_limites\"></h3>\n          <ul class=\"points\" id=\"m-limites\"></ul>\n        </div>\n      </div>\n      <h2 class=\"titre-section\" data-t=\"o_sources\"></h2>\n      <div class=\"carte\">\n        <p class=\"intro\" data-t=\"intro_sources\"></p>\n        <div class=\"sources\" id=\"s-liste\"></div>\n      </div>\n      <div class=\"carte\">\n        <h3 class=\"petit-titre\" data-t=\"s_outils\"></h3>\n        <ul class=\"points\" id=\"s-outils\"></ul>\n      </div>\n    </section>\n");
  document.querySelector('#production [data-t="prod_note"]').insertAdjacentHTML("afterend", "        <details class=\"plus\"><summary data-t=\"prod_details\"></summary><div class=\"fiches\" id=\"prod-modeles\"></div></details>\n");
})();

function fiche(m) {
  return `<div class="fiche"><h4>${pastille(m.code)}${nomModele(m.code)}${etiquette(m)}</h4><p class="court">${t("nom_court", { c: courtModele(m.code) })}</p>`
    + `${t("f_" + m.code).map((p, i) => `<p${i === 2 ? ' class="chiffre"' : ""}>${p}</p>`).join("")}${m.code === "GT" ? pourquoiGaz() : ""}${detailsModele(m.code)}</div>`;
}
function rendreModeles() {
  const f = MODELES.map(fiche);
  for (const r of ["hier", "sem"]) f.push(`<div class="fiche"><h4>${pastille(r)}${t(r)}</h4><p class="court">${t("nom_court", { c: t(r + "_court") })}</p>${t("f_" + r).map((p) => `<p>${p}</p>`).join("")}</div>`);   // repères naïfs (semaine d'avant ajoutée le 09/11/2026)
  $("m-fiches").innerHTML = f.join("");
  $("m-etapes").innerHTML = t("etapes").map(([a, b]) => `<li><div><b>${a}</b><span>${b}</span></div></li>`).join("");
  $("m-lexique").innerHTML = t("lexique").map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("");
  $("m-limites").innerHTML = t("limites").map((p) => `<li>${p.split("{d}").join(dateLongue(etat.d.debut_direct))}</li>`).join("");
}

function rendreAnciens() {
  $("an-intro").textContent = t("an_intro");
  $("an-titre").textContent = t("an_parcours");
  $("an-parcours").innerHTML = `<thead><tr>${t("an_cols").map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>`
    + t("an_lignes").map((l) => `<tr${l[5] === "principal" ? ' class="devenu-principal"' : l[5] === "repere" ? ' class="ligne-repere"' : ""}>${l.slice(0, 5).map((c, i) => `<td${i === 3 ? ' class="reel"' : ""}>${c}</td>`).join("")}</tr>`).join("") + "</tbody>";
  $("an-frise-titre").textContent = t("an_frise_titre");                // l'histoire en un coup d'œil : les modèles principaux successifs (09/11/2026)
  $("an-frise").innerHTML = t("an_frise").map(([d, m, e, q], i) => `<div class="etape-frise${i === 0 ? " repere" : ""}${i === t("an_frise").length - 1 ? " actuel" : ""}"><span class="date">${i ? "→ " : ""}${d}</span><b>${m}</b><span class="err">${e} €/MWh</span><span class="quoi">${q}</span></div>`).join("");
  $("an-legende").textContent = t("an_legende");
  $("an-notes").textContent = t("an_notes");
  $("an-perf-titre").textContent = t("an_perf");
  const js = joursAvecPrix(), sh = stats(js, "hier", "heure"), ss = stats(js, "sem", "heure");
  const st = TOUS.map((m) => [m.code, stats(js, m.code, "heure")]).filter(([, x]) => x).sort((a, b) => a[1].mae - b[1].mae);
  let h = `<thead><tr><th>${t("c_modele")} · ${t("jours_n", { n: js.length })}</th><th>${t("c_mae")}</th><th>${t("c_rel")}</th><th>${t("c_biais")}</th><th>${t("c_rmse")}</th><th>${t("c_gain")}</th></tr></thead><tbody>`;
  for (const [c, x] of st.concat(sh ? [["hier", sh]] : [], ss ? [["sem", ss]] : [])) {
    const m = TOUS.find((y) => y.code === c);
    h += `<tr><td><span class="nom-modele" title="${nomModele(c)}">${pastille(c)}${courtModele(c)}${m ? etiquette(m) : ""}</span></td><td>${nombre(x.mae)} ${t("unite")}</td><td>${nombre(x.rel, 0)} %</td>`
      + `<td>${signe(x.biais)}</td><td>${nombre(x.rmse)}</td><td>${c === "hier" ? "–" : `<span class="positif">${signe((100 * (sh.mae - x.mae)) / sh.mae, 0)} %</span>`}</td></tr>`;
  }
  $("an-perf").innerHTML = h + "</tbody>";
  $("an-fiches-titre").textContent = t("an_fiches");
  $("an-fiches").innerHTML = MODELES_ANCIENS.map(fiche).join("");
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

function lienSource(id) {
  const s = t("src").find((x) => x[0] === id);
  return `<li><a href="#sources">${s[1]}</a> : ${s[2]}${s[4].length ? " · " + s[4].map(([lib, url]) => `<a href="${url}" target="_blank" rel="noopener">${lib}</a>`).join(" · ") : ""}</li>`;
}

const ARBRES_EUROPE = { TOUT: 391, TOUT0: 159, EMT: 3884, EM: 3493, EP: 2026, EU: 721, EUC: 228, GB: 1064 };

function detailsModele(code) {
  const europe = code in ARBRES_EUROPE, relatif = europe || code === "GT";
  const groupes = [t("v_cal"), relatif ? t("v_prix_gaz") : t("v_prix"), code === "CR" ? t("v_fond_prod") : t("v_fond"), t("v_gaz")];
  if (europe) groupes.push(t("v_vois"), t("v_jao"), ...(code === "GB" ? [] : [t("v_charge")]), t("v_gb"), ...(code === "GB" ? [] : [t("v_surplus")]),
                           ...(["EUC", "TOUT", "TOUT0", "EMT"].includes(code) ? [t("v_jaoa"), t("v_ntc"), t("v_nuc")] : []), ...(["TOUT", "TOUT0", "EMT"].includes(code) ? [t("v_tout")] : []));
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
