import React from 'react'
import ItemGroupMasterForm from "./ItemGroupMasterForm"
import ItemGroupMasterTable from "./ItemGroupMasterTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {ItemGroupMasterActions , reducerInfo} from "./../../../../_redux/actionFiles/ItemGroupMasterRedux"
function ItemGroupMasterPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={ItemGroupMasterForm}
        MainTable={ItemGroupMasterTable}
        actions={ItemGroupMasterActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default ItemGroupMasterPage
