<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
  
    export let personId;
  
    let editMode = true;
  
    let person = {
        id: -1,
        name: "",
        email: "",
        zhawId: -1,
        courseIds: []
    }
  
    $: {
      person.id = personId;
      checkAndLoadPerson();
    }
  
    onMount(() => {
      checkAndLoadPerson();
    });
  
    function checkAndLoadPerson() {
      if (personId == undefined) editMode = false;
      else {
        getPersonById();
        editMode = true;
      }
    }
  
    function getPersonById() {
      axios
        .get(`http://localhost:8080/persons/${personId}`)
        .then((response) => {
          person = response.data;
          editMode = true;
        })
        .catch(() => {
          editMode = false;
        });
    }
  
    function savePerson() {
      if(editMode) {
        updatePerson();
      } else {
        createPerson();
      }
    }
  
    function createPerson() {
      if (person.name == "" || person.zhawId < 1 || person.email == "") {
        Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
        return;
      }
      axios
        .post("http://localhost:8080/persons/", person)
        .then((response) => {
          let id = response.data.id;
          Swal.fire(`Person erstellt (Id: ${id})`);
          skillId = id;
        });
    }
  
    function updatePerson() {
      if (person.name == "" || person.zhawId < 1 || person.email == "") {
        Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
        return;
      }
      axios
        .put("http://localhost:8080/persons/", person)
        .then((response) => {
          let id = response.data;
          Swal.fire(`Person (${id}) aktualisiert`);
        });
    }
  </script>
  <h1>Personinformationen</h1>
  <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Name</label>
      <input type="text" class="form-control" placeholder="Vorname Nachname" bind:value={person.name}>
    </div>
    <div class="mb-3">
    <label for="emailInput" class="form-label">Email Adresse</label>
    <input type="email" class="form-control" id="emailInput" placeholder="kuerzel@students.zhaw.ch" bind:value={person.email}>
  </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">ZHAW Id</label>
      <input type="text" class="form-control" placeholder="Findest du auf deiner Legi Karte" bind:value={person.zhawId}>
    </div>
    <button on:click={savePerson} class="btn btn-primary">
        Speichern
    </button>
  </form>