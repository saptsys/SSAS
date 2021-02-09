import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Image, Layout, Menu, Row, Space } from 'antd';
const { Sider, Header, Content, Footer } = Layout
import './MainLayout.less'
import SubMenu from 'antd/lib/menu/SubMenu';
import logoSrc from "../../assets/images/logo-sm.png"
import Text from 'antd/lib/typography/Text';
import moment from "moment";
import MainMenu from './MainMenu';

const MainLayout = ({ children }) => {
    const dispatch = useDispatch()
    const LayoutState = useSelector(state => state.Layout)

    const getFormattedTime = () => moment(new Date()).format("hh:mm A DD/MM/yyyy")

    const [currentDateTime, setCurrentDateTime] = useState(getFormattedTime())
    useEffect(() => {
        const intrvl = setInterval(() => {
            setCurrentDateTime(getFormattedTime())
        }, 60000)
        return () => {
            clearInterval(intrvl)
        }
    }, [])
    return (
        <Layout className="main-layout">
            <Content className="main-content">
                <Layout className="sub-layout">
                    <Sider className="sider">
                        <div className="sider-header">
                            <Image src={logoSrc} />
                            {/* <b>ABC PHOTO PVT LTD</b> */}
                        </div>
                        <MainMenu />
                    </Sider>
                    <Layout>
                        <Header className="header" >
                            <Row justify="space-around" align="middle">
                                <Col flex="auto">
                                    <Text className="header-title">{LayoutState.title}</Text>
                                </Col>
                                <Col flex="none">
                                    <Space>
                                        {LayoutState.toolbar}
                                    </Space>
                                </Col>
                            </Row>
                        </Header>
                        <Content className="content">
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <Footer className="main-footer">
                <Row>
                    <Col flex="none" style={{ padding: "0 5px" }}>
                        {LayoutState.information}
                    </Col>
                    <Col flex="auto" style={{ padding: "0 20px", textAlign: 'center' }}>
                        {LayoutState.message}
                    </Col>
                    <Col flex="none" style={{ padding: "0 5px" }}>
                        {currentDateTime}
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};

export default MainLayout;