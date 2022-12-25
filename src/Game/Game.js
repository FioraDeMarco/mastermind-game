import React, { useEffect, useState } from "react";
import LostGame from "../Components/LostGame/LostGame";
import Feedback from "../Components/Feedback/Feedback";

function Game() {
  const [winner, setWinner] = useState(false);
  const [guessCount, setGuessCount] = useState(1);
  const [randomNumber, setRandomNumber] = useState([]);
  const [win, setWin] = useState(false);
  const [randomNumberButton, setRandomNumberButton] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [userGuess, setUserGuess] = useState({});
  const [userGuesses, setUserGuesses] = useState([]);
  const [messageOn, setMessageOn] = useState(false);
  const [loser, setLoser] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);

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
    setInputValues({});
    setUserGuess({});
    setUserGuesses([]);
    setGuessCount(1);
  };
  const inputs = [];

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
    setMessageOn(false);
  };

  for (let i = 1; i <= 4; i++) {
    inputs.push(
      <input
        className={"inputs"}
        min={0}
        max={7}
        type='text'
        maxLength={1}
        value={inputValues[i]}
        key={`${i}`}
        name={`${i}`}
        onChange={handleChange}
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserGuess({ ...inputValues });
    setUserGuesses([...userGuesses, userGuess]);
    setUserGuesses([...userGuesses, userGuess]);
    setGuessCount(guessCount + 1);
    let correctLocation = 0;
    let correctValue = 0;
    let attemptStr = Object.values(inputValues).join("");
    let randomNumberStr = randomNumber.join("");
    for (let i = 0; i < randomNumberStr.length; i++) {
      if (attemptStr[i] === randomNumberStr[i]) {
        correctLocation++;
      }
      if (
        randomNumberStr.includes(attemptStr[i]) &&
        attemptStr.includes(randomNumberStr[i])
      ) {
        correctValue++;
      }
    }
    if (correctLocation === 4 && correctValue === 4) {
      setWinMessage("YOU ARE THE MASTERMIND!");
      setWin(true);
    }
    setMessage(
      `You have ${correctValue} correct number${
        correctValue > 1 ? "s" : ""
      } in ${correctLocation} correct location${
        correctLocation > 1 ? "s" : ""
      } `
    );
    if (guessCount > 10) {
      setLoser(true);
    }

    setFeedback([...feedback, message]);
    setMessageOn(true);
    return { correctValue, correctLocation };
  };

  let guessArray = Object.values(userGuesses);
  let finalArray = [];
  for (let i = 0; i < guessArray.length; i++) {
    let obj = guessArray[i];
    finalArray.push(Object.values(obj));
  }
  guessArray.shift();
  finalArray.push(Object.values(userGuess));
  finalArray.shift();

  return (
    <div className='Game'>
      <header className='Game-header'>
        <h4>
          {!winner && !win
            ? `You Have ${11 - guessCount} Attempts Remaining!`
            : ""}
        </h4>
        {randomNumberButton ? (
          <div>
            <button onClick={handleNewGame}>Enter Your Master Guesses!</button>
          </div>
        ) : (
          <div>
            <section className='form-section'>
              <form onSubmit={handleSubmit}>
                <h4>{messageOn ? `${message}` : ""}</h4>
                <label>
                  <div>{inputs}</div>
                  <button onClick={handleSubmit}>✅</button>
                </label>
                {loser ? (
                  <div>
                    <LostGame />
                  </div>
                ) : (
                  ""
                )}
              </form>
            </section>
          </div>
        )}
        <ul>
          {finalArray.length > 1
            ? finalArray.map((guess, i) => {
                let num = i + 1;
                <h1>Previous Guesses</h1>;
                return (
                  <>
                    <li key={`${i}`}>
                      <p>Guess Turn #{num}</p>
                    </li>
                    <li key={`${guess}`}>
                      <p>{`${guess}`}</p>
                    </li>
                  </>
                );
              })
            : ""}
        </ul>
        {userGuesses.length > 0 ? <Feedback {...feedback} /> : ""}
      </header>
    </div>
  );
}

export default Game;
