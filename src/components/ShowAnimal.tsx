import { useState } from "react"
import { IAnimal } from "../models/IAnimal"
import { getAnimalsFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils"
import { nextFeedingTime, formattedDate } from "../services/animalService";
import { formatDate } from "../services/animalService";
import { getAnimalHungerStatus } from "../services/animalService";
import { useNavigate } from "react-router-dom";
import Img from "./BrokenImagePlaceholder";

export interface IShowAnimalProps {
  animal: IAnimal; 
}

const ShowAnimal = (props: IShowAnimalProps) => {
  const [animal, setAnimal] = useState<IAnimal>(props.animal); 
  const { isHungry: animalIsHungry, isStarving: animalIsStarving } = getAnimalHungerStatus(animal.lastFed);
  const navigate = useNavigate(); 

  const feedAnimal = () => {
    const storedAnimals = getAnimalsFromLocalStorage();   

    const updatedAnimal = {
      ...animal,
      lastFed: formatDate(new Date()),
      isFed: true,
    };

    setAnimal(updatedAnimal);

    const updatedAnimalsInLocalStorage = storedAnimals.map((a) =>
      a.id === updatedAnimal.id ? updatedAnimal : a
    );
    saveToLocalStorage(updatedAnimalsInLocalStorage);
  };

  return (
    <>           
      <section className="animal-page-container">      
        <button onClick={() => navigate(-1)} className="button-back">Tillbaka</button>
        <div className="animal-page">
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
        </div>
      </section>      
    </>
  )
}

export default ShowAnimal