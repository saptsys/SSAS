
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'ImportExternal',
  model: {}
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

  importFromGayatri = (payload) => (dispatch) => {
    const from = "fromGayatri";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("fromGayatri",payload)
      .then((res) => {
        console.log(res)
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  selectFolder = () => (dispatch) => {
    const from = "selectFolder";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("selectFolder")
      .then((res) => {
        console.log(res)
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };
}

export const ImportExternalSlice = new _BaseSlice(reducerInfo.name)
export const ImportExternalActions = new Actions(reducerInfo.name, ImportExternalSlice)
