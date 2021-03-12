import React, { useEffect } from 'react'
import DeliveryChallanTable from "./DeliveryChallanTable";
import CommonModuleView from '../../_common/CommonModuleView';
import { DeliveryChallanActions, reducerInfo } from '../../../../_redux/actionFiles/DeliveryChallanRedux';
import DeliveryChallanForm from './DeliveryChallanForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';


function DeliveryChallanPage() {
  const dispatch = useDispatch()

  const setMessage = () => {
    dispatch(DeliveryChallanActions.getLastChalanAndVoucherNumber()).then(res => {
      dispatch(LayoutActions.setMessage(<span> Last Challan No: <b>{res.chalanNumber}</b> &nbsp;&nbsp; Total Bills: <b>{res.voucherNumber}</b></span>))
    })
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
