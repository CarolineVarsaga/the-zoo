import axios from "axios";
import { updateLocalStorage } from "../utils/localStorageUtils";

const BASE_URL = "https://animals.azurewebsites.net/api/animals";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url); 
}; 

export const getAnimal = async (id: number) => {
  return await get(`${BASE_URL}/${id}`);
}

export const feedAnimal = (animalId: number) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const datetime = `${formattedDate}, kl: ${formattedTime}`;

  updateLocalStorage(`lastFed-${animalId}`, datetime);

  return datetime;
};