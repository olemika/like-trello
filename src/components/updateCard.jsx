import React, { useState, useRef } from "react";
import { updateTaskContent } from "../services/task.js";

import "./createCard.css";

export default function UpdateCard({
  info,
  users,
  boardId,
  onUpdate,
  onFinish,
}) {
  const [newCard, setNewCard] = useState({
    name: info.task_name,
    description: info.task_description,
    date_to: new Date(info.task_date_to)
      .toLocaleDateString("pt-br")
      .split("/")
      .reverse()
      .join("-"),
    user_id: info.task_user_id,
    board_id: boardId,
    tag: info.tag,
    id: info.task_id,
  });

  const [showCard, setShowCard] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tags, setTags] = useState([]);

  const tagInput = useRef();

  function addNewTag(e) {
    e.preventDefault();
    const value = tagInput.current.value;
    setTags(value);
    setNewCard({ ...newCard, tag: value });
    tagInput.current.value = "";
    setShowTagInput(false);
  }

  function addNewTask() {
    updateTaskContent(newCard).then((res) => {
      onUpdate();
      onFinish();
    });
    setShowCard(false);
  }

  return (
    <>
      <h2 className='create-card-header'>Редактировать</h2>
      <label>
        Название:
        <input
          type='text'
          defaultValue={info.task_name}
          onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
        />
      </label>
      <label htmlFor=''>
        Описание
        <textarea
          rows='10'
          defaultValue={info.task_description}
          onChange={(e) =>
            setNewCard({ ...newCard, description: e.target.value })
          }
        />
      </label>

      <label>
        Дедлайн:
        <input
          type='date'
          defaultValue={new Date(info.task_date_to)
            .toLocaleDateString("pt-br")
            .split("/")
            .reverse()
            .join("-")}
          onChange={(e) =>
            setNewCard({
              ...newCard,
              date_to: new Date(e.target.value)
                .toLocaleDateString("pt-br")
                .split("/")
                .reverse()
                .join("-"),
            })
          }
        />
      </label>

      {!showTagInput ? (
        <div className='tags tags--create'>
          <div className='tags__list'>
            {newCard.tag && (
              <div className='tag' onClick={() => setShowTagInput(true)}>
                {newCard.tag}
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => addNewTag(e)}>
          <label>
            <input
              ref={tagInput}
              defaultValue={newCard.tag}
              type='text'
              autoFocus
            />
          </label>
        </form>
      )}

      <hr />

      <div className='assign-to'>
        <label>
          Исполнитель
          <select
            defaultValue={info.task_user_id}
            onChange={(e) =>
              setNewCard({ ...newCard, user_id: e.target.value })
            }
          >
            {users &&
              users.map((u) => (
                <option key={u.id} value={`${u.id}`}>
                  {u.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <button className='add-task-button btn' onClick={addNewTask}>
        Обновить задачу
      </button>
    </>
  );
}
