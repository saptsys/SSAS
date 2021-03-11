import React, { Children, useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import './editableTable.less'

export const getFirstFocusableCell = (tableId, rowIndex = 0, cellIndex = 0) => {
  return `.focus-index-${rowIndex}-${cellIndex} input`
}

const EditableCell = ({
  saveData,
  addRow,
  currentCellValue,
  setCurrentCellValue,
  dataIndex,
  record,
  rowIndex,
  colIndex,
  colsLength,
  rowsLength,
  tableId,
  editor,
  nextTabIndex,
  children,
  ...props }) => {
  const setVal = val => {
    currentCellValue = { [rowIndex]: { ...record, [dataIndex]: val } }
    setCurrentCellValue(currentCellValue)
  }
  const iniCurCell = () => { /*setCurrentCellValue({ [rowIndex]: { ...record } })*/ }
  const curCellVal = () => currentCellValue && currentCellValue[rowIndex] ? currentCellValue[rowIndex][dataIndex] : record[dataIndex]
  const elmToReturn = function () {
    const { type, onChange, getOptions, getCustomCoponent, ...elmProps } = editor
    switch (type) {
      case "number":
        return <Input
          step={undefined}
          value={curCellVal()}
          onChange={e => setVal((e.target.value)) && onChange && onChange(e)}
          size="small"
          style={{textAlign:'right'}}
          {...elmProps}
        />
      case "select":
        return <Select
          value={curCellVal()}
          onChange={val => {
            setVal(val) && onChange && onChange(val)
          }}
          options={getOptions(record, rowIndex, colIndex)}
          showAction="focus"
          size="small"
          defaultActiveFirstOption={false}
          {...elmProps}
        />
      case "custom":
        return function () {
          const copm = getCustomCoponent(record, rowIndex, colIndex)
          return (<copm
            value={curCellVal()}
            onChange={val => setVal(val) && onChange && onChange(val)}
          />)
        }()
      default:
        return <Input
          value={curCellVal()}
          onChange={e => setVal(e.target.value) && onChange && onChange(e)}
          size="small"
          {...elmProps}
        />
    }
  }

  const focusCell = (rowI, colI) => {
    const table = document.getElementById(tableId)
    if (table) {
      let next = table.querySelector(`.focus-index-${rowI}-${colI}`)?.querySelector('input')
      if (next) {
        // e.target.blur()
        saveData()
        setTimeout(() => {
          next.focus()
        }, 1)
      }
    }
  }

  return editor ? (
    <td {...props} className={`${props.className} focus-index-${rowIndex}-${editor.editorColIndex}`} onKeyDown={function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        let nextRowIndex = 0
        let nextColIndex = 0
        if (rowIndex < rowsLength) {
          if (editor.editorColIndex === editor.editorColsLength - 1) {
            if (rowIndex === rowsLength - 1) {
              addRow();
              setTimeout(() => {
                focusCell(rowsLength, 0)
              }, 1)
              // saveData()
              // return;
            }
            nextRowIndex = rowIndex + 1
            nextColIndex = 0
          } else {
            nextColIndex = editor.editorColIndex + 1
            nextRowIndex = rowIndex
          }
        }

        if (rowIndex === rowsLength - 1 && editor.editorColIndex === 0 && !((currentCellValue ? currentCellValue[rowIndex] : record)[dataIndex])) {
          const next = document.querySelector(`[tabindex='${nextTabIndex}']`)
          next.focus()
        }
        else
          focusCell(nextRowIndex, nextColIndex)
      }
    }}>
      {elmToReturn()}
    </td>
  )
    : (
      <td {...props}>
        {children}
      </td>
    )
}

const EditableTable = ({ name, columns, form, nextTabIndex, autoAddRow = null, afterSave, beforeSave = (newRow, oldRow) => newRow }) => {
  const [currentCellValue, setCurrentCellValue] = useState()
  const saveRow = () => {
    if (currentCellValue) {
      let tmp = [...form.getFieldValue(name)]
      let newRow, oldRow;
      Object.keys(currentCellValue).forEach(r => {
        oldRow = tmp[r]
        const beforeSaveRes = beforeSave(currentCellValue[r], oldRow)
        newRow = beforeSaveRes
        tmp[r] = beforeSaveRes
      })
      form.setFieldsValue({
        [name]: tmp
      })
      if (afterSave)
        afterSave(newRow, oldRow, tmp)
      setCurrentCellValue(null)
    }
  }
  const addRow = () => {
    const tmp = [
      ...form.getFieldValue(name),
      { ...autoAddRow }
    ]
    form.setFieldsValue({
      [name]: tmp
    })
  }
  return (
    <Form.Item wrapperCol={24} labelCol={0} className="editable-table-wrapper" shouldUpdate={(a, b) => a[name] !== b[name]}>
      {() => (
        <Form.Item wrapperCol={24} labelCol={0} name={name}>
          <Table
            className="editable-table"
            id={name}
            footer={columns.some(x => !!x.footer) ? () => (
              <table className=" ">
                <thead className="ant-table-thead">
                  <tr>
                    {
                      columns.map((col, i) => (
                        <th style={{ textAlign: col.align ?? 'left' }} key={i} width={col.width}>{col.footer ? col.footer(form.getFieldValue(name)) : null}</th>
                      ))
                    }
                  </tr>
                </thead>
              </table>
            ) : undefined}
            components={{ body: { cell: EditableCell } }}
            dataSource={form.getFieldValue(name)}
            columns={columns.map((col, colIndex) => {
              const editorCols = col.editor ? Object.values(columns).filter(x => x.editor).map(x => x.dataIndex) : []
              return {
                ...col,
                onCell: (record, rowIndex) => {
                  return {
                    saveData: saveRow,
                    addRow: addRow,
                    currentCellValue,
                    setCurrentCellValue,
                    dataIndex: col.dataIndex,
                    record,
                    rowIndex,
                    colIndex,
                    colsLength: columns.length,
                    rowsLength: form.getFieldValue(name)?.length ?? 0,
                    tableId: name,
                    nextTabIndex,
                    editor: col.editor ? { ...col.editor, editorColIndex: editorCols.indexOf(col.dataIndex), editorColsLength: editorCols.length } : undefined,
                    ...(col?.onCell ? col.onCell(record, rowIndex) : {})
                  }
                }
              }
            })}
            onRow={(record, rowIndex) => ({
              onBlur: () => currentCellValue && currentCellValue[rowIndex] && saveRow(),
              onFocus: () => currentCellValue && currentCellValue[rowIndex] && setCurrentCellValue({ [rowIndex]: { ...record } })
            })}
            rowClassName="editable-row"
            size="small"
            pagination={false}
            sticky
            bordered
          />
          {autoAddRow && <Button onClick={() => addRow()} className="add-row-btn" type="dashed" size="small" icon={<PlusCircleTwoTone />}>Add New Row</Button>}
        </Form.Item>
      )}
    </Form.Item>
  );
};

export default EditableTable;
