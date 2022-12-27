import React from "react";
import "./WonGame.css";

export const WonGame = ({ closeWin, handleNewGame }) => {
  return (
    <div className='won-container'>
      <div className='won'>
        <h1>{`YOU ARE THE MASTERMIND!`}</h1>
        <h3>All correct, You Win!</h3>
        <button id='new-game' onClick={handleNewGame}>
          New Game⏯
        </button>
        <button onClick={closeWin}>Close X</button>
      </div>
    </div>
  );
};
