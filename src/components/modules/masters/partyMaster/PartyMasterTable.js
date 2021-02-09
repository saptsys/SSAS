import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, Space, Table } from "antd";
import PartyMasterForm from "./PartyMasterForm";
import { LayoutActions } from "../../../../_redux/actionFiles/LayoutRedux";
import { PartyMasterActions } from "../../../../_redux/actionFiles/PartyMasterRedux";
import CommonTable from "../../_common/CommonTable";
function PartyMasterTable() {
  const dispatch = useDispatch();

  const partyMaster = useSelector((state) => state.PartyMaster);
  const [drawer, setDrawer] = useState(false)
  useEffect(() => {
    dispatch(LayoutActions.setTitle("Party Master"))
    dispatch(LayoutActions.setInformation("F1-Save F2-Cancel F3-Reload"))
    dispatch(LayoutActions.setMessage("Getting all parties..."))
    dispatch(LayoutActions.setToolbar((
      <Space>
        <Button onClick={() => {
          setDrawer(true)
        }}>Create New</Button>
      </Space>
    )))
  }, [])

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "city",
      dataIndex: "city",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "gstin",
      dataIndex: "gstin",
    },
    {
      title: "isActive",
      dataIndex: "isActive",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "stateCode",
      dataIndex: "stateCode",
    },
    {
      title: "system",
      dataIndex: "system",
    },
    {
      title: "type",
      dataIndex: "type",
    },
  ];
  const [parties, setParties] = useState([]);

  useEffect(() => {
    dispatch(PartyMasterActions.getAll()).then(res => setParties([...res,...res,...res,...res,...res,...res,...res,...res]));
  }, []);

  return (
    <>
      <CommonTable
        columns={columns}
        dataSource={parties}
        
      />
    </>
  );
}

export default PartyMasterTable;
