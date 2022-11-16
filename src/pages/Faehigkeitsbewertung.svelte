<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  export let params = {};

  let personId;

  let skillRatings = [];

  let defaultSkillRating = {
    id: -1,
    rating: 1,
    skill: null,
  };

  $: {
    personId = params.id;
    getSkillRatings();
    getSkillRequiredToBeRated();
  }

  onMount(() => {
    getSkillRatings();
    getSkillRequiredToBeRated();
  });

  function getSkillRatings() {
    axios
      .get(`http://localhost:8080/persons/${personId}/skills`)
      .then((response) => {
        skillRatings = [];
        let skillRatingInfo = defaultSkillRating;
        response.data.forEach((skillRating) => {
          skillRatingInfo.id = skillRating.id;
          skillRatingInfo.rating = skillRating.rating;
          skillRatingInfo.skill = skillRating.skill;
          skillRatings = [...skillRatings, skillRatingInfo];
        });
      });
  }

  function getSkillRequiredToBeRated() {
    axios
      .get(`http://localhost:8080/persons/${personId}/skills/rating`)
      .then((response) => {
        let newRating = defaultSkillRating;
        response.data.forEach((skill) => {
          newRating.skill = skill;
          skillRatings = [...skillRatings, newRating];
        });
      });
  }

  function updateSkillRating() {
    axios
      .put(`http://localhost:8080/persons/${personId}/skills/`)
      .then((response) => {
        Swal.fire(`Bewertung wurde aktualisiert`);
        getSkillRatings();
        getSkillRequiredToBeRated();
      });
  }
</script>

<h1>Fähigkeitsbewertung</h1>

<table class="table">
  <thead>
    <tr>
      <th scope="col" />
      <th scope="col" />
      <th scope="col" />
      <th scope="col">Score 1-5</th>
    </tr>
  </thead>
  <tbody>
    {#each skillRatings as skillRating}
      <tr>
        <th scope="row">{skillRating.id}</th>
        <td colspan="1">{skillRating.skill.name}</td>
        <td colspan="1">{skillRating.skill.description} </td>
        <td align="right" width="100">
          <label>
            <input
              readonly={true}
              type="text"
              bind:value={skillRating.rating}
              min="1"
              max="5"
            />
            <input
              type="range"
              bind:value={skillRating.rating}
              min="1"
              max="5"
            />
          </label>
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<button on:click={updateSkillRating} class="btn btn-primary">
  Speichern
</button>
