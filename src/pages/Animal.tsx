import ShowAnimal from "../components/ShowAnimal";
import { useLoaderData } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

const Animal = () => { 
  const currentAnimal = useLoaderData() as IAnimal | null; 

  return (
    <>
      {currentAnimal ? <ShowAnimal animal={currentAnimal} /> : <p>Djuret hittades inte.</p>}
    </>
  );
}

export default Animal