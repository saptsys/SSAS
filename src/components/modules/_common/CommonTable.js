import { Table } from 'antd';
import React, { useMemo } from 'react';
import { searchInArray } from '../../../helpers/arrayManipulation';

const CommonTable = ({ columns, dataSource, loading = false, filterText = "", editBtnHandler, deleteBtnHandler, rowKey = "id", style }) => {
    const filteredData = useMemo(() => searchInArray(dataSource, filterText), [dataSource, filterText])
    const finalColumns = columns.map(col => {
        return {
            ...col,
            filtered: !!filterText,
            sorter: true
        }
    })
    return (
        <div id="common-table" style={style}>
            <Table
                rowKey={rowKey}
                columns={finalColumns}
                dataSource={filteredData}
                size="small"
                loading={loading}
                bordered
                pagination={{ pageSize: 10 }}
                sticky={true}
            />
        </div>

    );
};

export default CommonTable;