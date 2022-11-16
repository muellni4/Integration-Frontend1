<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let personen = [];

  onMount(() => {
    getPersons();
  });

  function getPersons() {
    axios.get("http://localhost:8080/persons").then((response) => {
      personen = response.data;
    });
  }
</script>

<div class="container mt-3 custom-back">
  <h1 class="mt-3">Personen</h1>
  <a
    href="#/AddPerson"
    title="Create"
    role="button"
    class="btn btn-success btn-sm rounded-2 mb-3"
    ><i class="bi bi-plus-square align-self-center" />Person erstellen</a
  >
  <table class="table m-0 table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">E-Mail</th>
        <th scope="col">Zhaw-ID</th>
      </tr>
    </thead>
    <tbody>
      {#each personen as person}
        <tr>
          <td>
            {person.id}
          </td>
          <td>
            {person.name}
          </td>
          <td>
            {person.email}
          </td>
          <td>
            {person.zhawId}
          </td>
          <td>
            <ul class="list-inline-item">
              <li class="list-inline-item">
                <a
                  class="btn btn-primary btn-sm rounded-2"
                  href={"#/PersonModifizieren/" + person.id}
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
