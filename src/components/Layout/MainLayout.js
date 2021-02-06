import React from 'react';
import { Affix, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import 'antd/dist/antd.css'

const MainLayout = ({ children }) => {
    return (
        <Layout>
            <Content>
                <Layout>
                    <Sider collapsible trigger={null}>
                        <Affix offsetTop={0} >
                            <Menu mode="inline" theme="dark">
                                <Menu.Item key="1">Dashboard</Menu.Item>
                                <SubMenu title="Master" key="2">
                                    <Menu.Item key="3">Item Master</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Affix>
                    </Sider>

                    <Layout>
                        <Header style={{ backgroundColor: "orange", height: "40px", lineHeight: '40px', paddingLeft: 0 }}><h3>This is Header</h3></Header>
                        <Content >This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr />This is Content<hr /></Content>
                    </Layout>
                </Layout>
            </Content>
            <Footer style={{ backgroundColor: "blue", color: "#eee", height: "20px", padding: 0, margin: 0, zIndex: "2" }}>This is Status bar  This is Status bar  This is Status bar  This is Status bar  This is Status bar  This is Status bar  This is Status bar  This is Status bar</Footer>
        </Layout>
    );
};

export default MainLayout;