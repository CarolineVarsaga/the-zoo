import { IAnimal } from "../models/IAnimal"
import { useState, useEffect } from "react";
import { get } from "../services/animalService";
import { getFromLocalStorage, updateLocalStorage } from "../utils/localStorageUtils";
import ShowAnimals from "../components/ShowAnimals";
 
const BASE_URL = "https://animals.azurewebsites.net/api/animals";

const Animals = () => {  
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [fetched, setFetched] = useState(false); 
  const storedAnimals = getFromLocalStorage("animals");
  
  const getData = async () => {
    try {
      const response = await get<IAnimal[]>(`${BASE_URL}`);
      const data = response.data;
      setAnimals(data); 
      updateLocalStorage("animals", JSON.stringify(data));
      setFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getAnimalsFromLocalStorage = () => {
    if (storedAnimals) {
      const parsedAnimals = JSON.parse(storedAnimals);
      setAnimals(parsedAnimals);
      setFetched(true);
    } else {
      getData();
    }
  };

  useEffect(() => {
    if (fetched) return; 
    getAnimalsFromLocalStorage(); 
  })

  return (
    <>
      <ShowAnimals animals={animals}/>
    </>  
  )
}

export default Animals