import React, { useState } from "react";

function Game() {
  let attempts = 10;
  const [winner, setWinner] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState([]);
  const [win, setWin] = useState(false);
  const [randomNumberButton, setRandomNumberButton] = useState(true);
  const [inputValues, setInputValues] = useState([]);
  const [userGuess, setUserGuess] = useState([]);

  const handleNewGame = (e) => {
    e.preventDefault();
    setRandomNumberButton(false);
    setWin(false);
    let a = Math.floor(Math.random() * 8);
    let b = Math.floor(Math.random() * 8);
    let c = Math.floor(Math.random() * 8);
    let d = Math.floor(Math.random() * 8);
    const tempRandomNumber = [a, b, c, d];
    setRandomNumber(tempRandomNumber);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValues([...inputValues, value]);
  };
  const inputs = [];
  let number = 4;
  for (let i = 0; i < number; i++) {
    inputs.push(
      <input
        className={"inputs"}
        type='number'
        min={0}
        onChange={handleChange}
        max={7}
        maxLength={1}
        value={inputValues[i]}
        key={`${i}`}
        name={`${i}`}
      />
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserGuess([...inputValues, inputValues]);
  };

  return (
    <div className='Game'>
      <header className='Game-header'>
        <h4>
          {!winner && !win
            ? { handleNewGame } &&
              `You Have ${attempts - guessCount} Attempts Remaining!`
            : ""}
        </h4>
        {randomNumberButton ? (
          <div>
            <button onClick={handleNewGame}>Enter Your Master Guesses!</button>
          </div>
        ) : (
          <div>
            <section className='form-section'>
              <form>
                <label>
                  <div>{inputs}</div>
                  <button onClick={handleSubmit}>✅</button>
                </label>
              </form>
            </section>
          </div>
        )}
      </header>
    </div>
  );
}

export default Game;
