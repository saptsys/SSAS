import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './helpers/routes';

const Dashboard = lazy(() => import("./components/modules/dashboard/Dashboard"))
const PartyMaster = lazy(() => import("./components/modules/masters/partyMaster/PartyMasterPage"))
const ItemGroupMasterPage = lazy(() => import("./components/modules/masters/itemGroupMaster/ItemGroupMasterPage"))

const ModuleRoutes = () => {
    return (
        <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}>
            <Switch>
             <Redirect exact to="/dashboard" from="/" />
                <Route exact path={ROUTES.dashboard._path} component={Dashboard} />
                <Route exact path={ROUTES.masters.partyMaster._path} component={PartyMaster} />
                <Route exact path={ROUTES.masters.item.itemGroupMaster._path} component={ItemGroupMasterPage} />
            </Switch>
        </Suspense>
    );
};

export default ModuleRoutes;