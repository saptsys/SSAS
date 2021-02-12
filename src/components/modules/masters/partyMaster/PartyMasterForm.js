import React from "react";
import { Form, Input, Button, Select, Switch, Tooltip, Row, Col, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import States from "../../../../../Constants/States";

const { Option } = Select
function PartyMasterForm({ entityForEdit, saveBtnHandler, saveBtnRef }) {


  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 15
    }
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true, ...(entityForEdit ?? {}) }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
    >

      <Row>
        <Col span={11}>
          <Form.Item name="name" label="Customer Name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="type" label="Type" required >
            <Select
              showSearch
              optionFilterProp="label"
              options={[
                { label: 'Sundry Debtors', value: "CUSTOMER" },
                { label: 'Sundry Creditors', value: "SUPPLIER" },
                { label: 'Both', value: "BOTH" }
              ]} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>

          <Form.Item name="address" label="Address">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="gstin" label="GSTIN">
            <Input />
          </Form.Item>
          <Form.Item name="pan" label="PAN">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="mobile" label="Mobile">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="state" label="State">
            <Select
              showSearch
              optionFilterProp="label"
              options={States.map(x => ({ label: x.stateName + ` (${x.code})`, value: x.tin }))}
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11} >
          <Form.Item name="isActive" label="Active" wrapperCol={{ style: { border: '1px solid #ddd' } }}>
            <Switch />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Col>
      </Row>



      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PartyMasterForm;
