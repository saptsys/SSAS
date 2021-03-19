const { ALL_BILLINGS } = require("../../../Constants/Transactionals");

export default class _BillTransactionActionsBase {
  /**
    * @param {string} ipcCallMaster
    * @param {_BaseSlice} sliceObj
    */
  constructor(tag, sliceObj) {
    this.tag = tag
    this.sendIPC = (endPoint, payload) =>
      promiseIpc.send("BillsTransaction" + "/" + endPoint, payload);
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

  getAll = (billing = ALL_BILLINGS, tag = this.tag) => (dispatch) => {
    const from = "getAll";
    dispatch(this.startCall(this.callTypes.list, from));
    return this.sendIPC("getAll", { billing, tag })
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

  save = (payloadTmp) => (dispatch) => {
    const from = "save";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("save", payloadTmp)
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



  getByIdWithDetails = (trxId) => (dispatch) => {
    const from = "getByIdWithDetails";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getByIdWithDetails", trxId)
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };


  getByBillNumber = (number, billing = ALL_BILLINGS, tag = this.tag) => (dispatch) => {
    const from = "getByBillNumber";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getByBillNumber", { billNumber: number, tag: this.tag, billing })
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  getTotalBillsAndLastBill = (billing = ALL_BILLINGS, tag = this.tag) => (dispatch) => {
    const from = "getTotalBillsAndLastBill";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getTotalBillsAndLastBill", { billing: billing ?? ALL_BILLINGS, tag: tag ?? this.tag })
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  getByPartyListAndDateInterval = (party, fromDate, toDate, billing = ALL_BILLINGS, tag = this.tag) => (dispatch) => {
    const from = "getByPartyListAndDateInterval";
    dispatch(this.startCall(this.callTypes.list, from));
    return this.sendIPC("getByPartyListAndDateInterval", { party, fromDate, toDate, billing: billing ?? ALL_BILLINGS, tag: tag ?? this.tag })
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.list));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.list, from));
        return Promise.reject(error);
      });
  };
}
