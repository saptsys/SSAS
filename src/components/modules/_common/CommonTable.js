import { Table } from 'antd';
import React from 'react';
import './CommonTable.less'

const CommonTable = ({ columns, dataSource, loading = false }) => {
    return (
        <div id="common-table">
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                size="small"
                loading={loading}
                bordered
                pagination={{ pageSize: 50 }}
                scroll={{ y: document.getElementById("layout-main-content").clientHeight - (document.getElementsByClassName("ant-table-thead")[0]?.clientHeight ?? 40) - (document.getElementsByClassName("ant-pagination")[0]?.clientHeight ?? 25) - 35 }}
                // scroll={{ y: "250" }}
            />
        </div>

    );
};

export default CommonTable;