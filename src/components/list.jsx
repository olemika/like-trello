import React from "react";
import Card from "./card";
import CreateCard from "./createCard";
import { Droppable } from "react-beautiful-dnd";

import "./list.css";

export default function List(props) {
  return (
    <Droppable droppableId={props.list.id.toString()}>
      {(provided, snapshot) => (
        <div
          className='category'
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className='category__title'>{props.list.name}</h2>
          {props.tasks.map((card, ndx) => (
            <Card
              info={card}
              key={card.task_id}
              index={ndx}
              users={props.users}
              onUpdate={props.onUpdate}
            />
          ))}
          {provided.placeholder}
          <CreateCard
            status={props.list.id}
            users={props.users}
            boardId={props.boardId}
            onUpdate={props.onUpdate}
          />
        </div>
      )}
    </Droppable>
  );
}

//
