
import React from 'react'
import ItemMasterForm from "./ItemMasterForm"
import ItemMasterTable from "./ItemMasterTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import {ItemMasterActions , reducerInfo} from "./../../../../_redux/actionFiles/ItemMasterRedux"
function ItemMasterPage() {
  return (
    <div>
      <CommonModuleView
        EditForm={ItemMasterForm}
        MainTable={ItemMasterTable}
        actions={ItemMasterActions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default ItemMasterPage
  