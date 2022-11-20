<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import { pop } from "svelte-spa-router";

  export let params = {};

  let editMode = true;

  let groupModi = [
    { name: "Heterogen", value: true },
    { name: "Homogen", value: false },
  ];

  let skills = [];

  let groupRequirement = {
    id: -1,
    name: "",
    generateEqualGroups: true,
    groupSize: 3,
    courseIds: [],
    weightRequests: [],
  };

  let defaultRequirementWeight = {
    id: -1,
    groupRequirementId: -1,
    skill: null,
    weight: 1,
  };

  let newRequirementWeight = {
    id: -1,
    groupRequirementId: -1,
    skill: null,
    weight: 1,
  };

  $: {
    params.id;
    checkAndLoadGroupRequirement();
  }

  onMount(() => {
    checkAndLoadGroupRequirement();
    getAllSkills();
    newRequirementWeight.groupRequirementId = params.id;
    defaultRequirementWeight.groupRequirementId = params.id;
  });

  function checkAndLoadGroupRequirement() {
    if (params.id == undefined) editMode = false;
    else {
      getGroupRequirementById();
      editMode = true;
    }
  }

  function getAllSkills() {
    axios.get("http://localhost:8080/skills/").then((response) => {
      skills = response.data;
    });
  }

  function addNewRequirementWeight() {
    if (
      newRequirementWeight.skill === null ||
      newRequirementWeight.weight < 1
    ) {
      Swal.fire("Bitte reguläre Werte für Skills und deren Gewichtung wählen");
      return;
    }
    groupRequirement.weightRequests = [
      ...groupRequirement.weightRequests,
      newRequirementWeight,
    ];
    newRequirementWeight = Object.assign({}, defaultRequirementWeight);
  }

  function deleteRequirementWeight(obj) {
    groupRequirement.weightRequests = groupRequirement.weightRequests.filter(
      (value) => value !== obj
    );
    if (obj.id > 0) {
      axios.delete(
        `http://localhost:8080/grouprequirements/${params.id}/weights/${obj.id}/`
      );
    }
  }

  function getGroupRequirementById() {
    axios
      .get(`http://localhost:8080/grouprequirements/${params.id}`)
      .then((response) => {
        groupRequirement.id = response.data.id;
        groupRequirement.name = response.data.name;
        groupRequirement.groupSize = response.data.groupSize;
        groupRequirement.generateEqualGroups =
          response.data.generateEqualGroups;
        groupRequirement.courseIds = response.data.courses;
        groupRequirement.weightRequests = [];
        //Foreach is required so that object skill and groupRequirement can be transfered to groupRequirementId for postobject
        response.data.requirementWeights.forEach((reqWeightResp) => {
          let temp = {
            id: reqWeightResp.id,
            groupRequirementId: reqWeightResp.groupRequirement,
            skill: reqWeightResp.skill,
            weight: reqWeightResp.weight,
          };
          //Fill List with values
          groupRequirement.weightRequests = [
            ...groupRequirement.weightRequests,
            temp,
          ];
        });
      })
      .catch(() => {});
  }

  function saveGroupRequirement() {
    console.log(groupRequirement.weightRequests.skills);
    if (editMode) {
      updateGroupRequirement();
    } else {
      createGroupRequirement();
    }
  }

  function createGroupRequirement() {
    if (groupRequirement.name == "" || groupRequirement.groupSize <= 0) {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios
      .post("http://localhost:8080/grouprequirements/", groupRequirement)
      .then((response) => {
        let id = response.data;
        Swal.fire(`Anforderungskatalog erstellt (Id: ${id})`);
        params.id = id;
        window.location.href = `/?#/Anforderungskataloge/${id}/Edit`;
      });
  }

  function updateGroupRequirement() {
    if (groupRequirement.name == "" || groupRequirement.groupSize <= 0) {
      Swal.fire("Bitte Formular mit korrekten Werten ausfüllen");
      return;
    }
    axios
      .put("http://localhost:8080/grouprequirements/", groupRequirement)
      .then((response) => {
        let id = response.data;
        Swal.fire(`Anforderungskatalog (${id}) aktualisiert`);
      });
  }
</script>

<h1>Anforderungskatalog</h1>

<form>
  <div class="mb-3">
    <label for="groupRequirementName" class="form-label">Name</label>
    <input
      type="text"
      class="form-control"
      bind:value={groupRequirement.name}
    />
  </div>
  <div class="mb-3">
    <label for="groupsize" class="form-label">Gruppengrösse</label>
    <input
      type="number"
      class="form-control"
      bind:value={groupRequirement.groupSize}
    />
  </div>

  <h6>Fähigkeiten</h6>

  <table class="table">
    <thead>
      <tr>
        <th scope="col" colspan="2">Fähigkeit</th>
        <th scope="col">Gewichtung</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each groupRequirement.weightRequests as requirementWeight}
        <tr>
          <td width="300" colspan="2"
            >{requirementWeight.skill.name} ({requirementWeight.skill.id})</td
          >
          <td width="10">
            <input
              type="number"
              class="form-control"
              min="1"
              max="10"
              bind:value={requirementWeight.weight}
            />
          </td>
          <td align="right" width="5">
            <button
              class="btn btn-danger btn-sm rounded-2"
              type="button"
              on:click={deleteRequirementWeight(requirementWeight)}
              title="Delete"
            >
              <i class="bi bi-dash-square" />
            </button>
          </td>
        </tr>
      {/each}
      <tr style="color: grey">
        <td width="300" colspan="2">
          <select bind:value={newRequirementWeight.skill} class="form-select">
            <option value="null">Auswählen</option>
            {#each skills as skillOption}
              <option value={skillOption}
                >{skillOption.name} ({skillOption.id})</option
              >
            {/each}
          </select>
        </td>
        <td width="10">
          <input
            type="number"
            min="1"
            max="10"
            class="form-control"
            bind:value={newRequirementWeight.weight}
          />
        </td>
        <td>
          <button
            on:click={addNewRequirementWeight}
            class="btn btn-success btn-sm rounded-2"
            title="Add"
          >
            <i class="bi bi-plus-square" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <h6>
    Gruppeneinteilung ausgeglichen (Heterogen) oder unausgeglichen (Homogen)
  </h6>
  <select bind:value={groupRequirement.generateEqualGroups} class="form-select">
    {#each groupModi as modus}
      <option value={modus.value}>{modus.name}</option>
    {/each}
  </select>

  <div class="mt-3">
    <button on:click={saveGroupRequirement} class="btn btn-primary">
      Speichern
    </button>
    <button
      on:click={() => {
        pop();
      }}
      class="btn btn-danger"
    >
      Zurück
    </button>
  </div>
</form>
<br />
