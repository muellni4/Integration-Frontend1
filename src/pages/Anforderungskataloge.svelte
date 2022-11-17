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

  function deleteGroupRequirement(objId, name) {
    Swal.fire({
      title: "Sind Sie sich sicher?",
      text: "Diese Aktion kann nicht Rückgängig gemacht werden!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Löschung durchführen",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/grouprequirements/${objId}`)
          .then(() => {
            Swal.fire("Gelöscht!", "Das Objekt wurde gelöscht", "Erfolgreich");
            //Reloads products to force table rebuild
            getGroupRequirements();
          });
      }
    });
  }
</script>

<div class="container mt-3">
  <h1 class="mt-3">Anforderungskatalog</h1>
  <a
    href="#/Anforderungskataloge/Neu"
    title="Create"
    role="button"
    class="btn btn-success btn-sm rounded-2 mb-3"
    ><i class="bi bi-plus-square align-self-center" />Katalog erstellen</a
  >
  <table class="table m-0 table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Details</th>
        <th scope="col" />
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
            <p>Gruppengrösse: {groupRequirement.groupSize} </p>
            <p>
              Einteilungsart: {#if groupRequirement.generateEqualGroups}
                Heterogen
              {:else}
                Homogen
              {/if}
            </p>
          </td>
          <td>
            <ul class="list-inline-item">
              <li class="list-inline-item">
                <a
                  class="btn btn-primary btn-sm rounded-2"
                  href={`#/Anforderungskataloge/${groupRequirement.id}/Edit`}
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
                  on:click={deleteGroupRequirement(
                    groupRequirement.id,
                    groupRequirement.name
                  )}
                  title="Delete"
                >
                  <i class="bi bi-x-square" />
                </button>
              </li>
            </ul>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
