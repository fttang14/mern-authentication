// jshint esversion:10
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ContextProvider from "./authentication/ContextProvider";
import PrivateRoute from "./authentication/PrivateRoute";
// import Main from "./debug/Main";
import Home from "./signin/Home";
import Login from "./signin/Login";
import Register from "./signin/Register";
import ToDoList from "./application/ToDoList";

export const URL = "https://salty-scrubland-77298.herokuapp.com";

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/list">
            <ToDoList />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}
