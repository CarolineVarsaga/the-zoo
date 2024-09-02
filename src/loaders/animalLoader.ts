import { getAnimal } from "../services/animalService";
import { Params } from "react-router-dom";
import { getAnimalsFromLocalStorage } from "../utils/localStorageUtils";

interface IAnimalLoader {
  params: Params<string>;
}

export const animalLoader = async ({ params }: IAnimalLoader) => {
  const id = params.id;
  if (id) {
    const storedAnimals = getAnimalsFromLocalStorage();
    const animalFromStorage = storedAnimals.find((animal) => animal.id === parseInt(id));
    if (animalFromStorage) {
      return animalFromStorage;
    }

    const animal = await getAnimal(parseInt(id));
    return animal.data;
  } 
  return null; 
}