/* Onglet « 7 jours » (17/11/2026) : lit data/semaine.json (prévision de J+1 à J+7 émise chaque jour vers midi) et dessine tuiles, courbe avec fourchette, tableau et précision par horizon.
   S'appuie sur les utilitaires d'app.js (etat, css, nombre, signe, tuile, dessiner, options, dateMoyenne, dateHeure, $). Aucune source ni méthode affichée (site anonymisé). */
window.SEMAINE = (() => {
  let S = null, demande = false;
  const L = (fr, en) => (etat.langue === "fr" ? fr : en);
  const moy = (a) => { const v = (a || []).filter((x) => x !== null && x !== undefined); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
  const imin = (a) => a.indexOf(Math.min(...a)), imax = (a) => a.indexOf(Math.max(...a));
  const heure = (h) => String(h).padStart(2, "0") + (etat.langue === "fr" ? " h" : ":00");
  const hj = (j, i) => (j.heures ? j.heures[i] : i);
  const euros = (v, d = 1) => `${nombre(v, d)} <small>€/MWh</small>`;
  const couleur = (j) => css(j.h === 1 ? "--s-e2" : "--s-tout");
  const tranche = (j, a, b) => moy(j.prix.filter((_, i) => hj(j, i) >= a && hj(j, i) < b));

  function tuileJour(j) {
    const m = moy(j.prix), b = moy(j.bas), h = moy(j.haut), r = j.reel ? moy(j.reel) : null;
    const lib = `<span class="sem-horizon" style="--c:${couleur(j)}">J+${j.h}</span> ${dateMoyenne(j.jour)}`;
    const det = `${L("fourchette", "range")} ${nombre(b, 0)} – ${nombre(h, 0)}` + (r !== null ? `<br>${L("marché", "market")} ${nombre(r)} (${L("écart", "gap")} ${signe(m - r)})` : "");
    return tuile(lib, euros(m), det, L("Moyenne de la journée", "Daily average"));
  }

  function courbe() {
    const J = S.jours, lab = [], prix = [], bas = [], haut = [], reel = [], qui = [];
    J.forEach((j, k) => j.prix.forEach((p, i) => { lab.push(i === 0 ? dateMoyenne(j.jour) : ""); prix.push(p); bas.push(j.bas[i]); haut.push(j.haut[i]); reel.push(j.reel ? j.reel[i] : null); qui.push([k, i]); }));
    const c1 = css("--s-e2"), c2 = css("--s-tout"), n1 = J[0].prix.length;
    const o = options(8);
    const court = (i) => new Date(J[qui[i][0]].jour + "T12:00:00").toLocaleDateString(etat.langue === "fr" ? "fr-FR" : "en-GB", { weekday: "narrow", day: "numeric" });
    o.scales.x.ticks = { ...o.scales.x.ticks, autoSkip: false, maxRotation: 0, callback: (v, i) => (lab[i] ? (window.innerWidth < 600 ? court(i) : lab[i]) : null) };
    o.scales.x.grid = { display: true, color: (c) => (lab[c.index] ? css("--grid") : "transparent") };
    o.plugins.tooltip.callbacks.title = (it) => { const [k, i] = qui[it[0].dataIndex], j = J[k]; return `${dateMoyenne(j.jour)} · ${heure(hj(j, i))} · J+${j.h}`; };
    o.plugins.tooltip.filter = (it) => !it.dataset.label.startsWith("_") && it.parsed.y !== null;
    const ds = [
      { label: "_bas", data: bas, borderWidth: 0, pointRadius: 0, fill: false },
      { label: L("Fourchette (8 cas sur 10)", "Range (8 cases in 10)"), data: haut, borderWidth: 0, pointRadius: 0, backgroundColor: css("--bande"), borderColor: css("--bande"), fill: "-1" },
      { label: L("Prix prévu", "Forecast price"), data: prix, borderColor: c2, backgroundColor: c2, fill: false, segment: { borderColor: (c) => (c.p0DataIndex < n1 ? c1 : c2) } },
    ];
    if (reel.some((x) => x !== null)) ds.push({ label: L("Prix du marché", "Market price"), data: reel, borderColor: css("--ink"), backgroundColor: css("--ink"), borderWidth: 1.5, fill: false });
    dessiner("sem-g", { type: "line", data: { labels: lab.map((x, i) => i), datasets: ds }, options: { ...o, plugins: { ...o.plugins, legend: { ...o.plugins.legend, display: true } } } });
  }

  function table() {
    const tete = [L("Jour", "Day"), L("Horizon", "Horizon"), L("Moyenne", "Average"), L("Fourchette", "Range"), L("Nuit (0-8 h)", "Night (0-8)"), L("Journée (8-20 h)", "Day (8-20)"),
                  L("Soir (20-24 h)", "Evening (20-24)"), L("Heure la moins chère", "Cheapest hour"), L("Heure la plus chère", "Dearest hour"), L("Marché", "Market")];
    const lignes = S.jours.map((j) => {
      const p = j.prix, a = imin(p), b = imax(p);
      return `<tr><th scope="row">${dateMoyenne(j.jour)}</th><td>J+${j.h}</td><td class="num"><strong>${nombre(moy(p))}</strong></td><td class="num">${nombre(moy(j.bas), 0)} – ${nombre(moy(j.haut), 0)}</td>` +
        `<td class="num">${nombre(tranche(j, 0, 8))}</td><td class="num">${nombre(tranche(j, 8, 20))}</td><td class="num">${nombre(tranche(j, 20, 24))}</td>` +
        `<td class="num">${heure(hj(j, a))} · ${nombre(p[a], 0)}</td><td class="num">${heure(hj(j, b))} · ${nombre(p[b], 0)}</td><td class="num">${j.reel ? nombre(moy(j.reel)) : "–"}</td></tr>`;
    });
    $("sem-table").innerHTML = `<thead><tr>${tete.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead><tbody>${lignes.join("")}</tbody>`;
  }

  function precision() {
    const P = S.precision || [];
    if (!P.length) { $("sem-prec-carte").hidden = true; return; }
    const o = options(8);
    o.scales.y.title.text = L("erreur moyenne à l'heure (€/MWh)", "mean hourly error (€/MWh)");
    o.scales.y.beginAtZero = true;
    o.plugins.tooltip.filter = () => true;
    dessiner("sem-g-prec", { type: "bar", data: { labels: P.map((x) => "J+" + x.h), datasets: [
      { label: L("Notre prévision", "Our forecast"), data: P.map((x) => x.modele), backgroundColor: P.map((x) => css(x.h === 1 ? "--s-e2" : "--s-tout")), borderRadius: 4, maxBarThickness: 46 },
      { label: L("Repère naïf (dernier prix connu ou semaine d'avant)", "Naive benchmark (last known price or week before)"), data: P.map((x) => x.naif), backgroundColor: css("--muted"), borderRadius: 4, maxBarThickness: 46 },
    ] }, options: { ...o, plugins: { ...o.plugins, legend: { ...o.plugins.legend, display: true } } } });
    $("sem-prec-table").innerHTML = `<thead><tr><th scope="col">${L("Horizon", "Horizon")}</th>${P.map((x) => `<th scope="col">J+${x.h}</th>`).join("")}</tr></thead><tbody>` +
      `<tr><th scope="row">${L("Notre prévision", "Our forecast")}</th>${P.map((x) => `<td class="num"><strong>${nombre(x.modele)}</strong></td>`).join("")}</tr>` +
      `<tr><th scope="row">${L("Repère naïf", "Naive benchmark")}</th>${P.map((x) => `<td class="num">${nombre(x.naif)}</td>`).join("")}</tr>` +
      `<tr><th scope="row">${L("Erreur en moins", "Error reduction")}</th>${P.map((x) => `<td class="num">−${nombre(100 * (1 - x.modele / x.naif), 0)} %</td>`).join("")}</tr></tbody>`;
  }

  function rendre() {
    const corps = $("sem-corps");
    if (!S) {
      corps.innerHTML = `<div class="carte"><p class="note">${L("Chargement de la prévision à 7 jours…", "Loading the 7-day forecast…")}</p></div>`;
      if (!demande) {
        demande = true;
        fetch("data/semaine.json?" + Date.now()).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).then((d) => { S = d; if (etat.onglet === "semaine") rendre(); })
          .catch(() => { corps.innerHTML = `<div class="carte"><p class="note">${L("La prévision à 7 jours n'est pas encore disponible.", "The 7-day forecast is not available yet.")}</p></div>`; demande = false; });
      }
      return;
    }
    const J = S.jours, emis = dateHeure(S.emis);
    corps.innerHTML =
      (S.note ? `<div class="sem-essai">${S.note[etat.langue]}</div>` : "") +
      `<div class="carte"><h3 class="petit-titre">${L("Prix prévus pour les 7 prochains jours", "Forecast prices for the next 7 days")}</h3>` +
      `<p class="note">${L(`Prévision publiée le ${emis}, mise à jour chaque jour vers midi. Demain (J+1) : la prévision de l'onglet « Prévision ». De J+2 à J+7 : un modèle par horizon. Plus le jour est loin, plus la fourchette s'élargit.`,
        `Forecast published on ${emis}, updated every day around noon. Tomorrow (D+1): the forecast of the “Forecast” tab. D+2 to D+7: one model per horizon. The further the day, the wider the range.`)}</p>` +
      `<div class="tuiles">${J.map(tuileJour).join("")}</div>` +
      `<div class="graphique haut"><canvas id="sem-g" role="img" aria-label="${L("Prix prévus heure par heure sur 7 jours", "Hourly forecast prices over 7 days")}"></canvas></div></div>` +
      `<div class="carte"><h3 class="petit-titre">${L("Jour par jour", "Day by day")}</h3><p class="note">${L("Prix en €/MWh, heure de Paris.", "Prices in €/MWh, Paris time.")}</p><div class="cadre-table libre"><table id="sem-table" class="table-donnees"></table></div></div>` +
      `<div class="carte" id="sem-prec-carte"><h3 class="petit-titre">${L("Précision selon l'horizon", "Accuracy by horizon")}</h3>` +
      `<p class="note">${S.precision_note ? S.precision_note[etat.langue] : ""}</p>` +
      `<div class="graphique moyen"><canvas id="sem-g-prec" role="img" aria-label="${L("Erreur moyenne selon l'horizon", "Mean error by horizon")}"></canvas></div><div class="cadre-table libre"><table id="sem-prec-table" class="table-donnees"></table></div></div>`;
    courbe(); table(); precision();
  }
  return { rendre };
})();
