import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, InputNumber, DatePicker, Table, Button } from "antd";
import validateMsgs from "../../../../../helpers/validateMesseges";
import { PartyDropdown } from "../../../_common/CommonDropdowns";
import { dateFormat } from "../../../../../../Constants/Formats";
import EditableTable from "../../../_common/EditableTable";
import CustomDatePicker from "../../../../form/CustomDatePicker";
import './purchaseReturnForm.less'
import TextArea from "antd/lib/input/TextArea";
import { BillsDetail } from "../../../../../../dbManager/models/BillsDetail";
import { useDispatch, useSelector } from "react-redux";
import { ItemMasterActions } from "../../../../../_redux/actionFiles/ItemMasterRedux";
import { ItemUnitMasterActions } from "../../../../../_redux/actionFiles/ItemUnitMasterRedux";
import { PurchaseReturnActions } from "../../../../../_redux/actionFiles/PurchaseReturnRedux";
import moment from "moment";
import { TaxMasterActions } from "../../../../../_redux/actionFiles/TaxMasterRedux";
import { Modal } from "antd";
import ItemWiseInfoDialog from "../../transactionsComponents/ItemWiseInfoDialog";
import { round } from "../../../../../../Constants/HelperFunctions";
import PurchaseInvoiceRedux from "../../../../../_redux/actionFiles/PurchaseInvoiceRedux";
import BillSelectionDialog from "../../transactionsComponents/BillSelectionDialog";
import BillDetailsSelectionDialog from "../../transactionsComponents/BillDetailsSelectionDialog";

function PurchaseReturnForm({ entityForEdit, saveBtnHandler, form }) {
  const dispatch = useDispatch()

  const generateId = (text) => "basic_" + text

  const [deletedBillsDetail, setDeletedBillsDetail] = useState([])

  const onFinish = (values) => {
    let val = { ...(entityForEdit ?? {}), ...values }
    val.billDate = val.billDate.toDate()
    val.againstBillDate = val.againstBillDate.toDate()
    let final = {
      header: val,
      details: [...val.billsDetail.filter(x => x.itemMasterId), ...deletedBillsDetail]
    }
    delete final.header.billsDetail
    saveBtnHandler && saveBtnHandler(final)
  };

  const { itemState, partyState, defaultFirm } = useSelector(s => ({ itemState: s.itemMaster, partyState: s.partyMaster, defaultFirm: s.FirmInfo.data.defaultFirm }))
  const currentState = useSelector(s => s.PurchaseReturn)
  const [allItems, setAllItems] = useState([])
  const [allUnits, setAllUnits] = useState([])
  const [selectedParty, setSelectedParty] = useState(null)
  const [activeTax, setActiveTax] = useState(null)
  const [currnetEditInfoData, setCurrnetEditInfoData] = useState(null)
  const [billSelectionDialogVisibility, setBillSelectionDialogVisibility] = useState(false)
  const [itemSelectVisibility, setItemSelectVisibility] = useState(false)
  const [defaultSelectedValue, setDefaultSelectedValue] = useState({});

  const startSelectAgainstBill = () => {
    if (!form.getFieldValue("partyMasterId")) {
      Modal.error({ title: "Please select party before you select against" })
      return;
    } else
      !billSelectionDialogVisibility && setBillSelectionDialogVisibility(true)
  }
  const startSelectItems = () => {
    if (!form.getFieldValue("againstBillNumber")) {
      Modal.error({ title: "Please select against bill first." })
      return;
    } else
      !itemSelectVisibility && setItemSelectVisibility(true)
  }


  useEffect(() => {
    dispatch(ItemMasterActions.getAll()).then(setAllItems)
    dispatch(ItemUnitMasterActions.getAll()).then(setAllUnits)
    dispatch(TaxMasterActions.getActiveTax()).then(setActiveTax)

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "F6":
          startSelectAgainstBill()
          break;
        case "F7":
          startSelectItems()
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

  // const getAutoVoucherBillNumber = (billing) => {
  //   if ((billing ?? form.getFieldValue("billing")))
  //     dispatch(PurchaseReturnActions.getTotalBillsAndLastBill([(billing ?? form.getFieldValue("billing"))])).then((res) => {
  //       console.log("===================>getTotalBillsAndLastBill Recieved")
  //       if (entityForEdit.id ? (billing ?? form.getFieldValue("billing")) !== entityForEdit.billing : (billing ?? form.getFieldValue("billing")))
  //         form.setFieldsValue({ billNumber: res.billNumber + 1, voucherNumber: res.voucherNumber + 1, billDate: moment(new Date()) })
  //     }).catch(err => console.log("ERRORRRRRR------->", err))
  // }

  useEffect(() => {
    if (entityForEdit.id && entityForEdit.partyMasterId === form.getFieldValue("partyMasterId")) {
      form.setFieldsValue({ billNumber: entityForEdit.billNumber, voucherNumber: entityForEdit.voucherNumber })
    } else if (entityForEdit.id ? entityForEdit.billing !== form.getFieldValue("billing") : form.getFieldValue("billing"))
      dispatch(PurchaseReturnActions.getTotalBillsAndLastBill([(form.getFieldValue("billing"))])).then((res) => {
        form.setFieldsValue({ billNumber: res.billNumber + 1, voucherNumber: res.voucherNumber + 1 })
      })
  }, [form.getFieldValue("billing")])

  // useEffect(() => {
  //   getAutoVoucherBillNumber()
  // }, [])

  const calcItemWiseTotals = (items) => {
    return items.reduce((occ, cur) => {
      return {
        subTotal: occ.subTotal + parseFloat(cur.amount ?? 0),
        otherTotal: occ.otherTotal + parseFloat(cur.otherAmount ?? 0),
        CGSTTotal: occ.CGSTTotal + parseFloat(cur.CGSTAmount ?? 0),
        SGSTTotal: occ.SGSTTotal + parseFloat(cur.SGSTAmount ?? 0),
        IGSTTotal: occ.IGSTTotal + parseFloat(cur.IGSTAmount ?? 0),
        grossAmount: occ.grossAmount + parseFloat(cur.grossAmount ?? 0),
      }
    }, {
      subTotal: 0,
      otherTotal: 0,
      CGSTTotal: 0,
      SGSTTotal: 0,
      IGSTTotal: 0,
      grossAmount: 0,
    })
  }

  const calcTotals = (rows = form.getFieldValue("billsDetail"), party = selectedParty) => {
    const itemWiseTotals = calcItemWiseTotals(rows)
    const currentPartyStateCode = party?.stateCode
    const grossAmount = round(itemWiseTotals.grossAmount)
    const discountAmount = form.getFieldValue("discountAmount") ?? 0
    const freightAmount = form.getFieldValue("freightAmount") ?? 0
    const commisionAmount = form.getFieldValue("freightAmount") ?? 0
    const taxableAmount = parseFloat(grossAmount + freightAmount + commisionAmount - discountAmount)
    const SGSTPercentage = parseInt(defaultFirm.state) === parseInt(currentPartyStateCode) ? activeTax.taxPercentage / 2 : 0
    const SGSTAmount = (SGSTPercentage * taxableAmount) / 100
    const CGSTPercentage = parseInt(defaultFirm.state) === parseInt(currentPartyStateCode) ? activeTax.taxPercentage / 2 : 0
    const CGSTAmount = (CGSTPercentage * taxableAmount) / 100
    const IGSTPercentage = parseInt(defaultFirm.state) !== parseInt(currentPartyStateCode) ? activeTax.taxPercentage : 0
    const IGSTAmount = (IGSTPercentage * taxableAmount) / 100
    const netAmount = taxableAmount + SGSTAmount + CGSTAmount + IGSTAmount
    form.setFieldsValue({
      grossAmount: parseFloat(grossAmount ?? 0).toFixed(2),
      taxableAmount: parseFloat(taxableAmount ?? 0).toFixed(2),
      SGSTPercentage: parseFloat(SGSTPercentage ?? 0).toFixed(0),
      SGSTAmount: parseFloat(SGSTAmount ?? 0).toFixed(2),
      CGSTPercentage: parseFloat(CGSTPercentage ?? 0).toFixed(0),
      CGSTAmount: parseFloat(CGSTAmount ?? 0).toFixed(2),
      IGSTPercentage: parseFloat(IGSTPercentage ?? 0).toFixed(0),
      IGSTAmount: parseFloat(IGSTAmount ?? 0).toFixed(2),
      netAmount: parseFloat(netAmount ?? 0).toFixed(2),
      itemWiseTotals: itemWiseTotals
    })
  }

  const editInfoDone = (values, rowIndex) => {
    setCurrnetEditInfoData(null)
    calcTotals(form.getFieldValue("billsDetail").map((item, i) => {
      if (i === rowIndex) {
        item.assessableAmount = values.assessableAmount
        item.otherPercentage = values.otherPercentage
        item.otherAmount = values.otherAmount
        item.SGSTPercentage = values.SGSTPercentage
        item.SGSTAmount = values.SGSTAmount
        item.CGSTPercentage = values.CGSTPercentage
        item.CGSTAmount = values.CGSTAmount
        item.IGSTPercentage = values.IGSTPercentage
        item.IGSTAmount = values.IGSTAmount
        item.grossAmount = values.grsTotal
      }
      return item
    }))
  }

  const onBillSelect = (rows) => {
    setBillSelectionDialogVisibility(false)
    if (rows && rows.length === 1 && rows[0]) {
      form.setFieldsValue({
        againstBillNumber: rows[0].billNumber,
        againstBilling: rows[0].billing,
        againstBillDate: moment(rows[0].billDate)
      })
    }
  }
  const onItemsSelect = (rows) => {
    setItemSelectVisibility(false)
    if (rows && rows.length) {
      let d = form.getFieldValue("billsDetail").filter(x => x.itemMasterId)
      rows.forEach(r => {
        let rTmp = { ...r }
        delete r.id
        delete r.billsTransactionId
        d.push(new BillsDetail({
          ...rTmp
        }))
      })
      d.push(new BillsDetail())
      form.setFieldsValue({ billsDetail: d })
      calcTotals(d)
    }
  }

  return (
    <>
      <Form
        name="purchase-return-form"
        initialValues={
          {
            ...entityForEdit,
            billsDetail: [...(entityForEdit.billsDetail ?? []), new BillsDetail({
              itemUnitMasterId: 1,
              amount: 0.0
            })],
            billDate: moment(entityForEdit.billDate ?? new Date()),
            itemWiseTotals: calcItemWiseTotals((entityForEdit.billsDetail ?? [])),
            againstBillDate: moment(entityForEdit.againstBillDate)
          }}
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
                    // billingAddress: party?.address
                  })
                  calcTotals(form.getFieldValue("billsDetail"), party)
                }
              }}
              accoutType={["BOTH", "CUSTOMER"]}
            />
            <Form.Item
              labelCol={{ lg: 4, md: 6, sm: 10, xs: 8 }} wrapperCol={{ lg: 12, md: 12, sm: 14, xs: 16 }}
              label="Against Bill"
              required
              rules={[{ required: true }]}
              extra="Double click 👆 here to select bill (F6)"
            >
              <Input.Group>
                <Form.Item
                  name={['againstBilling']}
                  noStyle
                  readOnly
                >
                  <Input defaultValue="" style={{ width: '30%', textAlign: 'center' }} readOnly />
                </Form.Item>
                <Form.Item name="againstBillNumber" noStyle>
                  <Input

                    style={{ width: '30%' }}
                    tabIndex="1"
                    placeholder="Bill No"
                    readOnly
                    onDoubleClick={() => startSelectAgainstBill()}
                    onFocus={() => {
                      setTimeout(() => {
                        if (!form.getFieldValue("againstBillNumber"))
                          startSelectAgainstBill()
                      }, 100)
                    }} />
                </Form.Item>
                <Form.Item name="againstBillDate" noStyle>
                  <CustomDatePicker onDoubleClick={() => startSelectAgainstBill()} style={{ width: '40%' }} readOnly placeholder="Bill Date" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
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
                        <Input defaultValue="" style={{ width: '40%', textAlign: 'center' }} readOnly />
                      </Form.Item>
                      <Form.Item
                        name={['billNumber']}
                        noStyle
                      >
                        <Input
                          tabIndex="1"
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
              <CustomDatePicker format={dateFormat} tabIndex="2" style={{ width: '100%' }} data-focustable={"billsDetail"} />
            </Form.Item>
          </Col>
        </Row>
        <Row className="table-row">
          <Col span={24}>
            <EditableTable
              name="billsDetail"
              nextTabIndex="3"
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
                  align: 'right',
                  onCell: (record, rowIndex) => ({
                    onCustomKeyDown: (e, { row }) => {
                      if (e.key === "Enter") {
                        const item = row ?? record
                        if (item) {
                          setCurrnetEditInfoData({
                            data: {
                              amount: (parseFloat(item.quantity ?? 0) * parseFloat(item.rate ?? 0)),
                              otherPercentage: item.otherPercentage,
                              otherAmount: item.otherAmount,
                              assessableAmount: item.assessableAmount,
                              SGSTPercentage: item.SGSTPercentage,
                              SGSTAmount: item.SGSTAmount,
                              CGSTPercentage: item.CGSTPercentage,
                              CGSTAmount: item.CGSTAmount,
                              IGSTPercentage: item.IGSTPercentage,
                              IGSTAmount: item.IGSTAmount,
                              grsTotal: item.grossAmount,
                            },
                            visibility: true,
                            rowIndex: rowIndex
                          })
                        }
                      }
                    }
                  })
                }, {
                  title: "Amount",
                  dataIndex: "amount",
                  width: '10%',
                  align: 'right',
                  footer: (data) => data.reduce((a, b) => parseInt(a) + parseInt(b.amount ?? 0), 0),
                }
              ]}
              autoAddRow={{
                ...(new BillsDetail({
                  itemUnitMasterId: defaultSelectedValue["itemUnitMasterId"] ?? 1,
                  amount: 0.0
                }))
              }}
              beforeSave={(newRow, oldRow, { dataIndex, rowIndex }) => {
                const currentItem = allItems.find(x => x.id === newRow.itemMasterId)
                newRow.amount = (parseFloat(newRow.quantity ?? 0) * parseFloat(newRow.rate ?? 0)).toFixed(2)
                if (!newRow.itemUnitMasterId || oldRow.itemMasterId !== newRow.itemMasterId)
                  newRow.itemUnitMasterId = newRow.itemUnitMasterId ?? currentItem?.itemUnitMasterId
                if (!newRow.rate || newRow.itemMasterId !== oldRow.itemMasterId)
                  newRow.rate = currentItem?.purchasePrice
                return newRow;
              }}
              afterSave={(newRow, oldRow, data, { dataIndex, rowIndex }) => {
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
            <Form.Item wrapperCol={{ span: 24 }} shouldUpdate={(val, newVal) => val.itemWiseTotals !== newVal.itemWiseTotals}>
              {() => (
                <Form.Item noStyle shouldUpdate>
                  <Table
                    bordered
                    size="small"
                    pagination={false}
                    columns={[
                      {
                        title: "Subtotal",
                        dataIndex: "subTotal"
                      }, {
                        title: "Other +/-",
                        dataIndex: "otherTotal"
                      }, {
                        title: "CGST Total",
                        dataIndex: "CGSTTotal"
                      }, {
                        title: "SGST Total",
                        dataIndex: "SGSTTotal"
                      }, {
                        title: "IGST Total",
                        dataIndex: "IGSTTotal"
                      }, {
                        title: "Gross Amount",
                        dataIndex: "grossAmount"
                      }
                    ]}
                    dataSource={[
                      form.getFieldValue("itemWiseTotals")
                    ]}
                  />
                </Form.Item>
              )}
            </Form.Item>
            <br />
            <Form.Item
              labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}
              name="remarks"
              label="Remarks"
            >
              <TextArea style={{ width: '100%' }} rows={2} tabIndex="3" />
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
                          <Input defaultValue="0.00" tabIndex="4" style={{ width: '100%' }} readOnly />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="+ Freight">
                        <Input.Group>
                          <Form.Item
                            name={['freightPercentage']}
                            noStyle
                          >
                            <Input
                              onChange={e => {
                                if (e.target.value) {
                                  const gAmt = form.getFieldValue("grossAmount")
                                  const dRs = (gAmt * e.target.value) / 100
                                  form.setFieldsValue({ freightAmount: dRs })
                                  calcTotals()
                                }
                              }}
                              defaultValue="0"
                              tabIndex="5"
                              suffix='%'
                              style={{ width: '40%', textAlign: 'right' }}

                            />
                          </Form.Item>
                          <Form.Item
                            name={['freightAmount']}
                            noStyle
                          >
                            <Input
                              onChange={e => {
                                if (e.target.value) {
                                  const gAmt = form.getFieldValue("grossAmount")
                                  const dRs = (100 * e.target.value) / gAmt
                                  form.setFieldsValue({ freightPercentage: dRs })
                                  calcTotals()
                                }
                              }}
                              defaultValue="0.00"
                              tabIndex="6"
                              suffix=" "
                              style={{ width: '60%' }}

                            />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item label="+ Commission">
                        <Input.Group>
                          <Form.Item
                            name={['commisionPercentage']}
                            noStyle
                          >
                            <Input
                              onChange={e => {
                                if (e.target.value) {
                                  const gAmt = form.getFieldValue("grossAmount")
                                  const dRs = (gAmt * e.target.value) / 100
                                  form.setFieldsValue({ commisionAmount: dRs })
                                  calcTotals()
                                }
                              }}
                              defaultValue="0"
                              tabIndex="7"
                              suffix='%'
                              style={{ width: '40%', textAlign: 'right' }}

                            />
                          </Form.Item>
                          <Form.Item
                            name={['commisionAmount']}
                            noStyle
                          >
                            <Input
                              onChange={e => {
                                if (e.target.value) {
                                  const gAmt = form.getFieldValue("grossAmount")
                                  const dRs = (100 * e.target.value) / gAmt
                                  form.setFieldsValue({ commisionPercentage: dRs })
                                  calcTotals()
                                }
                              }}
                              defaultValue="0.00"
                              tabIndex="8"
                              suffix=" "
                              style={{ width: '60%' }}

                            />
                          </Form.Item>
                        </Input.Group>
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
                              tabIndex="9"
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
                              tabIndex="10"
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
                          <Input defaultValue="0.00" tabIndex="11" style={{ width: '100%' }} readOnly />
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
                            <Input defaultValue="0.00" tabIndex="12" suffix=" " style={{ width: '60%' }} readOnly />
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
                            <Input defaultValue="0.00" tabIndex="13" suffix=" " style={{ width: '60%' }} readOnly />
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
                            <Input defaultValue="0.00" tabIndex="14" suffix=" " style={{ width: '60%' }} readOnly />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      {/* <Form.Item
                      label="Net Amount"
                      rules={[{ required: true }]}
                      shouldUpdate
                    >
                      <Form.Item name="netAmount" noStyle>
                        <Input defaultValue="0.00" tabIndex="15" style={{ width: '100%' }} readOnly />
                      </Form.Item>
                    </Form.Item> */}
                    </div>
                    <Form.Item
                      className="netAmt"
                      label="Net Amount"
                      rules={[{ required: true }]}
                      shouldUpdate
                      style={{ marginTop: '7px', fontWeight: '600' }}
                    >
                      <Form.Item name="netAmount" noStyle>
                        <Input defaultValue="0.00" tabIndex="11" style={{ width: '100%', fontWeight: '600' }} readOnly />
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
            <BillSelectionDialog
              parties={[form.getFieldValue("partyMasterId")]}
              isOpen={billSelectionDialogVisibility}
              onCancel={() => setBillSelectionDialogVisibility(false)}
              onSelectDone={onBillSelect}
              ReduxObj={PurchaseInvoiceRedux}
              type="radio"
              title="Select Purchase Invoice"
            />
          )}
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <BillDetailsSelectionDialog
              billNumber={form.getFieldValue("againstBillNumber")}
              billing={[form.getFieldValue("againstBilling")]}
              isOpen={itemSelectVisibility}
              onCancel={() => setItemSelectVisibility(false)}
              onSelectDone={onItemsSelect}
              ReduxObj={PurchaseInvoiceRedux}
              title="Select Items"
            />
          )}
        </Form.Item>
        <ItemWiseInfoDialog
          data={currnetEditInfoData?.data}
          extraParams={currnetEditInfoData?.rowIndex}
          isOpen={currnetEditInfoData?.visibility}
          onEditDone={editInfoDone} />
      </Form >
    </>
  );
}

export default PurchaseReturnForm;
