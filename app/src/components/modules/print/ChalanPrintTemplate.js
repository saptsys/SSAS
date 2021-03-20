import React, { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';
import { SettingsMasterActions } from '../../../_redux/actionFiles/SettingsMasterRedux';
import { PartyMasterActions } from '../../../_redux/actionFiles/PartyMasterRedux';
import { DeliveryChallanActions } from "../../../_redux/actionFiles/DeliveryChallanRedux";

const ChalanPrintTemplate = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  let { id } = useParams();

  useEffect(() => {

    console.log(DeliveryChallanActions().getByIdWithDetails(id))
  }, [])
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export default ChalanPrintTemplate;
