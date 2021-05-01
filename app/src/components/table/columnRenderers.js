import React from "react";
import { DeleteTwoTone, EditTwoTone, PrinterTwoTone, ReloadOutlined,DownloadOutlined } from "@ant-design/icons";
import { Space, Tag, Tooltip } from "antd";

export const editColumnRenderer = (text, record, index, btnHandler) => (
  <Space align="center" style={{ cursor: 'pointer' }}>
    <Tooltip title="Edit this record" placement="left">
      <EditTwoTone style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }} onClick={() => btnHandler && btnHandler(text)} />
    </Tooltip>
  </Space>
)

export const deleteColumnRenderer = (text, record, index, btnHandler) => (
  <Space align="center" style={{ cursor: 'pointer' }}>
    <Tooltip title="Delete this record" placement="left">
      <DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }} twoToneColor="red" onClick={() => btnHandler && btnHandler(text, record, index)} />
    </Tooltip>
  </Space>
)

export const isActiveColumnRenderer = (text, record, index) => (
  <Space align="center" style={{ cursor: 'pointer' }} >
    {text ? <Tag color="success" >Yes</Tag> : <Tag color="error">No</Tag>}
  </Space>
)


export const resetColumnRenderer = (text, record, index, btnHandler) => (
  <Space align="center" style={{ cursor: 'pointer' }}>
    <Tooltip title="Reset To Default" placement="left">
      <ReloadOutlined style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }} onClick={() => btnHandler && btnHandler(text, record)} />
    </Tooltip>
  </Space>
)


export const printColumnRenderer = (text, record, index, btnHandler) => (
  <Space align="center" style={{ cursor: 'pointer' }}>
    <Tooltip title="Click to Print" placement="left">
      <PrinterTwoTone style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }}  onClick={() => btnHandler && btnHandler(text, record, index)} />
    </Tooltip>
  </Space>
)

export const downloadColumnRenderer = (text, record, index, btnHandler) => (
  <Space align="center" style={{ cursor: 'pointer' }}>
    <Tooltip title="Click to Download" placement="left">
      <DownloadOutlined style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }}  onClick={() => btnHandler && btnHandler(text, record, index)} />
    </Tooltip>
  </Space>
)
