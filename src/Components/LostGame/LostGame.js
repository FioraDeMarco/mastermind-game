import React from "react";
import "./LostGame.css";

export const LostGame = ({ closeLose, handleNewGame }) => {
  return (
    <div className='lose-container'>
      <div className='lose'>
        <h1>{`WE ARE THE MASTERMIND`}</h1>
        <h3>Sorry! You Lose!</h3>
        <button id='new-game' onClick={handleNewGame}>
          New Game⏯
        </button>
      </div>
    </div>
  );
};
