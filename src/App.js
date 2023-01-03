import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";
import Toastify, { info } from "./Components/Toastify";
// import { handleNewGame } from "../src/utilis";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [numberOfInputs, setNumberOfInputs] = useState(4);
  const [showDifficulties, setShowDifficulties] = useState(false);
  const [showModes, setShowModes] = useState(false);
  const [classicMode, setClassicMode] = useState(false);
  const [fruitMode, setFruitMode] = useState(true);
  const [randomFruit, setRandomFruit] = useState([]);

  const fruitsNumbers = [
    { 0: "🍎" },
    { 1: "🍌" },
    { 2: "🍊" },
    { 3: "🍇" },
    { 4: "🍓" },
    { 5: "🍍" },
    { 6: "🥥" },
    { 7: "🥝" },
  ];

  const handleDifficulties = () => {
    setShowDifficulties(!showDifficulties);
  };
  const handleHard = () => {
    setShowDifficulties(false);
    setNumberOfInputs(7);
  };
  const handleMedium = () => {
    setShowDifficulties(false);
    setNumberOfInputs(4);
  };
  const handleEasy = () => {
    setShowDifficulties(false);
    setNumberOfInputs(3);
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
  const handleHelpClick = () => {
    info();
  };

  // const handleNewNumbers = () => {
  //   let tempRandomNumber = [];
  //   let tempFruit = [];

  //   let index = number;
  //   while (index > 0) {
  //     let num = Math.floor(Math.random() * 8);

  //     tempRandomNumber.push(num);

  //     tempFruit.push(Object.values(fruitsNumbers[num]).toString());
  //     index--;
  //   }
  //   setRandomFruit(tempFruit);
  //   // setRandomNumber(tempRandomNumber);
  // };

  const handleStartGame = () => {
    setIsStarted(true);
    // handleNewNumbers();
  };

  return (
    <div className='all'>
      <header className='App-header'>
        <h1>Mastermind Game</h1>
      </header>
      {isStarted ? (
        <Game
          numberOfInputs={numberOfInputs}
          fruitMode={fruitMode}
          classicMode={classicMode}
          isStarted={isStarted}
          // handleNewNumbers={handleNewNumbers}
          // randomFruit={randomFruit}
          // setRandomFruit={setRandomFruit}
        />
      ) : (
        <>
          <div className='display'>
            <section className='learn'>
              <div className='dropdown'>
                <Toastify />
                <button id='help' onClick={handleHelpClick}>
                  Help
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
