import React from "react";
import { Form, Input, Button, Select, Switch, Tooltip, Row, Col, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true, ...(entityForEdit ?? {}) }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item name="name" label="Customer Name">
        <Input />
      </Form.Item>

      <Form.Item name="type" label="Type" required>
        <Select
          showSearch
          optionFilterProp="label"
          mode="multiple"
          options={[
            { label: 'Sundry Debtor', value: "CUSTOMER" },
            { label: 'Sundry Creditor', value: "SUPPLIER" },
            { label: 'Both', value: "BOTH" }
          ]} />

        {/* <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          <Option value="SUPPLIER">Sundry Creditor</Option>
          <Option value="CUSTOMER">Sundry Debtor</Option>
          <Option value="BOTH">Both</Option>
        </Select> */}
      </Form.Item>

      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PartyMasterForm;
