import ShowAnimals from "../components/ShowAnimals";
import useAnimals from "../hooks/useAnimals";

const Animals = () => {  
  const { animals, error, fetched } = useAnimals();

  if (!fetched) return <p>Hämtar djuren...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <>
      <ShowAnimals animals={animals}/>
    </>  
  )
}

export default Animals