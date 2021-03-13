import React, { useEffect } from 'react'
import SalesInvoiceTable from "./SalesInvoiceTable";
import CommonModuleView from '../../../_common/CommonModuleView';
import { SalesInvoiceActions, reducerInfo } from '../../../../../_redux/actionFiles/SalesInvoiceRedux';
import SalesInvoiceForm from './SalesInvoiceForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../../_redux/actionFiles/LayoutRedux';


function SalesInvoicePage() {
  const dispatch = useDispatch()

  const setMessage = async () => {
    // const last = await dispatch(DeliveryChallanActions.getLastChalanAndVoucherNumber())
    // const total = await dispatch(DeliveryChallanActions.getTotalBills())
    // dispatch(LayoutActions.setMessage(<span> Last Challan No: <b>{last.challanNumber}</b> &nbsp;&nbsp; Total Bills: <b>{total.total}</b></span>))
  }

  useEffect(() => {
    setMessage()
  }, [])

  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={SalesInvoiceTable}
    EditForm={SalesInvoiceForm}
    drawerWidth="full"
    actions={SalesInvoiceActions}
    // methods={{
    //   fetchTableData: "getAll",
    //   fetchEditData: "getByIdWithDetails",
    //   saveForm: "save",
    //   deleteRecord: "delete"
    // }}
    editModeChanged={({ mode }) => {
      setMessage()
    }}
  />
}

export default SalesInvoicePage