import React from "react";
import "./WonGame.css";
import Confetti from "react-confetti";

export const WonGame = ({ closeWin, handleNewGame }) => {
  return (
    <div className='won-container'>
      <Confetti />
      <div className='won'>
        <h1>{`YOU ARE THE MASTERMIND!`}</h1>
        <h3>All correct, You Win!</h3>
        <h6>🍊 You glad?</h6>
        <button id='new-game' onClick={handleNewGame}>
          Play Again! ⏯
        </button>
        {/* <button onClick={closeWin}>Close X</button> */}
      </div>
    </div>
  );
};
