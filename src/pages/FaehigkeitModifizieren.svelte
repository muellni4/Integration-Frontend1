<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
  
    export let skillId;
  
    let editMode = true;
  
    let skill = {
        id: -1,
        name: "",
        description: ""
    }
  
    $: {
      skill.id = skillId;
      checkAndLoadSkill();
    }
  
    onMount(() => {
      checkAndLoadSkill();
    });
  
    function checkAndLoadSkill() {
      if (skillId == undefined) editMode = false;
      else {
        getSkillById();
        editMode = true;
      }
    }
  
    function getSkillById() {
      axios
        .get(`http://localhost:8080/skills/${skillId}`)
        .then((response) => {
          skill = response.data;
          editMode = true;
        })
        .catch(() => {
          editMode = false;
        });
    }
  
    function saveSkill() {
      if(editMode) {
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
      axios
        .post("http://localhost:8080/skills/", skill)
        .then((response) => {
          let id = response.data.id;
          Swal.fire(`Fähigkeit erstellt (Id: ${id})`);
          skillId = id;
        });
    }
  
    function updateSkill() {
      if (skill.name == "" || skill.description == "") {
        Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
        return;
      }
      axios
        .put("http://localhost:8080/skills/", skill)
        .then((response) => {
          let id = response.data;
          Swal.fire(`Fähigkeit (${id}) aktualisiert`);
        });
    }
  </script>
  
  
  <h1>Fähigkeit</h1>
  
  
  <form>
  
   <div class="mb-3">
    <label for="skillname" class="form-label">Name</label>
    <input type="text" class="form-control" bind:value={skill.name}>
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Beschreibung</label>
    <input type="text" class="form-control" bind:value={skill.description}>
    <textarea type="text" class="form-control" bind:value={skill.description}></textarea>
  </div>

  <button on:click={saveSkill} class="btn btn-primary">
    Speichern
  </button>
  </form>
  
  <br>