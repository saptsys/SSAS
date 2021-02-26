import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch, useLocation } from "react-router-dom";
import ModuleRoutes from "./ModuleRoutes";
import MainLayout from "./components/layout/MainLayout";
import { Store } from "./_redux/store";
import { Spin } from "antd";
import './app.less'
import ModalRoutes from "./ModalRoutes";

const App = () => {
  return (
    <Provider store={Store}>
      {/* <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%' }} />}> */}
      <HashRouter hashType="slash">
        <Switch>
          <Route path="/modal/">
            <ModalRoutes />
          </Route>
          <Route path="/">
            <MainLayout>
              <ModuleRoutes />
            </MainLayout>
          </Route>
        </Switch>
      </HashRouter>
      {/* </Suspense> */}
    </Provider>
  );
}
export default App;
