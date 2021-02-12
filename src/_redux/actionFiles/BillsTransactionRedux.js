
import BillsTransaction from "../../../dbManager/models/BillsTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'BillsTransaction',
    model: BillsTransaction
}

export const BillsTransactionSlice = new _BaseSlice(reducerInfo.name)
export const BillsTransactionActions = new _BaseIpcActions(reducerInfo.name, BillsTransactionSlice)
