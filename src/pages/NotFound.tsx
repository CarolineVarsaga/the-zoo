import { Link, useRouteError } from "react-router-dom"

type RouteError = {
  status: number;
  statusText: string;
  message: string;
};

const NotFound = () => {
  const error = useRouteError() as RouteError;
  return (
    <div className="error-message-container"> 
      <h2 className="error-message">{error.status === 404 ? "404 - Sidan hittades inte...😭" : "Ett oväntat fel inträffade!😵‍💫"}</h2> 
      <Link to="/"><button className="start-button">Startsidan</button></Link>
    </div>
  )
}

export default NotFound