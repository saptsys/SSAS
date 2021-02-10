import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';
import PartyMasterTable from "./PartyMasterTable";
import PartyMasterToolbar from './PartyMasterToolbar';
function PartyMasterPage() {
  const dispatch = useDispatch()
  const [filterText, setFilterText] = useState("")
  const createBtnHandler = (id = null) => {

  }
  //settings layout things
  useEffect(() => {
    dispatch(LayoutActions.setToolbar(
      <PartyMasterToolbar
        createBtnHandler={createBtnHandler}
        searchHandler={setFilterText}
      />
    ))
  }, [])

  return (
    <>
      <PartyMasterTable 
        filterText={filterText}
      />
    </>
  )
}

export default PartyMasterPage
