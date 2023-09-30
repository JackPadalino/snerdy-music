import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Music, Login, Upload, Checkout } from ".";

const RouterComponent = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  // Get the value of the 'success' query parameter
  const successQueryParam = urlParams.get("success");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/music" element={<Music />} />
      {/* Pass the successQueryParam as a prop to the Success component */}
      <Route
        path="/checkout"
        element={<Checkout successQueryParam={successQueryParam} />}
      />
    </Routes>
  );
};

export default RouterComponent;
