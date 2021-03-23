import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PRINT_ROUTES } from './helpers/routes';
import ChalanPrintTemplate from "./components/modules/print/ChalanPrintTemplate";
import InvoicePrintTemplate from "./components/modules/print/InvoicePrintTemplate";

const PrintRoutes = () => {
  return (
    <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}>
      <Switch>
        <Route exact path={PRINT_ROUTES.chalan._path} component={ChalanPrintTemplate} />
        <Route exact path={PRINT_ROUTES.sales._path} component={InvoicePrintTemplate} />
      </Switch>
    </Suspense>
  );
};

export default PrintRoutes;
