import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';


function PartyMasterForm() {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >

        <Form.Item label="Customer Name">
          <Input />
        </Form.Item>
        <Form.Item label="Customer Type">
          <Select defaultActiveFirstOption>
            <Select.Option value="CUSTOMER">Customer</Select.Option>
            <Select.Option value="SUPPLIER">Supplier</Select.Option>
            <Select.Option value="BOTH">Both</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Phone">
          <Input type="number"/>
        </Form.Item>
        
        <Form.Item label="Address">
          <Input />
        </Form.Item>
        
        <Form.Item label="Mobile">
          <Input />
        </Form.Item>
        
        <Form.Item label="City">
          <Input />
        </Form.Item>
        <Form.Item label="Email">
          <Input type="email"/>
        </Form.Item>
        <Form.Item label="State">
          <Select defaultActiveFirstOption>
            <Select.Option value="GJ">Gujarat</Select.Option>
            <Select.Option value="ASM">Assam</Select.Option>
            <Select.Option value="KSHMR">Kashmir</Select.Option>
            <Select.Option value="TMLN">Tamilnadu</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Active">
          <Switch />
        </Form.Item>
        <Form.Item label="GSTIN">
          <Input />
        </Form.Item>
        <Form.Item label="PAN">
          <Input />
        </Form.Item>
      </Form>
  )
}

export default PartyMasterForm
