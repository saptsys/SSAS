import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PartyMaster } from "../dbManager/models";
import { PartyMasterActions } from "./_redux/actionFiles/PartyMasterRedux";

const Test = () => {
  const dispatch = useDispatch()

  const PartyMasterState = useSelector(state => state.PartyMaster.list)
  const [parties, setParties] = useState([])
  useEffect(() => {
    dispatch(PartyMasterActions.getAll()).then(setParties)
  }, [])
  return (
    <div>
      {PartyMasterState.loading === false && PartyMasterState.error && (<>ERROR === {PartyMasterState.error}</>)}
      {PartyMasterState.loading ? "Loading..." :"Data => "+ JSON.stringify(parties)}
    </div>
  );
};

export default Test;
