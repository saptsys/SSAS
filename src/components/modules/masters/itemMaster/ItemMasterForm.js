import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Row,
  Col,
  DatePicker,
  InputNumber,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { ItemGroupMasterActions } from "./../../../../_redux/actionFiles/ItemGroupMasterRedux";
import { ItemUnitMasterActions } from "./../../../../_redux/actionFiles/ItemUnitMasterRedux";
import { TaxMasterActions } from "./../../../../_redux/actionFiles/TaxMasterRedux";
import { ItemMasterActions } from "./../../../../_redux/actionFiles/ItemMasterRedux";

import moment from "moment";
import { dateFormat } from "./../../../../../Constants/Formats";
import validateMsgs from "../../../../helpers/validateMesseges";

function ItemMasterForm({ entityForEdit, saveBtnHandler, saveBtnRef, form }) {
  const onFinish = (values) => {
    if (values.date) {
      values.date = values.date.format(dateFormat);
    }
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };
  const dispatch = useDispatch();

  const [units, setUnits] = useState([]);
  const [groups, setGroups] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [taxable, setTaxable] = useState(true);

  useEffect(() => {
    form.validateFields(["taxMaster"]);
  }, [taxable]);

  useEffect(() => {
    dispatch(ItemGroupMasterActions.getAll()).then((res) => {
      setGroups(
        res.map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })
      );
    });
    dispatch(ItemUnitMasterActions.getAll()).then((res) => {
      setUnits(
        res.map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })
      );
    });
    dispatch(TaxMasterActions.getAll()).then((res) => {
      setTaxes(
        res.map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })
      );
    });
  }, []);

  const validateCode = (rule, value, callback) => {
    return dispatch(
      ItemMasterActions.checkUnique({
        fields: { code: value },
        id: entityForEdit.id,
      })
    );
  };
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
      initialValues={(function () {
        if (entityForEdit) {
          if (entityForEdit.date) {
            var date = moment(entityForEdit.date, dateFormat);
            if (!date.isValid()) {
              date = null;
            }
            return {
              ...entityForEdit,
              date: date,
            };
          }
        }
        return entityForEdit ?? {};
      })()}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
      validateMessages={validateMsgs}
    >
      <Row>
        <Col span={11}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input tabIndex="0" autoFocus />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="code"
            label="Code"
            validateTrigger="onBlur"
            rules={[{ validator: validateCode }]}
            requiredMark={true}
            hasFeedback
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
        <Col span={11} offset={2}>
          <Form.Item name="date" label="Date">
            <DatePicker format={dateFormat} tabIndex="3" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item
            name="salePrice"
            label="Sale rate"
            rules={[{ type: "number", message: "not a valid number" }]}
            hasFeedback
          >
            <InputNumber tabIndex="4" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item
            name="purchasePrice"
            label="Purchase rate"
            rules={[{ type: "number", message: "not a valid number" }]}
            hasFeedback
          >
            <InputNumber tabIndex="5" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item
            name="taxMaster"
            label="Tax"
            rules={[
              {
                required: taxable,
                message: "Please select tax",
              },
            ]}
            hasFeedback
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={taxes}
              tabIndex="6"
              showAction="focus"
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="HSNCode" label="HSN code">
            <Input tabIndex="7" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="VATRate" label="VAT rate">
            <Input tabIndex="8" />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="additionalTax" label="Additional tax">
            <Input tabIndex="9" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="itemUnitMaster" label="Unit">
            <Select
              showSearch
              optionFilterProp="label"
              options={units}
              hasFeedback
              tabIndex="10"
              showAction="focus"
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="itemGroupMaster" label="Group">
            <Select
              showSearch
              optionFilterProp="label"
              options={groups}
              hasFeedback
              showAction="focus"
              tabIndex="11"
            />
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
              tabIndex="12"
              defaultChecked={true}
              onChange={() => {
                setTaxable(!taxable);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="isActive" valuePropName="checked" label="Active?">
            <Switch tabIndex="13" defaultChecked={true} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ItemMasterForm;
