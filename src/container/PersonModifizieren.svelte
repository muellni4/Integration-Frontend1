<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import Faehigkeitsbewertung from "../pages/Faehigkeitsbewertung.svelte";

  export let params = {};

  let editMode = true;

  let person = {
    id: -1,
    name: "",
    email: "",
    zhawId: undefined,
    courseIds: [],
  };

  $: {
    params.id;
    checkAndLoadPerson();
  }

  onMount(() => {
    person.id = params.id;
    checkAndLoadPerson();
  });

  function checkAndLoadPerson() {
    if (params.id == undefined) editMode = false;
    else {
      getPersonById();
      editMode = true;
    }
  }

  function getPersonById() {
    axios
      .get(`http://localhost:8080/persons/${params.id}`)
      .then((response) => {
        person = response.data;
        editMode = true;
      })
      .catch(() => {
        editMode = false;
      });
  }

  function savePerson() {
    if (editMode) {
      updatePerson();
    } else {
      createPerson();
    }
  }

  function validEmail(value) {
    return (
      value &&
      value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    );
  }

  function createPerson() {
    if (person.name == "" || person.zhawId < 1 || !validEmail(person.email)) {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios.post("http://localhost:8080/persons/", person).then((response) => {
      let id = response.data.id;
      Swal.fire(`Person erstellt (Id: ${id})`);
      params.id = id;
    });
  }

  function updatePerson() {
    if (person.name == "" || person.zhawId < 1 || person.email == "") {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios.put("http://localhost:8080/persons/", person).then((response) => {
      let id = response.data;
      Swal.fire(`Person (${id}) aktualisiert`);
    });
  }
</script>

<h1>Personinformationen</h1>
<form>
  <div class="mb-3">
    <label for="nameInput" class="form-label">Name</label>
    <input
      type="text"
      class="form-control"
      placeholder="Vorname Nachname"
      bind:value={person.name}
    />
  </div>
  <div class="mb-3">
    <label for="emailInput" class="form-label">Email Adresse</label>
    <input
      type="email"
      class="form-control"
      id="emailInput"
      placeholder="kuerzel@students.zhaw.ch"
      bind:value={person.email}
    />
  </div>
  <div class="mb-3">
    <label for="zhawIdInput" class="form-label">ZHAW Id</label>
    <input
      type="text"
      class="form-control"
      placeholder="Findest du auf deiner Legi Karte"
      bind:value={person.zhawId}
    />
  </div>
  <button on:click={savePerson} class="btn btn-primary"> Speichern </button>
  <a class="btn btn-danger" href={`#/Personen/`} role="button"> Zurück </a>
  {#if editMode}
    <a
      class="btn btn-primary btn-sm rounded-2"
      href={`?#/Personen/${params.id}/Faehigkeiten/Bewertung`}
      role="button"
    >
      Fähigkeitsbewertung durchführen
    </a>
    <Faehigkeitsbewertung bind:params />
  {/if}
</form>
<br />
