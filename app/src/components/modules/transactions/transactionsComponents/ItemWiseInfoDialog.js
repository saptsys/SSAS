import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect } from 'react';
import { round } from '../../../../../Constants/HelperFunctions';
import AutoFocuser from '../../../form/AutoFocuser';

const ItemWiseInfoDialog = ({
  data = {
    amount: 0.00,
    otherPercentage: 0.00,
    otherAmount: 0.00,
    assessableAmount: 0.0,
    SGSTPercentage: 0.00,
    SGSTAmount: 0.00,
    CGSTPercentage: 0.00,
    CGSTAmount: 0.00,
    IGSTPercentage: 0.00,
    IGSTAmount: 0.00,
    grsTotal: 0.00,
  },
  isOpen,
  extraParams,
  onEditDone
}) => {


  const onFinish = (values) => {
    onEditDone && onEditDone(values, extraParams)
  }

  const [editInfoForm] = useForm()


  const calculateTotals = (values = editInfoForm.getFieldsValue()) => {
    values.assessableAmount = round((values.amount ?? 0) + (values.otherAmount ?? 0))
    // values.SGSTPercentage = round(defaultFirm.state === currentPartyStateCode ? activeTax.taxPercentage / 2 : 0)
    values.SGSTAmount = round(((values.SGSTPercentage ?? 0) * values.assessableAmount) / 100)
    // values.CGSTPercentage = round(defaultFirm.state === currentPartyStateCode ? activeTax.taxPercentage / 2 : 0)
    values.CGSTAmount = round(((values.CGSTPercentage ?? 0) * values.assessableAmount) / 100)
    // values.IGSTPercentage = round(defaultFirm.state !== currentPartyStateCode ? activeTax.taxPercentage : 0)
    values.IGSTAmount = round(((values.IGSTPercentage ?? 0) * values.assessableAmount) / 100)
    values.grsTotal = round(values.assessableAmount + values.SGSTAmount + values.CGSTAmount + values.IGSTAmount)

    editInfoForm.setFieldsValue(values)
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const el = document.getElementById("first-element")
        el && el.focus()
        el && el.setSelectionRange(0, el.value.length)
      }, 1000)
    }
  }, [isOpen])

  return (
    <Modal
      visible={isOpen}
      title={<div style={{ textAlign: 'center' }}>Item Wise Info</div>}
      width={250}
      footer={false}
      closable={false}
      destroyOnClose
      bodyStyle={{ padding: '5px', paddingTop: '10px' }}
    // onFinish={onFinish}
    >
      <AutoFocuser onLastElement={() => onFinish(editInfoForm.getFieldsValue())}>
        <Form
          form={editInfoForm}
          name="edit-info-form"
          initialValues={calculateTotals(data)}
          labelAlign="left"
          colon={false}
          className="copact-form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16
          }}
        >
          <Form.Item name="amount" label="Amount">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Other +/-">
            <Input.Group>
              <Form.Item
                name={['otherPercentage']}
                noStyle
              >
                <Input
                  id="first-element"
                  onChange={e => {
                    if (e.target.value) {
                      const gAmt = editInfoForm.getFieldValue("amount")
                      const dRs = (gAmt * e.target.value) / 100
                      editInfoForm.setFieldsValue({ otherAmount: dRs })
                      calculateTotals()
                    }
                  }}
                  defaultValue="0"
                  tabIndex="0"
                  autoFocus
                  suffix='%'
                  style={{ width: '40%', textAlign: 'right' }}

                />
              </Form.Item>
              <Form.Item
                name={['otherAmount']}
                noStyle
              >
                <Input
                  onChange={e => {
                    if (e.target.value) {
                      const gAmt = editInfoForm.getFieldValue("amount")
                      const dRs = (100 * e.target.value) / gAmt
                      editInfoForm.setFieldsValue({ otherPercentage: dRs })
                      calculateTotals()
                    }
                  }}
                  defaultValue="0.00"
                  tabIndex="1"
                  suffix=" "
                  style={{ width: '60%' }}

                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name="assessableAmount" label="Ass. Amount">
            <Input />
          </Form.Item>
          <Form.Item label="+ SGST">
            <Input.Group>
              <Form.Item
                name={['SGSTPercentage']}
                noStyle
              >
                <Input defaultValue="0" onChange={() => calculateTotals()} tabIndex="2" suffix='%' style={{ width: '40%', textAlign: 'right' }} />
              </Form.Item>
              <Form.Item
                name={['SGSTAmount']}
                noStyle
              >
                <Input defaultValue="0.00" suffix=" " style={{ width: '60%' }} readOnly />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="+ CGST">
            <Input.Group>
              <Form.Item
                name={['CGSTPercentage']}
                noStyle
              >
                <Input defaultValue="0" onChange={() => calculateTotals()} suffix='%' style={{ width: '40%', textAlign: 'right' }} tabIndex="3" />
              </Form.Item>
              <Form.Item
                name={['CGSTAmount']}
                noStyle
              >
                <Input defaultValue="0.00" suffix=" " style={{ width: '60%' }} readOnly />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="+ IGST">
            <Input.Group>
              <Form.Item
                name={['IGSTPercentage']}
                noStyle
              >
                <Input defaultValue="0" onChange={() => calculateTotals()} suffix='%' style={{ width: '40%', textAlign: 'right' }} tabIndex="4" />
              </Form.Item>
              <Form.Item
                name={['IGSTAmount']}
                noStyle
              >
                <Input defaultValue="0.00" suffix=" " style={{ width: '60%' }} readOnly />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name="grsTotal" label="Grs. Value">
            <Input tabIndex="5" readOnly defaultValue="0" />
          </Form.Item>
        </Form>
      </AutoFocuser>
    </Modal>
  );
};

export default ItemWiseInfoDialog;

