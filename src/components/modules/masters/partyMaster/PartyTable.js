import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, Space, Table } from "antd";
import { PartyMasterActions } from "./../../_redux/actionFiles/PartyMasterRedux";
import { LayoutActions } from "../../_redux/actionFiles/LayoutRedux";
import PartyMasterForm from "./PartyMasterForm";
function PartyTable() {
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
    dispatch(PartyMasterActions.getAll()).then(setParties);
  }, []);

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        bordered={true}
        rowSelection={true}
        size="small"
        scroll={true}
        loading={partyMaster.loading}
        columns={columns}
        dataSource={parties}
      />
      <Drawer
        title="Create a new party"
        width={720}
        onClose={() => setDrawer(false)}
        visible={drawer}
        bodyStyle={{ paddingBottom: 80 }}
      >

        <PartyMasterForm />

      </Drawer>
    </>
  );
}

export default PartyTable;
