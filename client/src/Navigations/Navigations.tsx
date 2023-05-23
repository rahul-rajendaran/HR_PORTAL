import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import Add from "../Components/Pages/Add";
import Singleview from "../Components/Pages/Singleview";
import Update from "../Components/Pages/Update";
const Navigations = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<Add />} />
          <Route path="singleview/:id" element={<Singleview />}/>
          <Route path="update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigations;
