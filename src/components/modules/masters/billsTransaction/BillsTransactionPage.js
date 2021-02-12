
import React from 'react'
import BillsTransactionForm from "./BillsTransactionForm"
import BillsTransactionTable from "./BillsTransactionTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {BillsTransactionActions , reducerInfo} from "./../../../../_redux/actionFiles/BillsTransactionRedux"
function BillsTransactionPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={BillsTransactionForm}
        MainTable={BillsTransactionTable}
        actions={BillsTransactionActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default BillsTransactionPage
  