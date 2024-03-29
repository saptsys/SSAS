import { combineReducers } from "redux";
import { LayoutSlice } from "./actionFiles/LayoutRedux";

import { ItemGroupMasterSlice } from "./actionFiles/ItemGroupMasterRedux";
import { ItemMasterSlice } from "./actionFiles/ItemMasterRedux";
import { ItemUnitMasterSlice } from "./actionFiles/ItemUnitMasterRedux";
import { PartyMasterSlice } from "./actionFiles/PartyMasterRedux";
import { SettingsMasterSlice } from "./actionFiles/SettingsMasterRedux";
import { TaxMasterSlice } from "./actionFiles/TaxMasterRedux";
import { FirmInfoSlice } from "./actionFiles/FirmInfoRedux";
import { DeliveryChallanSlice } from "./actionFiles/DeliveryChallanRedux";
import { SalesInvoiceSlice } from "./actionFiles/SalesInvoiceRedux";
import { SalesReturnSlice } from "./actionFiles/SalesReturnRedux";
import { PurchaseInvoiceSlice } from "./actionFiles/PurchaseInvoiceRedux";
import { PurchaseReturnSlice } from "./actionFiles/PurchaseReturnRedux";


//add your custom slice which you createed without _BaseSlice class
let reducers = {

}
// add slice object which you created into this array to automatic combine
const redcuerList = [
  FirmInfoSlice,
  ItemGroupMasterSlice,
  ItemMasterSlice,
  ItemUnitMasterSlice,
  PartyMasterSlice,
  SettingsMasterSlice,
  TaxMasterSlice,
  LayoutSlice,
  DeliveryChallanSlice,
  SalesInvoiceSlice,
  SalesReturnSlice,
  PurchaseInvoiceSlice,
  PurchaseReturnSlice
]
redcuerList.forEach(slice => {
  reducers[slice.slice.name] = slice.reducer
})

export const rootReducer = combineReducers(reducers);
