import React, { useEffect } from 'react'
import PurchaseReturnTable from "./PurchaseReturnTable";
import CommonModuleView from '../../../_common/CommonModuleView';
import { PurchaseReturnActions, reducerInfo } from '../../../../../_redux/actionFiles/PurchaseReturnRedux';
import PurchaseReturnForm from './PurchaseReturnForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../../_redux/actionFiles/LayoutRedux';
import { errorDialog } from "../../../../../Helpers/dialogs";

function PurchaseReturnPage() {
  const dispatch = useDispatch()

  const setMessage = () => {
    dispatch(PurchaseReturnActions.getTotalBillsAndLastBill(null, ['PR'])).then(({ total, billNumber }) => {
      return dispatch(LayoutActions.setMessage(<span> Last Bill No: <b>{billNumber}</b> &nbsp;&nbsp; Total Bills: <b>{total}</b></span>))
    }).catch(err => errorDialog("Error", err.message))
  }

  useEffect(() => {
    setMessage()
  }, [])

  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={PurchaseReturnTable}
    EditForm={PurchaseReturnForm}
    drawerWidth="full"
    saveAndContinueBtn={true}
    actions={PurchaseReturnActions}
    methods={{
      fetchTableData: "getAll",
      fetchEditData: "getByIdWithDetails",
      saveForm: "save",
      deleteRecord: "delete"
    }}
    editModeChanged={() => {
      setMessage()
    }}
    extraEditShortcuts={[
      {
        key: 'F6',
        title: "F6 to Select Against Bill",
        method: () => true
      },
      {
        key: 'F7',
        title: "F7 to Select Items",
        method: () => true
      },
    ]}
  />
}

export default PurchaseReturnPage
