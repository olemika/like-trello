import React, { useState, useRef, useEffect } from "react";
import { crateTask } from "../services/task.js";

import "./createCard.css";

export default function CreateCard({ status, users, boardId, onUpdate }) {
  const [newCard, setNewCard] = useState({
    name: "",
    description: "",
    date_to: "",
    status: status,
    user_id: "",
    board_id: boardId,
    tag: "",
  });

  const [showCard, setShowCard] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (users) {
      setNewCard({ ...newCard, user_id: users[0].id });
    }
  }, [users]);

  const tagInput = useRef();

  function addNewTag(e) {
    e.preventDefault();
    const value = tagInput.current.value;
    setTags(value);
    setNewCard({ ...newCard, tag: value });
    tagInput.current.value = "";
    setShowTagInput(true);
  }

  function addNewTask() {
    crateTask(newCard).then((res) => {
      onUpdate();
    });
    setShowCard(false);
  }

  return showCard ? (
    <div className='box'>
      <h2 className='create-card-header'>Добавить задачу</h2>
      <label>
        Название:
        <input
          className='createcard-input'
          type='text'
          onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
        />
      </label>
      <label htmlFor=''>
        Описание
        <textarea
          className='createcard-input'
          rows='10'
          onChange={(e) =>
            setNewCard({ ...newCard, description: e.target.value })
          }
        />
      </label>

      <label>
        Дедлайн:
        <input
          className='createcard-input'
          type='date'
          onChange={(e) => setNewCard({ ...newCard, date_to: e.target.value })}
        />
      </label>

      {showTagInput ? (
        <div className='tags tags--create'>
          <div className='tags__list'>
            {newCard.tag && (
              <div className='tag' onClick={() => setShowTagInput(false)}>
                {newCard.tag}
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => addNewTag(e)}>
          <label>
            <input className='createcard-input' placeholder="Введите тэг" ref={tagInput} defaultValue={tags} type='text' autoFocus />
          </label>
        </form>
      )}

      <hr />

      <div className='assign-to'>
        <label>
          Исполнитель
          {users && (
            <select
              defaultValue={users[0].id}
              onChange={(e) =>
                setNewCard({ ...newCard, user_id: e.target.value })
              }
            >
              {users.map((u) => (
                <option key={u.id} value={`${u.id}`}>
                  {u.name}
                </option>
              ))}
            </select>
          )}
        </label>
      </div>
      <button className='add-task-button btn' onClick={addNewTask}>
        Готово
      </button>
    </div>
  ) : (
    <button className='add-card-button btn' onClick={() => setShowCard(true)}>
      + Добавить таск
    </button>
  );
}
