<script>
  import PersonModifizieren from "../container/PersonModifizieren.svelte";
  export let params = {};

  let personId;

  $: {
    personId = params.id;
  }
</script>

<div class="container mt-3">
  <PersonModifizieren bind:personId />
</div>
