<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
  
    let skills = [];
  
    onMount(() => {
      getRootContents();
    });
  
    function getRootContents() {
      axios
        .get("http://localhost:8080/skills")
        .then((response) => {
          skills = response.data;
        });
    }
  
    
  </script>
  
  <div class="container mt-3 custom-back">
    <h1 class="mt-3">Fähigkeiten</h1>
    <a
      href="#/AddSkill"
      title="Create"
      role="button"
      class="btn btn-success btn-sm rounded-2 mb-3"
      ><i class="bi bi-plus-square align-self-center" />Fähigkeit erstellen</a
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
        {#each skills as skill}
          <tr>
            <td>
              {skill.id}
            </td>
            <td>
              {skill.name}
            </td>
            <td>
              {skill.description}
            </td>
            <td>
              <ul class="list-inline-item">
                <li class="list-inline-item">
                  <a
                    class="btn btn-primary btn-sm rounded-2"
                    href={"#/FaehigkeitModifizieren/" + skill.id}
                    role="button"
                    title="Edit"
                  >
                    <i class="bi bi-info-square" />
                  </a>
              </ul>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  