import React, { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';
import { DashboardActions } from '../../../_redux/actionFiles/DashboardRedux';

import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const Dashboard = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  useEffect(() => {
    dispatch(LayoutActions.setTitle("Dashboard"))
    dispatch(DashboardActions.getStats()).then(setData)
  }, [])
  return (
    <div style={{  padding: "20px",background: "#ececec" }}>
      <Row gutter={24}  justify="space-around">
        <Col span={6}>
          <Card size="small" title="Today's Challan">
            <Row justify="space-around">
              <Col>
                <Statistic
                  title="Count"
                  value={data.chalan?.count}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Value"
                  value={data.chalan?.value}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="Today's Sales">
            <Row justify="space-around">
              <Col>
                <Statistic
                  title="Count"
                  value={data.sales?.count}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Value"
                  value={data.sales?.value}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="Today's Purchase">
            <Row justify="space-around">
              <Col>
                <Statistic
                  title="Count"
                  value={data.purchase?.count}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col>
                <Statistic
                  title="Value"
                  value={data.purchase?.value}
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
