import React, { } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Switch,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { ItemMasterActions } from "./../../../../_redux/actionFiles/ItemMasterRedux";

import validateMsgs from "../../../../helpers/validateMesseges";
import { stringNormalize } from "./../../../../Helpers/utils"
import { TaxDropdown, ItemGroupDropdown, ItemUnitDropdown } from "./../../_common/CommonDropdowns"
import BorderedSwitch from "../../../form/BorderedSwitch";

function ItemMasterForm({ entityForEdit, saveBtnHandler, form }) {

  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };
  const dispatch = useDispatch();


  const validateCode = (rule, value) => {
    return dispatch(
      ItemMasterActions.checkUnique({
        fields: { code: value },
        id: entityForEdit.id,
      })
    );
  };
  const nameChanged = (e) => {
    form.setFieldsValue({ code: stringNormalize(e.target.value) })
  }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={entityForEdit}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
      validateMessages={validateMsgs}
    >
      <Row>
        <Col span={11}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input tabIndex="0" autoFocus onBlur={nameChanged} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="code"
            label="Code"
            validateTrigger="onBlur"
            rules={[{ validator: validateCode }, { required: true }]}
            required
          >
            <Input tabIndex="2" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} tabIndex="1" />
          </Form.Item>
        </Col>

        <Col span={11} offset={2}>
          <Form.Item name="HSNCode" label="HSN code">
            <Input tabIndex="3" />
          </Form.Item>
          <ItemGroupDropdown name="itemGroupMasterId" label="Group" propsForSelect={{ tabIndex: "4" }} />
        </Col>

      </Row>

      <Row>

        <Col span={11}>
          <Form.Item
            name="itemTaxable"
            valuePropName="checked"
            label="Taxable?"
          >
            <BorderedSwitch
              tabIndex="6"
            />
          </Form.Item>
        </Col>

        <Col span={11} offset={2}>
          <ItemUnitDropdown name="itemUnitMasterId" label="Unit" propsForSelect={{ tabIndex: "5" }} />
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            name="salePrice"
            label="Sale rate"
            rules={[{ type: "number", message: "not a valid number" }]}
          >
            <InputNumber tabIndex="7" style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={11} offset={2}>

          <TaxDropdown
            shouldUpdate={(o, n) => {
              return o?.itemTaxable !== n?.itemTaxable;
            }}
            name={() => "taxMasterId"}
            label="Tax"
            rules={() => [
              {
                required: form.getFieldValue("itemTaxable"),
                message: "Please select tax",
              },
            ]}
            propsForSelect={{
              tabIndex: "10",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11} >
          <Form.Item
            name="purchasePrice"
            label="Purchase rate"
            rules={[{ type: "number", message: "not a valid number" }]}
          >
            <InputNumber tabIndex="8" style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={11} offset={2}>
          <Form.Item name="additionalTax" label="Additional tax">
            <Input tabIndex="11" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="VATRate" label="VAT rate">
            <Input tabIndex="9" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="isActive" valuePropName="checked" label="Active?">
            <BorderedSwitch tabIndex="12" defaultChecked={true} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ItemMasterForm;
