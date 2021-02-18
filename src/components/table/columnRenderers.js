import React from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
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
            <DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }} twoToneColor="red" onClick={() => btnHandler && btnHandler(text)} />
        </Tooltip>
    </Space>
)

export const isActiveColumnRenderer = (text, record, index) => (
    <Space align="center" style={{ cursor: 'pointer' }} >
        {text ? <Tag color="success" >Yes</Tag> : <Tag color="error">No</Tag>}
    </Space>
)