import React, { Children, useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select } from 'antd';

import './editableTable.less'


const EditableCell = ({ saveData, currentCellValue, setCurrentCellValue, dataIndex, record, rowIndex, colIndex, editor, children, ...props }) => {
  const setVal = val => setCurrentCellValue({ [rowIndex]: { ...record, [dataIndex]: val } })
  const iniCurCell = () => { setCurrentCellValue({ [rowIndex]: { ...record } }) }
  const curCellVal = () => currentCellValue && currentCellValue[rowIndex] ? currentCellValue[rowIndex][dataIndex] : record[dataIndex]
  const commonClasses = "row-" + rowIndex
  const elmToReturn =
    editor
      ? function () {
        switch (editor.type) {
          case "number":
            return <InputNumber
              value={curCellVal()}
              onChange={val => setVal(val)}
              onFocus={e => iniCurCell()}
              className={commonClasses}
              // onBlur={() => {
              //   saveData()
              // }}
            />
          case "select":
            return <Select
              value={curCellVal()}
              onChange={val => setVal(val)}
              options={editor.getOptions(record, rowIndex, colIndex)}
              onFocus={e => iniCurCell()}
              className={commonClasses}
              // onBlur={() => {
              //   saveData()
              // }}
            />
          default:
            return <Input
              value={curCellVal()}
              onChange={e => setVal(e.target.value)}
              onFocus={e => iniCurCell()}
              className={commonClasses}
              // onBlur={() => {
              //   saveData()
              // }}
            />
        }
      }()
      : children
  return (
    <td {...props}>
      {elmToReturn}
    </td>
  )
}

const EditableTable = ({ name, columns, form }) => {
  const [currentCellValue, setCurrentCellValue] = useState()

  const saveRow = () => {
    if (currentCellValue) {
      form.setFieldsValue({
        [name]: form.getFieldValue(name).map((r, index) => {
          if (currentCellValue[index]) {
            r = { ...currentCellValue[index] }
          }
          return r;
        })
      })
      setCurrentCellValue(null)
    }
  }
  return (
    <Form.Item name={name} shouldUpdate={true}>
      {console.log(form.getFieldValue(name))}

      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={form.getFieldValue(name)}
        columns={columns.map((col, colIndex) => {
          return {
            ...col,
            onCell: (record, rowIndex) => {
              return {
                saveData: saveRow,
                currentCellValue,
                setCurrentCellValue,
                dataIndex: col.dataIndex,
                record,
                rowIndex,
                colIndex,
                editor: col.editor,
                ...(col?.onCell ? col.onCell(record, rowIndex) : {})
              }
            }
          }
        })}
        // onRow={() => ({ onBlur: saveRow })}
        rowClassName="editable-row"
        size="small"
        pagination={false}
      />
    </Form.Item>
  );
};

export default EditableTable;