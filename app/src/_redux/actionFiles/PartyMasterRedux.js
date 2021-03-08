import { PartyMaster } from "../../../dbManager/models/PartyMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'PartyMaster',
  model: PartyMaster
}

export const PartyMasterSlice = new _BaseSlice(reducerInfo.name)
export const PartyMasterActions = new _BaseIpcActions(reducerInfo.name, PartyMasterSlice)
