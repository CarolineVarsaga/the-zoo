import axios from "axios";
const BASE_URL = "https://animals.azurewebsites.net/api/animals";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url); 
}; 

export const getAnimal = async (id: number) => {
return await get(`${BASE_URL}/${id}`);
};

const comingFeedTime = 3 * 60 * 60 * 1000; 

const formatDate = (date: Date): string => {
  return date.toLocaleString('sv-SE', { 
    year: 'numeric',
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
  });
};

export const calculateDateDifference = (lastFed: string): number => {
  const current = new Date().getTime();
  const lastFedTime = Date.parse(lastFed);

  return current - lastFedTime;
};

export const hasBeenMoreThanFourHours = (lastFed: string): boolean => {
  const fourHours = 4 * 60 * 60 * 1000;
  const timeDifference = calculateDateDifference(lastFed);

  return timeDifference > fourHours;
};

export const hungryAnimal = (lastFed: string): boolean => {
  const timeDifference = calculateDateDifference(lastFed);
  const isHungry = timeDifference > comingFeedTime;

  return isHungry || hasBeenMoreThanFourHours(lastFed);
};

export const formattedDate = (lastFed: string) => {
  const lastFedDate = new Date(lastFed);
  const formattedLastFed = new Date(lastFedDate.getTime());
  const formattedTime = formatDate(formattedLastFed);

  return formattedTime; 
};

export const nextFeedingTime = (lastFed: string): string => {
  const lastFedTime = new Date(lastFed);
  const nextFeedingTime = new Date(lastFedTime.getTime() + comingFeedTime);
  const formattedTime = formatDate(nextFeedingTime);
  
  return formattedTime; 
};