import React from "react";
import { Form, Input, Button, Switch } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { useDispatch } from "react-redux";
import { ItemGroupMasterActions } from "./../../../../_redux/actionFiles/ItemGroupMasterRedux";

function ItemGroupMasterTable({
  entityForEdit,
  saveBtnHandler,
  saveBtnRef,
  form,
}) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };
  const validateCode = (rule, value, callback) => {
    return dispatch(
      ItemGroupMasterActions.checkUnique({
        fields: { code: value },
        id: entityForEdit.id,
      })
    );
  };
  const layout = {
    labelCol: {
      span: 7,
      offset: 2,
    },
    wrapperCol: {
      span: 13,
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
      <Form.Item name="name" label="Name" required rules={[{ required: true }]}>
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

export default ItemGroupMasterTable;
