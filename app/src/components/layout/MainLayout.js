import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Image, Layout, Menu, Row, Space, Tooltip } from 'antd';
const { Sider, Header, Content, Footer } = Layout
import './MainLayout.less'
import SubMenu from 'antd/lib/menu/SubMenu';
import logoSrc from "../../assets/images/logo-s-round.png"
import Text from 'antd/lib/typography/Text';
import moment from "moment";
import MainMenu from './MainMenu';

const MainLayout = ({ children }) => {
    const dispatch = useDispatch()
    const { LayoutState, FirmInfoState } = useSelector(state => ({
        LayoutState: state.Layout,
        FirmInfoState: {
            dbYear: state.FirmInfo.data?.databases?.find(x => x.id && x.active)?.year,
            firmName: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.name,
            gstin: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.gstin,
            address: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.address
        }
    }))

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
                    <Sider className="sider" id="aside-menu">
                        <Tooltip placement="right" title={<span>GSTIN: {FirmInfoState.gstin ?? "Not Available"}<br />Address: {FirmInfoState.address ?? "Not Available"}</span>}>
                            <div className="sider-header">
                                <Image src={logoSrc} />
                                <b>{FirmInfoState.firmName}</b>
                            </div>
                        </Tooltip>
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
                        <Content className="content" id="layout-main-content">
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
                        <Tooltip title="Financial year of loaded database" placement="top">
                            FY {FirmInfoState.dbYear}
                        </Tooltip>
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