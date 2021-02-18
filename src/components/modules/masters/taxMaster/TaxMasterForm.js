import React from "react";
import { Form, Input, Button, Switch, InputNumber } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { useDispatch } from "react-redux";
import { TaxMasterActions } from "./../../../../_redux/actionFiles/TaxMasterRedux";

function TaxMasterForm({ entityForEdit, saveBtnHandler, saveBtnRef, form }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const validateCode = (rule, value, callback) => {
    return dispatch(
      TaxMasterActions.checkUnique({
        fields: { code: value },
        id: entityForEdit.id,
      })
    );
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
      labelAlign="left"
      form={form}
      validateMessages={validateMsgs}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="Code"
        validateTrigger="onBlur"
        rules={[{ validator: validateCode }]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item
        name="taxPercentage"
        label="Percentage"
        rules={[{ type: "number", min: 0, max: 100 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="isActive"
        valuePropName="checked"
        label="Active"
        className="form-item-bordered-switch"
      >
        <Switch />
      </Form.Item>

      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TaxMasterForm;
