import axios from "axios";
import { updateLocalStorage } from "../utils/localStorageUtils";

const BASE_URL = "https://animals.azurewebsites.net/api/animals";

export const formatDateTime = (date: Date): string => {
  const formattedDate = date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return `${formattedDate}, kl: ${formattedTime}`;
};

export const get = async <T>(url: string) => {
  return await axios.get<T>(url); 
}; 

export const getAnimal = async (id: number) => {
   return await get(`${BASE_URL}/${id}`);
}

export const feedAnimal = (animalId: number) => {   
  const now = new Date();
  const datetime = formatDateTime(now);

  updateLocalStorage(`lastFed-${animalId}`, datetime);
  nextFeedTime(animalId); 
 
  return datetime;
};

export const nextFeedTime = (animalId: number) => {
  const now = new Date();
  const nextFeedDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const nextFeedISOString = nextFeedDate.toISOString();
  
  updateLocalStorage(`nextFeed-${animalId}`, nextFeedISOString);
  
  const formattedNextFeedDate = formatDateTime(nextFeedDate);
  return formattedNextFeedDate;
}


/* export const nextFeedTime = (animalId: number) => {
  const now = new Date();
  const nextFeedTime = new Date(now.getTime() + 10 * 1000);
  //const nextFeed = formatDateTime(nextFeedTime);
  const nextFeed = nextFeedTime.toISOString();

  updateLocalStorage(`nextFeed-${animalId}`, nextFeed);

  return nextFeed;
 
} */

