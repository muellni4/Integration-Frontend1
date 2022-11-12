<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Button from "./Forms/Button.svelte";
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>


<Header />

<main>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="#/startseite">Kurse</a>
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
						<a class="nav-link" href="#/anforderungskatalog"
							>Anforderungskataloge</a
						>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/personen"
							>Personen</a
						>
					</li>
					
					<li class="nav-item">
						<a class="nav-link" href="#/faehigkeitsbewertung">Fähigkeitsbewertung</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container mt-3">
		<Router {routes} />
	</div>
</main>

<Footer />

<style>
	main {
		background-color: #bfefff;
		min-height: 1000px;
	}
</style>
