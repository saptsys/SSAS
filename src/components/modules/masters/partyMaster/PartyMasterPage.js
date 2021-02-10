import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';
import PartyMasterTable from "./PartyMasterTable";
import setupCommonToolBar from '../../_common/CommonToolbar';
import CommonModuleView from '../../_common/CommonModuleView';
import { PartyMasterActions, reducerInfo } from '../../../../_redux/actionFiles/PartyMasterRedux';
import PartyMasterForm from './PartyMasterForm';

function PartyMasterPage() {
  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={PartyMasterTable}
    EditForm={PartyMasterForm}
    actions={PartyMasterActions}
  />
}

export default PartyMasterPage
