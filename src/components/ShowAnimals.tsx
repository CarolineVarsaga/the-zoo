import { IAnimal } from "../models/IAnimal"
import { hasBeenMoreThanFourHours, hungryAnimal } from "../services/animalService"
import { Link } from "react-router-dom";

export interface IShowAnimalProps {
  animals: IAnimal[]; 
}

const ShowAnimals = (props: IShowAnimalProps) => {
  const { animals } = props; 
  const placeholderImage = 'src/assets/photoPlaceholder.jpg';


  return (
    <>
      <h2>Dina underbara djur:</h2>
      <section className="animals">
        {animals.map((animal) => {          
          const animalIsHungry = hungryAnimal(animal.lastFed);
          const animalIsStarving = hasBeenMoreThanFourHours(animal.lastFed);          
          // const imageUrl = animal.imageUrl ? animal.imageUrl : placeholderImage;
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
                <img src={animal.imageUrl} alt={animal.name} className="animal-image" onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }} />
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