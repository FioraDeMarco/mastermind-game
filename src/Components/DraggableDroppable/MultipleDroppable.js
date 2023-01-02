import Droppable from "./Droppable";
import { useDroppable } from "@dnd-kit/core";

// for (let i = 1; i <= number; i++) {
//   inputs.push(
//     <input
//       type='text'

function MultipleDroppable({ number, children, ...props }) {
  //   console.log("children1".children);
  //   console.log("props", props);

  // const droppables = ["1", "2", "3", "4"];
  // const mediumDroppables = ["1", "2", "3", "4"];
  // const hardDdroppables = ["1", "2", "3", "4"];

  let droppables = [];
  for (let num = 1; num <= number; num++) {
    droppables.push(num.toString());
  }
  // console.log("MULTIPLE DROPPABLE NUMBER", number);
  // console.log("DROPPABLES", droppables);

  const { setNodeRef } = useDroppable({
    // id: "droppable" + props.id,
    id: "droppable" + props.id,
  });
  //   console.log("over.id", over.id);

  return (
    <section className='drop zone' {...props} ref={setNodeRef}>
      {droppables.map((id, i) => (
        <Droppable id={id} key={id}>
          {/* {children[i]} */}
          {children[i]}
        </Droppable>
      ))}
    </section>
  );
  //   console.log("PROPS", props);
  //   const { setNodeRef: setFirstDroppableRef } = useDroppable({
  //     id: "droppable-1",
  //   });
  //   const { setNodeRef: setsecondDroppableRef } = useDroppable({
  //     id: "droppable-2",
  //   });
  //   const { setNodeRef: setThirdDroppableRef } = useDroppable({
  //     id: "droppable-3",
  //   });
  //   const { setNodeRef: setFourthDroppableRef } = useDroppable({
  //     id: "droppable-4",
  //   });

  //   return (
  //     <section className='drop zone'>
  //       <Droppable ref={setFirstDroppableRef} {...props}>
  //         {children[0]}
  //       </Droppable>
  //       <Droppable ref={setsecondDroppableRef} {...props}>
  //         {children[1]}
  //       </Droppable>
  //       <Droppable ref={setThirdDroppableRef} {...props}>
  //         {children[2]}
  //       </Droppable>
  //       <Droppable ref={setFourthDroppableRef} {...props}>
  //         {children[3]}
  //       </Droppable>
  //     </section>
  //   );
}
export default MultipleDroppable;
