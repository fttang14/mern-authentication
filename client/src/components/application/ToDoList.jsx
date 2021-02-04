// jshint esversion:10

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import axios from "axios";

import { URL } from "../App";
import { useAuthContext } from "../authentication/ContextProvider";

export default function ToDoList() {
  const history = useHistory();
  const auth = useAuthContext();

  const [items, setItems] = useState([]);

  useEffect(() => {
    let isOnline = true;
    axios
      .get(URL + "/list", { withCredentials: true })
      .then((res) => {
        if (res.data.ok && isOnline) {
          setItems(res.data.items);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => {
      isOnline = false;
    };
  }, [items]);

  const addItem = (newItem) => {
    if (!newItem || newItem.content === "") {
      return;
    }
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
    axios
      .post(URL + "/list", newItem, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteItem = (postId) => {
    axios
      .delete(URL + "/list", {
        withCredentials: true,
        data: {
          contentId: postId
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setItems((prev) => {
      return prev.filter((item) => {
        return item._id !== postId;
      });
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios
      .get(URL + "/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.ok) {
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

  const getItems = () => {
    return items;
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Welcome {auth.user.username}!</h1>
        <button onClick={handleClick}>Logout</button>
      </div>
      <InputArea addItem={addItem} />
      <div>
        <ul>
          {getItems().map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={todoItem._id}
              text={todoItem.content}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
