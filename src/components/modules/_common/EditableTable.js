import React, { Children, useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select } from 'antd';

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
  children,
  ...props }) => {
  const setVal = val => setCurrentCellValue({ [rowIndex]: { ...record, [dataIndex]: val } })
  const iniCurCell = () => { /*setCurrentCellValue({ [rowIndex]: { ...record } })*/ }
  const curCellVal = () => currentCellValue && currentCellValue[rowIndex] ? currentCellValue[rowIndex][dataIndex] : record[dataIndex]
  const elmToReturn =
    editor
      ? function () {
        const { type, onChange, getOptions, getCustomCoponent, ...elmProps } = editor
        switch (type) {
          case "number":
            return <Input
              type="number"
              value={curCellVal()}
              onChange={e => setVal(e.target.value) && onChange && onChange(e)}
              {...elmProps}
            />
          case "select":
            return <Select
              value={curCellVal()}
              onChange={val => setVal(val) && onChange && onChange(val)}
              options={getOptions(record, rowIndex, colIndex)}
              showAction="focus"
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
              {...elmProps}
            />
        }
      }()
      : children
  return (
    <td {...props} className={`${props.className} focus-index-${rowIndex}-${colIndex}`} onKeyDown={function (e) {
      if (e.key === "Enter") {
        const table = document.getElementById(tableId)
        if (table) {
          let nextRowIndex = 0
          let nextColIndex = 0
          if (rowIndex < rowsLength) {
            if (colIndex === colsLength - 1) {
              // if (rowIndex === rowsLength - 1) {
              //   addRow();
              //   return;
              // }
              nextRowIndex = rowIndex + 1
              nextColIndex = 0
            } else {
              nextColIndex = colIndex + 1
              nextRowIndex = rowIndex
            }
          }
          const next = table.querySelector(`.focus-index-${nextRowIndex}-${nextColIndex}`).querySelector('input')
          if (next) {
            // e.target.blur()
            saveData()
            setTimeout(() => {
              next.focus()
            }, 1)
          }
        }
      }
    }}>
      {elmToReturn}
    </td>
  )
}

const EditableTable = ({ name, columns, form, autoAddRow = null, beforeSave = (newRow, oldRow) => newRow }) => {
  const [currentCellValue, setCurrentCellValue] = useState()
  const saveRow = () => {
    if (currentCellValue) {
      let tmp = [...form.getFieldValue(name)]
      Object.keys(currentCellValue).forEach(r => {
        const beforeSaveRes = beforeSave(currentCellValue[r], tmp[r])
        if (beforeSaveRes)
          tmp[r] = beforeSaveRes
      })
      form.setFieldsValue({
        [name]: tmp
      })
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
    <Form.Item name={name} shouldUpdate={(a, b) => true}>
      {console.table(form.getFieldValue(name))}
      <Table
        id={name}
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={form.getFieldValue(name)}
        columns={columns.map((col, colIndex) => {
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
                editor: col.editor,
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
        rowKey="item"
      />
    </Form.Item>
  );
};

export default EditableTable;