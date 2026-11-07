/* Onglet « Battre le marché (bonus) » : notre prévision exprimée dans les produits que négocient les marchés à terme (Base = moyenne de la journée,
   Peak = 8 h-20 h du lundi au vendredi), sa précision passée, la règle d'une stratégie de trading, et où trouver les prix des contrats à terme.
   Données : data/batterie.json (prix horaires réels et prévus), chargées par chargerBatterie() de batterie.js. */
"use strict";

const LIENS_MK = {
  eex_site: "https://www.eex.com/en/market-data/power/futures",
  eex_eod: "https://webshop.eex-group.com/data-type/eex-french-power-futures-eod",
  eex_ds: "https://www.eex.com/en/market-data/eex-group-datasource/end-of-day-prices",
  databento: "https://databento.com/futures/commodity/energy/electricity",
  ice: "https://www.ice.com/products/57609947/French-Power-Financial-Base-Futures",
  eex_jour: "https://mondovisione.com/media-and-resources/news/eex-first-exchange-trade-in-spanish-power-futures-new-day-and-weekend-contrac-2015227/",
  eex_fut: "https://www.eex.com/en/markets/power/power-futures",
  epex_idx: "https://www.epexspot.com/sites/default/files/download_center_files/EPEX%20SPOT%20Indices%202019-05_final.pdf",
};
Object.assign(TXT.fr, {
  o_marches: "Battre le marché (bonus)",
  mk_titre: "Peut-on gagner de l'argent avec notre prévision ?",
  mk_intro: "Le prix de demain est fixé à 12 h 45 par l'enchère day-ahead. Mais avant l'enchère, on peut déjà acheter ou vendre ce prix à l'avance, grâce à des contrats à terme d'un jour, échangés en bourse (EEX, ICE Endex). À la fin, ces contrats sont payés au prix de l'enchère. Si notre prévision est plus juste que le prix auquel ces contrats s'échangent le matin, on peut en tirer un gain.",
  mk_juste: "Notre prix juste pour le {d}",
  mk_base: "Base", mk_base_d: "moyenne des 24 heures", mk_peak: "Peak", mk_peak_d: "moyenne de 8 h à 20 h, du lundi au vendredi", mk_peak_we: "pas de produit Peak le week-end",
  mk_fourchette: "fourchette 80 % : {a} à {b} €/MWh", mk_reel: "Prix réel de l'enchère", mk_reel_d: "notre écart : {e} €/MWh", mk_reel_attente: "publié vers 12 h 45",
  mk_lecture: "Comment lire : si le contrat Base de ce jour s'échange sous {bas} €/MWh, notre prévision penche nettement pour l'achat ; au-dessus de {haut} €/MWh, pour la vente ; entre les deux, pas de signal clair.",
  mk_regle: "La règle du jeu, avec des chiffres",
  mk_regle_txt: "Exemple : le matin, le contrat Base de demain s'échange à 95 €/MWh ; notre prix juste est 105 €/MWh. On achète 1 MW pendant 24 heures, soit 24 MWh à 95 €. Si l'enchère de 12 h 45 donne 102 €/MWh, le contrat rapporte (102 − 95) × 24 = 168 €. Si elle donne 90 €/MWh, il coûte (90 − 95) × 24 = −120 €. On gagne en moyenne seulement si notre prévision est plus proche du vrai prix que le prix du contrat, après les frais de bourse et le dépôt de garantie.",
  mk_precision: "Ce que valent nos prévisions Base et Peak",
  mk_precision_txt: "Erreur moyenne de notre prévision du prix moyen de la journée, comparée au repère « même prix que la veille ». Le vrai juge serait le prix des contrats à terme le matin même : c'est l'objet de la simulation ci-dessous, dès que ces prix seront disponibles.",
  mk_p_periode: "Période", mk_p_jours: "Jours", mk_p_base: "Base : notre erreur", mk_p_base_v: "Base : veille", mk_p_peak: "Peak : notre erreur", mk_p_peak_v: "Peak : veille", mk_p_sens: "Hausse ou baisse bien prévue", mk_p_biais: "Biais Base",
  mk_tout: "Depuis le 1er janvier", mk_90: "90 derniers jours", mk_30: "30 derniers jours",
  mk_g: "Prix Base de chaque jour (€/MWh), 60 derniers jours", mk_g_reel: "réel (enchère)", mk_g_prevu: "notre prévision", mk_g_veille: "veille",
  mk_simu: "Simulation de trading", mk_simu_badge: "en attente des prix du marché à terme",
  mk_simu_txt: "Dès que nous aurons les prix des contrats journaliers, cette section affichera chaque jour le prix du contrat Base vers 11 h 30, notre prix juste, la position prise (achat ou vente de 1 MW) et le gain ou la perte une fois le prix de l'enchère connu, avec le total depuis le début. Pour une comparaison honnête, il faut le prix du contrat à la même heure que notre prévision : le prix de clôture de la veille au soir avantagerait notre modèle, qui dispose de la météo du matin.",
  mk_sources: "Où trouver les prix des contrats à terme ?",
  mk_s_source: "Source", mk_s_quoi: "Ce qu'on y trouve", mk_s_cout: "Coût et conditions", mk_s_nous: "Pour ce projet",
  mk_s1: "Site d'EEX (pages publiques)", mk_s1_q: "Quelques prix récents, pas d'historique téléchargeable", mk_s1_c: "Gratuit, mais la republication systématique des données est interdite sans licence", mk_s1_n: "consultation seulement",
  mk_s2: "EEX DataSource (France, fin de journée)", mk_s2_q: "Prix de règlement, plus hauts et plus bas, volumes, historique, en CSV chaque soir vers 22 h", mk_s2_c: "À partir de 85 € par mois, abonnement annuel ; usage interne ou externe à choisir", mk_s2_n: "possible, à budgéter",
  mk_s3: "Databento (distributeur agréé)", mk_s3_q: "Contrats ICE Endex « French Power Financial Base / Peak Daily » et contrats EEX, historiques et transactions", mk_s3_c: "Paiement à l'usage ; 125 $ de crédits offerts à l'ouverture d'un compte", mk_s3_n: "piste la plus simple",
  mk_s4: "Terminaux Bloomberg ou LSEG (Refinitiv)", mk_s4_q: "Historiques complets des contrats EEX et ICE", mk_s4_c: "Par l'école, si elle y a accès", mk_s4_n: "à demander à emlyon",
  mk_s5: "Investing.com", mk_s5_q: "Une série « French Base Day » incomplète", mk_s5_c: "Réutilisation interdite sans autorisation écrite", mk_s5_n: "exclu",
  mk_produits: "Les contrats qui existent",
  mk_c_produit: "Contrat", mk_c_bourse: "Bourse", mk_c_livre: "Ce qui est couvert", mk_c_regle: "Payé au", mk_c_fin: "Dernier jour de cotation",
  mk_c1: "French Power Day Base / Peak", mk_c1_l: "un jour : 24 h (Base) ou 8 h-20 h en semaine (Peak) ; Base depuis 2015, Peak depuis 2016",
  mk_c2: "French Power Weekend Base / Peak", mk_c2_l: "samedi et dimanche",
  mk_c3: "French Power Financial Base / Peak Daily", mk_c3_l: "un jour",
  mk_c4: "Mois, trimestre, année", mk_c4_l: "couverture longue (les plus échangés)",
  mk_regle_prix: "prix de l'enchère day-ahead France (moyenne des quarts d'heure)", mk_fin_jour: "jour de l'enchère (veille de la livraison)", mk_fin_ve: "vendredi, jour de l'enchère", mk_fin_av: "avant le début de la période",
  mk_limites: "Limites",
  mk_l1: "Les contrats d'un jour sont beaucoup moins échangés que les contrats mensuels ou annuels : un prix « affiché » n'est pas forcément un prix auquel on peut acheter de gros volumes.",
  mk_l2: "Trader demande d'être membre d'une bourse ou de passer par un courtier, de déposer une garantie et de payer des frais : cette page reste une simulation sans argent réel.",
  mk_l3: "Prévisions avant le 29/10/2026 : test « réappris chaque jour » (même méthode que le service) ; ensuite, prévisions publiées en direct. Prix à l'heure, moyennés sur la journée.",
  mk_aucun: "Données indisponibles.",
});
Object.assign(TXT.en, {
  o_marches: "Beat the market (bonus)",
  mk_titre: "Can our forecast make money?",
  mk_intro: "Tomorrow's price is set at 12:45 by the day-ahead auction. But before the auction, this price can already be bought or sold in advance through one-day futures traded on exchanges (EEX, ICE Endex). In the end, these contracts are paid at the auction price. If our forecast is more accurate than the price at which these contracts trade in the morning, it can be turned into a gain.",
  mk_juste: "Our fair price for {d}",
  mk_base: "Base", mk_base_d: "average of the 24 hours", mk_peak: "Peak", mk_peak_d: "average from 8:00 to 20:00, Monday to Friday", mk_peak_we: "no Peak product at weekends",
  mk_fourchette: "80% range: {a} to {b} €/MWh", mk_reel: "Actual auction price", mk_reel_d: "our error: {e} €/MWh", mk_reel_attente: "published around 12:45",
  mk_lecture: "How to read it: if the Base contract for that day trades below {bas} €/MWh, our forecast clearly leans towards buying; above {haut} €/MWh, towards selling; in between, no clear signal.",
  mk_regle: "The rules of the game, with numbers",
  mk_regle_txt: "Example: in the morning, tomorrow's Base contract trades at 95 €/MWh; our fair price is 105 €/MWh. We buy 1 MW for 24 hours, i.e. 24 MWh at €95. If the 12:45 auction gives 102 €/MWh, the contract earns (102 − 95) × 24 = €168. If it gives 90 €/MWh, it costs (90 − 95) × 24 = −€120. We only win on average if our forecast is closer to the real price than the contract price, after exchange fees and margin.",
  mk_precision: "How good are our Base and Peak forecasts?",
  mk_precision_txt: "Mean error of our forecast of the day's average price, compared with the \"same price as yesterday\" benchmark. The real judge would be the futures price that same morning: that is the purpose of the simulation below, once those prices are available.",
  mk_p_periode: "Period", mk_p_jours: "Days", mk_p_base: "Base: our error", mk_p_base_v: "Base: yesterday", mk_p_peak: "Peak: our error", mk_p_peak_v: "Peak: yesterday", mk_p_sens: "Rise or fall correctly called", mk_p_biais: "Base bias",
  mk_tout: "Since 1 January", mk_90: "Last 90 days", mk_30: "Last 30 days",
  mk_g: "Base price of each day (€/MWh), last 60 days", mk_g_reel: "actual (auction)", mk_g_prevu: "our forecast", mk_g_veille: "yesterday",
  mk_simu: "Trading simulation", mk_simu_badge: "waiting for futures prices",
  mk_simu_txt: "Once we have daily futures prices, this section will show every day the Base contract price at around 11:30, our fair price, the position taken (buy or sell 1 MW) and the gain or loss once the auction price is known, with the running total. For a fair comparison, the contract price must be taken at the same time as our forecast: the previous evening's settlement price would favour our model, which has the morning weather.",
  mk_sources: "Where to find futures prices?",
  mk_s_source: "Source", mk_s_quoi: "What it offers", mk_s_cout: "Cost and conditions", mk_s_nous: "For this project",
  mk_s1: "EEX website (public pages)", mk_s1_q: "A few recent prices, no downloadable history", mk_s1_c: "Free, but systematic republication of the data is not allowed without a licence", mk_s1_n: "viewing only",
  mk_s2: "EEX DataSource (France, end of day)", mk_s2_q: "Settlement, high and low prices, volumes, history, as CSV every evening around 22:00", mk_s2_c: "From €85 per month, annual subscription; internal or external use to choose", mk_s2_n: "possible, needs a budget",
  mk_s3: "Databento (licensed distributor)", mk_s3_q: "ICE Endex \"French Power Financial Base / Peak Daily\" and EEX contracts, history and trades", mk_s3_c: "Pay as you go; $125 of free credits when opening an account", mk_s3_n: "simplest option",
  mk_s4: "Bloomberg or LSEG (Refinitiv) terminals", mk_s4_q: "Full history of EEX and ICE contracts", mk_s4_c: "Through the school, if it has access", mk_s4_n: "to ask emlyon",
  mk_s5: "Investing.com", mk_s5_q: "An incomplete \"French Base Day\" series", mk_s5_c: "Reuse forbidden without written permission", mk_s5_n: "excluded",
  mk_produits: "The contracts that exist",
  mk_c_produit: "Contract", mk_c_bourse: "Exchange", mk_c_livre: "What it covers", mk_c_regle: "Paid at", mk_c_fin: "Last trading day",
  mk_c1: "French Power Day Base / Peak", mk_c1_l: "one day: 24 h (Base) or 8:00-20:00 on weekdays (Peak); Base since 2015, Peak since 2016",
  mk_c2: "French Power Weekend Base / Peak", mk_c2_l: "Saturday and Sunday",
  mk_c3: "French Power Financial Base / Peak Daily", mk_c3_l: "one day",
  mk_c4: "Month, quarter, year", mk_c4_l: "long hedges (the most traded)",
  mk_regle_prix: "French day-ahead auction price (average of the quarter-hours)", mk_fin_jour: "auction day (day before delivery)", mk_fin_ve: "Friday, auction day", mk_fin_av: "before the period starts",
  mk_limites: "Limits",
  mk_l1: "One-day contracts are traded much less than monthly or yearly ones: a \"displayed\" price is not necessarily a price at which large volumes can be bought.",
  mk_l2: "Trading requires being an exchange member or going through a broker, posting margin and paying fees: this page remains a simulation without real money.",
  mk_l3: "Forecasts before 29/10/2026: \"retrained every day\" test (same method as the service); afterwards, forecasts published live. Hourly prices, averaged over the day.",
  mk_aucun: "Data unavailable.",
});

const mk = { construit: null };
const lienMk = (k, txt) => `<a href="${LIENS_MK[k]}" target="_blank" rel="noopener">${txt}</a>`;
const moy = (a) => { const v = a.filter((x) => x !== null && x !== undefined); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };

function produitsJour(j) {                                           // Base et Peak d'un jour : prévu (p), réel (r), veille (v)
  const h = heuresDe(j).map(Number), pk = h.map((x) => x >= 8 && x < 20), semaine = dateObj(j.j).getDay() % 6 !== 0;
  const peak = (s) => (s && semaine ? moy(s.filter((_, i) => pk[i])) : null);
  return { j: j.j, semaine, bp: moy(j.p), br: j.r ? moy(j.r) : null, bv: j.v ? moy(j.v) : null, pp: peak(j.p), pr: peak(j.r), pv: peak(j.v) };
}
function quantile(a, q) { const s = [...a].sort((x, y) => x - y), i = (s.length - 1) * q, b = Math.floor(i); return s[b] + (s[Math.min(b + 1, s.length - 1)] - s[b]) * (i - b); }
function statsPeriode(P) {
  const mae = (a, b) => moy(P.map((x) => (x[a] !== null && x[b] !== null ? Math.abs(x[a] - x[b]) : null)));
  const sens = moy(P.filter((x) => x.bv !== null).map((x) => (Math.sign(x.bp - x.bv) === Math.sign(x.br - x.bv) ? 1 : 0)));
  return { n: P.length, mb: mae("bp", "br"), mbv: mae("bv", "br"), mp: mae("pp", "pr"), mpv: mae("pv", "pr"), sens, biais: moy(P.map((x) => x.bp - x.br)) };
}

function rendreMarches() {
  const el = $("marches");
  if (bat.statut !== "pret") {
    if (bat.statut === "absent") { el.innerHTML = `<p class="carte">${t("mk_aucun")}</p>`; return; }
    el.innerHTML = `<p class="carte">${t("b_chargement")}</p>`;
    chargerBatterie(() => { if (etat.onglet === "marches") rendreMarches(); });
    return;
  }
  if (mk.construit === cleRendu() && el.querySelector("#mk-g")) return;
  const tous = bat.d.jours.map(produitsJour), connus = tous.filter((x) => x.br !== null), dernier = tous[tous.length - 1];
  const erreurs = connus.slice(-90).map((x) => x.br - x.bp), q10 = quantile(erreurs, 0.1), q90 = quantile(erreurs, 0.9);
  const bas = dernier.bp + q10, haut = dernier.bp + q90;
  const lignes = [["mk_tout", connus], ["mk_90", connus.slice(-90)], ["mk_30", connus.slice(-30)]].map(([k, P]) => {
    const s = statsPeriode(P);
    return `<tr><td>${t(k)}</td><td>${s.n}</td><td class="fort">${nombre(s.mb)}</td><td>${nombre(s.mbv)}</td><td class="fort">${nombre(s.mp)}</td><td>${nombre(s.mpv)}</td><td>${pc(s.sens)}</td><td>${signe(s.biais)}</td></tr>`;
  }).join("");
  const sources = [["mk_s1", "eex_site"], ["mk_s2", "eex_eod"], ["mk_s3", "databento"], ["mk_s4", null], ["mk_s5", null]]
    .map(([k, l]) => `<tr><td><b>${l ? lienMk(l, t(k)) : t(k)}</b></td><td>${t(k + "_q")}</td><td>${t(k + "_c")}</td><td class="nowrap">${t(k + "_n")}</td></tr>`).join("");
  const produits = [["mk_c1", "EEX", "mk_c1_l", "mk_fin_jour", "eex_jour"], ["mk_c2", "EEX", "mk_c2_l", "mk_fin_ve", "eex_fut"], ["mk_c3", "ICE Endex", "mk_c3_l", null, "ice"], ["mk_c4", "EEX, ICE Endex", "mk_c4_l", "mk_fin_av", "eex_fut"]]
    .map(([k, b, l, f, s]) => `<tr><td><b>${lienMk(s, t(k))}</b></td><td class="nowrap">${b}</td><td>${t(l)}</td><td>${t("mk_regle_prix")}</td><td>${f ? t(f) : "–"}</td></tr>`).join("");
  const unite = ` <small>€/MWh</small>`;
  el.innerHTML = `
    <div class="carte">
      <h3 class="petit-titre">${t("mk_titre")}</h3>
      <p class="intro">${t("mk_intro")}</p>
      <h4 class="mini-titre">${t("mk_juste", { d: dateLongue(dernier.j) })}</h4>
      <div class="tuiles">
        <div class="tuile principal"><div class="libelle">${t("mk_base")} · ${t("mk_base_d")}</div><div class="valeur">${nombre(dernier.bp)}${unite}</div><div class="detail">${t("mk_fourchette", { a: nombre(bas, 0), b: nombre(haut, 0) })}</div></div>
        <div class="tuile"><div class="libelle">${t("mk_peak")} · ${t("mk_peak_d")}</div><div class="valeur">${dernier.pp === null ? "–" : nombre(dernier.pp) + unite}</div><div class="detail">${dernier.semaine ? "" : t("mk_peak_we")}</div></div>
        <div class="tuile"><div class="libelle">${t("mk_reel")}</div><div class="valeur">${dernier.br === null ? "–" : nombre(dernier.br) + unite}</div><div class="detail">${dernier.br === null ? t("mk_reel_attente") : t("mk_reel_d", { e: signe(dernier.bp - dernier.br) })}</div></div>
      </div>
      <p class="mk-lecture">${t("mk_lecture", { bas: nombre(bas, 0), haut: nombre(haut, 0) })}</p>
      <details class="plus"><summary>${t("mk_regle")}</summary><p class="note mk-regle">${t("mk_regle_txt")}</p></details>
    </div>
    <div class="carte">
      <h3 class="petit-titre">${t("mk_precision")}</h3>
      <p class="intro">${t("mk_precision_txt")}</p>
      <div class="cadre-table ouvert"><table class="table-donnees"><thead><tr><th>${t("mk_p_periode")}</th><th>${t("mk_p_jours")}</th><th>${t("mk_p_base")}</th><th>${t("mk_p_base_v")}</th><th>${t("mk_p_peak")}</th><th>${t("mk_p_peak_v")}</th><th>${t("mk_p_sens")}</th><th>${t("mk_p_biais")}</th></tr></thead><tbody>${lignes}</tbody></table></div>
      <h4 class="mini-titre">${t("mk_g")}</h4>
      <div class="choix" id="mk-legende"></div>
      <div class="graphique moyen"><canvas id="mk-g" role="img" aria-label="${t("mk_g")}"></canvas></div>
    </div>
    <div class="carte">
      <div class="titre-jour"><h3 class="petit-titre">${t("mk_simu")}</h3><span class="badge">${t("mk_simu_badge")}</span></div>
      <p class="intro">${t("mk_simu_txt")}</p>
    </div>
    <div class="carte">
      <h3 class="petit-titre">${t("mk_sources")}</h3>
      <div class="cadre-table ouvert"><table class="table-donnees texte mk-sources"><thead><tr><th>${t("mk_s_source")}</th><th>${t("mk_s_quoi")}</th><th>${t("mk_s_cout")}</th><th>${t("mk_s_nous")}</th></tr></thead><tbody>${sources}</tbody></table></div>
      <h4 class="mini-titre">${t("mk_produits")}</h4>
      <div class="cadre-table ouvert"><table class="table-donnees texte mk-produits"><thead><tr><th>${t("mk_c_produit")}</th><th>${t("mk_c_bourse")}</th><th>${t("mk_c_livre")}</th><th>${t("mk_c_regle")}</th><th>${t("mk_c_fin")}</th></tr></thead><tbody>${produits}</tbody></table></div>
      <p class="note">Peak : ${lienMk("epex_idx", "EPEX SPOT, définition des indices")} · ${lienMk("eex_ds", "EEX DataSource")} · ${lienMk("ice", "ICE Endex")}</p>
    </div>
    <div class="carte">
      <h3 class="petit-titre">${t("mk_limites")}</h3>
      <ul class="points">${["mk_l1", "mk_l2", "mk_l3"].map((k) => `<li>${t(k)}</li>`).join("")}</ul>
    </div>`;
  const G = connus.slice(-60), series = [["mk_g_reel", "br", "--ink", [], 2.5], ["mk_g_prevu", "bp", "--s-tout", [], 2], ["mk_g_veille", "bv", "--muted", [2, 3], 1.5]];
  $("mk-legende").innerHTML = series.map(([k, , c, d]) => `<span class="choix-fixe"><span class="pastille${d.length ? " points" : ""}" style="color:${css(c)}"></span>${t(k)}</span>`).join("");
  dessiner("mk-g", { type: "line", data: { labels: G.map((x) => dateCourte(x.j)), datasets: series.map(([k, c2, c, d, w]) => ({ label: t(k), data: G.map((x) => x[c2]), borderColor: css(c), backgroundColor: css(c), borderDash: d, borderWidth: w, fill: false })) }, options: options(10), plugins: [curseur] });
  mk.construit = cleRendu();
}
RENDUS.marches = rendreMarches;
