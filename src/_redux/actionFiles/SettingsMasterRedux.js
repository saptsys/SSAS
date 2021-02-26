
import SettingsMaster from "../../../dbManager/models/SettingsMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'SettingsMaster',
    model: SettingsMaster
}

class Actions extends _BaseIpcActions{
    constructor(info , slice){
        super(info , slice);
    }

    saveSetting(row){
        console.log(row)
    }
}

export const SettingsMasterSlice = new _BaseSlice(reducerInfo.name)
export const SettingsMasterActions = new Actions(reducerInfo.name, SettingsMasterSlice)
