import React, { useEffect, useState } from "react";
import { LostGame } from "../Components/LostGame/LostGame";
import Feedback from "../Components/Feedback/Feedback";
import { WonGame } from "../Components/WonGame/WonGame";
import "./Game.css";
import Toastify, { NAN } from "../Components/Toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Draggable from "../Components/DraggableDroppable/Draggable";
import MultipleDroppable from "../Components/DraggableDroppable/MultipleDroppable";
import Button from "@mui/material/Button";
import Item from "../Components/DraggableDroppable/Item";
import { checkIputs, handleHelpClick } from "../utilis/utils";
import axios from "axios";

function Game({ isStarted, ...numberOfInputs }) {
  numberOfInputs = Number(Object.values(numberOfInputs));

  const [guessCount, setGuessCount] = useState(1);
  const [randomNumber, setRandomNumber] = useState([]);
  const [userGuess, setUserGuess] = useState([]);
  const [userGuesses, setUserGuesses] = useState([]);
  const [messageOn, setMessageOn] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [winOpen, setWinOpen] = useState(false);
  const [loseOpen, setLoseOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [randomFruit, setRandomFruit] = useState([]);
  const [guessHistory, setGuessHistory] = useState([]);
  const [fruits, setFruits] = useState([]);

  const handleNewGame = (e) => {
    e.preventDefault();
    // setWin(false);
    // setRandomNumber(tempRandomNumber);
    // setRandomFruit(fruits);
    // handleNewNumbers();

    setWinOpen(false);
    setLoseOpen(false);
    setMessageOn(false);
    setRandomNumAndFruits(numberOfInputs);

    setDroppedItems([]);
    setUserGuesses([]);
    setUserGuess([]);
    setGuessCount(1);
    setFeedback([]);
  };

  useEffect(() => {
    // call api or anything
    console.log("loaded");
    setWinOpen(false);
    setLoseOpen(false);
    setMessageOn(false);
    setRandomNumAndFruits(numberOfInputs);

    setDroppedItems([]);
    setUserGuesses([]);
    setUserGuess([]);
    setGuessCount(1);
    setFeedback([]);
  }, []);

  const validate = () => {
    return droppedItems.length !== numberOfInputs;
  };

  //TODO: Rename to `pegs`
  const items = ["🍎", "🍌", "🍊", "🍇", "🍓", "🍍", "🥥", "🥝"];

  function setRandomNumAndFruits(num) {
    // Make API CALL
    // const randomPegs = generateRandomPegs(num);
    // setRandomNumber(randomPegs);
    // API Call returns result/random numbers
    // Call useState using the results

    //OLD
    generateRandomPegs(num);
  }

  //TODO: Move to RandomNumberGeneration.js
  function generateRandomPegs(num) {
    let min = 0;
    let max = 7;
    let col = 1;
    let base = 10;
    let format = "plain";
    let rnd = "new";

    axios
      .get(
        `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`
      )
      .then((response) => {
        let winningCombo = extractNums(response);
        setRandomNumber(extractNums(response));

        let fruits = getFruitsForWinningCombo(winningCombo);
        setRandomFruit(fruits);
      })
      .catch((err) => {
        // Random.org has a rate limiter on their RNG endpoint. If we break the limit during testing and
        // our IP gets banned, fall back to generating the RNG locally
        console.log(
          "Error generating number using RNG API. Falling back to local generator.",
          err
        );
        handleNewNumbers();
      });
  }

  //TODO: Move to RandomNumberGeneration.js
  const handleNewNumbers = () => {
    let tempRandomNumber = [];
    let tempFruit = [];

    let index = numberOfInputs;
    while (index > 0) {
      let num = Math.floor(Math.random() * 8);

      tempRandomNumber.push(num);

      tempFruit.push(items[num]);
      index--;
    }
    setRandomFruit(tempFruit);
  };

  function extractNums(response) {
    const { data } = response;
    // Data is returned as a string with new lines, so split on the new lines
    // and remove the last new line to get the numbers, and then convert them into integers.
    let numsStr = data.split("\n");
    numsStr.pop();
    let nums = numsStr.map((numStr) => parseInt(numStr));
    return nums;
  }

  function getFruitsForWinningCombo(winningCombo) {
    let fruits = [];
    winningCombo.map(function (num) {
      let fruit = items[num];
      fruits.push(fruit);
    });
    return fruits;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserGuess([...droppedItems]);
    setUserGuesses([...userGuesses, droppedItems]);
    setFeedback([...feedback, message]);
    setGuessCount(guessCount + 1);

    const { correctValue, correctLocation } = checkIputs(
      randomFruit,
      droppedItems
    );

    // Refactor out to checkGuessCorrectness()
    if (correctLocation === numberOfInputs && correctValue === numberOfInputs) {
      setWinOpen(true);
      setGuessHistory([...guessHistory, userGuesses]);
      console.log("win guess history", guessHistory);
    }

    // Refactor out to updateUserFeedback()
    if (correctLocation === 0 && correctValue === 0) {
      setMessage("All Incorrect");
    } else {
      setMessage(
        `You have ${correctValue} correct fruit${
          correctValue !== 1 ? "s" : ""
        } and ${correctLocation} correct location${
          correctLocation !== 1 ? "s" : ""
        } `
      );
    }

    // Refactor out to checkLoseCondition()
    if (guessCount > 9) {
      setLoseOpen(true);
      setGuessHistory([...guessHistory, userGuesses]);
      console.log("loose guess history", guessHistory);
    }

    setDroppedItems([]);
    setUserGuess([]);
    setMessageOn(true);
  };

  function handleDragStart(event) {
    console.log("handleDragStart event", event);
    setActiveId(event.active.data.current.id);
  }

  function handleDragEnd(event) {
    console.log("hello?");
    const { active, over } = event;
    console.log("active", active, "over", over, "event", event);

    let isOver = event.over.id.toString().includes("droppable");

    if (over && isOver) {
      const newItem = items[active.data.current.id];

      setDroppedItems([...droppedItems, newItem]);
    }
  }

  // TODO: Remember to remove
  console.log("randomFruit", randomFruit);
  console.log("droppedItems", droppedItems, typeof droppedItems);

  return (
    <div className='Game'>
      <>
        <Toastify />
        <div className='game-container-1'>
          <div className='container'>
            <section>
              <div id='message' className='box-1'>
                <h4>
                  {!winOpen && !loseOpen
                    ? `You Have ${11 - guessCount} Attempt${
                        11 - guessCount !== 1 ? "s" : ""
                      } Remaining!`
                    : ""}
                </h4>
              </div>
            </section>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className='zone'>
                {items.map((item, index) => (
                  <Draggable key={index} id={index}>
                    <Item>{item}</Item>
                  </Draggable>
                ))}
              </div>

              <MultipleDroppable
                className='droppable-container'
                numberOfInputs={numberOfInputs}
              >
                {droppedItems.map((item, index) => (
                  <Item key={index} className='droppable-card'>
                    {item}
                  </Item>
                ))}
              </MultipleDroppable>

              <DragOverlay dropAnimation={null}>
                {activeId !== null ? (
                  <Item className='active'>{items[activeId]}</Item>
                ) : null}
              </DragOverlay>
            </DndContext>
            <div id='message'>
              <h4>{messageOn ? `${message}` : ""}</h4>
            </div>
            <section className='four'>
              <div>
                <Button
                  variant='contained'
                  sx={{ borderRadius: 50 }}
                  color='primary'
                  onClick={handleNewGame}
                >
                  New Game ⏯{" "}
                </Button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* <div>
                    <h4>{messageOn ? `${message}` : ""}</h4>
                  </div> */}
                <div className='game-tile-inputs'>
                  <label>
                    <Button
                      variant='contained'
                      sx={{ borderRadius: 50 }}
                      color='success'
                      onClick={handleSubmit}
                      disabled={validate()}
                    >
                      ✅
                    </Button>
                  </label>
                </div>
              </form>
              <Button
                variant='contained'
                sx={{ borderRadius: 50 }}
                color='success'
                onClick={() => setDroppedItems([])}
              >
                Reset 🔄
              </Button>

              <Button
                variant='contained'
                sx={{ borderRadius: 50 }}
                color='success'
                id='help'
                onClick={handleHelpClick}
              >
                Help
              </Button>
            </section>
          </div>

          <div className='board-and-feedback'>
            <section className='big-one'>
              <h2>Previous Guesses</h2>
              <section className='one'>
                {feedback.length
                  ? userGuesses.reverse().map((guess, i) => {
                      let num = i + 1;

                      return (
                        <ul key={`${i}`}>
                          <li className='list'>
                            Turn #{num}: <span>{guess}</span>
                            <span>
                              <br />
                              {feedback[num] ? (
                                <span>Feedback: {feedback[num]}</span>
                              ) : (
                                `${message}`
                              )}
                            </span>
                          </li>
                        </ul>
                      );
                    })
                  : ""}
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
export default Game;
