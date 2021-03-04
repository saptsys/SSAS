import React from "react";
import { Form, Input, InputNumber } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { useDispatch } from "react-redux";
import { TaxMasterActions } from "./../../../../_redux/actionFiles/TaxMasterRedux";
import { stringNormalize } from "./../../../../Helpers/utils"
import BorderedSwitch from "../../../form/BorderedSwitch";

function TaxMasterForm({ entityForEdit, saveBtnHandler, form }) {
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
  const nameChanged = (e) => {
    form.setFieldsValue({ code: stringNormalize(e.target.value) })
  }
  const layout = {
    labelCol: {
      span: 7,
      offset: 2
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
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input tabIndex="0" autoFocus onBlur={nameChanged} />
      </Form.Item>
      <Form.Item
        name="code"
        label="Code"
        validateTrigger="onBlur"
        rules={[{ validator: validateCode }, { required: true }]}
        required
      >
        <Input tabIndex="1" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input tabIndex="2" />
      </Form.Item>
      <Form.Item
        name="taxPercentage"
        label="Percentage"
        rules={[{ type: "number", min: 0, max: 100 }, { required: true }]}
        required

      >
        <InputNumber
          tabIndex="3"
          style={{ width: '100%' }}
          addonAfter="%"
        />
      </Form.Item>
      <Form.Item
        name="isActive"
        valuePropName="checked"
        label="Active"
      >
        <BorderedSwitch tabIndex="4" defaultChecked={true} />
      </Form.Item>
    </Form>
  );
}

export default TaxMasterForm;
