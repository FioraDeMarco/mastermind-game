import Droppable from "./Droppable";
import { useDroppable } from "@dnd-kit/core";

function MultipleDroppable({ numberOfInputs, children, ...props }) {
  let droppables = [];
  for (let num = 1; num <= numberOfInputs; num++) {
    droppables.push(num.toString());
  }

  const { setNodeRef } = useDroppable({
    // id: "droppable" + props.id,
    id: "droppable" + props.id,
  });

  return (
    <section className='drop zone' {...props} ref={setNodeRef}>
      {droppables.map((id, i) => (
        <Droppable id={id} key={id}>
          {children[i]}
        </Droppable>
      ))}
    </section>
  );
}
export default MultipleDroppable;
