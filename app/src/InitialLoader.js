import { Alert, Spin } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { FirmInfoActions } from './_redux/actionFiles/FirmInfoRedux';
import { SettingsMasterActions } from './_redux/actionFiles/SettingsMasterRedux';
import { MODAL_ROUTES } from '../Constants/routes';

const InitialLoader = ({ children }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const skipLoad = useMemo(() => {
      console.log(location.pathname)
        return !!matchPath(location.pathname, {
            //module which is not require to load after the initial process
            path: [
                MODAL_ROUTES.firmInfoModal._path
            ],
            exact: true,
            strict: false
        });
    }, [location.pathname])

    useEffect(() => {
        if (!skipLoad) {
            dispatch(FirmInfoActions.getData())
            dispatch(SettingsMasterActions.getAll())
        }
    }, [])

    const { isLoading, error } = useSelector(state => {
        return {
            isLoading: state.FirmInfo.loading === "getData",
            error: state.FirmInfo.error
        }
    })

    return isLoading ? (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'95vh'}}>
            <Spin
                size="large"
                spinning={true}
                tip="Loading Please Wait...."
            />
        </div>)
        : !isLoading && error ? (
            <Alert banner description={error?.message} message={<b>Initial Loader Error: </b>} type="error" />
        )
            : children
};

export default InitialLoader;
