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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      addNewTag();
    }
  };

  const tagInput = useRef();

  function addNewTag() {
    const value = tagInput.current.value;
    setTags(value);
    setNewCard({ ...newCard, tag: value });
    tagInput.current.value = "";
    setShowTagInput(true);
  }

  function addNewTask(e) {
    e.preventDefault();
    e.stopPropagation();

    crateTask(newCard).then((res) => {
      onUpdate();
    });
    setShowCard(false);
  }

  return showCard ? (
    <div className='box'>
      <form onSubmit={addNewTask}>
        <h2 className='create-card-header'>Добавить задачу</h2>
        <label>
          Название:
          <input
            className='createcard-input'
            type='text'
            required
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          />
        </label>
        <label>
          Описание
          <textarea
            className='createcard-input'
            rows='10'
            onChange={(e) =>
              setNewCard({ ...newCard, description: e.target.value })
            }
            required
          />
        </label>

        <label>
          Дедлайн:
          <input
            className='createcard-input'
            type='date'
            onChange={(e) =>
              setNewCard({ ...newCard, date_to: e.target.value })
            }
            required
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
          <label>
            <input
              className='createcard-input'
              placeholder='Put tag and press Enter'
              ref={tagInput}
              defaultValue={tags}
              onKeyPress={(e) => handleKeyPress(e)}
              type='text'
              autoFocus
              required
            />
          </label>
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
        <button className='add-task-button btn' type='submit'>
          Готово
        </button>
      </form>
    </div>
  ) : (
    <button className='add-card-button btn' onClick={() => setShowCard(true)}>
      + Добавить таск
    </button>
  );
}
