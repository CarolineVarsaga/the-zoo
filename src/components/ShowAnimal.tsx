import { useState } from "react"
import { IAnimal } from "../models/IAnimal"
import { getAnimalsFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils"
import { nextFeedingTime, hungryAnimal, hasBeenMoreThanFourHours, formattedDate } from "../services/animalService";
import { Link } from "react-router-dom";
import Img from "./BrokenImagePlaceholder";

export interface IShowAnimalProps {
  animal: IAnimal; 
}

const ShowAnimal = (props: IShowAnimalProps) => {
  const [animal, setAnimal] = useState<IAnimal>(props.animal); 

  const feedAnimal = () => {
    const storedAnimals = getAnimalsFromLocalStorage();

    const updatedAnimal = {
      ...animal,
      lastFed: new Date().toLocaleString('sv-SE', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      isFed: true,
    };

    setAnimal(updatedAnimal);

    const updatedAnimalsInLocalStorage = storedAnimals.map((a) =>
      a.id === updatedAnimal.id ? updatedAnimal : a
    );
    saveToLocalStorage(updatedAnimalsInLocalStorage);
  };

  const animalIsHungry = hungryAnimal(animal.lastFed);
  const animalIsStarving = hasBeenMoreThanFourHours(animal.lastFed);

  return (
    <>       
      <Link to={`/animals`}><button className="button-back">Tillbaka</button></Link>
      <section className="animal-page">
        <picture className="animal-page-image-container">
          <Img src={animal.imageUrl} alt={animal.name} className="animal-page-image"  />
        </picture>
        <div className="animal-page-description-container">
          <div>
            <h2 className="animal-page-name">{animal.name}</h2>
             <h3>
              {animalIsStarving ? "Status: Jag är UTSVULTEN!😫" : animalIsHungry ? "Status: Magen kurrar...😵‍💫" : "Status: Mätt & belåten🥰"}
            </h3>
          </div>          
          <p className="animal-page-description">{animal.longDescription}</p>
          <div>
            <button 
              className='button-feed'
              onClick={feedAnimal}
              disabled={!animalIsHungry}            
            >              
              Mata
            </button>          
            <p>Du matade djuret: {formattedDate(animal.lastFed)}</p>      
            <p>Du kan mata djuret tidigast: {nextFeedingTime(animal.lastFed)} </p>
          </div>
        </div>
      </section>      
    </>
  )
}

export default ShowAnimal