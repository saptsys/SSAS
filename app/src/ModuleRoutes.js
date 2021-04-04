import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from "./components/modules/dashboard/Dashboard"

import ItemGroupMaster from "./components/modules/masters/ItemGroupMaster/ItemGroupMasterPage"
import ItemMaster from "./components/modules/masters/ItemMaster/ItemMasterPage"
import ItemUnitMaster from "./components/modules/masters/ItemUnitMaster/ItemUnitMasterPage"
import PartyMaster from "./components/modules/masters/PartyMaster/PartyMasterPage"
import TaxMaster from "./components/modules/masters/TaxMaster/TaxMasterPage"
import SettingsMaster from "./components/modules/masters/settingsMaster/SettingsMasterPage"
import DeliveryChallan from "./components/modules/transactions/deliveryChallan/DeliveryChallanPage"
import SalesInvoicePage from './components/modules/transactions/sales/salesInvoice/SalesInvoicePage';
import SalesReturnPage from './components/modules/transactions/sales/salesReturn/SalesReturnPage';
import PurchaseInvoicePage from './components/modules/transactions/purchase/purchaseInvoice/PurchaseInvoicePage';
import PurchaseReturnPage from './components/modules/transactions/purchase/purchaseReturn/PurchaseReturnPage';
import ImportExternal from "./components/modules/masters/settingsMaster/ImportExternal"

import { MODULE_ROUTES } from '../Constants/routes';
import FirmInfoPage from './components/modules/utility/firmInfo/FirmInfoPage';

const ModuleRoutes = () => {
  return (
    <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}>
      <Switch>
        {/* Dashboard */}
        <Redirect exact to={MODULE_ROUTES.dashboard._path} from="/" />
        <Route exact path={MODULE_ROUTES.dashboard._path} component={Dashboard} />

        {/* Masters */}
        <Route exact path={MODULE_ROUTES.masters.partyMaster._path} component={PartyMaster} />
        <Route exact path={MODULE_ROUTES.masters.item.itemGroupMaster._path} component={ItemGroupMaster} />
        <Route exact path={MODULE_ROUTES.masters.item.itemMaster._path} component={ItemMaster} />
        <Route exact path={MODULE_ROUTES.masters.item.unitMaster._path} component={ItemUnitMaster} />
        <Route exact path={MODULE_ROUTES.masters.taxMaster._path} component={TaxMaster} />

        {/* Transactions */}
        <Route exact path={MODULE_ROUTES.transactions.deliveryChallan._path} component={DeliveryChallan} />
        <Route exact path={MODULE_ROUTES.transactions.sales.salesInvoice._path} component={SalesInvoicePage} />
        <Route exact path={MODULE_ROUTES.transactions.sales.salesReturn._path} component={SalesReturnPage} />
        <Route exact path={MODULE_ROUTES.transactions.purchase.purchaseInvoice._path} component={PurchaseInvoicePage} />
        <Route exact path={MODULE_ROUTES.transactions.purchase.purchaseReturn._path} component={PurchaseReturnPage} />

        {/* Utilities */}
        <Route exact path={MODULE_ROUTES.utility.settings._path} component={SettingsMaster} />
        <Route exact path={MODULE_ROUTES.utility.firmInfo._path} component={FirmInfoPage} />
        <Route exact path={MODULE_ROUTES.utility.import._path} component={ImportExternal} />

      </Switch>
    </Suspense>
  );
};

export default ModuleRoutes;
