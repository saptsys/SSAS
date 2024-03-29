import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, InputNumber, DatePicker, Table, Button } from "antd";
import validateMsgs from "../../../../../helpers/validateMesseges";
import { PartyDropdown, TaxDropdown } from "../../../_common/CommonDropdowns";
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
import { PartyMasterActions } from "../../../../../_redux/actionFiles/PartyMasterRedux";
import { deleteColumnRenderer } from "../../../../table/columnRenderers";
import { TaxMasterActions } from "../../../../../_redux/actionFiles/TaxMasterRedux";
import { Modal } from "antd";
import ImportChallansDialog from "../../deliveryChallan/ImportChallansDialog";

function SalesInvoiceForm({ entityForEdit, saveBtnHandler, form }) {
  const dispatch = useDispatch()

  const generateId = (text) => "basic_" + text

  const [deletedBillsDetail, setDeletedBillsDetail] = useState([])

  const onFinish = (values) => {
    let val = { ...(entityForEdit ?? {}), ...values }
    val.billDate = val.billDate.toDate()
    let final = {
      header: val,
      details: [...val.billsDetail.filter(x => x.itemMasterId), ...deletedBillsDetail]
    }
    delete final.header.billsDetail
    saveBtnHandler && saveBtnHandler(final)
  };

  const { itemState, partyState, defaultFirm } = useSelector(s => ({ itemState: s.itemMaster, partyState: s.partyMaster, defaultFirm: s.FirmInfo.data.defaultFirm }))
  const [allItems, setAllItems] = useState([])
  const [allUnits, setAllUnits] = useState([])
  const [selectedParty, setSelectedParty] = useState(null)
  const [selectedTax, setSelectedTax] = useState(null)
  const [importChallanVisibility, setImportChallanVisibility] = useState(false)
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});

  useEffect(() => {
    dispatch(ItemMasterActions.getAll()).then(setAllItems)
    dispatch(ItemUnitMasterActions.getAll()).then(setAllUnits)
    // dispatch(TaxMasterActions.getActiveTax()).then(setSelectedTax)


    const handleKeyDown = (event) => {
      switch (event.key) {
        case "F6":
          if (!form.getFieldValue("partyMasterId")) {
            Modal.error({ title: "Please select party before you import challans" })
            return;
          }
          !importChallanVisibility && setImportChallanVisibility(true)
          break;

        default:
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (entityForEdit.id && entityForEdit.partyMasterId === form.getFieldValue("partyMasterId")) {
      form.setFieldsValue({ billNumber: entityForEdit.billNumber, voucherNumber: entityForEdit.voucherNumber })
    } else if (entityForEdit.id ? entityForEdit.billing !== form.getFieldValue("billing") : form.getFieldValue("billing"))
      dispatch(SalesInvoiceActions.getTotalBillsAndLastBill([(form.getFieldValue("billing"))])).then((res) => {
        form.setFieldsValue({ billNumber: res.billNumber + 1, voucherNumber: res.voucherNumber + 1 })
      })
  }, [form.getFieldValue("billing")])

  const importChallans = (rows) => {
    setImportChallanVisibility(false)
    let items = []
    rows.forEach(challan => {
      challan.deliveryDetails.forEach(detail => {
        let billdetail = items.find(x => x.itemMasterId === detail.itemMasterId) ?? { rate: 0, quantity: 0, itemMasterId: detail.itemMasterId, itemUnitMasterId: detail.itemUnitMasterId, _isNew: true, count: 0 }
        billdetail.count++
        billdetail.quantity = detail.quantity + billdetail.quantity
        billdetail.rate = detail.rate + billdetail.rate
        if (billdetail._isNew) {
          delete billdetail._isNew
          items.push(billdetail)
        }
        else
          items = items.map(x => x.itemMasterId === detail.itemMasterId ? billdetail : x)
      })
    })
    const data = [...items.map(item => {
      item.rate = parseFloat(item.rate / item.count).toFixed(2)
      return new BillsDetail({
        itemMasterId: item.itemMasterId,
        itemUnitMasterId: item.itemUnitMasterId,
        quantity: item.quantity,
        rate: item.rate,
        amount: (parseFloat(item.rate) * parseFloat(item.quantity)).toFixed(2)
      })
    }),
    ...(form.getFieldValue("billsDetail") ?? [])
    ]
    form.setFieldsValue({ "billsDetail": data })
    calcTotals(data)
  }


  const calcTotals = (rows = form.getFieldValue("billsDetail"), party = selectedParty, tax = selectedTax) => {
    const currentPartyStateCode = party?.stateCode
    const grossAmount = parseFloat(rows?.reduce((a, b) => a + parseFloat(b.amount ?? 0), 0)).toFixed(2)
    const discountAmount = form.getFieldValue("discountAmount") ?? 0
    const taxableAmount = parseFloat(grossAmount - discountAmount)
    const SGSTPercentage = parseFloat(defaultFirm.state) === parseInt(currentPartyStateCode) ? (tax?.taxPercentage ?? 0) / 2 : 0
    const SGSTAmount = (SGSTPercentage * taxableAmount) / 100
    const CGSTPercentage = parseFloat(defaultFirm.state) === parseInt(currentPartyStateCode) ? (tax?.taxPercentage ?? 0) / 2 : 0
    const CGSTAmount = (CGSTPercentage * taxableAmount) / 100
    const IGSTPercentage = parseFloat(defaultFirm.state) !== parseInt(currentPartyStateCode) ? (tax?.taxPercentage ?? 0) : 0
    const IGSTAmount = (IGSTPercentage * taxableAmount) / 100
    const netAmount = taxableAmount + SGSTAmount + CGSTAmount + IGSTAmount
    form.setFieldsValue({
      grossAmount: parseFloat(grossAmount ?? 0).toFixed(2),
      // discountAmount: parseFloat(discountAmount ?? 0).toFixed(2),
      taxableAmount: parseFloat(taxableAmount ?? 0).toFixed(2),
      SGSTPercentage: parseFloat(SGSTPercentage ?? 0).toFixed(2),
      SGSTAmount: parseFloat(SGSTAmount ?? 0).toFixed(2),
      CGSTPercentage: parseFloat(CGSTPercentage ?? 0).toFixed(2),
      CGSTAmount: parseFloat(CGSTAmount ?? 0).toFixed(2),
      IGSTPercentage: parseFloat(IGSTPercentage ?? 0).toFixed(2),
      IGSTAmount: parseFloat(IGSTAmount ?? 0).toFixed(2),
      netAmount: parseFloat(netAmount ?? 0).toFixed(2),
    })
  }
  console.log(entityForEdit)
  return (
    <>
      <Form
        name="sales-invoice-form"
        initialValues={{ ...entityForEdit, billsDetail: [...(entityForEdit.billsDetail ?? []), new BillsDetail({ itemUnitMasterId: 1, amount: 0.0 })], billDate: moment(entityForEdit.billDate ?? new Date()) }}
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
              propsForSelect={{
                tabIndex: "0",
                autoFocus: true,
              }}
              labelCol={{ lg: 4, md: 6, sm: 10, xs: 8 }} wrapperCol={{ lg: 12, md: 12, sm: 14, xs: 16 }}
              name="partyMasterId"
              label="Customer"
              required
              rules={[{ required: true }]}
              getRecordOnChange={party => {
                setSelectedParty(party)
                if (party) {
                  const billing = party?.gstin ? "TAX" : "RETAIL"
                  form.setFieldsValue({
                    billing: billing,
                    billingAddress: party?.address
                  })
                  calcTotals(form.getFieldValue("billsDetail"), party)
                }
              }}
              accoutType={["BOTH", "CUSTOMER"]}
            />
            <Form.Item
              labelCol={{ lg: 4, md: 6, sm: 10, xs: 8 }} wrapperCol={{ lg: 12, md: 12, sm: 14, xs: 16 }}
              name="billingAddress"
              label="Address"
            >
              <TextArea style={{ width: '100%' }} rows={3} />
            </Form.Item>
          </Col>
          <Col lg={{ offset: 1, span: 5 }} md={{ offset: 0, span: 4 }} xs={{ span: 5, offset: 0 }}>
            {/* <Form.Item shouldUpdate noStyle> */}
            <TaxDropdown
              shouldUpdate={(o, n) => {
                return o?.selectedParty !== n?.selectedParty;
              }}
              name={() => "taxMasterId"}
              labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}
              label="Tax"
              required
              rules={() => [{ required: true }]}
              propsForSelect={{
                tabIndex: "1",
                filterForOptions: options => {
                  return options.map(x => ({ ...x, name: (form.getFieldValue('billing') ? form.getFieldValue('billing') + ' - ' : "") + x.name })).sort((a, b) => a.isActive ? -1 : 1)
                },
                defaultActiveFirstOption: true
              }}
              getRecordOnChange={tax => {
                setSelectedTax(tax)
                calcTotals(form.getFieldValue("billsDetail"), selectedParty, tax)
              }}
            />
            {/* </Form.Item> */}
          </Col>
          <Col lg={{ offset: 0, span: 6 }} md={{ offset: 0, span: 7 }} xs={{ span: 5, offset: 0 }}>
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
                    label="Bill No"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input.Group>
                      <Form.Item
                        name={['billing']}
                        noStyle
                        readOnly
                      >
                        <Input style={{ width: '40%', textAlign: 'center' }} readOnly />
                      </Form.Item>
                      <Form.Item
                        name={['billNumber']}
                        noStyle
                      >
                        <Input
                          tabIndex="2"
                          style={{ width: '60%' }} />
                      </Form.Item>
                    </Input.Group>

                  </Form.Item>

                </>
              )}

            </Form.Item>
            <Form.Item
              labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
              name="billDate"
              label="Bill Date"
              required
              rules={[{ required: true }]}
            >
              <CustomDatePicker format={dateFormat} tabIndex="3" style={{ width: '100%' }} data-focustable={"billsDetail"} />
            </Form.Item>
          </Col>
        </Row>
        <Row className="table-row">
          <Col span={24}>
            <EditableTable
              name="billsDetail"
              nextTabIndex="4"
              form={form}
              columns={[
                {
                  title: "#",
                  dataIndex: "",
                  width: '8%',
                  align: 'right',
                  render: (cell, row) => form.getFieldValue("billsDetail").indexOf(row) + 1
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
                  width: '12%',
                  editor: {
                    type: 'select',
                    getOptions: () => allUnits?.map(x => ({ label: x.name, value: x.id })),
                    getDefaultOption: () => {
                      return defaultSelectedValue["itemUnitMasterId"] ?? 1;
                    },
                    onChange: (value) => {
                      setDefaultSelectedValue({
                        ...defaultSelectedValue,
                        "itemUnitMasterId": value
                      });
                      return true
                    }
                  },
                }, {
                  title: "Qty",
                  dataIndex: "quantity",
                  editor: {
                    type: 'number',
                    onKeyPress: (evt) => {
                      var charCode = (evt.which) ? evt.which : evt.keyCode;
                      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        return false;
                      }
                      return true;
                    }
                  },
                  footer: (data) => data.reduce((a, b) => parseInt(a) + parseInt(b.quantity ?? 0), 0),
                  width: '10%',
                  align: 'right'
                }, {
                  title: "Rate",
                  dataIndex: "rate",
                  editor: {
                    type: 'number',
                    onKeyPress: (evt) => {
                      var charCode = (evt.which) ? evt.which : evt.keyCode;
                      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        return false;
                      }
                      return true;
                    }
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
              autoAddRow={{
                ...(new BillsDetail({
                  itemUnitMasterId: defaultSelectedValue["itemUnitMasterId"] ?? 1,
                  amount: 0.0
                }))
              }}
              beforeSave={(newRow, oldRow) => {
                const currentItem = allItems.find(x => x.id === newRow.itemMasterId)
                newRow.amount = (parseFloat(newRow.quantity ?? 0) * parseFloat(newRow.rate ?? 0)).toFixed(2)
                if (!newRow.itemUnitMasterId || oldRow.itemMasterId !== newRow.itemMasterId)
                  newRow.itemUnitMasterId = newRow.itemUnitMasterId ?? currentItem?.itemUnitMasterId
                if (!newRow.rate || newRow.itemMasterId !== oldRow.itemMasterId)
                  newRow.rate = currentItem?.salePrice
                return newRow;
              }}
              afterSave={(newRow, oldRow, data) => {
                calcTotals(data)
              }}
              deleteBtnHandler={(cell, row, i) => {
                const newData = form.getFieldValue("billsDetail").filter((x, i2) => i2 !== i)
                form.setFieldsValue({ billsDetail: newData })
                if (row.id) {
                  row.deletedAt = new Date()
                  setDeletedBillsDetail([...deletedBillsDetail, row])
                }
                calcTotals(newData)
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
              <TextArea style={{ width: '100%' }} rows={3} tabIndex="4" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 10, offset: 2 }} md={{ span: 8, offset: 4 }}>
            <Form.Item noStyle shouldUpdate labelAlign>
              {() => {
                return (
                  <>
                    <div className="footer-fields">
                      <Form.Item
                        label="Gross Amount"
                        shouldUpdate
                      >
                        <Form.Item name="grossAmount" noStyle>
                          <Input defaultValue="0.00" tabIndex="5" style={{ width: '100%' }} readOnly />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="- Discount">
                        <Input.Group>
                          <Form.Item
                            name={['discountPercentage']}
                            noStyle
                          >
                            <Input
                              onChange={e => {
                                if (e.target.value) {
                                  const gAmt = form.getFieldValue("grossAmount")
                                  const dRs = (gAmt * e.target.value) / 100
                                  form.setFieldsValue({ discountAmount: dRs })
                                  calcTotals()
                                }
                              }}
                              defaultValue="0"
                              tabIndex="6"
                              suffix='%'
                              style={{ width: '40%', textAlign: 'right' }}

                            />
                          </Form.Item>
                          <Form.Item
                            name={['discountAmount']}
                            noStyle
                          >
                            <Input
                              onChange={e => {
                                if (e.target.value) {
                                  const gAmt = form.getFieldValue("grossAmount")
                                  const dRs = (100 * e.target.value) / gAmt
                                  form.setFieldsValue({ discountPercentage: dRs })
                                  calcTotals()
                                }
                              }}
                              defaultValue="0.00"
                              tabIndex="7"
                              suffix=" "
                              style={{ width: '60%' }}

                            />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item
                        label="Taxable Amount"
                        rules={[{ required: true }]}
                        shouldUpdate
                      >
                        <Form.Item name="taxableAmount" noStyle>
                          <Input defaultValue="0.00" tabIndex="8" style={{ width: '100%' }} readOnly />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="+ SGST">
                        <Input.Group>
                          <Form.Item
                            name={['SGSTPercentage']}
                            noStyle
                          >
                            <Input defaultValue="0" suffix='%' style={{ width: '40%', textAlign: 'right' }} readOnly />
                          </Form.Item>
                          <Form.Item
                            name={['SGSTAmount']}
                            noStyle
                          >
                            <Input defaultValue="0.00" tabIndex="9" suffix=" " style={{ width: '60%' }} readOnly />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item label="+ CGST">
                        <Input.Group>
                          <Form.Item
                            name={['CGSTPercentage']}
                            noStyle
                          >
                            <Input defaultValue="0" suffix='%' style={{ width: '40%', textAlign: 'right' }} readOnly />
                          </Form.Item>
                          <Form.Item
                            name={['CGSTAmount']}
                            noStyle
                          >
                            <Input defaultValue="0.00" tabIndex="10" suffix=" " style={{ width: '60%' }} readOnly />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item label="+ IGST">
                        <Input.Group>
                          <Form.Item
                            name={['IGSTPercentage']}
                            noStyle
                          >
                            <Input defaultValue="0" suffix='%' style={{ width: '40%', textAlign: 'right' }} readOnly />
                          </Form.Item>
                          <Form.Item
                            name={['IGSTAmount']}
                            noStyle
                          >
                            <Input defaultValue="0.00" tabIndex="11" suffix=" " style={{ width: '60%' }} readOnly />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                    </div>

                    <Form.Item
                      className="netAmt"
                      label="Net Amount"
                      rules={[{ required: true }]}
                      shouldUpdate
                      style={{ marginTop: '7px', fontWeight: '600' }}
                    >
                      <Form.Item name="netAmount" noStyle>
                        <Input defaultValue="0.00" tabIndex="12" style={{ width: '100%', fontWeight: '600' }} readOnly />
                      </Form.Item>
                    </Form.Item>
                  </>
                )
              }}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <ImportChallansDialog parties={[form.getFieldValue("partyMasterId")]} onImport={importChallans} isOpen={importChallanVisibility} onCancel={() => setImportChallanVisibility(false)} />
          )}
        </Form.Item>
      </Form >
    </>
  );
}

export default SalesInvoiceForm;
