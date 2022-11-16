<script>
  export let group;
</script>

<div class="mb-3">
  <p>Id: {group.id}</p>
  <p>Bewertung: {group.score}</p>

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
      {#each group.members as member}
        <tr>
          <td>
            {member.id}
          </td>
          <td>
            {member.name}
          </td>
          <td>
            {member.email}
          </td>
          <td>
            {member.zhawId}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
