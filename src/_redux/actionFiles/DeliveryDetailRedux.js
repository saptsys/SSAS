
import DeliveryDetail from "../../../dbManager/models/DeliveryDetail";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'DeliveryDetail',
    model: DeliveryDetail
}

export const DeliveryDetailSlice = new _BaseSlice(reducerInfo.name)
export const DeliveryDetailActions = new _BaseIpcActions(reducerInfo.name, DeliveryDetailSlice)
