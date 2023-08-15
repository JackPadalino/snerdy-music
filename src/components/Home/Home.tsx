import React from "react";

const Home = () => {
  const token = window.localStorage.getItem("token");

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Welcome to Snerdy</h1>
    </div>
  );
};

export default Home;
