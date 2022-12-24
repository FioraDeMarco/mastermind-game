import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartGame = () => {
    setIsStarted(true);
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Mastermind Game</h1>
        {isStarted ? (
          <Game {...isStarted} />
        ) : (
          <>
            <button onClick={handleStartGame}>Start Game!</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
