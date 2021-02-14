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
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { ItemGroupMasterActions } from "./../../../../_redux/actionFiles/ItemGroupMasterRedux";
import { ItemUnitMasterActions } from "./../../../../_redux/actionFiles/ItemUnitMasterRedux";
import { TaxMasterActions } from "./../../../../_redux/actionFiles/TaxMasterRedux";
import moment from "moment";
function ItemMasterForm({ entityForEdit, saveBtnHandler, saveBtnRef }) {
  const onFinish = (values) => {
    values.date = values.date.format("MM-DD-YYYY");
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };
  const dispatch = useDispatch();

  const [units, setUnits] = useState([]);
  const [groups, setGroups] = useState([]);
  const [taxes, setTaxes] = useState([]);

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
            return { ...entityForEdit, date: moment(entityForEdit.date) };
          }
          return entityForEdit;
        }
        return {};
      })()}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
    >
      <Row>
        <Col span={11}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="code" label="Code">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="date" label="Date">
            <DatePicker format="MM-DD-YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="salePrice" label="Sale rate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="purchasePrice" label="Purchase rate">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={11}>
          <Form.Item name="taxMaster" label="Tax" required>
            <Select showSearch optionFilterProp="label" options={taxes} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="HSNCode" label="HSN code">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="VATRate" label="VAT rate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="additionalTax" label="Additional tax">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item name="itemUnitMaster" label="Unit" required>
            <Select showSearch optionFilterProp="label" options={units} />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="itemGroupMaster" label="Group" required>
            <Select showSearch optionFilterProp="label" options={groups} />
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
            <Switch />
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="isActive" valuePropName="checked" label="Active?">
            <Switch />
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
