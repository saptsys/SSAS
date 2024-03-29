import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import { searchInArray } from '../../../helpers/arrayManipulation';
import { deleteColumnRenderer, editColumnRenderer, printColumnRenderer,downloadColumnRenderer } from '../../table/columnRenderers';
import './commonTable.less'

const CommonTable = ({
  columns,
  dataSource,
  loading = false,
  filterText = "",
  downloadBtnHandler,
  editBtnHandler,
  deleteBtnHandler,
  printBtnHandler,
  rowKey = "id",
  style,
  ...tableProps
}) => {
  const filteredData = useMemo(() => {
    let rederes = {}
    columns.forEach(col => {
      rederes[col.dataIndex] = col.render ? col.render : (a, b, c) => a
    })
    return dataSource.filter((row, rowIndex) => {
      return Object.keys(row).filter(f => rederes.hasOwnProperty(f)).some((field) => {
        return String(rederes[field](row[field], row, rowIndex))
          .toLowerCase()
          .includes(filterText.toLowerCase())
      })
    })
  }, [filterText, dataSource])
  let finalColumns = [
    {
      title: '#',
      dataIndex: rowKey,
      render: (text, row, index) => dataSource.indexOf(row) + 1,
      sorter: (a, b) => dataSource.indexOf(a) > dataSource.indexOf(b) ? -1 : 1,
      align: 'right',
      width: "7%",
    },
    ...columns.map(col => {
      return {
        filtered: !!filterText,
        sorter: (a, b) => a[col.dataIndex] > b[col.dataIndex] ? -1 : 1,
        ...col,
      }
    }),
  ]

  if (downloadBtnHandler) {
    finalColumns.push({
      title: '',
      dataIndex: rowKey,
      render: (text, row, index) => downloadColumnRenderer(text, row, index, downloadBtnHandler),
      width: '35px',
    })
  }

  if (printBtnHandler) {
    finalColumns.push({
      title: '',
      dataIndex: rowKey,
      render: (text, row, index) => printColumnRenderer(text, row, index, printBtnHandler),
      width: '35px',
    })
  }



  if (deleteBtnHandler) {
    finalColumns.push({
      title: '',
      dataIndex: rowKey,
      render: (text, row, index) => deleteColumnRenderer(text, row, index, deleteBtnHandler),
      width: '35px',
    })
  }

  if (editBtnHandler) {
    finalColumns.push({
      title: '',
      dataIndex: rowKey,
      render: (text, row, index) => editColumnRenderer(text, row, index, editBtnHandler),
      width: '35px'
    })
  }

  return (
    <div id="common-table" style={style}>
      <Table
        rowKey={rowKey}
        columns={finalColumns}
        dataSource={filteredData}
        size="small"
        loading={!!loading}
        bordered
        pagination={{ showQuickJumper: true, showSizeChanger: true, }}
        sticky={true}
        tableLayout='auto'
        {...tableProps}
      />
    </div>

  );
};

export default CommonTable;
