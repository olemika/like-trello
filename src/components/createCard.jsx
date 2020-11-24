import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import "./createCard.css";

import { ReactComponent as Tag } from "../icons/tag.svg";

export default function CreateCard({ addCard, onTaskAdd, category }) {
  const [newCard, setNewCard] = useState({
    tags: [],
    title: "",
    category: category,
    id: nanoid(),
  });

  const [showCard, setShowCard] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);

  const [tags, setTags] = useState([]);

  const tagInput = useRef();

  function addNewTag(e) {
    e.preventDefault();
    setTags([...tags, tagInput.current.value]);
    tagInput.current.value = "";
    setShowTagInput(false);
  }

  function addNewTask() {
    onTaskAdd({ ...newCard, tags: tags });
    console.log(newCard);
    setTags([]);
    setNewCard({
      tags: [],
      title: "",
      id: nanoid(),
      category: category,
    });
    setShowCard(false);
  }

  return showCard ? (
    <div className='box'>
      <h2 className='create-card-header'>Create new card</h2>
      <textarea
        rows='10'
        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
      ></textarea>

      <div className='tags tags--create'>
        <Tag className='toolbar__tag icon' />
        <div className='tags__list'>
          {tags.length > 0 &&
            tags.map((t, i) => (
              <div key={i} className='tag'>
                {t}
              </div>
            ))}
        </div>
        {!showTagInput ? (
          <button
            className='add-tag-button'
            onClick={() => setShowTagInput(true)}
          >
            +
          </button>
        ) : (
          <form onSubmit={(e) => addNewTag(e)}>
            <label>
              <input ref={tagInput} type='text' />
            </label>
          </form>
        )}
      </div>
      <hr />
      <div className='assign-to'>
        <div className='avatar'></div>
        <div className='name'>Name</div>
      </div>
      <button className='add-task-button' onClick={addNewTask}>
        Done
      </button>
    </div>
  ) : (
    <button className='add-card-button' onClick={() => setShowCard(true)}>
      Добавить карточку
    </button>
  );
}
