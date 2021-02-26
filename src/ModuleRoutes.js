import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { MODULE_ROUTES } from "./helpers/routes";

const Dashboard = lazy(() => import("./components/modules/dashboard/Dashboard"))

const ItemGroupMaster = lazy(() => import("./components/modules/masters/ItemGroupMaster/ItemGroupMasterPage"))
const ItemMaster = lazy(() => import("./components/modules/masters/ItemMaster/ItemMasterPage"))
const ItemUnitMaster = lazy(() => import("./components/modules/masters/ItemUnitMaster/ItemUnitMasterPage"))
const PartyMaster = lazy(() => import("./components/modules/masters/PartyMaster/PartyMasterPage"))
const TaxMaster = lazy(() => import("./components/modules/masters/TaxMaster/TaxMasterPage"))
const SettingsMaster = lazy(() => import("./components/modules/masters/settingsMaster/SettingsMasterPage"))

const ModuleRoutes = () => {
    return (
        <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}>
            <Switch>
             <Redirect exact to="/dashboard" from="/" />
                <Route exact path={MODULE_ROUTES.dashboard._path} component={Dashboard} />
                <Route exact path={MODULE_ROUTES.masters.partyMaster._path} component={PartyMaster} />
                <Route exact path={MODULE_ROUTES.masters.item.itemGroupMaster._path} component={ItemGroupMaster} />
                <Route exact path={MODULE_ROUTES.masters.item.itemMaster._path} component={ItemMaster} />
                <Route exact path={MODULE_ROUTES.masters.item.unitMaster._path} component={ItemUnitMaster} />
                <Route exact path={MODULE_ROUTES.masters.taxMaster._path} component={TaxMaster} />
                <Route exact path={MODULE_ROUTES.utility.settings._path} component={SettingsMaster} />
            </Switch>
        </Suspense>
    );
};

export default ModuleRoutes;