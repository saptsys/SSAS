
import { ItemUnitMaster } from "../../../dbManager/models/ItemUnitMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'ItemUnitMaster',
  model: ItemUnitMaster
}

export const ItemUnitMasterSlice = new _BaseSlice(reducerInfo.name)
export const ItemUnitMasterActions = new _BaseIpcActions(reducerInfo.name, ItemUnitMasterSlice)
