import React, { useEffect, useState } from "react";
import { PARTY_MASTER } from "../Constants/Ipc-Calls";
const promiseIpc = window.promiseIpc;

const Test = () => {
  const [users, setUsers] = useState({});

  const getUsers = () => {
    promiseIpc.send(PARTY_MASTER.getAll).then(setUsers);
  };
  return (
    <div>
      <button onClick={getUsers}>getUsers</button>
      {JSON.stringify(users)}
      asdasd
    </div>
  );
};

export default Test;
