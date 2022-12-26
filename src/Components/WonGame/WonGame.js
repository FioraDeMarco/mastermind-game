import React from "react";
import "./WonGame.css";

export const WonGame = ({ closeWin, handleNewGame }) => {
  return (
    <div className='won-container'>
      <div className='won'>
        <h1>{`YOU ARE THE MASTERMIND`}</h1>
        <h6>Four correct values in four correct locations!</h6>
        <button id='new-game' onClick={handleNewGame}>
          New Game⏯
        </button>
        <button onClick={closeWin}>Close X</button>
      </div>
    </div>
  );
};
