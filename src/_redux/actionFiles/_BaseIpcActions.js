import _BaseSlice from "./_BaseSlice";

const promiseIpc = window.promiseIpc;

export default class _BaseIpcActions {
    /**
     * 
     * @param {string} ipcCallMaster 
     * @param {_BaseSlice} sliceObj 
     */
    constructor(ipcCallMaster, sliceObj) {
        this.sendIPC = (endPoint , payload) => promiseIpc.send(ipcCallMaster + '/' + endPoint , payload)
        this.actions = sliceObj.slice.actions
        this.callTypes = sliceObj.callTypes
        this.reducerName = sliceObj.slice.name
    }

    reIniState = () => dispatch => {
        dispatch(this.actions.reIniState({}))
        return Promise.resolve()
    }

    getAll = () => dispatch => {
        dispatch(this.actions.startCall({ callType: this.callTypes.list }))
        return this.sendIPC('getAll')
            .then(res => {
                if (res?.length) {
                    dispatch(this.actions.stopCall({ callType: this.callTypes.list }))
                    return Promise.resolve(res)
                } else {
                    dispatch(this.actions.catchError({ error: res, callType: this.callTypes.list }))
                }
            })
            .catch(error => {
                dispatch(this.actions.catchError({ error: error, callType: this.callTypes.list }))
            })
    }

    save = (payload) => dispatch => {
        dispatch(this.actions.startCall({ callType: this.callTypes.list }))
        this.sendIPC('save' , payload).catch(console.log)
        return this.sendIPC('save' , payload)
            .then(res => {
                if (res?.length) {
                    dispatch(this.actions.stopCall({ callType: this.callTypes.list }))
                    return Promise.resolve(res)
                } else {
                    dispatch(this.actions.catchError({ error: res, callType: this.callTypes.list }))
                }
            })
            .catch(error => {
                dispatch(this.actions.catchError({ error: error, callType: this.callTypes.actions }))
            })
    }
}