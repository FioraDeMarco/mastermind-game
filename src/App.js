import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [number, setNumber] = useState(4);
  const [showDifficulties, setShowDifficulties] = useState(false);
  const [showModes, setShowModes] = useState(false);
  const [classicMode, setClassicMode] = useState(false);
  const [fruitMode, setFruitMode] = useState(true);

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
    setNumber(4);
  };
  const handleEasy = () => {
    setShowDifficulties(false);
    setNumber(3);
  };
  const handleModes = () => {
    setShowModes(!showModes);
  };
  const handleClassicMode = () => {
    setShowModes(false);
    setClassicMode(true);
  };
  const handleFruitMode = () => {
    setShowModes(false);
    setFruitMode(true);
  };

  return (
    <div className='all'>
      <header className='App-header'>
        <h1>Mastermind Game</h1>
      </header>
      {isStarted ? (
        <Game number={number} fruitMode={fruitMode} classicMode={classicMode} />
      ) : (
        <>
          <div className='display'>
            <section className='learn'>
              <div className='dropdown'>
                <button id='instructions' onClick={handleStartGame}>
                  Instructions
                </button>
              </div>
              <div className='dropdown'>
                <button onClick={handleModes}>Mode</button>
                {showModes ? (
                  <ul className='levels'>
                    <li className='classic'>
                      <button onClick={handleClassicMode}>Classic</button>
                    </li>
                    <li>
                      <button onClick={handleFruitMode}>Fruit</button>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>

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
              <div className='dropdown'>
                <button id='play-game' onClick={handleStartGame}>
                  Play!
                </button>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
