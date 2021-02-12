import { combineReducers } from "redux";
import { LayoutSlice } from "./actionFiles/LayoutRedux";

import { BillsDetailSlice } from "./actionFiles/BillsDetailRedux";
import { BillsTransactionSlice } from "./actionFiles/BillsTransactionRedux";
import { DeliveryDetailSlice } from "./actionFiles/DeliveryDetailRedux";
import { DeliveryTransactionSlice } from "./actionFiles/DeliveryTransactionRedux";
import { ItemGroupMasterSlice } from "./actionFiles/ItemGroupMasterRedux";
import { ItemMasterSlice } from "./actionFiles/ItemMasterRedux";
import { ItemUnitMasterSlice } from "./actionFiles/ItemUnitMasterRedux";
import { PartyMasterSlice } from "./actionFiles/PartyMasterRedux";
import { SettingsMasterSlice } from "./actionFiles/SettingsMasterRedux";
import { TaxMasterSlice } from "./actionFiles/TaxMasterRedux";


//add your custom slice which you createed without _BaseSlice class
let reducers = {

}
// add slice object which you created into this array to automatic combine
const redcuerList = [

    BillsDetailSlice,
    BillsTransactionSlice,
    DeliveryDetailSlice,
    DeliveryTransactionSlice,
    ItemGroupMasterSlice,
    ItemMasterSlice,
    ItemUnitMasterSlice,
    PartyMasterSlice,
    SettingsMasterSlice,
    TaxMasterSlice,
    LayoutSlice,

]
redcuerList.forEach(slice => {
    reducers[slice.slice.name] = slice.reducer
})

export const rootReducer = combineReducers(reducers);
