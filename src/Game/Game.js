import React, { useEffect, useState } from "react";
import { LostGame } from "../Components/LostGame/LostGame";
import Feedback from "../Components/Feedback/Feedback";
import { WonGame } from "../Components/WonGame/WonGame";
import "./Game.css";
import Toastify, { NAN } from "../Components/Toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Draggable from "../Components/DraggableDroppable/Draggable";
import Droppable from "../Components/DraggableDroppable/Droppable";
import MultipleDroppable from "../Components/DraggableDroppable/MultipleDroppable";
import Item from "../Components/DraggableDroppable/Item";
import Game1 from "./Game1";
import { checkIputs } from "../utilis/utils";

function Game({ fruitMode, classicMode, ...number }) {
  const [winner, setWinner] = useState(false);
  const [guessCount, setGuessCount] = useState(1);
  const [randomNumber, setRandomNumber] = useState([]);
  const [win, setWin] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [userGuess, setUserGuess] = useState([]);
  const [userGuesses, setUserGuesses] = useState([]);
  const [messageOn, setMessageOn] = useState(false);
  const [loser, setLoser] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [winOpen, setWinOpen] = useState(false);
  const [loseOpen, setLoseOpen] = useState(false);
  number = Number(Object.values(number));
  const [isValid, setIsValid] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [randomFruit, setRandomFruit] = useState([]);
  const [guessHistory, setGuessHistory] = useState([]);

  const items = ["🍎", "🍌", "🍊", "🍇", "🍓", "🍍", "🥥", "🥝"];

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

  if (classicMode) {
    return <Game1 number={number} />;
  }

  const handleNewGame = (e) => {
    e.preventDefault();
    setWin(false);
    setWinOpen(false);
    setLoseOpen(false);
    setMessageOn(false);

    let tempRandomNumber = [];
    let tempFruit = [];

    let index = number;
    while (index > 0) {
      let num = Math.floor(Math.random() * 8);

      tempRandomNumber.push(num);

      tempFruit.push(Object.values(fruitsNumbers[num]).toString());
      index--;
    }
    console.log("tempFruit", tempFruit);

    setRandomNumber(tempRandomNumber);
    setRandomFruit(tempFruit);
    setDroppedItems([]);
    setUserGuesses([]);
    setUserGuess([]);
    setGuessCount(1);
    setFeedback([]);
  };

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

    if (correctLocation === number && correctValue === number) {
      setWin(true);
      setWinOpen(true);
      setGuessHistory([...guessHistory, userGuesses]);
      console.log("win guess history", guessHistory);
    }
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
    if (guessCount > 9) {
      setLoser(true);
      setLoseOpen(true);
      setGuessHistory([...guessHistory, userGuesses]);
      console.log("loose guess history", guessHistory);
    }
    setDroppedItems([]);
    setUserGuess([]);

    setMessageOn(true);
  };

  let guessArray = Object.values(userGuesses);
  let finalArray = [];
  for (let i = 0; i < guessArray.length; i++) {
    let obj = guessArray[i];
    finalArray.push(Object.values(obj));
  }
  finalArray.push(Object.values(userGuess));

  console.log("randomFruit", randomFruit);
  console.log("droppedItems", droppedItems, typeof droppedItems);

  return (
    <div className='Game'>
      <>
        <Toastify />
        <div className='game-container-1'>
          <div className='container'>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className='drag zone'>
                {items.map((item, index) => (
                  <Draggable key={index} id={index}>
                    <Item>{item}</Item>
                  </Draggable>
                ))}
              </div>

              <MultipleDroppable className='drop zone' number={number}>
                {droppedItems.map((item, index) => (
                  <Item key={index}>{item}</Item>
                ))}
              </MultipleDroppable>

              <DragOverlay dropAnimation={null}>
                {activeId !== null ? (
                  <Item className='active'>{items[activeId]}</Item>
                ) : null}
              </DragOverlay>
            </DndContext>
            <section className='four'>
              <section>
                <div className='box-1'>
                  <h4>
                    {!winner && !win
                      ? `You Have ${11 - guessCount} Attempt${
                          11 - guessCount !== 1 ? "s" : ""
                        } Remaining!`
                      : ""}
                  </h4>
                </div>
              </section>
              <div>
                <div>
                  <button onClick={handleNewGame}>New Game ⏯ </button>
                </div>

                <form onSubmit={handleSubmit} disabled={!isValid}>
                  <div>
                    <h4>{messageOn ? `${message}` : ""}</h4>
                  </div>
                  <div className='game-tile-inputs'>
                    <label>
                      <button onClick={handleSubmit}>✅</button>
                    </label>
                    <button onClick={() => setDroppedItems([])}>
                      Reset 🔄
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>

          <div className='board-and-feedback'>
            <section className='big-one'>
              <h2>Previous Guesses</h2>
              <section className='one'>
                {feedback.length
                  ? userGuesses.map((guess, i) => {
                      let num = i + 1;

                      return (
                        <ul>
                          <li className='list'>
                            Turn #{num}: <span key={`${i}`}>{guess}</span>
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
}
export default Game;
