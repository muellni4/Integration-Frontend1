<script>
  import AnforderungskatalogModifizieren from "../container/AnforderungskatalogModifizieren.svelte";
  export let params = {};

  let grouprequirementId;

  $: {
    grouprequirementId = params.id;
  }
</script>

<div class="container mt-3">
  <AnforderungskatalogModifizieren bind:grouprequirementId />
</div>
