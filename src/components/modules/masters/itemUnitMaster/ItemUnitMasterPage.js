
import React from 'react'
import ItemUnitMasterForm from "./ItemUnitMasterForm"
import ItemUnitMasterTable from "./ItemUnitMasterTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {ItemUnitMasterActions , reducerInfo} from "./../../../../_redux/actionFiles/ItemUnitMasterRedux"
function ItemUnitMasterPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={ItemUnitMasterForm}
        MainTable={ItemUnitMasterTable}
        actions={ItemUnitMasterActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default ItemUnitMasterPage
  