
import React from "react";
import { Form, Input, Button, Switch } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";

function SettingsMasterForm({ entityForEdit, saveBtnHandler,  form }) {
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
      form={form}
      validateMessages={validateMsgs}

    >
    </Form>
  );
}

export default SettingsMasterForm;
