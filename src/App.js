import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MainLayout from "./components/MainLayout";
import { Store } from "./_redux/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <MainLayout />
      </Provider>
    );
  }
}
export default App;
