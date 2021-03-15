
import { TaxMaster } from "../../../dbManager/models/TaxMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'TaxMaster',
  model: TaxMaster
}

class Actions extends _BaseIpcActions {
  getActiveTax = () => (dispatch) => {
    const from = "getActiveTax";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getActiveTax")
      .then((res) => {
        console.log(`getActiveTax ${this.reducerName} => `, res)
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };
}

export const TaxMasterSlice = new _BaseSlice(reducerInfo.name)
export const TaxMasterActions = new Actions(reducerInfo.name, TaxMasterSlice)
