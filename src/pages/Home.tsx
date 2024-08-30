import { getAnimalsFromLocalStorage } from '../utils/localStorageUtils';
import { hasBeenMoreThanFourHours } from '../services/animalService'; 
import { Link } from 'react-router-dom';

const Home = () => {
  const storedAnimals = getAnimalsFromLocalStorage();
  const hungryAnimals = storedAnimals.filter(animal => hasBeenMoreThanFourHours(animal.lastFed));

  return (
    <>
      <h2>Välkommen!</h2>
      <p>Dina djur väntar på dig!</p>
      
      <div>
        <h3>Hungriga djur</h3>
        {hungryAnimals.length > 0 ? (
          <section className='animals'>
            {hungryAnimals.map(animal => (
              <div key={animal.id} className={`animal-starving-${animal.id} animal-presentation`}>
                <h3 className="animal-name">{animal.name}</h3>
                <div className="animal-image-container">
                  <img src={animal.imageUrl} alt={animal.name} className="animal-image" />
                </div>
                <Link to={`/animals/${animal.id}`} className="animal-button-link">
                  <button className="animal-button">Till djuret</button>
                </Link>
              </div>
              
            ))}
          </section>
        ) : (
          <p>Alla dina djur är mätta!</p>
        )}
      </div>
    </>
  );
}

export default Home;
