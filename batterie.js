/* Onglet « Batterie (bonus) » : une batterie fictive pilotée par nos prévisions de prix, simulée dans le navigateur, et ce que coûte vraiment une batterie en France.
   Données : data/batterie.json (site_web.py) = prix horaires réels, prévus par le modèle publié, et deux repères sans modèle.
   Chaque jour, la batterie choisit ses heures d'achat et de vente pour maximiser le gain ATTENDU d'après une série de prix (programmation dynamique),
   puis le gain réel est calculé avec les VRAIS prix du marché. Utilise les outils d'app.js ($, t, css, nombre, dessiner, options, segments, tuile…). */
"use strict";

const LIENS = {
  bnef: "https://www.energy-storage.news/battery-storage-system-prices-continue-to-fall-sharply-bnef-and-ember-reports-find/",
  nrel: "https://docs.nlr.gov/docs/fy25osti/93281.pdf",
  tem: "https://www.territoire-energie53.fr/wp-content/uploads/2025/09/Rapport_TEM_Stockage_batteries_et_territoires_GBernard_2025.pdf",
  tag: "https://www.usinenouvelle.com/quotidien-des-usines/100-millions-deuros-pour-une-capacite-de-480-mwh-la-plus-grande-batterie-de-stockage-stationnaire-delectricite-de-france-entre-en-service-dans-la-marne.BLZTVIEHURE6LEQ7PXVB4C666Q.html",
  tag2: "https://www.banquedesterritoires.fr/realisation/cernay-les-reims-le-plus-grand-stockage-delectricite-par-batteries-de-france",
  kallista: "https://www.pv-magazine.fr/2026/09/22/en-images-mise-en-service-dun-systeme-de-stockage-par-batteries-de-120-mw-240-mwh-en-france/",
  corsica: "https://www.pv-magazine.fr/2026/05/05/corsica-sole-securise-30-me-pour-sa-premiere-centrale-de-stockage-stationnaire-en-france-continentale/",
  bofip: "https://bofip.impots.gouv.fr/bofip/14357-PGP.html/identifiant=BOI-RES-EAT-000164-20240918",
  turpe: "https://www.cre.fr/actualites/toute-lactualite/la-cre-communique-sur-les-zones-eligibles-a-la-composante-dinjection-soutirage-introduite-dans-le-turpe-7.html",
  capa: "https://www.services-rte.com/files/live/sites/services-rte/files/rapport-enchere-public-pl-26-27.pdf",
  forsyt: "https://www.pv-magazine.fr/2026/04/30/stockage-par-batteries-les-revenus-atteignables-bondissent-de-65-en-france-au-t1-2026/",
  epool: "https://energy-pool.com/fr/blog/bilan-marche-energie-novembre-2025-janvier-2026",
  megapack: "https://en.wikipedia.org/wiki/Tesla_Megapack",
};
const CAPACITE = 0.55 * 28183;              // mécanisme de capacité 2026-2027 : coefficient batterie 0,55 × prix d'équilibre 28 183 €/MW (RTE)
const REVENU_TOTAL = 173000;                // revenu « atteignable » toutes sources, batterie 10 MW / 20 MWh, mars 2026 (Forsyt, pv magazine)
const PRESETS = {
  prudent: { capex: 420, opex: 10, frais: 15, baisse: 5, taux: 8, vie: 15 },
  central: { capex: 300, opex: 4, frais: 10, baisse: 5, taux: 8, vie: 15 },
  optimiste: { capex: 210, opex: 4, frais: 5, baisse: 2, taux: 7, vie: 15 },
};

Object.assign(TXT.fr, {
  o_batterie: "Batterie (bonus)",
  b_chargement: "Chargement de la simulation…",
  b_absent: "Les données de la batterie ne sont pas encore disponibles.",
  b_hero_avant: "Une batterie de 1 MW / {e} MWh pilotée par notre modèle aurait gagné",
  b_hero_periode: "en achetant et revendant l'électricité sur le marché day-ahead, du {d} au {f} ({n} jours), soit environ {a} par an.",
  b_st_capture: "du gain maximal possible", b_st_plus: "gagnés grâce à la prévision", b_st_plus_d: "par rapport à la moyenne des 30 derniers jours", b_st_cycles: "cycles par jour en moyenne",
  b_comparer: "Quatre façons de piloter la même batterie",
  b_c_strat: "Pilotage", b_c_gain: "Gain réel", b_c_part: "Part du maximum", b_c_quoi: "Comment",
  b_s_r: "Devin (prix connus)", b_s_p: "Notre modèle", b_s_m: "Sans modèle (moyenne 30 j)", b_s_v: "Copier la veille",
  b_s_r_c: "Devin", b_s_p_c: "Notre modèle", b_s_m_c: "Moyenne 30 j", b_s_v_c: "Veille",
  b_s_r_d: "plan fait avec les vrais prix : le maximum possible, inatteignable", b_s_p_d: "plan fait la veille avec notre prévision du prix",
  b_s_m_d: "mêmes heures que la moyenne des 30 derniers jours", b_s_v_d: "mêmes heures que les prix de la veille",
  b_reglages: "Votre batterie", b_reglages_note: "Puissance 1 MW. Pour 10 MW, multipliez les euros par 10, tant que la batterie reste trop petite pour faire bouger le prix.",
  b_duree: "Durée de stockage", b_duree_d: "{e} MWh stockés pour 1 MW",
  b_rdt: "Rendement aller-retour", b_rdt_d: "{p} % de l'énergie achetée est perdue (NREL : 85 %)",
  b_usure: "Coût d'usure", b_usure_d: "la batterie ne travaille que si l'écart de prix le paie",
  b_jour_titre: "Une journée de la batterie",
  b_plan_de: "Plan fait avec :",
  b_prix_g: "Prix de la journée (€/MWh) et heures d'achat / de vente",
  b_achat: "Achète", b_vente: "Vend", b_attend: "Attend",
  b_prevu: "prévu (notre modèle)", b_reel: "réel (marché)",
  b_resume_achete: "La batterie achète {a}", b_resume_vend: "et revend {v}.", b_resume_rien: "La batterie ne fait rien ce jour-là : l'écart de prix ne paie pas les pertes.",
  b_de_a: "de {a} à {b}", b_et: " et ",
  b_t_gain: "Gain réel du jour", b_t_gain_prevu: "Gain attendu", b_t_gain_d: "devin : {x}",
  b_t_achat: "Prix moyen d'achat", b_t_vente: "Prix moyen de vente",
  b_t_attente: "prix du marché pas encore publié",
  b_demain_badge: "plan pour demain", b_passe_badge: "jour passé",
  b_widget_achat: "achète {x} MWh à {p} €/MWh", b_widget_vente: "vend {x} MWh à {p} €/MWh", b_widget_rien: "attend",
  b_widget_stock: "{x} MWh stockés",
  b_mois: "Gains mois par mois", b_m_mois: "Mois", b_m_capture: "Notre modèle / devin",
  b_couts: "Combien coûte une batterie en France ?",
  b_couts_intro: "Une batterie « réseau » se compose de conteneurs de batteries lithium-fer-phosphate (LFP), d'onduleurs, d'un système de pilotage, de travaux, d'un poste électrique et d'un raccordement au réseau. Les prix ont fortement baissé : en Europe, le système clé en main est passé de 275 $/kWh en 2024 à 177 $/kWh en 2025 (BNEF). Les chiffres ci-dessous viennent de sources publiques ; la colonne « retenu » sert au calcul de rentabilité plus bas.",
  b_k_poste: "Poste", b_k_retenu: "Retenu", b_k_publie: "Ce que disent les sources", b_k_source: "Source",
  b_k1: "Système clé en main (batteries, onduleurs, pilotage)", b_k1_r: "≈ 155 €/kWh", b_k1_p: "Moyenne Europe 2025 : 177 $/kWh (monde 117 $, Chine 73 $, États-Unis 219 $), hors travaux et raccordement",
  b_k2: "Projet hors terrain et raccordement", b_k2_r: "≈ 200 €/kWh", b_k2_p: "≈ 400 000 € par MW pour les batteries raccordées en France (Clean Horizon)",
  b_k3: "Projet complet en France, tout compris", b_k3_r: "300 €/kWh", b_k3_p: "≈ 210 €/kWh (TagEnergy, 240 MW / 480 MWh, ≈ 100 M€) à ≈ 420 €/kWh (Kallista Energy, 120 MW / 240 MWh, ≈ 100 M€)",
  b_k4: "Référence américaine (2024, coûts plus élevés)", b_k4_r: "–", b_k4_p: "334 $/kWh pour 4 h ; ≈ 427 $/kWh pour 2 h (241 $/kWh + 372 $/kW)",
  b_k5: "Exploitation, maintenance et maintien de la capacité", b_k5_r: "4 % par an", b_k5_p: "NREL : 4 % de l'investissement par an, remplacement des cellules usées compris, pour environ 1 cycle par jour ; Clean Horizon : 10 % par an tout compris",
  b_k6: "Taxe sur l'électricité stockée (accise)", b_k6_r: "0 €", b_k6_p: "L'électricité consommée pour charger les batteries est exonérée d'accise (article L. 312-32 du code des impositions)",
  b_k7: "Tarif de réseau (TURPE)", b_k7_r: "dans « prudent »", b_k7_p: "Dépend du raccordement ; depuis le 1er août 2026, option « injection-soutirage » qui récompense une batterie qui soulage le réseau local",
  b_k8: "Durée de vie", b_k8_r: "15 ans", b_k8_p: "NREL : 15 ans (choix prudent) ; garantie Tesla Megapack : 15 ans",
  b_k9: "Taux d'actualisation", b_k9_r: "8 %", b_k9_p: "Clean Horizon : 8 % sur 15 ans",
  b_k10: "Frais d'agrégateur (accès au marché)", b_k10_r: "10 % des gains", b_k10_p: "Hypothèse : les contrats (Engie pour Kallista, Agregio pour Corsica Sole) ne sont pas publics",
  b_projets: "Trois projets réels en France", b_p_projet: "Projet", b_p_taille: "Taille", b_p_cout: "Montant publié", b_p_kwh: "Soit", b_p_note: "Remarque",
  b_p1: "Cernay-lès-Reims (Marne), TagEnergy", b_p1_n: "Tesla Megapack, en service depuis mai 2026, réserve secondaire (aFRR)",
  b_p2: "Saleux (Somme), Kallista Energy", b_p2_n: "batteries LFP Envision AESC, sans subvention, exploitée par Engie pendant 7 ans",
  b_p3: "Beuvry et Labourse (Pas-de-Calais), Corsica Sole", b_p3_c: "30 M€ de dette bancaire", b_p3_k: "coût total non publié", b_p3_n: "contrat d'agrégation avec Agregio, mise en service début 2027",
  b_revenus: "D'où vient l'argent d'une batterie en France ?",
  b_revenus_intro: "Une batterie peut vendre plusieurs services, mais pas tous en même temps : la puissance réservée pour aider RTE ne sert plus à l'achat-revente. Seule la première ligne est calculée sur ce site ; les autres sont des ordres de grandeur publiés.",
  b_r_source: "Source de revenu", b_r_montant: "Par MW et par an", b_r_quoi: "Ce qu'il faut savoir",
  b_r1: "Achat-revente sur le marché day-ahead (cette page)", b_r1_q: "Mesuré ici avec notre modèle ; le marché infrajournalier et le quart d'heure ajouteraient encore (≈ +12 % au quart d'heure avec des prix parfaits)",
  b_r2: "Mécanisme de capacité", b_r2_m: "≈ 8 000 à 15 500 €", b_r2_q: "Enchère 2026-2027 : 28 183 €/MW, plafonné à 15 000 €/MW pour l'existant ; une batterie ne compte que pour 55 % de sa puissance ; 401 MW de batteries retenues",
  b_r3: "Réserves pour RTE (FCR, aFRR)", b_r3_m: "très variable", b_r3_q: "La réserve secondaire (aFRR) a rapporté 300 à 500 k€/MW/an fin 2024 puis a baissé ; la réserve primaire (FCR) est saturée par les batteries (plus de 80 % du besoin)",
  b_r4: "Revenu total « optimisé » (toutes sources)", b_r4_m: "≈ 173 000 €", b_r4_q: "Batterie de référence 10 MW / 20 MWh, mars 2026 (Forsyt) ; Clean Horizon prévoit ≈ 200 k€/MW/an en 2027 puis ≈ 100 k€ en 2040, à mesure que les batteries se multiplient",
  b_eco: "Est-ce rentable ?",
  b_eco_intro: "Choisissez un jeu d'hypothèses, puis ajustez. Les valeurs par défaut viennent des sources du tableau des coûts.",
  b_scenario: "Revenus pris en compte :", b_sc_arb: "Achat-revente seul (mesuré)", b_sc_cap: "+ mécanisme de capacité", b_sc_tot: "Revenu total publié (173 k€)",
  b_sc_tot_note: "Le revenu total publié correspond à une batterie de 2 h : la durée choisie plus haut n'est pas prise en compte dans ce scénario.",
  b_presets: "Hypothèses :", b_pr_prudent: "Prudentes", b_pr_central: "Centrales", b_pr_optimiste: "Optimistes",
  b_capex: "Prix du projet tout compris", b_capex_d: "{x} pour {e} MWh",
  b_opex: "Exploitation et maintenance", b_opex_d: "par an, pour 1 cycle par jour (davantage si la batterie cycle plus)",
  b_frais: "Frais d'agrégateur", b_frais_d: "part des gains",
  b_baisse: "Baisse des revenus", b_baisse_d: "par an, quand les batteries se multiplient",
  b_taux: "Taux d'actualisation", b_taux_d: "rendement exigé par l'investisseur",
  b_vie: "Durée de vie", b_vie_d: "ans",
  b_verdict_ok: "Rentable avec ces hypothèses", b_verdict_ko: "Pas rentable avec ces hypothèses",
  b_e_invest: "Investissement", b_e_rev: "Revenu net la 1re année", b_e_rev_d: "après frais, exploitation et maintenance",
  b_e_van: "Valeur actuelle nette", b_e_van_d: "gain total ramené à aujourd'hui", b_e_tri: "Rentabilité annuelle (TRI)", b_e_retour: "Remboursée en", b_e_jamais: "jamais",
  b_e_g: "Trésorerie cumulée (€) : investissement, puis revenus nets année après année",
  b_annee: "année {n}", b_ans: "{n} ans",
  b_eco_note: "Simulation pédagogique, pas un conseil d'investissement. Les revenus passés ne garantissent rien : 2026 est une année de prix élevés et très variables.",
  b_methode: "Méthode et limites",
  b_m1: "Chaque jour, la veille vers 11 h 30, la batterie choisit ses heures d'achat et de vente pour gagner le plus possible d'après une série de prix (notre prévision ou un repère). Le calcul est un petit programme d'optimisation (programmation dynamique) refait dans votre navigateur.",
  b_m2: "Elle paie et encaisse ensuite les VRAIS prix du marché. On suppose que ses ordres ne changent pas le prix (1 MW est minuscule face au marché français) et qu'elle est vide à minuit.",
  b_m3: "Prix à l'heure : depuis octobre 2025 le marché est au quart d'heure ; avec des prix parfaits, piloter au quart d'heure rapporterait environ 12 % de plus.",
  b_m4: "Les prévisions avant le 29/10/2026 viennent du test « réappris chaque jour » (même méthode que le service), ensuite des prévisions publiées en direct.",
  b_m5: "Rentabilité : la maintenance et le remplacement des cellules usées (4 % par an, NREL) supposent environ 1 cycle par jour ; nous augmentons cette part en proportion quand la batterie cycle davantage (le reste des frais ne dépend pas des cycles). Ni impôts sur les bénéfices, ni dette, ni valeur de revente en fin de vie.",
  b_sources: "Sources",
  b_src: [
    ["bnef", "BloombergNEF, enquête 2025 sur le coût des systèmes de stockage (via Energy-Storage.News)"],
    ["nrel", "NREL, Cost Projections for Utility-Scale Battery Storage: 2025 Update (juin 2025)"],
    ["tem", "Territoire d'énergie Mayenne, Systèmes de stockage par batteries et territoires (2025), données Clean Horizon"],
    ["tag", "L'Usine Nouvelle : 100 M€ pour 480 MWh, la plus grande batterie de France (TagEnergy)"],
    ["tag2", "Banque des Territoires : Cernay-lès-Reims, 240 MW / 480 MWh"],
    ["kallista", "pv magazine : batterie de 120 MW / 240 MWh à Saleux (Kallista Energy)"],
    ["corsica", "pv magazine : Corsica Sole sécurise 30 M€ pour 50 MW / 100 MWh"],
    ["bofip", "BOFiP : accise sur l'électricité des installations de stockage par batteries"],
    ["turpe", "CRE : composante d'injection-soutirage du TURPE 7"],
    ["capa", "RTE : rapport de l'enchère du mécanisme de capacité 2026-2027"],
    ["forsyt", "pv magazine : revenus atteignables des batteries en France au T1 2026 (Forsyt)"],
    ["epool", "Energy Pool : bilan des marchés de flexibilité (FCR, aFRR) 2025-2026"],
    ["megapack", "Tesla Megapack (garantie de 15 ans)"],
  ],
});
Object.assign(TXT.en, {
  o_batterie: "Battery (bonus)",
  b_chargement: "Loading the simulation…",
  b_absent: "Battery data is not available yet.",
  b_hero_avant: "A 1 MW / {e} MWh battery driven by our model would have earned",
  b_hero_periode: "by buying and selling electricity on the day-ahead market, from {d} to {f} ({n} days), about {a} per year.",
  b_st_capture: "of the maximum possible gain", b_st_plus: "earned thanks to the forecast", b_st_plus_d: "compared with the last 30 days' average", b_st_cycles: "cycles per day on average",
  b_comparer: "Four ways to drive the same battery",
  b_c_strat: "Driven by", b_c_gain: "Actual gain", b_c_part: "Share of maximum", b_c_quoi: "How",
  b_s_r: "Fortune teller (known prices)", b_s_p: "Our model", b_s_m: "No model (30-day average)", b_s_v: "Copy yesterday",
  b_s_r_c: "Fortune teller", b_s_p_c: "Our model", b_s_m_c: "30-day avg", b_s_v_c: "Yesterday",
  b_s_r_d: "plan made with the real prices: the maximum possible, unreachable", b_s_p_d: "plan made the day before with our price forecast",
  b_s_m_d: "same hours as the last 30 days' average", b_s_v_d: "same hours as yesterday's prices",
  b_reglages: "Your battery", b_reglages_note: "1 MW of power. For 10 MW, multiply the euros by 10, as long as the battery is too small to move the price.",
  b_duree: "Storage duration", b_duree_d: "{e} MWh stored for 1 MW",
  b_rdt: "Round-trip efficiency", b_rdt_d: "{p}% of the energy bought is lost (NREL: 85%)",
  b_usure: "Wear cost", b_usure_d: "the battery only works if the price spread pays for it",
  b_jour_titre: "A day in the life of the battery",
  b_plan_de: "Plan made with:",
  b_prix_g: "Prices of the day (€/MWh) and buying / selling hours",
  b_achat: "Buys", b_vente: "Sells", b_attend: "Waits",
  b_prevu: "forecast (our model)", b_reel: "actual (market)",
  b_resume_achete: "The battery buys {a}", b_resume_vend: "and sells {v}.", b_resume_rien: "The battery does nothing that day: the price spread does not cover the losses.",
  b_de_a: "from {a} to {b}", b_et: " and ",
  b_t_gain: "Actual gain of the day", b_t_gain_prevu: "Expected gain", b_t_gain_d: "fortune teller: {x}",
  b_t_achat: "Average buying price", b_t_vente: "Average selling price",
  b_t_attente: "market price not published yet",
  b_demain_badge: "plan for tomorrow", b_passe_badge: "past day",
  b_widget_achat: "buys {x} MWh at {p} €/MWh", b_widget_vente: "sells {x} MWh at {p} €/MWh", b_widget_rien: "waits",
  b_widget_stock: "{x} MWh stored",
  b_mois: "Gains month by month", b_m_mois: "Month", b_m_capture: "Our model / fortune teller",
  b_couts: "How much does a battery cost in France?",
  b_couts_intro: "A grid battery is made of lithium iron phosphate (LFP) battery containers, inverters, a control system, civil works, a substation and a grid connection. Prices have fallen sharply: in Europe, the turnkey system went from $275/kWh in 2024 to $177/kWh in 2025 (BNEF). The figures below come from public sources; the \"used\" column feeds the profitability calculation further down.",
  b_k_poste: "Item", b_k_retenu: "Used", b_k_publie: "What the sources say", b_k_source: "Source",
  b_k1: "Turnkey system (batteries, inverters, control)", b_k1_r: "≈ €155/kWh", b_k1_p: "Europe average 2025: $177/kWh (world $117, China $73, US $219), excluding works and grid connection",
  b_k2: "Project excluding land and grid connection", b_k2_r: "≈ €200/kWh", b_k2_p: "≈ €400,000 per MW for batteries connected in France (Clean Horizon)",
  b_k3: "Full project in France, all included", b_k3_r: "€300/kWh", b_k3_p: "≈ €210/kWh (TagEnergy, 240 MW / 480 MWh, ≈ €100m) to ≈ €420/kWh (Kallista Energy, 120 MW / 240 MWh, ≈ €100m)",
  b_k4: "US reference (2024, higher costs)", b_k4_r: "–", b_k4_p: "$334/kWh for 4 h; ≈ $427/kWh for 2 h ($241/kWh + $372/kW)",
  b_k5: "Operation, maintenance and capacity upkeep", b_k5_r: "4% per year", b_k5_p: "NREL: 4% of the investment per year, replacement of worn cells included, for about 1 cycle per day; Clean Horizon: 10% per year all-in",
  b_k6: "Tax on stored electricity (excise)", b_k6_r: "€0", b_k6_p: "Electricity used to charge batteries is exempt from excise (article L. 312-32 of the French tax code)",
  b_k7: "Grid tariff (TURPE)", b_k7_r: "in \"cautious\"", b_k7_p: "Depends on the connection; since 1 August 2026, an \"injection-withdrawal\" option rewards batteries that relieve the local grid",
  b_k8: "Lifetime", b_k8_r: "15 years", b_k8_p: "NREL: 15 years (cautious choice); Tesla Megapack warranty: 15 years",
  b_k9: "Discount rate", b_k9_r: "8%", b_k9_p: "Clean Horizon: 8% over 15 years",
  b_k10: "Aggregator fees (market access)", b_k10_r: "10% of gains", b_k10_p: "Assumption: contracts (Engie for Kallista, Agregio for Corsica Sole) are not public",
  b_projets: "Three real projects in France", b_p_projet: "Project", b_p_taille: "Size", b_p_cout: "Published amount", b_p_kwh: "That is", b_p_note: "Note",
  b_p1: "Cernay-lès-Reims (Marne), TagEnergy", b_p1_n: "Tesla Megapack, in operation since May 2026, secondary reserve (aFRR)",
  b_p2: "Saleux (Somme), Kallista Energy", b_p2_n: "Envision AESC LFP batteries, no subsidy, operated by Engie for 7 years",
  b_p3: "Beuvry and Labourse (Pas-de-Calais), Corsica Sole", b_p3_c: "€30m bank debt", b_p3_k: "total cost not published", b_p3_n: "aggregation contract with Agregio, commissioning early 2027",
  b_revenus: "Where does a battery's money come from in France?",
  b_revenus_intro: "A battery can sell several services, but not all at once: power reserved to help RTE can no longer be used for buying and selling. Only the first row is computed on this site; the others are published orders of magnitude.",
  b_r_source: "Revenue source", b_r_montant: "Per MW per year", b_r_quoi: "What to know",
  b_r1: "Buying and selling on the day-ahead market (this page)", b_r1_q: "Measured here with our model; the intraday market and quarter-hours would add more (≈ +12% at quarter-hour resolution with perfect prices)",
  b_r2: "Capacity mechanism", b_r2_m: "≈ €8,000 to €15,500", b_r2_q: "2026-2027 auction: €28,183/MW, capped at €15,000/MW for existing assets; a battery only counts for 55% of its power; 401 MW of batteries selected",
  b_r3: "Reserves for RTE (FCR, aFRR)", b_r3_m: "highly variable", b_r3_q: "The secondary reserve (aFRR) paid €300-500k/MW/yr at the end of 2024 and then fell; the primary reserve (FCR) is saturated by batteries (over 80% of the need)",
  b_r4: "Total \"optimised\" revenue (all sources)", b_r4_m: "≈ €173,000", b_r4_q: "Reference 10 MW / 20 MWh battery, March 2026 (Forsyt); Clean Horizon expects ≈ €200k/MW/yr in 2027 then ≈ €100k in 2040 as batteries multiply",
  b_eco: "Is it profitable?",
  b_eco_intro: "Pick a set of assumptions, then adjust. Default values come from the sources in the cost table.",
  b_scenario: "Revenue included:", b_sc_arb: "Buy-sell only (measured)", b_sc_cap: "+ capacity mechanism", b_sc_tot: "Total published revenue (€173k)",
  b_sc_tot_note: "The total published revenue is for a 2-hour battery: the duration chosen above is not used in this scenario.",
  b_presets: "Assumptions:", b_pr_prudent: "Cautious", b_pr_central: "Central", b_pr_optimiste: "Optimistic",
  b_capex: "All-in project price", b_capex_d: "{x} for {e} MWh",
  b_opex: "Operation and maintenance", b_opex_d: "per year, for 1 cycle per day (more if the battery cycles more)",
  b_frais: "Aggregator fees", b_frais_d: "share of gains",
  b_baisse: "Revenue decline", b_baisse_d: "per year, as batteries multiply",
  b_taux: "Discount rate", b_taux_d: "return required by the investor",
  b_vie: "Lifetime", b_vie_d: "years",
  b_verdict_ok: "Profitable with these assumptions", b_verdict_ko: "Not profitable with these assumptions",
  b_e_invest: "Investment", b_e_rev: "Net revenue in year 1", b_e_rev_d: "after fees, operation and maintenance",
  b_e_van: "Net present value", b_e_van_d: "total gain in today's money", b_e_tri: "Annual return (IRR)", b_e_retour: "Paid back in", b_e_jamais: "never",
  b_e_g: "Cumulative cash (€): investment, then net revenue year after year",
  b_annee: "year {n}", b_ans: "{n} years",
  b_eco_note: "Educational simulation, not investment advice. Past revenue guarantees nothing: 2026 is a year of high and very volatile prices.",
  b_methode: "Method and limits",
  b_m1: "Every day, the day before at around 11:30, the battery picks its buying and selling hours to earn as much as possible according to a price series (our forecast or a benchmark). The calculation is a small optimisation program (dynamic programming) run again in your browser.",
  b_m2: "It then pays and receives the REAL market prices. We assume its orders do not move the price (1 MW is tiny compared with the French market) and that it is empty at midnight.",
  b_m3: "Hourly prices: since October 2025 the market is quarter-hourly; with perfect prices, quarter-hour dispatch would earn about 12% more.",
  b_m4: "Forecasts before 29/10/2026 come from the \"retrained every day\" test (same method as the service), then from forecasts published live.",
  b_m5: "Profitability: maintenance and replacement of worn cells (4% per year, NREL) assume about 1 cycle per day; we scale this part up when the battery cycles more (other costs do not depend on cycling). No income tax, debt or resale value at end of life.",
  b_sources: "Sources",
  b_src: [
    ["bnef", "BloombergNEF, 2025 energy storage system cost survey (via Energy-Storage.News)"],
    ["nrel", "NREL, Cost Projections for Utility-Scale Battery Storage: 2025 Update (June 2025)"],
    ["tem", "Territoire d'énergie Mayenne, Battery storage systems and territories (2025), Clean Horizon data"],
    ["tag", "L'Usine Nouvelle: €100m for 480 MWh, France's largest battery (TagEnergy)"],
    ["tag2", "Banque des Territoires: Cernay-lès-Reims, 240 MW / 480 MWh"],
    ["kallista", "pv magazine: 120 MW / 240 MWh battery in Saleux (Kallista Energy)"],
    ["corsica", "pv magazine: Corsica Sole secures €30m for 50 MW / 100 MWh"],
    ["bofip", "BOFiP: excise on electricity for battery storage installations"],
    ["turpe", "CRE: injection-withdrawal component of TURPE 7"],
    ["capa", "RTE: 2026-2027 capacity mechanism auction report"],
    ["forsyt", "pv magazine: achievable battery revenues in France in Q1 2026 (Forsyt)"],
    ["epool", "Energy Pool: flexibility market review (FCR, aFRR) 2025-2026"],
    ["megapack", "Tesla Megapack (15-year warranty)"],
  ],
});

const STRATS = [
  { k: "r", couleur: "--ink", tirets: [6, 4] },
  { k: "p", couleur: "--s-tout", tirets: [] },
  { k: "m", couleur: "--s-gb", tirets: [] },
  { k: "v", couleur: "--muted", tirets: [2, 3] },
];
const bat = { d: null, statut: "vide", attentes: [], cle: null, res: null, jour: null, plan: "p", survol: null, construit: null, compte: false,
              scenario: "arb", preset: "central", p: { duree: 2, rdt: 88, usure: 0, ...PRESETS.central } };
const euros = (v, dec = 0) => `${nombre(v, dec)} €`;
const pc = (v, dec = 0) => `${nombre(100 * v, dec)} %`;
const lienSrc = (k, txt) => `<a href="${LIENS[k]}" target="_blank" rel="noopener">${txt}</a>`;

/* ---------------------------------------------------------------- données (partagées avec l'onglet « Battre le marché ») */
function chargerBatterie(rappel) {
  if (bat.statut === "pret" || bat.statut === "absent") { rappel(); return; }
  bat.attentes.push(rappel);
  if (bat.statut === "charge") return;
  bat.statut = "charge";
  const fin = (d) => {
    bat.d = d && d.jours && d.jours.length ? d : null;
    bat.statut = bat.d ? "pret" : "absent";
    bat.attentes.splice(0).forEach((f) => f());
  };
  fetch("data/batterie.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then(fin).catch(() => fin(null));
}

/* ---------------------------------------------------------------- optimisation d'une journée (programmation dynamique) */
function planifier(prix, puissance, energie, rendement, usure) {
  const n = prix.length, N = 60, dl = energie / N, e = Math.sqrt(rendement);
  const kc = Math.floor((puissance * e) / dl + 1e-9), kd = Math.floor(puissance / e / dl + 1e-9), L = N + 1;
  const V = new Float64Array((n + 1) * L).fill(-Infinity), A = new Int16Array(n * L);
  V[n * L] = 0;                                                     // batterie vide à minuit
  for (let t = n - 1; t >= 0; t--) {
    const p = prix[t], connu = p !== null && p !== undefined;
    for (let s = 0; s <= N; s++) {
      let best = -Infinity, ba = 0;
      const lo = connu ? Math.max(-kd, -s) : 0, hi = connu ? Math.min(kc, N - s) : 0;
      for (let a = lo; a <= hi; a++) {
        const suite = V[(t + 1) * L + s + a];
        if (suite === -Infinity) continue;
        const g = a > 0 ? (-p * a * dl) / e : a < 0 ? (p - usure) * -a * dl * e : 0;
        if (g + suite > best + 1e-9) { best = g + suite; ba = a; }
      }
      V[t * L + s] = best; A[t * L + s] = ba;
    }
  }
  const achat = new Array(n).fill(0), vente = new Array(n).fill(0), soc = new Array(n).fill(0);
  let s = 0;
  for (let t = 0; t < n; t++) {
    const a = A[t * L + s];
    if (a > 0) achat[t] = (a * dl) / e; else if (a < 0) vente[t] = -a * dl * e;
    s += a; soc[t] = s * dl;
  }
  return { achat, vente, soc };
}
const gainReel = (pl, reel) => reel.reduce((g, r, t) => g + r * (pl.vente[t] - pl.achat[t]), 0);

/* ---------------------------------------------------------------- simulation de toute la période (mise en cache selon les réglages) */
function simuler() {
  const q = bat.p, cle = [q.duree, q.rdt, q.usure].join("|");
  if (bat.cle === cle && bat.res) return bat.res;
  const E = q.duree, rd = q.rdt / 100, plans = {}, gains = { r: [], p: [], m: [], v: [] }, vendu = { r: 0, p: 0, m: 0, v: 0 }, jours = [];
  for (const j of bat.d.jours) {
    plans[j.j] = {};
    for (const s of STRATS) {
      const serie = s.k === "r" ? j.r : j[s.k];
      if (serie) plans[j.j][s.k] = planifier(serie, 1, E, rd, q.usure);
    }
    if (!j.r || !j.m) continue;
    jours.push(j.j);
    for (const s of STRATS) {
      const pl = plans[j.j][s.k];
      gains[s.k].push(pl ? gainReel(pl, j.r) : 0);
      if (pl) vendu[s.k] += pl.vente.reduce((a, b) => a + b, 0);
    }
  }
  const total = Object.fromEntries(STRATS.map((s) => [s.k, gains[s.k].reduce((a, b) => a + b, 0)]));
  const cycles = vendu.p / (E * Math.sqrt(rd)) / jours.length;
  bat.res = { plans, gains, total, vendu, jours, E, rd, cycles, annuel: (total.p * 365) / jours.length };
  bat.cle = cle;
  return bat.res;
}

/* ---------------------------------------------------------------- rentabilité */
function rentabilite(res) {
  const q = bat.p, tot = bat.scenario === "tot", E = tot ? 2 : res.E, capex = q.capex * 1000 * E;
  const revenu = tot ? REVENU_TOTAL : res.annuel + (bat.scenario === "cap" ? CAPACITE : 0);
  const usure = Math.min(q.opex, 4), autres = Math.max(0, q.opex - 4);   // seule la part maintenance et remplacement des cellules (4 %, NREL, pour 1 cycle/jour) suit le nombre de cycles
  const exploitation = (capex / 100) * (usure * (tot ? 1 : Math.max(1, res.cycles)) + autres);
  const flux = Array.from({ length: q.vie }, (_, a) => revenu * (1 - q.frais / 100) * (1 - q.baisse / 100) ** a - exploitation);
  const van = (taux) => -capex + flux.reduce((s, f, a) => s + f / (1 + taux) ** (a + 1), 0);
  let lo = -0.9, hi = 1.0;
  for (let i = 0; i < 80; i++) { const mi = (lo + hi) / 2; if (van(mi) > 0) lo = mi; else hi = mi; }
  const cumul = [-capex];
  flux.forEach((f) => cumul.push(cumul[cumul.length - 1] + f));
  const retour = cumul.findIndex((c) => c >= 0);
  return { capex, revenu, net1: flux[0], van: van(q.taux / 100), tri: van(-0.89) > 0 ? lo : null, cumul, retour: retour > 0 ? retour : null };
}

/* ---------------------------------------------------------------- petits éléments visuels */
function svgBatterie(niveau, action) {                               // niveau de 0 à 1 ; action : achat / vente / rien
  const H = 150, h = Math.max(0, Math.min(1, niveau)) * (H - 8), couleur = action === "achat" ? css("--s-eu") : action === "vente" ? css("--s-cr") : css("--muted");
  const fleche = action === "achat" ? "M50 30 L50 70 M38 58 L50 70 L62 58" : action === "vente" ? "M50 70 L50 30 M38 42 L50 30 L62 42" : "";
  return `<svg class="bat-svg" viewBox="0 0 100 190" role="img" aria-hidden="true">
    <rect x="36" y="4" width="28" height="12" rx="3" fill="${css("--axis")}"/>
    <rect x="8" y="16" width="84" height="${H + 12}" rx="12" fill="none" stroke="${css("--ink-2")}" stroke-width="3"/>
    <rect x="14" y="${22 + (H - 8) - h + 4}" width="72" height="${h}" rx="7" fill="${couleur}" opacity="0.85"/>
    ${fleche ? `<path d="${fleche}" transform="translate(0 ${H / 2 - 30})" stroke="${css("--surface")}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
    <text x="50" y="${H + 24}" text-anchor="middle" font-size="15" font-weight="600" fill="${css("--ink")}">${nombre(100 * niveau, 0)} %</text>
  </svg>`;
}
const heuresDe = (j) => j.h || Array.from({ length: j.p.length }, (_, i) => String(i).padStart(2, "0"));
const lib = (h) => (etat.langue === "fr" ? `${h} h` : `${h}:00`);
function plages(v, heures) {                                          // heures consécutives où v > 0, sous forme de texte « de 2 h à 5 h »
  const out = [];
  let d = null;
  for (let i = 0; i <= v.length; i++) {
    const on = i < v.length && v[i] > 1e-6;
    if (on && d === null) d = i;
    if (!on && d !== null) {
      const fin = i < heures.length ? heures[i] : String((Number(heures[i - 1]) + 1) % 24).padStart(2, "0");
      out.push(t("b_de_a", { a: lib(heures[d]), b: lib(fin) }));
      d = null;
    }
  }
  return out;
}
const joinEt = (a) => (a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + t("b_et") + a[a.length - 1]);
const pluginColonnes = {                                                  // fond coloré des heures d'achat (bleu) et de vente (orange) ; trait du survol
  id: "batColonnes",
  beforeDatasetsDraw(chart, args, o) {
    if (!o || !o.achat) return;
    const { top, bottom } = chart.chartArea, x = chart.scales.x, n = o.achat.length, w = (chart.chartArea.right - chart.chartArea.left) / n, ctx = chart.ctx;
    ctx.save();
    for (let i = 0; i < n; i++) {
      const c = o.achat[i] > 1e-6 ? o.cA : o.vente[i] > 1e-6 ? o.cV : null;
      if (!c) continue;
      ctx.fillStyle = c; ctx.globalAlpha = 0.16; ctx.fillRect(x.getPixelForValue(i) - w / 2, top, w, bottom - top);
    }
    ctx.restore();
  },
  afterDatasetsDraw(chart) {
    if (bat.survol === null) return;
    const x = chart.scales.x.getPixelForValue(bat.survol), { top, bottom } = chart.chartArea, ctx = chart.ctx;
    ctx.save(); ctx.strokeStyle = css("--axis"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke(); ctx.restore();
  },
};

/* ---------------------------------------------------------------- squelette de l'onglet (reconstruit au changement de langue ou de thème) */
function curseurHTML(cle, texte, min, max, pas) {
  return `<label class="curseur"><span class="curseur-haut"><span>${t(texte)}</span><b id="bat-${cle}-v"></b></span>`
    + `<input type="range" id="bat-${cle}" min="${min}" max="${max}" step="${pas}" value="${bat.p[cle]}" aria-label="${t(texte)}">`
    + `<span class="curseur-detail" id="bat-${cle}-d"></span></label>`;
}
function tableHTML(entetes, lignes, classe = "") {
  return `<div class="cadre-table ouvert"><table class="table-donnees texte ${classe}"><thead><tr>${entetes.map((e) => `<th>${e}</th>`).join("")}</tr></thead>`
    + `<tbody>${lignes.map((l) => `<tr>${l.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function construire() {
  const couts = [["b_k1", "b_k1_r", "b_k1_p", "bnef", "BNEF 2025"], ["b_k2", "b_k2_r", "b_k2_p", "tem", "Clean Horizon (TEM 2025)"],
    ["b_k3", "b_k3_r", "b_k3_p", "tag", "Usine Nouvelle, pv magazine"], ["b_k4", "b_k4_r", "b_k4_p", "nrel", "NREL 2025"], ["b_k5", "b_k5_r", "b_k5_p", "nrel", "NREL 2025, TEM 2025"],
    ["b_k6", "b_k6_r", "b_k6_p", "bofip", "BOFiP"], ["b_k7", "b_k7_r", "b_k7_p", "turpe", "CRE"], ["b_k8", "b_k8_r", "b_k8_p", "nrel", "NREL 2025"],
    ["b_k9", "b_k9_r", "b_k9_p", "tem", "TEM 2025"], ["b_k10", "b_k10_r", "b_k10_p", null, "–"]]
    .map(([a, b, c, k, s]) => [`<b>${t(a)}</b>`, `<span class="nowrap">${t(b)}</span>`, t(c), k ? lienSrc(k, s) : s]);
  const projets = [[t("b_p1"), "240 MW / 480 MWh", lienSrc("tag", "≈ 100 M€"), "≈ 210 €/kWh", t("b_p1_n")],
    [t("b_p2"), "120 MW / 240 MWh", lienSrc("kallista", "≈ 100 M€"), "≈ 420 €/kWh", t("b_p2_n")],
    [t("b_p3"), "50 MW / 100 MWh", lienSrc("corsica", t("b_p3_c")), t("b_p3_k"), t("b_p3_n")]];
  $("batterie").innerHTML = `
    <div class="carte">
      <p class="bat-avant" id="bat-avant"></p>
      <p class="bat-chiffre" id="bat-chiffre">–</p>
      <p class="bat-apres" id="bat-periode"></p>
      <div class="bat-stats" id="bat-stats"></div>
      <h3 class="petit-titre bat-sous">${t("b_comparer")}</h3>
      <div class="cadre-table ouvert"><table class="table-donnees bat-comparer" id="bat-comparer"></table></div>
      <h3 class="petit-titre bat-sous">${t("b_reglages")}</h3>
      <div class="curseurs">${curseurHTML("duree", "b_duree", 1, 6, 1)}${curseurHTML("rdt", "b_rdt", 70, 95, 1)}${curseurHTML("usure", "b_usure", 0, 40, 1)}</div>
      <p class="note">${t("b_reglages_note")}</p>
    </div>
    <div class="carte">
      <div class="titre-jour"><h3 class="petit-titre" id="bat-titre-jour"></h3><span id="bat-badge" class="badge"></span></div>
      <div class="barre-outils">
        <div class="navigation-jour">
          <button type="button" id="bat-prec" class="bouton" aria-label="${t("jour_prec")}">‹</button>
          <input type="date" id="bat-date" aria-label="Date">
          <button type="button" id="bat-suiv" class="bouton" aria-label="${t("jour_suiv")}">›</button>
        </div>
        <div class="outils-gauche"><span class="choix-titre">${t("b_plan_de")}</span><div class="segments" id="bat-plan" role="group"></div></div>
      </div>
      <p class="bat-resume" id="bat-resume"></p>
      <div class="bat-jour">
        <div class="bat-widget"><div id="bat-w-svg"></div><p class="bat-w-heure" id="bat-w-heure"></p><p class="bat-w-action" id="bat-w-action"></p></div>
        <div>
          <div class="choix" id="bat-legende-jour"></div>
          <div class="graphique bat-g1"><canvas id="bat-g-prix" role="img" aria-label="${t("b_prix_g")}"></canvas></div>
        </div>
      </div>
      <div class="tuiles" id="bat-tuiles-jour"></div>
      <details class="plus"><summary>${t("b_mois")}</summary><div class="cadre-table libre"><table id="bat-mois" class="table-donnees"></table></div></details>
    </div>
    <div class="carte">
      <h3 class="petit-titre">${t("b_couts")}</h3>
      <p class="intro">${t("b_couts_intro")}</p>
      ${tableHTML([t("b_k_poste"), t("b_k_retenu"), t("b_k_publie"), t("b_k_source")], couts, "bat-couts")}
      <h4 class="mini-titre">${t("b_projets")}</h4>
      ${tableHTML([t("b_p_projet"), t("b_p_taille"), t("b_p_cout"), t("b_p_kwh"), t("b_p_note")], projets, "bat-projets")}
    </div>
    <div class="carte">
      <h3 class="petit-titre">${t("b_revenus")}</h3>
      <p class="intro">${t("b_revenus_intro")}</p>
      <div class="cadre-table ouvert"><table class="table-donnees texte bat-revenus" id="bat-revenus"></table></div>
    </div>
    <div class="carte">
      <h3 class="petit-titre">${t("b_eco")}</h3>
      <p class="intro">${t("b_eco_intro")}</p>
      <div class="bat-choix-eco">
        <div class="outils-gauche"><span class="choix-titre">${t("b_presets")}</span><div class="segments" id="bat-presets" role="group"></div></div>
        <div class="outils-gauche"><span class="choix-titre">${t("b_scenario")}</span><div class="segments" id="bat-scenario" role="group"></div></div>
      </div>
      <p class="note" id="bat-sc-note" hidden>${t("b_sc_tot_note")}</p>
      <div class="curseurs bat-curseurs-eco">${curseurHTML("capex", "b_capex", 150, 450, 10)}${curseurHTML("opex", "b_opex", 1, 12, 0.5)}${curseurHTML("frais", "b_frais", 0, 25, 1)}`
      + `${curseurHTML("baisse", "b_baisse", 0, 10, 0.5)}${curseurHTML("taux", "b_taux", 3, 12, 0.5)}${curseurHTML("vie", "b_vie", 10, 20, 1)}</div>
      <p class="bat-verdict" id="bat-verdict"></p>
      <div class="tuiles" id="bat-tuiles-eco"></div>
      <h4 class="mini-titre">${t("b_e_g")}</h4>
      <div class="graphique moyen"><canvas id="bat-g-eco" role="img" aria-label="${t("b_e_g")}"></canvas></div>
      <p class="note">${t("b_eco_note")}</p>
    </div>
    <div class="carte">
      <details class="plus bat-ouvert"><summary>${t("b_methode")}</summary><ul class="points">${["b_m1", "b_m2", "b_m3", "b_m4", "b_m5"].map((k) => `<li>${t(k)}</li>`).join("")}</ul></details>
      <details class="plus"><summary>${t("b_sources")}</summary><ol class="points bat-sources">${t("b_src").map(([k, txt]) => `<li>${lienSrc(k, txt)}</li>`).join("")}</ol></details>
    </div>`;
  for (const id of ["duree", "rdt", "usure"]) {                       // réglages de la batterie : nouvelle simulation au relâchement du curseur (calcul de 0,3 à 1 s)
    $("bat-" + id).addEventListener("input", (e) => { bat.p[id] = Number(e.target.value); majEtiquettes(); });
    $("bat-" + id).addEventListener("change", () => { $("bat-chiffre").classList.add("calcul"); setTimeout(() => { majTout(); $("bat-chiffre").classList.remove("calcul"); }, 20); });
  }
  for (const id of ["capex", "opex", "frais", "baisse", "taux", "vie"]) { // hypothèses financières : seul le calcul de rentabilité change
    $("bat-" + id).addEventListener("input", (e) => { bat.p[id] = Number(e.target.value); bat.preset = null; majEtiquettes(); majEco(simuler()); });
  }
  $("bat-date").addEventListener("change", (e) => { if (bat.d.jours.some((j) => j.j === e.target.value)) ouvrirBat(e.target.value); });
  const pas = (d) => { const js = bat.d.jours, i = js.findIndex((j) => j.j === bat.jour) + d; if (js[i]) ouvrirBat(js[i].j); };
  $("bat-prec").addEventListener("click", () => pas(-1));
  $("bat-suiv").addEventListener("click", () => pas(1));
  bat.construit = cleRendu();
}
const cleRendu = () => etat.langue + "|" + document.documentElement.dataset.theme + "|" + matchMedia("(prefers-color-scheme: dark)").matches;
function ouvrirBat(iso) { bat.jour = iso; location.hash = "#batterie/" + iso; }
function majEtiquettes() {
  const q = bat.p, E = bat.scenario === "tot" ? 2 : q.duree;
  const ecrire = (id, v, d) => { $(`bat-${id}-v`).textContent = v; if (d !== undefined) $(`bat-${id}-d`).textContent = d; };
  ecrire("duree", `${q.duree} h`, t("b_duree_d", { e: nombre(q.duree, 0) }));
  ecrire("rdt", `${q.rdt} %`, t("b_rdt_d", { p: 100 - q.rdt }));
  ecrire("usure", `${q.usure} €/MWh`, t("b_usure_d"));
  ecrire("capex", `${q.capex} €/kWh`, t("b_capex_d", { x: euros(q.capex * 1000 * E), e: nombre(E, 0) }));
  ecrire("opex", `${nombre(q.opex, 1)} %`, t("b_opex_d"));
  ecrire("frais", `${q.frais} %`, t("b_frais_d"));
  ecrire("baisse", `${nombre(q.baisse, 1)} %`, t("b_baisse_d"));
  ecrire("taux", `${nombre(q.taux, 1)} %`, t("b_taux_d"));
  ecrire("vie", t("b_ans", { n: q.vie }), "");
}

/* ---------------------------------------------------------------- en-tête : le chiffre, trois repères, les quatre façons de piloter */
function majHero(res) {
  const n = res.jours.length, tot = res.total;
  $("bat-avant").textContent = t("b_hero_avant", { e: nombre(res.E, 0) });
  $("bat-periode").textContent = t("b_hero_periode", { d: dateLongue(res.jours[0]), f: dateLongue(res.jours[n - 1]), n, a: euros(Math.round(res.annuel / 1000) * 1000) });
  const el = $("bat-chiffre"), cible = tot.p;
  if (!bat.compte && !matchMedia("(prefers-reduced-motion: reduce)").matches) {        // le compteur défile une seule fois, à la première visite
    bat.compte = true;
    const t0 = performance.now(), anime = (now) => { const x = Math.min(1, (now - t0) / 900); el.textContent = euros(cible * (1 - (1 - x) ** 3)); if (x < 1) requestAnimationFrame(anime); };
    requestAnimationFrame(anime);
  } else el.textContent = euros(cible);
  $("bat-stats").innerHTML = `<div><b>${pc(tot.p / tot.r)}</b><span>${t("b_st_capture")}</span></div>`
    + `<div><b>+${euros(tot.p - tot.m)}</b><span>${t("b_st_plus")} <small>(${t("b_st_plus_d")})</small></span></div>`
    + `<div><b>${nombre(res.cycles, 1)}</b><span>${t("b_st_cycles")}</span></div>`;
  $("bat-comparer").innerHTML = `<thead><tr><th>${t("b_c_strat")}</th><th>${t("b_c_gain")}</th><th>${t("b_c_part")}</th><th>${t("b_c_quoi")}</th></tr></thead><tbody>`
    + STRATS.map((s) => {
      const part = tot[s.k] / tot.r, style = s.tirets.length ? (s.k === "v" ? " points" : " tirets") : "";
      return `<tr${s.k === "p" ? ' class="meilleur"' : ""}><td><span class="nom-modele"><span class="pastille${style}" style="color:${css(s.couleur)}"></span>${t("b_s_" + s.k)}</span></td>`
        + `<td>${euros(tot[s.k])}</td><td><span class="barre-cellule"><span style="width:${(100 * part).toFixed(1)}%;background:${css(s.couleur)}"></span></span>${pc(part)}</td>`
        + `<td class="faible">${t("b_s_" + s.k + "_d")}</td></tr>`;
    }).join("") + "</tbody>";
}

/* ---------------------------------------------------------------- une journée */
function majJour(res) {
  const js = bat.d.jours, j = js.find((x) => x.j === bat.jour) || js[js.length - 1];
  bat.jour = j.j;
  const h = heuresDe(j), labels = h.map(lib), connu = Boolean(j.r), demain = !connu && j === js[js.length - 1];
  if (!connu && bat.plan === "r") bat.plan = "p";
  const pl = res.plans[j.j][bat.plan] || res.plans[j.j].p, E = res.E;
  $("bat-titre-jour").textContent = `${t("b_jour_titre")} · ${dateLongue(j.j)}`;
  $("bat-badge").textContent = demain ? t("b_demain_badge") : t("b_passe_badge");
  $("bat-badge").className = "badge" + (demain ? " fort" : "");
  $("bat-date").value = j.j; $("bat-date").min = js[0].j; $("bat-date").max = js[js.length - 1].j;
  $("bat-prec").disabled = j === js[0]; $("bat-suiv").disabled = j === js[js.length - 1];
  segments("bat-plan", STRATS.filter((s) => (s.k !== "r" || connu) && res.plans[j.j][s.k]).map((s) => [s.k, t("b_s_" + s.k + "_c")]), bat.plan, (v) => { bat.plan = v; majJour(simuler()); });
  const pa = plages(pl.achat, h), pv = plages(pl.vente, h);
  $("bat-resume").innerHTML = pa.length ? `${t("b_resume_achete", { a: `<b class="bat-c-achat">${joinEt(pa)}</b>` })} ${t("b_resume_vend", { v: `<b class="bat-c-vente">${joinEt(pv)}</b>` })}` : t("b_resume_rien");

  const cA = css("--s-eu"), cV = css("--s-cr");
  $("bat-legende-jour").innerHTML = `<span class="choix-fixe"><span class="pastille" style="color:${css("--s-tout")}"></span>${t("b_prevu")}</span>`
    + (connu ? `<span class="choix-fixe"><span class="pastille" style="color:${css("--ink")}"></span>${t("b_reel")}</span>` : "")
    + `<span class="choix-fixe"><span class="bat-carre" style="background:${cA}"></span>${t("b_achat")}</span><span class="choix-fixe"><span class="bat-carre" style="background:${cV}"></span>${t("b_vente")}</span>`;
  const o = options(12);
  o.plugins.batColonnes = { achat: pl.achat, vente: pl.vente, cA, cV };
  const ds = [{ label: t("b_prevu"), data: j.p, borderColor: css("--s-tout"), backgroundColor: css("--s-tout"), fill: false, spanGaps: true }];
  if (connu) ds.unshift({ label: t("b_reel"), data: j.r, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 2.5, fill: false });
  if (bat.plan === "m" && j.m) ds.push({ label: t("b_s_m_c"), data: j.m, borderColor: css("--s-gb"), backgroundColor: css("--s-gb"), borderWidth: 1.5, fill: false });
  if (bat.plan === "v" && j.v) ds.push({ label: t("b_s_v_c"), data: j.v, borderColor: css("--muted"), backgroundColor: css("--muted"), borderWidth: 1.5, borderDash: [2, 3], fill: false });
  o.onHover = (evt, els) => survoler(els.length ? els[0].index : null, j, pl, h, E);
  const g = dessiner("bat-g-prix", { type: "line", data: { labels, datasets: ds }, options: o, plugins: [pluginColonnes] });
  $("bat-g-prix").onmouseleave = () => { survoler(null, j, pl, h, E); g.update("none"); };
  survoler(null, j, pl, h, E);

  const rf = connu ? j.r : j.p, achete = pl.achat.reduce((a, b) => a + b, 0), vendu = pl.vente.reduce((a, b) => a + b, 0);
  const pAchat = achete ? pl.achat.reduce((s, x, i) => s + x * rf[i], 0) / achete : null, pVente = vendu ? pl.vente.reduce((s, x, i) => s + x * rf[i], 0) / vendu : null;
  const gain = gainReel(pl, rf), devin = connu ? gainReel(res.plans[j.j].r, j.r) : null;
  $("bat-tuiles-jour").innerHTML = tuile(connu ? t("b_t_gain") : t("b_t_gain_prevu"), euros(gain), connu ? t("b_t_gain_d", { x: euros(devin) }) : t("b_t_attente"))
    + tuile(t("b_t_achat"), pAchat === null ? "–" : `${nombre(pAchat, 0)} <small>€/MWh</small>`, `${nombre(achete, 2)} MWh`)
    + tuile(t("b_t_vente"), pVente === null ? "–" : `${nombre(pVente, 0)} <small>€/MWh</small>`, `${nombre(vendu, 2)} MWh`);
}
function survoler(i, j, pl, h, E) {                                  // la batterie dessinée suit l'heure survolée (par défaut : l'heure où elle est la plus pleine)
  const k = i === null ? pl.soc.indexOf(Math.max(...pl.soc)) : i, rf = j.r || j.p;
  const act = pl.achat[k] > 1e-6 ? "achat" : pl.vente[k] > 1e-6 ? "vente" : "rien";
  bat.survol = i;
  $("bat-w-svg").innerHTML = svgBatterie(pl.soc[k] / E, act);
  $("bat-w-heure").textContent = lib(h[k]);
  $("bat-w-action").textContent = (act === "achat" ? t("b_widget_achat", { x: nombre(pl.achat[k], 2), p: nombre(rf[k], 0) })
    : act === "vente" ? t("b_widget_vente", { x: nombre(pl.vente[k], 2), p: nombre(rf[k], 0) }) : t("b_widget_rien")) + " · " + t("b_widget_stock", { x: nombre(pl.soc[k], 2) });
  if (etat.graphiques["bat-g-prix"]) etat.graphiques["bat-g-prix"].draw();
}
function majMois(res) {
  const mois = {};
  res.jours.forEach((d, i) => { const m = d.slice(0, 7); mois[m] = mois[m] || { r: 0, p: 0, m: 0, v: 0 }; STRATS.forEach((s) => { mois[m][s.k] += res.gains[s.k][i]; }); });
  const nomMois = (m) => new Date(m + "-15T12:00:00").toLocaleDateString(loc(), { month: "long", year: "numeric" });
  $("bat-mois").innerHTML = `<thead><tr><th>${t("b_m_mois")}</th>${STRATS.map((s) => `<th>${t("b_s_" + s.k + "_c")}</th>`).join("")}<th>${t("b_m_capture")}</th></tr></thead><tbody>`
    + Object.entries(mois).map(([m, x]) => `<tr><td>${nomMois(m)}</td>${STRATS.map((s) => `<td${s.k === "p" ? ' class="fort"' : ""}>${euros(x[s.k])}</td>`).join("")}<td>${pc(x.p / x.r)}</td></tr>`).join("")
    + `</tbody><tfoot><tr><td>Total</td>${STRATS.map((s) => `<td>${euros(res.total[s.k])}</td>`).join("")}<td>${pc(res.total.p / res.total.r)}</td></tr></tfoot>`;
}

/* ---------------------------------------------------------------- revenus et rentabilité */
function majRevenus(res) {
  const ligne = (a, m, q, k) => `<tr><td><b>${a}</b></td><td class="nowrap">${m}</td><td>${q}${k ? ` <span class="faible">(${k.map(([c, s]) => lienSrc(c, s)).join(", ")})</span>` : ""}</td></tr>`;
  $("bat-revenus").innerHTML = `<thead><tr><th>${t("b_r_source")}</th><th>${t("b_r_montant")}</th><th>${t("b_r_quoi")}</th></tr></thead><tbody>`
    + ligne(t("b_r1"), `<b>≈ ${euros(Math.round(res.annuel / 1000) * 1000)}</b>`, t("b_r1_q"))
    + ligne(t("b_r2"), t("b_r2_m"), t("b_r2_q"), [["capa", "RTE"]])
    + ligne(t("b_r3"), t("b_r3_m"), t("b_r3_q"), [["tem", "Clean Horizon"], ["epool", "Energy Pool"]])
    + ligne(t("b_r4"), t("b_r4_m"), t("b_r4_q"), [["forsyt", "Forsyt"], ["tem", "Clean Horizon"]]) + "</tbody>";
}
function majEco(res) {
  segments("bat-presets", [["prudent", t("b_pr_prudent")], ["central", t("b_pr_central")], ["optimiste", t("b_pr_optimiste")]], bat.preset, (v) => {
    bat.preset = v; Object.assign(bat.p, PRESETS[v]);
    for (const id of Object.keys(PRESETS[v])) $("bat-" + id).value = bat.p[id];
    majEtiquettes(); majEco(simuler());
  });
  segments("bat-scenario", [["arb", t("b_sc_arb")], ["cap", t("b_sc_cap")], ["tot", t("b_sc_tot")]], bat.scenario, (v) => { bat.scenario = v; majEtiquettes(); majEco(simuler()); });
  $("bat-sc-note").hidden = bat.scenario !== "tot";
  const r = rentabilite(res), ok = r.van >= 0;
  $("bat-verdict").className = "bat-verdict " + (ok ? "ok" : "ko");
  $("bat-verdict").innerHTML = `<span class="bat-verdict-signe">${ok ? "✓" : "✕"}</span>${t(ok ? "b_verdict_ok" : "b_verdict_ko")}`;
  $("bat-tuiles-eco").innerHTML = tuile(t("b_e_invest"), euros(r.capex), t("b_capex_d", { x: `${bat.p.capex} €/kWh`, e: nombre(bat.scenario === "tot" ? 2 : res.E, 0) }))
    + tuile(t("b_e_rev"), euros(r.net1), t("b_e_rev_d"))
    + tuile(t("b_e_van"), euros(r.van), t("b_e_van_d"))
    + tuile(t("b_e_tri"), r.tri === null ? "–" : `${nombre(100 * r.tri, 1)} %`, "")
    + tuile(t("b_e_retour"), r.retour ? t("b_ans", { n: r.retour }) : t("b_e_jamais"), "");
  const o = options(20);
  o.scales.y.title.text = "€"; o.scales.y.ticks.callback = (v) => nombre(v, 0);
  o.plugins.tooltip.callbacks = { label: (c) => ` ${euros(c.parsed.y)}` };
  const pos = css("--ok"), neg = css("--echec");
  dessiner("bat-g-eco", { type: "bar", data: { labels: r.cumul.map((_, i) => (i ? t("b_annee", { n: i }) : "0")), datasets: [{ label: "€", data: r.cumul, backgroundColor: r.cumul.map((c) => (c >= 0 ? pos : neg)), borderRadius: 4, categoryPercentage: 0.8, barPercentage: 0.9 }] }, options: o });
}

/* ---------------------------------------------------------------- rendu */
function majTout() {
  const res = simuler();
  majHero(res); majJour(res); majMois(res); majRevenus(res); majEco(res);
}
function rendreBatterie() {
  if (bat.statut !== "pret") {
    if (bat.statut === "absent") { $("batterie").innerHTML = `<p class="carte">${t("b_absent")}</p>`; return; }
    $("batterie").innerHTML = `<p class="carte">${t("b_chargement")}</p>`;
    chargerBatterie(() => { if (etat.onglet === "batterie") rendreBatterie(); });
    return;
  }
  const jourAncre = location.hash.replace("#", "").split("/")[1];
  if (jourAncre && bat.d.jours.some((j) => j.j === jourAncre)) bat.jour = jourAncre;
  if (bat.construit !== cleRendu() || !$("bat-chiffre")) { construire(); majEtiquettes(); majTout(); return; }
  majJour(simuler());                                                  // changement de jour (ancre) : seule la carte du jour est redessinée
}
RENDUS.batterie = rendreBatterie;
