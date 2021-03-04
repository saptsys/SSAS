import React from "react";
import { Form, Input } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { useDispatch } from "react-redux";
import { ItemUnitMasterActions } from "./../../../../_redux/actionFiles/ItemUnitMasterRedux";
import { stringNormalize } from "./../../../../Helpers/utils"
import BorderedSwitch from "../../../form/BorderedSwitch";

function ItemUnitMasterForm({
  entityForEdit,
  saveBtnHandler,
  form,
}) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
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
      span: 12,
    },
  };

  const validateCode = (rule, value, callback) => {
    return dispatch(
      ItemUnitMasterActions.checkUnique({
        fields: { code: value },
        id: entityForEdit.id,
      })
    );
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
      <Form.Item name="name" label="Unit Name" rules={[{ required: true }]}>
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
        name="isActive"
        valuePropName="checked"
        label="Active"
      >
        <BorderedSwitch defaultChecked={true} tabIndex="3"/>
      </Form.Item>
    </Form>
  );
}

export default ItemUnitMasterForm;
