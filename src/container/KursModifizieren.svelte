<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import { pop } from "svelte-spa-router";
  import Group from "./Group.svelte";

  export let params = {};

  let editMode = true;

  let allGroupRequirements = [];

  let allPersonsNotAttending = [];

  let courseAttendees = [];

  let newAttendees = [];

  let selectedPerson;

  let groupCompositions = [];

  let course = {
    id: -1,
    name: "",
    courseActive: true,
    groupRequirementId: -1,
  };

  $: {
    checkAndLoadCourse();
    getGroups();
  }

  onMount(() => {
    checkAndLoadCourse();
    getAllGroupRequirements();
    getAllPersonsNotAttending();
    getGroups();
    course.id = params.id;
  });

  function checkAndLoadCourse() {
    if (params.id == undefined) editMode = false;
    else {
      getCourseById();
      getAllAttendeesOfCourse();
      editMode = true;
    }
  }

  function getAllGroupRequirements() {
    axios.get("http://localhost:8080/grouprequirements/").then((response) => {
      allGroupRequirements = response.data;
    });
  }

  function getAllPersonsNotAttending() {
    if (params.id > 0) {
      axios
        .get(`http://localhost:8080/courses/${params.id}/persons/addable`)
        .then((response) => {
          allPersonsNotAttending = response.data;
        });
    } else {
      axios.get(`http://localhost:8080/persons`).then((response) => {
        allPersonsNotAttending = response.data;
      });
    }
  }

  function getAllAttendeesOfCourse() {
    if (params.id > 0) {
      axios
        .get(`http://localhost:8080/courses/${params.id}/persons`)
        .then((response) => {
          courseAttendees = response.data;
        });
    }
  }

  function getCourseById() {
    if (params.id > 0) {
      axios
        .get(`http://localhost:8080/courses/${params.id}`)
        .then((response) => {
          course.id = response.data.id;
          course.name = response.data.name;
          course.courseActive = response.data.courseActive;
          course.groupRequirementId = response.data.groupRequirement;
          groupCompositions = response.data.groupCompositions;
          editMode = true;
        })
        .catch(() => {
          editMode = false;
        });
    } else {
      editMode = false;
    }
  }

  function addAttendee() {
    newAttendees = [...newAttendees, selectedPerson];
    selectedPerson = -1;
  }

  function removeNewAttendee(newAttendee) {
    newAttendees = newAttendees.filter((value) => value.id !== newAttendee.id);
    allPersonsNotAttending = [...allPersonsNotAttending, newAttendee];
  }

  function removeAttendeeFromCourse(attendee) {
    courseAttendees = courseAttendees.filter(
      (value) => value.id !== attendee.id
    );
    axios
      .put(
        `http://localhost:8080/courses/${params.id}/persons/${attendee.id}/remove`
      )
      .then(() => {
        allPersonsNotAttending = [...allPersonsNotAttending, attendee];
      });
  }

  function saveCourse() {
    if (editMode) {
      updateCourse();
    } else {
      createCourse();
    }
    console.log(newAttendees);
    saveAttendees();
  }

  function createCourse() {
    if (course.name == "") {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios.post("http://localhost:8080/courses/", course).then((response) => {
      let id = response.data;
      Swal.fire(`Kurs erstellt (Id: ${id})`);
      params.id = id;
      window.location.href = `?#/Kurse/${id}/Edit`;
    });
  }

  function updateCourse() {
    if (course.name == "") {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios.put("http://localhost:8080/courses/", course).then((response) => {
      let id = response.data;
      Swal.fire(`Kurs (${id}) aktualisiert`);
    });
  }

  function saveAttendees() {
    if (newAttendees != []) {
      axios
        .put(`http://localhost:8080/courses/${params.id}/persons`, newAttendees)
        .then((response) => {
          let id = response.data;
        });
    }
  }

  function getGroups() {
    axios
      .get(`http://localhost:8080/courses/${params.id}/groups`)
      .then((response) => {
        groupCompositions = response.data;
      });
  }

  function generateGroups() {
    axios
      .post(`http://localhost:8080/courses/${params.id}/groups`)
      .then((response) => {
        groupCompositions = response.data;
        Swal.fire(`Gruppen wurden generiert`);
      });
  }
</script>

<h1>Kursinformationen</h1>
<form>
  <div class="mb-3">
    <label for="nameInput" class="form-label">Name</label>
    <input
      type="text"
      class="form-control"
      placeholder="Name des Kurses"
      bind:value={course.name}
    />
  </div>
  <div class="mb-3">
    <label for="courseActiveInput" class="form-label">Aktiv?</label>
    <input type="checkbox" bind:checked={course.courseActive} />
  </div>
  <div class="mb-3">
    <label for="groupRequirement" class="form-label">Anforderungskatalog</label>
    <select bind:value={course.groupRequirementId} class="form-select">
      <option value="-1">Auswählen</option>
      {#each allGroupRequirements as groupRequirement}
        <option value={groupRequirement.id}
          >{groupRequirement.name} ({groupRequirement.id})</option
        >
      {/each}
    </select>
  </div>
  <div class="mb-3">
    <h6>Teilnehmer</h6>
    <div class="mb-3">
      <table class="table m-0 table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">E-Mail</th>
            <th scope="col">Zhaw-ID</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {#each courseAttendees as attendee}
            <tr>
              <td>
                {attendee.id}
              </td>
              <td>
                {attendee.name}
              </td>
              <td>
                {attendee.email}
              </td>
              <td>
                {attendee.zhawId}
              </td>
              <td align="right">
                <ul class="list-inline-item">
                  <li class="list-inline-item">
                    <a
                      class="btn btn-primary btn-sm rounded-2"
                      href={`?#/Personen/${attendee.id}/Edit`}
                      role="button"
                      title="Edit"
                    >
                      <i class="bi bi-pencil-square" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <button
                      class="btn btn-danger btn-sm rounded-2"
                      type="button"
                      on:click={removeAttendeeFromCourse(attendee)}
                      title="Delete"
                    >
                      <i class="bi bi-dash-square" />
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          {/each}
          {#each newAttendees as newAttendee}
            <tr>
              <td>
                {newAttendee.id}
              </td>
              <td>
                {newAttendee.name}
              </td>
              <td>
                {newAttendee.email}
              </td>
              <td>
                {newAttendee.zhawId}
              </td>
              <td align="right">
                <ul class="list-inline-item">
                  <li class="list-inline-item">
                    <a
                      class="btn btn-primary btn-sm rounded-2"
                      href={`?#/Personen/${newAttendee.id}/Edit`}
                      role="button"
                      title="Edit"
                    >
                      <i class="bi bi-pencil-square" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <button
                      class="btn btn-danger btn-sm rounded-2"
                      type="button"
                      on:click={removeNewAttendee(newAttendee)}
                      title="Delete"
                    >
                      <i class="bi bi-dash-square" />
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <select bind:value={selectedPerson} class="form-select">
        <option value="-1">Auswählen</option>
        {#each allPersonsNotAttending as person}
          <option value={person}
            >[{person.id}] Name: {person.name} Zhaw Id: {person.zhawId}
          </option>
        {/each}
      </select>
    </div>
    <button on:click={addAttendee} class="btn btn-primary">
      Teilnehmer Hinzufügen
    </button>
  </div>
  <div class="mb-3">
    <button on:click={saveCourse} class="btn btn-primary"> Speichern </button>
    <button
      on:click={() => {
        pop();
      }}
      class="btn btn-danger"
    >
      Zurück
    </button>
  </div>
  <div class="mb-3">
    <h3>Gruppeneinteilung</h3>
    {#if groupCompositions.length}
      <button on:click={generateGroups} class="btn btn-primary">
        Gruppen neu erstellen
      </button>
      {#each groupCompositions as group}
        <Group bind:group />
      {/each}
    {:else}
      <button on:click={generateGroups} class="btn btn-primary">
        Gruppen erstellen
      </button>
    {/if}
  </div>
</form>
<br />
