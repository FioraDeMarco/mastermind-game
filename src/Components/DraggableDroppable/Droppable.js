import { useDroppable } from "@dnd-kit/core";
import "./DragDrop.css";

function Droppable({ children, ...props }) {
  const { setNodeRef } = useDroppable({
    id: "droppable" + props.id,
  });

  return (
    <div className='drop' ref={setNodeRef} {...props}>
      {children}
    </div>
  );
}

export default Droppable;
