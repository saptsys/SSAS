import { PartyMaster } from "../../../dbManager/models/PartyMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'PartyMaster',
  model: PartyMaster
}

class Actions extends _BaseIpcActions {
  getAll = (types) => (dispatch) => {
    const from = "getAll";
    dispatch(this.startCall(this.callTypes.list, from));
    return this.sendIPC("getAll", types)
      .then((res) => {
        console.log(`getAll ${this.reducerName} => `, res)
        dispatch(this.stopCall(this.callTypes.list));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.list, from));
        return Promise.reject(error);
      });
  };
}

export const PartyMasterSlice = new _BaseSlice(reducerInfo.name)
export const PartyMasterActions = new Actions(reducerInfo.name, PartyMasterSlice)
