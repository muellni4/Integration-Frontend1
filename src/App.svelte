<script>
  import Header from "./components/Header.svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<Header />

<main>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="?#/Kurse">Kurse</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="?#/Anforderungskataloge"
              >Anforderungskataloge</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="?#/Personen">Personen</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="?#/Faehigkeiten"
              >Fähigkeiten</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-3">
    <Router {routes} />
  </div>
</main>

<style>
  main {
    background-color: #F4FEED;
    min-height: 1000px;
  }
</style>
