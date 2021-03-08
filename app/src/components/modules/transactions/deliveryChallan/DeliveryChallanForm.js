import React from "react";
import { Form, Input, Row, Col, InputNumber, DatePicker, Table } from "antd";
import validateMsgs from "../../../../helpers/validateMesseges";
import { PartyDropdown } from "../../_common/CommonDropdowns";
import { dateFormat } from "../../../../../Constants/Formats";
import EditableTable, { getFirstFocusableCell } from "../../_common/EditableTable";
import CustomDatePicker from "../../../form/CustomDatePicker";
import './deliveryChallanForm.less'
import TextArea from "antd/lib/input/TextArea";
import { DeliveryDetail } from "../../../../../dbManager/models/DeliveryDetail";

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
      name="delivery-challan-form"
      initialValues={{ deliveryDetails: [new DeliveryDetail()], ...(entityForEdit ?? {}), voucherNumber: 1234 }}
      onFinish={onFinish}
      labelAlign="left"
      form={form}
      validateMessages={validateMsgs}
      colon={false}
      className="copact-form"
    >
      <Row className="header-row">
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
            <InputNumber tabIndex="1" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
            name="challanDate"
            label="Challan Date"
            required
            rules={[{ required: true }]}
          >
            <CustomDatePicker format={dateFormat} tabIndex="2" style={{ width: '100%' }} data-focustable={"deliveryDetails"} />
          </Form.Item>
        </Col>
      </Row>
      <Row className="table-row">
        <Col span={24}>
          <EditableTable
            name="deliveryDetails"
            nextTabIndex="3"
            form={form}
            columns={[{
              title: "Item",
              dataIndex: "itemMasterId",
              editor: {
                type: 'select',
                getOptions: () => [{ label: 'Item 1', value: 1 }, { label: 'Item 2', value: 3 }]
              },
              width: '25%'
            },
            {
              title: "Description",
              dataIndex: "description",
              editor: {
                type: 'text',
              },
              width: '20%'
            }, {
              title: "Unit",
              dataIndex: "unitMasterId",
              editor: {
                type: 'select',
                getOptions: () => [{ label: 'Unit 1', value: 1 }, { label: 'Unit 2', value: 3 }]
              },
              width: '15%'
            }, {
              title: "Qty",
              dataIndex: "quantity",
              editor: {
                type: 'number',
              },
              footer: (data) => data.reduce((a, b) => parseInt(a) + parseInt(b.quantity ?? 0), 0),
              width: '10%'
            }, {
              title: "Rate",
              dataIndex: "rate",
              editor: {
                type: 'number',
              },
              width: '10%'
            }, {
              title: "Amount",
              dataIndex: "amount",
              editor: {
                type: 'number',
              },
              width: '10%'
            }
            ]}
            autoAddRow={{ ...(new DeliveryDetail()) }}
            beforeSave={(newRow, oldRow) => {
              newRow.amount = (newRow.quantity ?? 0) * (newRow.rate ?? 0)
              return newRow;
            }}
            afterSave={(newRow, oldRow, data) => {
              form.setFieldsValue({ grossAmount: data?.reduce((a, b) => a + b.amount, 0) })
              form.setFieldsValue({ netAmount: data?.reduce((a, b) => a + b.amount, 0) })
            }}
          />
        </Col>
      </Row>
      <Row className="footer-row">
        <Col span={11}>
          <Form.Item
            labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}
            name="remarks"
            label="Remarks"
            required
            rules={[{ required: true }]}
          >
            <TextArea style={{ width: '100%' }} rows={3} tabIndex="3" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 10, offset: 2 }} md={{ span: 7, offset: 5 }}>
          <Form.Item noStyle shouldUpdate labelAlign>
            {() => {
              return (
                <>
                  <Form.Item
                    name="grosAmounts"
                    label="Gross Amount"
                    required
                    rules={[{ required: true }]}
                    shouldUpdate
                  >
                    <InputNumber tabIndex="4" style={{ width: '100%' }} readOnly />
                  </Form.Item>
                </>
              )
            }}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default DeliveryChallanForm;
