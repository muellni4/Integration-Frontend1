<script>
  import FaehigkeitModifizieren from "../container/FaehigkeitModifizieren.svelte";
  export let params = {};

  let skillId;

  $: {
    skillId = params.id;
  }
</script>

<div class="container mt-3">
  <FaehigkeitModifizieren bind:skillId />
</div>
