// jshint esversion:10

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { handleErrors } from "./Errors";
import { URL } from "../App";
import { useAuthContext } from "../authentication/ContextProvider";

export default function Login() {
  const history = useHistory();
  const auth = useAuthContext();

  const [user, setUser] = useState({
    username: String,
    password: String
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(URL + "/login", user, { withCredentials: true })
      .then(handleErrors)
      .then((res) => {
        console.log(res.data.message);
        auth.signin(user, () => {
          localStorage.setItem("user", JSON.stringify(user));
          history.push("/list");
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="username"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
