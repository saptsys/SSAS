import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
const { Sider, Header, Content, Footer } = Layout
import './MainLayout.less'
import PartyMaster  from  "./partyMaster/PartyMaster";
const MainLayout = () => {
    const LayoutState = useSelector(state => state.Layout)

    return (
        <Layout className="main-layout">
            <Content className="main-content">
                <Layout className="sub-layout">
                    <Sider className="sider">
                        this is siders
                    </Sider>
                    <Layout>
                        <Header className="header">This is Header</Header>
                        <Content className="content">
                            <PartyMaster/>
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <Footer className="main-footer">This is footer</Footer>
        </Layout>
    );
};

export default MainLayout;