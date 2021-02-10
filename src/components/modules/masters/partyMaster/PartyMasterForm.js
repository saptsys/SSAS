import React from "react";
import { Form, Input, Button, Select, Switch, Tooltip, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";


function PartyMasterForm({ entityForEdit, saveBtnHandler, saveBtnRef }) {


  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 15,
      },
    },
  };

  return (
    <Form
      {...formItemLayout}
      name="basic"
      initialValues={entityForEdit}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Customer Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Customer Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Select>
                <Select.Option value="CUSTOMER">Customer</Select.Option>
                <Select.Option value="SUPPLIER">Supplier</Select.Option>
                <Select.Option value="BOTH">Both</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            {" "}
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Mobile" name="mobile">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>{" "}
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="State"
              name="stateCode"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Select value="GJ">
                <Select.Option value="GJ">Gujarat</Select.Option>
                <Select.Option value="ASM">Assam</Select.Option>
                <Select.Option value="KSHMR">Kashmir</Select.Option>
                <Select.Option value="TMLN">Tamilnadu</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Active" name="isActive">
              <Switch checked />
            </Form.Item>{" "}
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={
                <span>
                  GSTIN&nbsp;
                  <Tooltip title="Enter If Comapny is Registered">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="gstin"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="PAN" name="pan">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />ABCD<br />

      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PartyMasterForm;
