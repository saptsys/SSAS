import { combineReducers } from "redux";
import { } from "../state/PartyMaster/PartyMasterRecucer";
import { PartyMasterSlice } from "./actionFiles/PartyMasterRedux";

export const rootReducer = combineReducers({
    [PartyMasterSlice.slice.name]: PartyMasterSlice.reducer
});
