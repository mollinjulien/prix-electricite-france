/* Onglet « 7 jours » (17/11/2026, refait le même jour à la demande de Julien) : lit data/semaine.json.
   Deux vues : « Prévision » (les 7 jours sur une ligne, la semaine heure par heure, le détail d'un jour à l'heure ou au quart d'heure, un tableau jour par jour)
   et « Performance » (erreur selon l'horizon, contre deux repères naïfs, au fil du temps, l'évolution de la prévision d'un jour vu 7, 6 ... 1 jour avant, jours difficiles).
   Plus de fourchette (Julien : on ne sait pas à quel niveau de confiance elle correspond). S'appuie sur les utilitaires d'app.js. Site anonymisé : ni modèle, ni source. */
window.SEMAINE = (() => {
  let S = null, demande = false, charge = 0;
  const E = { vue: "prevision", k: 0, pas: "heure", per: "2026", ppas: "heure", hz: { 1: true, 2: true, 4: true, 7: true }, cible: null, em: null, bande: false };
  const EM = () => (S.emissions && S.emissions.length ? S.emissions[E.em === null ? S.emissions.length - 1 : E.em] : S);   // émission affichée (la dernière par défaut)
  const LIB_B = () => L("Fourchette à 80 % (8 cas sur 10)", "80 % range (8 cases in 10)");
  const L = (fr, en) => (etat.langue === "fr" ? fr : en);
  const HS = [1, 2, 3, 4, 5, 6, 7];
  const HZ = (h) => L("J+", "D+") + h;
  const vide = (v) => v === null || v === undefined;
  const moy = (a) => { const v = (a || []).filter((x) => !vide(x)); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
  const pad = (h) => String(h).padStart(2, "0");
  const heure = (h) => pad(h) + (etat.langue === "fr" ? " h" : ":00");
  const heuresDe = (j) => j.heures || j.hr || [...Array((j.prix || j.r).length).keys()];
  const couleurH = (h) => css("--hz-" + h);
  const euros = (v, d = 1) => `${nombre(v, d)} <small>€/MWh</small>`;
  const imin = (a) => a.reduce((b, x, i) => (vide(x) ? b : b < 0 || x < a[b] ? i : b), -1);
  const imax = (a) => a.reduce((b, x, i) => (vide(x) ? b : b < 0 || x > a[b] ? i : b), -1);
  const tranche = (j, a, b) => moy(j.prix.filter((_, i) => heuresDe(j)[i] >= a && heuresDe(j)[i] < b));
  const pastH = (h) => `<span class="pastille" style="color:${couleurH(h)}"></span>`;
  const pastR = () => `<span class="pastille" style="color:${css("--ink")}"></span>`;

  function dsBande(bas, haut) {                                        // fourchette : aire entre le bas et le haut (le bas est une série cachée)
    return [{ label: "_bas", data: bas, borderWidth: 0, pointRadius: 0, pointHoverRadius: 0, fill: false },
            { label: LIB_B(), data: haut, borderWidth: 0, pointRadius: 0, pointHoverRadius: 0, backgroundColor: css("--bande"), borderColor: css("--bande"), fill: "-1" }];
  }
  function infobulleBande(o, bas, haut) {                              // l'infobulle montre les deux bornes de la fourchette sur une ligne
    o.plugins.tooltip.filter = (it) => !it.dataset.label.startsWith("_") && !vide(it.parsed.y);
    o.plugins.tooltip.callbacks.label = (c) => (c.dataset.label === LIB_B() ? ` ${LIB_B()}${etat.langue === "fr" ? " : " : ": "}${nombre(bas[c.dataIndex])} – ${nombre(haut[c.dataIndex])} €/MWh`
      : ` ${c.dataset.label}${etat.langue === "fr" ? " : " : ": "}${nombre(c.parsed.y)} €/MWh`);
  }
  const caseBande = () => `<div class="choix"><label class="choix-item"><input type="checkbox" class="sem-bande"${E.bande ? " checked" : ""}><span class="pastille bande"></span><span>${LIB_B()}</span></label></div>`;

  /* ------------------------------------------------------------ vue Prévision */
  function carteJour(j, k) {
    const m = moy(j.prix), r = j.reel ? moy(j.reel) : null, a = imin(j.prix), b = imax(j.prix), hs = heuresDe(j);
    return `<button type="button" class="sem-jour" data-k="${k}" aria-pressed="${k === E.k}" style="--c:${couleurH(j.h)}">`
      + `<span class="sem-hz">${HZ(j.h)}</span><span class="sem-date">${dateMoyenne(j.jour)}</span>`
      + `<span class="sem-prix">${nombre(m)}</span>`
      + `<span class="sem-mm">${L("min", "min")} ${heure(hs[a])}</span><span class="sem-mm">${L("max", "max")} ${heure(hs[b])}</span>`
      + (r !== null ? `<span class="sem-reel">${L("marché", "market")} ${nombre(r)}</span>` : "") + `</button>`;
  }
  const zone = {                                                       // jour choisi surligné sur la courbe de la semaine
    id: "zone",
    beforeDatasetsDraw(chart, args, o) {
      if (!o || o.a === undefined) return;
      const x = chart.scales.x, { top, bottom } = chart.chartArea, ctx = chart.ctx;
      const x0 = x.getPixelForValue(o.a) - (o.a ? 0 : 0), x1 = x.getPixelForValue(o.b);
      ctx.save(); ctx.fillStyle = css("--surbrillance"); ctx.fillRect(x0, top, x1 - x0, bottom - top); ctx.restore();
    },
  };
  function courbeSemaine() {
    const J = EM().jours, lab = [], prix = [], reel = [], qui = [], debut = [], bas = [], haut = [];
    J.forEach((j, k) => { debut.push(prix.length); j.prix.forEach((p, i) => { lab.push(i === 0 ? dateMoyenne(j.jour) : ""); prix.push(p); reel.push(j.reel ? j.reel[i] : null); qui.push([k, i]); bas.push(j.bas ? j.bas[i] : null); haut.push(j.haut ? j.haut[i] : null); }); });
    debut.push(prix.length);
    const o = options(8, true);
    const court = (i) => dateObj(J[qui[i][0]].jour).toLocaleDateString(loc(), { weekday: "short", day: "numeric" });
    o.scales.x.ticks = { ...o.scales.x.ticks, autoSkip: false, maxRotation: 0, callback: (v, i) => (lab[i] ? (innerWidth < 600 ? court(i) : lab[i]) : null) };
    o.scales.x.grid = { display: true, drawTicks: false, color: (c) => (lab[c.index] ? css("--grid") : "transparent") };
    o.plugins.tooltip.callbacks.title = (it) => { const [k, i] = qui[it[0].dataIndex], j = J[k]; return `${dateMoyenne(j.jour)} · ${heure(heuresDe(j)[i])} · ${HZ(j.h)}`; };
    o.plugins.zone = { a: debut[E.k], b: debut[E.k + 1] - 1 };
    o.onClick = (evt, els, chart) => { const p = chart.getElementsAtEventForMode(evt, "index", { intersect: false }, false); if (p.length) choisir(qui[p[0].index][0]); };
    infobulleBande(o, bas, haut);
    const ds = E.bande ? dsBande(bas, haut) : [];
    ds.push({ label: L("Prix prévu", "Forecast price"), data: prix, borderColor: couleurH(1), backgroundColor: couleurH(1), fill: false, segment: { borderColor: (c) => couleurH(J[qui[c.p0DataIndex][0]].h) } });
    if (reel.some((x) => !vide(x))) ds.push({ label: L("Prix du marché", "Market price"), data: reel, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 2, fill: false });
    dessiner("sem-g", { type: "line", data: { labels: lab.map((x, i) => i), datasets: ds }, options: o, plugins: [curseur, zone] });
  }
  function serieJour(j, pas) {                                          // prévu et marché d'un jour, à l'heure ou au quart d'heure
    const hs = heuresDe(j);
    if (pas === "heure") return { labels: hs.map(heure), p: j.prix, r: j.reel, b: j.bas, hh: j.haut, quart: false };
    const jd = typeof jourDe === "function" ? jourDe(j.jour) : null;
    const etendre = (a) => (a ? a.flatMap((x) => [x, x, x, x]) : null);
    if (jd && jd.heures && jd.heures.length === 4 * hs.length) {
      const c = j.h === 1 ? principalDe(jd) : null;
      const q = Boolean(c && jd[c]);
      return { labels: jd.heures, p: q ? jd[c] : etendre(j.prix), r: jd.reel || null, b: q && jd.bas ? jd.bas : etendre(j.bas), hh: q && jd.haut ? jd.haut : etendre(j.haut), quart: q };
    }
    return { labels: hs.flatMap((h) => ["00", "15", "30", "45"].map((m) => pad(h) + ":" + m)), p: etendre(j.prix), r: null, b: etendre(j.bas), hh: etendre(j.haut), quart: false };
  }
  function detailJour() {
    const j = EM().jours[E.k], s = serieJour(j, E.pas), R = s.r && s.r.some((x) => !vide(x)) ? s.r : null;
    const a = imin(s.p), b = imax(s.p);
    let h = `<thead><tr><th>${L("Heure", "Time")}</th><th>${pastH(j.h)} ${L("Prévu", "Forecast")}</th>${R ? `<th>${pastR()} ${L("Marché", "Market")}</th><th>${L("Écart", "Gap")}</th>` : ""}</tr></thead><tbody>`;
    s.labels.forEach((lab, i) => {
      const k = i === a ? "mn" : i === b ? "mx" : "";
      h += `<tr data-i="${i}"><td>${lab}</td><td class="${k}">${nombre(s.p[i])}</td>${R ? `<td class="reel">${nombre(R[i])}</td>${celluleEcart(s.p[i], R[i])}` : ""}</tr>`;
    });
    const P = R ? s.p.map((p, i) => [p, R[i]]).filter(([p, r]) => !vide(p) && !vide(r)) : [];
    h += `</tbody><tfoot><tr><td>${L("Moyenne", "Average")}</td><td>${nombre(moy(s.p))}</td>${R ? `<td class="reel">${nombre(moy(R))}</td><td>${P.length ? signe(moy(P.map(([p, r]) => p - r))) : "–"}</td>` : ""}</tr>`
      + (P.length ? `<tr><td>${L("Erreur moyenne", "Mean error")}</td><td>–</td><td class="reel">–</td><td>${nombre(moy(P.map(([p, r]) => Math.abs(p - r))), 2)}</td></tr>` : "") + `</tfoot>`;
    $("sem-jt").innerHTML = h;
    collerEntetes($("sem-jt"));
    const ds = E.bande && s.b && s.hh ? dsBande(s.b, s.hh) : [];
    if (R) ds.push(dsMarche(R));
    ds.push({ label: `${L("Prévu", "Forecast")} ${HZ(j.h)}`, data: s.p, borderColor: couleurH(j.h), backgroundColor: degrade(couleurH(j.h)), fill: "start", stepped: E.pas === "quart" && !s.quart ? "middle" : false, cubicInterpolationMode: "monotone" });
    const oj = options(13);
    if (s.b && s.hh) infobulleBande(oj, s.b, s.hh);
    lier(dessiner("sem-jg", { type: "line", data: { labels: s.labels, datasets: ds }, options: oj, plugins: [curseur] }), "sem-jt");
    const n = [];
    if (E.pas === "quart" && !s.quart) n.push(L(`De J+2 à J+7 la prévision est faite heure par heure : au quart d'heure, le même prix est donné pour les 4 quarts de l'heure.`,
      `From D+2 to D+7 the forecast is hourly: at quarter-hour resolution the same price is given for the 4 quarters of the hour.`));
    if (j.h === 1) n.push(L(`J+1 : la prévision de l'onglet « Prévision ».`, `D+1: the forecast of the “Forecast” tab.`));
    if (!R) n.push(L("Prix du marché pas encore connu (publié la veille vers 13 h).", "Market price not known yet (published the day before around 1 pm)."));
    $("sem-jn").textContent = n.join(" ");
  }
  function tableSemaine() {
    const tete = [L("Jour", "Day"), L("Horizon", "Horizon"), L("Moyenne", "Average"), L("Nuit (0-8 h)", "Night (0-8)"), L("Journée (8-20 h)", "Day (8-20)"),
      L("Soir (20-24 h)", "Evening (20-24)"), L("Heure la moins chère", "Cheapest hour"), L("Heure la plus chère", "Dearest hour"), L("Marché", "Market"), L("Écart", "Gap")];
    const lignes = EM().jours.map((j, k) => {
      const p = j.prix, a = imin(p), b = imax(p), hs = heuresDe(j), r = j.reel ? moy(j.reel) : null;
      return `<tr data-k="${k}" class="cliquable${k === E.k ? " actif" : ""}"><th scope="row">${dateMoyenne(j.jour)}</th><td>${pastH(j.h)} ${HZ(j.h)}</td><td class="num"><strong>${nombre(moy(p))}</strong></td>`
        + `<td class="num">${nombre(tranche(j, 0, 8))}</td><td class="num">${nombre(tranche(j, 8, 20))}</td><td class="num">${nombre(tranche(j, 20, 24))}</td>`
        + `<td class="num">${heure(hs[a])} · ${nombre(p[a], 0)}</td><td class="num">${heure(hs[b])} · ${nombre(p[b], 0)}</td><td class="num">${r !== null ? nombre(r) : "–"}</td>`
        + (r !== null ? celluleEcart(moy(p), r) : "<td>–</td>") + `</tr>`;
    });
    $("sem-table").innerHTML = `<thead><tr>${tete.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${lignes.join("")}</tbody>`;
    $("sem-table").querySelectorAll("tbody tr").forEach((tr) => tr.addEventListener("click", () => choisir(+tr.dataset.k)));
  }
  function choisir(k) { E.k = k; rendre(); }
  function vuePrevision(corps) {
    const M = EM(), J = M.jours, ems = S.emissions || [M], ie = ems.indexOf(M), j = J[E.k];
    const derniere = ie === ems.length - 1;
    corps.innerHTML = (M.note ? `<div class="sem-essai">${M.note[etat.langue]}</div>` : "")
      + `<div class="carte"><div class="barre-outils"><h3 class="petit-titre">${L(derniere ? "Prix prévus pour les 7 prochains jours" : "Prix prévus pour 7 jours", derniere ? "Forecast prices for the next 7 days" : "Forecast prices for 7 days")}</h3>`
      + `<div class="outils-gauche"><button type="button" class="bouton" id="sem-em-av" ${ie > 0 ? "" : "disabled"} aria-label="${L("Prévision précédente", "Previous forecast")}">‹</button>`
      + `<select id="sem-em">${ems.map((x, i) => `<option value="${i}"${i === ie ? " selected" : ""}>${L("émise le", "issued on")} ${dateMoyenne(x.jour_emission)}</option>`).reverse().join("")}</select>`
      + `<button type="button" class="bouton" id="sem-em-ap" ${derniere ? "disabled" : ""} aria-label="${L("Prévision suivante", "Next forecast")}">›</button></div></div>`
      + `<p class="note">${L(`Prévision publiée le ${dateHeure(M.emis)}, mise à jour chaque jour vers midi. Prix moyen de chaque journée en €/MWh, heure de Paris. Cliquer sur un jour pour le détail. Les prévisions passées restent consultables (flèches) ; l'onglet Performance montre l'historique recalculé depuis 2025.`,
        `Forecast published on ${dateHeure(M.emis)}, updated every day around noon. Daily average price in €/MWh, Paris time. Click a day for details. Past forecasts stay available (arrows); the Performance view shows the history recomputed since 2025.`)}</p>`
      + `<div class="sem-jours" role="group">${J.map(carteJour).join("")}</div>` + caseBande()
      + `<div class="graphique haut"><canvas id="sem-g" role="img" aria-label="${L("Prix prévus heure par heure sur 7 jours", "Hourly forecast prices over 7 days")}"></canvas></div></div>`
      + `<div class="carte"><div class="titre-jour"><h2>${L("Prix du", "Prices for")} ${dateLongue(j.jour)} <span class="sem-hz" style="--c:${couleurH(j.h)}">${HZ(j.h)}</span></h2></div>`
      + `<div class="barre-outils"><div class="outils-gauche"><button type="button" class="bouton" id="sem-av" ${E.k ? "" : "disabled"} aria-label="${L("Jour précédent", "Previous day")}">‹</button>`
      + `<button type="button" class="bouton" id="sem-ap" ${E.k < J.length - 1 ? "" : "disabled"} aria-label="${L("Jour suivant", "Next day")}">›</button></div><div class="segments" id="sem-pas" role="group"></div></div>`
      + caseBande() + `<div class="duo"><div class="cadre-table"><table id="sem-jt" class="table-donnees"></table></div><div class="graphique"><canvas id="sem-jg" role="img" aria-label="${dateLongue(j.jour)}"></canvas></div></div>`
      + `<p class="note" id="sem-jn"></p></div>`
      + `<div class="carte"><h3 class="petit-titre">${L("Jour par jour", "Day by day")}</h3><p class="note">${L("Prix en €/MWh, heure de Paris.", "Prices in €/MWh, Paris time.")}</p><div class="cadre-table libre"><table id="sem-table" class="table-donnees"></table></div></div>`;
    corps.querySelectorAll(".sem-jour").forEach((b) => b.addEventListener("click", () => choisir(+b.dataset.k)));
    $("sem-av").addEventListener("click", () => choisir(E.k - 1));
    const allerEm = (i) => { E.em = i === ems.length - 1 ? null : i; E.k = 0; rendre(); };
    $("sem-em").addEventListener("change", (e) => allerEm(+e.target.value));
    $("sem-em-av").addEventListener("click", () => allerEm(ie - 1));
    $("sem-em-ap").addEventListener("click", () => allerEm(ie + 1));
    corps.querySelectorAll(".sem-bande").forEach((c) => c.addEventListener("change", () => { E.bande = c.checked; rendre(); }));
    $("sem-ap").addEventListener("click", () => choisir(E.k + 1));
    segments("sem-pas", [["quart", L("Quart d'heure", "Quarter-hour")], ["heure", L("Heure", "Hour")]], E.pas, (v) => { E.pas = v; rendre(); });
    courbeSemaine(); detailJour(); tableSemaine();
  }

  /* ------------------------------------------------------------ vue Performance */
  const PERIODES = () => [["2026", "2026"], ["2025", "2025"], ["tout", L("Tout", "All")], ["sept", L("Depuis le 1er sept.", "Since 1 Sept.")], ["direct", L("En direct", "Live")]];
  function joursPeriode() {
    const H = S.historique || [];
    if (E.per === "2026" || E.per === "2025") return H.filter((d) => d.j.startsWith(E.per));
    if (E.per === "sept") return H.filter((d) => d.j >= "2026-09-01");
    if (E.per === "direct") return H.filter((d) => d.s === "direct");
    return H;
  }
  const agg = (a) => (E.ppas === "jour" ? [moy(a)] : a);               // « par jour » : moyenne de la journée
  function erreurs(d, serie) {                                         // [somme |e|, somme e, somme e², n, somme |réel|] d'une journée
    const p = agg(serie), r = agg(d.r);
    let sa = 0, s = 0, s2 = 0, n = 0, sr = 0;
    p.forEach((x, i) => { if (vide(x) || vide(r[i])) return; const e = x - r[i]; sa += Math.abs(e); s += e; s2 += e * e; n++; sr += Math.abs(r[i]); });
    return { sa, s, s2, n, sr };
  }
  function statsH(js, h, quoi) {                                       // quoi : "p" (notre prévision), "n" (dernier jour connu), "w" (même jour sem. d'avant)
    let sa = 0, s = 0, s2 = 0, n = 0, sr = 0, nj = 0, bat = 0;
    const P = [], R = [];
    for (const d of js) {
      if (!d.p[h]) continue;
      const serie = quoi === "p" ? d.p[h] : quoi === "n" ? d.n[h] : d.n["7"];
      const e = erreurs(d, serie);
      if (!e.n) continue;
      sa += e.sa; s += e.s; s2 += e.s2; n += e.n; sr += e.sr; nj++;
      if (quoi === "p") { const e1 = erreurs(d, d.n[h]), e2 = erreurs(d, d.n["7"]); if (e.sa / e.n < Math.min(e1.n ? e1.sa / e1.n : Infinity, e2.n ? e2.sa / e2.n : Infinity)) bat++; }
      P.push(...agg(serie)); R.push(...agg(d.r));
    }
    return n ? { mae: sa / n, biais: s / n, rmse: Math.sqrt(s2 / n), rel: (100 * sa) / sr, nj, bat: (100 * bat) / nj, r: correlation(P, R) } : null;
  }
  function moyenneHorizons(T, hs) { const v = hs.map((h) => T[h]).filter(Boolean); return v.length === hs.length ? moy(v.map((x) => x.mae)) : null; }
  function tableHorizons(js) {
    const T = {}, N = {}, W = {};
    for (const h of HS) { T[h] = statsH(js, h, "p"); N[h] = statsH(js, h, "n"); W[h] = statsH(js, h, "w"); }
    let html = `<thead><tr><th>${L("Horizon", "Horizon")}</th><th>${L("Jours", "Days")}</th><th>${L("Erreur moyenne", "Mean error")}</th><th>${L("Erreur relative", "Relative error")}</th><th>${L("Biais", "Bias")}</th><th>RMSE</th><th>${L("Corrélation", "Correlation")}</th>`
      + `<th>${L("Repère « dernier jour connu »", "Benchmark “last known day”")}</th><th>${L("Repère « même jour sem. d'avant »", "Benchmark “same day last week”")}</th><th>${L("Gain contre le meilleur repère", "Gain vs best benchmark")}</th><th>${L("Jours meilleurs que les deux repères", "Days better than both benchmarks")}</th></tr></thead><tbody>`;
    for (const h of HS) {
      const t = T[h];
      if (!t) { html += `<tr><td>${pastH(h)} ${HZ(h)}</td><td colspan="10">–</td></tr>`; continue; }
      const nb = Math.min(N[h] ? N[h].mae : Infinity, W[h] ? W[h].mae : Infinity);
      html += `<tr><td>${pastH(h)} <strong>${HZ(h)}</strong></td><td>${t.nj}</td><td><strong>${nombre(t.mae, 2)}</strong> €/MWh</td><td>${nombre(t.rel, 1)} %</td><td>${signe(t.biais)}</td><td>${nombre(t.rmse)}</td><td>${nombre(t.r, 2)}</td>`
        + `<td>${N[h] ? nombre(N[h].mae, 2) : "–"}</td><td>${W[h] ? nombre(W[h].mae, 2) : "–"}</td><td><span class="positif">${isFinite(nb) ? "−" + nombre(100 * (1 - t.mae / nb), 0) + " %" : "–"}</span></td><td>${nombre(t.bat, 0)} %</td></tr>`;
    }
    const ligneMoy = (lib, hs) => {
      const m = moyenneHorizons(T, hs), mn = moy(hs.map((h) => Math.min(N[h] ? N[h].mae : Infinity, W[h] ? W[h].mae : Infinity)).filter(isFinite));
      return m === null ? "" : `<tr class="meilleur"><td><strong>${lib}</strong></td><td>–</td><td><strong>${nombre(m, 2)}</strong> €/MWh</td><td>${nombre(moy(hs.map((h) => T[h].rel)), 1)} %</td><td>${signe(moy(hs.map((h) => T[h].biais)))}</td>`
        + `<td>${nombre(moy(hs.map((h) => T[h].rmse)))}</td><td>${nombre(moy(hs.map((h) => T[h].r)), 2)}</td><td>${nombre(moy(hs.map((h) => (N[h] ? N[h].mae : null))), 2)}</td><td>${nombre(moy(hs.map((h) => (W[h] ? W[h].mae : null))), 2)}</td>`
        + `<td><span class="positif">−${nombre(100 * (1 - m / mn), 0)} %</span></td><td>${nombre(moy(hs.map((h) => T[h].bat)), 0)} %</td></tr>`;
    };
    html += `</tbody><tfoot>${ligneMoy(L("Moyenne J+1 à J+7", "Average D+1 to D+7"), HS)}${ligneMoy(L("Moyenne J+2 à J+7", "Average D+2 to D+7"), HS.slice(1))}</tfoot>`;
    $("sem-ph-t").innerHTML = html;
    const o = options(8, true);
    o.scales.y.beginAtZero = true;
    o.scales.y.title.text = L("erreur moyenne (€/MWh)", "mean error (€/MWh)");
    dessiner("sem-ph", { type: "bar", data: { labels: HS.map(HZ), datasets: [
      { label: L("Notre prévision", "Our forecast"), data: HS.map((h) => (T[h] ? T[h].mae : null)), backgroundColor: HS.map(couleurH), borderRadius: 4, maxBarThickness: 40 },
      { label: L("Dernier jour connu", "Last known day"), data: HS.map((h) => (N[h] ? N[h].mae : null)), backgroundColor: css("--p-veille-barre"), borderRadius: 4, maxBarThickness: 40 },
      { label: L("Même jour sem. d'avant", "Same day last week"), data: HS.map((h) => (W[h] ? W[h].mae : null)), backgroundColor: css("--muted"), borderRadius: 4, maxBarThickness: 40 },
    ] }, options: o });
    return T;
  }
  function tuilesPerf(T, js) {
    const m17 = moyenneHorizons(T, HS), m27 = moyenneHorizons(T, HS.slice(1));
    const t = (lib, v, det) => tuile(lib, v === null || v === undefined ? "–" : euros(v, 2), det);
    $("sem-pt").innerHTML = t(L("Erreur moyenne, J+1 à J+7", "Mean error, D+1 to D+7"), m17, L("moyenne des 7 horizons", "average of the 7 horizons"))
      + t(L("Erreur moyenne, J+2 à J+7", "Mean error, D+2 to D+7"), m27, L("sans le lendemain", "without tomorrow"))
      + t(`${HZ(1)}`, T[1] && T[1].mae, T[1] ? L(`${nombre(T[1].rel, 1)} % du prix moyen`, `${nombre(T[1].rel, 1)} % of the average price`) : "")
      + t(`${HZ(7)}`, T[7] && T[7].mae, T[7] ? L(`${nombre(T[7].rel, 1)} % du prix moyen`, `${nombre(T[7].rel, 1)} % of the average price`) : "")
      + tuile(L("Jours visés", "Target days"), `${js.length}`, js.length ? `${dateCourte(js[0].j)} → ${dateCourte(js[js.length - 1].j)}` : "");
  }
  function choixHz(id, rappel) {
    const el = $(id);
    el.innerHTML = `<span class="choix-titre">${L("Horizons", "Horizons")}</span>` + HS.map((h) => `<label class="choix-item"><input type="checkbox" data-h="${h}"${E.hz[h] ? " checked" : ""}>${pastH(h)}<span>${HZ(h)}</span></label>`).join("");
    el.querySelectorAll("input").forEach((i) => i.addEventListener("change", () => { E.hz[i.dataset.h] = i.checked; rappel(); }));
  }
  function courbeTemps(js) {                                           // erreur au fil du temps : jour par jour (période courte) ou par mois
    const parMois = js.length > 45, cles = [], G = {};
    for (const d of js) {
      const k = parMois ? d.j.slice(0, 7) : d.j;
      if (!G[k]) { G[k] = []; cles.push(k); }
      G[k].push(d);
    }
    const lab = cles.map((k) => (parMois ? new Date(k + "-15T12:00:00").toLocaleDateString(loc(), { month: "short", year: "2-digit" }) : dateCourte(k)));
    const ds = HS.filter((h) => E.hz[h]).map((h) => ({ label: HZ(h), data: cles.map((k) => { const s = statsH(G[k], h, "p"); return s ? s.mae : null; }), borderColor: couleurH(h), backgroundColor: couleurH(h), fill: false, spanGaps: true, pointRadius: parMois ? 3 : 2 }));
    ds.push({ label: L("Repère « même jour sem. d'avant »", "Benchmark “same day last week”"), data: cles.map((k) => { const s = statsH(G[k], 1, "w"); return s ? s.mae : null; }), borderColor: css("--muted"), backgroundColor: css("--muted"), borderDash: [7, 4], borderWidth: 1.5, fill: false, spanGaps: true });
    const o = options(12, true);
    o.scales.y.beginAtZero = true;
    o.scales.y.title.text = L("erreur moyenne (€/MWh)", "mean error (€/MWh)");
    dessiner("sem-pm", { type: "line", data: { labels: lab, datasets: ds }, options: o, plugins: [curseur] });
    $("sem-pm-n").textContent = parMois ? L("Erreur moyenne de chaque mois (jours visés du mois).", "Mean error of each month (target days of the month).") : L("Erreur moyenne de chaque jour visé.", "Mean error of each target day.");
  }
  function convergence(js) {                                           // un jour visé : la prévision faite 7, 6 ... 1 jour avant, et le prix du marché
    const H = S.historique || [];
    if (!E.cible || !H.find((d) => d.j === E.cible)) { const c = [...H].reverse().find((d) => Object.keys(d.p).length === 7); E.cible = c ? c.j : H.length ? H[H.length - 1].j : null; }
    const d = H.find((x) => x.j === E.cible);
    const sel = $("sem-cible");
    sel.innerHTML = [...H].reverse().map((x) => `<option value="${x.j}"${x.j === E.cible ? " selected" : ""}>${dateMoyenne(x.j)} ${x.j.slice(0, 4)}${x.s === "direct" ? " · " + L("en direct", "live") : ""}</option>`).join("");
    sel.onchange = () => { E.cible = sel.value; convergence(js); };
    if (!d) return;
    const hs = d.hr || [...Array(d.r.length).keys()], vus = HS.filter((h) => E.hz[h] && d.p[h]);
    const ds = [dsMarche(d.r)];
    for (const h of [...vus].reverse()) ds.push({ label: `${L("Prévu", "Forecast")} ${HZ(h)}`, data: d.p[h], borderColor: couleurH(h), backgroundColor: couleurH(h), fill: false, borderWidth: h === 1 ? 2.5 : 1.8, cubicInterpolationMode: "monotone" });
    lier(dessiner("sem-pc", { type: "line", data: { labels: hs.map(heure), datasets: ds }, options: options(12, true), plugins: [curseur] }), "sem-pc-t");
    const err = (h) => moy(d.p[h].map((p, i) => (vide(p) ? null : Math.abs(p - d.r[i]))));
    let html = `<thead><tr><th>${L("Heure", "Time")}</th><th>${pastR()} ${L("Marché", "Market")}</th>${vus.map((h) => `<th>${pastH(h)} ${HZ(h)}</th>`).join("")}</tr></thead><tbody>`;
    hs.forEach((x, i) => { html += `<tr data-i="${i}"><td>${heure(x)}</td><td class="reel">${nombre(d.r[i])}</td>${vus.map((h) => celluleEcartPrix(d.p[h][i], d.r[i])).join("")}</tr>`; });
    html += `</tbody><tfoot><tr><td>${L("Moyenne", "Average")}</td><td class="reel">${nombre(moy(d.r))}</td>${vus.map((h) => `<td>${nombre(moy(d.p[h]))}</td>`).join("")}</tr>`
      + `<tr><td>${L("Erreur moyenne", "Mean error")}</td><td class="reel">–</td>${vus.map((h) => `<td>${nombre(err(h), 2)}</td>`).join("")}</tr></tfoot>`;
    $("sem-pc-t").innerHTML = html;
    collerEntetes($("sem-pc-t"));
    $("sem-pc-n").textContent = d.s === "direct" ? L("Prévisions publiées.", "Published forecasts.") : L("Jour recalculé après coup, avec seulement ce qui était connu à midi le jour de chaque émission.", "Day recomputed afterwards, with only what was known at noon on each issue day.");
  }
  function celluleEcartPrix(p, r) {                                    // prix prévu, case teintée selon l'écart au marché
    if (vide(p) || vide(r)) return "<td>–</td>";
    const a = Math.min(Math.abs(p - r) / 80, 1) * 0.22;
    return `<td style="background-color:rgba(var(--ecart-rgb),${a.toFixed(3)})" title="${L("écart", "gap")} ${signe(p - r)}">${nombre(p)}</td>`;
  }
  function difficiles(js) {
    const e = (d, h) => { if (!d.p[h]) return null; const x = erreurs(d, d.p[h]); return x.n ? x.sa / x.n : null; };
    const score = (d) => moy(HS.map((h) => e(d, h)));
    const pire = js.filter((d) => Object.keys(d.p).length === 7).sort((a, b) => score(b) - score(a)).slice(0, 8);
    let html = `<thead><tr><th>${L("Jour visé", "Target day")}</th><th>${pastR()} ${L("Marché moyen", "Average market")}</th>${HS.map((h) => `<th>${pastH(h)} ${HZ(h)}</th>`).join("")}<th>${L("Moyenne", "Average")}</th></tr></thead><tbody>`;
    for (const d of pire) html += `<tr class="cliquable" data-j="${d.j}"><td>${dateMoyenne(d.j)} ${d.j.slice(0, 4)}</td><td>${nombre(moy(d.r))}</td>${HS.map((h) => `<td>${nombre(e(d, h), 1)}</td>`).join("")}<td><strong>${nombre(score(d), 1)}</strong></td></tr>`;
    $("sem-pd").innerHTML = html + "</tbody>";
    $("sem-pd").querySelectorAll("tbody tr").forEach((tr) => tr.addEventListener("click", () => { E.cible = tr.dataset.j; convergence(js); $("sem-cible").scrollIntoView({ behavior: "smooth", block: "center" }); }));
  }
  function vuePerformance(corps) {
    const js = joursPeriode();
    corps.innerHTML = `<div class="carte"><div class="barre-outils"><div class="segments" id="sem-per" role="group"></div><div class="segments" id="sem-ppas" role="group"></div></div>`
      + `<p class="note">${L(`Pour chaque jour visé, la prévision faite 1, 2 ... 7 jours avant (à midi le jour d'émission) est comparée au prix du marché. Avant le ${dateLongue(S.debut_direct || "2026-11-16")} : jours recalculés après coup (un jour sur trois de 2025-2026), avec seulement ce qui était connu le jour de l'émission ; ensuite : prévisions publiées. Repères naïfs : le prix du dernier jour connu à l'émission (même heure) et celui du même jour de la semaine d'avant.`,
        `For each target day, the forecast made 1, 2 ... 7 days before (at noon on the issue day) is compared with the market price. Before ${dateLongue(S.debut_direct || "2026-11-16")}: days recomputed afterwards (one day in three of 2025-2026), using only what was known on the issue day; afterwards: published forecasts. Naive benchmarks: the price of the last day known at issue time (same hour) and of the same day one week before.`)}</p>`
      + (js.length ? "" : `<p class="avis-source">${L("Aucun jour visé dont le prix est connu sur cette période (la prévision à 7 jours est publiée depuis le 17/11/2026).", "No target day with a known price in this period (the 7-day forecast has been published since 17/11/2026).")}</p>`)
      + `<div class="tuiles" id="sem-pt"></div></div>`
      + `<div class="carte"><h3 class="petit-titre">${L("Erreur selon l'horizon", "Error by horizon")}</h3><div class="graphique moyen"><canvas id="sem-ph" role="img" aria-label="${L("Erreur selon l'horizon", "Error by horizon")}"></canvas></div>`
      + `<div class="cadre-table libre"><table id="sem-ph-t" class="table-donnees"></table></div>`
      + `<p class="note">${L("Erreur moyenne = écart absolu moyen entre le prix prévu et le prix du marché ; erreur relative = rapportée au prix moyen ; biais = écart moyen (positif : prévision trop haute).", "Mean error = mean absolute gap between forecast and market price; relative error = divided by the average price; bias = mean gap (positive: forecast too high).")}</p></div>`
      + `<div class="carte"><h3 class="petit-titre">${L("Erreur au fil du temps", "Error over time")}</h3><div class="choix" id="sem-hz1"></div><div class="graphique moyen"><canvas id="sem-pm" role="img" aria-label="${L("Erreur au fil du temps", "Error over time")}"></canvas></div><p class="note" id="sem-pm-n"></p></div>`
      + `<div class="carte"><h3 class="petit-titre">${L("Comment la prévision d'un jour a évolué", "How the forecast of one day evolved")}</h3>`
      + `<div class="barre-outils"><label>${L("Jour visé", "Target day")} <select id="sem-cible"></select></label></div><div class="choix" id="sem-hz2"></div>`
      + `<div class="duo"><div class="cadre-table"><table id="sem-pc-t" class="table-donnees"></table></div><div class="graphique"><canvas id="sem-pc" role="img" aria-label="${L("Prévisions successives d'un jour", "Successive forecasts of one day")}"></canvas></div></div><p class="note" id="sem-pc-n"></p></div>`
      + `<div class="carte"><h3 class="petit-titre">${L("Jours les plus difficiles", "Hardest days")}</h3><p class="note">${L("Jours visés de la période où l'erreur moyenne des 7 horizons est la plus forte (€/MWh). Cliquer pour voir le jour ci-dessus.", "Target days of the period with the largest average error over the 7 horizons (€/MWh). Click to show the day above.")}</p>`
      + `<div class="cadre-table libre"><table id="sem-pd" class="table-donnees"></table></div></div>`;
    segments("sem-per", PERIODES(), E.per, (v) => { E.per = v; rendre(); });
    segments("sem-ppas", [["heure", L("À l'heure", "Hourly")], ["jour", L("Moyenne du jour", "Daily average")]], E.ppas, (v) => { E.ppas = v; rendre(); });
    const T = tableHorizons(js);
    tuilesPerf(T, js);
    const maj = () => { courbeTemps(js); convergence(js); };
    choixHz("sem-hz1", () => { choixHz("sem-hz2", maj); maj(); });
    choixHz("sem-hz2", () => { choixHz("sem-hz1", maj); maj(); });
    courbeTemps(js); convergence(js); difficiles(js);
  }

  /* ------------------------------------------------------------ onglet */
  function rendre() {
    const corps = $("sem-corps");
    if (!S || Date.now() - charge > 600000) {
      if (!S) corps.innerHTML = `<div class="carte"><p class="note">${L("Chargement de la prévision à 7 jours…", "Loading the 7-day forecast…")}</p></div>`;
      if (!demande) {
        demande = true;
        fetch("data/semaine.json?" + Date.now()).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
          .then((d) => { const neuf = !S || S.emis !== d.emis; S = d; charge = Date.now(); demande = false; if (neuf) { E.em = null; E.k = Math.min(E.k, S.jours.length - 1); } if (etat.onglet === "semaine") rendre(); })
          .catch(() => { demande = false; if (!S) corps.innerHTML = `<div class="carte"><p class="note">${L("La prévision à 7 jours n'est pas encore disponible.", "The 7-day forecast is not available yet.")}</p></div>`; });
      }
      if (!S) return;
    }
    const haut = `<div class="segments grands" id="sem-vue" role="group"></div>`;
    corps.innerHTML = haut + `<div id="sem-vue-corps"></div>`;
    segments("sem-vue", [["prevision", L("Prévision", "Forecast")], ["performance", L("Performance", "Performance")]], E.vue, (v) => { E.vue = v; rendre(); });
    (E.vue === "prevision" ? vuePrevision : vuePerformance)($("sem-vue-corps"));
  }
  return { rendre };
})();
