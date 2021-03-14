import { PartyMaster } from "../../../dbManager/models/PartyMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'PartyMaster',
  model: PartyMaster
}

class Actions extends _BaseIpcActions {
  getAll = (type) => (dispatch) => {
    const from = "getAll";
    dispatch(this.startCall(this.callTypes.list, from));
    return this.sendIPC("getAll")
      .then((res) => {
        console.log(`getAll ${this.reducerName} => `, res)
        dispatch(this.stopCall(this.callTypes.list));
        return Promise.resolve(type ? res.filter(x => x.type === type) : res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.list, from));
        return Promise.reject(error);
      });
  };
}

export const PartyMasterSlice = new _BaseSlice(reducerInfo.name)
export const PartyMasterActions = new Actions(reducerInfo.name, PartyMasterSlice)
