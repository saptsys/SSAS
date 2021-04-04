import React from "react";
import { Form, Input, Row, Col } from "antd";
import { useForm } from 'antd/lib/form/Form';
import TextArea from "antd/lib/input/TextArea";
import Regex from "../../../../../Constants/Regex";
import validateMsgs from "../../../../helpers/validateMesseges";
import { AccountTypesDropdown, StatesDropdown } from "../../_common/CommonDropdowns";
import BorderedSwitch from "../../../form/BorderedSwitch";
function PartyMasterForm({ entityForEdit, saveBtnHandler, form }) {

  const generateId = (text) => "basic_" + text

  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values })
  };

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 15
    }
  };

  const gstinNumberChanged = (e) => {
    if (Regex.checkRegex(e.target.value, 'gstin')) {
      form.setFieldsValue({ stateCode: parseInt(e.target.value.substr(0, 2)) })
      form.setFieldsValue({ pan: (e.target.value.substr(2, 10)) })
    }
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ ...(entityForEdit ?? {}) }}
      onFinish={onFinish}
      labelAlign="left"
      form={form}
      validateMessages={validateMsgs}
    >

      <Row>
        <Col span={11}>
          <Form.Item
            name="name"
            label="Customer Name"
            required
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Customer Name Here"
              tabIndex="0"
              autoFocus
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <AccountTypesDropdown
            name="type"
            label="Type"
            required
            // tooltip="Account Type"
            rules={[{ required: true }]}
            propsForSelect={{ tabIndex: 1 }}
          />
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="address" label="Address">
            <TextArea
              rows={4}
              tabIndex="4"
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="gstin"
            label="GSTIN"
            rules={[{ pattern: Regex.gstin, message: 'GSTIN is not valid' }]}
          >
            <Input onChange={gstinNumberChanged} tabIndex="2" />
          </Form.Item>
          <Form.Item
            name="pan"
            label="PAN"
            rules={[{ pattern: Regex.pan, message: 'PAN is not valid' }]}
          >

            <Input tabIndex="3" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="city" label="City">
            <Input tabIndex="5" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="mobile" label="Mobile">
            <Input tabIndex="7" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <StatesDropdown
            name="stateCode"
            label="State"
            required
            rules={[{ required: true }]}
            propsForSelect={{ tabIndex: "6" }}
          />
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input tabIndex="8" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11} >
          <Form.Item name="isActive" valuePropName="checked" label="Active">
            <BorderedSwitch tabIndex="10" defaultChecked />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="email" label="Email" rules={[{ pattern: Regex.email }]}>
            <Input tabIndex="9" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default PartyMasterForm;
