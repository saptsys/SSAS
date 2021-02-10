import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, Space, Table } from "antd";
import PartyMasterForm from "./PartyMasterForm";
import { LayoutActions } from "../../../../_redux/actionFiles/LayoutRedux";
import { PartyMasterActions } from "../../../../_redux/actionFiles/PartyMasterRedux";
import CommonTable from "../../_common/CommonTable";

function PartyMasterTable(props) {
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

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default PartyMasterTable;
