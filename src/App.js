import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Test from "./Test";
import { Store } from "./_redux/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
          <Test/>
      </Provider>
    );
  }
}
export default App;
