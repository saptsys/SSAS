
import {SettingsMaster} from "../../../dbManager/models/SettingsMaster";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'SettingsMaster',
  model: SettingsMaster
}


class Actions {
  /**
   *
   * @param {null} ipcCallMaster
   * @param {SettingsMasterSlice} sliceObj
   */
  constructor(ipcCallMaster, sliceObj) {
    this.sendIPC = (endPoint, payload) => promiseIpc.send(ipcCallMaster + "/" + endPoint, payload);
    this.actions = sliceObj.slice.actions;
    this.callTypes = sliceObj.callTypes;
    this.reducerName = sliceObj.slice.name;

    this.startCall = (calltype) => this.actions.startCall({ callType: calltype });
    this.dataFetched = (calltype, data) => this.actions.dataFetched({ callType: calltype, data: data });
    this.stopCall = (calltype) => this.actions.stopCall({ callType: calltype });
    this.catchError = (error) => this.actions.catchError({ error: error });
  }

  getAll = () => dispatch => {
    dispatch(this.startCall(this.callTypes.DATA))
    return this.sendIPC('getAll').then(res => {
      if (res)
        dispatch(this.dataFetched(this.callTypes.DATA, res))
      else
        dispatch(this.catchError({ message: "Settings not found." }))
    }).catch(err => {
      dispatch(this.catchError(err))
    })
  }

  sync = (payload) => dispatch => {
    dispatch(this.dataFetched(this.callTypes.DATA, payload))
  }

  save = (payload) => (dispatch) => {
    const from = "save";
    dispatch(this.startCall(this.callTypes.action, from));
    return this.sendIPC("save", payload)
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.action));
        dispatch(this.sync(payload))
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.log(error);

        dispatch(this.catchError(error.message, this.callTypes.action, from));
        return Promise.reject(error);
      });
  };



}

export const SettingsMasterSlice = new _BaseSlice(
  reducerInfo.name,
  {
    loading: false,
    list: null,
    error: null
  },
  {
    DATA: 'getAll',
  },
  {
    reIniState: (state, action) => {
      for (const k in state) {
        state[k] = this.initialState[k]
      }
    },
    catchError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    startCall: (state, action) => {
      const callType = action.payload.callType
      state.error = null
      state.loading = callType ?? true
    },
    stopCall: (state, action) => {
      state.error = null
      state.loading = false
    },
    dataFetched: (state, action) => {
      const { callType, data } = action.payload
      if(state.list){
          let clone = [...state.list]
          clone = clone.map(x => {
            console.log(888 , x.id)
            if(data.id === x.id){
              return data
            }
            return x
          })
          state.list = clone
      }else{
        state.list = data
      }
      state.loading = false
    },
  }
)

export const SettingsMasterActions = new Actions(reducerInfo.name, SettingsMasterSlice)
