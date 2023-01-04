//import "./App.css";
import React, { useState } from "react";
import Game from "./Game/Game";
import Toastify, { info } from "./Components/Toastify";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonGroup, Grid, Box } from "@mui/material";

function App() {
  const HARD_MODE_INPUTS = 5;
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isStarted ? (
        <Game numberOfInputs={numberOfInputs} isStarted={isStarted} />
      ) : (
        <>
          <Box
            sx={{
              padding: "10rem",
              boxShadow: "0 8px 8px 0 grey",
              backgroundColor: "pink",
              width: "100%",
            }}
          >
            <Grid
              container
              display='flex'
              direction='column'
              alignItems='center'
              justify='flex-start'
              minWidth='0rem'
            >
              <Typography variant='h2'>Mastermind Game</Typography>

              <Typography variant='h5' marginTop='3em'>
                Difficulty
              </Typography>
              <Grid
                container
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <ButtonGroup size='large' aria-label='large button group'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => setNumberOfInputs(HARD_MODE_INPUTS)}
                      sx={{ width: "100%", margin: "1rem 0", gap: "5px" }}
                    >
                      Hard
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => setNumberOfInputs(MEDIUM_MODE_INPUTS)}
                      sx={{ width: "100%", margin: "1rem 0", gap: "5px" }}
                    >
                      Medium
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => setNumberOfInputs(EASY_MODE_INPUTS)}
                      sx={{ width: "100%", margin: "1rem 0", gap: "1rem" }}
                    >
                      Easy
                    </Button>
                  </ButtonGroup>
                </Grid>

                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1rem",
                    paddingTop: "5rem",
                  }}
                >
                  <Button
                    variant='contained'
                    color='success'
                    size='large'
                    id='play-game'
                    onClick={handleStartGame}
                  >
                    Play!
                  </Button>
                  <Toastify />
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{ color: "#ffffff" }}
                    onClick={handleHelpClick}
                  >
                    Help
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}

export default App;
