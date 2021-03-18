import React, { useEffect } from 'react'
import SalesInvoiceTable from "./SalesInvoiceTable";
import CommonModuleView from '../../../_common/CommonModuleView';
import { SalesInvoiceActions, reducerInfo } from '../../../../../_redux/actionFiles/SalesInvoiceRedux';
import SalesInvoiceForm from './SalesInvoiceForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../../_redux/actionFiles/LayoutRedux';
import { errorDialog } from "../../../../../Helpers/dialogs";

function SalesInvoicePage() {
  const dispatch = useDispatch()

  const setMessage = () => {
    dispatch(SalesInvoiceActions.getTotalBillsAndLastBill(null, ['S'])).then(({ total, billNumber }) => {
      console.log("INFOR SETTEF")
      return dispatch(LayoutActions.setMessage(<span> Last Bill No: <b>{billNumber}</b> &nbsp;&nbsp; Total Bills: <b>{total}</b></span>))
    }).catch(err => errorDialog("Error", err.message))
  }

  useEffect(() => {
    setMessage()
  }, [])

  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={SalesInvoiceTable}
    EditForm={SalesInvoiceForm}
    drawerWidth="full"
    saveAndContinueBtn={true}
    actions={SalesInvoiceActions}
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

export default SalesInvoicePage
