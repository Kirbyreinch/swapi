import logo from './navelogo.jpg';
import './App.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
 function App() {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                  (`https://swapi.dev/api/people/`), 
                );
                setData(result.data);
            } catch (error) {
                setError(error.message);
            }
        };
  console.log(data.results)
        fetchData();
    }, []);

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
  <button onClick>Buscar</button>
  
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

    
  <td>{data.name}</td>
  <td>{data.height}</td>
  <td>{data.mass}</td>
  <td>{data.hair_color}</td>
  <td>{data.skin_color}</td>
  <td>{data.eye_color}</td>
  <td>{data.birth_year}</td>
  <td>{data.gender}</td>
  <td>{data.homeworld}</td>
  </tr>
  </table>
  </div> 



  <table className='table-movies'>
  <tr>
  <th>Peliculas Relacionadas</th>
 
  </tr>
  <tr>
  <td></td>

  </tr>
  </table>
 

  </body>
    </div>
    );
}


export default App;






























