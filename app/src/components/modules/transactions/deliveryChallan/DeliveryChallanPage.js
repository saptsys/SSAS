import React from 'react'
import DeliveryChallanTable from "./DeliveryChallanTable";
import CommonModuleView from '../../_common/CommonModuleView';
import { DeliveryChallanActions, reducerInfo } from '../../../../_redux/actionFiles/DeliveryChallanRedux';
import DeliveryChallanForm from './DeliveryChallanForm';


function DeliveryChallanPage() {
  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={DeliveryChallanTable}
    EditForm={DeliveryChallanForm}
    drawerWidth="full"
    actions={DeliveryChallanActions}
    methods={{
      fetchTableData: "getAll",
      fetchEditData: "getByIdWithDetails",
      saveForm: "save",
      deleteRecord: "delete"
    }}
  />
}

export default DeliveryChallanPage
