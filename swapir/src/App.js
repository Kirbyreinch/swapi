import logo from './navelogo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className='h1-header'>
         Star Wars Api 
        </h1>
      </header>
<body>
  <div className="App-body">
  <h2 className='h2-header'>
     Personajes de Star Wars
  </h2>
  </div> 
  <div className="App-characters-bar">
<input type='text' id='character' placeholder='Enter character name'></input>
<button onClick={fetchData}>Buscar</button>


<table className='table-char'>
<tr>
<th>Nombre</th>
<th>Altura</th>
<th>Peso</th>
<th>Color de cabello</th>
<th>Color de piel</th>
<th>Color de ojos</th>
<th>Fecha de nacimiento</th>
<th>Genero</th>
<th>Planeta de nacimiento</th>
</tr>


<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>



</table>



</div> 
</body>
  </div>
  );
}








fetchData();
async function fetchData() {
  try{
    const character = document.getElementById("character").value.toLowerCase();
    const response = await fetch(`https://swapi.dev/api/${character}`);
    if(!response.ok){
        throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    const nombre= data.name;
    console.log(data);
    console.log(nombre);
}
catch(error){
    console.error(error);
}
}









export default App;
