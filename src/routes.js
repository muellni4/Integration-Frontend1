// Pages
import Startseite from "./pages/Startseite.svelte";

import Anforderungskataloge from "./pages/Anforderungskataloge.svelte";
import AnforderungskatalogModifizieren from "./container/AnforderungskatalogModifizieren.svelte";

import Personen from "./pages/Personen.svelte";
import PersonModifizieren from "./container/PersonModifizieren.svelte";

import Faehigkeitsbewertung from "./pages/Faehigkeitsbewertung.svelte";

import Faehigkeiten from "./pages/Faehigkeiten.svelte";
import FaehigkeitModifizieren from "./container/FaehigkeitModifizieren.svelte";

import Kurse from "./pages/Kurse.svelte";
import KursModifizieren from "./container/KursModifizieren.svelte";

// Export the route definition object
export default {
  // Exact path
  "/": Startseite,
  "/Startseite": Startseite,

  "/Anforderungskataloge": Anforderungskataloge,
  "/Anforderungskataloge/Neu": AnforderungskatalogModifizieren,
  "/Anforderungskataloge/:id/Edit": AnforderungskatalogModifizieren,

  "/Personen": Personen,
  "/Personen/Neu": PersonModifizieren,
  "/Personen/:id/Edit": PersonModifizieren,

  "/Personen/:id/Faehigkeiten/Bewertung/": Faehigkeitsbewertung,

  "/Faehigkeiten/": Faehigkeiten,
  "/Faehigkeiten/Neu": FaehigkeitModifizieren,
  "/Faehigkeiten/:id/Edit": FaehigkeitModifizieren,

  "/Kurse/": Kurse,
  "/Kurse/Neu": KursModifizieren,
  "/Kurse/:id/Edit": KursModifizieren,
};
