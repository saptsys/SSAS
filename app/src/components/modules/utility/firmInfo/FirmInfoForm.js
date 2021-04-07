import { Row, Input, Form, Col, Button, Divider, Descriptions, Badge, Space } from "antd";
import Search from "antd/lib/input/Search";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateFormat } from "../../../../../Constants/Formats";
import Regex from "../../../../../Constants/Regex";
import { StatesDropdown } from "../../_common/CommonDropdowns";


function FirmInfoForm({ entityForEdit = {}, saveBtnHandler, form, editMode = false }) {
  const [licenseKey, setLicenseKey] = useState(entityForEdit?.licenseKey)

  const firmInfoState = useSelector(s => s.FirmInfo)

  const gstinNumberChanged = (e) => {
    if (Regex.checkRegex(e.target.value, 'gstin')) {
      form.setFieldsValue({ state: parseInt(e.target.value.substr(0, 2)) })
      form.setFieldsValue({ pan: (e.target.value.substr(2, 10)) })
    }
  }

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 15
    }
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={entityForEdit?.defaultFirm ?? {}}
      onFinish={saveBtnHandler}
      labelAlign="left"
      form={form}
    >
      {!!editMode && (<Divider>Firm Info.</Divider>)}
      <Row>
        <Col span={11}>
          <Form.Item
            name="name"
            label="Company Name"
            required
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Company name here"
              tabIndex="0"
              autoFocus
            />
          </Form.Item>
        </Col>

        <Col span={11} offset={2}>
          <Form.Item
            name="gstin"
            label="GSTIN"
            rules={[{ pattern: Regex.gstin, message: 'GSTIN is not valid' }, { required: true }]}
            required
          >
            <Input disabled={editMode} placeholder="GSTIN here" onChange={gstinNumberChanged} tabIndex="2" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="address" label="Address">
            <TextArea
              rows={4}
              tabIndex="4"
              placeholder="Compnay address here"
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="pan"
            label="PAN"
            rules={[{ pattern: Regex.pan, message: 'PAN is not valid' }]}
          >

            <Input disabled={editMode} tabIndex="3" placeholder="PAN here" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ pattern: Regex.email, message: "Invalid Email Address" }]}>
            <Input tabIndex="9" placeholder="E-mail address here" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="city" label="City">
            <Input tabIndex="5" placeholder="City here" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="mobile" label="Mobile">
            <Input tabIndex="7" placeholder="Mobile here" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <StatesDropdown
            name="state"
            label="State"
            required
            rules={[{ required: true }]}
            propsForSelect={{ tabIndex: "6", placeholder: "Select state", disabled: editMode }}
          />
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input tabIndex="8" placeholder="Phone number here" />
          </Form.Item>
        </Col>
      </Row>
      {!editMode && (
        <>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" style={{ width: '100px' }} onClick={form.submit} loading={firmInfoState.loading === "saveData"} >SUBMIT</Button>
          </div>
        </>
      )}

      {!!editMode && (
        <>
          <Divider>Software Info.</Divider>
          <Descriptions bordered size="small" >
            <Descriptions.Item labelStyle={{ textAlign: 'center', fontWight: '600' }} label="License Type">{entityForEdit ? entityForEdit.isInTrialMode ? <Badge status="warning" text="Trial" /> : <Badge status="success" text="Licensed" /> : ""}</Descriptions.Item>
            <Descriptions.Item style={{ padding: '0 5px' }} labelStyle={{ textAlign: 'center', fontWight: '600' }} span={2} label="Machine Id">
              <Text copyable>{entityForEdit?.machineId}</Text>
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'center', fontWight: '600' }} label="Renewed Date">{moment(entityForEdit?.startDate).format(dateFormat)}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'center', fontWight: '600' }} label="Expiry Date">{moment(entityForEdit?.endDate).format(dateFormat)}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'center', fontWight: '600' }} label="Expiry Left Days">{entityForEdit?.expiryLeftDays} day(s)</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Form>
  );
}

export default FirmInfoForm;
