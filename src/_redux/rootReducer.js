import { combineReducers } from "redux";
import { LayoutSlice } from "./actionFiles/LayoutRedux";
import { PartyMasterSlice } from "./actionFiles/PartyMasterRedux";

//add your custom slice which you createed without _BaseSlice class
let reducers = {

}
// add slice object which you created into this array to automatic combine
const redcuerList = [

    PartyMasterSlice,
    LayoutSlice

]
redcuerList.forEach(slice => {
    reducers[slice.slice.name] = slice.reducer
})

export const rootReducer = combineReducers(reducers);
