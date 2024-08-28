import { useState } from "react";
import { IAnimal } from "../models/IAnimal"
import { Link, useLoaderData } from "react-router-dom"
import { getFromLocalStorage } from "../utils/localStorageUtils";
import { feedAnimal } from "../services/animalService";

const Animal = () => {
  const animal = useLoaderData() as IAnimal; 
  const [datetime, setDatetime] = useState<string>(() => {
    return getFromLocalStorage(`lastFed-${animal.id}`) || "";
  });

  const animalFed = () => {    
    const datetime = feedAnimal(animal.id);
    setDatetime(datetime); 
  }


  return (
    <>
    <Link to={`/animals`}><button className="button-back">Tillbaka</button></Link>
    <section className="animal-page">
      <div className="animal-page-image-container">
        <img src={animal.imageUrl} alt={animal.name} className="animal-page-image"/> 
      </div>
      <div className="animal-page-description-container">
        <h2 className="animal-page-name">{animal.name}</h2>
        <p className="animal-page-description">{animal.shortDescription}</p>
        <div>
        <button className="button-feed" onClick={animalFed}>Mata</button>
        {datetime && (
          <p>Du matade djuret: {datetime}</p>
        )}
        </div>
      </div>
    </section>
    </>
  )
}

export default Animal