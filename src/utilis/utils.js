import Toastify, { NAN, info } from "../Components/Toastify";

export const checkIputs = (randomData, inputValues) => {
  let correctLocation = 0;
  let correctValue = 0;

  let randomFruitCopy = randomData.slice();
  let droppedItemsCopy = inputValues.slice();

  randomFruitCopy.forEach((fruit, i) => {
    if (droppedItemsCopy[i] === fruit) {
      correctLocation++;
      correctValue++;
      droppedItemsCopy[i] = randomFruitCopy[i] = null;
    }
  });

  droppedItemsCopy.forEach((input, i) => {
    if (input === null) return;
    let foundIdx = randomFruitCopy.indexOf(input);
    if (foundIdx > -1) {
      correctValue++;
      randomFruitCopy[foundIdx] = null;
    }
  });

  return { correctValue, correctLocation };
};

export const handleHelpClick = () => {
  info();
};

// export const handleNewGame = (e, setWin, setWinOpen,setLoseOpen) => {
//   e.preventDefault();
//   setWin(false);
//   setWinOpen(false);
//   setLoseOpen(false);
//   setMessageOn(false);
//   setRandomNumAndFruits(number);

//   // setRandomNumber(tempRandomNumber);
//   // setRandomFruit(tempFruit);
//   setDroppedItems([]);
//   setUserGuesses([]);
//   setUserGuess([]);
//   setGuessCount(1);
//   setFeedback([]);
// };
