
import BillsDetail from "../../../dbManager/models/BillsDetail";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'BillsDetail',
    model: BillsDetail
}

export const BillsDetailSlice = new _BaseSlice(reducerInfo.name)
export const BillsDetailActions = new _BaseIpcActions(reducerInfo.name, BillsDetailSlice)
