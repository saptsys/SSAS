import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tooltip } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';

export const CommonToolbar = ({ createBtn, searchBar }) => {
    return (
        <Space>
            {
                searchBar && (
                    <Tooltip title="Search here" trigger={['hover','focus']} >
                        <Input
                            id="toolbar-search"
                            placeholder="Search in all fields"
                            suffix={<SearchOutlined type="" style={{ fontSize: 16, color: '#444', }} />}
                            onChange={(e) => searchBar(e.target.value)}
                        />
                    </Tooltip>
                )
            }
            {
                createBtn && (
                    <Button type="primary" onClick={createBtn} id="toolbar-create">Create</Button>
                )
            }

        </Space>
    );
};

function setupCommonToolBar(dis, handlers) {
    dis(LayoutActions.setToolbar(<CommonToolbar {...handlers} />))
}

export default setupCommonToolBar;