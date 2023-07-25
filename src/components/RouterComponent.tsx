import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Songs } from ".";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/songs" element={<Songs />} />
    </Routes>
  );
};

export default RouterComponent;
