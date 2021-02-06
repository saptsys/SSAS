import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import './index.css'

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDom.render(<App />, document.getElementById("root"))