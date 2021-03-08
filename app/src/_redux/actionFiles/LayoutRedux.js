import _BaseSlice from "./_BaseSlice"

export const reducerInfo = {
    name: 'Layout',
}

const initialState = {
    title: "",
    toolbar: null,
    information: null,
    message: null
}
const reducers = {
    /**
     * @param {initialState} state 
     */
    setTitle: (state, action) => {
        state.title = action.payload
    },
    setToolbar: (state, action) => {
        state.toolbar = action.payload
    },
    setStatusbar: (state, action) => {
        switch (action.payload.type) {
            case "info":
                state.information = action.payload.content
                break;
            case "msg":
                state.message = action.payload.content
                break;
            default:
                break;
        }
    }
}

class Actions {
    /**
     * @param {_BaseSlice} sliceObj 
     */
    constructor(sliceObj) {
        this.actions = sliceObj.slice.actions
    }

    setTitle = (text) => dispatch => {
        dispatch(this.actions.setTitle(text))
    }

    setToolbar = (content) => dispatch => {
        dispatch(this.actions.setToolbar(content))
    }

    setInformation = (content) => dispatch => {
        dispatch(this.actions.setStatusbar({ content: content, type: 'info' }))
    }

    setMessage = (content) => dispatch => {
        dispatch(this.actions.setStatusbar({ content: content, type: 'msg' }))
    }


}

export const LayoutSlice = new _BaseSlice(reducerInfo.name, initialState, {}, reducers)
export const LayoutActions = new Actions(LayoutSlice)