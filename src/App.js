import { Card, Drawer } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MainLayout from "./components/layout/MainLayout";
import PartyMaster from "./components/partyMaster/PartyMaster";
import PartyTable from "./components/partyMaster/PartyTable";
import { Store } from "./_redux/store";

const App = () => {
  return (
    <Provider store={Store}>
      <MainLayout>
        {/* <PartyTable /> */}
      </MainLayout>
    </Provider>
  );
}
export default App;
