import { forwardRef } from "react";
import "./DragDrop.css";

const Item = forwardRef(({ children, ...props }, ref) => {
  props.className = props.className ? props.className + "item" : "item";
  console.log("props", props.className);
  return (
    <div ref={ref} className='peg'>
      <div {...props}>{children}</div>
    </div>
  );
});

export default Item;
