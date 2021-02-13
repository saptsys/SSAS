import React from "react";
import CommonTable from "../../_common/CommonTable";

function PartyMasterTable(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "GSTIN",
      dataIndex: "gstin",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "State",
      dataIndex: "stateCode",
    },
  ];

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default PartyMasterTable;
