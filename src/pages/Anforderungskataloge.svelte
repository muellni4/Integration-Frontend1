<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let groupRequirements = [];

  onMount(() => {
    getGroupRequirements();
  });

  function getGroupRequirements() {
    axios.get("http://localhost:8080/grouprequirements").then((response) => {
      groupRequirements = response.data;
    });
  }
</script>

<div class="container mt-3 custom-back">
  <h1 class="mt-3">Anforderungskatalog</h1>
  <a
    href="#/CreateGroupRequirement"
    title="Create"
    role="button"
    class="btn btn-success btn-sm rounded-2 mb-3"
    ><i class="bi bi-plus-square align-self-center" />Neuen erstellen</a
  >
  <table class="table m-0 table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Beschreibung</th>
      </tr>
    </thead>
    <tbody>
      {#each groupRequirements as groupRequirement}
        <tr>
          <td>
            {groupRequirement.id}
          </td>
          <td>
            {groupRequirement.name}
          </td>
          <td>
            {groupRequirement.groupSize}
          </td>
          <td>
            {#if groupRequirement.generateEqualGroups}
              Heterogen
            {:else}
              Homogen
            {/if}
          </td>
          <td>
            <ul class="list-inline-item">
              <li class="list-inline-item">
                <a
                  class="btn btn-primary btn-sm rounded-2"
                  href={"#/AnforderungskatalogModifizieren/" + groupRequirement.id}
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
