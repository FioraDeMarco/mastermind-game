import { info } from "../Components/Toastify";

// function to check correctness of user guess input

export const checkUserInputs = (randomFruit, droppedItems) => {
  let correctLocation = 0;
  let correctValue = 0;

  let randomFruitCopy = randomFruit.slice();
  let droppedItemsCopy = droppedItems.slice();

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
    // let foundIdx = randomFruitCopy[input[i]];
    if (foundIdx > -1) {
      correctValue++;
      randomFruitCopy[foundIdx] = null;
    }
  });

  return { correctValue, correctLocation };
};

export const checkWinCondition = (
  correctValue,
  correctLocation,
  numberOfInputs
) => {
  if (correctLocation === numberOfInputs && correctValue === numberOfInputs) {
    return true;
  }
  return false;
};

export const updateUserFeedback = (correctValue, correctLocation) => {
  if (correctLocation === 0 && correctValue === 0) {
    return "All Incorrect";
  } else {
    return `You have ${correctValue} correct fruit${
      correctValue !== 1 ? "s" : ""
    } in ${correctLocation} correct location${
      correctLocation !== 1 ? "s!" : "!"
    } `;
  }
};

export const checkLoseCondition = (guessCount) => {
  if (guessCount > 9) {
    return true;
  }
  return false;
};

export const handleHelpClick = () => {
  info();
};
