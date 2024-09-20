import './App.css';
import axios from "axios";
import React, { useState } from "react";
import logo from './navelogo.jpg';



function App() {

const [data, setData] = useState({});
const [characters, setcharacters] = useState([]);
const [starships, setStarships] = useState([]);
const [searchQuery, setSearchQuery] = useState(''); 
const [films, setFilms] = useState([]);
const [vehicles, setVehicles]= useState([]);
const [homeworld, setHomeworld]= useState('');
const [mostrar, setmostrar]= useState(false);



//Peticion Api individual
const fetchAllData = async() =>{
    const resp = await axios(`https://swapi.dev/api/people/?page=1`);
    const allcharacter = resp.data.results;
    setcharacters(allcharacter);
    console.log(allcharacter);
  };




//Peticion Api individual
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


//Peticiones naves
const starshipsrequest = characterData.starships.map(starshipsUrl => axios.get(starshipsUrl));
const starshipsresponse = await Promise.all(starshipsrequest); 
const starshipsName = starshipsresponse.map(starship => starship.data.name); 
setStarships(starshipsName); 



//Peticiones homeworld
const homeworldresponse = await axios.get(characterData.homeworld); 
setHomeworld(homeworldresponse.data.name); 

} catch (error) {
}
};

const muestreo = () =>{
setmostrar(!mostrar);
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
    <input type='text' id='character' placeholder='Enter Character name' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    <button class="button-74" onClick={fetchAllData}>Buscar</button> {}
</div>



{data.name && (
<table className='table-char'>
  <thead>

  <tr>
    <th>Nombre</th>
    <td>{data.name}</td>
  </tr>

  <tr>
    <th>Altura</th>
    <td>{data.height}</td>
  </tr>

  <tr>
    <th>Peso</th>
    <td>{data.mass}</td>
  </tr>

  <tr>
    <th>Color de cabello</th>
    <td>{data.hair_color}</td>
  </tr>

  <tr>
    <th>Color de piel</th>
    <td>{data.skin_color}</td>
  </tr>

  <tr>
    <th>Color de ojos</th>
    <td>{data.eye_color}</td>
  </tr>

  <tr>
    <th>Fecha de nacimiento</th>
    <td>{data.birth_year}</td>
  </tr>

  <tr>
    <th>Género</th>
    <td>{data.gender}</td>
  </tr>

  <tr>
    <th>Planeta de nacimiento</th>
    <td>{homeworld}</td>
  </tr>

  <tr>
    <th>informacion Adicional</th>
    <td><button  class="button-54" onClick={muestreo}>Mostrar </button></td>
  </tr>
</thead>
</table>
)}


{mostrar  &&  ( 
<table className='table-movies'>
<thead>
    <tr>
     <th>Películas Relacionadas</th>
     <th>Vehiculos Relacionados</th>
     <th>Naves relacionadas</th>
    </tr>
</thead>
<tbody>
<tr>

  {films.map((film, index) => (
    <tr>
        <td>{[index+1," - ",film]}</td>
    </tr>
))}


<td>
  {vehicles.map((vehicle, index) => (
  <tr>
      <td>{[index+1," - ",vehicle]}</td>
  </tr>
))}
</td>

<td>
  {starships.map((starship, index) => (
    <tr>
      <td>{[index+1," - ",starship]}</td>
    </tr>
))}
</td>

</tr>
</tbody>
</table>
)} 
</div>
</div>
);
}

export default App