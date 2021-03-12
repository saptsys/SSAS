import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, InputNumber, DatePicker, Table } from "antd";
import validateMsgs from "../../../../../helpers/validateMesseges";
import { PartyDropdown } from "../../../_common/CommonDropdowns";
import { dateFormat } from "../../../../../../Constants/Formats";
import EditableTable, { getFirstFocusableCell } from "../../../_common/EditableTable";
import CustomDatePicker from "../../../../form/CustomDatePicker";
import './salesInvoiceForm.less'
import TextArea from "antd/lib/input/TextArea";
import { BillsDetail } from "../../../../../../dbManager/models/BillsDetail";
import { useDispatch, useSelector } from "react-redux";
import { ItemMasterActions } from "../../../../../_redux/actionFiles/ItemMasterRedux";
import { ItemUnitMasterActions } from "../../../../../_redux/actionFiles/ItemUnitMasterRedux";
import { SalesInvoiceActions } from "../../../../../_redux/actionFiles/SalesInvoiceRedux";
import moment from "moment";

function SalesInvoiceForm({ entityForEdit, saveBtnHandler, form }) {
  const dispatch = useDispatch()

  const generateId = (text) => "basic_" + text

  const onFinish = (values) => {
    let val = { ...(entityForEdit ?? {}), ...values }
    val.challanDate = val.challanDate.toDate()
    val.billsDetails = val.billsDetails.filter(x => x.itemMasterId)
    saveBtnHandler && saveBtnHandler(val)
  };

  const { itemState, partyState } = useSelector(s => ({ itemState: s.itemMaster, partyState: s.partyMaster }))
  const [allItems, setAllItems] = useState([])
  const [allUnits, setAllUnits] = useState([])

  useEffect(() => {
    dispatch(ItemMasterActions.getAll()).then(setAllItems)
    dispatch(ItemUnitMasterActions.getAll()).then(setAllUnits)
    if (!entityForEdit.id)
      dispatch(SalesInvoiceActions.getLastChalanAndVoucherNumber()).then((res) => {
        form.setFieldsValue({ challanNumber: res.challanNumber + 1, voucherNumber: res.voucherNumber + 1 })
      })
  }, [])
  console.log(entityForEdit)
  return (
    <Form
      name="delivery-challan-form"
      initialValues={{ ...entityForEdit, billsDetails: [...(entityForEdit.billsDetails ?? []), new BillsDetail()], challanDate: moment(entityForEdit.challanDate ?? new Date()) }}
      onFinish={onFinish}
      labelAlign="left"
      form={form}
      validateMessages={validateMsgs}
      colon={false}
      className="copact-form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16
      }}
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
          <Form.Item noStyle shouldUpdate>
            {() => (
              <>
                <Form.Item
                  shouldUpdate
                  labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
                  name="voucherNumber"
                  label="Voucher No"
                  required
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: '100%' }} readOnly />
                </Form.Item>
                <Form.Item
                  shouldUpdate
                  labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
                  name="challanNumber"
                  label="Challan No"
                  required
                  rules={[{ required: true }]}
                >
                  <InputNumber tabIndex="1" style={{ width: '100%' }} />
                </Form.Item>
              </>
            )}

          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
            name="challanDate"
            label="Challan Date"
            required
            rules={[{ required: true }]}
          >
            <CustomDatePicker format={dateFormat} tabIndex="2" style={{ width: '100%' }} data-focustable={"billsDetails"} />
          </Form.Item>
        </Col>
      </Row>
      <Row className="table-row">
        <Col span={24}>
          <EditableTable
            name="billsDetails"
            nextTabIndex="3"
            form={form}
            columns={[
              {
                title: "#",
                dataIndex: "",
                width: '10%',
                align: 'right',
                render: (cell, row) => form.getFieldValue("billsDetails").indexOf(row) + 1
              },
              {
                title: "Item",
                dataIndex: "itemMasterId",
                editor: {
                  type: 'select',
                  getOptions: () => allItems?.map(x => ({ label: x.name, value: x.id }))
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
                dataIndex: "itemUnitMasterId",
                width: '15%',
                render: cell => allUnits.find(x => x.id === cell)?.name
              }, {
                title: "Qty",
                dataIndex: "quantity",
                editor: {
                  type: 'number',
                },
                footer: (data) => data.reduce((a, b) => parseInt(a) + parseInt(b.quantity ?? 0), 0),
                width: '10%',
                align: 'right'
              }, {
                title: "Rate",
                dataIndex: "rate",
                editor: {
                  type: 'number',
                },
                width: '10%',
                align: 'right'
              }, {
                title: "Amount",
                dataIndex: "amount",
                width: '10%',
                align: 'right'
              }
            ]}
            autoAddRow={{ ...(new BillsDetail()) }}
            beforeSave={(newRow, oldRow) => {
              newRow.amount = (parseFloat(newRow.quantity ?? 0) * parseFloat(newRow.rate ?? 0)).toFixed(2)
              newRow.itemUnitMasterId = allItems.find(x => x.id === newRow.itemMasterId)?.itemUnitMasterId
              return newRow;
            }}
            afterSave={(newRow, oldRow, data) => {
              const subTotal = parseFloat(data?.reduce((a, b) => a + parseFloat(b.amount ?? 0), 0)).toFixed(2)
              form.setFieldsValue({ grossAmount: subTotal })
              form.setFieldsValue({ netAmount: subTotal })
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
                    name="grossAmount"
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

export default SalesInvoiceForm;
