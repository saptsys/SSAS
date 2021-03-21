import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(LayoutActions.setTitle("Dashboard"))
    },[])
    return (
        <div>
            This is Dashboard
        </div>
    );
};

export default Dashboard;
