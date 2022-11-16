<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let courses = [];

  onMount(() => {
    getCourses();
  });

  function getCourses() {
    axios.get("http://localhost:8080/courses").then((response) => {
      courses = response.data;
    });
  }
</script>

<div class="container mt-3 custom-back">
  <h1 class="mt-3">Kurse</h1>
  <a
    href="#/AddKurs"
    title="Create"
    role="button"
    class="btn btn-success btn-sm rounded-2 mb-3"
    ><i class="bi bi-plus-square align-self-center" />Kurs erstellen</a
  >
  <table class="table m-0 table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Kurs aktiv?</th>
      </tr>
    </thead>
    <tbody>
      {#each courses as cours}
        <tr>
          <td>
            {cours.id}
          </td>
          <td>
            {cours.name}
          </td>
          <td>
            {cours.courseActive}
          </td>
          <td>
            <ul class="list-inline-item">
              <li class="list-inline-item">
                <a
                  class="btn btn-primary btn-sm rounded-2"
                  href={"#/KursModifizieren/" + cours.id}
                  role="button"
                  title="Edit"
                >
                  <i class="bi bi-info-square" />
                </a>
              </li>
            </ul>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
