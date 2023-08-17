import React from "react";

interface CheckoutProps {
  successQueryParam: string | null;
}

const Checkout: React.FC<CheckoutProps> = ({ successQueryParam }) => {
  const token = window.localStorage.getItem("token");

  if (!token) return <p>Sorry! Something went wrong!</p>;

  return (
    <div>
      <h1>
        {successQueryParam === "true" ? "Payment Successful" : "Payment Failed"}
      </h1>
    </div>
  );
};

export default Checkout;
