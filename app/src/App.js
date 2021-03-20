import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch, useLocation } from "react-router-dom";
import ModuleRoutes from "./ModuleRoutes";
import MainLayout from "./components/layout/MainLayout";
import { Store } from "./_redux/store";
import { Spin } from "antd";
import './app.less'
import ModalRoutes from "./ModalRoutes";
import InitialLoader from "./InitialLoader";
import PrintRoutes from "./PrintRoutes";
const App = () => {
  return (
    <Provider store={Store}>
      {/* <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}> */}
      <HashRouter hashType="slash">
        <InitialLoader>
          <Switch>
          <Route path="/print/">
              <PrintRoutes />
            </Route>
            <Route path="/modal/">
              <ModalRoutes />
            </Route>
            <Route path="/">
              <MainLayout>
                <ModuleRoutes />
              </MainLayout>
            </Route>
          </Switch>
        </InitialLoader>

      </HashRouter>
      {/* </Suspense> */}
    </Provider>
  );
}
export default App;
