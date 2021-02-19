import { Drawer } from 'antd';
import React from 'react';
import './commonEditDrawer.less'

const CommonEditDrawer = ({ children, width, visible, onClose }) => {
    return (
        <Drawer
            id="common-edit-drawer"
            width={width}
            onClose={onClose}
            visible={visible}
            destroyOnClose={true}
            title={null}
            closable={false}
        >
            {children}
        </Drawer>
    );
};

export default CommonEditDrawer;