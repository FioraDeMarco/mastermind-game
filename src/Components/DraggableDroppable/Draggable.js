import { useDraggable } from "@dnd-kit/core";

function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "item_" + id,
    data: { id },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default Draggable;
