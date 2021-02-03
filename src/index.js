import React, { useState } from "react";
import { render } from "react-dom";
const api = window.api;

const Test = (props) => {
  const [title, setTitle] = useState("ssas");
  const [body, setBody] = useState("body");
  const send = () => {
    api.send("send", {
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
