import React, { useEffect, useState, useContext, Suspense } from "react";
import Loader from "./loader";
import { getUser, updateUser } from "../services/user.js";

import "./userProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [NameEditing, setNameEditing] = useState(false);
  const [passEditing, setPassEditing] = useState(false);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      getUser(user).then((u) => {
        setUser(u);
        setNewUser({
          name: u.name,
          password: u.password,
          id: u.user_id,
        });
      });
    }
  }, []);

  const onUpdate = () => {
    setPassEditing(false);
    setNameEditing(false);

    updateUser(newUser).then(() => {
      getUser(user.user_id).then((u) => {
        setUser(u);
        setNewUser({
          name: u.name,
          password: u.password,
          id: u.user_id,
        });
      });
    });

    // const user = localStorage.getItem("user");
  };

  return (
    <section className='section-profile'>
      <h2>Профиль 👨‍💼️</h2>
      {!user ? (
        <Loader />
      ) : (
        <> 
          <p className='current-profile-data'>Логин: {user.login}</p>
          {!NameEditing ? (
            <>
              <p className='current-profile-data'>Имя: {user.name}</p>
              <button className='btn_profile' onClick={() => setNameEditing(true)}>
                Обновить имя
              </button>
            </>
          ) : (
            <>
            <br />
              Введите имя
              <div className='profile-input'>
              <input className='profile-input-scope'
                defaultValue={user.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <button className='btn_done' onClick={onUpdate}>
                Готово
              </button>
              </div>
              <br />

            </>
          )}
          {!passEditing ? (
            <>
              <button className='btn_profile' onClick={() => setPassEditing(true)}>
                Обновить пароль
              </button>
            </>
          ) : (
            <>
              <br />
              Введите новый пароль
              <div className='profile-input'>
              <input className='profile-input-scope'
                type='password'
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <button className='btn_done' onClick={onUpdate}>
                Готово
              </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
