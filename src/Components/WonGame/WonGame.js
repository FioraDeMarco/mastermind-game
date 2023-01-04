import React from "react";
import "./WonGame.css";
import Confetti from "react-confetti";
import Button from "@mui/material/Button";

export const WonGame = ({ closeWin, handleNewGame }) => {
  return (
    <div className='won-container'>
      <Confetti />
      <div className='won'>
        <h1>{`YOU ARE THE MASTERMIND!`}</h1>
        <h3>All correct, You Win!</h3>
        <h3>🍊 You glad?</h3>
        <Button
          variant='contained'
          sx={{ borderRadius: 50 }}
          color='success'
          onClick={handleNewGame}
          id='new-game'
        >
          Play Again! ⏯
        </Button>
      </div>
    </div>
  );
};
