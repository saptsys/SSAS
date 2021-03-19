import { BillsTransaction } from "../../../dbManager/models/BillsTransaction";
import { DeliveryTransaction } from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";
import _BillTransactionActionsBase from "./_BillTransactionsBase";

class SalesInvoiceModal extends BillsTransaction {
  constructor(params) {
    super(params)
    this.tag = "S"
    this.billing = "TAX" // default
  }
}

export const reducerInfo = {
  name: 'SalesInvoice',
  model: SalesInvoiceModal
}

class Actions extends _BillTransactionActionsBase {

}


export const SalesInvoiceSlice = new _BaseSlice(reducerInfo.name)
export const SalesInvoiceActions = new Actions(["S"], SalesInvoiceSlice)

export default SalesInvoiceRedux = {
  ...reducerInfo,
  slice: SalesInvoiceSlice,
  actions: SalesInvoiceActions
}
