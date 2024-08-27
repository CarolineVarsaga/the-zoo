import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Layout from "./pages/Layout";
import Animal from "./pages/Animal";
import { animalLoader } from "./loaders/animalLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/animals",
        element: <Animals></Animals>
      },
      {
        path: "/animals/:id",
        element: <Animal />,
        loader: animalLoader,
      }
    ]
  }
])