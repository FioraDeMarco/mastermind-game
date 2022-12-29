import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";

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
    <div className='all'>
      {/* <div className='App-apple'> */}
      <header className='App-header'>
        <h1>Mastermind Game</h1>
      </header>
      {isStarted ? (
        <Game number={number} />
      ) : (
        <>
          <div className='display'>
            <section className='learn'>
              Learn More About Mastermind Images
              <img
                id='img'
                src='https://upload.wikimedia.org/wikipedia/commons/2/2d/Mastermind.jpg'
                height='150'
                width='130'
              />
              <section className='start'>
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
                </div>
                <button id='play-game' onClick={handleStartGame}>
                  Play!
                </button>
              </section>
            </section>
          </div>
        </>
      )}
      {/* </div> */}
    </div>
  );
}

export default App;
