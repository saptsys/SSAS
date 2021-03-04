import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.less";
const promiseIpc = window.promiseIpc;

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

// for demo purpose only
promiseIpc.on("showAlert", (msg, event) => {
  console.log(msg);
  console.log(event);
  return { status: true };
});


ReactDom.render(<App />, document.getElementById("root"));
