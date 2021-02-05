import { createStore, combineReducers ,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./_common/Reducers";
const Store = createStore(
  combineReducers(reducers) , 
  applyMiddleware(thunk));
export default Store;
