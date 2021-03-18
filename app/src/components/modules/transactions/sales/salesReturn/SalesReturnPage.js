import React, { useEffect } from 'react'
import SalesReturnTable from "./SalesReturnTable";
import CommonModuleView from '../../../_common/CommonModuleView';
import { SalesReturnActions, reducerInfo } from '../../../../../_redux/actionFiles/SalesReturnRedux';
import SalesReturnForm from './SalesReturnForm';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../../_redux/actionFiles/LayoutRedux';
import { errorDialog } from "../../../../../Helpers/dialogs";

function SalesReturnPage() {
  const dispatch = useDispatch()

  const setMessage = () => {
    dispatch(SalesReturnActions.getTotalBillsAndLastBill(null, ['SR'])).then(({ total, billNumber }) => {
      return dispatch(LayoutActions.setMessage(<span> Last Bill No: <b>{billNumber}</b> &nbsp;&nbsp; Total Bills: <b>{total}</b></span>))
    }).catch(err => errorDialog("Error", err.message))
  }

  useEffect(() => {
    setMessage()
  }, [])

  return <CommonModuleView
    reducerInfo={reducerInfo}
    MainTable={SalesReturnTable}
    EditForm={SalesReturnForm}
    drawerWidth="full"
    saveAndContinueBtn={true}
    actions={SalesReturnActions}
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

export default SalesReturnPage
