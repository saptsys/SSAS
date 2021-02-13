import React, { useEffect, useMemo } from 'react';
import { Menu } from 'antd';
import { generateUrlChain, getTitleByUrl, ROUTES } from '../../helpers/routes';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../_redux/actionFiles/LayoutRedux';
const { SubMenu } = Menu

const MainMenu = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()



    const handleMenuClicked = ({ item, key, keyPath, domEvent }) => {
        const title = getTitleByUrl(key) ?? domEvent.currentTarget.innerText
        dispatch(LayoutActions.setTitle(title))
        history.push(key)
    }

    useEffect(() => {
        const title = getTitleByUrl(location.pathname.replaceAll("#", "")) ?? document.getElementsByClassName("ant-menu-item-selected")?.item(0)?.innerText
        dispatch(LayoutActions.setTitle(title))
    }, [])
    return (
        <Menu
            theme="light"
            mode="inline"
            className="menu"
            selectedKeys={generateUrlChain(location.pathname.replaceAll("#", ""))}
            defaultOpenKeys={generateUrlChain(location.pathname.replaceAll("#", ""))}
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
                <Menu.Item key={ROUTES.masters.taxMaster._path}>Tax Master</Menu.Item>

            </SubMenu>

            <SubMenu key={ROUTES.transactions._path} title="Transactions">
                <SubMenu key={ROUTES.transactions.sales._path} title="Sales">
                    <Menu.Item key={ROUTES.transactions.sales.salesInvoice._path}>Sales Invoice</Menu.Item>
                </SubMenu>
                <SubMenu key={ROUTES.transactions.purchase._path} title="Purchase">
                    <Menu.Item key={ROUTES.transactions.purchase.purchaseInvoice._path}>Purchase Invoice</Menu.Item>
                </SubMenu>
                <Menu.Item key={ROUTES.transactions.deliveryChallan._path}>Delivery Challan</Menu.Item>
            </SubMenu>

            <SubMenu key={ROUTES.reports._path} title="Reports">
                <Menu.Item key={ROUTES.reports.deliveryChallan._path}>Delivery Challan</Menu.Item>
            </SubMenu>

            <SubMenu key={ROUTES.utility._path} title="Utility">
                <Menu.Item key={ROUTES.utility.firmInfo._path}>Firm/Company Info</Menu.Item>
                <Menu.Item key={ROUTES.utility.settings._path}>Settings</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default MainMenu;