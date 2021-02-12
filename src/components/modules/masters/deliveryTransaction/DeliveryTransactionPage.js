
import React from 'react'
import DeliveryTransactionForm from "./DeliveryTransactionForm"
import DeliveryTransactionTable from "./DeliveryTransactionTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {DeliveryTransactionActions , reducerInfo} from "./../../../../_redux/actionFiles/DeliveryTransactionRedux"
function DeliveryTransactionPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={DeliveryTransactionForm}
        MainTable={DeliveryTransactionTable}
        actions={DeliveryTransactionActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default DeliveryTransactionPage
  