import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Image, Layout, Menu, Row, Space } from 'antd';
const { Sider, Header, Content, Footer } = Layout
import './MainLayout.less'
import SubMenu from 'antd/lib/menu/SubMenu';
import logoSrc from "../assets/images/logo-sm.png"
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import moment from "moment";
import { LayoutActions } from '../_redux/actionFiles/LayoutRedux';

const MainLayout = () => {
    const dispatch = useDispatch()
    const LayoutState = useSelector(state => state.Layout)
    const [currentDateTime, setCurrentDateTime] = useState()
    useEffect(() => {
        dispatch(LayoutActions.setTitle("Hello This is Title"))
        dispatch(LayoutActions.setToolbar(<Button type="ghost">CLICK</Button>))
        dispatch(LayoutActions.setInformation("This is Info"))
        dispatch(LayoutActions.setMessage("This is Message"))

        const intrvl = setInterval(() => {
            setCurrentDateTime(moment(new Date()).format("hh:mm:ss A DD/MM/yyyy"))
        }, 1000)
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
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">Dashboard</Menu.Item>
                            <SubMenu key="2" title="Masters">
                                <Menu.Item key="3">Party Master</Menu.Item>
                                <Menu.Item key="4">Party Item Master</Menu.Item>

                                <SubMenu key="5" title="Sub Master">
                                    <Menu.Item key="6">A Master</Menu.Item>
                                    <Menu.Item key="7">B Item Master</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
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
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                        This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
                            This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />This is Content <br />
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