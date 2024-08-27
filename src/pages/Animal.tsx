import { IAnimal } from "../models/IAnimal"
import { Link, useLoaderData } from "react-router-dom"

const Animal = () => {
  const animal = useLoaderData() as IAnimal; 

  return (
    <>
    <Link to={`/animals`}><button className="button-back">Tillbaka</button></Link>
    <section className="animal-page">
      <div className="animal-page-image-container">
        <img src={animal.imageUrl} alt={animal.name} className="animal-page-image"/> 
      </div>
      <div className="animal-page-description-container">
        <h2 className="animal-page-name">{animal.name}</h2>
        <p className="animal-page-description">{animal.shortDescription}</p>
        <button className="button-feed">Mata</button>
      </div>
    </section>
    </>
  )
}

export default Animal