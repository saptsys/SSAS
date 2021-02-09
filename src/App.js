import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import ModuleRoutes from "./ModuleRoutes";
import MainLayout from "./components/layout/MainLayout";
import { Store } from "./_redux/store";

const App = () => {
  return (
    <Provider store={Store}>
      <HashRouter>
        <MainLayout>
          <ModuleRoutes />
        </MainLayout>
      </HashRouter>
    </Provider>
  );
}
export default App;
