import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, Space, Table } from "antd";
import PartyMasterForm from "./PartyMasterForm";
import { LayoutActions } from "../../../../_redux/actionFiles/LayoutRedux";
import { PartyMasterActions } from "../../../../_redux/actionFiles/PartyMasterRedux";
import CommonTable from "../../_common/CommonTable";

function PartyMasterTable({ filterText }) {
  const dispatch = useDispatch();

  const partyMaster = useSelector((state) => state.PartyMaster);
  const [drawer, setDrawer] = useState(false)
  useEffect(() => {

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
    dispatch(PartyMasterActions.getAll()).then(res => setParties(res));
  }, []);
  console.log(parties)
  return (
    <>
      <CommonTable
        columns={columns}
        dataSource={parties}
        filterText={filterText}
      />
    </>
  );
}

export default PartyMasterTable;
