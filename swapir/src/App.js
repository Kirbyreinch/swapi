import './App.css';
import axios from "axios";
import React, { useState } from "react";
import logo from './navelogo.jpg';



function App() {
const [data, setData] = useState({});
const [searchQuery, setSearchQuery] = useState(""); 
const [films, setFilms] = useState([]);
const [homeworld, setHomeworld] = useState([]);
const [vehicles, setVehicles]= useState([]);
const [starships, setStarships]= useState([]);



const fetchData = async () => {
try {
const result = await axios(
`https://swapi.dev/api/${searchQuery}`
);
const characterData = result.data;
setData(characterData); 



//Peticiones films
const filmRequests = characterData.films.map(filmUrl => axios.get(filmUrl));
const filmResponses = await Promise.all(filmRequests); 
const filmTitles = filmResponses.map(film => film.data.title); 
setFilms(filmTitles); 


//Peticiones vehiculos
const vehiclesrequest = characterData.vehicles.map(vehiclesUrl => axios.get(vehiclesUrl));
const vehiclesresponse = await Promise.all(vehiclesrequest); 
const vehiclesName = vehiclesresponse.map(vehicle => vehicle.data.name); 
setVehicles(vehiclesName); 


//Peticiones vehiculos
const starshipsrequest = characterData.starships.map(starshipsUrl => axios.get(starshipsUrl));
const starshipsresponse = await Promise.all(starshipsrequest); 
const starshipsName = starshipsresponse.map(starship => starship.data.name); 
setStarships(starshipsName); 






} catch (error) {

}




};






return (
<div className="App">
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<h1 className='h1-header'>
Star Wars Api
</h1>
</header>
<div className="App-body">
<h2 className='h2-header'>
Personajes de Star Wars
</h2>
<div className="App-characters-bar">
<input type='text'
id='character'
placeholder='Enter Character name'
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
<button onClick={fetchData}>Buscar</button> {}
</div>



{data.name && (
<table className='table-char'>
<thead>
<tr>
<th>Nombre</th>
<th>Altura</th>
<th>Peso</th>
<th>Color de cabello</th>
<th>Color de piel</th>
<th>Color de ojos</th>
<th>Fecha de nacimiento</th>
<th>Género</th>
<th>Planeta de nacimiento</th>
</tr>
</thead>
<tbody>
<tr>
<td>{data.name}</td>
<td>{data.height}</td>
<td>{data.mass}</td>
<td>{data.hair_color}</td>
<td>{data.skin_color}</td>
<td>{data.eye_color}</td>
<td>{data.birth_year}</td>
<td>{data.gender}</td>
<td>{data.homeworlds}</td>

</tr>
</tbody>
</table>
)}



{films.length  > 0  &&  (
<table className='table-movies'>
<thead>
<tr>
<th>Películas Relacionadas</th>
<th>Vehiculos Relacionados</th>
</tr>
</thead>


{films.map((film, index) => (
<tr key={index}>
<td>{[index+1," - ",film]}</td>




{vehicles.length > 0 && (
  <tbody>
  {vehicles.map((vehicle, index) => (
  <tr key={index}>
  <td>{[index+1," - ",vehicle]}</td>
  </tr>
  ))}
  </tbody>
  )}
  
</tr>
))}







</table>
)}








{starships.length > 0 && (
<table className='table-starships'>
<thead>
<tr>
<th>Naves Relacionadas</th>
</tr>
</thead>
<tbody>
{starships.map((starship, index) => (
<tr key={index}>
<td>{[index+1," - ",starship]}</td>
</tr>
))}
</tbody>
</table>
)}








{homeworld.length > 0 && (
<table className='table'>
<thead>
<tr>
<th>mundo Relacionado</th>
</tr>
</thead>
<tbody>
{homeworld.map((homeworlds, index) => (
<tr key={index}>
<td>{[index+1," - ",homeworlds]}</td>
</tr>
))}
</tbody>
</table>
)}







</div>
</div>
);
}
export default App






















