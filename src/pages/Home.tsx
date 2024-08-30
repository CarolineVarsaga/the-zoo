import { hasBeenMoreThanFourHours } from '../services/animalService'; 
import AnimalCard from '../components/AnimalCard';
import useAnimals from '../hooks/useAnimals';

const Home = () => {
  const { animals, error, fetched } = useAnimals();
  const hungryAnimals = animals.filter(animal => hasBeenMoreThanFourHours(animal.lastFed));

  if (!fetched) return <p>Hämtar djuren...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Välkommen!</h2>
      <p>Dina djur väntar på dig!</p>      
      <div>
        <h3>Hungriga djur</h3>
        {hungryAnimals.length > 0 ? (
          <AnimalCard />
        ) : (
          <p>Alla dina djur är mätta!</p>
        )}
      </div> 
    </>
  );
}

export default Home;
