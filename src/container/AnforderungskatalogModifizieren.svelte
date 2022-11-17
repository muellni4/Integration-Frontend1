<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

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

  function getGroupRequirementById() {
    axios
      .get(`http://localhost:8080/grouprequirements/${params.id}`)
      .then((response) => {
        let reqWeight = Object.assign({}, defaultRequirementWeight);
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
        editMode = true;
      })
      .catch(() => {
        editMode = false;
      });
  }

  function saveGroupRequirement() {
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
        <th scope="col">Fähigkeit</th>
        <th scope="col">Gewichtung</th>
      </tr>
    </thead>
    <tbody>
      {#each groupRequirement.weightRequests as requirementWeight}
        <tr>
          <td width="300" colspan="1"
            >{requirementWeight.skill.name} ({requirementWeight.skill.id})</td
          >
          <td width="300" colspan="1">
            <input
              type="text"
              class="form-control"
              bind:value={requirementWeight.weight}
            />
          </td>
        </tr>
      {/each}
      <tr style="color: grey">
        <td width="300" colspan="1">
          <select bind:value={newRequirementWeight.skill} class="form-select">
            <option value="null">Auswählen</option>
            {#each skills as skillOption}
              <option value={skillOption}
                >{skillOption.name} ({skillOption.id})</option
              >
            {/each}
          </select>
        </td>
        <td width="300" colspan="1">
          <input
            type="text"
            class="form-control"
            bind:value={newRequirementWeight.weight}
          />
        </td>
      </tr>
      <button on:click={addNewRequirementWeight} class="btn btn-primary">
        Hinzufügen
      </button>
    </tbody>
  </table>

  <h6>
    Gruppeneinteilung ausgeglichen (Heterogen) oder unausgeglichen (Homogen)
  </h6>
  <div class="form-check mb-3">
    <select
      bind:value={groupRequirement.generateEqualGroups}
      class="form-select"
    >
      {#each groupModi as modus}
        <option value={modus.value}>{modus.name}</option>
      {/each}
    </select>
  </div>
  <div class="mb-3">
    <button on:click={saveGroupRequirement} class="btn btn-primary">
      Speichern
    </button>
    <a class="btn btn-danger" href={`?#/Anforderungskataloge/`} role="button">
      Zurück
    </a>
  </div>
</form>
