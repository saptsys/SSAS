
import React from "react";
import CommonTable from "../../_common/CommonTable";
import { Select, Input } from "antd";
import { useDispatch } from 'react-redux';
import { SettingsMasterActions } from "./../../../../_redux/actionFiles/SettingsMasterRedux"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { stringToJson, jsonToString } from "./../../../../Helpers/utils";
import { options } from "less";

function SettingsMasterTable(props) {
  const dispatch = useDispatch();

  const saveSetting = (evt, row) => {
    let currentValue;
    let newValue;
    if (typeof (evt) == "string") {
      newValue = evt
    } else {
      newValue = evt.target.value;
    }
    if (currentValue === newValue) {
      return
    }
    if (row.type === "SELECT") {
      let options = stringToJson(row.options, true)
      let selectedOption = options.filter(x => x.value === newValue);
      if (selectedOption[0]) {
        selectedOption = selectedOption[0]
      } else {
        return false;
      }
      row.currentValue = jsonToString(selectedOption)
    } else {
      row.currentValue = newValue;
    }
    dispatch(SettingsMasterActions.save(row)).then((res) => {
      console.log(res)
    });
  }
  const renderDefaultValue = (value, row) => {
    try {
      if (row.type === "SELECT") {
        return stringToJson(row.defaultValue)?.label
      }
      return value;
    } catch (e) {
      return "";
    }
  }

  const renderSettingComponent = (value, row) => {
    switch (row.type) {
      case "STRING":
        return <Input defaultValue={value} type="text" onBlur={(e) => saveSetting(e, row)} />
      case "SECRET":
        return <Input.Password
          defaultValue={value}
          onBlur={(e) => saveSetting(e, row)}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      case "NUMBER":
        return <Input defaultValue={value} type="number" onBlur={(e) => saveSetting(e, row)} />
      case "SELECT":
        value = stringToJson(value)
        if (!value) {
          value = [];
        }
        return <Select
          options={stringToJson(row.options)}
          showSearch
          defaultValue={value.label ? value.label : value}
          onChange={(e) => saveSetting(e, row)}
          style={{ width: "100%" }}
        />
      case "MULTI_SELECT":
        return "MULTI_SELECT";
      case "FILE":
        return "FILE";
      default:
        return value;
    }
  }
  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      width: '20%'
    },
    {
      title: "Description",
      dataIndex: "description",
      width: '20%'
    },
    {
      title: "Default",
      dataIndex: "defaultValue",
      width: '20%',
      render: (value, row) => renderDefaultValue(value, row)
    },
    {
      title: "Value",
      dataIndex: "currentValue",
      width: '20%',
      render: (value, row) => renderSettingComponent(value, row)
    },
  ];
  return (
    <CommonTable columns={columns} {...props} />
  )
}

export default SettingsMasterTable;
