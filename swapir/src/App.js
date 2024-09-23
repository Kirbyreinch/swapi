import './App.css';
import axios from "axios";
import React, { useState,useEffect  } from "react";
import logo from './navelogo.jpg';
import Modal from './modal';




function App() {

const [data, setData] = useState({});
const [characters, setcharacters] = useState([]);
const [starships, setStarships] = useState([]);
const [searchQuery, setSearchQuery] = useState(''); 
const [films, setFilms] = useState([]);
const [vehicles, setVehicles]= useState([]);
const [homeworld, setHomeworld]= useState('');

const [mostrar, setmostrar]= useState(false);
const [ocultar, setocultar]= useState(true);
const [ocultarbusqueda, setocultarbusqueda]= useState(true);

const [paginactual, setpaginactual] = useState(1); // Página actual
const [paginastotales, setpaginastotales] = useState(1); // Total de páginas


const handleMostrar = () => setmostrar(true);
const handleCerrar = () => setmostrar(false);


//Peticion Api general
const fetchAllData = async (page = 1) => {
  try {
    const resp = await axios(`https://swapi.dev/api/people/?page=${page}`);
    const allCharacters = resp.data.results;
    setcharacters(allCharacters);
    setpaginastotales(Math.ceil(resp.data.count / 10)); 

  
    const homeworldPromises = allCharacters.map(character => axios.get(character.homeworld));
    const homeworldResponses = await Promise.all(homeworldPromises);


    const charactersWithHomeworld = allCharacters.map((character, index) => ({
      ...character,
      homeworld: homeworldResponses[index].data.name,
    }));

    setcharacters(charactersWithHomeworld);
    console.log(charactersWithHomeworld);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => { //Se ejecuta una vez??
  fetchAllData(paginactual);
}, [paginactual]);




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

  setocultarbusqueda(false); 
}

};


//ocultar info adicional
const muestreo = () =>{
setmostrar(!mostrar);
};



const ocultamiento = () =>{
  if (searchQuery === '') {
    console.log(searchQuery);
    console.log('if');
    setocultar(true); 
    } else {
      console.log('else');
      console.log(searchQuery);
      setocultar(false); 
      setocultarbusqueda(true); 
      fetchData();

    }
  };


// Cambiar de página
const nextPage = () => {
  if (paginactual < paginastotales) {
  setpaginactual(prevPage => prevPage + 1);
  }
  };
  const prevPage = () => {
  if (paginactual > 1) {
  setpaginactual(prevPage => prevPage - 1);
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
    <input type='text' id='character' placeholder='Nombre  (Ej:people/1)' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    <button class="button-74" onClick={ocultamiento}>Buscar</button> {}
</div> 


{/* Paginación Ariiba */}
{ocultar && (
<div className="pagination">
<br></br>

<button class="button-74" disabled={paginactual === 1} onClick={prevPage}> Anterior </button> <span> Página   {paginactual} de {paginastotales}</span>
<button class="button-74" disabled={paginactual === paginastotales} onClick={nextPage}>Siguiente</button>
<br></br>
<br></br>
</div>
)}



    {ocultar && characters.map((char, index) => (
      <table className='table-char' key={index}>
        <thead>
          <tr>
            <th>Nombre</th>
            <td>{char.name}</td>
          </tr>
          <tr>
            <th>Altura</th>
            <td>{char.height}</td>
          </tr>
          <tr>
            <th>Peso</th>
            <td>{char.mass}</td>
          </tr>
          <tr>
            <th>Color de cabello</th>
            <td>{char.hair_color}</td>
          </tr>
          <tr>
            <th>Color de piel</th>
            <td>{char.skin_color}</td>
          </tr>
          <tr>
            <th>Color de ojos</th>
            <td>{char.eye_color}</td>
          </tr>
          <tr>
            <th>Fecha de nacimiento</th>
            <td>{char.birth_year}</td>
          </tr>
          <tr>
            <th>Género</th>
            <td>{char.gender}</td>
          </tr>
          <tr>
            <th>Planeta de nacimiento</th>
            <td>{char.homeworld}</td>
          </tr>
        </thead>
      </table>
    ))}
  

{!ocultarbusqueda && !ocultar && data.name && (
  <table className='table-char'>
 <th>No se encontro el Personaje</th>
</table>
)};


{/* Paginación ?? */}
{ocultar && (
<div className="pagination">
<button class="button-74" disabled={paginactual === 1} onClick={prevPage}> Anterior </button> <span> Página   {paginactual} de {paginastotales}</span>
<button class="button-74" disabled={paginactual === paginastotales} onClick={nextPage}>Siguiente</button>
</div>
)}


{/* Personajes individuales */}
{ocultarbusqueda && !ocultar && data.name && (
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
    <td><button  class="button-54" onClick={handleMostrar}>Mostrar </button></td>
  </tr>
</thead>
</table>
)}






<Modal show={mostrar} handleClose={handleCerrar}>  {/* Ventana Modal?*/}
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
      <td>
      <tr>
      {films.map((film, index) => (
      <tr key={index}>
      {index + 1} - {film}
      </tr>
))}

      </tr>
      </td>
      <td>
      {vehicles.map((vehicle, index) => (
      <tr key={index}>
      {index + 1} - {vehicle}
      </tr>
))}
      </td>
      <td>

     {starships.map((starship, index) => (
     <tr key={index}>
     {index + 1} - {starship}
     </tr>
))}
</td>
</tr>

</tbody>
</table>
</Modal>
</div>
</div>
);
}



export default App