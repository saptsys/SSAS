import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';
import { DashboardActions } from '../../../_redux/actionFiles/DashboardRedux';

import { Statistic, Card, Row, Col, Space, Alert } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './dashboard.less'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MODULE_ROUTES } from '../../../../Constants/routes';


const Dashboard = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [dismisibleAlerts, setDismisibleAlerts] = useState([])

  useEffect(() => {
    dispatch(LayoutActions.setTitle("Dashboard"))
    dispatch(DashboardActions.getStats()).then(setData)
  }, [])

  const firmInfo = useSelector(s => s.FirmInfo.data)

  useEffect(() => {
    let alerts = []
    if (firmInfo) {
      if (firmInfo.isInTrialMode) {
        alerts.push({
          type: 'warning',
          title: <b>Software is in trial version.</b>,
          content: <span>{firmInfo.expiryLeftDays} days left to software trial period over. go to <Link to={MODULE_ROUTES.utility.firmInfo._path}>Utility {'>>'} Firm/Company Info</Link> for more info.</span>
        })
      } else if (firmInfo.expiryLeftDays <= 5) {
        alerts.push({
          type: 'warning',
          title: <b>{firmInfo.expiryLeftDays} days left to software expiry.</b>,
          content: <span>Go to <Link to={MODULE_ROUTES.utility.firmInfo._path}>Utility {'>>'} Firm/Company Info</Link> for more info.</span>
        })
      }
    }
    setDismisibleAlerts(alerts)
  }, [firmInfo])

  return (
    <div className="dashboard">

      {dismisibleAlerts.map((al, i) => (
        <Alert closable key={i} banner description={al.content} message={al.title} type={al.type ?? 'info'} style={{ margin: '15px 30px' }} />
      ))}

      <div style={{ padding: "20px", background: "#ececec" }}>
        <Row gutter={24} justify="space-around">
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
    </div>
  );
};

export default Dashboard;
