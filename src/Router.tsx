import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Layout from "./pages/Layout";
import Animal from "./pages/Animal";
import NotFound from "./pages/NotFound";
import { animalLoader } from "./loaders/animalLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/animals",
        element: <Animals />
      },
      {
        path: "/animals/:id",
        element: <Animal />,
        loader: animalLoader,   
      }
    ]
  }
])