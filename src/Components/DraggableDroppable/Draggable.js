import { useDraggable } from "@dnd-kit/core";
import "./DragDrop.css";

function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "item_" + id,
    data: { id },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className='drag-item'>
      {children}
    </div>
  );
}

export default Draggable;
