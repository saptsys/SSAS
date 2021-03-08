import { DeliveryTransaction } from "../../../dbManager/models/DeliveryTransaction";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'DeliveryChallan',
  model: DeliveryTransaction
}

export const DeliveryChallanSlice = new _BaseSlice(reducerInfo.name)
export const DeliveryChallanActions = new _BaseIpcActions(reducerInfo.name, DeliveryChallanSlice)
