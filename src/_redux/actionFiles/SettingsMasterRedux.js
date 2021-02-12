
import SettingsMaster from "../../../dbManager/models/SettingsMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'SettingsMaster',
    model: SettingsMaster
}

export const SettingsMasterSlice = new _BaseSlice(reducerInfo.name)
export const SettingsMasterActions = new _BaseIpcActions(reducerInfo.name, SettingsMasterSlice)
