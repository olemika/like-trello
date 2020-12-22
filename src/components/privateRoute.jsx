import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
