import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Music, Login, Upload } from ".";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/music" element={<Music />} />
    </Routes>
  );
};

export default RouterComponent;
