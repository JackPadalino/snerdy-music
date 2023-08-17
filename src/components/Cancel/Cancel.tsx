import React from "react";

const Cancel = () => {
  const token = window.localStorage.getItem("token");

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Cancelled!</h1>
    </div>
  );
};

export default Cancel;
