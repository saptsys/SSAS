import { Button, Input, Layout, Space } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutActions } from '../_redux/actionFiles/LayoutRedux';

const MainLayout = () => {
    const dispatch = useDispatch()
    const [val, setVal] = useState("")
    const { headerTitle } = useSelector(state => ({
        headerTitle: state.Layout.title
    }))
    return (
        <Layout>
            <Header>
                <Title style={{ color: "#eee" }}>{headerTitle}</Title>
            </Header>
            <Content style={{padding:"50px"}}>
                <Space size={10}>
                    <Input placeholder="Enter title here" value={val} onChange={e => setVal(e.target.value)} ></Input>
                    <Button onClick={() => {
                        dispatch(LayoutActions.setTitle(val))
                    }}>
                        Change Title
                    </Button>
                </Space>
            </Content>
        </Layout>
    );
};

export default MainLayout;