
import React from 'react'
import TaxMasterForm from "./TaxMasterForm"
import TaxMasterTable from "./TaxMasterTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {TaxMasterActions , reducerInfo} from "./../../../../_redux/actionFiles/TaxMasterRedux"
function TaxMasterPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={TaxMasterForm}
        MainTable={TaxMasterTable}
        actions={TaxMasterActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default TaxMasterPage
  