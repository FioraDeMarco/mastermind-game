import React from "react";
import "./LostGame.css";
import Button from "@mui/material/Button";

export const LostGame = ({ handleNewGame }) => {
  return (
    <div className='lose-container'>
      <div className='lose'>
        <h1>{`WE ARE THE MASTERMIND`}</h1>
        <h3>Sorry! You Lose! That's 🍌s!</h3>
        <Button
          variant='contained'
          sx={{ borderRadius: 50 }}
          color='success'
          onClick={handleNewGame}
          id='new-game'
          onClick={handleNewGame}
        >
          New Game⏯
        </Button>
      </div>
    </div>
  );
};
