// jshint esversion:10

import React from "react";

export default function ToDoItem(props) {
  return (
    <div
      className="todo-item"
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}
