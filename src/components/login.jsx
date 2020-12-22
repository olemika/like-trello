import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import AuthContext from "../context/authContext";

import "./registration.css";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}`;

function Login(props) {
  const { dispatch } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  async function sendForm(e) {
    e.preventDefault();

    let res = await fetch(`${baseUrl}/user/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: "LOGIN",
        payload: data.user_id,
      });
      setRedirect(true);
    } else {
      setError(error);
    }
  }

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
        <h2>Войти</h2>
        <form onSubmit={sendForm}>
          <input
            className='login-form__input'
            type='text'
            name='login'
            placeholder='login'
            onChange={handleInputChange}
          />
          <input
            className='login-form__input'
            type='password'
            name='password'
            placeholder='password'
            onChange={handleInputChange}
          />
          <input className='login-form__submit' type='submit' value='Login' />
        </form>

        {redirect ? <Redirect to='/boards' /> : null}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
