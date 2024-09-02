import { getAnimalsFromLocalStorage } from '../utils/localStorageUtils';
import { hasBeenMoreThanFourHours } from '../services/animalService'; 
import { Link } from 'react-router-dom';
import Img from './BrokenImagePlaceholder';

export const AnimalCard = () => {
  const storedAnimals = getAnimalsFromLocalStorage();
  const hungryAnimals = storedAnimals.filter(animal => hasBeenMoreThanFourHours(animal.lastFed));

  return (
    <><section className='animals'>
    {hungryAnimals.map(animal => (
      <div key={animal.id} className={`animal-starving-${animal.id} animal-presentation`}>
        <h3 className="animal-name">{animal.name}</h3>
        <div className="animal-image-container">
          <Img src={animal.imageUrl} alt={animal.name} className="animal-image"  />
        </div>
        <Link to={`/animals/${animal.id}`} className="animal-button-link">
          <button className="animal-button">Till djuret</button>
        </Link>
      </div>      
    ))}
  </section></>
  )
}

export default AnimalCard