
import {ItemMaster} from "../../../dbManager/models/ItemMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'ItemMaster',
    model: ItemMaster
}

export const ItemMasterSlice = new _BaseSlice(reducerInfo.name)
export const ItemMasterActions = new _BaseIpcActions(reducerInfo.name, ItemMasterSlice)
