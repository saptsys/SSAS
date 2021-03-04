import React from "react";
import { Form, Input, Row, Col, InputNumber, DatePicker, Table } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { PartyDropdown } from "../../_common/CommonDropdowns";
import { dateFormat } from "../../../../../Constants/Formats";
import EditableTable from "../../_common/EditableTable";

function DeliveryChallanForm({ entityForEdit, saveBtnHandler, form }) {

  const generateId = (text) => "basic_" + text

  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values })
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ ...(entityForEdit ?? {}), tableData: [{ item: 1, name: 'Vaitul', age: 21 }, { item: 1, name: 'BHayani', age: 20 }, { item: 1, name: 'John', age: 16 },] }}
      onFinish={onFinish}
      labelAlign="left"
      form={form}
      validateMessages={validateMsgs}
      colon={false}
      className="copact-form"
    >
      <Row>
        <Col md={{ span: 12 }} xs={{ span: 14 }}>
          <PartyDropdown
            propsForSelect={{ tabIndex: "0", autoFocus: true }}
            labelCol={{ lg: 4, md: 6, sm: 10, xs: 8 }} wrapperCol={{ lg: 12, md: 12, sm: 14, xs: 16 }}
            name="partyMasterId"
            label="Customer"
            required
            rules={[{ required: true }]}
          />
        </Col>
        <Col lg={{ offset: 6, span: 6 }} md={{ offset: 4, span: 7 }} xs={{ span: 9, offset: 1 }}>
          <Form.Item
            labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
            name="voucherNumber"
            label="Voucher No"
            required
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} readOnly />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
            name="challanNumber"
            label="Challan No"
            required
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
            name="challanDate"
            label="Challan Date"
            required
            rules={[{ required: true }]}
          >
            <DatePicker format={dateFormat} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <EditableTable name="tableData" form={form} columns={[{
            title: "Name",
            dataIndex: "name",
            editor: {
              type: 'text'
            }
          },
          {
            title: "Item",
            dataIndex: "item",
            editor: {
              type: 'select',
              getOptions: () => [{ label: 'AAA', value: 1 }, { label: 'BBB', value: 2 }]
            }
          }, {
            title: "Age",
            dataIndex: "age",
            editor: {
              type: 'number'
            }
          },
          ]} />
        </Col>
      </Row>
    </Form>
  );
}

export default DeliveryChallanForm;
