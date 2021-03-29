import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { MODAL_ROUTES } from '../Constants/routes';
import FirmInfoDialog from './components/dialogs/FirmInfoDialog';

const ModalRoutes = () => {
    console.log("IN modal")
    return (
        <Suspense fallback={<Spin size="large" spinning={true} style={{ minHeight: '100%', minWidth: '100%', position: 'relative', top: '45%' }} />}>
            <Switch>
                <Route exact path={MODAL_ROUTES.firmInfoModal._path} component={FirmInfoDialog} />
            </Switch>
        </Suspense>
    );
};

export default ModalRoutes;
