import { createSlice } from "@reduxjs/toolkit"

export default class BaseSlice {
    constructor(reducerName, idFieldName, initialState = {}, callTypes = {}, extraReducers = {}) {
        this.initialState = {
            //whenever we getting bunch of records like getAll getAllBySomething....
            list: {
                loading: false,
                error: null
            },
            //whenever we making some actions like updating fetching single entity or deleting
            action: {
                loading: false,
                error: null
            },
            //whenever we making some other task etc.
            other: {
                loading: false,
                error: null
            },

            ...initialState
        }
        this.callTypes = {
            list: 'list',
            action: 'action',
            other: 'other',
            ...callTypes
        }
        const reducers = {
            reIniState: (state, action) => {
                for (const k in state) {
                    state[k] = this.initialState[k]
                }
            },
            catchError: (state, action) => {
                const callType = action.payload.callType
                state[callType].error = action.payload.error
                state[callType].loading = false
            },
            startCall: (state, action) => {
                const callType = action.payload.callType
                state[callType].error = null
                state[callType].loading = true
            },
            stopCall: (state, action) => {
                const callType = action.payload.callType
                state[callType].error = null
                state[callType].loading = false
            },
            ...extraReducers
        }
        this.slice = createSlice({
            name: reducerName,
            initialState: this.initialState,
            reducers: reducers
        })
        this.reducer = this.slice.reducer
    }
}