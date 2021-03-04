import React from 'react'
import DeliveryChallanTable from "./DeliveryChallanTable";
import CommonModuleView from '../../_common/CommonModuleView';
import { PartyMasterActions, reducerInfo } from '../../../../_redux/actionFiles/PartyMasterRedux';
import DeliveryChallanForm from './DeliveryChallanForm';

function DeliveryChallanPage() {
  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={DeliveryChallanTable}
    EditForm={DeliveryChallanForm}
    drawerWidth="full"
    actions={PartyMasterActions}
  />
}

export default DeliveryChallanPage
