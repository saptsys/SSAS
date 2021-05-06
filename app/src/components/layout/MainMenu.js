import React, { useEffect, useMemo } from 'react';
import { Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../_redux/actionFiles/LayoutRedux';
import { generateUrlChain, getTitleByUrl, MODULE_ROUTES } from '../../../Constants/routes';
const { SubMenu } = Menu

const MainMenu = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()



  const handleMenuClicked = ({ item, key, keyPath, domEvent }) => {
    dispatch(LayoutActions.clearAll()).then(() => {
      setTimeout(() => {
        const title = getTitleByUrl(key)
        dispatch(LayoutActions.setTitle(title))
        history.push(key)
      }, 10)
    })
  }

  useEffect(() => {
    const title = getTitleByUrl(location.pathname.split("#").join("")) ?? document.getElementsByClassName("ant-menu-item-selected")?.item(0)?.innerText
    dispatch(LayoutActions.setTitle(title))

    // const unListenHistory = history.listen((location, action) => {
    //   dispatch(LayoutActions.setTitle(null))
    //   dispatch(LayoutActions.setInformation(null))
    //   dispatch(LayoutActions.setMessage(null))
    //   dispatch(LayoutActions.setToolbar(null))
    //   dispatch(LayoutActions.clearAll(null))
    // })
    // return unListenHistory;

  }, [])
  return (
    <Menu
      theme="light"
      mode="inline"
      className="menu"
      selectedKeys={generateUrlChain(location.pathname.split("#").join(""))}
      defaultOpenKeys={generateUrlChain(location.pathname.split("#").join(""))}
      onClick={handleMenuClicked}
    >

      <Menu.Item key={MODULE_ROUTES.dashboard._path}>Dashboard</Menu.Item>

      <SubMenu key={MODULE_ROUTES.masters._path} title="Masters">
        <Menu.Item key={MODULE_ROUTES.masters.partyMaster._path}>Party Master</Menu.Item>
        <SubMenu key={MODULE_ROUTES.masters.item._path} title="Item">
          <Menu.Item key={MODULE_ROUTES.masters.item.itemGroupMaster._path}>Item Group Master</Menu.Item>
          <Menu.Item key={MODULE_ROUTES.masters.item.itemMaster._path}>Item Master</Menu.Item>
          <Menu.Item key={MODULE_ROUTES.masters.item.unitMaster._path}>Unit Master</Menu.Item>
        </SubMenu>
        <Menu.Item key={MODULE_ROUTES.masters.taxMaster._path}>Tax Master</Menu.Item>

      </SubMenu>

      <SubMenu key={MODULE_ROUTES.transactions._path} title="Transactions">
        <SubMenu key={MODULE_ROUTES.transactions.sales._path} title="Sales">
          <Menu.Item key={MODULE_ROUTES.transactions.sales.salesInvoice._path}>Sales Invoice</Menu.Item>
          <Menu.Item key={MODULE_ROUTES.transactions.sales.salesReturn._path}>Sales Return</Menu.Item>
        </SubMenu>
        <SubMenu key={MODULE_ROUTES.transactions.purchase._path} title="Purchase">
          <Menu.Item key={MODULE_ROUTES.transactions.purchase.purchaseInvoice._path}>Purchase Invoice</Menu.Item>
          <Menu.Item key={MODULE_ROUTES.transactions.purchase.purchaseReturn._path}>Purchase Return</Menu.Item>
        </SubMenu>
        <Menu.Item key={MODULE_ROUTES.transactions.deliveryChallan._path}>Delivery Challan</Menu.Item>
      </SubMenu>

      <SubMenu key={MODULE_ROUTES.reports._path} title="Reports">
        <SubMenu key={MODULE_ROUTES.transactions.purchase._path} title="GST">
          <Menu.Item
            key={MODULE_ROUTES.reports.gstr1._path}
            onClick={() => {
              promiseIpc.send("Reports/gstr1",{
                fromDate:"2000-04-14",
                toDate:"2121-04-14"
              })
            }}
          >
            GSTR1
          </Menu.Item>
          <Menu.Item
            key={MODULE_ROUTES.reports.gstr2._path}
            onClick={() => console.log(MODULE_ROUTES.reports.gstr2._title) }
          >
            GSTR2
          </Menu.Item>
        </SubMenu>
      </SubMenu>

      <SubMenu key={MODULE_ROUTES.utility._path} title="Utility">
        <Menu.Item key={MODULE_ROUTES.utility.firmInfo._path}>Firm/Company Info</Menu.Item>
        <Menu.Item key={MODULE_ROUTES.utility.settings._path}>Settings</Menu.Item>
        <Menu.Item key={MODULE_ROUTES.utility.import._path}>Database Migrations</Menu.Item>

      </SubMenu>
    </Menu>
  );
};

export default MainMenu;
