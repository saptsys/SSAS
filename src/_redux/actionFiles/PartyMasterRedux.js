import PartyMaster from "../../../dbManager/models/PartyMaster";
import _BaseActions from "./_BaseActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'PartyMaster',
    model: PartyMaster
}

export const PartyMasterSlice = new _BaseSlice(reducerInfo.name)
export const PartyMasterActions = new _BaseActions(reducerInfo.name, PartyMasterSlice)