import _BaseSlice from "./_BaseSlice";

const promiseIpc = window.promiseIpc;

export default class _BaseIpcActions {
  /**
   *
   * @param {string} ipcCallMaster
   * @param {_BaseSlice} sliceObj
   */
  constructor(ipcCallMaster, sliceObj) {
    this.sendIPC = (endPoint, payload) =>
      promiseIpc.send(ipcCallMaster + "/" + endPoint, payload);
    this.actions = sliceObj.slice.actions;
    this.callTypes = sliceObj.callTypes;
    this.reducerName = sliceObj.slice.name;

    this.startCall = (calltype, from = null) =>
      this.actions.startCall({ callType: calltype, from: from });
    this.stopCall = (calltype) => this.actions.stopCall({ callType: calltype });
    this.catchError = (error, calltype) =>
      this.actions.catchError({ error: error, callType: calltype });
  }

  reIniState = () => (dispatch) => {
    dispatch(this.actions.reIniState({}));
    return Promise.resolve();
  };

  getAll = () => (dispatch) => {
    const from = "getAll";
    dispatch(this.startCall(this.callTypes.list, from));
    return this.sendIPC("getAll")
      .then((res) => {
        console.table(res)
        dispatch(this.stopCall(this.callTypes.list));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.list, from));
        return Promise.reject(error);
      });
  };

  save = (payload) => (dispatch) => {
    const from = "save";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("save", payload)
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.log(error);

        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  getById = (id) => (dispatch) => {
    const from = "getById";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getById", id)
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  delete = (id) => (dispatch) => {
    const from = "delete";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("delete", id)
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };
  /**
   * check that given field value is already exists on database or not
   *
   * @param {Object} param
   * @param {String} param.field
   * @param {String} param.value
   * @param {Number} param.id
   * @returns {Promise}
   */
  checkUnique = ({ fields, id }) => (dispatch) => {
    const from = "checkUnique";
    console.log(fields, id);

    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC(from, { fields: fields, id: id })
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
