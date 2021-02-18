
import React from "react";
import CommonTable from "../../_common/CommonTable";

function TaxMasterTable(props) {
  const columns = [
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
      title: "Active",
      dataIndex: "isActive",
    },
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default TaxMasterTable;
