import React from 'react'
import PartyMasterTable from "./PartyMasterTable";
import CommonModuleView from '../../_common/CommonModuleView';
import { PartyMasterActions, reducerInfo } from '../../../../_redux/actionFiles/PartyMasterRedux';
import PartyMasterForm from './PartyMasterForm';

function PartyMasterPage() {
  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={PartyMasterTable}
    EditForm={PartyMasterForm}
    drawerWidth="720"
    actions={PartyMasterActions}
  />
}

export default PartyMasterPage
