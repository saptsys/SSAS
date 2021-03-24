import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
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
    values.assessableAmount = parseFloat(values.amount + values.otherAmount).toFixed(2)
    // values.SGSTPercentage = parseFloat(defaultFirm.state === currentPartyStateCode ? activeTax.taxPercentage / 2 : 0).toFixed(2)
    values.SGSTAmount = parseFloat((values.SGSTPercentage * values.assessableAmount) / 100).toFixed(2)
    // values.CGSTPercentage = parseFloat(defaultFirm.state === currentPartyStateCode ? activeTax.taxPercentage / 2 : 0).toFixed(2)
    values.CGSTAmount = parseFloat((values.CGSTPercentage * values.assessableAmount) / 100).toFixed(2)
    // values.IGSTPercentage = parseFloat(defaultFirm.state !== currentPartyStateCode ? activeTax.taxPercentage : 0).toFixed(2)
    values.IGSTAmount = parseFloat((values.IGSTPercentage * values.assessableAmount) / 100).toFixed(2)
    values.grsTotal = parseFloat(values.assessableAmount + values.SGSTAmount + values.CGSTAmount + values.IGSTAmount).toFixed(2)

    editInfoForm.setFieldsValue(values)
  }

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
            <Input tabIndex="5" readOnly />
          </Form.Item>
        </Form>
      </AutoFocuser>
    </Modal>
  );
};

export default ItemWiseInfoDialog;

