/* Le lien d'évitement ne doit pas être interprété comme une route d'onglet. */
document.querySelector(".aller-contenu").addEventListener("click", (event) => {
  event.preventDefault();
  const contenu = document.getElementById("contenu");
  contenu.focus({ preventScroll: true });
  contenu.scrollIntoView({ block: "start" });
});

/* Navigation au clavier adaptée à la colonne, puis à la barre mobile. */
const navigation = document.querySelector(".onglets");
const ecranEtroit = matchMedia("(max-width: 980px)");
function adapterNavigation() {
  navigation.setAttribute("aria-orientation", ecranEtroit.matches ? "horizontal" : "vertical");
}
adapterNavigation();
ecranEtroit.addEventListener("change", adapterNavigation);
navigation.addEventListener("keydown", (event) => {
  if (ecranEtroit.matches || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
  event.preventDefault();
  const onglets = [...navigation.querySelectorAll('[role="tab"]')];
  const actuel = onglets.findIndex((onglet) => onglet.getAttribute("aria-selected") === "true");
  const prochain = onglets[(actuel + (event.key === "ArrowDown" ? 1 : onglets.length - 1)) % onglets.length];
  prochain.focus();
  prochain.click();
});

const parametres = document.querySelector(".parametres");
parametres.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !parametres.open) return;
  parametres.open = false;
  parametres.querySelector("summary").focus();
});
document.addEventListener("click", (event) => {
  if (ecranEtroit.matches && parametres.open && !parametres.contains(event.target)) parametres.open = false;
});
