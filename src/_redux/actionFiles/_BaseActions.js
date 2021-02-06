import { errorMessageFormatter, sortArray, sortByStandard } from "../_commons/Utils"
const promiseIpc = window.promiseIpc;

export default class _BaseActions {
    constructor(ipcCallMaster, sliceObj) {
        this.sendIPC = (endPoint) => promiseIpc.send(ipcCallMaster + '.' + endPoint)
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
                if (res?.status) {
                    return Promise.resolve(res.data)
                } else {
                    const err = {
                        userMessage: errorMessageFormatter(res.data),
                        error: res.data
                    }
                    dispatch(this.actions.catchError({ error: err, callType: this.callTypes.list }))
                }
            })
            .catch(error => {
                dispatch(this.actions.catchError({ error: error.message, callType: this.callTypes.list }))
            })
    }
}