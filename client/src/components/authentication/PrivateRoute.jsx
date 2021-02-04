// jshint esversion:10

import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthContext } from "./ContextProvider";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
