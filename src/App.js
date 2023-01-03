import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";
import Toastify, { info } from "./Components/Toastify";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#757ce8",
//       main: "#3f50b5",
//       dark: "#002884",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#ff7961",
//       main: "#f44336",
//       dark: "#ba000d",
//       contrastText: "#000",
//     },
//   },
// });

function App() {
  const HARD_MODE_INPUTS = 7;
  const MEDIUM_MODE_INPUTS = 4;
  const EASY_MODE_INPUTS = 3;

  const [isStarted, setIsStarted] = useState(false);
  const [numberOfInputs, setNumberOfInputs] = useState(MEDIUM_MODE_INPUTS);

  const handleHelpClick = () => {
    info();
  };

  const handleStartGame = () => {
    setIsStarted(true);
  };

  return (
    <div className='all'>
      <header className='App-header'>
        <h1>Mastermind Game</h1>
      </header>
      {isStarted ? (
        <Game numberOfInputs={numberOfInputs} isStarted={isStarted} />
      ) : (
        <>
          <div className='display'>
            <section className='learn'>
              <div className='dropdown'>
                <Toastify />
                <Button
                  variant='contained'
                  color='primary'
                  id='help'
                  onClick={handleHelpClick}
                >
                  Help
                </Button>
              </div>

              <div>
                <h2>Difficulty</h2>
                <Button
                  variant='contained'
                  sx={{ borderRadius: 50 }}
                  color='success'
                  onClick={() => setNumberOfInputs(HARD_MODE_INPUTS)}
                >
                  Hard
                </Button>
                <Button
                  variant='contained'
                  sx={{ borderRadius: 50 }}
                  color='success'
                  onClick={() => setNumberOfInputs(MEDIUM_MODE_INPUTS)}
                >
                  Medium
                </Button>
                <Button
                  variant='contained'
                  sx={{ borderRadius: 50 }}
                  color='success'
                  onClick={() => setNumberOfInputs(EASY_MODE_INPUTS)}
                >
                  Easy
                </Button>
              </div>

              <div className='dropdown'>
                <Button
                  variant='contained'
                  sx={{ borderRadius: 50 }}
                  color='success'
                  size='large'
                  id='play-game'
                  onClick={handleStartGame}
                >
                  Play!
                </Button>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
