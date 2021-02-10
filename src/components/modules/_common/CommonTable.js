import { Table } from 'antd';
import React, { useMemo } from 'react';
import { searchInArray } from '../../../helpers/arrayManipulation';
import './CommonTable.less'

const CommonTable = ({ columns, dataSource, loading = false, filterText = "" }) => {
    const filteredData = useMemo(() => searchInArray(dataSource, filterText), [dataSource, filterText])
    return (
        <div id="common-table">
            <Table
                rowKey="id"
                columns={columns.map(col => {
                    return {
                        ...col,
                        filtered: !!filterText
                    }
                })}
                dataSource={filteredData}

                size="small"
                loading={loading}
                bordered
                pagination={{ pageSize: 50 }}
                sticky={true}
            // scroll={{ y: document.getElementById("layout-main-content").clientHeight - (document.getElementsByClassName("ant-table-thead")[0]?.clientHeight ?? 40) - (document.getElementsByClassName("ant-pagination")[0]?.clientHeight ?? 25) - 35 }}
            // scroll={{ y: "250" }}
            />
        </div>

    );
};

export default CommonTable;