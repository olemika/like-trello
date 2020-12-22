import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Progress from "./progress";
import List from "./list";
import { DragDropContext } from "react-beautiful-dnd";

import { getOneBoard } from "../services/boards.js";
import { updateTaskStatus } from "../services/task.js";
import { getBoardUsers } from "../services/boards.js";

import "./dashboard.css";

export default function Dashboard() {
  const [myTasks, setMyTasks] = useState();
  const [users, setUsers] = useState();

  const { id } = useParams();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    getOneBoard(id).then((b) => {
      setMyTasks(b);
    });
    getBoardUsers(id)
      .then((u) => u.json())
      .then((u) => setUsers(u));
  };

  const onDrugEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const newStatus = myTasks.statuses[destination.droppableId - 1];

    updateTaskStatus(newStatus.id, draggableId)
      .then(() => getOneBoard(id))
      .then((b) => setMyTasks(b));
  };

  return (
    <>
      <div className='dashboard-wrapper'>
        <DragDropContext onDragEnd={onDrugEnd}>
          {myTasks &&
            myTasks.statuses.map((status) => {
              const tasks = myTasks.tasks.filter(
                (t) => t.task_status === status.id
              );
              return (
                <List
                  key={status.id}
                  tasks={tasks}
                  list={status}
                  users={users}
                  boardId={id}
                  onUpdate={getTasks}
                />
              );
            })}
        </DragDropContext>
      </div>

      <Progress boardId={id} users={users} onUpdate={getTasks} />
    </>
  );
}
