import { useDroppable } from "@dnd-kit/core";

function Droppable({ children, ...props }) {
  // console.log("CHILDREN droppable", children);
  // console.log("Props droppable", props);
  const { setNodeRef } = useDroppable({
    id: "droppable" + props.id,
    // id: "droppable",
  });

  return (
    <div className='drop zone' ref={setNodeRef} {...props}>
      {children}
    </div>
  );
}

export default Droppable;
