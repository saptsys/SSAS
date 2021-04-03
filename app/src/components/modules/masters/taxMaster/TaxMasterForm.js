import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { useDispatch } from "react-redux";
import { TaxMasterActions } from "./../../../../_redux/actionFiles/TaxMasterRedux";
import { stringNormalize } from "./../../../../helpers/utils"
import BorderedSwitch from "../../../form/BorderedSwitch";
import Text from "antd/lib/typography/Text";

function TaxMasterForm({ entityForEdit, saveBtnHandler, form }) {
  const dispatch = useDispatch();

  const [prevActiveTax, setPrevActiveTax] = useState(null)

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

  useEffect(() => {
    dispatch(TaxMasterActions.getActiveTax()).then(setPrevActiveTax)
  }, [])

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
      <Text mark><b>Note:</b> There is any one tax should be active. if you active this other will be de-actived automatically. </Text><br /><br />
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
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Form.Item
            shouldUpdate
            name="isActive"
            valuePropName="checked"
            label="Active"
            extra={prevActiveTax && prevActiveTax.id !== entityForEdit.id && form.getFieldValue("isActive") ? `Currnet tax '${prevActiveTax.name}' will be deactivated.` : undefined}
          >
            <BorderedSwitch tabIndex="4" />
          </Form.Item>
        )}
      </Form.Item>

    </Form>
  );
}

export default TaxMasterForm;
