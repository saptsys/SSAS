import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
  name: 'FirmInfo',
  model: {}
}

class Actions {
  /**
   *
   * @param {null} ipcCallMaster
   * @param {FirmInfoSlice} sliceObj
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

  getData = () => dispatch => {
    dispatch(this.startCall(this.callTypes.DATA))
    return this.sendIPC('getData').then(res => {
      if (res)
        dispatch(this.dataFetched(this.callTypes.DATA, res))
      else
        dispatch(this.catchError({ message: "Firm not found." }))
    }).catch(err => {
      dispatch(this.catchError(err))
    })
  }

  save = (payload) => (dispatch) => {
    dispatch(this.startCall(this.callTypes.SAVE));
    return this.sendIPC("save", payload)
      .then((res) => {
        dispatch(this.stopCall(this.callTypes.SAVE));
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.log(error);
        dispatch(this.catchError(error.message, this.callTypes.SAVE));
        return Promise.reject(error);
      });
  };
}

export const FirmInfoSlice = new _BaseSlice(
  reducerInfo.name,
  {
    loading: false,
    data: null,
    error: null
  },
  {
    DATA: 'getData',
    SAVE: 'saveData',
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
      state.data = {
        ...data,
        defaultFirm: data.firms.find(x => x.default),
      }
      state.loading = false
    },
  }
)
export const FirmInfoActions = new Actions(reducerInfo.name, FirmInfoSlice)
