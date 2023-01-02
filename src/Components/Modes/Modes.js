// import React, { useState } from "react";
// import Game from "../../Game/Game";
// import Game1 from "../../Game/Game1";
// import "./Modes.css";

// function Modes({ ...number }) {
//   const [classicMode, setClassicMode] = useState(false);
//   const [fruitMode, setFruitMode] = useState(false);

//   return (
//     <div className='mode-container'>
//       <h2>Which Mode would you prefer?</h2>
//       <button
//         visible={!classicMode}
//         onClick={() => {
//           setClassicMode(true);
//         }}
//       >
//         Classic
//       </button>
//       <button
//         onClick={() => {
//           setFruitMode(true);
//         }}
//       >
//         Fruit
//       </button>
//       {classicMode ? <Game1 number={number} /> : ""}
//       {fruitMode ? <Game number={number} /> : ""}
//     </div>
//   );
// }

// export default Modes;
