import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PRINT_ROUTES } from './helpers/routes';
import ChalanPrintTemplate from "./components/modules/print/ChalanPrintTemplate";
const PrintRoutes = () => {
  return (
    <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}>
      <Switch>
        <Route exact path={PRINT_ROUTES.chalan._path} component={ChalanPrintTemplate} />
      </Switch>
    </Suspense>
  );
};

export default PrintRoutes;
