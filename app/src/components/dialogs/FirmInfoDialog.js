import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Form, Space, Button, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Regex from '../../../Constants/Regex';
import BorderedSwitch from '../form/BorderedSwitch';
import { AccountTypesDropdown, StatesDropdown } from '../modules/_common/CommonDropdowns';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { useDispatch } from 'react-redux';
import { FirmInfoActions } from '../../_redux/actionFiles/FirmInfoRedux';
import { errorDialog, successDialog } from '../../Helpers/dialogs';
import {
  app,
} from 'electron';


const FirmInfoDialog = ({ intialData }) => {
  const [form] = useForm()

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 15
    }
  };

  const dispatch = useDispatch()

  const gstinNumberChanged = (e) => {
    if (Regex.checkRegex(e.target.value, 'gstin')) {
      form.setFieldsValue({ stateCode: parseInt(e.target.value.substr(0, 2)) })
      form.setFieldsValue({ pan: (e.target.value.substr(2, 10)) })
    }
  }

  const [isOnline, setIsOnline] = useState(window.navigator.onLine)
  useEffect(() => {
    const offline = () => setIsOnline(false)
    const online = () => setIsOnline(true)
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  }, [window.navigator.onLine])

  const onFinish = (values) => {
    dispatch(FirmInfoActions.save(values)).then((res) => {
      if (res) {
        console.log(res)
        if (res.expired) {
          errorDialog("Your software is expired. please contact to support person.")
        } else {
          Modal.success({
            title: "Successfully created",
            content:  (res.licence_type === "TRIAL" ? "Currently running in trial mode" : "") + "Press OK to relaunch.",
            okText: "Re-Launch",
            onOk: () => dispatch(FirmInfoActions.relauch()),
          })
        }
      }
    }).catch(err => {
      errorDialog(err?.message)
    })
  }

  return (
    <div style={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>
      <Title level={4} type="primary" style={{ backgroundColor: "#eee" }} >Enter Your Firm Information</Title>

      <div style={{ padding: '10px 20px', flexGrow: '1' }}>
        {!isOnline && (
          <>
            <Text mark style={{ width: '100%' }}><b>Warning: </b>Internet is not connected to your system, please connect it first.</Text>
            <br />
          </>
        )}
        <br />
        <Form
          {...layout}
          name="basic"
          initialValues={{ ...(intialData ?? {}) }}
          onFinish={onFinish}
          labelAlign="left"
          form={form}
        >
          <Row>
            <Col span={11}>
              <Form.Item
                name="name"
                label="Company Name"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Company name here"
                  tabIndex="0"
                  autoFocus
                />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item
                name="gstin"
                label="GSTIN"
                rules={[{ pattern: Regex.gstin, message: 'GSTIN is not valid' }, { required: true }]}
                required
              >
                <Input placeholder="GSTIN here" onChange={gstinNumberChanged} tabIndex="2" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item name="address" label="Address">
                <TextArea
                  rows={4}
                  tabIndex="4"
                  placeholder="Compnay address here"
                />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item
                name="pan"
                label="PAN"
                rules={[{ pattern: Regex.pan, message: 'PAN is not valid' }]}
              >

                <Input tabIndex="3" placeholder="PAN here" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ pattern: Regex.email }]}>
                <Input tabIndex="9" placeholder="E-mail address here" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item name="city" label="City">
                <Input tabIndex="5" placeholder="City here" />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item name="mobile" label="Mobile">
                <Input tabIndex="7" placeholder="Mobile here" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <StatesDropdown
                name="stateCode"
                label="State"
                required
                rules={[{ required: true }]}
                propsForSelect={{ tabIndex: "6", placeholder: "Select state" }}
              />
            </Col>
            <Col span={11} offset={2}>
              <Form.Item
                name="phone"
                label="Phone"
              >
                <Input tabIndex="8" placeholder="Phone number here" />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" style={{ width: '100px' }} onClick={form.submit}>SUBMIT</Button>
          </div>
        </Form>
      </div>
      <div style={{ backgroundColor: "#eee", textAlign: 'center' }} >
        <b>&copy; 2021 by <a href="saptsys.com">Saptsys.com</a></b>
        <br />
        <Space direction="horizontal" size={10}><b>Contact / Support:</b> <span>+917096823708</span>  <span>+919904021519</span>  <span>hello@saptsys.com</span></Space>
      </div>
    </div>
  );
};

export default FirmInfoDialog;
