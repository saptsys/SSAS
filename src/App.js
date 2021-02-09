import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import ModuleRoutes from "./ModuleRoutes";
import MainLayout from "./components/layout/MainLayout";
import { Store } from "./_redux/store";
import { Spin } from "antd";

const App = () => {
  return (
    <Provider store={Store}>
      {/* <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%' }} />}> */}
        <HashRouter hashType="slash">
          <MainLayout>
            <ModuleRoutes />
          </MainLayout>
        </HashRouter>
      {/* </Suspense> */}
    </Provider>
  );
}
export default App;
