import React, { } from "react";
import {
  Form,
  Input,
  Switch,
  Row,
  Col,
  DatePicker,
  InputNumber,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { ItemMasterActions } from "./../../../../_redux/actionFiles/ItemMasterRedux";

import moment from "moment";
import validateMsgs from "../../../../helpers/validateMesseges";
import { stringNormalize } from "./../../../../Helpers/utils"
import { TaxDropdown, ItemGroupDropdown, ItemUnitDropdown } from "./../../_common/CommonDropdowns"

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
      initialValues={{ ...(entityForEdit ?? {}) }}
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
            <Input tabIndex="1" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} tabIndex="2" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item
            name="salePrice"
            label="Sale rate"
            rules={[{ type: "number", message: "not a valid number" }]}
          >
            <InputNumber tabIndex="3" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="purchasePrice"
            label="Purchase rate"
            rules={[{ type: "number", message: "not a valid number" }]}
          >
            <InputNumber tabIndex="4" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Form.Item
                name="taxMasterId"
                label="Tax"
                shouldUpdate
                rules={[
                  {
                    required: form.getFieldValue("itemTaxable"),
                    message: "Please select tax",
                  },
                ]}
              >
                <TaxDropdown 
                  showSearch
                  optionFilterProp="label"
                  tabIndex="5"
                  showAction="focus"
                  allowClear={true} 
                />
                {/* <TaxDropdown filter={(options) => {
                   return options.filter((x) => {
                     return x.tax_percentage > parseInt(form.getFieldValue("HSNCode")??0)
                   });
                 }} /> */}
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="HSNCode" label="HSN code">
            <Input tabIndex="6" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="VATRate" label="VAT rate">
            <Input tabIndex="7" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="additionalTax" label="Additional tax">
            <Input tabIndex="8" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="itemUnitMasterId" label="Unit">
            <ItemUnitDropdown  showSearch
                  optionFilterProp="label"
                  tabIndex="9"
                  showAction="focus"
                  allowClear={true} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="itemGroupMasterId" label="Group">
            <ItemGroupDropdown showSearch
                  optionFilterProp="label"
                  tabIndex="10"
                  showAction="focus"
                  allowClear={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            name="itemTaxable"
            valuePropName="checked"
            label="Taxable?"
          >
            <Switch
              tabIndex="11"
              defaultChecked={true}
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="isActive" valuePropName="checked" label="Active?">
            <Switch tabIndex="13" defaultChecked={true} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ItemMasterForm;
