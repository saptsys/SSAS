import { BillsTransaction } from "../../../dbManager/models/BillsTransaction";
import { DeliveryTransaction } from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";
import _BillTransactionActionsBase from "./_BillTransactionsBase";

class SalesReturnModal extends BillsTransaction {
  constructor(params) {
    super(params)
    this.tag = "SR"
    this.billing = "TAX" // default
  }
}

export const reducerInfo = {
  name: 'SalesReturn',
  model: SalesReturnModal
}

class Actions extends _BillTransactionActionsBase {

}


export const SalesReturnSlice = new _BaseSlice(reducerInfo.name)
export const SalesReturnActions = new Actions(["SR"], SalesReturnSlice)

const SalesReturnRedux = {
  ...reducerInfo,
  slice: SalesReturnSlice,
  actions: SalesReturnActions
}

export default SalesReturnRedux;
