
import {TaxMaster} from "../../../dbManager/models/TaxMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'TaxMaster',
    model: TaxMaster
}

export const TaxMasterSlice = new _BaseSlice(reducerInfo.name)
export const TaxMasterActions = new _BaseIpcActions(reducerInfo.name, TaxMasterSlice)
