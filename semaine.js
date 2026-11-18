/* Onglet « 7 jours » (17/11/2026, refait deux fois le même jour à la demande de Julien) : lit data/semaine.json.
   Vue « Prévision » : les 7 jours sur une ligne, la semaine heure par heure, le détail d'un jour (heure / quart d'heure), un tableau jour par jour,
   les émissions passées (publiées, ou simulées après coup avec le même calcul), fourchette à 80 % décochée par défaut.
   Vue « Performance », sur le modèle de celle de J+1 : périodes (tout, 7 j, 30 j, depuis le 1er sept., en direct, dates précises), pas (quart d'heure, heure,
   jour), résumé par horizon contre deux repères naïfs, prévu contre marché sur la période, erreur par horizon, jour par jour, par heure de la journée,
   évolution de la prévision d'un jour vu de J+7 à J+1.
   Au quart d'heure : J+1 = la prévision du site ; J+2 à J+7 (prévision horaire) = courbe interpolée entre les heures, qui garde la moyenne de chaque heure
   (provisoire, en attendant le test de la forme au quart d'heure). S'appuie sur les utilitaires d'app.js. Site anonymisé : ni modèle, ni source. */
window.SEMAINE = (() => {
  let S = null, demande = false, charge = 0;
  const E = { vue: "prevision", k: 0, pas: "heure", em: null, bande: false, 
              per: "7", ppas: "heure", du: null, au: null, hz: { 1: true, 2: true, 4: true, 7: true }, rn: true, rw: false, cpas: "heure", cible: null, cz: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } };
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
  const pastN = (tir) => `<span class="pastille ${tir ? "tirets" : "points"}" style="color:${css("--muted")}"></span>`;
  const sep = () => (etat.langue === "fr" ? " : " : ": ");
  const HIST = () => (S.historique || []).filter((d) => d.j >= "2026-09-01");   // même début que l'historique de J+1 (01/09/2026)
  const EM = () => (S.emissions && S.emissions.length ? S.emissions[E.em === null ? S.emissions.length - 1 : E.em] : S);
  // émissions consultables à partir du 31/08 (J+1 = 01/09, même début que l'historique) ; celles du 25 au 30/08 servent seulement aux horizons longs de début septembre   // émission affichée (la dernière par défaut)
  const LIB_B = () => L("Fourchette à 80 % (8 cas sur 10)", "80 % range (8 cases in 10)");
  const LIB_N = () => L("Dernier jour connu", "Last known day");
  const LIB_W = () => L("Même jour sem. d'avant", "Same day last week");
  const quarts = (hs) => hs.flatMap((h) => ["00", "15", "30", "45"].map((m) => pad(h) + ":" + m));
  const OFF = [-3 / 8, -1 / 8, 1 / 8, 3 / 8];
  function interp(p) {                                                 // prix horaire -> 4 quarts : pente centrée entre l'heure d'avant et d'après ; la moyenne de chaque heure est gardée
    if (!p) return null;
    return p.flatMap((x, i) => {
      if (vide(x)) return [null, null, null, null];
      const a = vide(p[i - 1]) ? x : p[i - 1], b = vide(p[i + 1]) ? x : p[i + 1], s = (b - a) / 2;
      return OFF.map((o) => x + s * o);
    });
  }

  /* ------------------------------------------------------------ fourchette */
  function dsBande(bas, haut) {                                        // aire entre le bas et le haut (le bas est une série cachée)
    const c = css("--bande-sem");
    return [{ label: "_bas", data: bas, borderWidth: 0, pointRadius: 0, pointHoverRadius: 0, fill: false },
            { label: LIB_B(), data: haut, borderWidth: 0, pointRadius: 0, pointHoverRadius: 0, backgroundColor: c, borderColor: c, fill: "-1" }];
  }
  function infobulleBande(o, bas, haut) {                              // l'infobulle montre les deux bornes de la fourchette sur une ligne
    o.plugins.tooltip.filter = (it) => !it.dataset.label.startsWith("_") && !vide(it.parsed.y);
    o.plugins.tooltip.callbacks.label = (c) => (c.dataset.label === LIB_B() ? ` ${LIB_B()}${sep()}${nombre(bas[c.dataIndex])} – ${nombre(haut[c.dataIndex])} €/MWh`
      : ` ${c.dataset.label}${sep()}${nombre(c.parsed.y)} €/MWh`);
  }
  const caseBande = () => `<div class="choix"><label class="choix-item"><input type="checkbox" class="sem-bande"${E.bande ? " checked" : ""}><span class="pastille bande-sem"></span><span>${LIB_B()}</span></label></div>`;

  /* ------------------------------------------------------------ vue Prévision */
  function carteJour(j, k) {
    const m = moy(j.prix), r = j.reel ? moy(j.reel) : null;
    const e = j.reel ? moy(j.prix.map((x, i) => (vide(x) || vide(j.reel[i]) ? null : Math.abs(x - j.reel[i])))) : null;   // erreur moyenne à l'heure (17/11/2026, à la place de min / max)
    return `<button type="button" class="sem-jour" data-k="${k}" aria-pressed="${k === E.k}" style="--c:${couleurH(j.h)}">`
      + `<span class="sem-hz">${HZ(j.h)}</span><span class="sem-date">${dateMoyenne(j.jour)}</span>`
      + `<span class="sem-prix">${nombre(m)}</span>`
      + (r !== null ? `<span class="sem-reel">${L("marché", "market")} ${nombre(r)}</span>` : "")
      + (e !== null ? `<span class="sem-mm">${L("erreur/h", "error/h")} ${nombre(e, 1)} €</span><span class="sem-mm">${L("soit", "i.e.")} ${nombre(100 * e / Math.abs(r), 1)} %</span>` : `<span class="sem-mm">${L("en attente du prix", "awaiting price")}</span>`) + `</button>`;
  }
  const zone = {                                                       // jour choisi : fond gris léger sur la courbe de la semaine
    id: "zone",
    beforeDatasetsDraw(chart, args, o) {
      if (!o || o.a === undefined) return;
      const x = chart.scales.x, { top, bottom } = chart.chartArea, ctx = chart.ctx;
      const x0 = x.getPixelForValue(o.a), x1 = x.getPixelForValue(o.b);
      ctx.save(); ctx.fillStyle = css("--zone-sem"); ctx.fillRect(x0, top, x1 - x0, bottom - top); ctx.restore();
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
  function serieJour(j, pas) {                                          // prévu, marché et fourchette d'un jour, à l'heure ou au quart d'heure
    const hs = heuresDe(j);
    if (pas === "heure") return { labels: hs.map(heure), p: j.prix, r: j.reel, b: j.bas, hh: j.haut, quart: false };
    const jd = typeof jourDe === "function" ? jourDe(j.jour) : null;
    const mq = S.marche_q && S.marche_q[j.jour] && S.marche_q[j.jour].length === 4 * hs.length ? S.marche_q[j.jour] : null;
    const labels = jd && jd.heures && jd.heures.length === 4 * hs.length ? jd.heures : quarts(hs);
    const c = j.h === 1 && jd && jd.heures && jd.heures.length === 4 * hs.length ? principalDe(jd) : null;
    const q = Boolean(c && jd[c]);
    return { labels, p: q ? jd[c] : interp(j.prix), r: mq || (jd && jd.reel) || null, b: interp(j.bas), hh: interp(j.haut), quart: q };
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
    ds.push({ label: `${L("Prévu", "Forecast")} ${HZ(j.h)}`, data: s.p, borderColor: couleurH(j.h), backgroundColor: degrade(couleurH(j.h)), fill: E.bande ? false : "start", cubicInterpolationMode: "monotone" });
    const oj = options(13);
    if (s.b && s.hh) infobulleBande(oj, s.b, s.hh);
    lier(dessiner("sem-jg", { type: "line", data: { labels: s.labels, datasets: ds }, options: oj, plugins: [curseur] }), "sem-jt");
    const n = [];
    if (E.pas === "quart" && !s.quart) n.push(L(`De J+2 à J+7 la prévision est faite heure par heure ; au quart d'heure, la courbe est interpolée entre les heures (la moyenne de chaque heure ne change pas).`,
      `From D+2 to D+7 the forecast is hourly; at quarter-hour resolution the curve is interpolated between hours (each hour's average is unchanged).`));
    if (j.h === 1) n.push(L(`J+1 : la prévision de l'onglet « Prévision ».`, `D+1: the forecast of the “Forecast” tab.`));
    if (!R) n.push(L("Prix du marché pas encore connu (publié la veille vers 13 h).", "Market price not known yet (published the day before around 1 pm)."));
    $("sem-jn").textContent = n.join(" ");
  }
  function tableSemaine() {
    const tete = [L("Jour", "Day"), L("Horizon", "Horizon"), L("Moyenne", "Average"), L("Heure la moins chère", "Cheapest hour"), L("Heure la plus chère", "Dearest hour"), L("Marché", "Market"), L("Écart", "Gap"), L("Erreur à l'heure (€/MWh)", "Hourly error (€/MWh)"), L("Erreur à l'heure (% du prix moyen)", "Hourly error (% of average price)"), L("Erreur du repère naïf (% du prix moyen)", "Naive benchmark error (% of average price)")];
    const HT = S.historique || [];                                      // (18/11/2026, Julien) repère naïf : prix du dernier jour connu à l'émission, même heure (pour J+h : il y a h jours)
    const lignes = EM().jours.map((j, k) => {
      const p = j.prix, a = imin(p), b = imax(p), hs = heuresDe(j), r = j.reel ? moy(j.reel) : null;
      const e = j.reel ? moy(p.map((x, i) => (vide(x) || vide(j.reel[i]) ? null : Math.abs(x - j.reel[i])))) : null;
      const d = HT.find((x) => x.j === j.jour), nv = d && d.n ? d.n[j.h] : null;
      const en = nv && d.r ? moy(nv.map((x, i) => (vide(x) || vide(d.r[i]) ? null : Math.abs(x - d.r[i])))) : null;
      return `<tr data-k="${k}" class="cliquable${k === E.k ? " actif" : ""}"><th scope="row">${dateMoyenne(j.jour)}</th><td>${pastH(j.h)} ${HZ(j.h)}</td><td class="num"><strong>${nombre(moy(p))}</strong></td>`
        + `<td class="num">${heure(hs[a])} · ${nombre(p[a], 0)}</td><td class="num">${heure(hs[b])} · ${nombre(p[b], 0)}</td><td class="num">${r !== null ? nombre(r) : "–"}</td>`
        + (r !== null ? celluleEcart(moy(p), r) : "<td>–</td>") + `<td class="num">${e !== null ? nombre(e, 2) : "–"}</td><td class="num">${e !== null && r ? nombre(100 * e / Math.abs(r), 1) + " %" : "–"}</td><td class="num">${en !== null && r ? nombre(100 * en / Math.abs(r), 1) + " %" : "–"}</td></tr>`;
    });
    $("sem-table").innerHTML = `<thead><tr>${tete.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${lignes.join("")}</tbody>`;
    $("sem-table").querySelectorAll("tbody tr").forEach((tr) => tr.addEventListener("click", () => choisir(+tr.dataset.k)));
  }
  function choisir(k) { E.k = k; rendre(); }
  function vuePrevision(corps) {
    const M = EM(), J = M.jours, ems = S.emissions || [M], ie = ems.indexOf(M), j = J[E.k], derniere = ie === ems.length - 1;
    // (17/11/2026, Julien) chaque prévision est désignée par les jours qu'elle couvre, puis par son jour d'émission
    const dJ = (iso, opt) => { const t = dateObj(iso).toLocaleDateString(loc(), opt); return etat.langue === "fr" ? t.replace(/(^|\s)1(\s|$)/, "$11er$2") : t; };
    const couvre = (x) => { const a = x.jours[0].jour, b = x.jours[x.jours.length - 1].jour, m = a.slice(5, 7) === b.slice(5, 7);
      return `${dJ(a, m ? { day: "numeric" } : { day: "numeric", month: "short" })} → ${dJ(b, { day: "numeric", month: "short" })}`; };
    const libEm = (x) => `${couvre(x)} · ${L("émise le", "issued")} ${dJ(x.jour_emission, { day: "numeric", month: "short" })}${x.simulee ? " · " + L("simulée", "simulated") : ""}`;
    const titreEm = `${L("Prix prévus du", "Forecast prices from")} ${dJ(J[0].jour, { weekday: "short", day: "numeric", month: "short" })} ${L("au", "to")} ${dJ(J[J.length - 1].jour, { weekday: "short", day: "numeric", month: "short" })}`;
    corps.innerHTML = (M.note ? `<div class="sem-essai">${M.note[etat.langue]}</div>` : "")
      + (M.simulee ? `<div class="sem-essai">${L(`Prévision simulée après coup : ce jour-là la prévision à 7 jours n'était pas encore publiée. Même calcul que le service, avec seulement ce qui était connu à midi le ${dateLongue(M.jour_emission)}.`,
        `Forecast simulated afterwards: the 7-day forecast was not published yet that day. Same computation as the live service, using only what was known at noon on ${dateLongue(M.jour_emission)}.`)}</div>` : "")
      + `<div class="carte"><div class="barre-outils"><h3 class="petit-titre">${titreEm}</h3>`
      + `<div class="outils-gauche"><button type="button" class="bouton" id="sem-em-av" ${ie > 0 ? "" : "disabled"} aria-label="${L("Prévision précédente", "Previous forecast")}">‹</button>`
      + `<select id="sem-em">${ems.map((x, i) => `<option value="${i}"${i === ie ? " selected" : ""}>${libEm(x)}</option>`).reverse().join("")}</select>`
      + `<button type="button" class="bouton" id="sem-em-ap" ${derniere ? "disabled" : ""} aria-label="${L("Prévision suivante", "Next forecast")}">›</button></div></div>`
      + `<p class="note">${M.simulee ? L(`Prévision émise le ${dateLongue(M.jour_emission)} (simulée). `, `Forecast issued on ${dateLongue(M.jour_emission)} (simulated). `) : L(`Prévision publiée le ${dateHeure(M.emis)}. `, `Forecast published on ${dateHeure(M.emis)}. `)}${L("Mise à jour chaque jour vers midi. Prix moyen de chaque journée en €/MWh, heure de Paris. Cliquer sur un jour pour le détail ; les flèches remontent les prévisions passées.",
        "Updated every day around noon. Daily average price in €/MWh, Paris time. Click a day for details; the arrows go back through past forecasts.")}</p>`
      + `<div class="sem-jours" role="group">${J.map(carteJour).join("")}</div>` + caseBande()
      + `<div class="graphique haut"><canvas id="sem-g" role="img" aria-label="${L("Prix prévus heure par heure sur 7 jours", "Hourly forecast prices over 7 days")}"></canvas></div></div>`
      + `<div class="carte"><div class="titre-jour"><h2>${L("Prix du", "Prices for")} ${dateLongue(j.jour)} <span class="sem-hz" style="--c:${couleurH(j.h)}">${HZ(j.h)}</span></h2></div>`
      + `<div class="barre-outils"><div class="outils-gauche"><button type="button" class="bouton" id="sem-av" ${E.k ? "" : "disabled"} aria-label="${L("Jour précédent", "Previous day")}">‹</button>`
      + `<button type="button" class="bouton" id="sem-ap" ${E.k < J.length - 1 ? "" : "disabled"} aria-label="${L("Jour suivant", "Next day")}">›</button></div><div class="segments" id="sem-pas" role="group"></div></div>`
      + caseBande() + `<div class="graphique haut"><canvas id="sem-jg" role="img" aria-label="${dateLongue(j.jour)}"></canvas></div>`
      + `<div class="cadre-table grand"><table id="sem-jt" class="table-donnees"></table></div>`
      + `<p class="note" id="sem-jn"></p></div>`
      + `<div class="carte"><h3 class="petit-titre">${L("Jour par jour", "Day by day")}</h3><p class="note">${L("Prix en €/MWh, heure de Paris ; erreur moyenne à l'heure. Repère naïf : le prix du dernier jour connu à l'émission, même heure (pour J+h, le prix d'il y a h jours).", "Prices in €/MWh, Paris time; mean hourly error. Naive benchmark: the last known day's price at issue time, same hour (for D+h, the price h days earlier).")}</p><div class="cadre-table libre"><table id="sem-table" class="table-donnees"></table></div></div>`;
    corps.querySelectorAll(".sem-jour").forEach((b) => b.addEventListener("click", () => choisir(+b.dataset.k)));
    $("sem-av").addEventListener("click", () => choisir(E.k - 1));
    $("sem-ap").addEventListener("click", () => choisir(E.k + 1));
    const allerEm = (i) => { E.em = i === ems.length - 1 ? null : i; E.k = Math.min(E.k, ems[i].jours.length - 1); rendre(); };
    $("sem-em").addEventListener("change", (e) => allerEm(+e.target.value));
    $("sem-em-av").addEventListener("click", () => allerEm(ie - 1));
    $("sem-em-ap").addEventListener("click", () => allerEm(ie + 1));
    corps.querySelectorAll(".sem-bande").forEach((c) => c.addEventListener("change", () => { E.bande = c.checked; rendre(); }));
    segments("sem-pas", [["quart", L("Quart d'heure", "Quarter-hour")], ["heure", L("Heure", "Hour")]], E.pas, (v) => { E.pas = v; rendre(); });
    courbeSemaine(); detailJour(); tableSemaine();
  }

  /* ------------------------------------------------------------ vue Performance */
  const MQ = (jour) => (S.marche_q ? S.marche_q[jour] : null);
  function serie(d, quoi, pas) {                                       // une série d'un jour visé au pas choisi ; quoi : "r" (marché), 1..7 (notre prévision), "n1".."n7" (repère : k jours avant)
    const nh = d.r.length;
    if (pas === "quart") {
      const r = MQ(d.j);
      if (!r || r.length !== 4 * nh) return null;
      if (quoi === "r") return r;
      if (typeof quoi === "string") { const k = +quoi.slice(1), q = MQ(ajouterJours(d.j, -k)); return q && q.length === r.length ? q : null; }
      if (!d.p[quoi]) return null;
      return quoi === 1 && d.p1q ? d.p1q : interp(d.p[quoi]);
    }
    const x = quoi === "r" ? d.r : typeof quoi === "string" ? d.n[quoi.slice(1)] : d.p[quoi];
    if (!x) return null;
    return pas === "jour" ? [moy(x)] : x;
  }
  function stats(js, quoi, pas) {                                      // quoi : horizon h (notre prévision), "nh"/"wh" (repères pour l'horizon h)
    let sa = 0, s = 0, s2 = 0, n = 0, sr = 0, nj = 0;
    const P = [], R = [], cj = [];
    for (const d of js) {
      const h = typeof quoi === "number" ? quoi : +quoi.slice(1);
      if (!d.p[h]) continue;                                           // jours où notre prévision existe : repères jugés sur les mêmes jours
      const q = typeof quoi === "number" ? quoi : quoi[0] === "n" ? "n" + h : "n7";
      const p = serie(d, q, pas), r = serie(d, "r", pas);
      if (!p || !r) continue;
      let k = 0;
      p.forEach((x, i) => { if (vide(x) || vide(r[i])) return; const e = x - r[i]; sa += Math.abs(e); s += e; s2 += e * e; n++; k++; sr += Math.abs(r[i]); });
      if (k) { nj++; P.push(...p); R.push(...r); if (pas !== "jour") { const c = correlation(p, r); if (c !== null) cj.push(c); } }
    }
    return n ? { mae: sa / n, biais: s / n, rmse: Math.sqrt(s2 / n), rel: (100 * sa) / sr, nj, n, r: correlation(P, R), rj: moy(cj) } : null;
  }
  function erreurJour(d, quoi, pas) {
    const p = serie(d, quoi, pas), r = serie(d, "r", pas);
    if (!p || !r) return null;
    return moy(p.map((x, i) => (vide(x) || vide(r[i]) ? null : Math.abs(x - r[i]))));
  }
  function joursPeriode() {
    const H = HIST();
    if (E.per === "7") return H.slice(-7);
    if (E.per === "30") return H.slice(-30);
    if (E.per === "direct") return H.filter((d) => d.s === "direct");
    if (E.per === "dates") return H.filter((d) => d.j >= E.du && d.j <= E.au);
    return H;
  }
  function choixPerf(id) {                                             // horizons et repères affichés dans les graphiques (état commun à toute la vue)
    const el = $(id);
    el.innerHTML = `<span class="choix-titre">${L("Afficher", "Show")}</span>`
      + HS.map((h) => `<label class="choix-item"><input type="checkbox" data-h="${h}"${E.hz[h] ? " checked" : ""}>${pastH(h)}<span>${HZ(h)}</span></label>`).join("")
      + `<label class="choix-item"><input type="checkbox" data-r="rn"${E.rn ? " checked" : ""}>${pastN(false)}<span>${LIB_N()}</span></label>`
      ;
    el.querySelectorAll("input").forEach((i) => i.addEventListener("change", () => { if (i.dataset.h) E.hz[i.dataset.h] = i.checked; else E[i.dataset.r] = i.checked; rendre(); }));
  }
  const vusH = () => HS.filter((h) => E.hz[h]);
  const dsN = (lib, data, tir, extra = {}) => ({ label: lib, data, borderColor: css("--muted"), backgroundColor: css("--muted"), borderWidth: 1.5, borderDash: tir ? [7, 4] : [2, 3], fill: false, spanGaps: false, ...extra });
  function resume(js) {
    const T = {}, N = {}, W = {}, pas = E.ppas;
    for (const h of HS) { T[h] = stats(js, h, pas); N[h] = stats(js, "n" + h, pas); W[h] = stats(js, "w" + h, pas); }
    const nb = (h) => (N[h] ? N[h].mae : Infinity);
    const nj = js.filter((d) => serie(d, "r", pas)).length, nh = js.filter((d) => serie(d, "r", pas)).reduce((a, d) => a + d.r.length, 0);
    let html = `<thead><tr><th>${L("Horizon", "Horizon")} · ${L(`${nj} jour${nj > 1 ? "s" : ""} visé${nj > 1 ? "s" : ""} = ${nombre(nh, 0)} heures`, `${nj} target day${nj > 1 ? "s" : ""} = ${nombre(nh, 0)} hours`)}</th><th>${L("Erreur moyenne", "Mean error")}</th><th>${L("Erreur relative", "Relative error")}</th><th>${L("Biais", "Bias")}</th><th>RMSE</th>`
      + `<th>${L("Corrélation", "Correlation")}</th><th>${L("Corrélation moyenne de chaque jour", "Mean daily correlation")}</th><th>${pastN(false)} ${LIB_N()}</th>`
      + `<th>${L("Gain contre le dernier jour connu", "Gain vs last known day")}</th></tr></thead><tbody>`;
    for (const h of HS) {
      const t = T[h];
      if (!t) { html += `<tr><td>${pastH(h)} ${HZ(h)}</td><td colspan="8">–</td></tr>`; continue; }
      const b = nb(h);
      html += `<tr><td>${pastH(h)} <strong>${HZ(h)}</strong> <small class="note">(${t.nj} j)</small></td><td><strong>${nombre(t.mae, 2)}</strong> €/MWh</td><td>${nombre(t.rel, 1)} %</td><td>${signe(t.biais)}</td><td>${nombre(t.rmse)}</td><td>${nombre(t.r, 2)}</td>`
        + `<td>${pas === "jour" ? "–" : nombre(t.rj, 2)}</td><td>${N[h] ? nombre(N[h].mae, 2) : "–"}</td>`
        + `<td><span class="${t.mae < b ? "positif" : ""}">${isFinite(b) ? signe(100 * (1 - t.mae / b), 0) + " %" : "–"}</span></td></tr>`;
    }
    const ligneMoy = (lib, hs) => {
      if (!hs.every((h) => T[h])) return "";
      const m = moy(hs.map((h) => T[h].mae)), mb = moy(hs.map(nb).filter(isFinite));
      return `<tr class="meilleur"><td><strong>${lib}</strong></td><td><strong>${nombre(m, 2)}</strong> €/MWh</td><td>${nombre(moy(hs.map((h) => T[h].rel)), 1)} %</td><td>${signe(moy(hs.map((h) => T[h].biais)))}</td>`
        + `<td>${nombre(moy(hs.map((h) => T[h].rmse)))}</td><td>${nombre(moy(hs.map((h) => T[h].r)), 2)}</td><td>${pas === "jour" ? "–" : nombre(moy(hs.map((h) => T[h].rj)), 2)}</td>`
        + `<td>${nombre(moy(hs.map((h) => (N[h] ? N[h].mae : null))), 2)}</td>`
        + `<td><span class="positif">${signe(100 * (1 - m / mb), 0)} %</span></td></tr>`;
    };
    html += `</tbody><tfoot>${ligneMoy(L("Moyenne J+1 à J+7", "Average D+1 to D+7"), HS)}${ligneMoy(L("Moyenne J+2 à J+7", "Average D+2 to D+7"), HS.slice(1))}</tfoot>`;
    $("sem-resume").innerHTML = html;
    const m17 = HS.every((h) => T[h]) ? moy(HS.map((h) => T[h].mae)) : null, m27 = HS.slice(1).every((h) => T[h]) ? moy(HS.slice(1).map((h) => T[h].mae)) : null;
    const tl = (lib, v, det) => tuile(lib, vide(v) ? "–" : euros(v, 2), det);
    $("sem-tuiles").innerHTML = tl(L("Erreur moyenne, J+1 à J+7", "Mean error, D+1 to D+7"), m17, L("moyenne des 7 horizons", "average of the 7 horizons"))
      + tl(L("Erreur moyenne, J+2 à J+7", "Mean error, D+2 to D+7"), m27, L("sans le lendemain", "without tomorrow"))
      + tl(HZ(1), T[1] && T[1].mae, T[1] ? L(`${nombre(T[1].rel, 1)} % du prix moyen`, `${nombre(T[1].rel, 1)} % of the average price`) : "")
      + tl(HZ(7), T[7] && T[7].mae, T[7] ? L(`${nombre(T[7].rel, 1)} % du prix moyen`, `${nombre(T[7].rel, 1)} % of the average price`) : "")
      + tuile(L("Jours visés", "Target days"), `${nj}`, nj ? `${dateCourte(js[0].j)} ${js[0].j.slice(0, 4)} → ${dateCourte(js[js.length - 1].j)} ${js[js.length - 1].j.slice(0, 4)}` : "");
    const o = options(8, true);
    o.scales.y.beginAtZero = true;
    o.scales.y.title.text = L("erreur moyenne (€/MWh)", "mean error (€/MWh)");
    dessiner("sem-ph", { type: "bar", data: { labels: HS.map(HZ), datasets: [
      { label: L("Notre prévision", "Our forecast"), data: HS.map((h) => (T[h] ? T[h].mae : null)), backgroundColor: HS.map(couleurH), borderRadius: 4, maxBarThickness: 40 },
      { label: LIB_N(), data: HS.map((h) => (N[h] ? N[h].mae : null)), backgroundColor: css("--p-veille-barre"), borderRadius: 4, maxBarThickness: 40 },
    ] }, options: o });
  }
  function courbePeriode(js) {                                         // prix prévu (horizons cochés) et prix du marché sur toute la période, d'un seul tenant
    const pas = E.ppas, lab = [], debut = new Map(), val = { r: [], n: [], w: [] }, hs = vusH();
    for (const h of hs) val[h] = [];
    js.forEach((d, k) => {
      const r = serie(d, "r", pas);
      if (!r) return;
      if (k && js[k - 1].j !== ajouterJours(d.j, -1)) { lab.push(""); for (const c in val) val[c].push(null); }
      debut.set(lab.length, d.j);
      const hd = d.hr || [...Array(d.r.length).keys()], et = pas === "quart" ? quarts(hd) : pas === "heure" ? hd.map(heure) : [""];
      et.forEach((e, i) => {
        lab.push(`${dateMoyenne(d.j)}${e ? " · " + e : ""}`);
        val.r.push(r[i]);
        for (const h of hs) { const p = serie(d, h, pas); val[h].push(p ? p[i] : null); }
        const n1 = serie(d, "n1", pas), n7 = serie(d, "n7", pas);
        val.n.push(n1 ? n1[i] : null); val.w.push(n7 ? n7[i] : null);
      });
    });
    const ordre = [...debut.keys()], saut = Math.max(1, Math.ceil(ordre.length / (innerWidth < 600 ? 4 : 10)));
    const montres = new Set(ordre.filter((_, k) => k % saut === 0));
    const lisse = { spanGaps: false, borderWidth: pas === "quart" && js.length > 14 ? 1.2 : 1.8 };
    const ds = [{ ...dsMarche(val.r), ...lisse, borderWidth: lisse.borderWidth + 0.4 }];
    for (const h of hs) ds.push({ label: `${L("Prévu", "Forecast")} ${HZ(h)}`, data: val[h], borderColor: couleurH(h), backgroundColor: couleurH(h), fill: false, ...lisse });
    if (E.rn) ds.push(dsN(L("Veille (même heure)", "Day before (same hour)"), val.n, false));
    if (E.rw) ds.push(dsN(LIB_W(), val.w, true));
    const o = options(10, true);
    o.scales.x.ticks = { ...o.scales.x.ticks, autoSkip: false, callback: (v, i) => (montres.has(i) ? dateCourte(debut.get(i)) : null) };
    o.scales.x.grid = pas === "jour" ? { display: false } : { display: true, drawTicks: false, color: (c) => (montres.has(c.index) ? css("--grid") : "transparent") };
    dessiner("sem-pp", { type: "line", data: { labels: lab, datasets: ds }, options: o, plugins: [curseur] });
  }
  function courbeJours(js) {                                           // erreur de chaque jour visé (ou de chaque mois si la période est longue)
    const pas = E.ppas, parMois = js.length > 62, cles = [], G = {};
    for (const d of js) { const k = parMois ? d.j.slice(0, 7) : d.j; if (!G[k]) { G[k] = []; cles.push(k); } G[k].push(d); }
    const lab = cles.map((k) => (parMois ? new Date(k + "-15T12:00:00").toLocaleDateString(loc(), { month: "short", year: "2-digit" }) : dateCourte(k)));
    const val = (k, q) => { const s = stats(G[k], q, pas); return s ? s.mae : null; };
    const ds = vusH().map((h) => ({ label: HZ(h), data: cles.map((k) => val(k, h)), borderColor: couleurH(h), backgroundColor: couleurH(h), fill: false, spanGaps: true, pointRadius: 2 }));
    if (E.rn) ds.push(dsN(L("Dernier jour connu, J+1", "Last known day, D+1"), cles.map((k) => val(k, "n1")), false, { spanGaps: true }));
    if (E.rw) ds.push(dsN(LIB_W(), cles.map((k) => val(k, "w1")), true, { spanGaps: true }));
    const o = options(12, true);
    o.scales.y.beginAtZero = true;
    o.scales.y.title.text = L("erreur moyenne (€/MWh)", "mean error (€/MWh)");
    dessiner("sem-pj", { type: "line", data: { labels: lab, datasets: ds }, options: o, plugins: [curseur] });
    $("sem-pj-n").textContent = parMois ? L("Période longue : erreur moyenne de chaque mois.", "Long period: mean error of each month.") : L("Erreur moyenne de chaque jour visé.", "Mean error of each target day.");
  }
  function courbeHeures(js) {                                          // erreur selon l'heure de la journée
    const pas = E.ppas === "jour" ? "heure" : E.ppas, som = {}, nb = {};
    const ajoute = (c, k, e) => { som[c] = som[c] || {}; nb[c] = nb[c] || {}; som[c][k] = (som[c][k] || 0) + e; nb[c][k] = (nb[c][k] || 0) + 1; };
    for (const d of js) {
      const r = serie(d, "r", pas);
      if (!r) continue;
      const hd = d.hr || [...Array(d.r.length).keys()], div = pas === "quart" ? 4 : 1;
      for (const q of [...vusH(), "n1", "n7"]) {
        if (typeof q === "number" && !d.p[q]) continue;
        const p = serie(d, q, pas);
        if (!p) continue;
        p.forEach((x, i) => { if (!vide(x) && !vide(r[i])) ajoute(q, hd[Math.floor(i / div)], Math.abs(x - r[i])); });
      }
    }
    const hs = [...Array(24).keys()], se = (c) => hs.map((k) => (nb[c] && nb[c][k] ? som[c][k] / nb[c][k] : null));
    const ds = vusH().map((h) => ({ label: HZ(h), data: se(h), borderColor: couleurH(h), backgroundColor: couleurH(h), fill: false, pointRadius: 2 }));
    if (E.rn) ds.push(dsN(L("Veille (même heure)", "Day before (same hour)"), se("n1"), false));
    if (E.rw) ds.push(dsN(LIB_W(), se("n7"), true));
    const o = options(12, true);
    o.scales.y.beginAtZero = true;
    o.scales.y.title.text = L("erreur moyenne (€/MWh)", "mean error (€/MWh)");
    dessiner("sem-ph2", { type: "line", data: { labels: hs.map(heure), datasets: ds }, options: o, plugins: [curseur] });
  }
  function convergence() {                                             // un jour visé : la prévision faite 7, 6 ... 1 jour avant, et le prix du marché
    const H = HIST(), cp = E.cpas, pas = cp === "jour" ? "heure" : cp;
    segments("sem-cpas", [["quart", L("Quart d'heure", "Quarter-hour")], ["heure", L("Heure", "Hour")], ["jour", L("Par jour", "Daily")]], cp, (v) => { E.cpas = v; convergence(); });
    if (!E.cible || !H.find((d) => d.j === E.cible)) { const c = [...H].reverse().find((d) => Object.keys(d.p).length === 7); E.cible = c ? c.j : H.length ? H[H.length - 1].j : null; }
    const d = H.find((x) => x.j === E.cible), sel = $("sem-cible");
    sel.innerHTML = [...H].reverse().map((x) => `<option value="${x.j}"${x.j === E.cible ? " selected" : ""}>${dateMoyenne(x.j)} ${x.j.slice(0, 4)}${x.s === "direct" ? " · " + L("en direct", "live") : ""}</option>`).join("");
    sel.onchange = () => { E.cible = sel.value; convergence(); };
    if (!d) return;
    const r = serie(d, "r", pas) || serie(d, "r", "heure"), q = r.length > d.r.length;
    const hd = d.hr || [...Array(d.r.length).keys()], labels = q ? quarts(hd) : hd.map(heure);
    const dispo = HS.filter((h) => d.p[h]), cz = $("sem-cz");             // horizons cochés pour cette carte seulement
    cz.innerHTML = `<span class="choix-titre">${L("Afficher", "Show")}</span>` + dispo.map((h) => `<label class="choix-item"><input type="checkbox" data-h="${h}"${E.cz[h] ? " checked" : ""}>${pastH(h)}<span>${HZ(h)}</span></label>`).join("");
    cz.querySelectorAll("input").forEach((i) => i.addEventListener("change", () => { E.cz[i.dataset.h] = i.checked; convergence(); }));
    const vus = dispo.filter((h) => E.cz[h]), P = Object.fromEntries(vus.map((h) => [h, serie(d, h, q ? "quart" : "heure")]));
    const Nv = Object.fromEntries(vus.map((h) => [h, serie(d, "n" + h, q ? "quart" : "heure")]));
    const ds = [dsMarche(r)];
    for (const h of [...vus].reverse()) ds.push({ label: `${L("Prévu", "Forecast")} ${HZ(h)}`, data: P[h], borderColor: couleurH(h), backgroundColor: couleurH(h), fill: false, borderWidth: h === 1 ? 2.5 : 1.8, cubicInterpolationMode: "monotone" });
    lier(dessiner("sem-pc", { type: "line", data: { labels, datasets: ds }, options: options(12, true), plugins: [curseur] }), "sem-pc-t");
    const ea = (x) => (!x ? null : cp === "jour" ? (vide(moy(x)) ? null : Math.abs(moy(x) - moy(r)))                 // par jour : écart entre le prix moyen prévu et le prix moyen du marché
      : moy(x.map((p, i) => (vide(p) || vide(r[i]) ? null : Math.abs(p - r[i])))));
    const qui = cp === "jour" ? L("sur le prix moyen du jour", "on the daily average price") : q ? L("au quart d'heure", "per quarter-hour") : L("à l'heure", "per hour");
    const err = (h) => ea(P[h]), errN = (h) => ea(Nv[h]), mr = moy(r.map((x) => (vide(x) ? null : Math.abs(x))));
    const gain = (h) => { const a = err(h), b = errN(h); return vide(a) || vide(b) || !b ? "–" : `<span class="${a < b ? "positif" : ""}">${signe(100 * (1 - a / b), 0)} %</span>`; };
    let html = `<thead><tr><th>${L("Heure", "Time")}</th><th>${pastR()} ${L("Marché", "Market")}</th>${vus.map((h) => `<th>${pastH(h)} ${HZ(h)}</th>`).join("")}</tr></thead><tbody>`;
    labels.forEach((x, i) => { html += `<tr data-i="${i}"><td>${x}</td><td class="reel">${nombre(r[i])}</td>${vus.map((h) => celluleEcartPrix(P[h][i], r[i])).join("")}</tr>`; });
    html += `</tbody><tfoot><tr><td>${L("Moyenne", "Average")}</td><td class="reel">${nombre(moy(r))}</td>${vus.map((h) => `<td>${nombre(moy(P[h]))}</td>`).join("")}</tr>`
      + `<tr><td>${L("Erreur", "Error")} ${qui} (€/MWh)</td><td class="reel">–</td>${vus.map((h) => `<td>${nombre(err(h), 2)}</td>`).join("")}</tr>`
      + `<tr><td>${L("Erreur", "Error")} ${qui} (${L("% du prix moyen", "% of average price")})</td><td class="reel">–</td>${vus.map((h) => `<td>${vide(err(h)) || !mr ? "–" : nombre((100 * err(h)) / mr, 1) + " %"}</td>`).join("")}</tr>`
      + `<tr><td>${pastN(false)} ${L("Erreur du dernier jour connu", "Error of last known day")} ${qui}</td><td class="reel">–</td>${vus.map((h) => `<td>${nombre(errN(h), 2)}</td>`).join("")}</tr>`
      + `<tr><td>${L("Gain contre le dernier jour connu", "Gain vs last known day")}</td><td class="reel">–</td>${vus.map((h) => `<td>${gain(h)}</td>`).join("")}</tr></tfoot>`;
    $("sem-pc-t").innerHTML = html;
    collerEntetes($("sem-pc-t"));
    $("sem-pc-n").textContent = (d.s === "direct" ? L("Prévisions publiées. ", "Published forecasts. ") : L("Jour recalculé après coup, avec seulement ce qui était connu à midi le jour de chaque émission. ", "Day recomputed afterwards, using only what was known at noon on each issue day. "))
      + (cp === "jour" ? L("Par jour : écart entre le prix moyen prévu de la journée et le prix moyen du marché. ", "Daily: gap between the forecast daily average and the market daily average. ")
        : L(`Erreur ${qui} : écart moyen, en valeur absolue, entre le prix prévu et le prix du marché sur chaque ${q ? "quart d'heure" : "heure"} de la journée. `, `Error ${qui}: mean absolute gap between forecast and market price over each ${q ? "quarter-hour" : "hour"} of the day. `))
      + (cp === "quart" && !q ? L("Prix du marché au quart d'heure indisponible pour ce jour (avant le 01/10/2025) : calcul à l'heure. ", "Quarter-hour market price not available for this day (before 01/10/2025): computed per hour. ") : "")
      + L("Le % rapporte l'erreur au prix moyen du jour. Dernier jour connu = prix du dernier jour connu à l'émission (même heure) : pour J+h, le prix d'il y a h jours. Gain : erreur en moins par rapport à ce repère. ",
        "The % divides the error by the day's average price. Last known day = price of the last day known at issue time (same hour): for D+h, the price h days before. Gain: error reduction vs this benchmark. ")
      + (q ? L("Au quart d'heure, J+2 à J+7 : courbe interpolée entre les heures.", "At quarter-hour resolution, D+2 to D+7: curve interpolated between hours.") : "");
  }
  function celluleEcartPrix(p, r) {                                    // prix prévu, case teintée selon l'écart au marché
    if (vide(p) || vide(r)) return "<td>–</td>";
    const a = Math.min(Math.abs(p - r) / 80, 1) * 0.22;
    return `<td style="background-color:rgba(var(--ecart-rgb),${a.toFixed(3)})" title="${L("écart", "gap")} ${signe(p - r)}">${nombre(p)}</td>`;
  }
  function vuePerformance(corps) {
    const H = HIST();
    if (H.length && (!E.du || !E.au)) { E.du = H[0].j; E.au = H[H.length - 1].j; }
    const js = joursPeriode();
    const carte = (titre, contenu, note = "") => `<div class="carte"><h3 class="petit-titre">${titre}</h3>${note ? `<p class="note">${note}</p>` : ""}${contenu}</div>`;
    corps.innerHTML = `<div class="carte"><div class="sem-outils"><div class="segments" id="sem-per" role="group"></div><div class="perf-dates" id="sem-dates"${E.per === "dates" ? "" : " hidden"}><label>${L("Du", "From")} <input type="date" id="sem-du" min="${H.length ? H[0].j : ""}" max="${H.length ? H[H.length - 1].j : ""}" value="${E.du || ""}"></label>`
      + `<label>${L("au", "to")} <input type="date" id="sem-au" min="${H.length ? H[0].j : ""}" max="${H.length ? H[H.length - 1].j : ""}" value="${E.au || ""}"></label></div><div class="segments" id="sem-ppas" role="group"></div></div>`
      + `<p class="note">${L(`Pour chaque jour visé, la prévision faite 1, 2 ... 7 jours avant (à midi le jour d'émission) est comparée au prix du marché. Du 01/09/2026 à la mise en ligne : prévisions simulées après coup chaque jour avec le même calcul que le service ; à partir du ${dateLongue(S.debut_direct || "2026-11-16")} : prévisions publiées. Repère naïf : le prix du dernier jour connu à l'émission (même heure), le plus précis des repères simples.`,
        `For each target day, the forecast made 1, 2 ... 7 days before (at noon on the issue day) is compared with the market price. From 01/09/2026 until going live: forecasts simulated afterwards every day with the same computation as the live service; from ${dateLongue(S.debut_direct || "2026-11-16")}: published forecasts. Naive benchmark: the price of the last day known at issue time (same hour), the most accurate simple benchmark.`)}`
      + (E.ppas === "quart" ? " " + L("Au quart d'heure : J+1 = prévision du site ; J+2 à J+7 = courbe interpolée entre les heures.", "Quarter-hour: D+1 = the site's forecast; D+2 to D+7 = curve interpolated between hours.") : "")
      + (E.ppas === "jour" ? " " + L("Par jour : erreur sur le prix moyen de chaque journée.", "Daily: error on each day's average price.") : "") + `</p>`
      + (js.length ? "" : `<p class="avis-source">${L("Aucun jour visé dont le prix est connu sur cette période.", "No target day with a known price in this period.")}</p>`)
      + `<div class="tuiles" id="sem-tuiles"></div><div class="cadre-table libre"><table id="sem-resume" class="table-donnees"></table></div>`
      + `<p class="note">${L("Erreur moyenne = écart absolu moyen entre le prix prévu et le prix du marché ; erreur relative = rapportée au prix moyen ; biais = écart moyen (positif : prévision trop haute). Le repère est jugé sur les mêmes jours que la prévision.", "Mean error = mean absolute gap between forecast and market price; relative error = divided by the average price; bias = mean gap (positive: forecast too high). The benchmark is scored on the same days as the forecast.")}</p></div>`
      + `<div class="choix" id="sem-choix"></div>`
      + carte(L("Prévu contre marché sur la période", "Forecast vs market over the period"), `<div class="graphique haut"><canvas id="sem-pp" role="img" aria-label="${L("Prévu contre marché", "Forecast vs market")}"></canvas></div>`)
      + carte(L("Erreur selon l'horizon", "Error by horizon"), `<div class="graphique moyen"><canvas id="sem-ph" role="img" aria-label="${L("Erreur selon l'horizon", "Error by horizon")}"></canvas></div>`)
      + `<div class="deux-cartes">` + carte(L("Erreur jour par jour", "Error day by day"), `<div class="graphique"><canvas id="sem-pj" role="img" aria-label="${L("Erreur jour par jour", "Error day by day")}"></canvas></div><p class="note" id="sem-pj-n"></p>`)
      + carte(L("Erreur selon l'heure de la journée", "Error by hour of day"), `<div class="graphique"><canvas id="sem-ph2" role="img" aria-label="${L("Erreur selon l'heure", "Error by hour")}"></canvas></div>`) + `</div>`
      + carte(L("Comment la prévision d'un jour a évolué", "How the forecast of one day evolved"),
        `<div class="sem-outils"><label>${L("Jour visé", "Target day")} <select id="sem-cible"></select></label><div class="segments" id="sem-cpas" role="group"></div></div><div class="choix" id="sem-cz"></div>`
        + `<div class="graphique haut"><canvas id="sem-pc" role="img" aria-label="${L("Prévisions successives d'un jour", "Successive forecasts of one day")}"></canvas></div><div class="cadre-table grand"><table id="sem-pc-t" class="table-donnees"></table></div><p class="note" id="sem-pc-n"></p>`);
    segments("sem-per", [["tout", L("Tout l'historique", "Full history")], ["7", L("7 derniers jours", "Last 7 days")], ["30", L("30 derniers jours", "Last 30 days")], ["direct", L("Depuis la mise en ligne", "Since going live")], ["dates", L("Dates précises", "Custom dates")]],
      E.per, (v) => { E.per = v; rendre(); });
    segments("sem-ppas", [["quart", L("Quart d'heure", "Quarter-hour")], ["heure", L("Heure", "Hour")], ["jour", L("Par jour", "Daily")]], E.ppas, (v) => { E.ppas = v; rendre(); });
    const date = (cle, id) => $(id).addEventListener("change", (e) => { const v = e.target.value; if (!v) return; E[cle] = v; if (E.du > E.au) { if (cle === "du") E.au = v; else E.du = v; } rendre(); });
    date("du", "sem-du"); date("au", "sem-au");
    choixPerf("sem-choix");
    resume(js); courbePeriode(js); courbeJours(js); courbeHeures(js); convergence();
  }

  /* ------------------------------------------------------------ onglet */
  function rendre() {
    const corps = $("sem-corps");
    if (!S || Date.now() - charge > 600000) {
      if (!S) corps.innerHTML = `<div class="carte"><p class="note">${L("Chargement de la prévision à 7 jours…", "Loading the 7-day forecast…")}</p></div>`;
      if (!demande) {
        demande = true;
        fetch("data/semaine.json?" + Date.now()).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
          .then((d) => { if (d.emissions) d.emissions = d.emissions.filter((e) => e.jour_emission >= "2026-08-31"); const neuf = !S || S.emis !== d.emis; S = d; charge = Date.now(); demande = false; if (neuf) { E.em = null; E.k = Math.min(E.k, S.jours.length - 1); } if (etat.onglet === "semaine") rendre(); })
          .catch(() => { demande = false; if (!S) corps.innerHTML = `<div class="carte"><p class="note">${L("La prévision à 7 jours n'est pas encore disponible.", "The 7-day forecast is not available yet.")}</p></div>`; });
      }
      if (!S) return;
    }
    const y = scrollY;
    corps.innerHTML = `<div class="segments grands" id="sem-vue" role="group"></div><div id="sem-vue-corps"></div>`;
    segments("sem-vue", [["prevision", L("Prévision", "Forecast")], ["performance", L("Performance / historique", "Performance / history")]], E.vue, (v) => { E.vue = v; rendre(); });
    (E.vue === "prevision" ? vuePrevision : vuePerformance)($("sem-vue-corps"));
    scrollTo(0, y);
  }
  return { rendre };
})();
