import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import Model from "./Components/Model.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Nav from "./Components/Nav.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='/' element={<Nav />} />
      <Route path="about" element={<Model />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(

  <RouterProvider router={router} />
);
