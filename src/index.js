import React, { useState,useEffect } from "react";
import { render } from "react-dom";
const promiseIpc = window.promiseIpc;

const Test = (props) => {
  const [users, setUsers] = useState({});
  useEffect(() => {
    promiseIpc.send("users/getAll").then(setUsers).catch(console.log);
  }, [0])
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
};

render(<Test/>, document.getElementById("root"));
