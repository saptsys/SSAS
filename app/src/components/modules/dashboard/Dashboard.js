import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';
import { DashboardActions } from '../../../_redux/actionFiles/DashboardRedux';

import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LayoutActions.setTitle("Dashboard"))
    dispatch(DashboardActions.getStats()).then(console.log)
  }, [])
  return (
    <div style={{  padding: "20px",background: "#ececec" }}>
      <Row gutter={24}>
        <Col span={6}>
          <Card size="small" title="Chalan">
            <Row justify="space-around">
              <Col>
                <Statistic
                  title="Count"
                  value={10}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Value"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="Sales">
            <Row justify="space-around">
              <Col>
                <Statistic
                  title="Count"
                  value={10}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Value"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="Purchase">
            <Row justify="space-around">
              <Col>
                <Statistic
                  title="Count"
                  value={10}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Value"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
