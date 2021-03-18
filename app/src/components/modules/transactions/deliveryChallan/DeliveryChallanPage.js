import React, { useEffect } from 'react'
import DeliveryChallanTable from "./DeliveryChallanTable";
import CommonModuleView from '../../_common/CommonModuleView';
import { DeliveryChallanActions, reducerInfo } from '../../../../_redux/actionFiles/DeliveryChallanRedux';
import DeliveryChallanForm from './DeliveryChallanForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';

export const setDeliveryStatusMessage = async (dispatch) => {
  dispatch(DeliveryChallanActions.getLastChalanAndVoucherNumber()).then(res1 => {
    dispatch(DeliveryChallanActions.getTotalBills()).then(res2 => {
      dispatch(LayoutActions.setMessage(<span> Last Challan No: <b>{res1.challanNumber}</b> &nbsp;&nbsp; Total Bills: <b>{res2.total}</b></span>))
    })
  })
}

function DeliveryChallanPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    setDeliveryStatusMessage(dispatch)
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
    editModeChanged={() => {
      setDeliveryStatusMessage(dispatch)
    }}
    saveAndContinueBtn={true}
  />
}

export default DeliveryChallanPage
