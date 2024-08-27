import axios from "axios";

const BASE_URL = "https://animals.azurewebsites.net/api/animals";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url); 
}; 

export const getAnimal = async (id: number) => {
  return await get(`${BASE_URL}/${id}`);
}
