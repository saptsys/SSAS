import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Store from "./state/Store"
import Test from "./Test";
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
