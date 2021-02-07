import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { PartyMasterActions } from "./../../_redux/actionFiles/PartyMasterRedux";
function PartyTable() {
  const dispatch = useDispatch();

  const partyMaster = useSelector((state) => state.PartyMaster);

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
  );
}

export default PartyTable;