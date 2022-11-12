<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  export let grouprequirementId;

  let editMode = true;

  let skills = [];

  let groupRequirement = {
    id: -1,
    name: "",
    generateEqualGroups: true,
    groupSize: 3,
    courseIds: [],
    weightRequests: []
  };

  let defaultRequirementWeight = {
    id: -1,
    groupRequirementId: -1,
    skillId: -1,
    weight: 1
  }

  let newRequirementWeight = {
    id: -1,
    groupRequirementId: -1,
    skillId: -1,
    weight: 1
  }

  $: {
    newRequirementWeight.groupRequirementId = groupRequirementId;
    defaultRequirementWeight.groupRequirementId = groupRequirementId;
  }

  $: {
    groupRequirement.id = groupRequirementId;
    checkAndLoadGroupRequirement();
  }

  $: _generateEqualGroups = Number(groupRequirement.generateEqualGroups);

  onMount(() => {
    checkAndLoadGroupRequirement();
    getAllSkills();
  });

  function handleRadioChange(e) {
    groupRequirement.generateEqualGroups = Boolean(_generateEqualGroups);
  }

  function checkAndLoadGroupRequirement() {
    if (groupRequirementId == undefined) editMode = false;
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
    if(newRequirementWeight.skillId < 1 || newRequirementWeight.weight < 1) {
      Swal.fire("Bitte reguläre Werte für Skills und deren Gewichtung wählen");
      return;
    }
    groupRequirement.weightRequests = [...groupRequirement.weightRequests, newRequirementWeight];
    newRequirementWeight = defaultRequirementWeight;
  }

  function getGroupRequirementById() {
    axios
      .get(`http://localhost:8080/grouprequirements/${grouprequirementId}`)
      .then((response) => {
        let reqWeight = defaultRequirementWeight;

        groupRequirement.id = response.data.id;
        groupRequirement.name = response.data.name;
        groupRequirement.groupSize = response.data.groupSize;
        groupRequirement.generateEqualGroups = response.data.generateEqualGroups;
        groupRequirement.weightRequests = response.data.requirementWeights;
        groupRequirement.courseIds = response.data.courses;
        groupRequirement.weightRequests = [];
        //Foreach is required so that object skill and groupRequirement can be transfered to skillId and groupRequirementId for postobject
        response.data.requirementWeights.forEach(reqWeightResp => {
          reqWeight.id = reqWeightResp.id;
          reqWeight.groupRequirementId = reqWeightResp.groupRequirement;
          reqWeight.skillId = reqWeightResp.skill;
          reqWeight.weight = reqWeightResp.weight;
          //Fill List with values
          groupRequirement.weightRequests = [...groupRequirement.weightRequests, weight];
        });
        editMode = true;
      })
      .catch(() => {
        editMode = false;
      });
  }

  function saveGroupRequirement() {
    if(editMode) {
      updateGroupRequirement();
    } else {
      createGroupRequirement();
    }
  }

  function createGroupRequirement() {
    if (groupRequirement.name == "" || groupRequirement.groupSize <= 0) {
      Swal.fire("Please fill out the form correctly");
      return;
    }
    axios
      .post("http://localhost:8080/grouprequirements/", groupRequirement)
      .then((response) => {
        let id = response.data;
        Swal.fire(`Section created with id ${id}`);
        groupRequirementId = id;
      });
  }

  function updateGroupRequirement() {
    if (groupRequirement.name == "" || groupRequirement.groupSize <= 0) {
      Swal.fire("Please fill out the form correctly");
      return;
    }
    axios
      .put("http://localhost:8080/grouprequirements/", content)
      .then((response) => {
        let id = response.data;
        Swal.fire(`Section (${id}) updated`);
      });
  }
</script>


<h1>Anforderungskatalog</h1>


<form>

 <div class="mb-3">
  <label for="kursname" class="form-label">Name</label>
  <input type="text" class="form-control" bind:value={groupRequirement.name}>
</div>
<div class="mb-3">
  <label for="gruppensize" class="form-label">Gruppengrösse</label>
  <input type="number" class="form-control" bind:value={groupRequirement.groupSize}>
</div>

 <h6>Fähigkeiten</h6>

 <table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Fähigkeit</th>
        <th scope="col">Gewichtung</th>     
      </tr>
    </thead>
    <tbody>
      {#each groupRequirement.requirementWeights as requirementWeight, index}
      <tr>
        <td width="20">{index}</td>
        <td width="300" colspan="1">{(skills.find(o => o.id == requirementWeight.skillId)).name} ({requirementWeight.skillId})</td>
        <td width="300" colspan="1">{requirementWeight.weight}</td>
      </tr>
      {/each}
      <tr style="color: grey">
        <td width="20"></td>
        <td width="300" colspan="1">
          <select bind:value={newRequirementWeight.skillId} class="form-select">
            <option value=-1>Auswählen</option>
            {#each skills as skill}
              <option value={skill.id}>{skill.name} ({skill.id})</option>
            {/each}
          </select>
        </td>
        <td width="300" colspan="1">
          <input type="text" class="form-control" bind:value={newRequirementWeight.weight}>
        </td>
      </tr>
      <button on:click={addNewRequirementWeight} class="btn btn-primary">
        Hinzufügen
      </button>
    </tbody>
  </table>


<h6>Gruppeneinteilung ausgeglichen (Heterogen) oder unausgeglichen (Homogen)</h6>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" value={1} on:bind={_generateEqualGroups} on:change={handleRadioChange} checked>
  <label class="form-check-label" for="flexRadioDefault2">Heterogen</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" value={0} on:bind={_generateEqualGroups} on:change={handleRadioChange} >
  <label class="form-check-label" for="flexRadioDefault1">Homogen</label>
</div>
<br>
<button on:click={saveGroupRequirement} class="btn btn-primary">
  Speichern
</button>
</form>

<br>

