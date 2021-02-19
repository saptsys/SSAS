import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';
import { PartyMasterActions, reducerInfo } from '../../../_redux/actionFiles/PartyMasterRedux';
import PartyMasterForm from '../masters/partyMaster/PartyMasterForm';
import CommonEditForm from '../_common/CommonEditForm';

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(LayoutActions.setTitle("Dashboard"))
    }, [])
    return (
        <CommonEditForm
            EditForm={PartyMasterForm}
            actions={PartyMasterActions}
            closeDialog={alert}
            reducerInfo={reducerInfo}
            titleSufix="Party"
            editId={2}
        />
    );
};

export default Dashboard;