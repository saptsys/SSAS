import React, { useEffect } from 'react'
import DeliveryChallanTable from "./DeliveryChallanTable";
import CommonModuleView from '../../_common/CommonModuleView';
import { DeliveryChallanActions, reducerInfo } from '../../../../_redux/actionFiles/DeliveryChallanRedux';
import DeliveryChallanForm from './DeliveryChallanForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';


function DeliveryChallanPage() {
  const dispatch = useDispatch()

  const setMessage = async () => {
    const last = await dispatch(DeliveryChallanActions.getLastChalanAndVoucherNumber())
    const total = await dispatch(DeliveryChallanActions.getTotalBills())
    dispatch(LayoutActions.setMessage(<span> Last Challan No: <b>{last.challanNumber}</b> &nbsp;&nbsp; Total Bills: <b>{total.total}</b></span>))
  }

  useEffect(() => {
    setMessage()
  }, [])

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
    editModeChanged={({ mode }) => {
      setMessage()
    }}
  />
}

export default DeliveryChallanPage
