import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";
import "../src/Game/Game.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [number, setNumber] = useState(4);
  const [showDifficulties, setShowDifficulties] = useState(false);

  const handleStartGame = () => {
    setIsStarted(true);
  };
  const handleDifficulties = () => {
    setShowDifficulties(!showDifficulties);
  };
  const handleHard = () => {
    setShowDifficulties(false);
    setNumber(7);
  };
  const handleMedium = () => {
    setShowDifficulties(false);
    setNumber(5);
  };
  const handleEasy = () => {
    setShowDifficulties(false);
    setNumber(4);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Mastermind Game</h1>
        {isStarted ? (
          <Game number={number} />
        ) : (
          <>
            <div className='dropdown'>
              <button id='difficulties-button' onClick={handleDifficulties}>
                Difficulty
              </button>
              {showDifficulties ? (
                <ul className='levels'>
                  <li className='hard'>
                    <button onClick={handleHard}>Hard</button>
                  </li>
                  <li className='medium'>
                    <button onClick={handleMedium}>Medium</button>
                  </li>
                  <li className='easy'>
                    <button onClick={handleEasy}>Easy</button>
                  </li>
                </ul>
              ) : (
                ""
              )}
              {showDifficulties ? <di>Open</di> : <div>Closed</div>}
            </div>
            <button onClick={handleStartGame}>Start Game!</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
