import React from "react";
import { Form, Input, Button, Switch } from "antd";

function ItemGroupMasterTable({ entityForEdit, saveBtnHandler, saveBtnRef }) {
  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
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
      <Form.Item name="name" label="Unit Name">
        <Input />
      </Form.Item>
      <Form.Item name="code" label="Unit Code">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="isActive" label="Active">
        <Switch defaultChecked={true} />
      </Form.Item>
      <Form.Item name="system" label="System">
        <Switch defaultChecked={false} />
      </Form.Item>

      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ItemGroupMasterTable;
