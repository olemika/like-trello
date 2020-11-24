import React, { useState } from "react";
import Container from "./components/container.jsx";
import Dashboard from "./components/dashboard.jsx";

const allTasks = [
  {
    id: "1251",
    category: "ready",
    title: "Постирать вещи на 60 градусов",
    tags: ["illustration", "design"],
  },
  {
    id: "12125",
    category: "ready",
    title: "Постирать вещи на 60 градусов",
    tags: ["illustration", "design"],
  },
  {
    id: "1qwr",
    category: "ready",
    title: "Постирать вещи на 60 градусов",
    tags: ["illustration", "design"],
  },

  {
    id: "ppvpp25",
    category: "progress",
    title: "Сделать дела",
    tags: ["illustration", "design"],
  },
  {
    id: "ppdiicma",
    category: "done",
    title: "Другое",
    tags: ["illustration", "design"],
  },
];

function App() {
  const [tasks, setTasks] = useState([...allTasks]);

  const addNewTask = (newTask) => {
    console.log(newTask);
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    const newTasks = tasks.map((t) => t.id !== id && t);
    setTasks(newTasks);
  };

  return (
    <div className='App'>
      <Container>
        <Dashboard cards={tasks} addTask={addNewTask} removeTask={removeTask} />
      </Container>
    </div>
  );
}

export default App;
