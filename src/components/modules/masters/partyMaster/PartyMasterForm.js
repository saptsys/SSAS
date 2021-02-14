import React, { useEffect } from "react";
import { Form, Input, Button, Select, Switch, Tooltip, Row, Col, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import States from "../../../../../Constants/States";
import Regex from "../../../../../Constants/Regex";
import { useForm } from "antd/lib/form/Form";
import validateMsgs from "../../../../helpers/validateMesseges";

const { Option } = Select
function PartyMasterForm({ entityForEdit, saveBtnHandler, saveBtnRef, form }) {


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
            required rules={[{ required: true }]}
          >
            <Input
              placeholder="Customer Name Here"
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="type"
            label="Type"
            required
            tooltip="Account Type"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              placeholder="Select account type"
              options={[
                { label: 'Sundry Debtors', value: "CUSTOMER" },
                { label: 'Sundry Creditors', value: "SUPPLIER" },
                { label: 'Both', value: "BOTH" }
              ]} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="address" label="Address">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="gstin"
            label="GSTIN"
            rules={[{ pattern: Regex.gstin, message: 'GSTIN is not valid' }]}
          >
            <Input onChange={gstinNumberChanged} />
          </Form.Item>
          <Form.Item
            name="pan"
            label="PAN"
            rules={[{ pattern: Regex.pan, message: 'PAN is not valid' }]}
          >

            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="mobile" label="Mobile">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="stateCode" label="State" required>
            <Select
              showSearch
              optionFilterProp="label"
              options={States.map(x => ({ label: x.stateName + ` (${x.code})`, value: x.tin }))}
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11} >
          <Form.Item name="isActive" valuePropName="checked" label="Active" className="form-item-bordered-switch">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="email" label="Email" rules={[{ pattern: Regex.email }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>



      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PartyMasterForm;
