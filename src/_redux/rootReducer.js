import { combineReducers } from "redux";
import { PartyMasterSlice } from "./actionFiles/PartyMasterRedux";

export const rootReducer = combineReducers({
    [PartyMasterSlice.slice.name]: PartyMasterSlice.reducer
});
