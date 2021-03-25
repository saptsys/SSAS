import React, { useEffect } from 'react'
import PurchaseInvoiceTable from "./PurchaseInvoiceTable";
import CommonModuleView from '../../../_common/CommonModuleView';
import { PurchaseInvoiceActions, reducerInfo } from '../../../../../_redux/actionFiles/PurchaseInvoiceRedux';
import PurchaseInvoiceForm from './PurchaseInvoiceForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../../_redux/actionFiles/LayoutRedux';
import { errorDialog } from "../../../../../Helpers/dialogs";

function PurchaseInvoicePage() {
  const dispatch = useDispatch()

  const setMessage = () => {
    dispatch(PurchaseInvoiceActions.getTotalBillsAndLastBill(null, ['P'])).then(({ total, billNumber }) => {
      return dispatch(LayoutActions.setMessage(<span> Last Bill No: <b>{billNumber}</b> &nbsp;&nbsp; Total Bills: <b>{total}</b></span>))
    }).catch(err => errorDialog("Error", err.message))
  }

  useEffect(() => {
    setMessage()
  }, [])

  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={PurchaseInvoiceTable}
    EditForm={PurchaseInvoiceForm}
    drawerWidth="full"
    saveAndContinueBtn={true}
    actions={PurchaseInvoiceActions}
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
        title: "F6 to Import Challans",
        method: () => true
      }
    ]}
  />
}

export default PurchaseInvoicePage
