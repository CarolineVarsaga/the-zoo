import { getAnimal } from "../services/animalService";
import { Params } from "react-router-dom";

interface IAnimalLoader {
  params: Params<string>;
}

export const animalLoader = async ({ params }: IAnimalLoader) => {
  const id = params.id;
  if (id) {
    const animal = await getAnimal(parseInt(id));
    return animal.data;
  } 
  return null; 
}