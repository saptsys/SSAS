
import React from 'react'
import DeliveryDetailForm from "./DeliveryDetailForm"
import DeliveryDetailTable from "./DeliveryDetailTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {DeliveryDetailActions , reducerInfo} from "./../../../../_redux/actionFiles/DeliveryDetailRedux"
function DeliveryDetailPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={DeliveryDetailForm}
        MainTable={DeliveryDetailTable}
        actions={DeliveryDetailActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default DeliveryDetailPage
  