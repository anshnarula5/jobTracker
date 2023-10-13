import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props : any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? '#475577 ' : undefined,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
} 