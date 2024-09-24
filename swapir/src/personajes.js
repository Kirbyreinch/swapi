
//Peticion Api general

const [characters, setcharacters] = useState([]);


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
     
  
  
      
  
      //Peticiones vehiculos
      const vehiclesrequest = allCharacters.vehicles.map(vehiclesUrl => axios.get(vehiclesUrl));
      const vehiclesresponse = await Promise.all(vehiclesrequest); 
      const vehiclesName = vehiclesresponse.map(vehicle => vehicle.data.name); 
      setVehicles(vehiclesName); 
  
  
      //Peticiones naves
      const starshipsrequest = allCharacters.starships.map(starshipsUrl => axios.get(starshipsUrl));
      const starshipsresponse = await Promise.all(starshipsrequest); 
      const starshipsName = starshipsresponse.map(starship => starship.data.name); 
      setStarships(starshipsName); 
  
  
  
  
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  