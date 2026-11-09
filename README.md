# Prix de l'électricité de demain en France

Site : prévision quotidienne du prix day-ahead de l'électricité en France (enchère EPEX, au quart d'heure) par trois modèles de machine learning,
comparée chaque jour au prix fixé par le marché.

- **Tout GFS + gaz** (modèle principal) : prévisions météo GFS (NOAA), consommation prévue par RTE, calendrier, prix passés, prix du gaz TTF.
- **Avec notre prévision de production** : idem, avec la production solaire et éolienne prévue par nos propres modèles.
- **Prix rapporté au gaz** (en test) : idem que le principal, prix appris rapporté au coût du gaz.

Les prévisions sont calculées chaque matin, avant la publication des prix vers 12 h 45, puis comparées au marché dans l'après-midi.
Ce dépôt ne contient que le site (HTML, JavaScript) et ses données (`data/donnees.json`) ; les modèles tournent ailleurs.

Projet étudiant (emlyon business school), réalisé avec l'aide de Claude (Anthropic). Ce n'est pas un conseil d'investissement.
Prix du marché : EPEX SPOT via [Energy-Charts](https://www.energy-charts.info) (Fraunhofer ISE). Météo : NOAA GFS. Consommation : RTE / ODRÉ (éCO2mix).
