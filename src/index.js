import React, { useState } from "react";
import { render } from "react-dom";
const ipcRenderer = window.ipcRenderer;

const Test = (props) => {
  const [title, setTitle] = useState("ssas");
  const [body, setBody] = useState("body");
  const send = () => {
    ipcRenderer.send("fire", {
      title: title,
      body: body,
    });
  };
  return (
    <div>
      Title :
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <br />
      Body :
      <input
        type="text"
        onChange={(e) => {
          setBody(e.target.value);
        }}
      ></input>
      <button onClick={send}>Send</button>
    </div>
  );
};

render(<Test/>, document.getElementById("root"));
