import React from "react";
import AccountTypes from "../../../../../Constants/AccountTypes";
import States from "../../../../../Constants/States";
import CommonTable from "../../_common/CommonTable";

function PartyMasterTable(props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: '25%'
    },
    {
      title: "GSTIN",
      dataIndex: "gstin",
      width: '15%'
    },
    {
      title: "Type",
      dataIndex: "type",
      width: '15%',
      render: (text) => AccountTypes.find(x=>x.value === text).label
    },
    {
      title: "City",
      dataIndex: "city",
      width: '15%'
    },
    {
      title: "State",
      dataIndex: "stateCode",
      width: '15%',
      render: (text) => (States.find(x => x.tin === text)?.stateName)
    },
  ];

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default PartyMasterTable;
