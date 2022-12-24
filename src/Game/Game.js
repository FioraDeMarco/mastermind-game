import React, { useState } from "react";

function Game() {
  let attempts = 10;
  const [winner, setWinner] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  return (
    <div className='Game'>
      <header className='Game-header'>
        <h4>
          {!winner
            ? `You Have ${attempts - guessCount} Attempts Remaining!`
            : ""}
        </h4>
      </header>
    </div>
  );
}

export default Game;
