import { BillsTransaction } from "../../../dbManager/models/BillsTransaction";
import { DeliveryTransaction } from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";
import _BillTransactionActionsBase from "./_BillTransactionsBase";

class PurchaseInvoiceModal extends BillsTransaction {
    constructor(params) {
        super(params)
        this.tag = "P"
    }
}

export const reducerInfo = {
    name: 'PurchaseInvoice',
    model: PurchaseInvoiceModal
}

class Actions extends _BillTransactionActionsBase {

}


export const PurchaseInvoiceSlice = new _BaseSlice(reducerInfo.name)
export const PurchaseInvoiceActions = new Actions(["P"], PurchaseInvoiceSlice)

const PurchaseInvoiceRedux = {
    ...reducerInfo,
    slice: PurchaseInvoiceSlice,
    actions: PurchaseInvoiceActions
}
