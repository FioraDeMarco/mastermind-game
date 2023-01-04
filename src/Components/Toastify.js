import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.css";

export const info = () => {
  toast(
    "HOW TO PLAY: The computer makes a new combination of four fruit from eight different fruit. You must enter a combo of four fruit in order and press the ✅ button to see if you are correct. You get 10 chances, GOOD LUCK!",
    {
      className: "custom-toast",
      draggable: "true",
      position: toast.POSITION.TOP_CENTER,
    }
  );
};

const Toastify = () => {
  return (
    <div className='toast'>
      <ToastContainer
        draggable={true}
        transition={Bounce}
        autoClose={11000}
      ></ToastContainer>
    </div>
  );
};

export default Toastify;
