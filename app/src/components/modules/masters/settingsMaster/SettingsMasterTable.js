
import React from "react";
import CommonTable from "../../_common/CommonTable";
import { Select, Input, Button, Space, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { SettingsMasterActions, reducerInfo } from "./../../../../_redux/actionFiles/SettingsMasterRedux"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { stringToJson, jsonToString } from "./../../../../helpers/utils";
import { errorDialog } from "../../../../helpers/dialogs";
import { CommonToolbar } from './../../_common/CommonToolbar';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';
import { resetColumnRenderer } from '../../../table/columnRenderers';

function SettingsMasterTable() {
  const dispatch = useDispatch();
  const { currentState, title } = useSelector(state => ({
    currentState: state[reducerInfo.name],
    title: state.Layout.title
  }));

  const [tableData, setTableData] = React.useState();
  const [filterText, setFilterText] = React.useState("")



  // const tableData = () => { tableData }


  // const setTableData = (data) => {
  //   dispatch(SettingsMasterActions.setAll(data))
  // }

  React.useEffect(() => {

    console.log(currentState)
    dispatch(LayoutActions.setToolbar(
      <Space>
        {
          <CommonToolbar searchBar={setFilterText} />
        },
        {
          <Button type="primary" onClick={() => resetHandler()}>Reset</Button>
        }
      </Space>
    ))

  }, [tableData])

  React.useEffect(() => {
    getTableData()
  }, [])

  const getTableData = () => {setTableData(currentState.list)}
  const saveSetting = (evt, row) => {
    let rowClone = {...row}
    let currentValue = rowClone.currentValue;
    let newValue;
    if (typeof (evt) == "string") {
      newValue = evt
    } else {
      evt.preventDefault();
      newValue = evt.target.value;
    }
    if (rowClone.type === "SELECT") {
      let options = stringToJson(rowClone.options, true)
      let selectedOption = options.find(x => x.value === newValue);
      if (!selectedOption) {
        return false;
      }
      newValue = jsonToString(selectedOption)
      if (currentValue === newValue) {
        return
      }
    }

    rowClone.currentValue = newValue;

    dispatch(SettingsMasterActions.save(rowClone)).then((res) => {
      message.success("Setting Changed!", 4)
    });
  }

  const inputValueChanged = (e, row) => {
    e.preventDefault();

    let clone = stringToJson(jsonToString(tableData));

    setTableData(clone.map(x => {
      if (x.id === row.id) {
        x.currentValue = e.target.value;
      }
      return { ...x }
    }))
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
          onBlur={(e) => saveSetting(e, row)} onChange={e => inputValueChanged(e, row)}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      case "NUMBER":
        console.log("asd", value)
        return <Input value={value} type="number" onBlur={(e) => saveSetting(e, row)} onChange={e => inputValueChanged(e, row)} />
      case "SELECT":
        value = stringToJson(value)
        if (!value) {
          value = [];
        }
        return <Select
          options={stringToJson(row.options)}
          showSearch
          defaultValue={value.label ? value.label : value}
          value={value.label ? value.label : value}
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

  const resetHandler = (value) => {
    let changed = false;
    let clone = stringToJson(jsonToString(tableData));

    setTableData(clone.map(x => {
      if ((!value || value === x.id) && (x.currentValue !== x.defaultValue)) {
        x.currentValue = x.defaultValue
        dispatch(SettingsMasterActions.save(x)).then((res) => {
          console.log(res)
        });
        changed = true;
      }
      return { ...x }
    }))
    if (changed) {
      message.success("Setting Reset To Default !", 4)
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
      render: (value, row) => renderDefaultValue(value, row),
    },
    {
      title: "Value",
      dataIndex: "currentValue",
      width: '20%',
      render: (value, row) => renderSettingComponent(value, row)
    },
    {
      title: "",
      dataIndex: "id",
      render: (text, row, index) => resetColumnRenderer(text, row, index, resetHandler),
      width: '35px',
    }
  ];
console.log(654,currentState)
  return (
    <CommonTable
      columns={columns}
      dataSource={tableData ?? []}
      rowKey="id"
      loading={currentState.loading}
      filterText={filterText}
      tableProps={{
        pagination: { disabled: true }
      }}
    />
  )
}

export default SettingsMasterTable;
