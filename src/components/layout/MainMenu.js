import React, { useMemo } from 'react';
import { Menu } from 'antd';
import { generateUrlChain, ROUTES } from '../../helpers/routes';
import { useHistory } from 'react-router-dom';
const { SubMenu } = Menu

const MainMenu = () => {
    const history = useHistory()
    const handleMenuClicked = ({ item, key, keyPath, domEvent }) => {
        history.push(key)
    }
    return (
        <Menu
            theme="light"
            mode="inline"
            className="menu"
            defaultSelectedKeys={window.location.hash.replaceAll("#","")}
            defaultOpenKeys={generateUrlChain(window.location.hash.replaceAll("#",""))}
            onClick={handleMenuClicked}
        >

            <Menu.Item key={ROUTES.dashboard._path}>Dashboard</Menu.Item>

            <SubMenu key={ROUTES.masters._path} title="Masters">
                <Menu.Item key={ROUTES.masters.partyMaster._path}>Party Master</Menu.Item>
                <SubMenu key={ROUTES.masters.item._path} title="Item">
                    <Menu.Item key={ROUTES.masters.item.itemGroupMaster._path}>Item Group Master</Menu.Item>
                    <Menu.Item key={ROUTES.masters.item.itemMaster._path}>Item Master</Menu.Item>
                    <Menu.Item key={ROUTES.masters.item.unitMaster._path}>Unit Master</Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu key={ROUTES.transactions._path} title="Transactions">
                <SubMenu key={ROUTES.transactions.sales._path} title="Sales">
                    <Menu.Item key={ROUTES.transactions.sales.salesInvoice._path}>Sales Invoice</Menu.Item>
                </SubMenu>
                <SubMenu key={ROUTES.transactions.purchase._path} title="Purchase">
                    <Menu.Item key={ROUTES.transactions.purchase.purchaseInvoice._path}>Purchase Invoice</Menu.Item>
                </SubMenu>
                <Menu.Item key={ROUTES.transactions.deliveryChallan}>Delivery Challan</Menu.Item>
            </SubMenu>

            <SubMenu key={ROUTES.reports._path} title="Reports">
                <SubMenu key={ROUTES.reports.deliveryChallan._path} title="Delivery Challan">
                    <Menu.Item key={ROUTES.reports.deliveryChallan.itemWise._path}>Item Wise</Menu.Item>
                    <Menu.Item key={ROUTES.reports.deliveryChallan.partyWise._path}>Item Wise</Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu key={ROUTES.utility._path} title="Utility">
                <Menu.Item key={ROUTES.utility.firmInfo._path}>Firm/Company Info</Menu.Item>
                <Menu.Item key={ROUTES.utility.settings._path}>Settings</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default MainMenu;