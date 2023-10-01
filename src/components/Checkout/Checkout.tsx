import React, { useState, useEffect } from "react";
import axios from "axios";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { resetReduxSong, resetStripeSessionId } from "../../store/songsSlice";
import songType from "../../../types/songType";

interface CheckoutProps {
  successQueryParam: string | null;
}

const Checkout: React.FC<CheckoutProps> = ({ successQueryParam }) => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const reduxSong = useAppSelector((state) => state.songs.reduxSong);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const stripeSessionId = useAppSelector(
    (state) => state.songs.stripeSessionId
  );
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const downloadSong = async (reduxSong: songType, userId: string) => {
    try {
      // Send a GET request to the server to download the song
      const response = await axios.get(
        `/api/songs/${reduxSong.id}/download/${userId}`,
        {
          // Set the response type to blob
          responseType: "blob",
        }
      );
      // Create a Blob URL from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create an <a> element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      // Set the "download" attribute and filename for the download
      link.setAttribute(
        "download",
        `${reduxSong.artist} - ${reduxSong.title}.mp3`
      ); // Set the desired filename
      // Append the <a> element to the DOM and trigger a click event
      document.body.appendChild(link);
      link.click();
      // Cleanup: Remove the <a> element and revoke the Blob URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      dispatch(resetReduxSong());
      dispatch(resetStripeSessionId());
    } catch (error) {
      console.error("Error downloading song:", error);
    }
  };

  const verifyStripePayent = async (
    stripeSessionId: string,
    reduxSong: songType
  ) => {
    const response = await stripe.checkout.sessions.retrieve(stripeSessionId);
    if (response.status === "complete") downloadSong(reduxSong, userInfo.id);
  };

  useEffect(() => {
    setCheckoutMessage("Checkout page");
    verifyStripePayent(stripeSessionId, reduxSong);
  }, []);

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>{checkoutMessage}</h1>
    </div>
  );
};

export default Checkout;
