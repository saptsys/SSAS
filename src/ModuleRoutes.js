import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROUTES } from './helpers/routes';

const PartyMaster = lazy(() => import("./components/modules/masters/partyMaster/PartyMaster"))

const ModuleRoutes = () => {
    return (
        <Suspense fallback={() => <Spin size="large" spinning={true} style={{ minHeight: '100%' }} />}>
            <Switch>
                <Route exact path={ROUTES.dashboard._path} component={(() => <h1>Dashboard</h1>)} />
                <Route exact path={ROUTES.masters.partyMaster._path}>
                    <PartyMaster />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default ModuleRoutes;