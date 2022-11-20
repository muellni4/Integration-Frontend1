<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  export let params = {};

  let skillRatings = [];
  let newSkillRatings = [];

  let defaultSkillRating = {
    id: -1,
    rating: 1,
    skill: null,
  };

  $: {
    params.id;
    getSkillRatings();
    getSkillRequiredToBeRated();
  }

  onMount(() => {
    getSkillRatings();
    getSkillRequiredToBeRated();
  });

  function getSkillRatings() {
    axios
      .get(`http://localhost:8080/persons/${params.id}/skills`)
      .then((response) => {
        skillRatings = [];
        response.data.forEach((skillRating) => {
          let temp = {
            id: skillRating.id,
            rating: skillRating.rating,
            skill: skillRating.skill,
          };
          skillRatings = [...skillRatings, temp];
        });
      });
  }

  function getSkillRequiredToBeRated() {
    axios
      .get(`http://localhost:8080/persons/${params.id}/skills/rating`)
      .then((response) => {
        newSkillRatings = [];
        response.data.forEach((skill) => {
          let newRating = Object.assign({}, defaultSkillRating);
          newRating.skill = skill;
          newSkillRatings = [...newSkillRatings, newRating];
        });
      });
  }

  function updateSkillRating() {
    axios
      .put(`http://localhost:8080/persons/${params.id}/skills/`, [...newSkillRatings,...skillRatings])
      .then(() => {
        Swal.fire(`Bewertung wurde aktualisiert`);
        getSkillRatings();
        getSkillRequiredToBeRated();
      });
  }
</script>

<div class="mt-3">
  <h1>Fähigkeitsbewertung</h1>

  {#each [...newSkillRatings,...skillRatings] as skillRating}
    <div class="container">
      <div class="row">
        <div class="mt-3 col-9">
          <h5>{skillRating.skill.name}</h5>
          <p>{skillRating.skill.description}</p>
        </div>
        <div class="mt-3 col-1">
          <input type="range" bind:value={skillRating.rating} min="1" max="5" />
          <p>{skillRating.rating}</p>
        </div>
      </div>
    </div>
  {/each}
  <button on:click={updateSkillRating} class="btn btn-primary">
    Speichern
  </button>
</div>
<br />
