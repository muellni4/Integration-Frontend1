// Pages
import Startseite from "./pages/Startseite.svelte"
import Anforderungskatalog from "./pages/Anforderungskatalog.svelte"
import Personen from "./pages/Personen.svelte"

import Faehigkeitsbewertung from "./pages/Faehigkeitsbewertung.svelte"
import Faehigkeiten from "./pages/Faehigkeiten.svelte"
import AddPerson from "./pages/AddPerson.svelte"


// Export the route definition object
export default {
    // Exact path
    
    '/Startseite': Startseite,
    '/Anforderungskatalog': Anforderungskatalog,
    '/Personen': Personen,
    '/Faehigkeitsbewertung/': Faehigkeitsbewertung,

    '/Faehigkeiten/': Faehigkeiten,
    '/AddPerson/': AddPerson,

 
}