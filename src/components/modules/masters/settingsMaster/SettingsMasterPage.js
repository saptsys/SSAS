
import React from 'react'
import SettingsMasterForm from "./SettingsMasterForm"
import SettingsMasterTable from "./SettingsMasterTable"
import CommonModuleView from "./../../_common/CommonModuleView"
import { SettingsMasterActions, reducerInfo } from "./../../../../_redux/actionFiles/SettingsMasterRedux"
function SettingsMasterPage() {
  return (
    <div>
      {/* <CommonModuleView
        EditForm={SettingsMasterForm}
        MainTable={SettingsMasterTable}
        actions={SettingsMasterActions}
        reducerInfo={reducerInfo}
      /> */}
      <SettingsMasterTable />
    </div>
  )
}

export default SettingsMasterPage
