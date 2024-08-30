import { useState, useEffect } from 'react';
import { get } from '../services/animalService'; 
import { IAnimal } from '../models/IAnimal';
import { updateLocalStorage } from '../utils/localStorageUtils';

const BASE_URL = "https://animals.azurewebsites.net/api/animals";

const useAnimals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await get<IAnimal[]>(BASE_URL);
      const data = response.data;
      setAnimals(data);
      updateLocalStorage('animals', JSON.stringify(data));
      setFetched(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data.');
    }
  };

  const getAnimalsFromLocalStorage = () => {
    const storedAnimals = localStorage.getItem('animals');
    if (storedAnimals) {
      try {
        const parsedAnimals = JSON.parse(storedAnimals) as IAnimal[];
        setAnimals(parsedAnimals);
        setFetched(true);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        getData(); 
      }
    } else {
      getData();
    }
  };

  useEffect(() => {
    if (!fetched) {
      getAnimalsFromLocalStorage();
    }
  });

  return { animals, error, fetched };
};

export default useAnimals;
