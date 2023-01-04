import axios from "axios";

export async function generateRandomPegs(pegs, numberOfInputs) {
  let min = 0;
  let max = 7;
  let col = 1;
  let base = 10;
  let format = "plain";
  let rnd = "new";

  try {
    const response = await axios.get(
      `https://www.random.org/integers/?num=${numberOfInputs}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`
    );
    let winningCombo = extractNums(response);
    let pegsForwinningCombo = getPegsForWinningCombo(pegs, winningCombo);
    return pegsForwinningCombo;
  } catch (err) {
    // Random.org has a rate limiter on their RNG endpoint. If we break the limit during testing and
    // our IP gets banned, fall back to generating the RNG locally
    console.log(
      "Error generating number using RNG API. Falling back to local generator.",
      err
    );
    handleNewNumbers(pegs, numberOfInputs);
  }
}

//Back up random number generator
export const handleNewNumbers = (pegs, numberOfInputs) => {
  let tempRandomNumber = [];
  let pegsForwinningCombo = [];

  let index = numberOfInputs;
  while (index > 0) {
    let num = Math.floor(Math.random() * 8);

    tempRandomNumber.push(num);

    pegsForwinningCombo.push(pegs[num]);
    index--;
  }

  return pegsForwinningCombo;
};

function extractNums(response) {
  const { data } = response;
  // Data is returned as a string with new lines, so I had to split on the new lines
  // and remove the last new line to get the numbers, and then convert them into integers.
  let numsStr = data.split("\n");
  numsStr.pop();
  let nums = numsStr.map((numStr) => parseInt(numStr));
  return nums;
}

//This function converts the random number into a random pattern of fruit at that idx
function getPegsForWinningCombo(pegs, winningCombo) {
  let fruits = [];
  winningCombo.map(function (num) {
    let fruit = pegs[num];
    fruits.push(fruit);
  });
  return fruits;
}
