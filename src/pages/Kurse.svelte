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

  function deleteCourse(objId, name) {
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
        axios.delete(`http://localhost:8080/courses/${objId}`).then(() => {
          Swal.fire("Gelöscht!", "Das Objekt wurde gelöscht", "Erfolgreich");
          //Reloads products to force table rebuild
          getCourses();
        });
      }
    });
  }
</script>

<div class="container mt-3">
  <h1 class="mt-3">Kurse</h1>
  <a
    href="#/Kurse/Neu"
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
      {#each courses as course}
        <tr>
          <td>
            {course.id}
          </td>
          <td>
            {course.name}
          </td>
          <td>
            {course.courseActive}
          </td>
          <td>
            <ul class="list-inline-item">
              <li class="list-inline-item">
                <a
                  class="btn btn-primary btn-sm rounded-2"
                  href={`#/Kurse/${course.id}/Edit`}
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
                  on:click={deleteCourse(course.id, course.name)}
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
