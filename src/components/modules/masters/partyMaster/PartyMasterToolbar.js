import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';

const PartyMasterToolbar = ({ createBtnHandler, searchHandler }) => {
    return (
        <Space>
            <Input
                placeholder="Search in all fields"
                suffix={<SearchOutlined type="" style={{ fontSize: 16, color: '#444', }} />}
                onChange={(e) => searchHandler(e.target.value)}
            />
            <Button type="primary" onClick={createBtnHandler}>Create</Button>
        </Space>
    );
};

export default PartyMasterToolbar;