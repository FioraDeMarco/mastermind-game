import React from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.css";

export const NAN = () => {
  toast(
    "You must enter an integer from 0 - 7 if you want to be the Mastermind!",
    {
      className: "custom-toast",
      draggable: "true",
      position: toast.POSITION.TOP_CENTER,
    }
  );
};

export const info = () => {
  toast(
    "HOW TO PLAY: At the beginning of each game, you must press new game. The computer makes a new combination of fruit or numbers (click Mode to switch) for you to guess. You must enter your guesses IN ORDER and press the ✅ button to see if you are correct. You get 10 chances, good luck!",
    {
      className: "custom-toast",
      draggable: "true",
      position: toast.POSITION.TOP_CENTER,
    }
  );
};

const Toastify = () => {
  //   toast.error("No bueno, you've already guessed that combination.");
  //   toast.success("Success!");
  // toast.info("Some information for you...");
  //   toast.warn(
  //     "You must enter an INTEGER from 1 - 7 if you want to be the Mastermind!"
  //   );

  //   const toastError = () => {
  //     toast("Oh, for fruits sake... You lost!", {
  //       className: "custom-toast",
  //       draggable: "true",
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   };

  return (
    <div className='toast'>
      <ToastContainer
        draggable={true}
        transition={Bounce}
        autoClose={12000}
      ></ToastContainer>
    </div>
  );
};

export default Toastify;
