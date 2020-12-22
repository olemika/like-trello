import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Tags from "./tags";
import { removeTask } from "../services/task.js";
import styled from "styled-components";
import UpdateCard from "./updateCard";

import "./card.css";

const StyledCard = styled.div`
  background: ${(props) =>
    props.isDragging ? "#f7e2ff;" : "rgba(255, 255, 255, 0.7)"};
`;

export default function Card({ info, index, onUpdate, users }) {
  const {
    tag,
    task_name,
    task_description,
    task_id,
    date_to,
    task_user_name,
  } = info;

  const [isEditing, setIsEditing] = useState(false);

  const onTaskRemove = () => {
    removeTask({ id: task_id }).then(() => {
      onUpdate();
    });
  };

  return (
    <Draggable draggableId={task_id.toString()} index={index}>
      {(provided, snapshot) => (
        <StyledCard
          className='box item'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {isEditing ? (
            <UpdateCard
              info={info}
              users={users}
              onUpdate={onUpdate}
              onFinish={() => setIsEditing(false)}
            />
          ) : (
            <>
              <Tags tag={tag} />
              <h3 className='cardnametask'>{task_name}</h3>
              <p className='box__text'>{task_description}</p>
              <div className='toolbar'>
                <p className='card_p'>👨‍💼️{task_user_name}</p>
                <p className='card_p'>
                  📅🏁:{" "}
                  {new Date(date_to)
                    .toLocaleString()
                    .slice(0, 10)
                    .replace(/-/g, ".")}
                </p>
              </div>
              <div className='remove-card' onClick={onTaskRemove}>
                x
              </div>
              <div className='card-edit-b' onClick={() => setIsEditing(true)}>
                ✏️
              </div>
            </>
          )}

          {provided.placeholder}
        </StyledCard>
      )}
    </Draggable>
  );
}
