import { Table } from 'antd';
import React, { useEffect, useMemo } from 'react';
import './CommonTable.less'

const CommonTable = ({ columns, dataSource, loading = false }) => {
    useEffect(() => {
        const h = document.getElementById("layout-main-content").clientHeight - (document.getElementsByClassName("ant-table-thead")[0]?.clientHeight ?? 40) - (document.getElementsByClassName("ant-pagination")[0]?.clientHeight ?? 25) - 35;
        document.querySelector("#table-body tbody").style.maxHeight = h
    }, [window.innerHeight])
    return (
        <div id="common-table">
            <Table
                rowKey="id"
                id="table-body"
                columns={columns}
                dataSource={dataSource}
                size="small"
                loading={loading}
                bordered
                pagination={{ pageSize: 50 }}
            // scroll={{ y: tableHeight }}
            // scroll={{ y: "250" }}
            />
        </div>

    );
};

export default CommonTable;