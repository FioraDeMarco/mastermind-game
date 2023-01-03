import React, { useEffect, useState } from "react";
import { LostGame } from "../Components/LostGame/LostGame";
import Feedback from "../Components/Feedback/Feedback";
import { WonGame } from "../Components/WonGame/WonGame";
import "./Game.css";
import Toastify, { NAN, info } from "../Components/Toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Game1.css";
import { checkIputs } from "../utilis/utils";

function Game1({ ...numberOfInputs }) {
  numberOfInputs = Number(Object.values(numberOfInputs));

  const [winner, setWinner] = useState(false);
  const [guessCount, setGuessCount] = useState(1);
  const [randomNumber, setRandomNumber] = useState([]);
  const [win, setWin] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [userGuess, setUserGuess] = useState({});
  const [userGuesses, setUserGuesses] = useState([]);
  const [messageOn, setMessageOn] = useState(false);
  const [loser, setLoser] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [winOpen, setWinOpen] = useState(false);
  const [loseOpen, setLoseOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleNewGame = (e) => {
    e.preventDefault();
    setWin(false);
    setWinOpen(false);
    setLoseOpen(false);
    setMessageOn(false);

    // let tempRandomNumber = [];
    // let index = number;
    // while (index > 0) {
    //   tempRandomNumber.push(Math.floor(Math.random() * 8));
    //   index--;
    // }

    // setRandomNumber(tempRandomNumber);
    setInputValues({});
    setInputValues({});
    setUserGuess({});
    setUserGuesses([]);
    setGuessCount(1);
    setFeedback([]);
  };
  const inputs = [];

  const handleChange = (e) => {
    const value = e.target.value;
    let validInputs = "01234567";
    if (!validInputs.includes(value)) {
      NAN();
    }

    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
    setMessageOn(false);
  };

  for (let i = 1; i <= numberOfInputs; i++) {
    inputs.push(
      <input
        type='text'
        maxLength={1}
        value={inputValues[i]}
        key={`${i}`}
        name={`${i}`}
        onChange={handleChange}
        rules={[{ required: true, message: "You must enter 4 numbers" }]}
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserGuess({ ...inputValues });
    setUserGuesses([...userGuesses, userGuess]);
    setUserGuesses([...userGuesses, userGuess]);
    setFeedback([...feedback, message]);

    setGuessCount(guessCount + 1);

    let inputVal = Object.values(inputValues);
    let inputVals = [];
    for (let i = 0; i < inputVal.length; i++) {
      inputVals.push(parseInt(inputVal[i]));
    }

    const { correctValue, correctLocation } = checkIputs(
      randomNumber,
      inputVals
    );

    if (correctLocation === numberOfInputs && correctValue === numberOfInputs) {
      setWin(true);
      setWinOpen(true);
    }
    if (correctLocation === 0 && correctValue === 0) {
      setMessage("All Incorrect");
    } else {
      setMessage(
        `You have ${correctValue} correct number${
          correctValue !== 1 ? "s" : ""
        } in ${correctLocation} correct location${
          correctLocation !== 1 ? "s" : ""
        } `
      );
    }
    if (guessCount > 9) {
      setLoser(true);
      setLoseOpen(true);
    }
    setMessageOn(true);
    return { correctValue, correctLocation };
    // }
  };
  let guessArray = Object.values(userGuesses);
  let finalArray = [];
  for (let i = 0; i < guessArray.length; i++) {
    let obj = guessArray[i];
    finalArray.push(Object.values(obj));
  }
  finalArray.push(Object.values(userGuess));

  console.log("randomNumber", randomNumber);

  return (
    <div className='Game'>
      <>
        <Toastify />
        <div className='game-container-1'>
          <div className='guess-count-and-inputs'>
            <section className='big-two'>
              <section className='three'>
                <div className='box-1'>
                  <h4>
                    {!winner && !win
                      ? `You Have ${11 - guessCount} Attempts Remaining!`
                      : ""}
                  </h4>
                </div>
              </section>

              <section className='four'>
                <div>
                  <form onSubmit={handleSubmit} disabled={!isValid}>
                    <div>
                      <h4>{messageOn ? `${message}` : ""}</h4>
                    </div>
                    <div className='game-tile-inputs'>
                      <label>
                        <div className='smaller-container'>{inputs}</div>

                        <button onClick={handleSubmit}>✅</button>
                      </label>
                    </div>
                    <div>
                      <button onClick={handleNewGame}>New Game ⏯ </button>
                    </div>
                  </form>
                </div>
              </section>
            </section>
          </div>

          <div className='board-and-feedback'>
            <section className='big-one'>
              <h2>Previous Guesses</h2>
              <section className='one'>
                <div>
                  <div>
                    {finalArray.length > 1
                      ? finalArray.map((guess, i) => {
                          let num = i;

                          if (i === 0) return;
                          return (
                            <>
                              <p>Turn #{num}</p>
                              <div key={`${i}`}></div>
                              <div key={`${guess}`}>
                                <div> Guess: {`${guess}`}</div>
                                <div>
                                  {feedback[i]
                                    ? `Feedback: ${feedback[i]}`
                                    : `${message}`}
                                </div>
                              </div>
                            </>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </section>
              <section className='two'>
                <div>ACTUAL BOARD CAN GO HERE</div>
              </section>
            </section>
          </div>

          {winOpen ? (
            <WonGame
              text='hello'
              closeWin={() => setWinOpen(false)}
              handleNewGame={handleNewGame}
            />
          ) : (
            ""
          )}
          {loseOpen ? (
            <LostGame
              closeLose={() => setLoseOpen(false)}
              handleNewGame={handleNewGame}
            />
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}

export default Game1;
