<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { pop } from "svelte-spa-router";
  import Swal from "sweetalert2";

  export let params = {};

  let editMode = true;

  let skill = {
    id: -1,
    name: "",
    description: "",
  };

  $: {
    params.id;
    checkAndLoadSkill();
  }

  onMount(() => {
    checkAndLoadSkill();
    skill.id = params.id;
  });

  function checkAndLoadSkill() {
    if (params.id == undefined) editMode = false;
    else {
      getSkillById();
      editMode = true;
    }
  }

  function getSkillById() {
    axios
      .get(`http://localhost:8080/skills/${params.id}`)
      .then((response) => {
        skill = response.data;
        editMode = true;
      })
      .catch(() => {
        editMode = false;
      });
  }

  function saveSkill() {
    if (editMode) {
      updateSkill();
    } else {
      createSkill();
    }
  }

  function createSkill() {
    if (skill.name == "" || skill.description == "") {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios.post("http://localhost:8080/skills/", skill).then((response) => {
      let id = response.data.id;
      Swal.fire(`Fähigkeit erstellt (Id: ${id})`);
      params.id = id;
      window.location.href = `?#/Faehigkeiten/${id}/Edit`;
    });
  }

  function updateSkill() {
    if (skill.name == "" || skill.description == "") {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios.put("http://localhost:8080/skills/", skill).then((response) => {
      let id = response.data;
      Swal.fire(`Fähigkeit (${id}) aktualisiert`);
    });
  }
</script>

<h1>Fähigkeit</h1>

<form>
  <div class="mb-3">
    <label for="skillname" class="form-label">Name</label>
    <input type="text" class="form-control" bind:value={skill.name} />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Beschreibung</label>
    <textarea type="text" class="form-control" bind:value={skill.description} />
  </div>
  <button on:click={saveSkill} class="btn btn-primary"> Speichern </button>
  <button
    on:click={() => {
      pop();
    }}
    class="btn btn-danger"
  >
    Zurück
  </button>
</form>
<br />

<style>
  textarea {
    width: 100%;
    height: 40vh;
    min-height: 100px;
  }
</style>
