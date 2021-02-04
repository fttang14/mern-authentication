// jshint esversion:10
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { URL } from "../App";
import { useAuthContext } from "../authentication/ContextProvider";

export default function Main() {
  const history = useHistory();
  const auth = useAuthContext();

  useEffect(() => {
    axios
      .get(URL + "/main", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`Main error: ${err.message}`);
      });
  });

  const handleClick = (event) => {
    event.preventDefault();
    axios
      .get(URL + "/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.ok) {
          console.log(res.data);
          auth.signout(() => {
            localStorage.clear();
            history.push("/home");
          });
        }
      })
      .catch((err) => {
        console.log(`Logout error: ${err.message}`);
      });
  };

  return (
    <div className="heading">
      {auth.user && <h1>Welcome, {auth.user.username}!</h1>}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
