import { DownOutlined, EditTwoTone } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import { searchInArray } from '../../../helpers/arrayManipulation';

const CommonTable = ({ columns, dataSource, loading = false, filterText = "", editBtnHandler, deleteBtnHandler, rowKey = "id", style }) => {
    const filteredData = useMemo(() => searchInArray(dataSource, filterText), [dataSource, filterText])
    const finalColumns = [...columns.map(col => {
        return {
            ...col,
            filtered: !!filterText,
            sorter: true
        }
    }),
    {
        title: '',
        dataIndex: 'id',
        render: (text, record) => (
            <Space align="center" style={{ cursor: 'pointer' }}>
                <Tooltip title="Edit this record" placement="left">
                    <EditTwoTone style={{ fontSize: '20px', cursor: 'pointer', '&:hover': { color: "#000" } }} onClick={() => editBtnHandler && editBtnHandler(record[rowKey])} />
                </Tooltip>
            </Space>
        ),
        width: '35px'
    }
    ]
    return (
        <div id="common-table" style={style}>
            <Table
                rowKey={rowKey}
                columns={finalColumns}
                dataSource={filteredData}
                size="small"
                loading={!!loading}
                bordered
                pagination={{ pageSize: 10 }}
                sticky={true}
            />
        </div>

    );
};

export default CommonTable;