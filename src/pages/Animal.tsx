import { useState, useEffect } from "react";
import { IAnimal } from "../models/IAnimal"
import { Link, useLoaderData } from "react-router-dom"
import { getFromLocalStorage } from "../utils/localStorageUtils";
import { feedAnimal, formatDateTime } from "../services/animalService";

const Animal = () => {
  const animal = useLoaderData() as IAnimal; 
  const [datetime, setDatetime] = useState<string>(() => {
    return getFromLocalStorage(`lastFed-${animal.id}`) || "";
  });
  const [nextFeedTime, setNextFeedTime] = useState<string>(() => {
    return getFromLocalStorage(`nextFeed-${animal.id}`) || "";
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false); 

 
  const animalFed = () => {    
    const datetime = feedAnimal(animal.id);
    setDatetime(datetime); 

    const nextFeed = getFromLocalStorage(`nextFeed-${animal.id}`);
    setNextFeedTime(nextFeed || "");
    checkButtonStatus(nextFeed || "");
  }

  const checkButtonStatus = (nextFeedTimeString: string) => {
    const now = new Date();
    const nextFeedDate = new Date(nextFeedTimeString);

    setIsDisabled(now <= nextFeedDate);
  };

  useEffect(() => {
    checkButtonStatus(nextFeedTime);

    const intervalId = setInterval(() => {
      checkButtonStatus(nextFeedTime);
    }, 1000); 
    return () => clearInterval(intervalId);
  }, [nextFeedTime]);


  return (
    <>
      <Link to={`/animals`}><button className="button-back">Tillbaka</button></Link>
      <section className="animal-page">
        <div className="animal-page-image-container">
          <img src={animal.imageUrl} alt={animal.name} className="animal-page-image"/> 
        </div>
        <div className="animal-page-description-container">
          <div>
            <h2 className="animal-page-name">{animal.name}</h2>
            <h3>
              {isDisabled ? "Status: Mätt" : "Status: HUNGRIG"}
            </h3>
          </div>
          
          <p className="animal-page-description">{animal.shortDescription}</p>
          <div>
            <button 
            className={`${isDisabled ? 'button-disabled' : 'button-feed'}`}
            onClick={animalFed}
            disabled={isDisabled}            
            >              
              Mata
            </button>
            
            {datetime && (
              <p>Du matade djuret: {datetime}</p>
            )}
            {nextFeedTime && (
              <p>Du kan mata djuret tidigast: {formatDateTime(new Date(nextFeedTime))}</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Animal