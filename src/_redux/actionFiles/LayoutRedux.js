import _BaseSlice from "./_BaseSlice"

export const reducerInfo = {
    name: 'Layout',
}

const initialState = {
    title: "This is ini title",
}
const reducers = {
    /**
     * @param {initialState} state 
     */
    setTitle: (state, action) => {
        state.title = action.payload
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
}

export const LayoutSlice = new _BaseSlice(reducerInfo.name, initialState, {}, reducers)
export const LayoutActions = new Actions(LayoutSlice)