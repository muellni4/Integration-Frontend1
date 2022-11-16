// Pages
import Startseite from "./pages/Startseite.svelte";

import Anforderungskataloge from "./pages/Anforderungskataloge.svelte";
import AnforderungskatalogErstellen from "./pages/AnforderungskatalogErstellen.svelte";
import AnforderungskatalogBearbeiten from "./pages/AnforderungskatalogBearbeiten.svelte";

import Personen from "./pages/Personen.svelte";
import PersonErstellen from "./pages/PersonErstellen.svelte";
import PersonBearbeiten from "./pages/PersonBearbeiten.svelte";

import Faehigkeitsbewertung from "./pages/Faehigkeitsbewertung.svelte";

import Faehigkeiten from "./pages/Faehigkeiten.svelte";
import FaehigkeitErstellen from "./pages/FaehigkeitErstellen.svelte";
import FaehigkeitBearbeiten from "./pages/FaehigkeitBearbeiten.svelte";

import Kurse from "./pages/Kurse.svelte";
import KursErstellen from "./pages/KursErstellen.svelte";
import KursBearbeiten from "./pages/KursBearbeiten.svelte";

// Export the route definition object
export default {
  // Exact path
  "/": Startseite,
  "/Startseite": Startseite,

  "/Anforderungskataloge": Anforderungskataloge,
  "/Anforderungskataloge/Neu": AnforderungskatalogErstellen,
  "/Anforderungskataloge/Edit": AnforderungskatalogBearbeiten,

  "/Personen": Personen,
  "/Personen/Neu": PersonErstellen,
  "/Personen/:id/Edit": PersonBearbeiten,

  "/Personen/:id/Faehigkeiten/Bewertung/": Faehigkeitsbewertung,

  "/Faehigkeiten/": Faehigkeiten,
  "/Faehigkeiten/Neu": FaehigkeitErstellen,
  "/Faehigkeiten/:id/Edit": FaehigkeitBearbeiten,

  "/Kurse/": Kurse,
  "/Kurse/Neu": KursErstellen,
  "/Kurse/:id/Edit": KursBearbeiten,
};
