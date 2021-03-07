import {ItemGroupMaster} from "../../../dbManager/models/ItemGroupMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'ItemGroupMaster',
    model: ItemGroupMaster
}

export const ItemGroupMasterSlice = new _BaseSlice(reducerInfo.name)
export const ItemGroupMasterActions = new _BaseIpcActions(reducerInfo.name, ItemGroupMasterSlice)
