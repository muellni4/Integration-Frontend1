<script>

    import Button from "../../Forms/Button.svelte";

</script>
<div class="container text-center">
    <div class="row">
      <div class="col" align="left">
        <h1>Teilnehmer</h1>
      </div>
      <div class="col" align="right">
        <a class="btn btn-primary btn-lg" href="http://localhost:5000/#/addperson" role="button">Add</a>
    
        
      </div>
    </div>
  </div>
  
  
  
  
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">ZHAW Id</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Nico Müller</td>
        <td>muellni4@students.zhaw.ch</td>
        <td>654321</td>
        <td><button type="button" class="btn btn-primary btn-lg">Edit</button>
        <button type="button" class="btn btn-primary btn-lg">Skill</button></td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Cédric Wagner</td>
        <td>wagneced@students.zhaw.ch</td>
        <td>123456</td>
        <td><button type="button" class="btn btn-primary btn-lg">Edit</button>
            <button type="button" class="btn btn-primary btn-lg">Skill</button></td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Oliver Gruica</td>
        <td>gruicoli@students.zhaw.ch</td>
        <td>789456</td>
        <td><button type="button" class="btn btn-primary btn-lg">Edit</button>
            <button type="button" class="btn btn-primary btn-lg">Skill</button></td>
      </tr>
    </tbody>
  </table>