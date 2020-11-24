import React from "react";
import Card from "./card";
import CreateCard from "./createCard.jsx";
import "./dashboard.css";

export default function Dashboard({ cards, addTask, removeTask }) {
  return (
    <div className='grid'>
      <div className='category ready'>
        Task Ready
        {cards.map((card) =>
          card.category === "ready" ? (
            <Card key={card.id} info={card} onCardDelete={removeTask} />
          ) : null
        )}
        <CreateCard onTaskAdd={addTask} category='ready' />
      </div>

      <div className='category progress'>
        On Progress
        {cards.map((card) =>
          card.category === "progress" ? (
            <Card key={card.id} info={card} onCardDelete={removeTask} />
          ) : null
        )}
        <CreateCard onTaskAdd={addTask} category='progress' />
      </div>

      <div className='category review'>
        Needs Review
        {cards.map((card) =>
          card.category === "review" ? (
            <Card key={card.id} info={card} onCardDelete={removeTask} />
          ) : null
        )}
        <CreateCard onTaskAdd={addTask} category='review' />
      </div>

      <div className='category done'>
        Done
        {cards.map((card) =>
          card.category === "done" ? (
            <Card key={card.id} info={card} onCardDelete={removeTask} />
          ) : null
        )}
        <CreateCard onTaskAdd={addTask} category='done' />
      </div>
    </div>
  );
}
