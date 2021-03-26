
import { Dashboard } from "../../../dbManager/models/Dashboard";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'Dashboard',
  model: Dashboard
}

class Actions {

  constructor(ipcCallMaster, sliceObj) {
    this.sendIPC = (endPoint, payload) => promiseIpc.send(ipcCallMaster + "/" + endPoint, payload);
    this.actions = sliceObj.slice.actions;
    this.callTypes = sliceObj.callTypes;
    this.reducerName = sliceObj.slice.name;

    this.startCall = (calltype) => this.actions.startCall({ callType: calltype });
    this.dataFetched = (calltype, data) => this.actions.dataFetched({ callType: calltype, data: data });
    this.stopCall = (calltype) => this.actions.stopCall({ callType: calltype });
    this.catchError = (error) => this.actions.catchError({ error: error });
  }

  getStats = () => (dispatch) => {
    const from = "getStats";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getStats")
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };
}

export const DashboardSlice = new _BaseSlice(reducerInfo.name)
export const DashboardActions = new Actions(reducerInfo.name, DashboardSlice)
