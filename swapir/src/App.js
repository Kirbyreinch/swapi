import './App.css';
import axios from "axios";
import React, { useState,useEffect  } from "react";
import logo from './navelogo.jpg';
import Modal from './modal';




function App() {

const [data, setData] = useState({});
const [characters, setcharacters] = useState([]);
const [searchQuery, setSearchQuery] = useState(''); 
const [homeworld, setHomeworld]= useState('');
const [mostrar, setmostrar]= useState(false);
const [ocultar, setocultar]= useState(true);
const [ocultarbusqueda, setocultarbusqueda]= useState(true);
const [paginactual, setpaginactual] = useState(1); // Página actual
const [paginastotales, setpaginastotales] = useState(1); // Total de páginas




const findCharacterIdByName = (name) => {
  const character = characters.find(char => char.name.toLowerCase() === name.toLowerCase());
  return character ? `people/${character.url.split('/')[5]}` : null;
};


const handleMostrar = (character) => {
  setmostrar(true);
  fetchCharacterDetails(character); // Cargar detalles del personaje
};

const [characterDetails, setCharacterDetails] = useState({
  films: [],
  vehicles: [],
  starships: [],
  homeworld: '',
});


// Datos adicionales  

const fetchCharacterDetails = async (character) => {
  try {
    const filmRequests = character.films?.map(filmUrl => axios.get(filmUrl)) || [];
    const filmResponses = await Promise.all(filmRequests);
    const films = filmResponses.map(film => film.data.title);

    const vehiclesRequests = character.vehicles?.map(vehicleUrl => axios.get(vehicleUrl)) || [];
    const vehiclesResponses = await Promise.all(vehiclesRequests);
    const vehicles = vehiclesResponses.map(vehicle => vehicle.data.name);

    const starshipsRequests = character.starships?.map(starshipUrl => axios.get(starshipUrl)) || [];
    const starshipsResponses = await Promise.all(starshipsRequests);
    const starships = starshipsResponses.map(starship => starship.data.name);

    setCharacterDetails({ films, vehicles, starships, homeworld: character.homeworld });
  } catch (error) {
    console.error("Error al obtener detalles del personaje:", error);
  }
};


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
  fetchAllData(paginactual);//Paginar
}, [paginactual]);


// Personajes por busqueda ahora por nombre
const fetchData = async () => {
  try {
    let characterId = searchQuery;

    // Verificar si es un nombre y buscar el ID
    if (!characterId.startsWith('people/')) {
      const foundId = findCharacterIdByName(searchQuery);
      characterId = foundId ? foundId : null;
    }

    if (characterId) {
      const result = await axios(`https://swapi.dev/api/${characterId}`);
      const characterData = result.data;
      setData(characterData);
      

      const homeworldResponse = await axios.get(characterData.homeworld);
      setHomeworld(homeworldResponse.data.name);
    } else {
      setocultarbusqueda(false); 
    }
  } catch (error) {
    setocultarbusqueda(false);
    console.error("Error al buscar el personaje:", error);
  }
};

const ocultamiento = () => {
  if (searchQuery === '' || searchQuery === 'people') {
    setocultar(true); 
  } else {
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

  
  // HTML
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




{/* Todos los Personajes  */}

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

          <tr>
    <th>informacion Adicional</th>
    <td><button className="button-54" onClick={() => handleMostrar(char)}>Mostrar</button></td>
  </tr>
        </thead>
      </table>
    ))}
  

{/* No Personaje en busqueda */}

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
    <td>
  <button className="button-54" onClick={() => handleMostrar(data)}>Mostrar</button>
</td>
  </tr>
</thead>
</table>
)}



{/* Mostrar en Ventana Modal */}

<Modal show={mostrar} handleClose={() => setmostrar(false)}>
  <table className='table-movies'>
    <thead>
      <tr>
        <th>Películas Relacionadas</th>
        <th>Vehículos Relacionados</th>
        <th>Naves Relacionadas</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          {characterDetails.films.map((film, index) => (
            <div key={index}>{index + 1} - {film}</div>
          ))}
        </td>
        <td>
          {characterDetails.vehicles.map((vehicle, index) => (
            <div key={index}>{index + 1} - {vehicle}</div>
          ))}
        </td>
        <td>
          {characterDetails.starships.map((starship, index) => (
            <div key={index}>{index + 1} - {starship}</div>
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