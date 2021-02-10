import _BaseSlice from "./_BaseSlice";

const promiseIpc = window.promiseIpc;

export default class _BaseIpcActions {
    /**
     * 
     * @param {string} ipcCallMaster 
     * @param {_BaseSlice} sliceObj 
     */
    constructor(ipcCallMaster, sliceObj) {
        this.sendIPC = (endPoint, payload) => promiseIpc.send(ipcCallMaster + '/' + endPoint, payload)
        this.actions = sliceObj.slice.actions
        this.callTypes = sliceObj.callTypes
        this.reducerName = sliceObj.slice.name

        this.startCall = (calltype, from = null) => this.actions.startCall({ callType: calltype, from: from })
        this.stopCall = (calltype, from = null) => this.actions.stopCall({ callType: calltype, from: from })
        this.catchError = (error, calltype, from = null) => this.actions.catchError({ error: error, callType: this.callTypes.list, from: from })
    }

    reIniState = () => dispatch => {
        dispatch(this.actions.reIniState({}))
        return Promise.resolve()
    }

    getAll = () => dispatch => {
        const from = "getAll"
        dispatch(this.startCall(this.callTypes.list, from))
        return this.sendIPC('getAll')
            .then(res => {
                dispatch(this.stopCall(this.callTypes.list, from))
                return Promise.resolve(res)
            })
            .catch(error => {
                dispatch(this.catchError(error.message, this.callTypes.list, from))
            })
    }

    save = (payload) => dispatch => {
        const from = "save"
        dispatch(this.startCall(this.callTypes.action, from))
        return this.sendIPC('save', payload)
            .then(res => {
                dispatch(this.stopCall(this.callTypes.action, from))
                return Promise.resolve(res)
            })
            .catch(error => {
                dispatch(this.catchError(error.message, this.callTypes.action, from))
            })
    }

    getById = (id) => dispatch => {
        const from = "getById"
        dispatch(this.startCall(this.callTypes.action, from))
        return this.sendIPC('getById', id)
            .then(res => {
                dispatch(this.stopCall(this.callTypes.action, from))
                return Promise.resolve(res)
            })
            .catch(error => {
                dispatch(this.catchError(error.message, this.callTypes.action, from))
            })
    }
}