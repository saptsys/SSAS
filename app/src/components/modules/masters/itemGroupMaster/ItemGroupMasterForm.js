import React from "react";
import { Form, Input } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { useDispatch } from "react-redux";
import { ItemGroupMasterActions } from "./../../../../_redux/actionFiles/ItemGroupMasterRedux";
import { stringNormalize } from "./../../../../Helpers/utils"
import BorderedSwitch from "../../../form/BorderedSwitch";


function ItemGroupMasterTable({
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
  const validateCode = (rule, value, callback) => {
    return dispatch(
      ItemGroupMasterActions.checkUnique({
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
        <BorderedSwitch tabIndex="3" defaultChecked={true} />
      </Form.Item>
    </Form>
  );
}

export default ItemGroupMasterTable;
