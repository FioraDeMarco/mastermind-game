import React, { useEffect, useState } from "react";
import { LostGame } from "../Components/LostGame/LostGame";
import { WonGame } from "../Components/WonGame/WonGame";
import "./Game.css";
import Toastify from "../Components/Toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Draggable from "../Components/DraggableDroppable/Draggable";
import MultipleDroppable from "../Components/DraggableDroppable/MultipleDroppable";
import Button from "@mui/material/Button";
import Item from "../Components/DraggableDroppable/Item";
import {
  checkLoseCondition,
  updateUserFeedback,
  checkUserInputs,
  handleHelpClick,
  checkWinCondition,
} from "../utilis/utils";
import {
  generateRandomPegs,
  handleNewNumbers,
} from "../utilis/RandomNumberGeneration";

function Game({ isStarted, ...numberOfInputs }) {
  numberOfInputs = Number(Object.values(numberOfInputs));

  const [guessCount, setGuessCount] = useState(1);
  const [userGuesses, setUserGuesses] = useState([]);
  const [messageOn, setMessageOn] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [winOpen, setWinOpen] = useState(false);
  const [loseOpen, setLoseOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [randomFruit, setRandomFruit] = useState([]);

  const pegs = ["🍎", "🍌", "🍊", "🍇", "🍓", "🍍", "🥥", "🥝"];

  const setStateForNewGame = () => {
    setWinOpen(false);
    setLoseOpen(false);
    setMessageOn(false);
    setDroppedItems([]);
    setFeedback([]);
    getPegs();
  };

  const handleNewGame = (e) => {
    e.preventDefault();
    setStateForNewGame();
  };

  useEffect(() => {
    setStateForNewGame();
  }, []);

  const getPegs = async () => {
    let randomPegs = await generateRandomPegs(pegs, numberOfInputs);
    if (!randomPegs) {
      randomPegs = handleNewNumbers(pegs, numberOfInputs);
    }
    setRandomFruit(randomPegs);
  };

  const validate = () => {
    return droppedItems.length !== numberOfInputs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserGuesses([...userGuesses, droppedItems]);

    const { correctValue, correctLocation } = checkUserInputs(
      randomFruit,
      droppedItems
    );

    setMessage(updateUserFeedback(correctValue, correctLocation));

    setFeedback([...feedback, message]);

    setGuessCount(guessCount + 1);

    setWinOpen(
      checkWinCondition(correctValue, correctLocation, numberOfInputs)
    );
    setMessageOn(true);
    setLoseOpen(checkLoseCondition(guessCount));
    setDroppedItems([]);
    handleNewGame();
  };

  function handleDragStart(event) {
    setActiveId(event.active.data.current.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    let isOver = event.over.id.toString().includes("droppable");
    if (over && isOver) {
      const newItem = pegs[active.data.current.id];
      setDroppedItems([...droppedItems, newItem]);
    }
  }

  return (
    <div className='game'>
      <>
        <Toastify />
        <div className='game-container-1'>
          <div className='dnd'>
            <section className='guess-counts'>
              <h4>
                {!winOpen && !loseOpen
                  ? `You Have ${11 - guessCount} Attempt${
                      11 - guessCount !== 1 ? "s" : ""
                    } Remaining!`
                  : ""}
              </h4>
            </section>

            <section>
              <div className='game-buttons'>
                <section className='game-controls'>
                  <div>
                    <Button
                      variant='contained'
                      sx={{ borderRadius: 50 }}
                      color='success'
                      onClick={handleNewGame}
                    >
                      New Game ⏯{" "}
                    </Button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <label>
                      <Button
                        variant='contained'
                        sx={{ borderRadius: 50 }}
                        color='secondary'
                        onClick={handleSubmit}
                        disabled={validate()}
                      >
                        ✅
                      </Button>
                    </label>
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
                    color='secondary'
                    id='help'
                    onClick={handleHelpClick}
                  >
                    Help
                  </Button>
                </section>
              </div>
            </section>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className='drag'>
                {pegs.map((item, index) => (
                  <Draggable key={index} id={index}>
                    <Item>{item}</Item>
                  </Draggable>
                ))}
              </div>

              <MultipleDroppable
                className='drag'
                numberOfInputs={numberOfInputs}
              >
                {droppedItems.map((item, index) => (
                  <Item key={index}>{item}</Item>
                ))}
              </MultipleDroppable>

              <DragOverlay dropAnimation={null}>
                {activeId !== null ? (
                  <Item className='active'>{pegs[activeId]}</Item>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          <section>
            <div id='message'>
              <h4>{messageOn ? `${message}` : ""}</h4>
            </div>
          </section>

          <section className='feedback'>
            <h2>Previous Guesses</h2>
            {feedback.length
              ? userGuesses.map((guess, i) => {
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
