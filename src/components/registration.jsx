import React, { useState } from "react";
import { Redirect } from "react-router";
import { registerUser } from "../services/user.js";

import "./registration.css";

function Registration(props) {
  const [formData, setFormData] = useState({
    login: "",
    name: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const sendForm = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setRedirect(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='login-form'>
      <div className='login-form__inner'>
        <h2>Регистрация</h2>
        <form onSubmit={sendForm}>
          <input
            className='login-form__input'
            type='text'
            name='login'
            placeholder='login'
            onChange={handleInputChange}
            required
          />
          <input
            className='login-form__input'
            type='text'
            name='name'
            placeholder='name'
            onChange={handleInputChange}
            required
          />
          <input
            className='login-form__input'
            type='password'
            name='password'
            placeholder='password'
            onChange={handleInputChange}
            required
          />
          <input
            className='login-form__submit'
            type='submit'
            value='Create account'
          />
        </form>

        {redirect ? <Redirect to='/boards' /> : null}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Registration;
