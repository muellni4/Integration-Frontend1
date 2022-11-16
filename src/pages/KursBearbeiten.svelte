<script>
  import KursModifizieren from "../container/KursModifizieren.svelte";
  export let params = {};

  let courseId;

  $: {
    courseId = params.id;
  }
</script>

<div class="container mt-3">
  <KursModifizieren bind:courseId />
</div>
