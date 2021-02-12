
import React from 'react'
import BillsDetailForm from "./BillsDetailForm"
import BillsDetailTable from "./BillsDetailTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {BillsDetailActions , reducerInfo} from "./../../../../_redux/actionFiles/BillsDetailRedux"
function BillsDetailPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={BillsDetailForm}
        MainTable={BillsDetailTable}
        actions={BillsDetailActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default BillsDetailPage
  