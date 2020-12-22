import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/privateRoute.jsx";

import Container from "./components/container.jsx";
import Dashboard from "./components/dashboard.jsx";
import Registration from "./components/registration.jsx";
import Login from "./components/login.jsx";
import Boards from "./components/boards.jsx";
import UserProfile from "./components/userProfile.jsx";

import AuthContext from "./context/authContext";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  user: localStorage.getItem("user"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className='App'>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  {state.isAuthenticated ? (
                    <Link to='/boards'>Мои доски</Link>
                  ) : (
                    <Link to='/'>Like trello</Link>
                  )}
                </li>
                <div>
                  <li>
                    {state.isAuthenticated ? (
                      <Link to='/profile'>Профиль</Link>
                    ) : (
                      <Link to='/registration'>Регистрация</Link>
                    )}
                  </li>
                  <li>
                    {!state.isAuthenticated ? (
                      <Link to='/login'>войти</Link>
                    ) : (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href='#'
                        onClick={() =>
                          dispatch({
                            type: "LOGOUT",
                          })
                        }
                      >
                        выйти
                      </a>
                    )}
                  </li>
                </div>
              </ul>
            </nav>

            <Switch>
              <Container>
                <Route path='/registration' exact component={Registration} />
                <Route path='/login' exact component={Login} />
                <PrivateRoute path='/profile' exact component={UserProfile} />
                <PrivateRoute path='/boards' exact component={Boards} />
                <PrivateRoute path='/board/:id' exact component={Dashboard} />
                {!state.isAuthenticated ? (
                  <Route path='/' exact component={Login} />
                ) : (
                  <Route path='/' exact component={Boards} />
                )}
              </Container>
            </Switch>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
