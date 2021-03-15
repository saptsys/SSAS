import { Tag, Tooltip } from "antd"
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { LayoutActions } from "../_redux/actionFiles/LayoutRedux"

export function registerShortcuts(dispatch, shortcuts) {
  const handler = (event) => {
    shortcuts.forEach((shortcut) => {
      shortcut.key.split(" ").join("").split("|").forEach(possibleKey => {
        const keys = possibleKey.split('+')
        if (keys.includes('ctrl') ? (event.ctrlKey && keys.includes(event.key)) : keys.includes(event.key)) {
          if (!shortcut.method()) //if you do not want to prevent default return true in your method
            event.preventDefault()
        }
      })
    })
  }
  const info = shortcuts.map((x, i) => (
    <Tooltip style={{ zIndex: 1069 }}
      placement="topRight"
      title={`Shortcut Key : Press these keys on key board to execute or click here to execute`} key={i}>
      <Tag color="gold"
        onClick={x.method}
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          padding: '0 2px',
          fontSize: '8pt'
        }} >
        {x.title}
      </Tag>
    </Tooltip>
  )
  )
  dispatch(LayoutActions.setInformation(info))
  document.addEventListener('keydown', handler)
  return () => {
    document.removeEventListener('keydown', handler)
    dispatch(LayoutActions.setInformation(""))
  }
}

export const RegisterShortcutsWithComponent = ({ shortcuts, name }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    return registerShortcuts(dispatch, shortcuts)
  }, [])
  return (<></>)
}
