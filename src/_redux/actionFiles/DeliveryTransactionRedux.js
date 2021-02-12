
import DeliveryTransaction from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: 'DeliveryTransaction',
    model: DeliveryTransaction
}

export const DeliveryTransactionSlice = new _BaseSlice(reducerInfo.name)
export const DeliveryTransactionActions = new _BaseIpcActions(reducerInfo.name, DeliveryTransactionSlice)
