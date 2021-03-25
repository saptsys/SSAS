import { BillsTransaction } from "../../../dbManager/models/BillsTransaction";
import { DeliveryTransaction } from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";
import _BillTransactionActionsBase from "./_BillTransactionsBase";

class PurchaseReturnModal extends BillsTransaction {
  constructor(params) {
    super(params)
    this.tag = "PR"
  }
}

export const reducerInfo = {
  name: 'PurchaseReturn',
  model: PurchaseReturnModal
}

class Actions extends _BillTransactionActionsBase {

}


export const PurchaseReturnSlice = new _BaseSlice(reducerInfo.name)
export const PurchaseReturnActions = new Actions(["PR"], PurchaseReturnSlice)

const PurchaseReturnRedux = {
  ...reducerInfo,
  slice: PurchaseReturnSlice,
  actions: PurchaseReturnActions
}
