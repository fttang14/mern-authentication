// jshint esversion:10

import React, { useState } from "react";

export default function InputArea(props) {
  const [inputText, setInputText] = useState({
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <div className="form">
      <input
        onChange={handleChange}
        type="text"
        name="content"
        value={inputText.content}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          props.addItem(inputText);
          setInputText({
            content: ""
          });
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}
