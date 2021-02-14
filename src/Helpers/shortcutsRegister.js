import { Tag, Tooltip } from "antd"
import React from 'react'
import { LayoutActions } from "../_redux/actionFiles/LayoutRedux"

export function registerShortcuts(dispatch, shortcuts) {
    const handler = (event) => {
        if (event.ctrlKey) {
            shortcuts.forEach((shortcut) => {
                const keys = shortcut.key.replaceAll(" ", "").split('+')
                if (keys.includes('ctrl') && keys.includes(event.key)) {
                    shortcut.method()
                    event.preventDefault()
                }
            })
        }
    }
    const info = shortcuts.map((x, i) => <Tooltip style={{zIndex:9999}} title="Click to execute"  key={i}><Tag color="warning" onClick={x.method} style={{ backgroundColor: 'rgba(0,0,0,.5)', padding: '0 2px', fontSize: '8pt' }} >{x.title}</Tag></Tooltip>)
    dispatch(LayoutActions.setInformation(info))
    document.addEventListener('keydown', handler)
    return () => {
        document.removeEventListener('keydown', handler)
        dispatch(LayoutActions.setInformation(""))
    }
}