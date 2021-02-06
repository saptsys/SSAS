import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PartyMaster } from "../dbManager/models";
import { PartyMasterActions } from "./_redux/actionFiles/PartyMasterRedux";
import "./style.css"
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'


import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Test = () => {
  const dispatch = useDispatch()

  const PartyMasterState = useSelector(state => state.PartyMaster)
  const [parties, setParties] = useState([])
  const [collapsed , setCollapsed] = useState(false)
  useEffect(() => {
    dispatch(PartyMasterActions.getAll()).then(setParties)
  }, [])
  console.log("Sttate === ",PartyMasterState)
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Content style={{ margin: '16px 16px' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {JSON.stringify(parties)}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Designed By saptsys</Footer>
    </Layout>
  </Layout>
    
  );
};

export default Test;
