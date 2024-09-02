import { IAnimal } from "../models/IAnimal"
import { getAnimalHungerStatus } from "../services/animalService"
import { Link } from "react-router-dom";
import Img from "./BrokenImagePlaceholder";

export interface IShowAnimalProps {
  animals: IAnimal[]; 
}

const ShowAnimals = (props: IShowAnimalProps) => {
  const { animals } = props; 

  return (
    <>
      <div className="heading-container">
        <h2>Dina underbara djur</h2>
      </div>      
      <section className="animals">
        {animals.map((animal) => {          
          const { isHungry: animalIsHungry, isStarving: animalIsStarving } = getAnimalHungerStatus(animal.lastFed);          
          return (
            <div 
              key={animal.id} 
              className={
                `${animalIsStarving 
                ? `animal-starving-${animal.id}` 
                : animalIsHungry 
                ? `animal-hungry-${animal.id}` 
                : `animal-fed-${animal.id}`} 
                animal-presentation`
              }
            >
              <h3 className="animal-name">{animal.name}</h3>
              <picture className="animal-image-container">
                <Img src={animal.imageUrl} alt={animal.name} className={`animal-image ${animal.name.toLowerCase()}`}  />
              </picture>
              <div className="animal-description">{animal.shortDescription}</div>
              <Link to={`/animals/${animal.id}`} className="animal-button-link">
                <button className="animal-button">Se mer</button>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  )
}

export default ShowAnimals