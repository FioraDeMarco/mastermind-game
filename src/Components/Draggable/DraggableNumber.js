// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const Numbers = styled.div`
//   width: 200px;
//   border: 1px solid orange;
//   margin-bottom: 10px;
//   background-color: lightgrey;
//   padding: 10px;
//   display: flex;
// `;
// const number = [0, 1, 2, 3, 4, 5, 6, 7];
// function DraggableNumber({}) {
//   console.log("NUMBER DRAGGABLENUMBER", number);
//   return (
//     <div>
//       {number.map((num, i) => {
//         <Draggable draggableId='num' index={i}>
//           {(provided, snapshot) => (
//             <div
//               ref={provided.innerRef}
//               {...provided.draggableProps}
//               {...provided.dragHandleProps}
//               num={num}
//             >
//               <h2>Numbers</h2>
//               {/* {num} */}
//             </div>
//           )}
//         </Draggable>;
//       })}
//     </div>
//   );
// }
// export default DraggableNumber;
