import { Drawer } from 'antd';
import React from 'react';
import './commonEditDrawer.less'

const CommonEditDrawer = ({ children, width, visible, onClose }) => {
  const getWidth = (width) => {
    switch (width) {
      case "full":
        return ((window?.innerWidth ?? 0) - document.getElementById("aside-menu")?.clientWidth ?? 0)
      default:
        return width
    }
  }
  return (
    <Drawer
      id="common-edit-drawer"
      width={getWidth(width)}
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