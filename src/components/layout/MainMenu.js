import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu

const MainMenu = () => {
    return (
        <Menu theme="light" mode="inline" className="menu" defaultSelectedKeys={window.location.pathname.split("/")}>

            <Menu.Item key="dashboard">Dashboard</Menu.Item>

            <SubMenu key="masters" title="Masters">
                <Menu.Item key="party-master">Party Master</Menu.Item>
                <SubMenu key="item" title="Item">
                    <Menu.Item key="item-group-master">Item Group Master</Menu.Item>
                    <Menu.Item key="item-master">Item Master</Menu.Item>
                    <Menu.Item key="unit-master">Unit Master</Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu key="transactions" title="Transactions">
                <SubMenu key="sales" title="Sales">
                    <Menu.Item key="sales-invoice">Sales Invoice</Menu.Item>
                </SubMenu>
                <SubMenu key="purchase" title="Purchase">
                    <Menu.Item key="purchase-invoice">Purchase Invoice</Menu.Item>
                </SubMenu>
                <Menu.Item key="delivery-challan">Delivery Challan</Menu.Item>
            </SubMenu>

            <SubMenu key="reports" title="Reports">
                <SubMenu key="delivery-challan-reports" title="Delivery Challan">
                    <Menu.Item key="delivery-challan-reports-item-wise">Item Wise</Menu.Item>
                    <Menu.Item key="delivery-challan-reports-party-wise">Item Wise</Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu key="utility" title="Utility">
                <Menu.Item key="firm-info">Firm/Company Info</Menu.Item>
                <Menu.Item key="settings">Settings</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default MainMenu;