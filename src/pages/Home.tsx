import { hasBeenMoreThanFourHours } from '../services/animalService'; 
import AnimalCard from '../components/AnimalCard';
import useAnimals from '../hooks/useAnimals';
import { Link } from 'react-router-dom';

const Home = () => {
  const { animals, error, fetched } = useAnimals();
  const hungryAnimals = animals.filter(animal => hasBeenMoreThanFourHours(animal.lastFed));

  if (!fetched) return <p>Hämtar djuren...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="home-page">
        <h2 className='heading-welcome'>Välkommen till Zoorummet</h2>
        <div>
          <h3>{hungryAnimals.length > 0 ? "Dina djur är utsvultna!😫"  : "Alla dina djur är mätta!🥰"}</h3>
          {hungryAnimals.length > 0 ? (
            <AnimalCard />
          ) : (<Link to="/animals"><button className='animals-button'>Visa djur</button></Link>)}
        </div> 
      </section>
    </>
  );
}

export default Home;
