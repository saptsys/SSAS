
import React from "react";
import CommonTable from "../../_common/CommonTable";

function TaxMasterTable(props) {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Percentage",
      dataIndex: "taxPercentage",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title:"Items",
      dataIndex:"containsItems"
    },
    {
      title: "active",
      dataIndex: "isActive",
    },
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default TaxMasterTable;
