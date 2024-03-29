import { DeliveryTransaction } from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'DeliveryChallan',
  model: DeliveryTransaction
}

class Actions extends _BaseIpcActions {
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

  getLastChalanAndVoucherNumber = () => (dispatch) => {
    const from = "getLastChalanAndVoucherNumber";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getLastChalanAndVoucherNumber")
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  getTotalBills = () => (dispatch) => {
    const from = "getTotalBills";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getTotalBills")
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        return Promise.resolve(res);
      })
      .catch((error) => {
        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };

  getByPartyAndDates = (partyIds, fromDate, toDate) => (dispatch) => {
    const from = "getByPartyAndDates";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("getWithDetailsByPartiesAndDate", { party: partyIds, fromDate, toDate })
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


export const DeliveryChallanSlice = new _BaseSlice(reducerInfo.name)
export const DeliveryChallanActions = new Actions(reducerInfo.name, DeliveryChallanSlice)
