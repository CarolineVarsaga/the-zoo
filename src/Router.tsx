import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Layout from "./pages/Layout";

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
      }
    ]
  },  
])