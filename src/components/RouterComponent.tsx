import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  // Home,
  Music,
  Login,
  Upload,
  Checkout,
} from ".";

const RouterComponent = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  // Get the value of the 'success' query parameter
  const successQueryParam = urlParams.get("success");
  const songId = urlParams.get("xlr");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/upload" element={<Upload />} />
      <Route path="/music" element={<Music />} />
      {/* Pass the successQueryParam as a prop to the Success component */}
      <Route
        path="/checkout"
        element={
          <Checkout successQueryParam={successQueryParam} songId={songId} />
        }
      />
    </Routes>
  );
};

export default RouterComponent;
