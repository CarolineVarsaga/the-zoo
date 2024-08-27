import { IAnimal } from "../models/IAnimal"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../services/animalService";
 
  const BASE_URL = "https://animals.azurewebsites.net/api/animals";

  const Animals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [fetched, setFetched] = useState(false); 
  
    const getData = async () => {
      try {
        const response = await get<IAnimal[]>(`${BASE_URL}`);
        setAnimals(response.data); 
        setFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    useEffect(() => {
      if (fetched) return; 
      getData(); 
    })

  return (
    <>
      <h2>Dina fantastiska djur:</h2>
      <section className="animals">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-presentation">
            <h3 className="animal-name">{animal.name}</h3>
            <div className="animal-image-container">
              <img src={animal.imageUrl} alt={animal.name} className="animal-image" />
            </div>
            <div className="animal-description">{animal.shortDescription}</div>
            <Link to={`/animals/${animal.id}`} className="animal-button-link"><button className="animal-button">Se mer</button></Link>
          </div>
         
        ))}
      </section>
    </>
    
  )
}

export default Animals