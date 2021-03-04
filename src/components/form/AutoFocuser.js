import React, { useEffect } from 'react';

const AutoFocuser = ({ children, lastElement }) => {
  useEffect(() => {
    const mainDiv = document.getElementById(`auto-focuser`)

    const keyUpEvent = (event) => {
      if (event.key === "Enter") {
        event.target.blur()
        if (event.target.tagName === "TEXTAREA" && (event.target.innerHTML !== "" && event.target.innerHTML.substr(-1) !== "\n"))
          return;
        if (event.target.dataset.focustable) {
          const [tableId, cellIndex = 0] = event.target.dataset.focustable.split(":")
          const rowsLen = mainDiv.querySelectorAll(`#${tableId} tbody tr`).length
          if (rowsLen > 0) {
            const selector = `#${tableId} tbody tr .focus-index-${rowsLen - 1}-${cellIndex} input,select,textarea`
            const nxt = mainDiv.querySelector(selector)
            nxt.focus()
          }
          return;
        }
        if (event.target.attributes.tabindex) {
          const nextElm = mainDiv.querySelectorAll(`[tabindex='${parseInt(event.target.attributes.tabindex.value) + 1}']`).item(0)
          if (nextElm) {
            nextElm.focus()
            if (nextElm.tagName === "INPUT" || nextElm.tagName === "TEXTAREA") {
              nextElm.select()
              nextElm.selectionStart = nextElm.selectionEnd = nextElm.value.length;
            }
            event.preventDefault()
          } else {
            if (lastElement) {
              event.preventDefault()
              document.querySelector(lastElement)?.focus()
            }
          }
        }
      }
    }


    mainDiv?.addEventListener('keydown', keyUpEvent)
    return () => keyUpEvent ? mainDiv?.removeEventListener("keydown", keyUpEvent) : null
  }, [])
  return (
    <div id="auto-focuser">
      {children}
    </div>
  );
};

export default AutoFocuser;