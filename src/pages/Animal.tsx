import { getAnimalsFromLocalStorage } from "../utils/localStorageUtils";
import { useParams } from "react-router-dom";
import ShowAnimal from "../components/ShowAnimal";

const Animal = () => {
  const storedAnimals = getAnimalsFromLocalStorage(); 
  const params = useParams<{ id?: string }>(); 

  const currentAnimal = storedAnimals.find((animal) => animal.id.toString() === params.id);

  return (
    <>
      {currentAnimal ? <ShowAnimal animal={currentAnimal} /> : <p>Djuret hittades inte.</p>}
    </>
  );
}

export default Animal