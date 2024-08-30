import { IAnimal } from "../models/IAnimal";

export const updateLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getAnimalsFromLocalStorage = (): IAnimal[] => {
  const storedAnimals = localStorage.getItem("animals");
  return storedAnimals ? JSON.parse(storedAnimals) : null; 
}

export const saveToLocalStorage = (animals: IAnimal[]) => {
  localStorage.setItem("animals", JSON.stringify(animals)); 
}