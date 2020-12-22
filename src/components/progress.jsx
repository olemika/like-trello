import React, { useState, useEffect } from "react";
import { getAllUsers } from "../services/user.js";
import { addBoardUser, removeBoardUser } from "../services/boards.js";

import "./progress.css";

export default function Progress({ users, boardId, onUpdate }) {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [toggle, setToggle] = useState();

  const getUsers = () => {
    getAllUsers().then((u) => {
      setAllUsers(u.users);
      setCurrentUser(u.users[0].id);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onAddUser = (e) => {
    e.preventDefault();
    addBoardUser(currentUser, boardId).then((res) => {
      onUpdate();
    });
  };

  const onRemoveUser = (id) => {
    removeBoardUser(id, boardId).then((res) => {
      onUpdate();
    });
  };

  return (
    <div className={toggle ? "progress progress--show" : "progress"}>
      <h2>Настройки доски</h2>
      {users && (
        <>
          <p>Доска доступна пользователям:</p>
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                <button className='button' onClick={() => onRemoveUser(u.id)}>
                  🗑️
                </button>
                {u.name}
              </li>
            ))}
          </ul>
        </>
      )}
      <form className='form-progress' onSubmit={(e) => onAddUser(e)}>
        <label>
          Добавить пользователя:
          <br />
          <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
          >
            {allUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
        <button className='Addbtn'>+</button>
      </form>
      <button
        className='progress__toggle'
        onClick={() => setToggle(!toggle)}
      ></button>
    </div>
  );
}
